# 二、Lambda in C++11
这真是激动人心的时刻。C++委员会听取了开发者们的声音，从 C++11 开始，我们终于拥有了 Lambda 表达式。

Lambda 很快就成为了现代 C++ 最广为认可和使用的特性。

你可以阅读 [N3337](https://timsong-cpp.github.io/cppwp/n3337/) 草案 —— C++11 的最终草案 —— 中 [[expr.prim.lambda]](https://timsong-cpp.github.io/cppwp/n3337/expr.prim.lambda) 章节中的 Lambda 规范。

我认为委员会把 Lambda 加入进来是一个明智的做法，对于 C++ 这个语言本身而言。他们引进了一种新的语法，而编译器会去将其展开为一个未命名的“隐藏”方函数对象。引入 Lambda ，对于一种真正的强类型语言，有很多优点（当然也有缺点），同时这种特性也更容易去推断代码的意图。

在本章节，你可以学习到：

- Lambda 的基础语法
- 如何捕获变量
- 如何捕获成员变量
- Lambda 的返回类型
- 什么是闭包对象
- Lambda 如何转换为一个函数指针以及用C风格的API来调用
- IIFE 是什么
- 如何从 Lambda 表达式继承以及它为什么有用

## 1. Lambda 表达式的语法
下面就是 Lambda 语法的「公式」和说明：

```plaintext
[] () specifiers exception attr -> ret { /*code; */ }
^  ^  ^                            ^
|  |  |                            |
|  |  |                            可选: 尾部返回类型
|  |  |
|  |  可选: 可变、异常说明或者 noexcept 、属性
|  |
|  参数列表 (当不添加说明符时可选)
|
Lambda 引入器以及捕获列表(可选)
```

在我们开始学习 Lambda 之前，需要从 C++ 标准中引入一些核心定义：

- 闭包对象在 [[expr.prim.lambda#2]](https://timsong-cpp.github.io/cppwp/n3337/expr.prim.lambda#2) 中，有如下定义：
> 对 lambda 表达式进行求值会产生一个 `prvalue` 类型的临时值。 这个临时对象叫做**闭包对象**。
- 闭包类型在 [[expr.prim.lambda#3]](https://timsong-cpp.github.io/cppwp/n3337/expr.prim.lambda#3) 中，有如下定义：
> lambda 表达式的类型（也是闭包对象的类型）是唯一未命名的“非联合”类型——称为**闭包类型**

### Lambda 表达式的一些例子

```cpp
// 1. 一个最简单的lambda
[]{};
```

在第一个例子中，你可以看见一个“最小巧”的 Lambda 表达式。它仅需要`[]`和一个空的函数体`{}`。参数列表`()`是可选的，所以在本例中不需要。

```cpp
// 2. 带有两个参数的lambda
[](float f, int a){ return a * f;};
[](int a, int b){ return a < b };
```

在第二个例子中，你可以看到参数在`()`部分被传入进去，就和常规函数一样。返回类型是不需要的，因为编译器会自动推断它。

```cpp
// 3. 带有尾返回类型的lambda
[](MyClass t) -> int { auto a = t.compute(); print(a); return a; };
```

在第三个例子中，我们显示地定义了返回类型。从 C++11 开始，这个尾部返回类型其实和常规函数的声明方式是一样的。

```cpp
// 4. 带有额外描述符的lambda
[x](int a, int b) mutable{ ++x; return a < b; };
[](float param) noexcept{ return param * param; };
[x](int a, int b) mutable noexcept{ ++x; return a < b; };
```
第四个例子展示了在 lambda 表达式的函数体前，你可以添加额外的描述符。

如上代码，我们使用 `mutable`（这样我们就可以改变捕获的变量）也可以是 `noexcept` 。第三个 lambda 表达式同时使用了 `mutable` 和 `noexcept` ，请注意顺序（当书写为 `noexcept mutable` 时，无法编译通过）。

虽然()部分是可选的，但是如果你想要应用 `mutable` 或者 `noexcept` ，那么`()`则必须在表达式书写。

```cpp
// 5. 可选()的lambda
[x] { std::cout << x; }; // 正确，无需()
[x] mutable { ++x; };    // 编译失败
[x]() mutable { ++x; };  // 正确，mutable前需要()
[] noexcept {};          // 编译失败
[]() noexcept {};        // 正确
```

同样的模式也可以在其他描述符中被应用在 lambda 中，像 C++17 的 `constexpr` 和 C++20 中的 `consteval` 。

#### 属性

Lambda 语法也允许使用以下形式引入的属性：`[[attr_name]]`。

然而，如果你试图在lambda应用一个属性，那么这个属性是被应用在调用操作符的类型上，而不是操作符本身。

这就是为什么现在（甚至在 C++20 ）中都没有对lambda真正有意义的属性存在。

大多数编译器甚至会报错。如果我们使用 C++17 的属性并尝试应用在 Lambda 表达式中：

```cpp
auto myLambda = [](int a)[[nodiscard]]{ return a * a; };
```

使用 [Clang](https://wandbox.org/permlink/3zfzL1NNpPXXgLOx) 编译，就会产生如下的编译错误：

```bash
error: 'nodiscard' attribute cannot be applied to types
```

### Lambda 在编译器的展开

总结一下，这儿有一个基础的代码用例来展示下编写 Lambda 表达式并应用在 `std::for_each` 中去。作为对比，我们也编写了一个相应功能的仿函数类型：

> 代码2-1 [Lambda表达式和对应的仿函数](https://wandbox.org/permlink/XXR02LXYAngHF5dt)

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    struct {
        void operator()(int x) const {
            std::cout << x << '\n';
        }
    } someInstance;

    const std::vector<int> v{1, 2, 3};
    std::for_each(v.cbegin(), v.cend(), someInstance);
    std::for_each(v.cbegin(), v.cend(), [](int x) {
        std::cout << x << '\n';
    });
}
```

对于这个例子，编译器会将 Lambda 表达式

```cpp
[](int x) { std::cout << x << 'n'; };
```

转化为一个简化格式的匿名仿函数：

```cpp
struct {
    void operator()(int x) const {
        std::cout << x << '\n';
    }
} someInstance;
```

这种转换或者“展开”的过程，可以在 [C++ Insights](https://cppinsights.io/) 上查看，这是一个可以查看合法 C++ 代码转化为编译器源码视图的在线工具，包括 Lambda 达式的展开以及模板初始化的过程。

下一节中，我们会深入研究下 Lambda 表达式的各个部分。

## 2. Lambda 表达式的类型
由于编译器会生成给每个 Lambda（闭包类型）生成一个唯一名称，所以没有办法预先“拼写”出它的类型。

这就是为什么你需要使用 `auto` 或者 `decltype` 关键字来推断类型了。

```cpp
auto myLambda = [](int a) -> double { return 2.0 * a; };
```

当然，下面这两lambda也是一样的。

```cpp
auto firstLam = [](int x) { return x * 2; };
auto secondLam = [](int x) { return x * 2; };
```

这俩 Lambda 拥有完全一样的代码，但是他们的类型是不同的。编译器会推断为两个 Lambda 表达式推断出各自独立的未命名类型。

我们可以用下面的代码来证明这个性质：

> 代码2-2 [同样的代码，不同的类型](https://wandbox.org/permlink/dimC66ghOFL3GF3q)

```cpp
#include <type_traits>

int main() {
    const auto oneLam = [](int x) noexcept {
        return x * 2;
    };
    const auto twoLam = [](int x) noexcept {
        return x * 2;
    };
    static_assert(!std::is_same<decltype(oneLam), decltype(twoLam)>::value, "must be different!");
}
```

这个例子可以用来验证两个 Lambda（ `oneLam` 和 `twoLam` ）的闭包类型是否一致。

> 在 C++17，我们可以使用不带消息的 `static_assert` 和推断类型特征的变量模板辅助函数 `is_same_v` ：

```cpp
static_assert(std::is_same_v<double, decltype(baz(10))>);
```

但是，尽管你不知道确切的类型名，你可以将 Lambda 的签名存储在 `std::function` 中使用。

通常来说，如果定义为 `auto` 的 Lambda 无法解决的，可以通过定义为 `std::function` 类型来解决。

举个例子，之前的 Lambda 有一个 `double(int)` 的签名（参数为 `int` 返回 `double` ）。我们可以通过以下方式创建一个 `std::function` 对象：

```cpp
std::function<double(int)> myFunc = [](int a) -> double { return 2.0 * a; };
```

`std::function` 是一个“笨重”的对象，因为他需要操控全部的可调用对象。为了实现这一点，他需要一套先进的内核机制，比如[类型双关（Type punning）](https://zh.wikipedia.org/wiki/%E7%B1%BB%E5%9E%8B%E5%8F%8C%E5%85%B3)或者甚至动态内存分配。来试试下面这个例子：

> 代码2-3 [`std::function` 和 `auto` 类型推断](https://wandbox.org/permlink/bTJHEc4uWAMTteyN)

```cpp
#include <functional>
#include <iostream>

int main() {
    const auto myLambda = [](int a) noexcept -> double {
        return 2.0 * a;
    };

    const std::function<double(int)> myFunc = [](int a) noexcept -> double {
        return 2 .0 * a;
    };

    std::cout << "sizeof(myLambda) is " << sizeof(myLambda) << '\n';
    std::cout << "sizeof(myFunc) is " << sizeof(myFunc) << '\n';

    return myLambda(10) == myFunc(10);
}
```

用 GCC 编译并运行，将会输出：

```bash
sizeof(myLambda) is 1
sizeof(myFunc) is 32
```

因为 `myLambda` 仅仅是一个无状态 Lambda ，所以它也是一个没有任何数据成员字段的空类，这也就是为什么它的大小只有1字节的原因。

而 `std::function` 版本则占用了 32 字节。所以，一目了然，这就是为什么你应该尽可能使用 `auto` 类型推断来获取占用内存更少的闭包对象了。

当然，我们也不得不去深入讨论 `std::function` 的使用，因为它不支持只能移动（moveable-only）的闭包对象。

我们会在 C++14 章可移动类型一节 来详细介绍这部分内容。

### 构造，还是拷贝？
在[[expr.prim.lambda#19]](https://timsong-cpp.github.io/cppwp/n3337/expr.prim.lambda#19)中有一个规则：

> Lambda 表达式产生的闭包对象是**删除**了 *默认构造函数* 和 *拷贝赋值运算符* 的。但是它包含隐式声明的 **拷贝构造函数** 以及 **移动构造函数。**

由于这个规则的存在，所以你无法这样编写代码：

```cpp
auto foo = [&x, &y]() { ++x; ++y; };
decltype(foo) fooCopy
```
GCC 会提示如下错误：
```bash
error: use of deleted function'main()::<lambda()>::<lambda>()'
       decltype(foo) fooCopy;
                  ^~~~~~~
note:a lambda closure type has a deleted default constructor
```

但是，你可以拷贝 Lambda：

> 代码2-4 [拷贝 Lambda](https://wandbox.org/permlink/F50TYeCwooAWaruV)

```cpp
#include <type_traits>

int main() {
    const auto firstLam = [](int x) noexcept {
        return x * 2;
    };

    const auto secondLam = firstLam;
    static_assert(std::is_same<decltype(firstLam), decltype(secondLam)>::value, "must be the same");
}
```

如果拷贝了一个 Lambda（实际上发生的是拷贝构造），它的状态也会被拷贝过来。这一点对于捕获对象来说很重要。

因为，一个闭包类型会存储捕获的对象作为其成员字段。所以，当进行 Lambda 拷贝时，会拷贝那些数据成员字段。

> 在 C++20 中，无状态 Lambda 会拥有默认的构造器和拷贝赋值。

## 3. 调用操作符
我们传入 Lambda 中的参数部分，会被“转译”为相应闭包类型的调用操作符的参数。

默认情况下，在 C++11 中，他会被“转译”为一个常量内联成员函数。例如

```cpp
auto lam = [](double param) { /*do something*/ };
```

将被编译器展开为：

```cpp
struct __anonymousLambda {
    inline void operator()(double param) const { /*do something*/ }
};
```

### 重载
有一件事情值得提一下，那就是当你定义了一个lambda时，你不能创建它的任何重载形式来传入不同的参数。

```cpp
// 无法编译
auto lam = [](double param) { /* do something */ };
auto lam = [](int param) { /* do something */ };
```

上面的代码将无法通过编译，因为编译器会将他们“转译”为一个仿函数，当然这就意味着无法重新定义一个相同的变量。但是，你可以在一个仿函数中定义两个调用操作符的重载形式，这是允许的：

```cpp
struct MyFunctor {
    inline void operator()(double param) { /* do something */ };
    inline void operator()(int param) { /* do something */ };
};
```

`MyFunctor` 现在就可以同时接受 `double` 和 `int` 参数了。如果你想在 Lambda 中实现相似的效果，那么你可以看看这部分内容 [Lambda继承]()

### 其他修饰符
我们在 Lambda 语法 一节中简略介绍过这部分主题，但是你并不会被闭包类型调用操作符的默认声明所限制到。在 C++11 中，你可以添加 `mutalbe` 或者异常描述符。

> 如果可能的话，本书会使用长例子来用 `const` 标记闭包对象并且使 Lambda 为 `noexcept` 。

你可以通过在参数声明后面那部分指定 `mutable` 或者 `noexcept` 来使用这些关键字。

```cpp
auto myLambda = [](int a) mutable noexcept { /* do something */ };
```

编译器会展开为：

```cpp
struct __anonymousLambda {
    inline void operator()(int a) noexcept{ /* do something */ }
};
```

请注意， `const` 关键字此时会消失，并且调用操作符可以修改 Lambda 的成员变量了。

但是，成员变量呢？我们要如何在 Lambda 中声明成员变量？请看下一个章节——关于“捕获”变量

## 4. 捕获
**捕获子句** - `[]` 操作符绝不仅仅只是 Lambda 的引入符号，同时它还兼顾捕获变量的列表的职能。

通过从 Lambda 表达式外部捕获变量，你可以在闭包类型中创建成员变量（非静态成员），然后，在 Lambda 函数体中，你就可以使用它了。

我们可以弄一个类似于 C++98/03 章节中 `PrintFunctor` 的内容，在这个类中，我们添加成员变量 `std::string strText` 并让他在构造函数中被初始化。

拥有一个成员变量可以让我们存储可调用对象的一些状态了。

一些有关捕获器的语法：

- `[&]` - 引用捕获，自动捕获声明在捕获范围内的生命周期尚未结束的变量。
- `[=]` - 值捕获（创建拷贝），自动捕获声明在捕获范围内的生命周期尚未结束的变量。
- `[x, &y]` - `x` 为值捕获， `y` 为显式引用捕获。
- `[args...]` - 捕获一个模板参数包，全部都是值捕获
- `[&args...]` - 捕获一个模板参数包，全部都是引用捕获
一些例子：

```cpp
int x = 2, y = 3;
const auto l1 = []() {
    return l1;
};  // 没有捕获
const auto l2 = [=]() {
    return x;
};  // 值捕获（拷贝）
const auto l3 = [&]() {
    return y;
};  // 引用捕获
const auto l4 = [x]() {
    return x;
};  // 仅值捕获x
const auto lx = [= x]() {
    return x;
};  // 错误的语法，不需要=来对x显式进行拷贝（值捕获）
const auto l5 = [&y]() {
    return y;
};  // 仅引用捕获y
const auto l6 = [x, &y]() {
    return x * y;
};  // 值捕获x，引用捕获y
const auto l7 = [=, &x]() {
    return x + y;
};  // 全部都是值捕获，除了x是引用捕获
const auto l8 = [&, y]() {
    return x - y;
};  // 全都是引用捕获，除了y是值捕获
```

为了理解在捕获变量的过程中发生了什么，让我们一起来思考下面这个例子：

> 代码2-5 捕获一个变量

```cpp
std::string str{"Hello World"};
auto foo = [str]() {
    std::cout << str << '\n';
};
foo();
```

上面这个 Lambda ， `str` 被值捕获（构造了一个拷贝）。编译器将自动生成这样的仿函数：

> 代码2-6 编译器可能生成的仿函数，单变量

```cpp
class __unnamedLambda {
public:
    inline /*constexpr */ void operator()() const {
        std::operator<<(std::operator<<(std::cout, str), '\n');
    }

private:
    std::string str;

public:
    __unnamedLambda(std::string _str) : str{_str} {}
};
```

如上述的展开代码，一个变量被传进构造函数中，在 Lambda 声明中被称为“就地”。

更准确的定义在 [[expr.prim.lambda#21]](https://timsong-cpp.github.io/cppwp/n3337/expr.prim.lambda#21) ：当解析 Lambda 表达式时，通过值捕获的实体将直接初始化在每个对应生成的闭包对象中的非静态成员数据。

当然了，上述代码中的构造函数（`__unnamedLambda`）仅仅是用作演示和解释用途，编译器真正生成的内容会与此有所差别，并且不会暴露给用户。

> 代码2-7 引用捕获两个变量

```cpp
int = 1, y = 1;
std::cout << x << " " << y << std::endl;
const auto foo = [&x, &y]() noexcept {
    ++x;
    ++y;
};
foo();
std::cout << x << " " << y << std::endl;
```

上述代码展开后，可能是：

> 代码2-8 [编译器可能生成的仿函数，双变量，引用](https://wandbox.org/permlink/da9ltcv53ECxnoEk)

```cpp
class __unnamedLambda {
public:
    inline /* constexpr */ void operator()() const noexcept {
        ++x;
        ++y;
    }

private:
    int& x;
    int& y;

public:
    __unnamedLambda(int& _x, int& _y) : x{_x}, y{_y} {}
};
```

由于我们是通过引用的方式捕获 `x` 和 `y` 的，所以闭包类型中的成员变量也是引用类型的。

> 请注意：
> 值捕获变量的值是在 Lambda **定义**时，而不是在**使用**时。
> 但是引用捕获变量的内容是在 Lambda **使用**时，而不是**定义**时。二者是有区别的。

虽然指定 `[=]` 或者 `[&]` 可能很方便，因为它会自动捕获仍在生命周期内的全部变量，但是，若能指明捕获的变量是哪些，将会更加清晰明确。

这样编译器才能警告出哪些非预期的影响（参见 全局变量 和 静态变量）。

当然，如果你想要了解更多更详细的内容，可以翻阅 Scott Meyers 所著的《Effective Modern C++》第31项——“避免默认捕获模式”的内容。

> 请注意：
> C++ 闭包不会延长被捕获引用对象的剩余生命周期。请务必确保捕获对象在 Lambda 调用时仍然“存活”。

### `mutable` 关键字

通过闭包类型默认调用操作符获取的，都是带有 `const` 关键字限定的，你无法在 Lambda 表达式内部对他们做出任何修改。

如果你希望进行修改的操作，那就需要在参数列表后添加 `mutable` 关键字。它可以有效的去除闭包类型调用操作符中的 `const` `修饰符。举一个mutable` 的简单例子：

```cpp
int x =1;
auto foo =[x]() mutable { ++x; };
```

它会被展开为：

```cpp
class __lambda_x1 {
public:
    void operator()() {
        ++x;
    }

private:
    int x;
};
```

如你所见，现在调用操作符就可以修改捕获的成员变量了。

> 代码2-8 [通过值捕获两个mutable变量](https://wandbox.org/permlink/yQZUOIcK1ncKIyEI)

```cpp
#include <iostream>

int main() {
    const auto print = [](const char* str, int x, int y) {
        std::cout << str << ": " << x << " " << y << '\n';
    };

    int x = 1, y = 1;
    print("in main()", x, y);

    auto foo = [x, y, &print]() mutable {
        ++x;
        ++y;
        print("in foo()", x, y);
    };

    foo();
    print("in main()", x, y);
}
```

输出：

```bash
in main(): 1 1
in foo(): 2 2
in main(): 1 1
```

在上述的例子中，我们可以修改 `x` 和 `y` 的值。但是，由于是从封闭区域中获取的拷贝值，所以在调用 `foo` 之后，我们无法获取到在局部区域修改的新值。

另一方面，如果使用引用捕获，那么就不需要使用 `mutable` 修饰符来修改值了。这是因为捕获的成员变量是“引用”过来的，并且不能和内部的 `const` 成员函数所绑定，所以可以对它的内容作出修改。

> 代码2-9 通过引用捕获一个变量

```cpp
int x = 1;
std::cout << x << '\n';

const auto foo = [&x]() noexcept {
    ++x;
};

foo();
std::cout << x << '\n';
```

这个例子中，Lambda 并没有应用 `mutable` 修饰符，但是我们可以修改引用的值。

需要注意的一点：当使用 `mutable` 修饰符后，就无法使用 `const` 修饰符来修饰闭包对象了，因为它会阻止你调用这个 Lambda。

```cpp
int x =10;
const auto lam =[x]() mutable { ++x; }
lam(); // 无法编译
```

由于无法在 `const` 对象中调用非 `const` 成员函数，最后一行将提示编译失败。

### 调用计数器 - 捕获变量的一个例子
在我们深入探究捕获之前，先来看看一个有关 Lambda 使用的例子：

当你想使用一些现存的 STL 中的算法函数并改变默认行为规则时，用 Lambda 表达式是十分方便的。比如，对于 `std::sort` 函数，你可以写一个自定义的比较函数。

当然，我们也可以进一步强化比较函数的功能：调用计数。

> 代码2-10 [调用计数器](https://godbolt.org/z/jG5xK7)

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
int main() {
    std::vector<int> vec{0, 5, 2, 9, 7, 6, 1, 3, 4, 8};
    size_t compCounter = 0;

    std::sort(vec.begin(), vec.end(), [&compCounter](int a, int b) noexcept {
        ++compCounter;
        return a < b;
    });

    std::cout << "number of comparisons: " << compCounter << '\n';

    for (const auto& v : vec)
        std::cout << v << ", ";
}
```

自定义的比较器和默认比较器是一致的，返回二者较小的那一个，即自然排序（升序排列）。

同时， Lambda 也向 `std::sort` 传入了捕获的本地变量 `compCounter` 来计数调用了在排序过程中多少次的比较器。

### 捕获全局变量

如果有一个全局变量，并且在 Lambda 使用了 `[=]` ，也许你会认为这样就可以值捕获全局变量了，很遗憾，事实并非如此：

> 代码2-11 [捕获全局变量](https://wandbox.org/permlink/n8wCuoeej8mGscql)

```cpp
#include <iostream>

int global = 10;

int main() {
    std::cout << global << std::endl;

    auto foo = [=]() mutable noexcept {
        ++global;
    };
    foo();
    std::cout << global << std::endl;

    const auto increaseGlobal = []() noexcept {
        ++global;
    };
    increaseGlobal();
    std::cout << global << std::endl;

    const auto moreIncreaseGlobal = [global]() noexcept {
        ++global;
    };
    moreIncreaseGlobal();
    std::cout << global << std::endl;
}
```

这个例子定义了全局变量 `global` 并且将它使用在多个 Lambda 表达式中，但是如果你运行这个程序会发现，无论通过何种方式捕获全局变量，都会发现它永远指向的是那个全局对象，而不会创建任何一个本地的拷贝对象出来。

这是因为，只有在自动存储期间的变量会被捕获。GCC甚至会对此提出警告：

```bash
warning: capture of variable 'global' with non-automatic storage duration.
```

这个警告只会在显式捕获一个全局变量时出现，即便你用 `[=]` ，编译器也无法帮你消除这个错误。

在Clang中甚至会直接提示错误：

```bash
error: 'global' cannot be captured because it does not have
        automatic storage duration

```
### 捕获静态变量
和捕获全局变量类似，在捕获静态变量的时候也会遇到类似的问题。

> 代码2-12 [捕获静态变量](https://wandbox.org/permlink/CpJt4PUSleIJNVf2)

```cpp
#include <iostream>

void bar() {
    static int static_int = 10;
    std::cout << static_int << std::endl;
    auto foo = [=]() mutable noexcept {
        ++static_int;
    };
    foo();
    std::cout << static_int << std::endl;
    const auto increase = []() noexcept {
        ++static_int;
    };
    increase();
    std::cout << static_int << std::endl;
    const auto moreIncrease = [static_int]() noexcept {
        ++static_int;
    };
    moreIncrease();
    std::cout << static_int << std::endl;
}

int main() {
    bar();
}
```

这一次，我们尝试捕获静态变量并修改它的值，但是由于它没有自动存储时间，编译器并不会允许你这么做。（ GCC 会提示警告，而 Clang 会直接报错）

输出：

```bash
10
11
12
13
```

### 捕获类成员和 `this` 指针
当你想在一个类的成员函数中尝试捕获一个成员变量，那么事情就会稍微变得有点复杂。由于所有的数据成员都是和 `this` 指针关联起来的，当然了，这玩意必须被存储在某个地方。

> 代码2-13 [捕获成员变量时的错误](https://wandbox.org/permlink/mp5VgqIyu5LWLn0f)

```cpp
#include <iostream>

struct Baz {
    void foo() {
        const auto lam = [s]() {
            std::cout << s;
        };
        lam();
    }
    std::string s;
};

int main() {
    Baz b;
    b.foo();
}
```

这段代码尝试去捕获一个成员变量，但是编译器并不同意，这会导致编译器编译错误：

```bash
In member function 'void Baz::foo()':
error: capture of non-variable 'Baz::s'
error: 'this' was not captured for this lambda function
```

为解决此问题，需要捕获 `this` 指针。这样就能访问到成员变量了。

而上面的代码也可以这样修改：

```cpp
struct Baz {
    void foo() {
        const auto lam = [this]() {
            std::cout << s;
        };
        lam();
    }
    std::string s;
};
```

这样就不会有编译错误了。

当然了，你也可以使用 `[=]` 或者 `[&]` 来捕获 `this` 指针，在 C++11/14 中他们的效果是一样的。

但是，请注意，值捕获 `this` 也是捕获指针，这就是为什么你能访问成员变量的原因。

在 C++11/14 中，你不能够这样写：

```cpp
const auto lam = [*this]() {
    std::cout << s;
};
```

但是它在 C++17 中是允许的。

如果你在单一方法的上下文中使用捕获 `this` ，这挺好的。但是稍微复杂的场景下使用捕获 `this` 呢？

> 代码2-14 从方法中返回Lambda

```cpp
#include <functional>
#include <iostream>

struct Baz {
    std::function<void()> foo() {
        return [=] {
            std::cout << s << std::endl;
        };
    }
    std::string s;
};

int main() {
    auto f1 = Baz{"abc"}.foo();
    auto f2 = Baz{"xyz"}.foo();
    f1();
    f2();
}
```

代码中声明了 `Baz` 这个对象，并且调用了 `foo()` 。请注意， `foo()` 返回了一个从类中捕获成员的 Lambda （存储在 `std::function` 中）。

`std::function` 在 C++11 中是必需的，因为常规函数没有返回类型推导。

但是 C++14 支持函数返回类型的推导。

由于我们使用的是临时对象，我们不能保证当我们调用 `f1` 和 `f2` 时会发生什么。这是一个悬空引用的问题，并且是未定义行为（Undefined Behaviour）。

这种行为类似于下面这段代码：

```cpp
struct Bar {
    std::string const& foo() const {
        return s;
    };
    std::string s;
};
auto&& f1 = Bar{"abc"}.foo();  // 一个悬空引用
```

当然，如果你显式捕获，也是[一样](https://wandbox.org/permlink/FOgbNGoQHOmepBgY)的。

```cpp
std::function<void()> foo() {
    return [s] {
        std::cout << s << std::endl;
    };
}
```

总而言之，当 Lambda 生命周期比对象更长时，捕获 `this` 可能会变得棘手。 当您使用异步调用或多线程时，可能会发生这种情况。

在 C++17 章节中，我们会重新详细讨论这个话题

### 只能移动的对象
假如，现在有一个“仅可移动”的对象（像 `unique_ptr` ），那么你就无法将它作为捕获对象移动到 Lambda 中。值捕获将不起作用，只能进行引用捕获。

```cpp
std::unique_ptr<int> p(new int{10});
auto foo = [p]() {};       // does not compile....
auto foo_ref = [&p]() {};  // compiles, but the ownership is not passed
```

上述例子中，你会发现捕获 `unique_ptr` 的唯一方式是引用捕获，但是这种方式并不是最好的方式，因为它并没有将 `unique_ptr` 的所属权进行转移。

在下一章 C++14 中，由于初始化捕获的引入，这个问题会被修复。你可以在初始化捕获直接查阅内容。

### 保留常量
如果捕获一个 `const` 修饰的变量，那么它的常量性将会被保留。

> 代码2-15 [保留常量的 `const` 特性](https://wandbox.org/permlink/h8lCuOXd9dHsopG1)

```cpp
#include <iostream>
#include <type_traits>

int main() {
    const int x = 10;
    auto foo = [x]() mutable {
        std::cout << std::is_const<decltype(x)>::value << std::endl;
        x = 11;
    };
    foo();
}
```

这段代码将不会被编译器通过，因为捕获的对象是一个常量，即便使用 `mutable` 来修饰也无济于事。

### 捕获参数包
为了结束我们对“捕获”的讨论，在最后我们来聊聊使用可变参数模板来进行捕获。编译器会将参数包扩展为非静态数据成员列表，如果您想在模板化代码中使用 Lambda ，这会十分方便。 代码示例：

> 代码2-16 [捕获可变参数包](https://wandbox.org/permlink/29qxFbLefKf3wnNU)

```cpp
#include <iostream>
#include <tuple>

template <class... Args>
void captureTest(Args... args) {
    const auto lambda = [args...] {
        const auto tup = std::make_tuple(args...);
        std::cout << "tuple size: " << std::tuple_size<decltype(tup)>::value << '\n';
        std::cout << "tuple 1st:  " << std::get<0>(tup) << '\n';
    };
    lambda();  // call it
}

int main() {
    captureTest(1, 2, 3, 4);
    captureTest("Hello world", 10.0f);
}
```

运行这段代码，结果为：

```bash
tuple size: 4
tuple 1st:  1
tuple size: 2
tuple 1st:  Hello world
```

在这里展示了使用可变长参数包进行值捕获（引用捕获同理），捕获的对象“存储”在一个 `tuple` 对象中，可以使用一些辅助函数来访问 `tuple` 中的数据和属性。

当然了，你也可以使用 [C++ Insight](https://cppinsights.io/s/19d3a45d) 来观察编译器是如果生成这个代码并且展开模板、参数包和 Lambda 的。

> C++14 让捕获仅可移动类型成为可能 ，并且 C++20 中增强了对可变参数包的支持。

## 5. 返回类型
在多数情况下，您可以跳过 Lambda 的返回类型，让编译器为您推导类型。

最初，返回类型的推导仅限于函数体内仅包含单个 `return` 语句的 Lambda。 但是，由于 C++ 标准实现了一个更便捷的版本，因此这限制很快就取消了。

相关内容可以参考：[C++ Standard Core Language Defect Reports and Accepted Issues, Revision 104](http://www.open-std.org/jtc1/sc22/wg21/docs/cwg_defects.html#975)

总结一下，从 C++11 开始，只要所有的 `return` 语句都是相同的类型，编译器就能够推断出返回类型。

> 如果所有的 `return` 语句都返回了一个表达式，并且返回表达式的类型都经过了一个从左值到右值的转换（7.1[conv.lavl]）或者从数组到指针的转换（7.2[conv.array]）或者从函数到指针的转换（7.3[conv.func]），那么他们的类型都是一样的，就是普通类型。

> 代码2-17 [返回类型推导](https://wandbox.org/permlink/sxtT30yKx9mwrYT3)

```cpp
#include <type_traits>

int main() {
    const auto baz = [](int x) noexcept {
        if (x < 20)
            return x * 1.1;
        else
            return x * 2.1;
    };
    static_assert(std::is_same<double, decltype(baz(10))>::value, "has to be the same!");
}
```

上面的例子中，有两个返回语句，但是他们都指向 `double` 类型，所以编译器能够推断出最终的类型。
在 C++14 中，推导常规函数时，lambda的类型会自动更新以适应 `auto` 类型的规则。


### 尾部返回类型语法
如果你想显式的凸显返回类型，那么可以使用尾部返回类型的语法。举个例子：

> 代码2-18 lambda返回字符串序列

```cpp
#include <iostream>
#include <string>

int main() {
    const auto testSpeedString = [](int speed) noexcept {
        if (speed > 100)
            return "you're a super fast";
        return "you're a regular";
    };
    auto str = testSpeedString(100);
    str += " driver";  // 出错! const char*类型没有+=操作符可以应用
    std::cout << str;
    return 0;
}
```

当然，这段代码是无法编译的，因为编译器自动推断的类型结果是const char*，作为lambda的返回类型，+=操作符无法应用于const char*类型，所以编译器阻止了这种行为。

当然，我们稍微修改一下，[上述代码](http://coliru.stacked-crooked.com/a/45cebc8b35d5b2a9)就可以正常工作了。

```cpp
const auto testSpeedString = [](int speed) -> std::string {
    if (speed > 100)
        return "you're a super fast";
    return "you're a regular";
};
auto str = testSpeedString(100);
str += " driver";
```
我们只是将 `noexcept` 移除，并更换为了 `std::string` 。当然，你也可以使用命名空间  `std::string_literals` 然后返回 `std::string` 类型的 `“you're a regular”`。

## 6. 转化为函数指针
当你的 Lambda 表达式没有捕获到任何变量时，编译器就会将其转换为一个常规函数指针。

可以查看标准草案中[[expr.prim.lambda#6]](https://timsong-cpp.github.io/cppwp/n3337/expr.prim.lambda#6)的定义：

> 没有捕获的 Lambda 表达式的闭包类型具有公共非虚拟、非显式的 `const` 转换函数，指向与闭包类型的函数调用运算符具有相同参数和返回类型的函数的指针。
>
> 此转换函数返回的值应为函数的地址，该函数在调用时与调用闭包类型的函数调用运算符具有相同的效果。

为了阐明 Lambda 是如何支持这种转换，让我们考虑以下示例。 它定义了一个明确定义转换运算符的仿函数 `baz` ：

> 代码2-19 [转化函数指针](https://wandbox.org/permlink/XAmjjJiojnFKyd44)

```cpp
#include <iostream>

void callWith10(void (*bar)(int)) {
    bar(10);
}

int main() {
    struct {
        using f_ptr = void (*)(int);
        void operator()(int s) const {
            return call(s);
        }
        operator f_ptr() const {
            return &call;
        }

    private:
        static void call(int s) {
            std::cout << s << '\n';
        };
    } baz;

    callWith10(baz);
    callWith10([](int x) {
        std::cout << x << '\n';
    });
}
```

在这个程序中，有一个 `callWith10` 函数，它接受一个函数指针。 然后我们用两个参数调用它（第 23 行和第 24 行）：第一个使用 `baz` ，它是一个包含必要转换运算符的仿函数 - 它转换为 `f_ptr` ，与 `callWith10` 的输入参数相同。第二个使用 Lambda 。

在这种情况下，编译器将执行所需的转换。

当您需要调用需要回调的 C 风格的函数时，这种转换可能会很方便。 例如，下面的代码是从 C 标准库中调用 `qsort` 函数，同时使用 Lambda 来进行反向排序。

> 代码2-20 [调用 C 风格函数](https://wandbox.org/permlink/fEMhtqAXerDdCXG8)

```cpp
#include <cstdlib>
#include <iostream>

int main() {
    int values[] = {8, 9, 2, 5, 1, 4, 7, 3, 6};
    constexpr size_t numElements = sizeof(values) / sizeof(values[0]);

    std::qsort(values, numElements, sizeof(int), [](const void* a, const void* b) noexcept {
        return (*(int*)b - *(int*)a);
    });

    for (const auto& val : values)
        std::cout << val << ", ";
}
```

正如您在代码示例中看到的那样，使用 `std::qsort` 仅将函数指针作为比较器。 编译器可以对我们传递的无状态 Lambda 进行隐式转换。

### 一个有趣的例子
在讨论别的内容之前，这儿有一个可能十分有趣的例子，我们可以一起来研究下：

> 代码2-21 [加号和 Lambda 表达式](https://wandbox.org/permlink/0r0jDiJxlLuEzYwm)

```cpp
#include <type_traits>

int main() {
    auto funcPtr = +[] {};
    static_assert(std::is_same<decltype(funcPtr), void (*)()>::value);
}
```

注意一下这个“奇怪”的“ `+` ”运算符的语法，如果你去掉这个加号，那整个 `static_assert` 就失败了。这是什么神奇的原因？

要理解其中的工作原理，我们得先看看 C++ 生成的代码是什么样的：

```cpp
#include <type_traits>

int main()
{

  class __lambda_4_18
  {
    public:
    inline void operator()() const
    {
    }

    using retType_4_18 = auto (*)() -> void;
    inline operator retType_4_18 () const noexcept
    {
      return __invoke;
    }

    private:
    static inline void __invoke()
    {
    }


  } __lambda_4_18{};

  using FuncPtr_4 = void (*)();
  FuncPtr_4 funcPtr = +static_cast<void (*)()>(__lambda_4_18.operator __lambda_4_18::retType_4_18());
  /* PASSED: static_assert(std::integral_constant<bool, 1>::value); */
}
```

代码中的“ `+` ”是一个一元运算符，且可以运用在指针上。因此编译器将无状态的 Lambda 转换成了函数指针，再分配给 `funcPtr` 。另一方面，如果删除了“ `+` ”号，那么 `funcPtr` 就仅仅是一个单纯的闭包对象，所以在 `static_assert` 时会失败。

虽然用“ `+` ”这样的语法可能不是一个最好的方式，但是你可以用 `static_cast` 来替代，可以实现和 `+` 一样的效果。

当您不希望编译器创建太多函数实例时，您可以应用此技术。 例如：

> 代码2-22 [强制转换为函数调用](https://cppinsights.io/s/e4764e54)

```cpp
template <typename F>
void call_function(F f) {
    f(10);
}

int main() {
    call_function(static_cast<int (*)(int)>([](int x) {
        return x + 2;
    }));
    call_function(static_cast<int (*)(int)>([](int x) {
        return x * 2;
    }));
}
```

在上面的例子中，编译器只需要创建一个 call_function 实例，因为它只需要一个函数指针 int (*)(int)。

但是如果你删除 static_casts 那么你将得到两个版本的 call_function 因为编译器必须为 Lambdas 创建两个单独的类型。
## 7. IIFE - 立即调用函数表达式
在多数例子中，你可能发现了，我经常都是先定义好 Lambda，在之后才去调用它。

然而，你也可以直接立即调用一个lambda：

> 代码2-23 [“现写现用” Lambda ](https://wandbox.org/permlink/fsFOxzBZuFS7bMVn)

```cpp
#include <iostream>

int main() {
    int x = 1, y = 1;

    [&]() noexcept {
        ++x;
        ++y;
    }();  // <-- call ()

    std::cout << x << ", " << y;
}
```

上面这个例子， Lambda 在被创建之后没有赋给任何一个闭包对象，而是直接被调用（通过“ `()` ”操作符）。如果你运行上述程序，期望结果应该是输出了：

```bash
2, 2
```

在遇到复杂的常量对象的初始化时，这种表达式将十分地有用：

```cpp
const auto val =[]() {
    /* several lines of code... */
}(); // call it!
```

其中，`val` 是一个常量（constant value），并且其类型为 Lambda 表达式的返回类型：

```cpp
// val1 is int
const auto val1 =[]() { return 10; }();
// val2 is std::string
const auto val2 =[]() ->std::string { return "ABC"; }();
```

下面我们来看一个较长的用例，在函数内部使用 IIFE 形式来构造一个辅助 Lambda 函数，去创建一个常量。

> 代码2-24 [IIFE 和 HTML生成器](https://wandbox.org/permlink/TtlM1t3sm9EZOUrw)

```cpp
#include <iostream>
#include <string>

void ValidateHTML(const std::string&) {}

std::string BuildAHref(const std::string& link, const std::string& text) {
    const std::string html = [&link, &text] {
        const auto& inText = text.empty() ? link : text;
        return "<a href=\"" + link + "\">" + inText + "</a>";
    }();  // call!
    ValidateHTML(html);
    return html;
}

int main() {
    try {
        const auto ahref = BuildAHref("www.leanpub.com", "Leanpub Store");
        std::cout << ahref;
    } catch (...) {
        std::cout << "bad format...";
    }
}
```

这个用例中，函数 `BuildAHref()` ，它接受两个参数，然后构建一个 `<a> </a>` HTML 标签。

根据输入参数，我们构建 `html` 变量。

如果文本不为空，则我们将其用作内部 HTML 值。

否则，我们使用默认链接。

 我们希望 html 变量是常量，但很难编写具有输入参数所需条件的紧凑代码。

 多亏了 IIFE，我们可以编写单独的 Lambda，然后用 `const` 标记我们的变量。

 稍后可以将变量传递给 `ValidateHTML` 。
### 可读性提示
有些时候，利用现写现用的 Lambda 表达式会造成一些代码可读性上的困扰。

例如：

```cpp
const auto EnableErrorReporting = [&]() {
    if (HighLevelWarningEnabled())
        return true;
    if (HighLevelWarningEnabled())
        return UsersWantReporting();
    return false;
}();

if (EnableErrorReporting) {
    // ...
}
```

在上面的例子中，Lambda 代码相当复杂，阅读代码的开发人员不仅要解密 Lambda 是立即调用的，而且还要对 `EnableErrorReporting` 类型进行推理。 他们可能会假设 `EnableErrorReporting` 是闭包对象而不仅仅是一个常量变量。对于这种情况，您可能会考虑不使用 `auto` ，以便我们可以轻松查看类型。 甚至可以在 `}()` 旁边添加注释，例如 `// call it now`。

> 在 C++17 章节我们会遇到一个“升级版”的IIFE。

## 8. Lambda 继承
也许你会有些吃惊，Lambda居然还可以派生？

由于编译器将 Lambda 扩展为了一个仿函数对象，并重载了其调用操作符（“ `()` ”），所以我们可以从这点去继承 Lambda 。

来看看一个基础代码：

> 代码2-25 [从单个 Lambda 中继承](https://wandbox.org/permlink/uA4q7Zy1kojUZmqb)

```cpp
#include <iostream>

template <typename Callable>
class ComplexFunctor : public Callable {
public:
    explicit ComplexFunctor(Callable f) : Callable(f) {}
};

template <typename Callable>
ComplexFunctor<Callable> MakeComplexFunctor(Callable&& cal) {
    return ComplexFunctor<Callable>(cal);
}

int main() {
    const auto func = MakeComplexFunctor([]() {
        std::cout << "Hello Functor!";
    });
    func();
}
```

这段代码中，有一个 `ComplexFunctor` 类，它派生自 `Callable` ，它是一个模板参数。 如果我们想从 Lambda 派生，我们需要做一个小技巧，因为我们无法拼出闭包类型的确切类型（除非我们将它包装到 `std::function` 中）。

这就是为什么我们需要可以执行模板参数推导并获取 Lambda 闭包类型的 `MakeComplexFunctor` 函数。

除了名称之外， `ComplexFunctor` 只是一个简单的包装器，没有多大用处。 是否有此类代码模式的用例。

例如，我们可以扩展上面的代码并继承两个 Lambdas 并创建一个重载集：

> 代码2-25 [从两个 Lambda 中继承](https://wandbox.org/permlink/2AY4nRaHffrDWt6A)

```cpp
#include <iostream>

template <typename TCall, typename UCall>
class SimpleOverloaded : public TCall, UCall {
public:
    SimpleOverloaded(TCall tf, UCall uf) : TCall(tf), UCall(uf) {}
    using TCall::operator();
    using UCall::operator();
};

template <typename TCall, typename UCall>
SimpleOverloaded<TCall, UCall> MakeOverloaded(TCall&& tf, UCall&& uf) {
    return SimpleOverloaded<TCall, UCall>(tf, uf);
}

int main() {
    const auto func = MakeOverloaded(
            [](int) {
                std::cout << "Int!\n";
            },
            [](float) {
                std::cout << "Float!\n";
            });
    func(10);
    func(10.0f);
}
```


这次我们有更多的代码：我们从两个模板参数派生，但我们还需要显式地公开它们的调用运算符。

这是为什么呢？ 这是因为在寻找正确的函数重载时，编译器要求候选对象在同一范围内。

为了理解这一点，让我们编写一个派生自两个基类的简单类型。 该示例还注释掉了两个 `using` 语句

```cpp
#include <iostream>

struct BaseInt {
    void Func(int) {
        std::cout << "BaseInt...\n";
    }
};
struct BaseDouble {
    void Func(double) {
        std::cout << "BaseDouble...\n";
    }
};
struct Derived : public BaseInt, BaseDouble {
    // using BaseInt::Func;
    // using BaseDouble::Func;
};

int main() {
    Derived d;
    d.Func(10.0);
}
```

我们有两个实现 `Func` 的基类。 我们想从派生对象调用这个 `Func` 方法。

[GCC](https://wandbox.org/permlink/fFRqVGUisdQh1qGV) 编译便会报出错误：

```bash
error:request formember 'Func' is ambiguous
```

因为我们注释掉了全部的声明来自 `BaseInt` 和 `BaseDouble` 的 `::Func` 的 `using` 语句。

编译器有两个作用域来搜索最佳候选，根据标准，这是不允许的。

好吧，让我们回到我们的更上面那个例子： `SimpleOverloaded` 是一个基本类，它不是生产就绪的。

看看 C++17 章，我们将讨论此模式的高级版本。

多亏了 C++17 的几个特性，我们将能够从多个 Lambda 继承（感谢可变参数模板）并利用更多的紧凑语法！
## 9. 在容器中存储 Lambda
作为本章的最后一个技巧，让我们来看看在容器中存储闭包的问题。

但是我不是写过不能默认创建和分配 Lambdas 吗？

是的……但是我们可以在这里做一些技巧。

技术之一是利用转换为函数指针的无状态 Lambda 的属性。 虽然您不能直接存储闭包对象，但您可以保存从 Lambda 表达式转换而来的函数指针。

例如：

> 代码2-26 [将 Lambda 存为函数指针](https://wandbox.org/permlink/CuoCtCHEEk6ZA6xF)

```cpp
#include <iostream>
#include <vector>
int main() {
    using TFunc = void (*)(int&);
    std::vector<TFunc> ptrFuncVec;
    ptrFuncVec.push_back([](int& x) {
        std::cout << x << '\n';
    });
    ptrFuncVec.push_back([](int& x) {
        x *= 2;
    });
    ptrFuncVec.push_back(ptrFuncVec[0]);  // print it again;
    int x = 10;
    for (const auto& entry : ptrFuncVec) entry(x);
}
```

在上面的例子中，我们创建了一个将应用于变量的函数向量。 容器中有三个条目：

- 第一个打印输入参数的值。
- 第二个修改值。
- 第三个是第一个的副本，因此它也打印值。

该解决方案有效，但仅限于无状态 Lambda。 如果我们想解除这个限制怎么办？为了解决这个问题，我们可以使用重度助手：`std::function` 。

为了使示例有趣，它还从简单的整数切换到处理 `std::string objects` 的 Lambdas：

> 代码2-27 [将Lambda存为std::function](https://wandbox.org/permlink/XSK4ATo5HriOB6Gk)

```cpp
#include <algorithm>
#include <functional>
#include <iostream>
#include <vector>

int main() {
    std::vector<std::function<std::string(const std::string&)>> vecFilters;

    size_t removedSpaceCounter = 0;
    const auto removeSpacesCnt = [&removedSpaceCounter](const std::string& str) {
        std::string tmp;
        std::copy_if(str.begin(), str.end(), std::back_inserter(tmp), [](char ch) {return !isspace(ch); });
        removedSpaceCounter += str.length() - tmp.length();
        return tmp;
    };

    const auto makeUpperCase = [](const std::string& str) {
        std::string tmp = str;
        std::transform(tmp.begin(), tmp.end(), tmp.begin(),
               [](unsigned char c){ return std::toupper(c); });
        return tmp;
    };

    vecFilters.emplace_back(removeSpacesCnt);
    vecFilters.emplace_back([](const std::string& x) { return x + " Amazing"; });
    vecFilters.emplace_back([](const std::string& x) { return x + " Modern"; });
    vecFilters.emplace_back([](const std::string& x) { return x + " C++"; });
    vecFilters.emplace_back([](const std::string& x) { return x + " World!"; });
    vecFilters.emplace_back(makeUpperCase);

    const std::string str = "   H e l l o     ";
    auto temp = str;
    for (const auto &entryFunc : vecFilters)
        temp = entryFunc(temp);
    std::cout << temp;

    std::cout <<"\nremoved spaces: " << removedSpaceCounter << '\n';
}
```

输出：

```bash
HELLO AMAZING MODERN C++ WORLD!
removed spaces: 12
```

这次我们将 `std::function<std::string(const std::string&)>` 存储在容器中。 这允许我们使用任何类型的函数对象，包括带有捕获变量的 Lambda 表达式。 其中一个 lambda `removeSpacesCnt` 捕获一个变量，该变量用于存储有关从输入字符串中删除的空格的信息。

## 10. 总结
在本章中，您学习了如何创建和使用 Lambda 表达式。 我描述了 Lambda 的语法、捕获子句、类型，并且我们涵盖了许多示例和用例。 我们甚至更进一步，我向您展示了从 Lambda 派生或将其存储在容器中的模式。

但这还不是全部！

Lambda 表达式成为现代 C++ 的重要组成部分。 随着应用场景越来越多，开发人员也看到了改进此功能的可能性。 这就是为什么您现在可以转到下一章并查看 ISO 委员会在 C++14 中添加的重要更新的原因。
