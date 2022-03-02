# 五、Lambda in C++20
2020 年 2 月，在捷克首都布拉格的会议上，ISO 委员会最终通过 C++20 标准，并宣布其将于 2020 年末正式发布。新的标准规范为 C++ 语言本身和标准库都带来了诸多显著性的提升和改进！ Lambda 表达式也得到了一些更新。

本章中，主要关注下列内容：

- C++20 中的变化
- 新的选择 - 捕获 `this` 指针
- 模板 Lambda
- 如何通过 `concepts` 提高泛型 Lambda
- 如何在 Lambda 中使用 `constexpr` 算法
- 如何使 `overloaded` 模式更加简短

你可以在 [N4681](https://timsong-cpp.github.io/cppwp/n4861/) 中的 [[expr.prim.lambda]](https://timsong-cpp.github.io/cppwp/n4861/expr.prim.lambda) 章节查阅标准规范中 Lambda 相关的内容。
## 1. Lambda 语法更新
在 C++20 中，Lambda 的语法得到了改进：

- 现在可以在参数列表后添加 `consteval` 关键字
- 现在明确模板尾（template tail）是可选的
- 现在在尾部返回后，可以添加 `requires` 声明

```cpp
[] <tparams> () specifiers exception attr -> ret requires { /*code; */ }
^  ^          ^  ^                            ^
|  |          |  |                            |
|  |          |  |                     optional: trailing return type
|  |          |  |
|  |          |  optional: mutable, constexpr, consteval, noexcept, attributes
|  |          |
|  |          parameter list (optional when no specifiers added)
|  |
|  optional: template parameter list
|
lambda introducer with an optional capture list
```

## 2. 更新快览
C++20 中 Lambda 表达式的相关特性：

- 允许 `[=, this]` 作为 Lambda 捕获 - [P0409R2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0409r2.html) 并且弃用了通过 `[=]` 隐式捕获 `this` - [P0806](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0806r2.html)
- 初始化捕获中的包扩展：`[...args = std::move(args)](){}` - [P0780](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0780r2.html)
- `static` ， `thread_local` 和 Lambda 捕获的结构化绑定 - [P1091](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1091r3.html)
- 模板 Lambda （带有 `concepts` ） - [P0428R2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0428r2.pdf)
- 简化显式的 Lambda 捕获 - [P0588R1](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0588r1.html)
- 默认可构造和可分配的无状态 Lambda - [P0624R2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0624r2.pdf)
- 未评估上下文的 Lambda - [P0315R4](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0315r4.pdf)
- constexpr 算法 - 十分重要 [P0202](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0202r3.html) ， [P0879](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0879r0.html) 和 [P1645](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1645r1.html)

如果想了解更多 C++20 的内容，你可以阅读此篇比较 C++17 和 C++20 的文章：[Changes between C++17 and C++20](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2131r0.html)

当然你也可以阅读我关于 C++20 语言和标准库特性的的卡片笔记：[Bartek's coding blog: C++20 Reference Card](https://www.cppstories.com/2020/01/cpp20refcard.html/)

快速预览下这些新的改变：

新添加的功能“清理”了 Lambda 语法。同时，C++20 也增强了部分功能，允许我们在高级场景中使用 Lambda。

例如，根据 [P1091](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1091r3.html) ，我们可以捕获一个结构化绑定：

> 代码5-1 [在 Lambda 中捕获结构化绑定](https://wandbox.org/permlink/7d8oK3o5nP3wYbWB)

```cpp
#include <string>
#include <tuple>

auto GetParams() {
    return std::tuple{std::string{"Hello World"}, 42};
}

int main() {
    auto [x, y] = GetParams();
    const auto ParamLength = [&x, &y]() {
        return x.length() + y;
    }();
    return ParamLength;
}
```

一些编译器（如 GCC ）甚至在 C++17 中就支持了捕获结构化绑定，即便当时的标准并未强制哟求。

C++20 标准也有关于 `*this` 捕获的阐明。现在在方法中进行值捕获 `[=]` 会收到一条警告：

> 代码5-2 [隐式捕获 `*this` 的警告](https://wandbox.org/permlink/yRosU85B0Q9LnwOv)

```cpp
struct Baz {
    auto foo() {
        return [=] { std::cout <<s <<'\n'; };
    }
    std::string s;
};
```

GCC9 下进行编译会有如下的警告：

```plaintext
warning: implicit capture of 'this' via '[=]' is deprecated in C++20
```

为什么会出现这条警告呢？因为就算是使用 `[=]` 捕获的 `this` 也是作为指针的形式出现，所以不如显式的指明它更好：`[=, this]` 或者 `[=, *this]` 。

快速回顾之后，让我们来看看 C++20 中与 Lambda 相关的更突出的特性。
## 3. consteval Lambda
从 C++11 起， `constexpr` 就允许函数在编译期间执行了，但是同时，也可以在运行时执行这些函数。在某些情况下，最好的做法是将部分功能限制在编译期时进行。

这就是为什么 C++20 中引入了新的关键字，来创建符合 `constexpr` 规则但只能在编译期执行的函数，这些函数也被称为 **“即时函数（Immediate Function）”**。

这个新的关键字也可以用在 Lambda 上。看个简单的例子吧：

> 代码5-3 [一个简单的即时 Lambda 函数](https://wandbox.org/permlink/3lFNMB080LBz2d1z)

```cpp
int main() {
    const int x = 10;
    auto lam = [](int x) consteval {
        return x + x;
    };
    return lam(x);
}
```

我们将新的关键字 `consteval` 放在了 Lambda 的参数列表之后，类似于 `constexpr` 的用法。严格的区别就在于，如果你将 `x` 的 `const` 移除，那么 `constexpr` Lambda表达式仍旧可以在运行时工作，但是即时 Lambda 函数将无法成功编译。

默认情况下，如果 Lambda 函数体中遵循 `constexpr` 函数的规则，那么编译器会将调用操作符标记为隐式的 `constexpr` 。

这并非 `consteval` 案例，因为它对类似这样的代码拥有更强的限制。

当然，这两个关键字无法同时使用。在草案 [P1073R3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1073r3.html) 中你可以找到与此相关的全部描述。

## 4. 捕获参数包
C++20 中还对 Lambda 中初始化捕获的包扩展带来了一个提升：

```cpp
template<typename...Args>
void call(Args&& ... args) {
    auto ret = [...capturedArgs = std::move(args)](){};
}
```

先前，在 C++20 之前，这段代码是无法通过编译的（参考 C++11 章节中[这部分](../Chapter2/README.md#捕获参数包)内容），为了解决这个问题，需要将参数打包进一个单独的元组中去。

关于捕获限制相关的历史内容，你可以参考 [P0780](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0780r2.html) 中的描述。

综上所述，我们可以使用在 C++11 章节中有关捕获一个可变参数包的例子并在 C++20 中新特性的加持下实践下。

看下面的例子，利用折叠表达式来打印每个被捕获的参数：

> 代码5-4 [捕获可变参数包](https://wandbox.org/permlink/8Bjc78jm2OpfcOcN)

```cpp
#include <iostream>
#include <memory>

template <class First, class... Args>
void captureTest(First&& first, Args&&... args) {
    const auto printer = [first = std::move(first), ... capturedArgs = std::move(args)] {
        std::cout << first;
        ((std::cout << ", " << capturedArgs), ...);
        std::cout << '\n';
    };
    printer();
}

int main() {
    auto ptr = std::make_unique<int>(10);
    captureTest(std::move(ptr), 2, 3, 4);
    captureTest(std::move(ptr), 'a', 'b');
}
```

输出：

```plaintext
0x1f0cb20, 2, 3, 4
0, a, b
```

在示例中，我们使用了一个 `printer` 对象，它很类似在 C++17 中写过的那样，但是在这儿我们用来捕获变量而不是作为转发 Lambda 参数使用。

代码中甚至传递了一个 `unique` 指针。我们传递了两次并且你可以看到在第二次调用时得到的结果为 `0` ，因为此时指针已经丢失了它对那块内存块的所有权。
## 5. 模板 Lambda
C++14 中就已经引入了泛型 Lambda，并且可以在模板中将参数类型也声明为 `auto` 类型。

例如：

```cpp
[] (auto x) { x; };
```

编译器会生成一个调用操作符对应以下的模板方法：

```cpp
template <typename T>
void operator ()(T x) { x; }
```

但是，这似乎没有办法去直接改变这个模板的参数，并且使用“真实”的模板参数。

C++20 下，这都是可能的。

比如，如何限制 Lambda 仅对 `vector` 类型生效呢？

如下，有一个泛型 Lambda：

```cpp
auto foo = [](auto& vec) {
    std::cout << std::size(vec) << '\n';
    std::cout << vec.capacity() << '\n';
};
```

但是，如果你调用它并传入一个 `int` 参数（如 `foo(10)`），那你可能会遇到“晦涩难懂”的错误提示：

```cpp
test.cc: In instantiation of
         'main()::<lambda(const auto:1&)> [with auto:1 = int]':
test.cc:16:11:   required from here
test.cc:11:30: error: no matching function for call to 'size(const int&)'
               11 | std::cout<< std::size(vec) << '\n';
```

在 C++20 中，可以这样写：

```cpp
auto foo = []<typename T>(std::vector<T> const& vec) {
    std::cout << std::size(vec) << '\n';
    std::cout << vec.capacity() << '\n';
};
```

它所对应的模板调用操作符为：

```cpp
<typename T>
void operator()(std::vector<T> const& s) { ... }
```
这样模板参数就在捕获子句 `[]` 之后了。

现在进行类似 `foo(10)` 的调用，那么会收到一个较人性化的消息：
```plaintext
note:   mismatched types 'const std::vector<T>'and 'int'
```

[上述例子](https://wandbox.org/permlink/gupbJfUfHHQ2y48q)中，编译器会警告我们关于 Lambda 接口中的这个错误的匹配。

另外有一个重要的方面就是，在泛型 Lambda 的示例中，你只拥有一个变量而不是它的模板类型。

如果要访问类型，则需要使用 `decltype(x)` （对于带有 `auto x` 参数的 Lambda）。

这将会使得你的代码变得冗长。

例如（使用了 [P0428](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0428r2.pdf) 中的代码）：

> 代码5-5 从泛型参数中推断

```cpp
auto f = [](auto const& x) {
    using T = std::decay_t<decltype(x)>;
    T copy = x;
    T::static_function();
    using Iterator = typenameT::iterator;
}
```

现在可以这样编写：

> 代码5-6 使用模板 Lambda

```cpp
auto f = []<typename T>(T const& x) {
    T copy = x;
    T::static_function();
    using Iterator = typenameT::iterator;
}
```

和明显，在第一种写法中，我们不得不使用

```cpp
using T = std::decay_t<decltype(x)>;
```

为了得到输入参数的类型，在 C++20 版本中，没有必要去访问模板参数了。

除此之外，还有一个重要的使用场景就是在可变泛型 Lambda 中进行完美转发：

```cpp
// C++17
auto ForwardToTestFunc = [](auto&&... args) {
    // what's the type of `args` ?
    return TestFunc(std::forward<decltype(args)>(args)...);
};
```

每次你想要访问模板参数的类型是，你都需要去使用 decltype() ，但是在模板lambda中就不需要了：

```cpp
// C++20
auto ForwardToTestFunc = []<typename... T>(T && ... args) {
    return TestFunc(std::forward<T>(args)...);  // we have allthe types!
};
```

怎么样？模板 Lambda 提供了更为清晰的语法和更好的访问参数类型的途径。

当然，这还不够，你甚至也可以在 Lambda使用 `concept` ，咱们接着往下看。
## 6. Concept 和 Lambda
`concept` 是编写模板的一项革命性进步。

它将允许你对模板参数进行约束，这可以极大提高代码的可读性，可能提升编译速度甚至能够提供更友善的错误信息。

话不多说，看个简单的示例吧：

> 代码5-7 一个普通的 `concept` 声明

```cpp
// define a concept:
template <class T>
concept SignedIntegral = std::is_integral_v<T> && std::is_signed_v<T>;
// use:
template <SignedIntegral T>
void signedIntsOnly(T val) {}
```

我们首先创建了一个 `concept` 描述类型为有符号的并且是整形。

请注意我们可以已有的类型特征。

之后，我们使用她来定义一个仅支持能匹配 `concept` 类型的模板函数。

在这我们没有使用 `typename T` ，但是我们可以引用一个 `concept` 名字。

好了，简单了解了 `concept` 之后，那么怎么跟 Lambda 关联起来呢？

关键部分就在于精炼语法以及约束 `auto` 模板参数。

### 简化和精炼的语法

得益于 `concept` 精炼的语法特性，你也可以不用在编写模板时候带有 `template<typename ..>` 部分了。

使用无约束的 `auto` ：

```cpp
void myTemplateFunc (auto param) {}
```

使用有约束的 auto ：

```cpp
void signedIntsOnly (SignedIntegral auto val) {}
void floatsOnly (std::floating_point auto fp) {}
```

这些语法跟在 C++14 中编写泛型 Lambda 时很像，当然，现在你可以这样做：

```cpp
void myTemplateFunction (auto val) {}
```

换句话说，对于lambda，我们可以利用它精炼的风格，例如对泛型 Lambda 参数添加额外的限制。

```cpp
auto GenLambda = [](SignedIntegral auto param) { return param * param + 1; }
```

上面的例子利用 `SignedIntegral` 来限制 `auto` 参数。

但是整个表达式比起模板 Lambda 看上去更加的可读，这就是为什么我们要着重讨论的点了。

来一个有点难度的例子吧，我们甚至可以为一些类的接口定义 `concept` ：

> 代码5-8 IRenderable concept, with requires keyword

```cpp
template <typename T>
concept IRenderable = requires(T v) {
    { v.render() } -> std::same_as<void>;
    { v.getVertCount() } -> std::convertible_to<size_t>;
};
```

上面这个例子定义了一个带有 render() 和 getVertCount() 成员函数，用来匹配全部类型的 concept。

使用它来写一个泛型 Lambda 试试：

> 代码5-9 [IRenderable concept/Interface 的实现](https://wandbox.org/permlink/5jLMVJIckSvDdgMv)

```cpp
#include <concepts>
#include <iostream>

template <typename T>
concept IRenderable = requires(T v) {
    { v.render() } -> std::same_as<void>;
    { v.getVertCount() } -> std::convertible_to<size_t>;
};

struct Circle {
    void render() {
        std::cout << "drawing circle\n";
    }
    size_t getVertCount() const {
        return 10;
    };
};

struct Square {
    void render() {
        std::cout << "drawing square\n";
    }
    size_t getVertCount() const {
        return 4;
    };
};

int main() {
    const auto RenderCaller = [](IRenderable auto& obj) {
        obj.render();
    };
    Circle c;
    RenderCaller(c);
    Square s;
    RenderCaller(s);
}
```

这个例子中 `RenderCaller` 就是一个泛型 `Lambda` ，并且支持类型必须满足 `IRenderable concept`。
## 7. 无状态 Lambda 的变更
也许你会想起来 C++11 中我们提过的无状态、甚至没有默认构造化的 Lambda。

然而，这个限制在 C++20 中被解除了。

这就是为什么假如你的 Lambda 没有捕获任何东西的情况下，你也可以写下如下的代码：

> 代码5-10 [一个无状态 Lambda](https://wandbox.org/permlink/nWXXJiZyk8ZhVej9)

```cpp
#include <iostream>
#include <set>
#include <string>

struct Product {
    std::string _name;
    int _id{0};
    double _price{0.0};
};

int main() {
    const auto nameCmp = [](const auto& a, const auto& b) {
        return a._name < b._name;
    };
    const std::set<Product, decltype(nameCmp)> prodSet{
            {"Cup", 10, 100.0}, {"Book", 2, 200.5}, {"TV set", 1, 2000}, {"Pencil", 4, 10.5}};
    for (const auto& elem : prodSet)
        std::cout << elem._name << '\n';
}
```

例子中我声明了一个集合用来存储一系列的产品。

同时我需要一个办法来比较这些产品，所以我传入了一个无状态的 Lambda 用来比较他们的产品名。

如果用 C++17 编译，那么你会收获如下关于使用了删除默认构造器的错误说明：

```plaintext
test.h: In constructor
'std::set<_Key, _Compare, _Alloc>...
[with _Key = Product;
      _Compare = main()::<lambda(const auto:1&, const auto:2&)>;
...'
test.h:244:29: error: use of deleted function
'main()::<lambda(const auto:1&, const auto:2&)>::<lambda>()'
```

但是在 C++20 中，你可以存储无状态 Lambda ，甚至可以拷贝他们：

> 代码5-11 [存储无状态Lambda](https://wandbox.org/permlink/wTMFVluKdDbsLyOK)

```cpp
template <typename F>
struct Product {
    int _id{0};
    double _price{0.0};
    F _predicate;
};

int main() {
    const auto idCmp = [](const auto& a) noexcept {
        return a._id != 0;
    };
    Product p{10, 10.0, idCmp};
    [[maybe_unused]] auto p2 = p;
}
```

### 补充一些关于“未评估的 concept”

还有一些与高级用例相关的变化，比如未评估的 `concept` 。

连同默认的可构造 Lambda，您现在可以编写这样的代码：

```cpp
std::map<int, int, decltype([](int x, int y) { return x >y; })> map;
```

如您所见，现在可以在声明映射容器中指定 Lambda。 它可以用作比较器仿函数。

这种“未评估 `concept` ”对于高级模板元编程特别方便。

例如，在该功能的提案中，作者提到在编译时使用断言对元组对象进行排序，该断言是一个 Lambda。

更多的内容可以参考 [P0315R2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0315r2.pdf) 。

## 8. Lambda 和 `constexpr` 算法
回想一下之前章节中的内容，自 C++17 依赖，我们可以使用 `constexpr` Lambda。

并且，由于这项功能，我们可以传递 Lambda 给一个需要在编译器评估的函数。

在 C++20 中大多数标注算法都可以被关键字 `constexpr` 标记，这使得 `constexpr` Lambda 用起来更加方便了。

看一些例子吧还是。

> 代码5-12 [在普通的 constexpr Lambda中使用 std::accumulate()](https://godbolt.org/z/Tqkphs)

```cpp
#include <array>
#include <numeric>
int main() {
    constexpr std::array arr{1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    // with constexpr lambda
    static_assert(std::accumulate(begin(arr), end(arr), 0, [](auto a, auto b) noexcept {
        return a + b;
    }) == 55);
    return arr[0];
}
```

本例中，在 Lambda 中使用 `std::accumulate` ，实际上使用的还是 `std::plus` 操作。

下个例子中，使用了一个带有 `cmp` 比较器 `cout_if` 算法的 `constexpr` 函数。

> 代码5-13 [给普通函数中传入一个 `constexpr` Lambda](https://godbolt.org/z/ouJ_4q)

```cpp
#include <algorithm>
#include <array>
constexpr auto CountValues(auto container, auto cmp) {
    return std::count_if(begin(container), end(container), cmp);
}
int main() {
    constexpr auto minVal = CountValues(std::array{-10, 6, 8, 4, -5, 2, 4, 6}, [](auto a) {
        return a >= 0;
    });
    return minVal;
}
```

> 哪些标准算法是可以 `constexpr` 的呢？
> 所有 `<algorithm>` ，`<utility>` 和 `<numeric>` 头文件中的算法现在都可以被关键字 `constexpr` 标记。除了 `shuffle`, `sample`, `stable_sort`, `stable_partition`, `inplace_merge` 这些，以及接受执行策略参数的函数或重载函数。
> 具体的内容可以查阅 [P0202](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0202r3.html) ， [P0879](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0879r0.html) 和 [P1645](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1645r1.html) 。

## 9. C++20 对重载模式的更新
在前一章中，学习过如何从多个 Lambda 表达式派生并通过重载模式暴露它们。

这种技术对于 `std::variant` 访问很方便。

得益于 C++20 中类模板参数推断（CTAD，Class Template Argument Deduction）的更新，现在可以用更简短的语法来实现了。

为什么？

这是因为在 C++20 中有 CTAD 的扩展并且会自动处理聚合。

这意味着无需编写自定义的推断。

来一个简单的例子：

```cpp
template<typename T, typename U, typename V>
struct Triple { T t; U u; V v; };
```

在 C++20 中的写法：

```cpp
Triple ttt { 10.0f, 90, std::string{"hello"}};
```

`T` 将被自动推断为 `float` ，`U` 为 `int`，`V` 为 `std::string`。

C++20 中的重载模式：

```cpp
template<class... Ts> struct overload: Ts... { using Ts:: operator()...; };
```

这个特性的草案可以在 [P1021](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1021r5.html) 和 [P1816](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1816r0.pdf) 中查阅。

> GCC10 似乎实现了这个提议，但是它不适用于继承的高级案例。因此我们需要等待 GCC 对该特性进行完整的支持。

## 10. 总结
在本章中，我们回顾了 C++20 带来的变化。

首先，一些澄清和改进：例如捕获 `this` 、捕获结构化绑定或默认构造无状态 Lambda 的能力。

更重要的是，还有更多重要的补充！

现在突出的功能之一是模板 Lambdas 和概念。

这样您就可以更好地控制通用 Lambdas。

总而言之，使用 C++20 及其所有功能，使得 Lambda 愈发成为更强大的工具！
