# 一、Lambda in C++98/03

凡是在开始之前，对主题的背景做出一些介绍总是好的。

所以，我们首先会聊一聊在没有现代C++之前的那些 C++ 代码。

在本章，你可以学到：

- 如何从标准库传递一个仿函数给算法
- 仿函数和函数指针的局限性
- 为什么辅助函数不够好使
- C++0x / C++11 中添加新特性的动机

## 1. C++98/03 中的可调用对象

首先来聊聊标准库中基本思想之一的算法，像 `std::sort` ，`std::for_each` ，`std::transform` 等，可以调用任何可调用对象以及调用输入容器中的一个元素。

然而，在 C++98/03 中，这些操作只包含指向函数的指针或者仿函数。

举一个例子，我们来看一看一个打印 `vector` 中全部元素的应用程序。

在第一版中，我们将使用规范的函数：

> 代码1-1 [基础输出函数](https://wandbox.org/permlink/XiMBBTOG122vplUS)

```c++
#include<algorithm>
#include<iostream>
#include<vector>

void PrintFunc(int x) {
    std::cout << x <<std::endl;
}

int main() {
    std::vector<int> v;
    v.push_back(1);
    v.push_back(2);
    std::for_each(v.begin(), v.end(), PrintFunc);
}
```

上面的代码使用了 `std::for_each` 来从 `vector` 中迭代每个元素（请注意此时的 C++ 为 98/03 版本，尚不支持范围式循环），同时传递了一个可调用对象 `PrintFunc` 。

我们可以将这个简单的函数转化为一个仿函数：

> 代码1-2 [基础输出仿函数](https://wandbox.org/permlink/7OGJzJlfg40SSQUG)

```cpp
#include<algorithm>
#include<iostream>
#include<vector>

struct PrintFunctor {
    void operator()(int x) const {
        std::cout << x <<std::endl;
    }
}

int main() {
    std::vector<int> v;
    v.push_back(1);
    v.push_back(2);
    std::for_each(v.begin(), v.end(), PrintFunctor());
}
```

本用例重载了操作符 `()` 来定义了一个简单的仿函数。

相较于通常无状态的函数指针，仿函数能够持有成员变量来允许存储状态。

一个例子：统计在算法中调用可调用对象的次数。

这需要在仿函数中存储一个计数器，并且在每次 lambda 调用时更新计数：

> 代码1-3 [带有状态的仿函数]()

```cpp
#include<algorithm>
#include<iostream>
#include<vector>

struct PrintFunctor {
    PrintFunctor(): numCalls(0){}

    void operator()(int x) const {
        std::cout << x <<std::endl;
        ++numCalls;
    }

    mutable int numCalls;
};

int main() {
    std::vector<int> v;
    v.push_back(1);
    v.push_back(2);
    const PrintFunctor visitor = std::for_each(v.begin(), v.end(), PrintFunctor());
    std::cout << "num calls: " << visitor.numCalls << '\n';
}
```

在上面的例子中，我们使用了成员变量 `numCalls` 来统计调用操作符被调用的次数。

由于调用操作符是一个 `const` 成员函数，我使用了 `mutable` 类型的变量。

如您所料，我们得到的输出结果就是：

```plaintext
1
2
num calls: 2
```

我们也可以从调用范围中「捕获」变量。

想要达到这个效果，我们需要在仿函数中创建一个成员变量并且在构造器中初始化它。

> 代码1-4 [带有“捕获”变量的仿函数](https://wandbox.org/permlink/ogenCfT7ZCTbRIkZ)

```cpp
#include <algorithm>
#include <iostream>
#include <string>
#include <vector>

struct PrintFunctor {
    PrintFunctor(const std::string& str) : strText(str), numCalls(0) {}
    void operator()(int x) const {
        std::cout << strText << x << '\n';
        ++numCalls;
    }
    std::string strText;
    mutable int numCalls;
};

int main() {
    std::vector<int> v;
    v.push_back(1);
    v.push_back(2);
    const std::string introText("Elem: ");
    const PrintFunctor visitor = std::for_each(v.begin(), v.end(), PrintFunctor(introText));
    std::cout << "num calls: " << visitor.numCalls << '\n';
}
```

在这个版本中， `PrintFunctor` 使用了一个额外的参数来初始化成员变量。

然后这个变量在调用操作符中被使用。所以最终期望的输出是：

```plaintext
Elem: 1
Elem: 2
num calls: 2
```

## 2. 仿函数的一些问题

如您所见，仿函数的功能很强大。他们由一个独立的类所表示，您可以根据您的需要来设计、改造并使用它。

然而 C++98/03 问题在于需要在不同的地方编写一个函数或者仿函数，而不是算法调用对象本身。

这意味着这段代码会在源文件的中占用几十到上百行，而且这样分离的写法并不利于日后代码的维护。

一个可行的解决办法，那就是再编写一个本地仿函数类，因为 C++ 支持这样的语法，但是这不意味着它能如预期一样工作。

来看看这段代码：

> 代码1-5 本地仿函数类

```cpp
int main() {
    struct PrintFunctor {
        void operator()(int x) const {
            std::cout << x << std::endl;
        }
    };
    std::vector<int> v(10, 1);
    std::for_each(v.begin(), v.end(), PrintFunctor());
}
```

您可以用 GCC 来尝试编译它（带上 C++98 的标签 `-std=c++98` ），当然不出意外，将会出现如下的编译错误：

```plaintext
error: template argument for
'template<class _IIter, class _Funct> _Funct
std::for_each(_IIter, _IIter, _Funct)'
uses local type 'main()::PrintFunctor'
```

在 C++98/03 中，你不能用本地类型来初始化一个模板。

当认识到并理解了这些限制产生的原因， C++ 开发者就可以在 C++98/03 中找到一种解决办法：使用一组辅助函数。

## 3. 使用辅助函数

使用一些辅助函数或者预定义好的仿函数会如何呢？

如果您查阅过标准库中 `<functional>` 头文件的源码，你会发现一些可在标准算法中被立即使用的类型或者函数。

例如：

- `std::plus<T>()` - 传入两个参数并返回他们的和
- `std::minus<T>()` - 传入两个参数并返回他们的差
- `std::less<T>()` - 传入两个参数并判断第一个参数是否小于第二个参数
- `std::greater_equal<T>()` - 传入两个参数并判断第一个参数是否大于等于第二个参数
- `std::bind1st` - 用给定的第一个参数创建一个可调用对象
- `std::bind2nd` - 用给定的第二个参数创建一个可调用对象
- 等等

让我们编写一些充分利用这些辅助函数的代码：

> 代码1-6 [使用旧 C++98/03 的辅助函数](https://wandbox.org/permlink/9KgfRwwC3Dza2ZVh)

```cpp
#include <algorithm>
#include <functional>
#include <vector>

int main() {
    std::vector<int> v;
    v.push_back(1);
    v.push_back(2);
    // .. push back until 9...
    const size_t smaller5 = std::count_if(v.begin(), v.end(), std::bind2nd(std::less<int>(), 5));
    return smaller5;
}
```

这个例子使用 `std::less` 并且用 `std::bind2nd` 来固定第二个参数，同时，这个整体又被传入了 `std::count_if` 。

您可能会猜到，这个代码可以展开为一个用来简单判断大小关系的函数：`return x < 5;`

如果你准备好使用等多的辅助函数，您也可以看看 `boost` 库，例如 `boost::bind` 。

不幸的是，最主要的问题是这种方式十分的复杂并且语法不易学习。

举个例子，使用更多的辅助函数将会导致代码变得很不自然。

来看看这个：

> 代码1-7 [组合使用辅助函数](https://wandbox.org/permlink/D7XjbyM0i2nslhRU)

```cpp
using std::placeholders::_1;
std::vector<int> v;
v.push_back(1);
v.push_back(2);
// .. push back until 9...
const size_t val = std::count_if(v.begin(), v.end(),
    std::bind(
        std::logical_and<bool>(), std::bind(std::greater<int>(), _1, 2), std::bind(std::less_equal<int>(), _1, 6)));
// _1 comes from the std::placeholder namespace
```

这个组合使用 `std::bind` （当然了 `std::bind` 是 C++11 的功能，而不是 C++98/03 ）并结合 `std::greater` 和 `std::less_equal` 甚至联系到 `std::logical_and` 。

哦对， `_1` 是一个第一输入参数的占位符。

尽管上述代码有效，并且您可以在本地定义它，但您不得不忍痛它很复杂且语法不自然。

更何况这个组合只代表一个简单的条件：`return x > 2 && x <= 6;`。

有什么更好以及更自然的方式吗?

## 4. 新特性的动机

在 C++98/03 中，有很多方式来声明或者传递一个可调用对象给标准库的算法或者公用组件。

然而，所有的这些都一些限制。例如，你不能声明一个本地的仿函数对象，以及使用辅助函数组合起来的一个复杂表达。

幸运的是，在 C++11 中我们有了很多新的提升。

首先， C++ 委员会解除了使用本地类型的模板进行实例化的限制。

现在你可以在你需要的地方编写本地仿函数了。

还有，C++11 带来了另一个想法：如果编译器可以为开发人员“编写”小巧简洁的仿函数呢？

这意味着通过一些新语法，我们可以“就地”创建仿函数。

C++ 从此开启了更简洁、更紧凑的语法的新篇章。

这就是 Lambda 表达式的诞生。

如果我们回头看看 [N3337](https://timsong-cpp.github.io/cppwp/n3337/) 草案 —— C++11 的最终草案，我们可以看到关于 lambda 的独立章节[[expr.prim.lambda]](https://timsong-cpp.github.io/cppwp/n3337/expr.prim.lambda)

下个章节，我们将一起看看这个新的 C++ 特性。
