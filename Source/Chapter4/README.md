# 四、Lambda in C++17
C++17 为 Lambda 表达式添加了两个重要的增强特性：

- `constexpr` Lambdas
- `*this` 的捕获

新的 C++ 修订版更新了其类型系统，现在包含了关于 Lambda 表达式的异常规范。

你可以在 [N4659](https://timsong-cpp.github.io/cppwp/n4659/) 中的 [[expr.prim.lambda]](https://timsong-cpp.github.io/cppwp/n4659/expr.prim.lambda) 章节查阅标准规范中 Lambda 相关的内容。

在本章中，我们将重点关注以下内容：

- 在 C++17 中如何提升 立即调用函数表达式（IIFE pattern）
- 在 C++17 中如何提升 带有折叠表达式的可变泛型 Lambda（Vriadic Generic Lambdas with Fold Expressions）
- 从多个 Lambda 派生
- Lambda 和异步编程

## 1. Lambda 语法更新

在 C++17，有一些关于 Lamdba 表达式的改变：

- 你可以在参数列表之后加上 `constexpr` 关键字
- 动态异常规范在 C++11 中被弃用，在 C++17 中被移除，所以你应该使用 `noexcept`

```cpp
[] () specifiers exception attr -> ret { /*code; */ }
^  ^  ^                            ^
|  |  |                            |
|  |  |                            optional: trailing return type
|  |  |
|  |  optional: mutable, constexpr, noexcept, attributes
|  |
|  parameter list (optional when no specifiers added)
|
lambda introducer with an optional capture list
```

你可以在下一节中了解到更多的变更。

## 2. 类型系统中的异常规范
在我们了解关于 Lambda 的语法改进之前，我们需要引入一个 C++17 的通用语言特性。

函数的异常规范过去不属于函数类型的一部分，但是在 C++17 中被纳入其中，这意味着你可以有两种函数类型，一种有 `noexcept` ，另一种没有。

> 代码 4-1 [类型系统中的异常规范](https://wandbox.org/permlink/4tcaRPeMPUd8XbOd)

```cpp
using TNoexceptVoidFunc = void (*)() noexcept;
void SimpleNoexceptCall(TNoexceptVoidFunc f) {
    f();
}

using TVoidFunc = void (*)();
void SimpleCall(TVoidFunc f) {
    f();
}

void fNoexcept() noexcept {}
void fRegular() {}

int main() {
    SimpleNoexceptCall(fNoexcept);
    SimpleNoexceptCall([]() noexcept {});
    // SimpleNoexceptCall(fRegular);   // cannot convert
    // SimpleNoexceptCall([]() {});  // cannot convert

    SimpleCall(fNoexcept);  // converts to regular function
    SimpleCall(fRegular);
    SimpleCall([]() noexcept {});  // converts
    SimpleCall([]() {});
}
```

一个指向 `noexcept` 函数（常规函数、成员函数、Lambda 函数）的指针可以被转化成指向不带 `noexcept` 函数（与转换前对应的函数类型）的指针。

但是反过来是不行的。

其中一个原因是代码优化。

如果编译器能够确保函数不会抛出异常，那么它就有可能生成[更快的代码](https://isocpp.org/blog/2014/09/noexcept-optimization)。

在标准库中，有很多地方会基于 `noexcept` 判断代码能够变得更高效，这也是 `std::vector` 内部进行元素移动时是否会抛出异常的判断机制。

下面是一个栗子

> 代码 4-2 [使用 `type_traits` 判断可调用对象是否标记为了 `noexcept`](https://wandbox.org/permlink/4Zv5pFWVV1TmgQTl)

```cpp
#include <iostream>
#include <type_traits>

template <typename Callable>
void CallWith10(Callable&& fn) {
    if constexpr (std::is_nothrow_invocable_v<Callable, int>) {
        std::cout << "Calling fn(10) with optimisation\n";
        fn(10);
    } else {
        std::cout << "Calling fn(10) normally\n";
        fn(10);
    }
}

int main() {
    int x{10};

    const auto lam = [&x](int y) noexcept {
        x += y;
    };

    CallWith10(lam);

    const auto lamEx = [&x](int y) {
        std::cout << "lamEx with x = " << x << '\n';
        x += y;
    };

    CallWith10(lamEx);
}
```

输出如下：

```plaintext
Calling fn(10) with optimisation
Calling fn(10) normally
lamEx with x = 20
```

上述代码使用 `std::is_nothrow_invocable_v` 去检查传入的可调用对象是否具有 `noexcept` 标记。

动态异常规范在 C++11 中**被弃用**，在 C++17 中**被删除**，只能使用 `noexcept` 关键字去声明一个不会抛出异常的函数。

Question：如果在一个具有 `noexcept` 声明的函数中抛出异常，会发生什么？

Answer：编译期会调用 `std::terminate`。

## 3. `constexpr` Lambda 表达式

从 C++11 开始，`constexpr` 关键字能够在编译期评估越来越多的代码。这不仅会影响到程序的性能，也让编译期的编码变得更加愉快和有力。

在 C++17，`constexpr` 能够被用于 Lambda 表达式，可以看一下规范 [[expr.prim.lambda]](https://timsong-cpp.github.io/cppwp/n4659/expr.prim.lambda#closure-4) 中的 #4 ：

> 如果函数是声明中带有 `constexpr` 或者 Lambda 表达式的参数声明子句后跟 `constexpr` ，那么这是一个 `constexpr` 函数。

换句话说，如果 Lambda 表达式遵循 `constexpr` 函数的规则，那么 Lambda 表达式对应的 `operator()` 函数被隐式定义为 `constexpr，在` C++17 `中，constexpr` 函数根据 [[dcl.constexpr]](https://timsong-cpp.github.io/cppwp/n4659/dcl.constexpr#3) #3 需要满足以下规则  ：

> - 不是一个虚函数
> - 返回类型是 literal type（可以在编译期计算的变量）
> - 所有参数都是 literal type
> - 其函数体应为 = delete, = default 或者是一个不包含以下语句的复合语句：
>   - an asm-definition
>   - a goto statement
>   - an identifier label
>   - try block
>   - a definition of a variable of non-literal type or of static or thread storage duration or for which no initialisation is performed

举个栗子：

```cpp
constexpr auto Square =[](int n) { return n * n; }; // implicit constexpr
static_assert(Square(2) == 4);
```

由于 `Square` 函数体非常简单并且它没有违反 `constexpr` 所需的相关规则，所以它被隐式声明为 `constexpr` 并且我们可以使用 `static_assert` 在编译期调用它 。

### 用例
有没有更实用的代码例子？

我们先实现一个常用的累加算法：

> 代码 4-3 [简单的累加](https://wandbox.org/permlink/E90ctLei3jEHIk9d)

```cpp
#include <array>
template <typename Range, typename Func, typename T>
constexpr T SimpleAccumulate(Range &&range, Func func, T init) {
    for (auto &&elem : range) {
        init += func(elem);
    }
    return init;
}

int main() {
    constexpr std::array arr{1, 2, 3};
    constexpr auto sum = SimpleAccumulate(
            arr,
            [](auto i) {
                return i * i;
            },
            0);

    static_assert(sum == 14);
}
```

该代码在将 Lamdba 函数传递给 `SimpleAccumulate` 时，虽然没有显示声明 `constexpr` ，但是编译器会发现这个 Lamdba 函数被一个 `constexpr` 函数调用了，并且该 Lamdba 函数体只包含简单的语句，符合成为 `constexpr` Lamdba 的条件，所以不会报错。

并且这一过程同样适用于 `SimpleAccumulate` 中调用到的 `std::array`，`std::begin`，`std::end` 。

所以 `SimpleAccumulate` 函数可能会运行在编译期。

另外一个例子是使用了递归的 Lamdba：

> 代码 4-4 [递归的 `constexpr` Lamdba](https://wandbox.org/permlink/YGIJXUw3ERxnta6s)

```cpp
int main() {
    constexpr auto factorial = [](int n) {
        constexpr auto fact_impl = [](int n, const auto &impl) -> int {
            return n > 1 ? n * impl(n - 1, impl) : 1;
        };
        return fact_impl(n, fact_impl);
    };

    static_assert(factorial(5) == 120);
}
```

在这个例子中，我们将 `factorial` 声明为 `constexpr` ，这将会允许使用编译期进行检查的 `static_assert` 。

### 捕获变量
你可以捕获变量（需要保证捕获后仍然是个常量表达式）：

> 代码 4-5 [捕获常量](https://wandbox.org/permlink/Uy9MoYl0OnqZgUv2)

```cpp
constexpr int add(int const &t, int const &u) {
    return t + u;
}

int main() {
    constexpr int x = 0;
    constexpr auto lam = [x](int n) {
        return add(x, n);
    };

    static_assert(lam(10) == 10);
}
```

然而，有趣的事情是，代码如果这么写的话：

```cpp
constexpr int x = 0;
constexpr auto lam = [x](int n) { return n + x };
```

你并不需要去捕获 `x`。

在 Clang 中，我们甚至会得到如下的 warning：

```plaintext
warning: lambda capture 'x' is not required to be captured for this use
```

同样的，如果我们将 `add` 函数改为值传递的话，也会产生同样的效果：

```cpp
constexpr int add(int t, int u) {
    return t + u;
}
```

这是因为如果我们依赖常量表达式，编译器可以优化变量，特别是对于在编译期就可以知道值的内置类型。

下面是一些来自 [CppReference](https://en.cppreference.com/w/cpp/language/lambda) 的描述：

> 一个 Lamdba 表达式如果想要不经过捕获读取一个变量的值，当且仅当该变量：
> - 是一个 const non-volatile integral 或者 enumeration type 并且被 constant expression 初始化
> - 是 `constexpr` 并且没有 `mutable` 的变量

如果想要获得更多关于此的信息，你可以阅读这部分的标准 [[basic.def.odr #4]](https://eel.is/c++draft/basic.def.odr#4)。

在第一个 `add()` 的例子中，接收变量的时候使用了引用传递，我们强制编译器创建一个闭包成员，然后将其绑定到引用。

然后让 `add()` 函数返回参数的地址，然后它们进行比较，像是这样：

```cpp
int const *address(int const &x) {
    return &x;
}

auto f = [x] {
    auto *p = address(x);
    return p == &x;  // these need to be true
};
```

因此编译器需要在闭包中存储 `x` 的拷贝，也就是说需要捕获它，这个捕获操作并不能被优化掉。

### `constexpr` 总结
简而言之：

`constexpr` 允许你进行模板编程并且可能使用更短的代码。

> 为将来做准备：
> 在 C++20 中，我们将会拥有许多 `constexpr` 标准的算法和容器，比如 `std::vector` 和 `std::string` ，所以 `constexpr` Lamdba 在这种情况下会非常便利。
> 届时，运行时的代码和编译期运行的代码将会非常相似。

现在让我们现在了解自 C++17 引入的第二个重要的特性。
## 4. 捕获 `*this`
还记得我们之前是如何[捕获类的成员变量](../Chapter2/README.md#捕获类成员和-this-指针)的吗？

默认情况下，我们捕获 `this` （作为一个指针），并且当临时创建的对象的生命周期短于 Lamdba 函数的生命周期时，将会出现错误。

在 C++17 当中，我们有另外一种方式，我们可以捕获 `this` 的拷贝 `*this`；

> 代码 4-6 [捕获 `*this`](https://wandbox.org/permlink/SPWD9gMPEiWRlZgp)

```cpp
#include <iostream>

struct Baz {
    auto foo() {
        return [*this] {
            std::cout << s << std::endl;
        };
    }
    std::string s;
};

int main() {
    const auto f1 = Baz{"xyz"}.foo();
    const auto f2 = Baz{"abc"}.foo();
    f1();
    f2();
}
```

在这个例子中，我们可以通过 `[*this]` 来捕获一个对象的临时拷贝，该拷贝存在于闭包内并且不会在之后调用该 Lamdba 时产生 UB。

需要注意的是：

- 在 C++17 中，如果你在类的成员函数当中使用 `[=]`，那么 `this` 将会被隐式捕获！
- 你可以查看 C++20 相关的章节知晓这将会被增强和弃用！
- 可以查看 [P0806](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0806r2.html) 获取更多资料。

### 一些指导性意见
所以我们应该捕获 `[this]` 还是 `[*this]` 呢？ 以及，这为什么那么重要？

在大多数情况下，当你在类的范围内里面使用 Lamdba 时，使用 `[this]` 或者 `[&]` 是很好的方式，当你的对象很大的时候不会产生额外的拷贝从而影响性能。

当你的 Lamdba 表达式的生命周期可能比对象的生命周期长的时候，你应当使用 `[*this]`。

这对于异步或者并行执行中的数据竞争可能至关重要。

此外，在异步/多线程执行模式下，Lamdba 表达式的生命周期可能比对象的生命周期更长，因此捕获的 `this` 指针可能会失效。

## 5. IIFE 更新
在 C++11 ，引入了 [IIFE - 立即调用函数表达式](../Chapter2/README.md#7-IIFE---立即调用函数表达式) ，在 C++17，有一些关于 IIFE 的更新。

在使用 IIFE 过程中会遇到的一个问题时，IIFE 式的代码不易阅读。因为调用操作符 `()` 很容易被人忽略，下面是一个 IIFE 的例子：

```cpp
const auto var = [&] {
    if (TheFirstCondition())
        return one_value;
    if (TheSecondCindition())
        return second_val;
    return default_value;
}();  // call it!
```

在 C++11 章节，我们甚至讨论了使用 `const auto var` 也会有一些误导。

这是因为开发人员可能已经习惯了 `var` 可能是一个闭包对象而不是函数调用结果。

在 C++17 有一个更方便的模板函数 `std::invoke()` 可以使 IIFE 更加清晰。

```cpp
const auto var = std::invoke([&] {
    if (TheFirstCondition())
        return one_value;
    if (TheSecondCindition())
        return second_val;
    return default_value;
});
```

如你所见，不再需要在末尾写上 `()`，而是更清晰的进行调用。

Note： `std::invoke()` 位于 `<functional>` 头文件中。

## 6. 可变泛型 Lambda 的更新

在 C++14 章节，我们了解到在泛型 Lamdba 中可以使用 [泛型参数列表](../Chapter3/README.md#可变泛型参数)。

感谢 C++17 带来的折叠表达式能够让我们写出更加紧凑的代码。

> 代码 4-7 [使用折叠表达式实现的求和函数](https://wandbox.org/permlink/2y6y2ZAgSftBjG0S)

```cpp
#include <iostream>
int main() {
    const auto sumLambda = [](auto... args) {
        std::cout << "sum of: " << sizeof...(args) << " numbers\n";
        return (args + ... + 0);
    };
    std::cout << sumLambda(1.1, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7, 8.8, 9.9);
}
```

如果你将上述代码与之前才 C++14 章节中求和函数的例子进行对比，你会发现这个例子中不再需要递归。

当我们需要书写包含可变参数的表达式时，使用折叠表达式会相对简单和直观。

下面是另外一个例子，它能够输出多个参数。

> 代码 4-8 [使用折叠表达式实现简单的多参数输出](https://wandbox.org/permlink/ABqmzBYbWhLIVTr6)

```cpp
#include <iostream>
int main() {
    const auto printer = [](auto... args) {
        (std::cout << ... << args) << '\n';
    };
    printer(1, 2, 3, "hello", 10.5f);
}
```

运行该代码后，会输出所有的参数并且不包含分隔符：

```plaintext
123hello10.5
```

为了解决这个问题，我们将介绍一个小技巧，一并折叠逗号分隔符：

> 代码 4-9 [使用折叠表达式实现带分隔符的多参数输出](https://wandbox.org/permlink/BPcBo49NQoj2RBBF)

```cpp
#include <iostream>
int main() {
    const auto printer = [](auto... args) {
        const auto printElem = [](auto elem) {
            std::cout << elem << ", ";
        };
        (printElem(args), ...);
        std::cout << '\n';
    };
    printer(1, 2, 3, "hello", 10.5f);
}
```

我们将得到如下输出：

```plaintext
1, 2, 3, hello, 10.5,
```

代码其实可以更短：

```cpp
const auto printer = [](auto... args) {
    ((std::cout << args << ", "), ...);
    std::cout << '\n';
};
```

如果我们不想输出末尾逗号的话，我们可以将代码改成这样：

> 代码 4-10 [没有尾逗号的带分隔符的多参数输出](https://wandbox.org/permlink/qvuIL1vXdHff6QAL)

```cpp
#include <iostream>
int main() {
    const auto printer = [](auto first, auto... args) {
        std::cout << first;
        ((std::cout << ", " << args), ...);
        std::cout << '\n';
    };
    printer(1, 2, 3, "hello", 10.5f);
}
```

这一次我们需要使用通用模板参数来输出第一个元素。

然后为其余元素使用可变参数列表，并且在输出元素前输出一个逗号分隔符。

代码输出如下：

```plaintext
1, 2, 3, hello, 10.5
```

## 7. 从多个 Lambda 派生
在 C++11 章节，我们了解了从 Lamdba 表达式进行派生，虽然这很有趣，但是使用场景很有限。

主要的问题是在 C++11 中只支持特定数量的 Lambda，那么例子使用了一个或两个基类，但是如何能够使用可变数量的基类，即可变数量的 Lamdba 表达式。

在 C++17 我们有了相对简单的模式去实现：

```cpp
template <class... Ts>
struct overloaded : Ts... {
    using Ts::operator()...;
};
template <class... Ts>
overloaded(Ts...) -> overloaded<Ts...>;
```

如你所见，我们需要使用可变参数模板，因为它允许我们使用任意数量的基类。

下面是一个例子：

> 代码 4-11 [重载模式](https://wandbox.org/permlink/NnSVvxmSakroK7OH)

```cpp
#include <iostream>
template <class... Ts>
struct overloaded : Ts... {
    using Ts::operator()...;
};

template <class... Ts>
overloaded(Ts...) -> overloaded<Ts...>;

int main() {
    const auto test = overloaded{[](const int &i) {
                                     std::cout << "int: " << i << '\n';
                                 },
            [](const float &f) {
                std::cout << "float: " << f << '\n';
            },
            [](const std::string &s) {
                std::cout << "string: " << s << '\n';
            }};
    test("10.0f");
}
```

在上述的例子中，我们创建了一个由三个 Lambda 组成的 Lamdba 表达式。

之后我们可以带上参数调用该 Lamdba 表达式，将会通过传入的参数类型调用所需的函数。

现在让我们仔细看看这个模式核心的两行代码。

这两行代码受益于自 C++17 以来可用的三个特性：

- using 声明的包扩展 - 用更简单且紧凑的代码实现可变模板。
- 自定义模板参数推导规则 - 允许将 Lamdba 列表转换为重载类的基类列表。（在 C++20 中不需要这么做）。
- 聚合初始化的扩展 - 在 C++17 之前，不能合并从其它类型派生的初始化类型。

在 C++11 章节中，我们已经使用了 using declaration。

这个特性对于使用同一个作用域内的仿函数重载带来很大帮助。

在 C++17 我们获得了支持可变参数模板的语法，这在先前的版本中是没有的。

现在让我们试着去理解剩下的两个特性：
### 自定义模板参数推导规则
我们从 Lambda 派生，并且将它们的 `operator()` 暴露出来，上一节看到的那样。

那么我们如何创建这种重载类型的变量呢？

像你知道的那样，我们无法预先知道某一个 Lambda 的类型，因为编译器会为每一个 Lambda 生成一个唯一的类型名称。例如，我们不能写下如下的代码：

```cpp
overload<LambdaType1, LambdaType2>myOverload { ... } // ???
// what is LambdaType1 and LambdaType2 ??
```

唯一的方式是使用一些 `make` 函数（因为模板参数推导适用于函数模板），像下面这样：

```cpp
template <typename... T>
constexpr auto make_overloader(T&&... t) {
    return overloaded<T...>{std::forward<T>(t)...};
}
```

如果使用 C++17 中引入的模板参数推导规则，我们可以简化常见模板类型的创建，而不需要像上面那样需要使用一个类似于 `make_overloader` 的函数。

举个例子，对于一个简单的类型，我们可以写下如下代码：

```cpp
std::pair strDouble { std::string{"Hello"}, 10.0};
// strDouble is std::pair<std::string, double>
```

有一个 `option` 能够自定义推导规则，并且在标准库中大量的使用了它们，比如 `std::array` ：

```cpp
template <class T, class... U>
array(T, U...) -> array<T, 1 + sizeof...(U)>;
```

上述的写法允许我们写下如下的代码：

```cpp
array test{1, 2, 3, 4, 5};
// test is std::array<int, 5>
```

对于重载模式，我们可以使用如下的自定义推导规则：

```cpp
template<class... Ts>overloaded(Ts...) ->overloaded<Ts...>;
```

现在，我们可以使用两个 Lamdba 初始化一个 Lamdba 表达式：

```cpp
overloaded myOverload { [](int) { }, [](double) { } };
```

上述的 Lamdba 表达式中的模板参数将被正确推导，因为在这个例子中，编译器知道这两个 Lamdba 表达式参数的类型，所以可以解析出继承自这两个参数的 Lamdba 表达式的类型。

你可以在 [C++20 章节]() 中看到新的标准，类模板参数推导将被提升，对于重载模式，将不再需要写自定义的推导规则。

现在让我们进入最后一个小节 - 聚合初始化
### 聚合初始化的扩展
这个功能相对简单：我们可以聚合初始化一个从其它类型派生的类型。

来自这个标准 [[dcl.init.aggr]](https://timsong-cpp.github.io/cppwp/n4659/dcl.init.aggr)：

> An aggregate is an array or a class with:
> - no user-provided, explicit, or inherited constructors
> - no private or protected non-static data members
> - no virtual functions, and
> - no virtual, private, or protected base classes

如下这个例子（例子来自于标准草案）：

```cpp
struct base1 {
    int b1, b2 = 32;
};

struct base2 {
    base2() {
        b3 = 64;
    }
    int b3;
};
struct derived : base1, base2 {
    int d;
};

derived d1{{1, 2}, {}, 4};
derived d2{{}, {}, 4};
```

该代码中：

对于 d1 ：

- `d1.b1` 初始化为 1
- `d1.b2` 初始化为 2
- `d1.b3` 初始化为 64
- `d1.d` 初始化为 4

对于 d2 ：

- `d2.b1` 初始化为 0
- `d2.b2` 初始化为 32
- `d2.b3` 初始化为 64
- `d2.d` 初始化为 4

在我们的例子中，聚合初始化有更显著的影响。因为对于重载类，没有聚合初始化，我们必须实现如下的构造函数：

```cpp
struct overloaded : Fs... {
    template <class... Ts>
    overloaded(Ts&&... ts) : Fs{std::forward<Ts>(ts)}... {}
    // ...
}
```

这将会需要写很多代码，而且可能没有涵盖所有的情况，比如 `noexcept。`

通过聚合初始化，我们「直接」从基类列表中调用 Lambda 的构造函数，因此无需编写向其显示转发参数的代码。

至此为止，我们介绍了很多，那么有没有什么有用的重载模式的例子？

现在看来似乎 `std::variant` 更为方便。
### `std::variant` 和 `std::visit` 的例子

我们可以使用继承和重载模式来做一些更实用的事情。

先看一个 `std::variant` 和 `std::visit` 的例子

> 代码 4-12 [使用 `variant` 和 `visit` 实现重载模式](https://wandbox.org/permlink/TWx5fV2D0bwCWnxO)

```cpp
#include <iostream>
#include <variant>

template <class... Ts>
struct overloaded : Ts... {
    using Ts::operator()...;
};
template <class... Ts>
overloaded(Ts...) -> overloaded<Ts...>;

int main() {
    const auto PrintVisitor = [](const auto& t) {
        std::cout << t << "\n";
    };

    std::variant<int, float, std::string> intFloatString{"Hello"};
    std::visit(PrintVisitor, intFloatString);
    std::visit(overloaded{[](int& i) {
                              i *= 2;
                          },
                       [](float& f) {
                           f *= 2.0f;
                       },
                       [](std::string& s) {
                           s = s + s;
                       }},
            intFloatString);
    std::visit(PrintVisitor, intFloatString);
}
```

在上述的代码中：

- 我们创建了一个支持 整型、浮点型和字符串的 `variant` 变量。
- 然后通过三个重载函数调整了 `intFloatString` 的值。
- 最后再通过 `PrintVisitor` 将其输出出来。
- 由于范型 Lamdba `的支持，PrintVisitor` 函数只需要写一个，它支持所有实现了 `<<` 操作符的对象。

其中，我们有一个 `std::visit` 的调用，它创建了一个 `visitor` ，重载了三种类型，三个函数都是将当前值赋值一份，只是类型不同。

## 8. 使用 Lambda 进行并发编程
如果在同一个线程中调用 Lamdba 是比较容易的情形。

但是如果你想在一个单独的线程中调用 Lamdba 的话，应该怎么做？

可能会遇到什么问题？

让我们在本节中展开说说。

> 本节不是关于如何用 C++ 编写并发代码的教程，旨在展示您在异步代码中使用 lambda 可能会遇到的问题。
> 有关 C++ 中的并发问题，您可以参考单独的书籍，例如 Rainer Grimm 的 《[Concurrency with Modern C++](https://leanpub.com/concurrencywithmodernc)》 或者 Anthony Williams 的 《[C++ Concurrency in Action](https://www.amazon.com/C-Concurrency-Action-Anthony-Williams/dp/1617294691/ref=as_li_ss_tl?dchild=1&keywords=concurrency+C+++williams&qid=1594551073&sr=8-1&linkCode=sl1&tag=bfilipek-20&linkId=20fd1d68c301de792ad0b0e7a30c661a&language=en_US)》。

### Lambda 和 `std::thread`

让我们先看一下自从 C++11 就开始支持的 `std::thread`。

您可能已经知道 `std::thread` 在其构造函数中接受一个可调用对象。

可调用对象可能是一个普通的函数指针、仿函数或者 Lamdba 表达式。

一个简单的例子：

> 代码 4-13 [将 Lamdba 传递给 `thread`](https://wandbox.org/permlink/iJB6ldTDQqBVrXBC)

```cpp
#include <iostream>
#include <numeric>  // for std::iota
#include <thread>
#include <vector>

int main() {
    const auto printThreadID = [](const char* str) {
        std::cout << str << ": " << std::this_thread::get_id() << " thread id\n";
    };
    std::vector<int> numbers(100);
    std::thread iotaThread(
            [&numbers, &printThreadID](int startArg) {
                std::iota(numbers.begin(), numbers.end(), startArg);
                printThreadID("iota in");
            },
            10);
    iotaThread.join();
    printThreadID("printing numbers in");
    for (const auto& num : numbers) std::cout << num << ", ";
}
```

在上述的例子中，我们使用 Lamdba 表达式创建了一个线程。
`std::thread` 类拥有非常灵活的构造函数，所以我们甚至能够在 Lamdba 中传入一个参数，在上述代码中，我们将 `10` 作为 `startArg` 传给了 Lamdba。

上述代码很简单，因为我们通过 `join` 控制了线程的执行，保证我们在输出 `numbers` 之前， `numbers` 里的数据一定会准备好。

关键的是，虽然 Lamdba 使得创建线程变得更加容易和方便，但是它仍然是异步执行的。

闭包并不会改变其异步执行的特性，闭包同样会受到所有竞争条件和阻塞的影响。

我们可以看一下下面的例子：

> 代码 4-14 [通过很多线程更改共享变量](https://wandbox.org/permlink/ZXL9k3jsl3KvrLVb)

```cpp
#include <iostream>
#include <thread>
#include <vector>

int main() {
    int counter = 0;
    const auto maxThreads = std::thread::hardware_concurrency();
    std::vector<std::thread> threads;
    threads.reserve(maxThreads);
    for (size_t tCounter = 0; tCounter < maxThreads; ++tCounter) {
        threads.push_back(std::thread([&counter]() noexcept {
            for (int i = 0; i < 1000; ++i) {
                ++counter;
                --counter;
                ++counter;
                --counter;
            }
        }));
    }
    for (auto& thread : threads) {
        thread.join();
    }
    std::cout << counter << std::endl;
}
```

`std::thread::hardware_concurrency()` 是一个静态成员函数。它会返回支持的线程数量。

通常它是给定机器上的硬件线程数，据 Coliru 说，在 Wandbox 上通常是 `3`。

在这个例子中，我们创建了若干个线程，每个线程都对 `counter` 有一些运算。 `counter` 变量被所有线程共享。

在 C++20 中，你可以使用 `std::jthread`，它能够在析构的时候进行 `join` 并且能够接收停止标记的线程。

这种新的线程对象能够允许用户对线程执行进行更多的控制。

虽然您可能希望的最终结果是 `0`，但是结果是未定义的。

当一个线程正在读该变量的时候，可能正在有另外一个变量在并发写，导致最终的结果是未定义的。

为了解决这个问题，与常规线程场景一样，我们应该使用某种同步机制。

比如上面那个例子，我们可以使用较为易用的原子变量。

> 代码 4-15 [使用原子变量](https://wandbox.org/permlink/8Te9dhfQ4r9jvOXf)

```cpp
#include <atomic>
#include <iostream>
#include <thread>
#include <vector>

int main() {
    std::atomic<int> counter = 0;
    const auto maxThreads = std::thread::hardware_concurrency();
    std::vector<std::thread> threads;
    threads.reserve(maxThreads);

    for (size_t tCounter = 0; tCounter < maxThreads; ++tCounter) {
        threads.push_back(std::thread([&counter]() noexcept {
            for (int i = 0; i < 1000; ++i) {
                counter.fetch_add(1);
                counter.fetch_sub(1);
                counter.fetch_add(1);
                counter.fetch_sub(1);
            }
        }));
    }

    for (auto& thread : threads) {
        thread.join();
    }
    std::cout << counter.load() << std::endl;
}
```

上面的代码会按我们的预期进行执行，因为增加和减少操作现在是原子的。

这意味着当 counter 改变的时候，其它线程不能中断这个操作。

「同步」使得代码更加安全，但是需要以性能作为牺牲。

然后这也是一个需要值得出一本书来长久讨论的主题。

解决同步问题的另外一个选择是在计算的每个线程中都有一个局部变量。

然后在线程结束之前，我们可以去锁定并且更新全局变量。

值得补充的一点是，将变量定义为 `volatile` 并不能提供正确的同步机制，并且在 C++20 中 `volatile` 在许多地方被弃用。

正如我们所见，使用 Lambda 表达式创建线程非常方便。

它可以与线程声明在一起，并且可以做任何你在常规函数和仿函数中能够做的事情。

现在让我们来尝试一下在 C++ 中新引入的另外一个科技。
### Lambda 和 `std::async`
您可以使用多线程的第二种方法是通过 `std::async`。

我们在 C++11 中通常将这个功能与线程一起使用。

这是一个高级 API，允许您延迟或完全异步地调用和计算。

现在让我们将 `iota` 的例子使用 `std::async` 来实现：

> 代码 4-16 [使用 std::async 异步调用代码](https://wandbox.org/permlink/474G5hs81EZfiFNR)

```cpp
#include <future>  // for async and future
#include <iostream>
#include <numeric>  // for std::iota
#include <thread>
#include <vector>

int main() {
    const auto printThreadID = [](const char* str) {
        std::cout << str << ": " << std::this_thread::get_id() << " thread id\n";
    };

    std::vector<int> numbers(100);

    std::future<void> iotaFuture = std::async(std::launch::async, [&numbers, startArg = 10, &printThreadID]() {
        std::iota(numbers.begin(), numbers.end(), startArg);
        printThreadID("iota in");
    });

    iotaFuture.get();  // make sure we get the results...
    printThreadID("printing numbers in");
    for (const auto& num : numbers) std::cout << num << ", ";
}
```

这一次，我们没有使用线程，而是依赖了 `std::future` 机制来实现。

这是一个处理同步并保证调用结果在我们通过 `.get()` 请求时可用的对象。

在这个例子中，我们通过 `std::async` 调度 Lambda 的执行，然后通过调用 `.get()` 来等待这些被调度的任务执行完毕。

然后，上面的代码实现不够优雅。

因为我们使用了 `future<void>` 并且使用引用捕获了 `numbers`。

更好的解耦方式应该是使用 `std::future<std::vector<int>>`，然后通过 `future` 的 `.get()` 机制来传递结果。

像是下述代码写的一样：

```cpp
std::future<std::vector<int>> iotaFuture = std::async(std::launch::async, [starArg = 10]() {
    std::vector<int> numbers(100);
    std::iota(numbers.begin(), numbers.end(), startArg);
    std::cout << "calling from: " << std::this_thread::get_id() << " thread id\n";
    return numbers;
});
auto vec = iotaFuture.get();  // make sure we get the results...// ...
```

长久以来，`std::async/std::future` 似乎获得了褒贬不一的评价。

看起来可能是实现的太粗鲁了。

它适用于相对简单的情况，在一些复杂的情况下可能没那么有效，例如：

- continuation
- task merging
- no cancellation/joining
- it’s not a regular type
- and a few other issues

如果你想了解更多，那么你可以阅读以下资料：

- [There is a Better Future - Felix Petriconi - code::dive 2018](https://www.youtube.com/watch?v=WZdKFlH7qxo&ab_channel=code%3A%3Adiveconference)
- [code::dive 2016 conference – Sean Parent – Better Code: Concurrency](https://www.youtube.com/watch?v=QIHy8pXbneI)
- [Core C++ 2019 :: Avi Kivity :: Building efficient I/O intensive applications with Seastar](https://www.youtube.com/watch?v=p8d28t4qCTY)

### Lambda 和 C++17 的并行算法
在讨论了 C++11 的线程支持后，我们可以转向更新的标准：C++17。

这次有一个超级好用的技巧，允许您并行化标准库中的大多数算法。

您所要做的就是在算法中指定第一个参数，例如：

```cpp
auto myVec = GenerateVector();
std::sort(std::execution::par, myVec.begin(), myVec.end());
```

值得注意的是我们指定了第一个参数 `std::execution::par` 。

它将为排序算法开启并发执行的特性。

我们还有其它的特性：

| 特性名                      | 描述                                                                                     |
| --------------------------- | ---------------------------------------------------------------------------------------- |
| sequenced_policy            | 这是一种执行策略类型，用作消除并行算法重载的歧义并指示并行算法的执行不能并行化。         |
| parallel_policy             | 这是一种执行策略类型，用作消除并行算法重载的歧义并指示并行算法的执行可以并行化。         |
| parallel_unsequenced_policy | 这是一种执行策略类型，用作消除并行算法重载的歧义并指示并行算法的执行可以并行化和向量化。 |

对于每一种特性来说，我们预先定义了全局对象，你可以将它传递给特定的算法：

- `std::execution::par`
- `std::execution::seq`
- `std::execution::par_unseq`

执行特性的声明和其对应的全局对象位于 `<execution>` 头文件中。

在 C++20 中还有另外一种执行策略：`unsequenced_policy` 以及其对应的全局对象 `std::execution::unseq`。

它用于在单线程上启用向量化执行。

虽然我们可以轻松的启用并行排序，但是我们也很有可能写出如下糟糕的代码：

> 代码 4-17 [向 vector 中拷贝的危险行为](https://wandbox.org/permlink/pK63LEwKymZJC6Ne)

```cpp
#include <execution>
#include <iostream>
#include <numeric>
#include <vector>

int main() {
    std::vector<int> vec(1000);
    std::iota(vec.begin(), vec.end(), 0);
    std::vector<int> output;
    std::for_each(std::execution::par, vec.begin(), vec.end(), [&output](int& elem) {
        if (elem % 2 == 0) {
            output.push_back(elem);
        }
    });
    for (const auto& elem : output) std::cout << elem << ", ";
}
```

上述代码不包含任何的第三方库，但是需要支持并行算法的编译器。

这在 MSVC（始于 VS 2017）中是可能可以运行的，但是不适合于任何在线编译器，你可以将该代码拷贝到 Visual Studio 上运行。

译者注：现在可以在 Wandbox 上跑了。

你看到这里的问题所在了吗？

通过将 Lamdba 传递给 `std::for_each`，我们需要记住代码不会运行在单线程中。

这里可能会使用多线程，例如：线程池的解决方案。

这就是为什么访问共享输出变量不是一个好主意。

它不仅可能会以错误的顺序插入元素，而且如果多个线程同时尝试更改变量，它甚至会崩溃。

我们可以通过在每次调用 `push_back` 之前使用互斥锁并锁定它来解决同步问题。

但是上述的代码仍然高效吗？

如果过滤的条件简单且执行速度较快，那么上述代码的性能甚至会低于其对应的串行版本的代码。

如果没有实际运行过，您不知道 `output` 中元素的顺序。

这一节展示了基本的并行算法，如果你想了解的更多，可以阅读以下文章：

- [The Amazing Performance of C++17 Parallel Algorithms, is it Possible?](https://www.cppstories.com/2018/11/parallel-alg-perf/)

### Lambda 和异步 - 总结
当你想启动一个线程、通过 `std::async` 或者调用并行算法的时候，使用 Lamdba 表达式会非常方便。

但是必须要记住的一点是，闭包对象在并发性方面并没有特殊性，所有的挑战和困难也都是基于此。

## 9. 总结
在本章节中，您已经看到了 C++17 加入了 C++ 中的两个基本元素， `constexpr` 和 Lamdba。

现在你可以配合 `constexpr` 使用 Lamdba 表达式了。

这是改进语言中元编程支持的必要步骤。

我们将在 C++20 的章节中看到更多关于此的内容。

更重要的是，C++17 标准也解决了捕获的问题，从 C++17 开始，您可以通过 `[*this]` 对 `this` 进行值捕获，从而使代码更加安全。

我们还查看了 Lamdba 相关的一些例子：IIFE 技术、折叠表达式和可变参数泛型 Lamdba，从多个 Lamdba 进行派生已经异步代码的执行。

由于在 C++17 中支持的各种功能，我们现在有更好的语法和更直接的方法来编写更高效的代码。
