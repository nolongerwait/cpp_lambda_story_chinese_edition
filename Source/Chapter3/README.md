# 三、Lambda in C++14
C++14 为 Lambda 表达式提供了两个显著的增强特性

- 带有初始化的捕获
- 泛型 Lambda
此外，该标准还更新了一些规则，例如：
- Lambda 表达式的默认参数
- `auto` 返回类型

这些新增特性可以在 [N4140](https://timsong-cpp.github.io/cppwp/n4140/) 中的 Lambda 部分 [[expr.prim.lambda]](https://timsong-cpp.github.io/cppwp/n4140/expr.prim.lambda) 找到。

在本章中，你将学到：

- 捕获成员变量
- 用现代 C++ 技术代替旧功能，如 `std::bind1st`
- LIFTING
- 递归 Lambda

## 1. 为 Lambda 增加默认参数
让我们从小的变化说起吧：
在 C++14 中，你可以在 Lambda 调用中使用默认参数了。这一小小的更新让 Lambda 函数更像一个常规函数了。
> 代码3-1 [带有默认参数的 Lambda](https://wandbox.org/permlink/T2u5iuGqi3fHaN9q)
```cpp
#include <iostream>

int main() {
    const auto lam = [](int x = 10) {
        std::cout << x << '\n';
    };
    lam();
    lam(100);
}
```
见用例所示，我们可以调用这个 Lambda 两次：第一次不携带任何参数，结果将输出默认的 `10` ，第二次我们传递参数 `100` 进去，结果会输出 `100` 。

不过，这一特性早已在 GCC 和 Clang 的 C++11 版本中被支持了。
## 2. 返回类型
如果你还记得之前章节的内容，那么你一定知道，对于一个简单的 Lambda ，编译器可以推断出它的返回类型。这个功能是在常规函数上“扩展”的，在 C++14 中你可以使用 `auto` 作为返回类型
```cpp
auto myFunction() {
    int x =computeX(...);
    int y =computeY(...);
    return x +y;
}
```
如上，编译器会推断返回类型为 `int` 。

推断返回类型的这部分内容在 C++14 中得到了改善和扩展。对于 Lambda 表达式来说，这意味着他们可以和常规函数享有同样的 `auto` 返回类型（[[expr.prim.lambda]](https://timsong-cpp.github.io/cppwp/n4140/expr.prim.lambda#4)）：
> 如果 Lambda 返回类型是 `auto` ，那么它会被尾部返回类型所替代（如果提供了）或者从 `return` 语句中推导。详见 [[dcl.spec.auto]](https://timsong-cpp.github.io/cppwp/n4140/dcl.spec.auto)

如果在 Lambda 中有多条返回语句，他们必须能够推断出同样的类型：
```cpp
auto foo = [](int x){
    if (x < 0)
        return x * 1.1f
    else
        return x * 2.1
}
```
这段代码就无法成功编译了，因为第一条返回语句返回 `float` 类型但第二条返回 `double` 类型。编译器无法决定出到底应该将返回类型定为哪个，所以您必须选择其中一个，保证返回类型的唯一性。

尽管推断整形和双精度型也是很有用的，但是推断返回类型之所以有更显著的价值，是因为它可以在模板代码这种“未知”领域发挥极大地在作用。

举个例子， Lambda 闭包类型是匿名的，并且我们无法显式的明确它。但是如果你想从函数中返回一个 Lambda 呢？你要如何明明确这个类型？

在 C++14 之前，你可以用 `std::function` ：
> 代码3-2 [返回 `std::function`](https://wandbox.org/permlink/oCij1KoIB8RVOvSI)
```cpp
#include <functional>
#include <iostream>

std::function<int(int)> CreateMulLambda(int x) {
    return [x](int param) noexcept {
        return x * param;
    };
}

int main() {
    const auto lam = CreateMulLambda(10);
    std::cout << sizeof(lam);
    return lam(2);
}
```
然而，上面这种方法并不足够直接。它要求你明确了一个函数签名，甚至包含了额外的头文件 `<functional>` 。如果你还记得 C++11 的内容的话， `std::function` 是一个“笨重”的对象（在 GCC9 中， `function` 的 `sizeof` 是 32 bytes ）。并且，它需要一些高级的内部机制，以便它可以处理任何可调用的对象。

感谢 C++14 带来的改进，我们可以极大的简化上面的代码：
> 代码3-3 [Lambda 推断的 `auto` 返回类型](https://wandbox.org/permlink/RLEHfrCk29aqRn8X)
```cpp
#include <iostream>

auto CreateMulLambda(int x) noexcept {
    return [x](int param) noexcept {
        return x * param;
    };
}

int main() {
    const auto lam = CreateMulLambda(10);
    std::cout << sizeof(lam);
    return lam(2);
}
```
现在我们就可以完全依靠编译时的类型推导，不需要其他辅助类型。 在 GCC 上，最后 `lam` 这个返回的 Lambda 对象的大小仅为 4 字节，并且比使用 `std::function` 的解决方案便宜得多。这里有一点需要注意，我们也可以将 `CreateMulLambda` 标记为 `noexcept` ，这样无论如何它都不可以抛出任何异常。 但是 `std::function` 就不行了。
## 3. 带有初始化的捕获
现在我们来讲讲更加具有建设性的更新。

你一定记得，在 Lambda 表达式中，你可以从外部范围中捕获变量。编译器会拓展你的捕获语法并且在闭包类型中创建成员变量（非静态数据成员）。
现在在 C++14 中，你可以创建一个新的成员变量并且在捕获语句中初始化他们。这样你就可以在 Lambda 内部访问那些变量了。这叫做 **通过初始化器捕获** 或者你也可以用另一个名字 **广义 Lambda 捕获** 。

看个简单的例子：
> 代码3-4 [通过初始化器捕获](https://wandbox.org/permlink/461XKCYNsQSKQeKO)
```cpp
#include <iostream>

int main() {
    int x = 30;
    int y = 12;
    const auto foo = [z = x + y]() {
        std::cout << z << '\n';
    };

    x = 0;
    y = 0;
    foo();
}
```
输出为
```bash
42
```
在这个例子中，编译会生成一个新的成员变量并且将其初始化为 `x + y` 。这个新变量的类型会被自动推断出来，即便你在变量前加上了 `auto` 关键字：
```cpp
auto z = x + y
```
总之，前面示例中的 Lambda 会被解析为以下（简化的）仿函数：
```cpp
struct _unnamedLambda {
    void operator()() const{
        std::cout << z << '\n';
    }

    int z;
} someInstance;
```
当 Lambda 的表达式定义完成时， `z` 将会被直接初始化 `x + y` 。

上面这句的含义就是：新变量在你定义 Lambda 的地方初始化，而不是你调用它的地方。 这就是为什么如果你在创建 Lambda 后修改 `x` 或者 `y` 变量，变量 `z` 的值不会改变。 在示例中，你可以看到在定义 Lambda 之后，我立即更改了 `x` 和 `y` 的值。 然而，输出仍将是 42，因为 `z` 在这之前就已经被初始化。

当然，通过初始化器创建变量也可以是灵活的，不妨看看下面这个例子：创建一个外部范围的引用变量。
> 代码3-5 [通过初始化器进行引用捕获](https://wandbox.org/permlink/TVb2allLLdRQ1aPe)
```cpp
#include <iostream>

int main() {
    int x = 30;
    const auto foo = [&z = x]() {
        std::cout << z << '\n';
    };
    foo();
    x = 0;
    foo();
}
```
这次，变量 `z` 是引用自变量 `x` ，当然你也可以写成这样 `auto & z = x` 。
如果运行这段代码，你应该可以看到，第一行会输出30，但是第二行会输出 `0` 。这是因为我们进行了一个引用捕获，当你修改了引用内容时，对象 `z` 自然也会随之变化。
### 限制
需要注意，在使用初始化器捕获时，有一些限制：
一个是，当你通过初始化器进行引用捕获时，她不可能写入一个右值引用 `&&` 。这是因为如下的代码目前是非法的：
```cpp
[&& z = x] //非法语法
```
另一个该特性的限制是，它不允许传入参数包。在条款 [[expr.prim.lambda]](https://timsong-cpp.github.io/cppwp/n4140/expr.prim.lambda#24) 的 24 节可以阅读到如下内容：
带有省略号的简单捕获是包扩展（[[temp.variadic]](https://timsong-cpp.github.io/cppwp/n4140/temp.variadic)）， 但是 init-capture 带有省略号是格式错误。

简而言之，在 C++14 中，你并不能这样写代码：
```cpp
template < class.. Args >
auto captureTest(Args... args) {
    return lambda = [...capturedArgs = std::move(args)](){};
    ...
```
但是，这个语法，在 C++20 中是支持的，如果想提前了解，可以参考[这个]()。
### 对现有问题的改进
总而言之，这个新的 C++14 特性可以解决一些问题，例如 仅可移动类型 或 允许一些额外的优化。

**Move 移动**
在 C++11 中，你无法通过值捕获的方式捕获一个唯一指针（ `unique_pointer` ），只能进行引用捕获。但是现在在 C++14 中，我们可以移动一个对象到闭包类型的成员中：
> 代码3-6 [捕获一个仅可移动类型](https://wandbox.org/permlink/n65fzPHrNnyDqbIK)
```cpp
#include <iostream>
#include <memory>

int main() {
    std::unique_ptr<int> p(new int{10});
    const auto bar = [ptr = std::move(p)] {
        std::cout << "pointer in lambda: " << ptr.get() << '\n';
    };
    std::cout << "pointer in main(): " << p.get() << '\n';
    bar();
}
```
输出：
```bash
pointer in main(): 0
pointer in lambda: 0x1413c20
```
有了捕获初始化器，你就可以移动一个指针的所有权到 Lambda 中。如你所见，在上面这个例子中，唯一指针在闭包对象被创建后立即被设为了 `nullptr` 。但是当你调用这个 Lambda 时，你会看见一个合法的内存地址。

**`std::function` 中的陷阱**
在lambda中拥有一个仅可移动的捕获变量会让闭包对象变得不能被拷贝。当你想在 `std::function` 中存储一个 Lambda，而这个 Lambda 接受仅可拷贝的可调用对象的时候，就会出现问题。

我们在 C++ Insights 上观察一下之前的一个例子（[在线预览](https://cppinsights.io/s/5d11eb8f)），你会发现 `std::unique_ptr` 是一个闭包类型的成员变量。但是，拥有一个仅可移动的成员会阻止编译器创建一个默认拷贝构造的。

简而言之，这段代码无法编译：
> 代码3-7 `std::function` 和 `std::move`
```cpp
std::unique_ptr<int> p(new int{10});
std::function<void()> fn = [ptr = std::move(p)](){}; //不可编译
```
如果您想要完整的细节，您还可以查看草案([P0288]())中的 any_invokable ，这是 `std::function` 未来可能的改进，并且还会处理仅可移动类型。


**优化 Optimisation**
有一个将捕获初始化器作为潜在的性能优化的点子：我们可以在初始化器中计算一次，而不是每次调用 Lambda 时都计算某个值：
> 代码3-8 [给 Lambda 创建一个 `string`](https://wandbox.org/permlink/GWcJNoUsBFnscOp3)
```cpp
#include <algorithm>
#include <iostream>
#include <string>
#include <vector>

int main() {
    using namespace std::string_literals;
    const std::vector<std::string> vs = {"apple", "orange", "foobar", "lemon"};
    const auto prefix = "foo"s;
    auto result = std::find_if(vs.begin(), vs.end(), [&prefix](const std::string& s) {
        return s == prefix + "bar"s;
    });
    if (result != vs.end())
        std::cout << prefix << "-something found!\n";
    result = std::find_if(vs.begin(), vs.end(), [savedString = prefix + "bar"s](const std::string& s) {
        return s == savedString;
    });
    if (result != vs.end())
        std::cout << prefix << "-something found!\n";
}
```
上面的代码对 `std::find_if` 调用了两次。 在第一个场景中，我们捕获 `prefix` 并将输入值与 `prefix + "bar"s` 进行比较。 每次调用 Lambda 时，都必须创建并计算一个临时值来存储这些字符串的总和。

第二次调用 `find_if` 优化：我们创建了一个捕获的变量 `savedString` 来计算字符串的总和。 然后，我们可以安全地在 Lambda 体中引用它。 字符串的总和只会运行一次，而不是每次调用 lambda 时都会运行。

该示例还使用了 `std::string_literals` ，这就是为什么我们可以编写代表 `std::string` 对象的 `"foo"s`。

**捕获成员变量**
初始化器也被用来捕获成员变量。我们可以捕获一个成员变量的拷贝并且不用担心悬空引用。

看个例子吧：
> 代码3-9 [捕获一个成员变量](https://wandbox.org/permlink/E65tipdkDj2nrdF5)
```cpp
#include <algorithm>
#include <iostream>

struct Baz {
    auto foo() const {
        return [s = s] {
            std::cout << s << std::endl;
        };
    }

    std::string s;
};

int main() {
    const auto f1 = Baz{"abc"}.foo();
    const auto f2 = Baz{"xyz"}.foo();
    f1();
    f2();
}
```
在 `foo()` 中我们通过拷贝的方式将成员变量拷贝进了闭包类型中。此外，我们使用 `auto` 来进行成员函数 `foo()` 返回类型的推断。当然，在 C++11 中，你也可以使用 `std::function` ，详见 [捕获成员变量和 `this` 指针](../Chapter2/README.md#捕获类成员和-`this`-指针)。

在这里我们在lambda中使用了一个很“奇怪”的语法 `[ s = s ]` ，这段代码能够工作的原因是捕获到的变量是在闭包类型内部的，而非外部。所以这里就没有歧义冲突了。
## 4. 泛型 Lambda
这是 C++14 中有关 Lambda 的最大的更新！

Lambda 的早期规范允许我们创建匿名函数对象并将它们传递给标准库中的各种泛型算法。 然而，闭包本身并不是“泛型”的。 例如，您不能将模板参数指定为 Lambda 的参数。

当然，在C++14中，标准引入了 **泛型 Lambda** 现在我们可以这样写：
```cpp
const auto foo = [](auto x, int y) {
    std::cout << x << ", " << y << '\n';
};

foo(10, 1);
foo(10.1234, 2);
foo("hello world", 3);
```
注意 Lambda 的参数 `auto x` ，它等同于在闭包类型中使用一个模板声明：
```cpp
  struct {
      template < typename T >
      void operator ()(T x, int y) const {
          std::cout << x << ", " << y << '\n';
      }
  } someInstance
```
当然，当有多个 `auto` 参数时，代码将被扩展为多个模板参数：
```cpp
const auto fooDouble =[](auto x, auto y) { /*...*/};
```
扩展为：
```cpp
struct{
    template< typename T, typename U>
    void operator()(T x, U y) const{ /*...*/}
} someOtherInstance;
```
### 可变泛型参数
但是这并不是全部，如果你需要更更多的函数参数类型，你可以自己进行可变性改造。

看这个栗子：
> 代码3-10 [用于求和的可变泛型 Lambda](https://wandbox.org/permlink/EVw677hLJwKpSpPg)
```cpp
#include <iostream>

template <typename T>
auto sum(T x) {
    return x;
}

template <typename T1, typename... T>
auto sum(T1 s, T... ts) {
    return s + sum(ts...);
}

int main() {
    const auto sumLambda = [](auto... args) {
        std::cout << "sum of: " << sizeof...(args) << " numbers\n";
        return sum(args...);
    };
    std::cout << sumLambda(1.1, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7, 8.8, 9.9);
}
```
这段泛型 Lambda 代码中使用了 `auto ...` 来代表一个可变长参数包。理论上，它将在调用操作符中被展开为：
```cpp
struct __anoymousLambda{
    template < typename ... T >
    void operator()(T... args) const {/*...*/}
};
```
在 C++17 中，我们有了新的选择 [折叠表达式]() ，它可以改进泛型可变参数 Lambdas，而在 C++20 中，我们将获得对模板参数的更多控制。 有关更多信息，请参阅 C++17 对可变参数泛型 Lambdas 的更新以及 C++20 中关于 [模板 Lambda]() 的信息

### 使用泛型 Lambda 进行完美转发
使用泛型 Lambda 表达式，其实并不限定在只使用 `auto x`，您可以像其他 `auto` 变量一样添加任何限定符，如 `auto&` 、`const auto&` 或 `auto&&` 。有一个十分便利的点是，你可以指定 `auto&& x` 使其成为转发（泛型）引用。 这使您可以完美地转发输入参数：
> 代码3-11 [泛型 Lambda 进行完美转发](https://wandbox.org/permlink/kA2GNHFiLOGDu9d9)
```cpp
#include <iostream>
#include <string>

void foo(const std::string&) {
    std::cout << "foo(const string&)\n";
}

void foo(std::string&&) {
    std::cout << "foo(string&&)\n";
}

int main() {
    const auto callFoo = [](auto&& str) {
        std::cout << "Calling foo() on: " << str << '\n';
        foo(std::forward<decltype(str)>(str));
    };
    const std::string str = "Hello World";
    callFoo(str);
    callFoo("Hello World Ref Ref");
}
```
输出
```bash
Calling foo() on: Hello World
foo(const string&)
Calling foo() on: Hello World Ref Ref
foo(string&&)
```
示例代码定义了两个函数重载 `foo` 用于对 `std::string` 的 `const` 引用，另一个用于对 `std::string` 的右值引用。 `callFoolambda` 使用泛型参数作为泛型引用（[引用资料6](https://isocpp.org/blog/2014/09/noexcept-optimization)）. 如果您想将此 Lambda 重写为常规函数模板，它可能如下所示：
```cpp
template<typename T>
void callFooFunc(T&& str) {
    std::cout << "Calling foo() on: " << str << '\n';
    foo(std::forward<T>(str));
}
```
如你所见，在泛型 Lambda 的加持下，在编写本地匿名函数时候，你现在有更多的选择了。

但是，这还不是全部。
### 减少一些隐蔽的类型纠正
泛型 Lambda 在发现类型推断有问题时，很有帮助。

来看个例子：
> 代码3-13 [对 `std::map` 的迭代器进行类型纠正](https://wandbox.org/permlink/pSbtIA2lgYa6r1bW)
```cpp
#include <algorithm>
#include <iostream>
#include <map>
#include <string>

int main() {
    const std::map<std::string, int> numbers{{"one", 1}, {"two", 2}, {"three", 3}};
    // each time entry is copied from pair<const string, int>!
    std::for_each(std::begin(numbers), std::end(numbers), [](const std::pair<std::string, int>& entry) {
        std::cout << entry.first << " = " << entry.second << '\n';
    });
}
```
这段代码有问题吗？ `entry` 的类型正确吗？

很明显，这里是有问题的。 `std::map` 的类型应该是 `std::pair<const key, T>` 而不是 `const std::pair<Key, T> `。而在我们的代码中，会造成不必要的额外拷贝，在 `std::pair<const std::string, int>` 和 `const std::pair<std::string, int>&` (其中 `const std::string` 对 `std::string` 的转换)之间。

修复一下代码，它本应该是这样的：
```cpp
std::for_each(std::begin(numbers), std::end(numbers),
    [](const auto& entry) {
        std::cout << entry.first << " = " << entry.second << '\n';
    });
```
现在模板参数推导将充分获得 `entry` 对象的正确类型，并且不会创建额外的副本。 而且代码也更加简洁且易读。

接下来我们看看另一段比较长的代码，打印了 `entry` 的内存地址：
> 代码3-14 [对 `std::map` 的迭代器进行类型纠正，完整版](https://wandbox.org/permlink/yvow5G122f7A2SxN)
```cpp
#include <algorithm>
#include <iostream>
#include <map>
#include <string>

int main() {
    const std::map<std::string, int> numbers{{"one", 1}, {"two", 2}, {"three", 3}};
    // print addresses:
    for (auto mit = numbers.cbegin(); mit != numbers.cend(); ++mit)
        std::cout << &mit->first << ", " << &mit->second << '\n';

    // each time entry is copied from pair<const string, int>!
    std::for_each(std::begin(numbers), std::end(numbers), [](const std::pair<std::string, int>& entry) {
        std::cout << &entry.first << ", " << &entry.second << ": " << entry.first << " = " << entry.second << '\n';
    });

    // this time entries are not copied, they have the same addresses
    std::for_each(std::begin(numbers), std::end(numbers), [](const auto& entry) {
        std::cout << &entry.first << ", " << &entry.second << ": " << entry.first << " = " << entry.second << '\n';
    });
}
```
可能的输出结果：
```bash
1 0x165dc40, 0x165dc60
2 0x165dce0, 0x165dd00
3 0x165dc90, 0x165dcb0
4 0x7ffe5ed29a20, 0x7ffe5ed29a40: one = 1
5 0x7ffe5ed29a20, 0x7ffe5ed29a40: three = 3
6 0x7ffe5ed29a20, 0x7ffe5ed29a40: two = 2
7 0x165dc40, 0x165dc60: one = 1
8 0x165dce0, 0x165dd00: three = 3
9 0x165dc90, 0x165dcb0: two = 2
```
前三行输出了 `map` 的 key 和 value 的内存地址。第 4、5、6 行分别展示了在循环迭代中临时拷贝出来的内存值。最后三行则是使用 `const auto&` 的版本，很明显可以看出来，和前三行使用自身迭代的内容是一样的。

在所举的例子中，我们关注拷贝产生的 key 的额外副本，但重要的是要了解 `entry` 也被复制了。 当使用像 `int` 这样的“廉价”的复制类型时，这也许不是什么问题，但如果对象像字符串一样更大，那么就会产生很大的拷贝开销和性能损耗。
> 在 C++20 中，开发者可以更好地控制 Lambda 的模板参数，因为 C++20 的新修订引入了模板 Lambda、概念和受约束的 `auto` 参数。

## 5. 使用 Lambda 代替 `std::bind1st` 和 `std::bind2nd`
在C++98/03章节，我提到并展示了一些辅助函数，像 `std::bind1st` 和 `std::bind2nd` 之类。然而，这些函数在 C++11 中逐渐废弃，在 C++17 中，这些函数已被完全移除。

像 `bind1st()` / `bind2nd()` / `mem_fun()`等函数，都是在 C++98 时期被引入进标注库的，而现在这些函数已不再需要了，因为我们可以使用 Lambda 或者更现代化的 C++ 技巧来代替。当然了，这些函数也没有获得对于完美转发、泛型模板、 `decltype` 以及其他 C++11 特性的更新，所以，我建议不要在现代编程中使用这些已弃用的内容。

下面是已被废弃的函数列表：
- unary_function()/pointer_to_unary_function()
- binary_function()/pointer_to_binary_function()
- bind1st()/binder1st
- bind2nd()/binder2nd
- ptr_fun()
- mem_fun()
- mem_fun_ref()

当然，仅仅是为了替换 `bind1st` 或者 `bind2nd` 的话，你可以使用 `std::bind` ( C++11 引入)或者 `std::bind_front` ( C++20 引入)。

考虑下，这些我们之前使用旧函数所编写的这些代码要如何修改：
```cpp
const auto onePlus =std::bind1st(std::plus<int>(), 1);
const auto minusOne =std::bind2nd(std::minus<int>(), 1);
std::cout << onePlus(10) << ", " << minusOne(10) << '\n';
```
这个例子中， `onePlus` 是由 `std::plus` 组成的一个可调用对象，并且第一参数被调用修正。换种说法，当你写下 `onePlus(n)` 的时候，它会被展开为 `std::plus(1, n)` 。

类似地， `minusOne` 是由 `std::minus` 组成的一个可调用对象，并且第二参数被调用修正。`miniusOne(n)` 会被展开为 `std::minus(n, 1)`。

上面的语法可能会十分的麻烦，我们下面来看看如何用现代化 C++ 技术来优化他们。
### 使用现代 C++ 技术
我们首先用 `std::bind()` 来替换 `bind1st` 和 `bind2nd`
> 代码3-15 [用 `std::bind` 来代替](https://godbolt.org/z/bj9Txh)
```cpp
#include <algorithm>
#include <functional>
#include <iostream>

int main() {
    using std::placeholders::_1;
    const auto onePlus = std::bind(std::plus<int>(), _1, 1);
    const auto minusOne = std::bind(std::minus<int>(), 1, _1);
    std::cout << onePlus(10) << ", " << minusOne(10) << '\n';
}
```
`std::bind` 会更加灵活，它支持多个参数，甚至你可以对参数重新排序。在参数管理上，你需要使用 ***占位符placeholders*** 。上面的例子中，使用了 `_1` 来代表第一个参数需要被传入最终的函数对象中的未知。

虽然 `std::bind` 比起 C++98/03 中的辅助函数好用多了，但是它仍然不如 Lambda 使用起来自然和便捷。

我们来尝试写一下上面例子中对应的 Lambda 表达式：
```cpp
auto lamOnePlus1 =[](int b) { return 1 + b; };
auto lamMinusOne1 =[](int b) { return b - 1; };
std::cout << lamOnePlus1(10) << ", " << lamMinusOne1(10) << '\n';
```
当然，在 C++14 中我们也可以用初始化器来进一步优化 Lambda，让 Lambda 更加灵活：
```cpp
auto lamOnePlus1 =[a = 1](int b) { return a + b; };
auto lamMinusOne1 =[a = 1](int b) { return b - a; };
std::cout << lamOnePlus1(10) << ", " << lamMinusOne1(10) << '\n';
```
很显然，Lambda 版本更简洁，更易读。 这一点将在后面更复杂的示例中更加凸显出来。
### 函数组合
最后一个例子，我们来看看这个，在表达式中嵌套使用函数组合：
> 代码3-16 [`std::bind` 中使用函数组合](https://godbolt.org/z/8N7ZBX)
```cpp
#include <algorithm>
#include <functional>
#include <vector>

int main() {
    using std::placeholders::_1;
    const std::vector<int> v{1, 2, 3, 4, 5, 6, 7, 8, 9};
    const auto val = std::count_if(v.begin(), v.end(),
            std::bind(std::logical_and<bool>(),
                std::bind(std::greater<int>(), _1, 2),
                    std::bind(std::less<int>(), _1, 6)
                )
            );
    return val;
}
```
你能快速解读出来这段代码的工作逻辑嘛？

不论是否读懂了，这段代码都可以重新书写为更简洁和可读的版本：
```cpp
std::vector<int> v{1, 2, 3, 4, 5, 6, 7, 8, 9};
const auto more2less6 = std::count_if(v.begin(), v.end(), [](int x) {
    return x > 2 && x < 6;
});
```
现在应该好懂多了？
> 有一些关于 `std::bind` 和 Lambda 的第三方指导性意见：比如《 Effective Modern C++ 》中的第 34 项条款，比如 Google Abseil Blog 中的[Avoid std::bind](https://abseil.io/tips/108)

## 6. Lambda 提升（LIFTing with Lambda）
尽管标准库中提供的常用算法已经很方便的，但是仍然有一些情况不太好解决。比如，向模板函数中传递有重载的函数作为可调用对象。
> 代码3-17 调用重载函数
```cpp
#include <algorithm>
#include <vector>
// two overloads:
void foo(int) {}
void foo(float) {}
int main() {
    const std::vector<int> vi{1, 2, 3, 4, 5, 6, 7, 8, 9};
    std::for_each(vi.begin(), vi.end(), foo);
}
```
这个例子里面 `foo` 分别有对于 `int` 和 `float` 的两个重载，并且作为可调用对象传递给了模板函数 `for_each` 。遗憾的是，在 GCC9 中，编译会提示如下错误：
```bash
error: no matching function for call to
for_each(std::vector<int>::iterator, std::vector<int>::iterator,
 <unresolved overloaded function type>)
    std::for_each(vi.begin(), vi.end(), foo);
                                       ^^^^^
```
这里出错的主要原因是， `foo` 作为一个模板参数，它需要重新被确定为一个确定的类型。但是 `foo` 本身又有两个重载，并且实际上数据可以同时被两个重载都接受，这是编译器所不能接受的。

但是，这里有个技巧就是，我们可以使用 Lambda 来代替重载的可调用对象。上面的代码即可修改为：
```cpp
std::for_each(vi.begin(), vi.end(), [](auto x) { return foo(x); });
```
现在我们也可以用包装器（泛型 Lambda ）来解决重载的问题，让调用时可以找到适当的重载对象。

当然，我们也可以使用完美转发来更加巧妙的规避掉重载的情况。
```cpp
std::for_each(vi.begin(), vi.end(), [](auto &&x) {
    return foo(std::forward<decltype(x)>(x);
});
```
下面是一个应用的例子：
> 代码3-18 [泛型Lambda和函数重载](https://wandbox.org/permlink/2t1M9lUnTT16LjnU)
```cpp
#include <algorithm>
#include <iostream>
#include <vector>

void foo(int i) {
    std::cout << "int: " << i << "\n";
}

void foo(float f) {
    std::cout << "float: " << f << "\n";
}

int main() {
    const std::vector<int> vi{1, 2, 3, 4, 5, 6, 7, 8, 9};
    std::for_each(vi.begin(), vi.end(), [](auto&& x) {
        return foo(std::forward<decltype(x)>(x));
    });
}
```
但是，对于更高级或者更复杂的场景，这可能不是首选解决方案，因为我们没有严格遵守可变参数和异常规范。

如果需要一个更加泛型、或者更好的解决办法。那可能需要多写一些代码了：
```cpp
#define LIFT(foo)                                                                                               \
    [](auto&&... x) noexcept(                                                                                   \
            noexcept(foo(std::forward<decltype(x)>(x)...))) -> decltype(foo(std::forward<decltype(x)>(x)...)) { \
        return foo(std::forward<decltype(x)>(x)...);                                                            \
    }
```
看着有点懵？别急，我们来一点点解析这段代码的功能。
- 返回 `foo(std::forward<decltype(x)>(x)...)`
  - 完美转发，这样我们才能完整传递输入参数到 `foo` 函数中，并且保留类型。
- `noexcept(noexcept(foo(std::forward<decltype(x)>(x)...)))`
  - 使用 `noexcept` 操作符（被嵌套的那一个）检查 可调用对象 `foo` 的异常规范。依赖于异常的检查结果，最终会产生 `noexcept(true)` 或者 `noexcept(false)` 。
- `decltype(foo(std::forward<decltype(x)>(x)...))`
  - 推断包装 Lambda 的最终返回类型

Lambda 提升（LIFT）通过宏定义的方式实现，不然每次需要使用提升的时候你都需要编写类似的代码，并将其传递给一个算法中。而使用宏定义，这是一种最简单的语法实现了。

有兴趣的话，可以看看使用 Lambda 提升后的[最终代码](https://wandbox.org/permlink/r81jASiPPmYXTOmx)。
## 7. 递归 Lambda
如果你有一个常规函数，那么递归调用这函数十分容易的。比如，我们计算阶乘时候的递归函数应该是这样的：
> 代码3-19 [常规函数的递归调用](https://wandbox.org/permlink/BKwwFt2eW7Nd3gIV)
```cpp
int factorial(int n) {
    return n > 1 ? n * factorial(n - 1) : 1;
}

int main() {
    return factorial(5);
}
```
我们来尝试用 Lambda 的方式进行递归：
> 代码3-20 [Lambda递归的错误示例](https://wandbox.org/permlink/etbPCZDuFUUYfit0)
```cpp
int main() {
    auto factorial = [](int n) {
        return n > 1 ? n * factorial(n - 1) : 1;
    };
    return factorial(5);
}
```
这段代码不会编译成功，在 GCC 中会提示编译错误：
```bash
error:use of 'factorial'before deduction of 'auto'
```
由于我们无法在 Lambda 函数体内访问 `factorial` 本身，因为他还尚未被编译器完全识别出来。我们深入一下，先将这段代码展开为一个简单的仿函数：
```cpp
struct fact {
    int operator()(int n) const {
        return n > 1 ? n * factorial(n - 1) : 1;
    };
};
auto factorial = fact{};
```
这样就清晰很多了，因为在调用操作符 `()` 中，我们压根无法访问到仿函数类型。
如果我们要实现递归，那么这里有两个途径可以考虑下：
- 使用 `std::function` 并且捕获它
- 使用内部 Lambda 然后传递泛型参数
### 利用 `std::function`
将 Lambda 表达式赋值给一个 `std::function`，后续捕获该这个对象到 Lambda 函数体内，实现递归。
> 代码3-21 [使用 `std::function` 实现 Lambda 递归](https://wandbox.org/permlink/ogZxy9CvAvRBUfJL)
```cpp
#include <functional>
int main() {
    const std::function<int(int)> factorial = [&factorial](int n) {
        return n > 1 ? n * factorial(n - 1) : 1;
    };
    return factorial(5);
}
```
这个示例里面，我们在 Lambda 函数体内调用捕获的 `std::function` 对象 `factorial` 。此时这个对象是完整定义的，所以编译器访问并调用对象就不存在问题了。

如果你想使用一个无状态的 Lambda，那么你甚至可以使用一个函数指针来代替 `std::function` ，这样内存占用会更少。

但是，但是，下面这种方式会更好。
### 内部 Lambda 和泛型参数
来看看C++14中的用法：
> 代码3-22 [使用内部 Lambda 来实现 Lambda 递归](https://wandbox.org/permlink/B0ueQ9nbZmr8PQE3)
```cpp
int main() {
    const auto factorial = [](int n) noexcept {
        const auto f_impl = [](int n, const auto &impl) noexcept -> int {
            return n > 1 ? n * impl(n - 1, impl) : 1;
        };
        return f_impl(n, f_impl);
    };
    return factorial(5);
}
```
这次我们创建了一个内部 Lambda （`f_impl`）来执行主逻辑。 同时，我们向它传递一个泛型参数 `const auto& impl` ， 这个参数是一个我们可以递归调用的可调用对象。 多亏了 C++14 中的泛型 Lambda，我们可以避免 `std::function` 的开销并依赖 `auto` 进行类型推导。
### 更多技巧
可以参阅下面两个链接来学习更多关于lambda递归的技巧：
- [Recursive lambda functions in C++11](https://stackoverflow.com/questions/2067988/recursive-lambda-functions-in-c11)
- [Recursive lambdas in C++(14) - Pedro Melendez](http://pedromelendez.com/blog/2015/07/16/recursive-lambdas-in-c14/)
### 使用递归 Lambda 是最好的选择吗？
在本节中，我们学到了一些有关 Lambda 表达式的技巧。尽管如此，这些技巧实现起来的复杂性远远高于仅使用常规递归函数调用的简单解决方案。 这就是为什么在某些情况下递归 Lambda 不是最好和最直接的选择。

另一方面，复杂递归 Lambda 的优点是它的局部性和采用 `auto` 参数的能力。
## 8. 总结
在本章， C++14 为 Lambda 表达式带来了几个关键性的改进。由于 C++14 可以在 Lambda 范围内声明新的变量，开发者可以在模板代码中更高效的使用 Lambda 。

在下一章中，我们会移步 C++17，来看看更多的 Lambda 更新。
