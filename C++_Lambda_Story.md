
本书 Chapter 17 章节翻译感谢 [@Dup4](https://github.com/Dup4) 同学的支持。

# 关于此书
## 成书渊源
## 阅读对象
本书适用于所有喜欢了解现代 C++ 特性：Lambda 表达式 的 C++ 开发人员。
## 读者反馈
如果您发现错误、拼写错误、语法错误……或其他任何需要更正的（特别是逻辑问题！），请将您的反馈发送到 bartlomiej.filipek@bfilipek.com。
您也可以使用这个地方：
- [Leanpub Book的反馈页面 - C++ Lambda Story](https://leanpub.com/cpplambda)  
更重要的是，这本书在 *GoodReads* 上有一个专门的页面。 请在那里分享您的见解：
- [C++ Lambda Story @GoodReads](https://www.goodreads.com/book/show/53609731-c-lambda-story)
## 代码证书
这本书的代码在 **知识共享许可（Creative Commons License）** 下可用
## 代码格式
## 语法高亮限制
## 在线编译器
你可以使用一些在线编译器，这样就不用在本地创建项目来尝试运行和解读这些示例代码了。这些在线编译器提供基础的文本编辑器，并且通常允许你自行编写源文件进行编译。对于一些简短的代码而言，使用在线编译器来说是十分方便的，可以快速查看代码的运行结果，甚至你可以快速在不同版本，不同环境，不同编译器之间进行切换使用。

本书中大部分的代码都附有在线编译器的链接，当然，不同的代码使用的不同的编译器。

这是本书中所使用过的全部在线编译器服务：
- [Coliru](http://coliru.stacked-crooked.com/) - 使用 GCC 9.2.0 版本（截止 2020 年 06 月），功能简洁但十分高效
- [Wandbox](https://wandbox.org/) - 提供了大部分的编译器，包含了绝大多数的 Clang 和 GCC 版本，使用了 boost 的库，支持多文件编译。并且你可以生成链接来分享你的代码。
- [Compiler Explorer](https://gcc.godbolt.org/) - 提供多种编译器，显示生成的汇编代码，可以执行代码，甚至进行静态代码分析。
- [CppBench](https://quick-bench.com/) - 可以运行简单的 C++ 性能测试（基于 Google Benchmark）。
- [C++ Insights](https://cppinsights.io/) - 基于 Clang的 源码转义工具，可以展示编译器视角下的代码，比如将源代码进行预编译展开。你可以在这查看 Lambda 表达式，auto 关键字，结构化绑定，模板推断，可变参数包，范围式循环等的展开结果。

当然，如果想尝试其他 C++ 的在线编译器，你也可以在这个网站查看：[List of Online C++ Compilers by arnemertz](https://arnemertz.github.io/online-compilers/)
## 关于作者
**Bartłomiej (Bartek) Filipekis**，一个拥有超过 12 年专业经验的 C++ 软件开发工程师。2010年在 Cracow, Poland 毕业自 Jagiellonian University ，拥有计算机科学的硕士学位。

现就职于 Xara，负责开发高级文档编辑器。同时，拥有桌面图形程序、游戏开发、大型航空系统、图形驱动甚至生物反馈方面的开发经验。早前，在 Cracow 当地的大学中教授编程（游戏编程和图形编程）课程。

从2011年起，Bartek 开始在 [bfilipek.com](http://bfilipek.com) 上撰写博客。起初，博文主题围绕图形编程，但是现在更多聚焦于C++核心内容。同时，他也是 [Crocow C++](https://www.meetup.com/C-User-Group-Cracow/) 开发者组织的联合组织者。你可以在 [@CppCast](https://cppcast.com/bartlomiej-filipek/) 找到他关于 C++17 ，博客和文本处理相关的内容。

从2018年十月起， Bartek 开始在 Polish National Body 就任C++专家一职，这是一家直接与 ISO/IEC JTC 1/SC 22 (C++ Standardisation Committee) 工作的公司。同月， Bartek 获得了 Microsoft 授予的 2019/2020 年度的 MVP 头衔荣誉。

在空闲时间，喜欢和他心爱的小儿子一起收集和拼装乐高模型。

Bartek也是《[C++ 17 In Detail](https://leanpub.com/cpp17indetail)》的作者。
## 致谢
如果没有 C++ 专家 Tomasz Kamiński 的宝贵意见，本书就不可能完成（参见 [Tomek 在 Linkedin 上的简介](https://www.linkedin.com/in/tomasz-kami%C5%84ski-208572b1/)）。

Tomek 在我们位于克拉科夫的 Local C++ 用户组中主持了关于 Lambda “历史”的现场编码演示：[Lambdas: From C++11 to C++20](https://www.meetup.com/pl-PL/C-User-Group-Cracow/events/258795519/)。本书中使用的很多例子都来自那次会议。

尽管本书的初版相对较短，但后续扩展版本（额外的 100 页）是我从 JFT（John Taylor） 那得到返回和鼓励的结果。John 花费了大量时间寻找可以改进和扩展的细节。

此外，我要对提供了很多有关 Lambda 返回内容的 [Dawid Pilarski](panicsoftware.com/about-me) 表示感谢。

最后也是相当重要的，我从博客读者、Patreon 论坛以及 C++ Polska 的讨论中获得了大量反馈和评论。 谢谢你们！
## 校阅历史
- 2019 年 03 月 25 日 - 第一版上线！
- 2020 年 01 月 05 日 - 语法、更好的例子、措辞、IIFE 部分、C++20 更新。
- 2020 年 04 月 17 日 - C++20 章节重写、语法、措辞、布局。
- 2020 年 04 月 30 日 - 从 C++11、C++17 和 C++20中的 lambda 派生 
- 2020 年 06 月 19 日- 主要更新：
  - 改进了 C++03 章节，添加了有关标准库中的辅助函数对象的部分。
  - 添加了有关如何操作的新部分从 C++14 章节中不推荐使用的 bind1stin 转换为现代替代方案。
  - C++11 和 C++17 章节中改进和扩展的 IFFE 部分
  - 带有 lambda 技术列表的新附录
  - 带有五大 lambda 功能列表的新附录，改编自博客文章
  - 带有更新副标题的新标题图片
  - 整本书的许多较小改进
- 2020 年 08 月 03 日 - 主要更新，Kindle 版本上线可用：
  - 大多数代码示例现在在标题中都有指向在线编译器版本的链接
  - 改进了 Lambda 语法的描述
  - 在 C++17 和 C++20 章节中增添了新的内容。
  - 新部分：如何在容器中存储 lambda，Lambda 和异步执行，递归 lambda，类型系统中的异常规范
  - 更新了关于 C++14 和 C++17 中可变参数泛型 lambda 的部分
  - 更新了关于 C++11 和 C++20 中可变参数包的新部分
  - 如果可能的话，在更长的例子中使用const和noexcept
  - 细节描述上的措词更正、全书目录结构布局的微调。

# 一、Lambda in C++98/03
凡是在开始之前，对主题的背景做出一些介绍总是好的。所以，我们首先会聊一聊在没有现代C++之前的那些 C++ 代码。

在本章，你可以学到
- 如何从标准库传递一个仿函数给算法
- 仿函数和函数指针的局限性
- 为什么辅助函数不够好使
- C++0x / C++11 中添加新特性的动机
## 1. C++98/03 中的可调用对象
首先来聊聊标准库中基本思想之一的算法，像 `std::sort` ，`std::for_each` ，`std::transform` 等，可以调用任何可调用对象以及调用输入容器中的一个元素。然而，在 C++98/03 中，这些操作只包含指向函数的指针或者仿函数。

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

相较于通常无状态的函数指针，仿函数能够持有成员变量来允许存储状态。一个例子：统计在算法中调用可调用对象的次数。这需要在仿函数中存储一个计数器，并且在每次 lambda 调用时更新计数：
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
在上面的例子中，我们使用了成员变量 `numCalls` 来统计调用操作符被调用的次数。由于调用操作符是一个 `const` 成员函数，我使用了 `mutable` 类型的变量。

如您所料，我们得到的输出结果就是：
```bash
1
2
num calls: 2
```

我们也可以从调用范围中“捕获”变量。想要达到这个效果，我们需要在仿函数中创建一个成员变量并且在构造器中初始化它。
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
在这个版本中， `PrintFunctor` 使用了一个额外的参数来初始化成员变量。然后这个变量在调用操作符中被使用。所以最终期望的输出是：
```bash
Elem: 1
Elem: 2
num calls: 2
```
## 2. 仿函数的一些问题
如您所见，仿函数的功能很强大。他们由一个独立的类所表示，您可以根据您的需要来设计、改造并使用它。

然而 C++98/03 问题在于需要在不同的地方编写一个函数或者仿函数，而不是算法调用对象本身。这意味着这段代码会在源文件的中占用几十到上百行，而且这样分离的写法并不利于日后代码的维护。

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
```bash
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
这个例子使用 `std::less` 并且用 `std::bind2nd` 来固定第二个参数，同时，这个整体又被传入了 `std::count_if` 。您可能会猜到，这个代码可以展开为一个用来简单判断大小关系的函数：
`return x < 5;`

如果你准备好使用等多的辅助函数，您也可以看看 `boost` 库，例如 `boost::bind` 。

不幸的是，最主要的问题是这种方式十分的复杂并且语法不易学习。举个例子，使用更多的辅助函数将会导致代码变得很不自然。来看看这个：
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
这个组合使用 `std::bind` （当然了 `std::bind` 是 C++11 的功能，而不是 C++98/03 ）并结合 `std::greater` 和 `std::less_equal` 甚至联系到 `std::logical_and` 。哦对， `_1` 是一个第一输入参数的占位符。

尽管上述代码有效，并且您可以在本地定义它，但您不得不忍痛它很复杂且语法不自然。 更何况这个组合只代表一个简单的条件：
`return x > 2 && x <= 6;`

有什么更好以及更自然的方式吗?
## 4. 新特性的动机
在 C++98/03 中，有很多方式来声明或者传递一个可调用对象给标准库的算法或者公用组件。然而，所有的这些都一些限制。例如，你不能声明一个本地的仿函数对象，以及使用辅助函数组合起来的一个复杂表达。

幸运的是，在 C++11 中我们有了很多新的提升。

首先， C++ 委员会解除了使用本地类型的模板进行实例化的限制。 现在你可以在你需要的地方编写本地仿函数了。

还有，C++11 带来了另一个想法：如果编译器可以为开发人员“编写”小巧简洁的仿函数呢？ 这意味着通过一些新语法，我们可以“就地”创建仿函数。 C++ 从此开启了更简洁、更紧凑的语法的新篇章。

这就是 Lambda 表达式的诞生。

如果我们回头看看 [N3337](https://timsong-cpp.github.io/cppwp/n3337/) 草案 —— C++11 的最终草案，我们可以看到关于 lambda 的独立章节[[expr.prim.lambda]](https://timsong-cpp.github.io/cppwp/n3337/expr.prim.lambda)

下个章节，我们将一起看看这个新的 C++ 特性。
# 二、Lambda in C++11
这真是激动人心的时刻。C++委员会听取了开发者们的声音，从C++11开始，我们终于拥有了lambda表达式。

Lambda很快就成为了现代C++最广为认可和使用的特性。

你可以阅读N3337草案——C++11的最终草案——中[expr.prim.lambda]章节中的lambda规范。

我认为委员会把lambda加入进来是一个明智的做法，对于C++这个语言本身而言。他们引进了一种新的语法，而编译器会去将其展开为一个未命名的“隐藏”方函数对象。引入lambda，对于一种真正的强类型语言，有很多优点（当然也有缺点），同时这种特性也更容易去推断代码的意图。

在本章节，你可以学习到：
- lambda的基础语法
- 如何捕获变量
- 如何捕获成员变量
- lambda的返回类型
- 什么是闭包对象
- lambda如何转换为一个函数指针以及用C风格的API来调用
- IIFE是什么
- 如何从 lambda 表达式继承以及它为什么有用
## 1. Lambda表达式的语法
下面就是lambda语法的“公式”和说明：
[] () specifiers exception attr -> ret { /*code; */ }
^  ^  ^                            ^
|  |  |                            |
|  |  |                            可选: 尾部返回类型
|  |  |
|  |  可选: 可变、异常说明或者noexcept、属性
|  |
|  参数列表 (当不添加说明符时可选)
|
lambda引入器以及捕获列表(可选)

在我们开始学习lambda之前，需要从 C++ 标准中引入一些核心定义：
- 闭包对象
在[expr.prim.lambda#2]中，有如下定义：
对 lambda 表达式进行求值会产生一个 prvalue 类型的临时值。 这个临时对象叫做闭包对象。

- 闭包类型
在[expr.prim.lambda#3]中，有如下定义：
lambda 表达式的类型（也是闭包对象的类型）是唯一未命名的“非联合”类型——称为闭包类型

Lambda表达式的一些例子
// 1. 一个最简单的lambda
[]{};

在第一个例子中，你可以看见一个“最小巧”的lambda表达式。它仅需要[]和一个空的函数体{}。参数列表()是可选的，所以在本例中不需要。
// 2. 带有两个参数的lambda
[](float f, int a){ return a * f;};
[](int a, int b){ return a < b };

在第二个例子中，你可以看到参数在()部分被传入进去，就和常规函数一样。返回类型是不需要的，因为编译器会自动推断它。
// 3. 带有尾返回类型的lambda
[](MyClass t) -> int { auto a = t.compute(); print(a); return a; };

在第三个例子中，我们显示地定义了返回类型。从C++11开始，这个尾部返回类型其实和常规函数的声明方式是一样的。
// 4. 带有额外描述符的lambda
[x](int a, int b) mutable{ ++x; return a < b; };
[](float param) noexcept{ return param * param; };
[x](int a, int b) mutable noexcept{ ++x; return a < b; };

第四个例子展示了在lambda表达式的函数体前，你可以添加额外的描述符。如上代码，我们使用mutable（这样我们就可以改变捕获的变量）也可以是noexcept。第三个lambda表达式同时使用了mutable和noexcept，请注意顺序（当书写为noexcept mutable时，无法编译通过）。

虽然()部分是可选的，但是如果你想要应用mutable或者noexcept，那么()则必须在表达式书写。
// 5. 可选()的lambda
[x] { std::cout << x; }; // 正确，无需()
[x] mutable { ++x; };    // 编译失败
[x]() mutable { ++x; };  // 正确，mutable前需要()
[] noexcept {};          // 编译失败
[]() noexcept {};        // 正确

同样的模式也可以在其他描述符中被应用在lambda中，像C++17和C++20中的constexpr和consteval
属性
lambda语法也允许使用以下形式引入的属性：[[attr_name]]。然而，如果你试图在lambda应用一个属性，那么这个属性是被应用在调用操作符的类型上，而不是操作符本身。这就是为什么现在（甚至在C++20）中都没有对lambda真正有意义的属性存在。大多数编译器甚至会报错。如果我们使用C++17的属性并尝试应用在lambda表达式中：
auto myLambda = [](int a)[[nodiscard]]{ return a * a; };

使用Clang编译，就会产生如下的编译错误：
error: 'nodiscard' attribute cannot be applied to types

Lambda在编译器的展开
总结一下，这儿有一个基础的代码用例来展示下编写lambda表达式并应用在std::for_each中去。作为对比，我们也编写了一个相应功能的仿函数类型：
代码2-1 Lambda表达式和对应的仿函数
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

对于这个例子，编译器会将lambda表达式
[](int x) { std::cout << x << 'n'; };

转化为一个简化格式的匿名仿函数：
struct {
    void operator()(int x) const {
        std::cout << x << '\n';
    }
} someInstance;

这种转换或者“展开”的过程，可以在C++ Insights上查看，这是一个可以查看合法C++代码转化为编译器源码视图的在线工具，包括lambda表达式的展开以及模板初始化的过程。

下一节中，我们会深入研究下lambda表达式的各个部分。
## 2. Lambda表达式的类型
由于编译器会生成给每个lambda（闭包类型）生成一个唯一名称，所以没有办法预先“拼写”出它的类型。

这就是为什么你需要使用auto或者decltype关键字来推断类型了。
auto myLambda = [](int a) -> double { returan 2.0 * a; };

当然，下面这两lambda也是一样的。
auto firstLam = [](int x) { return x *2; };
auto secondLam = [](intx) { return x *2; };

这俩lambda拥有完全一样的代码，但是他们的类型是不同的。编译器会推断为两个lambda表达式推断出各自独立的未命名类型。

我们可以用下面的代码来证明这个性质：
代码2-2 同样的代码，不同的类型
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

这个例子可以用来验证两个lambda（oneLam和twoLam）的闭包类型是否一致。
在C++17，我们可以使用不带消息的static_assert和推断类型特征的变量模板辅助函数is_same_v：
static_assert(std::is_same_v<double, decltype(baz(10))>);

但是，尽管你不知道确切的类型名，你可以将lambda的签名存储在std::function中使用。通常来说，如果定义为auto的lambda无法解决的，可以通过定义为std::function类型来解决。举个例子，之前的lambda有一个double(int)的签名（参数为int返回double）。我们可以通过以下方式创建一个std::function对象：
std::function<double(int)> myFunc = [](int a) -> double { return 2.0 * a; };

std::function是一个“笨重”的对象，因为他需要操控全部的可调用对象。为了实现这一点，他需要一套先进的内核机制，比如类型双关（Type punning）或者甚至动态内存分配。来试试下面这个例子：
代码2-3 std::function和auto类型推断
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

用GCC编译并运行，将会输出：
sizeof(myLambda) is 1
sizeof(myFunc) is 32

因为myLambda仅仅是一个无状态lambda，所以它也是一个没有任何数据成员字段的空类，这也就是为什么它的大小只有1字节的原因。而std::function版本则占用了32字节。所以，一目了然，这就是为什么你应该尽可能使用auto类型推断来获取占用内存更少的闭包对象了。

当然，我们也不得不去深入讨论std::function的使用，因为它不支持只能移动（moveable-only）的闭包对象。我们会在 C++14章可移动类型一节 来详细介绍这部分内容。
构造，还是拷贝？
在[expr.prim.lambda#19]中有一个规则：
lambda表达式产生的闭包对象是删除了 默认构造函数 和 拷贝赋值运算符 的。但是它包含隐式声明的 拷贝构造函数 以及 移动构造函数。

由于这个规则的存在，所以你无法这样编写代码：
auto foo = [&x, &y]() { ++x; ++y; };
decltype(foo) fooCopy

GCC会提示如下错误：
error: use of deleted function'main()::<lambda()>::<lambda>()'
       decltype(foo) fooCopy;
                  ^~~~~~~
note:a lambda closure type has a deleted default constructor


但是，你可以拷贝lambda：
代码2-4 拷贝Lambda
#include <type_traits>

int main() {
    const auto firstLam = [](int x) noexcept {
        return x * 2;
    };

    const auto secondLam = firstLam;
    static_assert(std::is_same<decltype(firstLam), decltype(secondLam)>::value, "must be the same");
}

如果拷贝了一个lambda（实际上发生的是拷贝构造），它的状态也会被拷贝过来。这一点对于捕获对象来说很重要。因为，一个闭包类型会存储捕获的对象作为其成员字段。所以，当进行lambda拷贝时，会拷贝那些数据成员字段。
在C++20中，无状态lambda会拥有默认的构造器和拷贝赋值。

## 3. 调用操作符
我们传入lambda中的参数部分，会被“转译”为相应闭包类型的调用操作符的参数。

默认情况下，在C++11中，他会被“转译”为一个常量内联成员函数。例如
auto lam = [](double param) { /*do something*/ };

将被编译器展开为：
struct __anonymousLambda {
    inline void operator()(double param) const { /*do something*/ }
};

重载
有一件事情值得提一下，那就是当你定义了一个lambda时，你不能创建它的任何重载形式来传入不同的参数。
// 无法编译
auto lam = [](double param) { /* do something */ };
auto lam = [](int param) { /* do something */ };

上面的代码将无法通过编译，因为编译器会将他们“转译”为一个仿函数，当然这就意味着无法重新定义一个相同的变量。但是，你可以在一个仿函数中定义两个调用操作符的重载形式，这是允许的：
struct MyFunctor {
    inline void operator()(double param) { /* do something */ };
    inline void operator()(int param) { /* do something */ };
};

MyFunctor现在就可以同时接受double和int参数了。如果你想在lambda中实现相似的效果，那么你可以看看这部分内容Lambda继承
其他修饰符
我们在lambda语法一节中简略介绍过这部分主题，但是你并不会被闭包类型调用操作符的默认声明所限制到。在C++11中，你可以添加mutalbe或者异常描述符。
如果可能的话，本书会使用长例子来用const标记闭包对象并且使lambda为noexcept。

你可以通过在参数声明后面那部分指定mutable或者noexcept来使用这些关键字。
auto myLambda = [](int a) mutable noexcept { /* do something */ };

编译器会展开为：
struct __anonymousLambda {
    inline void operator()(int a) noexcept{ /* do something */ }
};

请注意，const关键字此时会消失，并且调用操作符可以修改lambda的成员变量了。

但是，成员变量呢？我们要如何在lambda中声明成员变量？请看下一个章节——关于“捕获”变量
## 4. 捕获
捕获子句 - []操作符绝不仅仅只是lambda的引入符号，同时它还兼顾捕获变量的列表的职能。

通过从lambda表达式外部捕获变量，你可以在闭包类型中创建成员变量（非静态成员），然后，在lambda函数体中，你就可以使用它了。

我们可以弄一个类似于C++98/03章节中PrintFunctor的内容，在这个类中，我们添加成员变量std::string strText并让他在构造函数中被初始化。拥有一个成员变量可以让我们存储可调用对象的一些状态了。

一些有关捕获器的语法：
- [&] - 引用捕获，自动捕获声明在捕获范围内的生命周期尚未结束的变量。
- [=] - 值捕获（创建拷贝），自动捕获声明在捕获范围内的生命周期尚未结束的变量。
- [x, &y] - x为值捕获，y为显式引用捕获。
- [args...] - 捕获一个模板参数包，全部都是值捕获
- [&args...] - 捕获一个模板参数包，全部都是引用捕获
一些例子：
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

为了理解在捕获变量的过程中发生了什么，让我们一起来思考下面这个例子：
代码2-5 捕获一个变量
std::string str{"Hello World"};
auto foo = [str]() {
    std::cout << str << '\n';
};
foo();

上面这个lambda，str被值捕获（构造了一个拷贝）。编译器将自动生成这样的仿函数：
代码2-6 编译器可能生成的仿函数，单变量
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

如上述的展开代码，一个变量被传进构造函数中，在lambda声明中被称为“就地”。
更准确的定义在[expr.prim.lambda#21]：
当解析lambda表达式时，通过值捕获的实体将直接初始化在每个对应生成的闭包对象中的非静态成员数据


当然了，上述代码中的构造函数（__unnamedLambda）仅仅是用作演示和解释用途，编译器真正生成的内容会与此有所差别，并且不会暴露给用户。
代码2-7 引用捕获两个变量
int = 1, y = 1;
std::cout << x << " " << y << std::endl;
const auto foo = [&x, &y]() noexcept {
    ++x;
    ++y;
};
foo();
std::cout << x << " " << y << std::endl;

上述代码展开后，可能是：
代码2-8 编译器可能生成的仿函数，双变量，引用
    class __unnamedLambda {
    public:
        inline /*constexpr */ void operator()() const noexcept {
            ++x;
            ++y;
        }

    private:
        int& x;
        int& y;

    public:
        __unnamedLambda(int& _x, int& _y) : x{_x}, y{_y} {}
    };

由于我们是通过引用的方式捕获x和y的，所以闭包类型中的成员变量也是引用类型的。
请注意，值捕获变量的值是在lambda定义时，而不是在使用时。但是引用捕获变量的内容是在lambda使用时，而不是定义时。二者是有区别的。

虽然指定[=]或者[&]可能很方便，因为它会自动捕获仍在生命周期内的全部变量，但是，若能指明捕获的变量是哪些，将会更加清晰明确。这样编译器才能警告出哪些非预期的影响（参见 全局变量 和 静态变量）。

当然，如果你想要了解更多更详细的内容，可以翻阅Scott Meyers所著的《Effective Modern C++》第31项——“避免默认捕获模式”的内容。
请注意，C++闭包不会延长被捕获引用对象的剩余生命周期。请务必确保捕获对象在lambda调用时仍然“存活”。

mutable关键字
通过闭包类型默认调用操作符获取的，都是带有const关键字限定的，你无法在lambda表达式内部对他们做出任何修改。

如果你希望进行修改的操作，那就需要在参数列表后添加mutable关键字。它可以有效的去除闭包类型调用操作符中的const修饰符。举一个mutable的简单例子：
int x =1;
auto foo =[x]() mutable { ++x; };

它会被展开为：
class __lambda_x1 {
public:
    void operator()() {
        ++x;
    }
    
private:
    int x;
};

如你所见，现在调用操作符就可以修改捕获的成员变量了。
代码2-8 通过值捕获两个mutable变量
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

输出：
in main(): 1 1
in foo(): 2 2
in main(): 1 1

在上述的例子中，我们可以修改x和y的值。但是，由于是从封闭区域中获取的拷贝值，所以在调用foo之后，我们无法获取到在局部区域修改的新值。

另一方面，如果使用引用捕获，那么就不需要使用mutable修饰符来修改值了。这是因为捕获的成员变量是“引用”过来的，并且不能和内部的const成员函数所绑定，所以可以对它的内容作出修改。
代码2-9 通过引用捕获一个变量
int x = 1;
std::cout << x << '\n';

const auto foo = [&x]() noexcept {
    ++x;
};

foo();
std::cout << x << '\n';

这个例子中，lambda并没有应用mutable修饰符，但是我们可以修改引用的值。

需要注意的一点：当使用mutable修饰符后，就无法使用const修饰符来修饰闭包对象了，因为它会阻止你调用这个lambda。
int x =10;
const auto lam =[x]() mutable { ++x; }
lam(); // 无法编译

由于无法在const对象中调用非const成员函数，最后一行将提示编译失败。
调用计数器 - 捕获变量的一个例子
在我们深入探究捕获之前，先来看看一个有关lambda使用的例子：

当你想使用一些现存的STL中的算法函数并改变默认行为规则时，用lambda表达式是十分方便的。比如，对于std::sort函数，你可以写一个自定义的比较函数。

当然，我们也可以进一步强化比较函数的功能：调用计数。
代码2-10 调用计数器
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

自定义的比较器和默认比较器是一致的，返回二者较小的那一个，即自然排序（升序排列）。同时，lambda也向std::sort传入了捕获的本地变量compCounter来计数调用了在排序过程中多少次的比较器。
捕获全局变量
如果有一个全局变量，并且在lambda使用了[=]，也许你会认为这样就可以值捕获全局变量了，很遗憾，事实并非如此：
代码2-11 捕获全局变量
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

这个例子定义了全局变量global并且将它使用在多个lambda表达式中，但是如果你运行这个程序会发现，无论通过何种方式捕获全局变量，都会发现它永远指向的是那个全局对象，而不会创建任何一个本地的拷贝对象出来。

这是因为，只有在自动存储期间的变量会被捕获。GCC甚至会对此提出警告：
warning: capture of variable 'global' with non-automatic storage duration.

这个警告只会在显式捕获一个全局变量时出现，即便你用[=]，编译器也无法帮你消除这个错误。
在Clang中甚至会直接提示错误：
error: 'global' cannot be captured because it does not have
        automatic storage duration

捕获静态变量
和捕获全局变量类似，在捕获静态变量的时候也会遇到类似的问题。
代码2-12 捕获静态变量
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

这一次，我们尝试捕获静态变量并修改它的值，但是由于它没有自动存储时间，编译器并不会允许你这么做。（GCC会提示警告，而Clang会直接报错）

输出：
10
11
12
13

捕获类成员和this指针
当你想在一个类的成员函数中尝试捕获一个成员变量，那么事情就会稍微变得有点复杂。由于所有的数据成员都是和this指针关联起来的，当然了，这玩意必须被存储在某个地方。
代码2-13 捕获成员变量时的错误
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

这段代码尝试去捕获一个成员变量，但是编译器并不同意，这会导致编译器编译错误：
In member function 'void Baz::foo()':
error: capture of non-variable 'Baz::s'
error: 'this' was not captured for this lambda function

为解决此问题，需要捕获this指针。这样就能访问到成员变量了。

而上面的代码也可以这样修改：
struct Baz {
    void foo() {
        const auto lam = [this]() {
            std::cout << s;
        };
        lam();
    }
    std::string s;
};

这样就不会有编译错误了。

当然了，你也可以使用[=]或者[&]来捕获this指针，在C++11/14中他们的效果是一样的。

但是，请注意，值捕获this也是捕获指针，这就是为什么你能访问成员变量的原因。

在C++11/14中，你不能够这样写：
const auto lam = [*this]() {
    std::cout << s;
};

但是它在C++17中是允许的。

如果你在单一方法的上下文中使用捕获this，这挺好的。但是稍微复杂的场景下使用捕获this呢？
代码2-14 从方法中返回Lambda
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

代码中声明了Baz这个对象，并且调用了foo()。请注意，foo()返回了一个从类中捕获成员的lambda（存储在std::function中）。
std::function 在 C++11 中是必需的，因为常规函数没有返回类型推导。 但是C++14支持函数返回类型的推导。

由于我们使用的是临时对象，我们不能保证当我们调用f1和f2时会发生什么。这是一个悬空引用的问题，并且是未定义行为（Undefined Behaviour）。

这种行为类似于下面这段代码：
struct Bar {
    std::string const& foo() const {
        return s;
    };
    std::string s;
};
auto&& f1 = Bar{"abc"}.foo();  // 一个悬空引用

当然，如果你显式捕获，也是一样的。
std::function<void()> foo() {
    return [s] {
        std::cout << s << std::endl;
    };
}

总而言之，当 lambda生命周期比对象更长时，捕获 this 可能会变得棘手。 当您使用异步调用或多线程时，可能会发生这种情况。

在C++17章节中，我们会重新详细讨论这个话题
只能移动的对象
假如，现在有一个“仅可移动”的对象（像unique_ptr），那么你就无法将它作为捕获对象移动到lambda中。值捕获将不起作用，只能进行引用捕获。

std::unique_ptr<int> p(new int{10});
auto foo = [p]() {};       // does not compile....
auto foo_ref = [&p]() {};  // compiles, but the ownership is not passed

上述例子中，你会发现捕获unique_ptr的唯一方式是引用捕获，但是这种方式并不是最好的方式，因为它并没有将unique_ptr的所属权进行转移。

在下一章C++14中，由于初始化捕获的引入，这个问题会被修复。你可以在初始化捕获直接查阅内容。
保留常量
如果捕获一个const修饰的变量，那么它的常量性将会被保留。
代码2-15 保留常量的const特性
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

这段代码将不会被编译器通过，因为捕获的对象是一个常量，即便使用mutable来修饰也无济于事。
捕获参数包
为了结束我们对“捕获”的讨论，在最后我们来聊聊使用可变参数模板来进行捕获。编译器会将参数包扩展为非静态数据成员列表，如果您想在模板化代码中使用 lambda，这会十分方便。 代码示例：
代码2-16 捕获可变参数包
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

运行这段代码，结果为：
tuple size: 4
tuple 1st:  1
tuple size: 2
tuple 1st:  Hello world

在这里展示了使用可变长参数包进行值捕获（引用捕获同理），捕获的对象“存储”在一个tuple对象中，可以使用一些辅助函数来访问tuple中的数据和属性。

当然了，你也可以使用C++ Insight来观察编译器是如果生成这个代码并且展开模板、参数包和lambda的。
C++14让捕获仅可移动类型成为可能 ，并且C++20中增强了对可变参数包的支持。

## 5. 返回类型
在多数情况下，您可以跳过 lambda 的返回类型，让编译器为您推导类型。

最初，返回类型的推导仅限于函数体内仅包含单个 return 语句的 lambda。 但是，由于C++标准实现了一个更便捷的版本，因此这限制很快就取消了。

相关内容可以参考：C++ Standard Core Language Defect Reports and Accepted Issues, Revision 104

总结一下，从 C++11 开始，只要所有的 return 语句都是相同的类型，编译器就能够推断出返回类型。
如果所有的return语句都返回了一个表达式，并且返回表达式的类型都经过了一个从左值到右值的转换（7.1[conv.lavl]）或者从数组到指针的转换（7.2[conv.array]）或者从函数到指针的转换（7.3[conv.func]），那么他们的类型都是一样的，就是普通类型。

代码2-17 返回类型推导
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

上面的例子中，有两个返回语句，但是他们都指向double类型，所以编译器能够推断出最终的类型。
在C++14中，推导常规函数时，lambda的类型会自动更新以适应auto类型的规则。

尾部返回类型语法
如果你想显式的凸显返回类型，那么可以使用尾部返回类型的语法。举个例子：
代码2-18 lambda返回字符串序列
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

当然，这段代码是无法编译的，因为编译器自动推断的类型结果是const char*，作为lambda的返回类型，+=操作符无法应用于const char*类型，所以编译器阻止了这种行为。

当然，我们稍微修改一下，上述代码就可以正常工作了。
const auto testSpeedString = [](int speed) -> std::string {
    if (speed > 100)
        return "you're a super fast";
    return "you're a regular";
};
auto str = testSpeedString(100);
str += " driver";

我们只是将 noexcept 移除，并更换为了 std::string 。当然，你也可以使用命名空间  std::string_literals 然后返回 std::string 类型的 “you're a regular”。
## 6. 转化为函数指针
当你的lambda表达式没有捕获到任何变量时，编译器就会将其转换为一个常规函数指针。可以查看标准草案中[expr.prim.lambda#6]的定义：
没有捕获的 lambda 表达式的闭包类型具有公共非虚拟、非显式的 const 转换函数，指向与闭包类型的函数调用运算符具有相同参数和返回类型的函数的指针。 此转换函数返回的值应为函数的地址，该函数在调用时与调用闭包类型的函数调用运算符具有相同的效果。

为了阐明 lambda是 如何支持这种转换，让我们考虑以下示例。 它定义了一个明确定义转换运算符的仿函数baz：
代码2-19 转化函数指针
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

在这个程序中，有一个 callWith10 函数，它接受一个函数指针。 然后我们用两个参数调用它（第 23 行和第 24 行）：第一个使用 baz，它是一个包含必要转换运算符的仿函数 - 它转换为 f_ptr，与 callWith10 的输入参数相同。第二个使用 lambda 。 在这种情况下，编译器将执行所需的转换。

当您需要调用需要回调的 C 风格的函数时，这种转换可能会很方便。 例如，下面的代码是从C标准库中调用 qsort 函数，同时使用lambda来进行反向排序。
代码2-20 调用C风格函数
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

正如您在代码示例中看到的那样，使用 std::qsort 仅将函数指针作为比较器。 编译器可以对我们传递的无状态 lambda 进行隐式转换。
一个有趣的例子
在讨论别的内容之前，这儿有一个可能十分有趣的例子，我们可以一起来研究下：
代码2-21 加号和lambda表达式
#include <type_traits>

int main() {
    auto funcPtr = +[] {};
    static_assert(std::is_same<decltype(funcPtr), void (*)()>::value);
}

注意一下这个“奇怪”的“+”运算符的语法，如果你去掉这个加号，那整个static_assert就失败了。这是什么神奇的原因？

要理解其中的工作原理，我们得先看看C++生成的代码是什么样的：
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

代码中的“+”是一个一元运算符，且可以运用在指针上。因此编译器将无状态的lambda转换成了函数指针，再分配给funcPtr。另一方面，如果删除了“+”号，那么funcPtr就仅仅是一个单纯的闭包对象，所以在static_assert时会失败。

虽然用“+”这样的语法可能不是一个最好的方式，但是你可以用static_cast来替代，可以实现和+一样的效果。 当您不希望编译器创建太多函数实例时，您可以应用此技术。 例如：
代码2-22 强制转换为函数调用
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

在上面的例子中，编译器只需要创建一个 call_function 实例，因为它只需要一个函数指针 int (*)(int)。 但是如果你删除 static_casts 那么你将得到两个版本的 call_function 因为编译器必须为 lambdas 创建两个单独的类型。
## 7. IIFE - 立即调用函数表达式
在多数例子中，你可能发现了，我经常都是先定义好Lambda，在之后才去调用它。

然而，你也可以直接立即调用一个lambda：
代码2-23 “现写现用”lambda
#include <iostream>

int main() {
    int x = 1, y = 1;

    [&]() noexcept {
        ++x;
        ++y;
    }();  // <-- call ()

    std::cout << x << ", " << y;
}

上面这个例子，lambda在被创建之后没有赋给任何一个闭包对象，而是直接被调用（通过“()”操作符）。如果你运行上述程序，期望结果应该是输出了：
2, 2

在遇到复杂的常量对象的初始化时，这种表达式将十分地有用：
const auto val =[]() {
    /* several lines of code... */
}(); // call it!

其中，val是一个常量（constant value），并且其类型为lambda表达式的返回类型：
// val1 is int
const auto val1 =[]() { return 10; }();
// val2 is std::string
const auto val2 =[]() ->std::string { return "ABC"; }();

下面我们来看一个较长的用例，在函数内部使用IIFE形式来构造一个辅助lambda函数，去创建一个常量。
代码2-24 IIFE 和 HTML生成器
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

这个用例中，函数 BuildAHref()，它接受两个参数，然后构建一个 <a> </a>HTML 标签。 根据输入参数，我们构建 html 变量。 如果文本不为空，则我们将其用作内部 HTML 值。 否则，我们使用默认链接。 我们希望 html 变量是常量，但很难编写具有输入参数所需条件的紧凑代码。 多亏了 IIFE，我们可以编写单独的 lambda，然后用 const 标记我们的变量。 稍后可以将变量传递给 ValidateHTML。
可读性提示
有些时候，利用现写现用的lambda表达式会造成一些代码可读性上的困扰。

例如：
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

在上面的例子中，lambda 代码相当复杂，阅读代码的开发人员不仅要解密 lambda 是立即调用的，而且还要对 EnableErrorReporting 类型进行推理。 他们可能会假设EnableErrorReporting 是闭包对象而不仅仅是一个常量变量。对于这种情况，您可能会考虑不使用auto，以便我们可以轻松查看类型。 甚至可以在 }() 旁边添加注释，例如 // call it now。
在C++17章节我们会遇到一个“升级版”的IIFE。

## 8. Lambda继承
也许你会有些吃惊，Lambda居然还可以派生？

由于编译器将lambda扩展为了一个仿函数对象，并重载了其调用操作符（“()”），所以我们可以从这点去继承lambda。

来看看一个基础代码：
代码2-25 从单个lambda中继承
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

这段代码中，有一个 ComplexFunctor 类，它派生自 Callable，它是一个模板参数。 如果我们想从 lambda 派生，我们需要做一个小技巧，因为我们无法拼出闭包类型的确切类型（除非我们将它包装到 std::function 中）。 这就是为什么我们需要可以执行模板参数推导并获取 lambda 闭包类型的 MakeComplexFunctor 函数。

除了名称之外，ComplexFunctor 只是一个简单的包装器，没有多大用处。 是否有此类代码模式的用例。

例如，我们可以扩展上面的代码并继承两个 lambdas 并创建一个重载集：
代码2-25 从两个lambda中继承
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

这次我们有更多的代码：我们从两个模板参数派生，但我们还需要显式地公开它们的调用运算符。

这是为什么呢？ 这是因为在寻找正确的函数重载时，编译器要求候选对象在同一范围内。

为了理解这一点，让我们编写一个派生自两个基类的简单类型。 该示例还注释掉了两个 using 语句
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

我们有两个实现 Func 的基类。 我们想从派生对象调用这个Func方法。
GCC编译便会报出错误：
error:request formember 'Func' is ambiguous

因为我们注释掉了全部的声明来自BaseInt和BaseDouble的::Func的using语句。 编译器有两个作用域来搜索最佳候选，根据标准，这是不允许的。

好吧，让我们回到我们的更上面那个例子：SimpleOverloaded 是一个基本类，它不是生产就绪的。

看看 C+ +17 章，我们将讨论此模式的高级版本。 

多亏了 C++17 的几个特性，我们将能够从多个 Lambda 继承（感谢可变参数模板）并利用更多的紧凑语法！
## 9. 在容器中存储lambda
作为本章的最后一个技巧，让我们来看看在容器中存储闭包的问题。

但是我不是写过不能默认创建和分配 lambdas 吗？

是的……但是我们可以在这里做一些技巧。 

技术之一是利用转换为函数指针的无状态 lambda 的属性。 虽然您不能直接存储闭包对象，但您可以保存从 lambda 表达式转换而来的函数指针。

例如：
代码2-26 将Lambda存为函数指针
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

在上面的例子中，我们创建了一个将应用于变量的函数向量。 容器中有三个条目：
- 第一个打印输入参数的值。
- 第二个修改值。
- 第三个是第一个的副本，因此它也打印值。

该解决方案有效，但仅限于无状态 lambda。 如果我们想解除这个限制怎么办？为了解决这个问题，我们可以使用重度助手：std::function。 为了使示例有趣，它还从简单的整数切换到处理 std::string objects 的 lambdas：
代码2-27 将Lambda存为std::function
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

输出：
HELLO AMAZING MODERN C++ WORLD!
removed spaces: 12

这次我们将 std::function<std::string(const std::string&)> 存储在容器中。 这允许我们使用任何类型的函数对象，包括带有捕获变量的 lambda 表达式。 其中一个 lambda removeSpacesCnt捕获一个变量，该变量用于存储有关从输入字符串中删除的空格的信息。
## 10. 总结
在本章中，您学习了如何创建和使用 lambda 表达式。 我描述了 lambda 的语法、捕获子句、类型，并且我们涵盖了许多示例和用例。 我们甚至更进一步，我向您展示了从 lambda 派生或将其存储在容器中的模式。

但这还不是全部！

Lambda 表达式成为现代 C++ 的重要组成部分。 随着应用场景越来越多，开发人员也看到了改进此功能的可能性。 这就是为什么您现在可以转到下一章并查看 ISO 委员会在 C++14 中添加的重要更新的原因。
# 三、Lambda in C++14
C++ 14为lambda表达式提供了两个显著的增强特性
- 带有初始化的捕获
- 泛型lambda
此外，该标准还更新了一些规则，例如：
- lambda表达式的默认参数
- auto返回类型
这些新增特性可以在N4140中的lambda部分[expr.prim.lambda]找到。

在本章中，你将学到：
- 捕获成员变量
- 用现代C++技术代替旧功能，如std::bind1st
- LIFTING
- 递归Lambda
## 1. 为Lambda增加默认参数
让我们从小的变化说起吧：
在C++14中，你可以在lambda调用中使用默认参数了。这一小小的更新让lambda函数更像一个常规函数了。
代码3-1 带有默认参数的Lambda
#include <iostream>

int main() {
    const auto lam = [](int x = 10) {
        std::cout << x << '\n';
    };
    lam();
    lam(100);
}

见用例所示，我们可以调用这个lambda两次：第一次不携带任何参数，结果将输出默认的10，第二次我们传递参数100进去，结果会输出100

不过，这一特性早已在GCC和Clang的C++11版本中被支持了。
## 2. 返回类型
如果你还记得之前章节的内容，那么你一定知道，对于一个简单的lambda，编译器可以推断出它的返回类型。这个功能是在常规函数上“扩展”的，在 C++14 中你可以使用 auto 作为返回类型
auto myFunction() {
    int x =computeX(...);
    int y =computeY(...);
    return x +y;
}

如上，编译器会推断返回类型为int

推断返回类型的这部分内容在C++14中得到了改善和扩展。对于lambda表达式来说，这意味着他们可以和常规函数享有同样的auto返回类型（[expr.prim.lambda]）：
如果lambda 返回类型是 auto，那么它会被尾部返回类型所替代（如果提供了）或者从return语句中推导。详见[dcl.spec.auto]

如果在lambda中有多条返回语句，他们必须能够推断出同样的类型：
auto foo = [](int x){
    if (x < 0) 
        return x * 1.1f
    else 
        return x * 2.1
}

这段代码就无法成功编译了，因为第一条返回语句返回float类型但第二条返回double类型。编译器无法决定出到底应该将返回类型定为哪个，所以您必须选择其中一个，保证返回类型的唯一性。

尽管推断整形和双精度型也是很有用的，但是推断返回类型之所以有更显著的价值，是因为它可以在模板代码这种“未知”领域发挥极大地在作用。

举个例子，lambda闭包类型是匿名的，并且我们无法显式的明确它。但是如果你想从函数中返回一个lambda呢？你要如何明明确这个类型？

在C++14之前，你可以用std::function ：
代码3-2 返回std::function
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

然而，上面这种方法并不足够直接。它要求你明确了一个函数签名，甚至包含了额外的头文件<functional>。如果你还记得C++11的内容的话，std::function是一个“笨重”的对象（在GCC9中，function的sizeof是32 bytes）。并且，它需要一些高级的内部机制，以便它可以处理任何可调用的对象。

感谢C++14带来的改进，我们可以极大的简化上面的代码：
代码3-3 Lambda推断的auto返回类型
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

现在我们就可以完全依靠编译时的类型推导，不需要其他辅助类型。 在 GCC 上，最后lam这个lambda返回对象的大小仅为 4 字节，并且比使用 std::function 的解决方案便宜得多。这里有一点需要注意，我们也可以将 CreateMulLambda 标记为 noexcept ，这样无论如何它都不可以抛出任何异常。 但是std :: function就不行了。
## 3. 带有初始化的捕获
现在我们来讲讲更加具有建设性的更新。

你一定记得，在lambda表达式中，你可以从外部范围中捕获变量。编译器会拓展你的捕获语法并且在闭包类型中创建成员变量（非静态数据成员）。
现在在C++14中，你可以创建一个新的成员变量并且在捕获语句中初始化他们。这样你就可以在lambda内部访问那些变量了。这叫做 通过初始化器捕获  或者你也可以用另一个名字 广义lambda捕获 。

看个简单的例子：
代码3-4 通过初始化器捕获
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

输出为
42

在这个例子中，编译会生成一个新的成员变量并且将其初始化为x + y。这个新变量的类型会被自动推断出来，即便你在变量前加上了auto关键字：
auto z = x + y

总之，前面示例中的 lambda 会被解析为以下（简化的）仿函数：
struct _unnamedLambda {
    void operator()() const{
        std::cout << z << '\n';
    }
    
    int z;
} someInstance;

当lambda的表达式定义完成时，z 将会被直接初始化 x + y 。

上面这句的含义就是：新变量在你定义 lambda 的地方初始化，而不是你调用它的地方。 这就是为什么如果你在创建 lambda 后修改 x 或者 y 变量，变量 z 的值不会改变。 在示例中，你可以看到在定义 lambda 之后，我立即更改了 x 和 y 的值。 然而，输出仍将是 42，因为 z 在这之前就已经被初始化。

当然，通过初始化器创建变量也可以是灵活的，不妨看看下面这个例子：创建一个外部范围的引用变量。
代码3-5 通过初始化器进行引用捕获
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

这次，变量 z 是引用自变量 x ，当然你也可以写成这样 auto & z = x 。
如果运行这段代码，你应该可以看到，第一行会输出30，但是第二行会输出0。这是因为我们进行了一个引用捕获，当你修改了引用内容时，对象 z 自然也会随之变化。
限制
需要注意，在使用初始化器捕获时，有一些限制：
一个是，当你通过初始化器进行引用捕获时，她不可能写入一个右值引用 && 。这是因为如下的代码目前是非法的：
[&& z = x] //非法语法

另一个该特性的限制是，它不允许传入参数包。在条款[expr.prim.lambda]的24节可以阅读到如下内容：
带有省略号的简单捕获是包扩展（[temp.variadic]）， 但是init-capture 带有省略号是格式错误。

简而言之，在C++14中，你并不能这样写代码：
template < class.. Args >
auto captureTest(Args... args) {
    return lambda = [...capturedArgs = std::move(args)](){};
    ...

但是，这个语法，在C++20中是支持的，如果想提前了解，可以参考这个。
对现有问题的改进
总而言之，这个新的 C++14 特性可以解决一些问题，例如 仅可移动类型 或 允许一些额外的优化。

Move移动
在C++11中，你无法通过值捕获的方式捕获一个唯一指针（unique_pointer），只能进行引用捕获。但是现在在C++14中，我们可以移动一个对象到闭包类型的成员中：
代码3-6 捕获一个仅可移动类型
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

输出：
pointer in main(): 0
pointer in lambda: 0x1413c20

有了捕获初始化器，你就可以移动一个指针的所有权到lambda中。如你所见，在上面这个例子中，唯一指针在闭包对象被创建后立即被设为了 nullptr 。但是当你调用这个lambda时，你会看见一个合法的内存地址。

std::function中的陷阱
在lambda中拥有一个仅可移动的捕获变量会让闭包对象变得不能被拷贝。当你想在std::function中存储一个lambda，而这个lambda接受仅可拷贝的可调用对象的时候，就会出现问题。

我们在C++ Insights上观察一下之前的一个例子（在线预览），你会发现std::unique_ptr是一个闭包类型的成员变量。但是，拥有一个仅可移动的成员会阻止编译器创建一个默认拷贝构造的。

简而言之，这段代码无法编译：
代码3-7 std::function和std::move
std::unique_ptr<int> p(new int{10});
std::function<void()> fn = [ptr = std::move(p)](){}; //不可编译

如果您想要完整的细节，您还可以查看草案(P0288)中的any_invokable ，这是 std::function 未来可能的改进，并且还会处理仅可移动类型。


优化Optimisation
有一个将捕获初始化器作为潜在的性能优化的点子：我们可以在初始化器中计算一次，而不是每次调用 lambda 时都计算某个值：
代码3-8 给lambda创建一个string
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

上面的代码对 std::find_if 调用了两次。 在第一个场景中，我们捕获 prefix 并将输入值与 prefix + "bar"s 进行比较。 每次调用 lambda 时，都必须创建并计算一个临时值来存储这些字符串的总和。

第二次调用 find_if 优化：我们创建了一个捕获的变量 savedString 来计算字符串的总和。 然后，我们可以安全地在 lambda 体中引用它。 字符串的总和只会运行一次，而不是每次调用 lambda 时都会运行。

该示例还使用了 std::string_literals，这就是为什么我们可以编写代表 std::string 对象的 "foo"s。

捕获成员变量
初始化器也被用来捕获成员变量。我们可以捕获一个成员变量的拷贝并且不用担心悬空引用。

看个例子吧：
代码3-9 捕获一个成员变量
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

在 foo() 中我们通过拷贝的方式将成员变量拷贝进了闭包类型中。此外，我们使用auto来进行成员函数foo()返回类型的推断。当然，在C++11中，你也可以使用 std::function ，详见 捕获成员变量和this指针。

在这里我们在lambda中使用了一个很“奇怪”的语法 [ s = s ] ，这段代码能够工作的原因是捕获到的变量是在闭包类型内部的，而非外部。所以这里就没有歧义冲突了。
## 4. 泛型Lambda
这是C++14中有关lambda的最大的更新！

Lambda 的早期规范允许我们创建匿名函数对象并将它们传递给标准库中的各种泛型算法。 然而，闭包本身并不是“泛型”的。 例如，您不能将模板参数指定为 lambda 的参数。

当然，在C++14中，标准引入了 泛型Lambda 现在我们可以这样写：
const auto foo = [](auto x, int y) {
    std::cout << x << ", " << y << '\n';
};

foo(10, 1);
foo(10.1234, 2);
foo("hello world", 3);

注意lambda的参数 auto x ，它等同于在闭包类型中使用一个模板声明：
  struct {
      template < typename T >
      void operator ()(T x, int y) const {
          std::cout << x << ", " << y << '\n';
      }
  } someInstance

当然，当有多个auto参数是，代码将被扩展为多个模板参数：
const auto fooDouble =[](auto x, auto y) { /*...*/};

扩展为：
struct{
    template< typename T, typename U>
    void operator()(T x, U y) const{ /*...*/}
} someOtherInstance;

可变泛型参数
但是这并不是全部，如果你需要更更多的函数参数类型，你可以自己进行可变性改造。

看这个栗子：
代码3-10 用于求和的可变泛型Lambda
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

这段泛型lambda代码中使用了auto ...来代表一个可变长参数包。理论上，它将在调用操作符中被展开为：
struct __anoymousLambda{
    template < typename ... T >
    void operator()(T... args) const {/*...*/}
};

在 C++17 中，我们有了新的选择 折叠表达式 ，它可以改进泛型可变参数 lambdas，而在 C++20 中，我们将获得对模板参数的更多控制。 有关更多信息，请参阅C++17对可变参数泛型 lambdas 的更新以及 C++20 中关于模板 lambda 的信息

使用泛型 lambda 进行完美转发
使用泛型 lambda 表达式，其实并不限定在只使用 auto x，您可以像其他 auto 变量一样添加任何限定符，如 auto&、const auto& 或 auto&&。有一个十分便利的点是，你可以指定 auto&& x 使其成为转发（泛型）引用。 这使您可以完美地转发输入参数：
代码3-11 泛型lambda进行完美转发
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

输出
Calling foo() on: Hello World
foo(const string&)
Calling foo() on: Hello World Ref Ref
foo(string&&)

示例代码定义了两个函数重载 foo 用于对 std::string 的 const 引用，另一个用于对 std::string 的右值引用。 callFoolambda 使用泛型参数作为泛型引用（引用资料6）. 如果您想将此 lambda 重写为常规函数模板，它可能如下所示：
template<typename T>
void callFooFunc(T&& str) {
    std::cout << "Calling foo() on: " << str << '\n';
    foo(std::forward<T>(str));
}

如你所见，在泛型lambda的加持下，在编写本地匿名函数时候，你现在有更多的选择了。

但是，这还不是全部。
减少一些隐蔽的类型纠正
泛型lambda在发现类型推断有问题时，很有帮助。

来看个例子：
代码3-13 对map的迭代器进行类型纠正
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

这段代码有问题吗？entry的类型正确吗？

很明显，这里是有问题的。std::map的类型应该是std::pair<const key, T>而不是const std::pair<Key, T>。而在我们的代码中，会造成不必要的额外拷贝，在std::pair<const std::string, int>和const std::pair<std::string, int>&(其中const std::string 对 std::string 的转换)之间。

修复一下代码，它本应该是这样的：
std::for_each(std::begin(numbers), std::end(numbers), 
    [](const auto& entry) {
        std::cout << entry.first << " = " << entry.second << '\n';
    });

现在模板参数推导将充分获得 entry 对象的正确类型，并且不会创建额外的副本。 而且代码也更加简洁且易读。

接下来我们看看另一段比较长的代码，打印了entry的内存地址：
代码3-14 对map的迭代器进行类型纠正，完整版
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

可能的输出结果：
1 0x165dc40, 0x165dc60
2 0x165dce0, 0x165dd00
3 0x165dc90, 0x165dcb0
4 0x7ffe5ed29a20, 0x7ffe5ed29a40: one = 1
5 0x7ffe5ed29a20, 0x7ffe5ed29a40: three = 3
6 0x7ffe5ed29a20, 0x7ffe5ed29a40: two = 2
7 0x165dc40, 0x165dc60: one = 1
8 0x165dce0, 0x165dd00: three = 3
9 0x165dc90, 0x165dcb0: two = 2

前三行输出了 map 的key和value的内存地址。第4、5、6行分别展示了在循环迭代中临时拷贝出来的内存值。最后三行则是使用const auto&的版本，很明显可以看出来，和前三行使用自身迭代的内容是一样的。

在所举的例子中，我们关注拷贝产生的key的额外副本，但重要的是要了解entry也被复制了。 当使用像 int 这样的“廉价”的复制类型时，这也许不是什么问题，但如果对象像字符串一样更大，那么就会产生很大的拷贝开销和性能损耗。
在 C++20 中，开发者可以更好地控制 lambda 的模板参数，因为 C++20 的新修订引入了模板 lambda、概念和受约束的auto参数。

## 5. 使用Lambda代替std::bind1st和std::bind2nd
在C++98/03章节，我提到并展示了一些辅助函数，像 std::bind1st 和 std::bind2nd 之类。然而，这些函数在C++11中逐渐废弃，在C++17中，这些函数已被完全移除。

像 bind1st()/ bind2nd() /mem_fun()等函数，都是在C++98时期被引入进标注库的，而现在这些函数已不再需要了，因为我们可以使用lambda或者更现代化的C++技巧来代替。当然了，这些函数也没有获得对于完美转发、泛型模板、decltype以及其他C++11特性的更新，所以，我建议不要在现代编程中使用这些已弃用的内容。

下面是已被废弃的函数列表：
- unary_function()/pointer_to_unary_function()
- binary_function()/pointer_to_binary_function()
- bind1st()/binder1st
- bind2nd()/binder2nd
- ptr_fun()
- mem_fun()
- mem_fun_ref()
当然，仅仅是为了替换bind1st或者bind2nd的话，你可以使用std::bind(C++11引入)或者std::bind_front(C++20引入)。

考虑下，这些我们之前使用旧函数所编写的这些代码要如何修改：
const auto onePlus =std::bind1st(std::plus<int>(), 1);
const auto minusOne =std::bind2nd(std::minus<int>(), 1);
std::cout << onePlus(10) << ", " << minusOne(10) << '\n';

这个例子中，onePlus是由std::plus组成的一个可调用对象，并且第一参数被调用修正。换种说法，当你写下onePlus(n)的时候，它会被展开为std::plus(1, n)。

类似地，minusOne是由std::minus组成的一个可调用对象，并且第二参数被调用修正。miniusOne(n)会被展开为std::minus(n, 1)。

上面的语法可能会十分的麻烦，我们下面来看看如何用现代化C++技术来优化他们。
使用现代C++技术
我们首先用std::bind()来替换bind1st和bind2nd
代码3-15 用std::bind来代替
#include <algorithm>
#include <functional>
#include <iostream>

int main() {
    using std::placeholders::_1;
    const auto onePlus = std::bind(std::plus<int>(), _1, 1);
    const auto minusOne = std::bind(std::minus<int>(), 1, _1);
    std::cout << onePlus(10) << ", " << minusOne(10) << '\n';
}

std::bind 会更加灵活，它支持多个参数，甚至你可以对参数重新排序。在参数管理上，你需要使用 占位符placeholders 。上面的例子中，使用了_1 来代表第一个参数需要被传入最终的函数对象中的未知。

虽然std::bind比起C++98/03中的辅助函数好用多了，但是它仍然不如lambda使用起来自然和便捷。

我们来尝试写一下上面例子中对应的lambda表达式：
auto lamOnePlus1 =[](int b) { return 1 + b; };
auto lamMinusOne1 =[](int b) { return b - 1; };
std::cout << lamOnePlus1(10) << ", " << lamMinusOne1(10) << '\n';

当然，在C++14中我们也可以用初始化器来进一步优化lambda，让lambda更加灵活：
 
auto lamOnePlus1 =[a = 1](int b) { return a + b; };
auto lamMinusOne1 =[a = 1](int b) { return b - a; };
std::cout << lamOnePlus1(10) << ", " << lamMinusOne1(10) << '\n';

很显然，lambda 版本更简洁，更易读。 这一点将在后面更复杂的示例中更加凸显出来。
函数组合
最后一个例子，我们来看看这个，在表达式中嵌套使用函数组合：
代码3-16 std::bind中使用函数组合
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

你能快速解读出来这段代码的工作逻辑嘛？

不论是否读懂了，这段代码都可以重新书写为更简洁和可读的版本：
std::vector<int>v { 1, 2, 3, 4, 5, 6, 7, 8, 9};
const auto more2less6 = std::count_if(v.begin(), v.end(),                                     [](int x) { return x > 2 && x < 6;});

现在应该好懂多了？
有一些关于std::bind和lambda的第三方指导性意见：比如《Effective Modern C++》中的第34条款，比如 Google Abseil Blog中的Avoid std::bind

## 6. Lambda提升（LIFTing with Lambda）
尽管标准库中提供的常用算法已经很方便的，但是仍然有一些情况不太好解决。比如，向模板函数中传递有重载的函数作为可调用对象。
代码3-17 调用重载函数
#include <algorithm>
#include <vector>
// two overloads:
void foo(int) {}
void foo(float) {}
int main() {
    const std::vector<int> vi{1, 2, 3, 4, 5, 6, 7, 8, 9};
    std::for_each(vi.begin(), vi.end(), foo);
}

这个例子里面 foo 分别有对于 int 和 float 的两个重载，并且作为可调用对象传递给了模板函数 for_each 。遗憾的是，在GCC9中，编译会提示如下错误：
error: no matching function for call to
for_each(std::vector<int>::iterator, std::vector<int>::iterator, 
 <unresolved overloaded function type>)
    std::for_each(vi.begin(), vi.end(), foo);
                                       ^^^^^

这里出错的主要原因是，foo作为一个模板参数，它需要重新被确定为一个确定的类型。但是foo本身又有两个重载，并且实际上数据可以同时被两个重载都接受，这是编译器所不能接受的。

但是，这里有个技巧就是，我们可以使用lambda来代替重载的可调用对象。上面的代码即可修改为：
std::for_each(vi.begin(), vi.end(), [](auto x) { return foo(x); });

现在我们也可以用包装器（泛型lambda）来解决重载的问题，让调用时可以找到适当的重载对象。

当然，我们也可以使用完美转发来更加巧妙的规避掉重载的情况。
std::for_each(vi.begin(), vi.end(), [](auto &&x) {
    return foo(std::forward<decltype(x)>(x); 
});

下面是一个应用的例子：
代码3-18 泛型Lambda和函数重载
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

但是，对于更高级或者更复杂的场景，这可能不是首选解决方案，因为我们没有严格遵守可变参数和异常规范。

如果需要一个更加泛型、或者更好的解决办法。那可能需要多写一些代码了：
#define LIFT(foo)                                                                                               \
    [](auto&&... x) noexcept(                                                                                   \
            noexcept(foo(std::forward<decltype(x)>(x)...))) -> decltype(foo(std::forward<decltype(x)>(x)...)) { \
        return foo(std::forward<decltype(x)>(x)...);                                                            \
    }

看着有点懵？别急，我们来一点点解析这段代码的功能。
- 返回 foo(std::forward<decltype(x)>(x)...) 
  - 完美转发，这样我们才能完整传递输入参数到foo函数中，并且保留类型。
- noexcept(noexcept(foo(std::forward<decltype(x)>(x)...)))
  - 使用noexcept操作符（被嵌套的那一个）检查 可调用对象 foo 的异常规范。依赖于异常的检查结果，最终会产生 noexcept(true) 或者 noexcept(false) 。
- decltype(foo(std::forward<decltype(x)>(x)...))
  - 推断包装lambda的最终返回类型

Lambda提升（LIFT）通过宏定义的方式实现，不然每次需要使用提升的时候你都需要编写类似的代码，并将其传递给一个算法中。而使用宏定义，这是一种最简单的语法实现了。

有兴趣的话，可以看看使用lambda提升后的最终代码。
## 7. 递归Lambda
如果你有一个常规函数，那么递归调用这函数十分容易的。比如，我们计算阶乘时候的递归函数应该是这样的：
代码3-19 常规函数的递归调用
int factorial(int n) {
    return n > 1 ? n * factorial(n - 1) : 1;
}

int main() {
    return factorial(5);
}

我们来尝试用lambda的方式进行递归：
代码3-20 Lambda递归的错误示例
int main() {
    auto factorial = [](int n) {
        return n > 1 ? n * factorial(n - 1) : 1;
    };
    return factorial(5);
}

这段代码不会编译成功，在GCC中会提示编译错误：
error:use of 'factorial'before deduction of 'auto'

由于我们无法在lambda函数体内访问 factorial 本身，因为他还尚未被编译器完全识别出来。我们深入一下，先将这段代码展开为一个简单的仿函数：
struct fact {
    int operator()(int n) const {
        return n > 1 ? n * factorial(n - 1) : 1;
    };
};
auto factorial = fact{};

这样就清晰很多了，因为在调用操作符 () 中，我们压根无法访问到仿函数类型。
如果我们要实现递归，那么这里有两个途径可以考虑下：
- 使用 std::function 并且捕获它
- 使用内部lambda然后传递泛型参数
利用std::function
将lambda表达式赋值给一个std::function，后续捕获该这个对象到lambda函数体内，实现递归。
代码3-21 使用 std::function 实现lambda递归
#include <functional>
int main() {
    const std::function<int(int)> factorial = [&factorial](int n) {
        return n > 1 ? n * factorial(n - 1) : 1;
    };
    return factorial(5);
}

这个示例里面，我们在lambda函数体内调用捕获的 std::function 对象factorial 。此时这个对象是完整定义的，所以编译器访问并调用对象就不存在问题了。

如果你想使用一个无状态的lambda，那么你甚至可以使用一个函数指针来代替 std::function ，这样内存占用会更少。

但是，但是，下面这种方式会更好。
内部Lambda和泛型参数
来看看C++14中的用法：
代码3-22 使用内部lambda来实现lambda递归
int main() {
    const auto factorial = [](int n) noexcept {
        const auto f_impl = [](int n, const auto &impl) noexcept -> int {
            return n > 1 ? n * impl(n - 1, impl) : 1;
        };
        return f_impl(n, f_impl);
    };
    return factorial(5);
}

这次我们创建了一个内部 lambda （f_impl）来执行主逻辑。 同时，我们向它传递一个泛型参数const auto& impl ， 这个参数是一个我们可以递归调用的可调用对象。 多亏了 C++14 中的泛型lambda，我们可以避免 std::function 的开销并依赖 auto 进行类型推导。
更多技巧
可以参阅下面两个链接来学习更多关于lambda递归的技巧：
- Recursive lambda functions in C++11
- Recursive lambdas in C++(14) - Pedro Melendez
使用递归lambda是最好的选择吗？
在本节中，我们学到了一些有关 lambda 表达式的技巧。尽管如此，这些技巧实现起来的复杂性远远高于仅使用常规递归函数调用的简单解决方案。 这就是为什么在某些情况下递归 lambda 不是最好和最直接的选择。

另一方面，复杂递归 lambda 的优点是它的局部性和采用 auto 参数的能力。
## 8. 总结
在本章，C++14为lambda表达式带来了几个关键性的改进。由于C++14可以在lambda范围内声明新的变量，开发者可以在模板代码中更高效的使用lambda。

在下一章中，我们会移步C++17，来看看更多的lambda更新。
# 四、Lambda in C++17
C++17 为 lambda 表达式添加了两个重要的增强特性：
- constexpr lambdas
- *this 的捕获

新的 C++ 修订版更新了其类型系统，现在包含了关于 lambda 表达式的异常规范。
你可以在 N659 中的 [expr.prim.lambda] 章节查阅标准规范中 Lambda 相关的内容。

在本章中，我们将重点关注以下内容：
- 在 C++17 中如何提升 立即调用函数表达式（IIFE pattern）
- 在 C++17 中如何提升 带有折叠表达式的可变泛型 Lambda（Vriadic Generic Lambdas with Fold Expressions）
- 从多个 Lambda 派生
- Lambda 和异步编程

## 1. Lambda 语法更新
在 C++17，有一些关于 Lamdba 表达式的改变：
- 你可以在参数列表之后加上 constexpr 关键字
- 动态异常规范在 C++11 中被弃用，在 C++17 中被移除，所以你应该使用 noexcept
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


你可以在下一节中了解到更多的变更。

## 2. 类型系统中的异常规范
在我们了解关于 lambda 的语法改进之前，我们需要引入一个 C++17 的通用语言特性。

函数的异常规范过去不属于函数类型的一部分，但是在 C++17 中被纳入其中，这意味着你可以有两种函数类型，一种有 noexcept，另一种没有。

代码 4-1 类型系统中的异常规范
using TNoexceptVoidFunc = void (*)() noexcept;
void SimpleNoexceptCall(TNoexceptVoidFunc f) { f(); }

using TVoidFunc = void (*)();
void SimpleCall(TVoidFunc f) { f(); }

void fNoexcept() noexcept { }
void fRegular() { }

int main() {
    SimpleNoexceptCall(fNoexcept);
    SimpleNoexceptCall([]() noexcept { });
    // SimpleNoexceptCall(fRegular);   // cannot convert
    // SimpleNoexceptCall([]() { });  // cannot convert
    
    SimpleCall(fNoexcept); // converts to regular function
    SimpleCall(fRegular);
    SimpleCall([]() noexcept { });  // converts
    SimpleCall([]() { });   
}


一个指向 noexcept 函数（常规函数、成员函数、Lambda 函数）的指针可以被转化成指向不带 noexcept 函数（与转换前对应的函数类型）的指针。
但是反过来是不行的。

其中一个原因是代码优化。
如果编译器能够确保函数不会抛出异常，那么它就有可能生成更快的代码。
在标准库中，有很多地方会基于 noexcept 判断代码能够变得更高效，这也是 std::vector 内部进行元素移动时是否会抛出异常的判断机制。

下面是一个栗子
代码 4-2 使用 type traits 判断可调用对象是否标记为了 noexcept
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

输出如下：
Calling fn(10) with optimisation
Calling fn(10) normally
lamEx with x = 20

上述代码使用 std::is_nothrow_invocable_v 去检查传入的可调用对象是否具有 noexcept 标记。

动态异常规范在 C++11 中被弃用，在 C++17 中被删除，只能使用 noexcept 关键字去声明一个不会抛出异常的函数。

Question：如果在一个具有 noexcept 声明的函数中抛出异常，会发生什么？
Answer：编译期会调用 std::terminate。 

## 3. constexpr Lambda 表达式
从 C++11 开始，constexpr 关键字能够在编译期评估越来越多的代码。这不仅会影响到程序的性能，也让编译期的编码变得更加愉快和有力。
在 C++17，constexpr 能够被用于 lambda 表达式，可以看一下规范 expr.prim.lambda #4 ：
如果函数是声明中带有 constexpr 或者 lambda 表达式的参数声明子句后跟 constexpr，那么这是一个 constexpr 函数。

换句话说，如果 lambda 表达式遵循 constexpr 函数的规则，那么 lambda 表达式对应的 operator() 函数被隐式定义为 constexpr，在 C++17 中，constexpr 函数需要满足以下规则 n4659/dcl.constexpr#3 ：
不是一个虚函数
返回类型是 literal type（可以在编译期计算的变量）
所有参数都是 literal type
其函数体应为 = delete, = default 或者是一个不包含以下语句的复合语句：
an asm-definition
a goto statement
an identifier label
try block
a definition of a variable of non-literal type or of static or thread storage duration or for which no initialisation is performed


举个栗子：
constexpr auto Square =[](int n) { return n * n; }; // implicit constexpr
static_assert(Square(2) == 4);


由于 Square 函数体非常简单并且它没有违反 constexpr 所需的相关规则，所以它被隐式声明为 constexpr 并且我们可以使用 static_assert 在编译期调用它 。

用例
有没有更实用的代码例子？
我们先实现一个常用的累加算法：
代码 4-3 简单的累加
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


该代码在将 lamdba 函数传递给 SimpleAccumulate 时，虽然没有显示声明 constexpr，但是编译器会发现这个 lamdba 函数被一个 constexpr 函数调用了，并且该 lamdba 函数体只包含简单的语句，符合成为 constexpr lamdba 的条件，所以不会报错。
并且这一过程同样适用于 SimpleAccumulate 中调用到的 std::array，std::begin，std::end 。
所以 SimpleAccumulate 函数可能会运行在编译期。

另外一个例子是使用了递归的 Lamdba：
代码 4-4 递归的 constexpr lamdba
int main() {
    constexpr auto factorial = [](int n) {
        constexpr auto fact_impl = [](int n, const auto &impl) -> int {
            return n > 1 ? n * impl(n - 1, impl) : 1;
        };
        return fact_impl(n, fact_impl);
    };
    
    static_assert(factorial(5) == 120);
}


在这个例子中，我们将 factorial 声明为 constexpr，这将会允许使用编译期进行检查的 static_assert。

捕获变量
你可以捕获变量（需要保证捕获后仍然是个常量表达式）：
代码 4-5 捕获常量
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


然而，有趣的事情是，代码如果这么写的话：
constexpr int x = 0;
constexpr auto lam = [x](int n) { return n + x };

你并不需要去捕获 x。

在 Clang 中，我们甚至会得到如下的 warning：
warning: lambda capture 'x' is not required to be captured for this use


同样的，如果我们将 add 函数改为值传递的话，也会产生同样的效果：
constexpr int add(int t, int u) {
    return t + u;
}


这是因为如果我们依赖常量表达式，编译器可以优化变量，特别是对于在编译期就可以知道值的内置类型。

下面是一些来自 cppreference 的描述：
一个 lamdba 表达式如果想要不经过捕获读取一个变量的值，当且仅当该变量：
是一个 const non-volatile integral 或者 enumeration type 并且被 constant expression 初始化
是 constexpr 并且没有 mutable 的变量


如果想要获得更多关于此的信息，你可以阅读这部分的标准：C++draft - basic.def.odr#4

在第一个 add() 的例子中，接收变量的时候使用了引用传递，我们强制编译器创建一个闭包成员，然后将其绑定到引用。
然后让 add() 函数返回参数的地址，然后它们进行比较，像是这样：
int const *address(int const &x) {
    return &x;
}

auto f = [x] {
    auto *p = address(x);
    return p == &x;  // these need to be true
};


因此编译器需要在闭包中存储 x 的拷贝，也就是说需要捕获它，这个捕获操作并不能被优化掉。

constexpr 总结
简而言之：
constexpr 允许你进行模板编程并且可能使用更短的代码。

为将来做准备：
在 C++20 中，我们将会拥有许多 constexpr 标准的算法和容器，比如 std::vector 和 std::string，所以 constexpr lamdba 在这种情况下会非常便利。
届时，运行时的代码和编译期运行的代码将会非常相似。


现在让我们现在了解自 C++17 引入的第二个重要的特性。
## 4. 捕获 *this
还记得我们之前是如何捕获类的成员变量的吗？

默认情况下，我们捕获 this（作为一个指针），并且当临时创建的对象的生命周期短于 lamdba 函数的生命周期时，将会出现错误。

在 C++17 当中，我们有另外一种方式，我们可以捕获 this 的拷贝 *this；
代码 4-6 捕获 *this
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


在这个例子中，我们可以通过 [*this] 来捕获一个对象的临时拷贝，该拷贝存在于闭包内并且不会在之后调用该 lamdba 时产生 UB。

需要注意的是：
- 在 C++17 中，如果你在类的成员函数当中使用 [=]，那么 this 将会被隐式捕获！
- 你可以查看 C++20 相关的章节知晓这将会被增强和弃用！
- 可以查看 P0806 获取更多资料。

一些指导性意见
所以我们应该捕获 [this] 还是 [*this] 呢？ 以及，这为什么那么重要？

在大多数情况下，当你在 class 的 scope 里面使用 lamdba 时，使用 [this] 或者 [&] 是很好的方式，当你的对象很大的时候不会产生额外的拷贝从而影响性能。

当你的 lamdba 表达式的生命周期可能比对象的生命周期长的时候，你应当使用 [*this]。

 这对于异步或者并行执行中的数据竞争可能至关重要。此外，在异步/多线程执行模式下，lamdba 表达式的生命周期可能比对象的生命周期更长，因此捕获的 this 指针可能会失效。

## 5. IIFE 更新
在 C++11 ，引入了 IIFE - Immediately Invoked Function Expression，在 C++17，有一些关于 IIFE 的更新。

在使用 IIFE 过程中会遇到的一个问题时，IIFE 式的代码不易阅读。因为调用操作符 () 很容易被人忽略，下面是一个 IIFE 的例子：
const auto var = [&] {
    if (TheFirstCondition())
        return one_value;
    if (TheSecondCindition())
        return second_val;
    return default_value;
}();  // call it!


在 C++11 章节，我们甚至讨论了使用 const auto var 也会有一些误导。
 这是因为开发人员可能已经习惯了 var 可能是一个闭包对象而不是函数调用结果。

在 C++17 有一个更方便的模板函数 std::invoke() 可以使 IIFE 更加清晰。
const auto var = std::invoke([&] {
    if (TheFirstCondition())
        return one_value;
    if (TheSecondCindition())
        return second_val;
    return default_value;
});


如你所见，不再需要在末尾写上 ()，而是更清晰的进行调用。

std::invoke() 位于 <functional> 头文件中。

## 6. 可变泛型 Lambda 的更新
在 C++14 章节，我们了解到在泛型 Lamdba 中可以使用 泛型参数列表。
感谢 C++17 带来的折叠表达式能够让我们写出更加紧凑的代码。
代码 4-7 使用折叠表达式实现的求和函数
#include <iostream>
int main() {
    const auto sumLambda = [](auto... args) {
        std::cout << "sum of: " << sizeof...(args) << " numbers\n";
        return (args + ... + 0);
    };
    std::cout << sumLambda(1.1, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7, 8.8, 9.9);
}

如果你将上述代码与之前才 C++14 章节中求和函数的例子进行对比，你会发现这个例子中不再需要递归。
当我们需要书写包含可变参数的表达式时，使用折叠表达式会相对简单和直观。

下面是另外一个例子，它能够输出多个参数。
代码 4-8 使用折叠表达式实现简单的多参数输出
#include <iostream>
int main() {
    const auto printer = [](auto... args) {
        (std::cout << ... << args) << '\n';
    };
    printer(1, 2, 3, "hello", 10.5f);
}

运行该代码后，会输出所有的参数并且不包含分隔符：
123hello10.5


为了解决这个问题，我们将介绍一个小技巧，一并折叠逗号分隔符：
代码 4-9 使用折叠表达式实现带分隔符的多参数输出
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

我们将得到如下输出：
1, 2, 3, hello, 10.5, 

代码其实可以更短：
const auto printer = [](auto... args) {
    ((std::cout << args << ", "), ...);
    std::cout << '\n';
};

如果我们不想输出末尾逗号的话，我们可以将代码改成这样：
代码 4-10 没有尾逗号的带分隔符的多参数输出
#include <iostream>
int main() {
    const auto printer = [](auto first, auto... args) {
        std::cout << first;
        ((std::cout << ", " << args), ...);
        std::cout << '\n';
    };
    printer(1, 2, 3, "hello", 10.5f);
}

这一次我们需要使用通用模板参数来输出第一个元素。
然后为其余元素使用可变参数列表，并且在输出元素前输出一个逗号分隔符。
代码输出如下：
1, 2, 3, hello, 10.5



## 7. 从多个 Lambda 派生
在 C++11 章节，我们了解了从 lamdba 表达式进行派生，虽然这很有趣，但是使用场景很有限。

主要的问题是在 C++11 中只支持特定数量的 lambda，那么例子使用了一个或两个基类，但是如何能够使用可变数量的基类，即可变数量的 lamdba 表达式。

在 C++17 我们有了相对简单的模式去实现：
template <class... Ts>
struct overloaded : Ts... {
    using Ts::operator()...;
};
template <class... Ts>
overloaded(Ts...) -> overloaded<Ts...>;

如你所见，我们需要使用可变参数模板，因为它允许我们使用任意数量的基类。
下面是一个例子：
代码 4-11 The Overloaded Pattern
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

在上述的例子中，我们创建了一个由三个 lambda 组成的 lamdba 表达式。之后我们可以带上参数调用该 lamdba 表达式，将会通过传入的参数类型调用所需的函数。

现在让我们仔细看看这个模式核心的两行代码。
这两行代码受益于自 C++17 以来可用的三个特性：
- using 声明的包扩展 - 用更简单且紧凑的代码实现可变模板。
- 自定义模板参数推导规则 - 允许将 lamdba 列表转换为重载类的基类列表。（在 C++20 中不需要这么做）。
- 聚合初始化的扩展 - 在 C++17 之前，不能合并从其它类型派生的初始化类型。

在 C++11 章节中，我们已经使用了 using declaration。
这个特性对于使用同一个 scope 下的仿函数重载带来很大帮助。
在 C++17 我们获得了支持可变参数模板的语法，这在先前的版本中是没有的。

现在让我们试着去理解剩下的两个特性：
自定义模板参数推导规则
我们从 lambda 派生，并且将它们的 operator() 暴露出来，上一节看到的那样。
那么我们如何创建这种重载类型的变量呢？

像你知道的那样，我们无法预先知道某一个 lambda 的类型，因为编译器会为每一个 lambda 生成一个唯一的类型名称。例如，我们不能写下如下的代码：
overload<LambdaType1, LambdaType2>myOverload { ... } // ???
// what is LambdaType1 and LambdaType2 ??


唯一的方式是使用一些 make 函数（因为模板参数推导适用于函数模板），像下面这样：
template <typename... T>
constexpr auto make_overloader(T&&... t) {
    return overloaded<T...>{std::forward<T>(t)...};
}


如果使用 C++17 中引入的模板参数推导规则，我们可以简化常见模板类型的创建，而不需要像上面那样需要使用一个类似于 make_overloader 的函数。

举个例子，对于一个简单的类型，我们可以写下如下代码：
std::pair strDouble { std::string{"Hello"}, 10.0};
// strDouble is std::pair<std::string, double>


有一个 option 能够自定义推导规则，并且在标准库中大量的使用了它们，比如 std::array：
template <class T, class... U>
array(T, U...) -> array<T, 1 + sizeof...(U)>;

上述的写法允许我们写下如下的代码：
array test{1, 2, 3, 4, 5};
// test is std::array<int, 5>


对于重载模式，我们可以使用如下的自定义推导规则：
template<class... Ts>overloaded(Ts...) ->overloaded<Ts...>;


现在，我们可以使用两个 lamdba 初始化一个 lamdba 表达式：
overloaded myOverload { [](int) { }, [](double) { } };

上述的 lamdba 表达式中的模板参数将被正确推导，因为在这个例子中，编译器知道这两个 lamdba 表达式参数的类型，所以可以解析出继承自这两个参数的 lamdba 表达式的类型。

你可以在 C++20 章节 中看到新的标准，类模板参数推导将被提升，对于重载模式，将不再需要写自定义的推导规则。

现在让我们进入最后一个小节 - 聚合初始化
聚合初始化的扩展
这个功能相对简单：我们可以聚合初始化一个从其它类型派生的类型。
来自这个标准 dcl.init.aggr：
An aggregate is an array or a class with:
no user-provided, explicit, or inherited constructors
no private or protected non-static data members
no virtual functions, and
no virtual, private, or protected base classes


如下这个例子（例子来自于标准草案）：
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


该代码中：
- d1.b1 初始化为 1
- d1.b2 初始化为 2
- d1.b3 初始化为 64
- d1.d 初始化为 4
对于 d2 ：
- d2.b1 初始化为 0
- d2.b2 初始化为 32
- d2.b3 初始化为 64
- d2.d 初始化为 4

在我们的例子中，聚合初始化有更显著的影响。因为对于重载类，没有聚合初始化，我们必须实现如下的构造函数：
struct overloaded : Fs... {
    template <class... Ts>
    overloaded(Ts&&... ts) : Fs{std::forward<Ts>(ts)}... {}
    // ...
}


这将会需要写很多代码，而且可能没有涵盖所有的情况，比如 noexcept。

通过聚合初始化，我们「直接」从基类列表中调用 lambda 的构造函数，因此无需编写向其显示转发参数的代码。

至此为止，我们介绍了很多，那么有没有什么有用的重载模式的例子？

现在看来似乎 std::variant 更为方便。
std::variant 和 std::visit 的例子

我们可以使用继承和重载模式来做一些更实用的事情。
先看一个 std::variant 和 std::visit 的例子

代码 4-12 使用 variant 和 visit 实现重载模式
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

在上述的代码中：
- 我们创建了一个支持 整型、浮点型和字符串的 variant 变量。
- 然后通过三个重载函数调整了 intFloatString 的值。
- 最后再通过 PrintVisitor 将其输出出来。
- 由于范型 lamdba 的支持，PrintVisitor 函数只需要写一个，它支持所有实现了 << 操作符的对象。

其中，我们有一个 std::visit 的调用，它创建了一个 visitor，重载了三种类型，三个函数都是将当前值赋值一份，只是类型不同。

## 8. 使用 Lambda 进行并发编程
如果在同一个线程中调用 lamdba 是比较容易的情形。
但是如果你想在一个单独的线程中调用 lamdba 的话，应该怎么做？
可能会遇到什么问题？
让我们在本节中展开说说。

本节不是关于如何用 C++ 编写并发代码的教程，旨在展示您在异步代码中使用 lambda 可能会遇到的问题。
有关 C++ 中的并发问题，您可以参考单独的书籍，例如 Rainer Grimm 的 《Concurrency with Modern C++》 或者 Anthony Williams 的 《C++ Concurrency in Action》。


Lambda 和 std::thread
让我们先看一下自从 C++11 就开始支持的 std::thread。
您可能已经知道 std::thread 在其构造函数中接受一个可调用对象。
可调用对象可能是一个普通的函数指针、仿函数或者 lamdba 表达式。

一个简单的例子：
代码 4-13 将 lamdba 传递给 thread
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


在上述的例子中，我们使用 lamdba 表达式创建了一个线程。
std::thread 类拥有非常灵活的构造函数，所以我们甚至能够在 lamdba 中传入一个参数，在上述代码中，我们将 10 作为 startArg 传给了 lamdba。

上述代码很简单，因为我们通过 join 控制了线程的执行，保证我们在输出 numbers 之前，numbers 里的数据一定会准备好。

关键的是，虽然 lamdba 使得创建线程变得更加容易和方便，但是它仍然是异步执行的。
闭包并不会改变其异步执行的特性，闭包同样会受到所有竞争条件和阻塞的影响。

我们可以看一下下面的例子：
 代码 4-14 通过很多线程更改共享变量
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


std::thread::hardware_concurrency() 是一个静态成员函数。它会返回支持的线程数量。
通常它是给定机器上的硬件线程数，据 Coliru 说，在 Wandbox 上通常是 3。

在这个例子中，我们创建了若干个线程，每个线程都对 counter 有一些运算。counter 变量被所有线程共享。

在 C++20 中，你可以使用 std::jthread，它能够在析构的时候进行 join 并且能够接收停止标记的线程。这种新的线程对象能够允许用户对线程执行进行更多的控制。

虽然您可能希望的最终结果是 0，但是结果是未定义的。当一个线程正在读该变量的时候，可能正在有另外一个变量在并发写，导致最终的结果是未定义的。

为了解决这个问题，与常规线程场景一样，我们应该使用某种同步机制。
比如上面那个例子，我们可以使用较为易用的原子变量。
代码 4-15 使用原子变量
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

上面的代码会按我们的预期进行执行，因为增加和减少操作现在是原子的。
这意味着当 counter 改变的时候，其它线程不能中断这个操作。
「同步」使得代码更加安全，但是需要以性能作为牺牲。
然后这也是一个需要值得出一本书来长久讨论的主题。

解决同步问题的另外一个选择是在计算的每个线程中都有一个局部变量。
然后在线程结束之前，我们可以去锁定并且更新全局变量。
值得补充的一点是，将变量定义为 volatile 并不能提供正确的同步机制，并且在 C++20 中 volatile 在许多地方被弃用。

正如我们所见，使用 lambda 表达式创建线程非常方便。
它可以与线程声明在一起，并且可以做任何你在常规函数和仿函数中能够做的事情。

现在让我们来尝试一下在 C++ 中新引入的另外一个科技。
Lambda 和 std::async
您可以使用多线程的第二种方法是通过 std::async。
我们在 C++11 中通常将这个功能与线程一起使用。
这是一个高级 API，允许您延迟或完全异步地调用和计算。

现在让我们将 iota 的例子使用 std::async 来实现：
代码 4-16 使用 std::async 异步调用代码
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

这一次，我们没有使用线程，而是依赖了 std::future 机制来实现。
这是一个处理同步并保证调用结果在我们通过 .get() 请求时可用的对象。

在这个例子中，我们通过 std::async 调度 lambda 的执行，然后通过调用 .get() 来等待这些被调度的任务执行完毕。

然后，上面的代码实现不够优雅。因为我们使用了 future<void> 并且使用引用捕获了 numbers。
更好的解耦方式应该是使用 std::future<std::vector<int>>，然后通过 future 的 .get() 机制来传递结果。像是下述代码写的一样：
std::future<std::vector<int>> iotaFuture = std::async(std::launch::async, [starArg = 10]() {
    std::vector<int> numbers(100);
    std::iota(numbers.begin(), numbers.end(), startArg);
    std::cout << "calling from: " << std::this_thread::get_id() << " thread id\n";
    return numbers;
});
auto vec = iotaFuture.get();  // make sure we get the results...// ...


长久以来，std::async/std::future 似乎获得了褒贬不一的评价。
看起来可能是实现的太粗鲁了。
它适用于相对简单的情况，在一些复杂的情况下可能没那么有效，例如：
- continuation
- task merging
- no cancellation/joining
- it’s not a regular type
- and a few other issues

如果你想了解更多，那么你可以阅读以下资料：
- There is a Better Future - Felix Petriconi - code::dive 2018
- code::dive 2016 conference – Sean Parent – Better Code: Concurrency
- Core C++ 2019 :: Avi Kivity :: Building efficient I/O intensive applications with Seastar

Lambda 和 C++17 的并行算法
在讨论了 C++11 的线程支持后，我们可以转向更新的标准：C++17。
这次有一个超级好用的技巧，允许您并行化标准库中的大多数算法。
您所要做的就是在算法中指定第一个参数，例如：
auto myVec = GenerateVector();
std::sort(std::execution::par, myVec.begin(), myVec.end());

值得注意的是我们指定了第一个参数 std::execution::par。它将为排序算法开启并发执行的特性。 

我们还有其它的特性：
特性名
描述
sequenced_policy
这是一种执行策略类型，用作消除并行算法重载的歧义并指示并行算法的执行不能并行化。
parallel_policy
这是一种执行策略类型，用作消除并行算法重载的歧义并指示并行算法的执行可以并行化。
parallel_unsequenced_policy
这是一种执行策略类型，用作消除并行算法重载的歧义并指示并行算法的执行可以并行化和向量化。

对于每一种特性来说，我们预先定义了全局对象，你可以将它传递给特定的算法：
- std::execution::par
- std::execution::seq
- std::execution::par_unseq

执行特性的声明和其对应的全局对象位于 <execution> 头文件中。

在 C++20 中还有另外一种执行策略：unsequenced_policy 以及其对应的全局对象 std::execution::unseq。它用于在单线程上启用向量化执行。

虽然我们可以轻松的启用并行排序，但是我们也很有可能写出如下糟糕的代码：
代码 4-17 Copying into vector and dangerous behaviour
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


上述代码不包含任何的第三方库，但是需要支持并行算法的编译器。
这在 MSVC（始于 VS 2017）中是可能可以运行的，但是不适合于任何在线编译器，你可以将该代码拷贝到 Visual Studio 上运行。

译者注：现在可以在 Wandbox 上跑了。

你看到这里的问题所在了吗？

通过将 lamdba 传递给 std::for_each，我们需要记住代码不会运行在单线程中。
这里可能会使用多线程，例如：线程池的解决方案。
这就是为什么访问共享输出变量不是一个好主意。它不仅可能会以错误的顺序插入元素，而且如果多个线程同时尝试更改变量，它甚至会崩溃。

我们可以通过在每次调用 push_back 之前使用互斥锁并锁定它来解决同步问题。
但是上述的代码仍然高效吗？
如果过滤的条件简单且执行速度较快，那么上述代码的性能甚至会低于其对应的串行版本的代码。

如果没有实际运行过，您不知道 output 中元素的顺序。

这一节展示了基本的并行算法，如果你想了解的更多，可以阅读以下文章：
The Amazing Performance of C++17 Parallel Algorithms, is it Possible?

Lambda 和异步 - 总结
当你想启动一个线程、通过 std::async 或者调用并行算法的时候，使用 lamdba 表达式会非常方便。
但是必须要记住的一点是，闭包对象在并发性方面并没有特殊性，所有的挑战和困难也都是基于此。

## 9. 总结
在本章节中，您已经看到了 C++17 加入了 C++ 中的两个基本元素，constexpr 和 lamdba。
现在你可以配合 constexpr 使用 lamdba 表达式了。
这是改进语言中元编程支持的必要步骤。
我们将在 C++20 的章节中看到更多关于此的内容。
更重要的是，C++17 标准也解决了捕获的问题，从 C++17 开始，您可以通过 [*this] 对 this 进行值捕获，从而使代码更加安全。

我们还查看了 lamdba 相关的一些例子：IIFE 技术、折叠表达式和可变参数泛型 lamdba，从多个 lamdba 进行派生已经异步代码的执行。
由于在 C++17 中支持的各种功能，我们现在有更好的语法和更直接的方法来编写更高效的代码。


# 五、Lambda in C++20
2020年2月，在捷克首都布拉格的会议上，ISO委员会最终通过C++20标准，并宣布其将于2020年末正式发布。新的标准规范为C++语言本身和标准库都带来了诸多显著性的提升和改进！Lambda表达式也得到了一些更新。

本章中，主要关注下列内容：
- C++20中的变化
- 新的选择 - 捕获 this 指针
- 模板lambda
- 如何通过 concepts 提高泛型lambda
- 如何在lambda中使用 constexpr 算法
- 如何使 overloaded 模式更加简短

你可以在N4681中的[expr.prim.lambda]章节查阅标准规范中Lambda相关的内容。
## 1. Lambda语法更新
在C++20中，lambda的语法得到了改进：
- 现在可以在参数列表后添加 consteval 关键字
- 现在明确模板尾（template tail）是可选的
- 现在在尾部返回后，可以添加 requires 声明
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
C++20中lambda表达式的相关特性：
- 允许 [=, this] 作为lambda捕获 - P0409R2 并且弃用了通过 [=] 隐式捕获this - P0806
- 初始化捕获中的包扩展：[...args = std::move(args)](){} - P0780
- static，thread_local和lambda捕获的结构化绑定 - P1091
- 模板lambda（带有concepts） - P0428R2
- 简化显式的lambda捕获 - P0588R1
- 默认可构造和可分配的无状态Lambda - P0624R2
- 未评估上下文中的 Lambda - P0315R4
- constexpr 算法 - 十分重要 P0202，P0879和P1645
如果想了解更多C++20的内容，你可以阅读此篇比较C++17和C++20的文章：Changes between C++17 and C++20

当然你也可以阅读我关于C++20语言和标准库特性的的卡片笔记：Bartek's coding blog: C++20 Reference Card

快速预览下这些新的改变：

新添加的功能“清理”了 lambda 语法。同时，C++20 也增强了部分功能，允许我们在高级场景中使用 Lambda。

例如，根据P1091，我们可以捕获一个结构化绑定：
代码5-1 在lambda中捕获结构化绑定
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

一些编译器（如GCC）甚至在C++17中就支持了捕获结构化绑定，即便当时的标准并未强制哟求。

C++20标准也有关于 *this 捕获的阐明。现在在方法中进行值捕获 [=] 会收到一条警告：
代码5-2 隐式捕获*this的警告
struct Baz {
    auto foo() {
        return [=] { std::cout <<s <<'\n'; };
    }
    std::string s;
};

GCC9下进行编译会有如下的警告：
warning: implicit capture of 'this' via '[=]' is deprecated in C++20

为什么会出现这条警告呢？因为就算是使用 [=] 捕获的 this 也是作为指针的形式出现，所以不如显式的指明它更好：[=, this] 或者 [=, *this]。

快速回顾之后，让我们来看看 C++20 中与 Lambda 相关的更突出的特性。
## 3. consteval Lambda
从C++11起，constexpr 就允许函数在编译期间执行了，但是同时，也可以在运行时执行这些函数。在某些情况下，最好的做法是将部分功能限制在编译期时进行。这就是为什么C++20中引入了新的关键字，来创建符合 constexpr 规则但只能在编译期执行的函数，这些函数也被称为“即时函数（Immediate Function）”。

这个新的关键字也可以用在lambda上。看个简单的例子吧：
代码5-3 一个简单的即时lambda函数
int main() {
    const int x = 10;
    auto lam = [](int x) consteval {
        return x + x;
    };
    return lam(x);
}

我们将新的关键字 consteval 放在了lambda的参数列表之后，类似于 constexpr 的用法。严格的区别就在于，如果你将 x 的 const 移除，那么 constexpr lambda表达式仍旧可以在运行时工作，但是即时lambda函数将无法成功编译。

默认情况下，如果lambda函数体中遵循 constexpr 函数的规则，那么编译器会将调用操作符标记为隐式的 constexpr 。这并非 consteval 案例，因为它对类似这样的代码拥有更强的限制。当然，这两个关键字无法同时使用。在草案P1073R3中你可以找到与此相关的全部描述。
## 4. 捕获参数包
C++20中还对lambda中初始化捕获的包扩展带来了一个提升：
template<typename...Args>
void call(Args&& ... args) { 
    auto ret = [...capturedArgs = std::move(args)](){};
}

先前，在C++20之前，这段代码是无法通过编译的（参考C++11章节中这部分内容），为了解决这个问题，需要将参数打包进一个单独的元组中去。关于捕获限制相关的历史内容，你可以参考P0780中的描述。

综上所述，我们可以使用在C++11章节中有关捕获一个可变参数包的例子并在C++20中新特性的加持下实践下。看下面的例子，利用折叠表达式来打印每个被捕获的参数：
代码5-4 捕获可变参数包
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

输出：
0x1f0cb20, 2, 3, 4
0, a, b

在示例中，我们使用了一个 printer 对象，它很类似在C++17中写过的那样，但是在这儿我们用来捕获变量而不是作为转发lambda参数使用。代码中甚至传递了一个 unique 指针。我们传递了两次并且你可以看到在第二次调用时得到的结果为 0 ，因为此时指针已经丢失了它对那块内存块的所有权。
## 5. 模板Lambda
C++14中就已经引入了泛型lambda，并且可以在模板中将参数类型也声明为 auto 类型。
例如：
[] (auto x) { x; };

编译器会生成一个调用操作符对应以下的模板方法：
template <typename T> 
void operator ()(T x) { x; }

但是，这似乎没有办法去直接改变这个模板的参数，并且使用“真实”的模板参数。C++20下，这都是可能的。

比如，如何限制lambda仅对vector类型生效呢？

如下，有一个泛型lambda：
auto foo = [](auto& vec) {
    std::cout << std::size(vec) << '\n';
    std::cout << vec.capacity() << '\n';
};

但是，如果你调用它并传入一个 int 参数（如 foo(10)），那你可能会遇到“晦涩难懂”的错误提示：
test.cc: In instantiation of
         'main()::<lambda(const auto:1&)> [with auto:1 = int]':
test.cc:16:11:   required from here
test.cc:11:30: error: no matching function for call to 'size(const int&)'
               11 | std::cout<< std::size(vec) << '\n';

在C++20中，可以这样写：
auto foo = []<typename T>(std::vector<T> const& vec) {
    std::cout << std::size(vec) << '\n';
    std::cout << vec.capacity() << '\n';
};

它所对应的模板调用操作符为：
<typename T>
void operator()(std::vector<T> const& s) { ... }

这样模板参数就在捕获子句 [] 之后了。

现在进行类似 foo(10) 的调用，那么会收到一个较人性化的消息：
note:   mismatched types 'const std::vector<T>'and 'int'


上述例子中，编译器会警告我们关于lambda接口中的这个错误的匹配。

另外有一个重要的方面就是，在泛型lambda的示例中，你只拥有一个变量而不是它的模板类型。如果要访问类型，则需要使用 decltype(x) （对于带有 auto x 参数的lambda）。这将会使得你的代码变得冗长。

例如（使用了P0428中的代码）：
代码5-5 从泛型参数中推断
auto f = [](auto const& x) {
    using T = std::decay_t<decltype(x)>;
    T copy = x;
    T::static_function();
    using Iterator = typenameT::iterator;
}

现在可以这样编写：
代码5-6 使用模板Lambda
auto f = []<typename T>(T const& x) {
    T copy = x;
    T::static_function();
    using Iterator = typenameT::iterator;
}

和明显，在第一种写法中，我们不得不使用
using T = std::decay_t<decltype(x)>;

为了得到输入参数的类型，在C++20版本中，没有必要去访问模板参数了。

除此之外，还有一个重要的使用场景就是在可变泛型lambda中进行完美转发：
// C++17
auto ForwardToTestFunc = [](auto&&... args) {
    // what's the type of `args` ?
    return TestFunc(std::forward<decltype(args)>(args)...);
};

每次你想要访问模板参数的类型是，你都需要去使用 decltype() ，但是在模板lambda中就不需要了：
// C++20
auto ForwardToTestFunc = []<typename... T>(T && ... args) {
    return TestFunc(std::forward<T>(args)...);  // we have allthe types!
};

怎么样？模板lambda提供了更为清晰的语法和更好的访问参数类型的途径。

当然，这还不够，你甚至也可以在lambda使用 concept，咱们接着往下看。
## 6. Concept和Lambda
Concept是编写模板的一项革命性进步。它将允许你对模板参数进行约束，这可以极大提高代码的可读性，可能提升编译速度甚至能够提供更友善的错误信息。

话不多说，看个简单的示例吧：
代码5-7 一个普通的concept声明
// define a concept:
template <class T>
concept SignedIntegral = std::is_integral_v<T> && std::is_signed_v<T>;
// use:
template <SignedIntegral T>
void signedIntsOnly(T val) {}

我们首先创建了一个concept描述类型为有符号的并且是整形。请注意我们可以已有的类型特征。之后，我们使用她来定义一个仅支持能匹配concept类型的模板函数。在这我们没有使用 typename T ，但是我们可以引用一个concept名字

好了，简单了解了concept之后，那么怎么跟lambda关联起来呢？

关键部分就在于精炼语法以及约束 auto 模板参数。
简化和精炼的语法
得益于concept精炼的语法特性，你也可以不用在编写模板时候带有 template<typename ..> 部分了。

使用无约束的 auto ：
void myTemplateFunc (auto param) {}

使用有约束的 auto ：
void signedIntsOnly (SignedIntegral auto val) {}
void floatsOnly (std::floating_point auto fp) {}

这些语法跟在C++14中编写泛型lambda时很像，当然，现在你可以这样做：
void myTemplateFunction (auto val) {}

换句话说，对于lambda，我们可以利用它精炼的风格，例如对泛型lambda参数添加额外的限制。
auto GenLambda = [](SignedIntegral auto param) { return param * param + 1; } 

上面的例子利用SignedIntegral来限制 auto 参数。但是整个表达式比起模板lambda看上去更加的可读，这就是为什么我们要着重讨论的点了。

来一个有点难度的例子吧，我们甚至可以为一些类的接口定义concept：
代码5-8 IRenderable concept, with requires keyword
template <typename T>
concept IRenderable = requires(T v) {
    { v.render() } -> std::same_as<void>;
    { v.getVertCount() } -> std::convertible_to<size_t>;
};

上面这个例子定义了一个带有render() 和 getVertCount() 成员函数，用来匹配全部类型的concept。使用它来写一个泛型lambda试试：
代码5-9 IRenderable concept/Interface的实现
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

intmain() {
    const auto RenderCaller = [](IRenderable auto& obj) {
        obj.render();
    };
    Circle c;
    RenderCaller(c);
    Square s;
    RenderCaller(s);
}

这个例子中RenderCaller就是一个泛型lambda，并且支持类型必须满足IRenderable concept。
## 7. 无状态Lambda的变更
也许你会想起来C++11中我们提过的无状态、甚至没有默认构造化的lambda。然而，这个限制在C++20中被解除了。

这就是为什么假如你的lambda没有捕获任何东西的情况下，你也可以写下如下的代码：
代码5-10 一个无状态Lambda
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

例子中我声明了一个集合用来存储一系列的产品。同时我需要一个办法来比较这些产品，所以我传入了一个无状态的lambda用来比较他们的产品名。

如果用C++17编译，那么你会收获如下关于使用了删除默认构造器的错误说明：
test.h: In constructor
'std::set<_Key, _Compare, _Alloc>...
[with _Key = Product;
      _Compare = main()::<lambda(const auto:1&, const auto:2&)>;
...'
test.h:244:29: error: use of deleted function
'main()::<lambda(const auto:1&, const auto:2&)>::<lambda>()'

但是在C++20中，你可以存储无状态lambda，甚至可以拷贝他们：
代码5-11 存储无状态Lambda
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

补充一些关于“未评估的concept”
还有一些与高级用例相关的变化，比如未评估的concept。 连同默认的可构造 lambda，您现在可以编写这样的代码：
std::map<int, int, decltype([](int x, int y) { return x >y; })> map;

如您所见，现在可以在声明映射容器中指定 lambda。 它可以用作比较器仿函数。 这种“未评估concept”对于高级模板元编程特别方便。 例如，在该功能的提案中，作者提到在编译时使用断言对元组对象进行排序，该断言是一个 lambda。

更多的内容可以参考P0315R2。
## 8. Lambda和 constexpr 算法
回想一下之前章节中的内容，自C++17依赖，我们可以使用constexpr lambda。并且，由于这项功能，我们可以传递lambda给一个需要在编译器评估的函数。在C++20中大多数标注算法都可以被关键字 constexpr 标记，这使得constexpr lambda用起来更加方便了。

看一些例子吧还是。
代码5-12 在普通的 constexpr Lambda中使用 std::accumulate() 
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

本例中，在lambda中使用 std::accumulate ，实际上使用的还是 std::plus 操作。

下个例子中，使用了一个带有 cmp 比较器 cout_if 算法的 constexpr 函数。
代码5-13 给普通函数中传入一个 constexpr Lambda
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

哪些标准算法是可以 constexpr 的呢？
所有<algorithm>，<utility>和<numeric>头文件中的算法现在都可以被关键字 constexpr 标记。除了shuffle, sample, stable_sort, stable_partition, inplace_merge这些，以及接受执行策略参数的函数或重载函数。
具体的内容可以查阅P0202，P0879和P1645。

## 9. C++20 对重载模式的更新
在前一章中，学习过如何从多个 lambda 表达式派生并通过重载模式暴露它们。 这种技术对于 std::variant 访问很方便。

得益于C++20中类模板参数推断（CTAD，Class Template Argument Deduction）的更新，现在可以用更简短的语法来实现了。

为什么？

这是因为在 C++20 中有 CTAD 的扩展并且会自动处理聚合。 这意味着无需编写自定义的推断。

来一个简单的例子：
template<typename T, typename U, typename V>
struct Triple { T t; U u; V v; };

在C++20中的写法：
Triple ttt { 10.0f, 90, std::string{"hello"}};

T 将被自动推断为 float ，U 为 int，V 为 std::string 。

C++20中的重载模式：
template<class... Ts> struct overload: Ts... { using Ts:: operator()...; };

这个特性的草案可以在P1021和P1816中查阅。
GCC10 似乎实现了这个提议，但是它不适用于继承的高级案例。因此我们需要等待GCC对该特性进行完整的支持。

## 10. 总结
在本章中，我们回顾了 C++20 带来的变化。

首先，一些澄清和改进：例如捕获 this、捕获结构化绑定或默认构造无状态 lambda 的能力。 更重要的是，还有更多重要的补充！ 现在突出的功能之一是模板 lambdas 和概念。这样您就可以更好地控制通用 lambdas。

总而言之，使用 C++20 及其所有功能，使得 Lambda 愈发成为更强大的工具！

# 附录A - 技术名录
C++11 Chapter
- Calculating the number of invocations - An example of instrumenting a default functor to gather extra information.
- Deriving from lambda- A basic technique that allows you to wrap a closure type and extend it with additional functionality.
- IIFE - Immediately Invoked Function Expression - An efficient way to compute the value of a const variable which requires a complex initialisation without creating an extra function.
- Passing C++ a captureless lambda as a function pointer to C-style API functions.
- How to store lambdas in a container- we can do a little trick and store lambdas wrapped into std::function.
C++14 Chapter
- Replacing std::bind1st, std::bind2nd - how to use Modern C++ and replace deprecated functionality.
- An optimisation thanks to capture with initialiser - An example of storing a temporary value used for the body of the lambda.
- Perfect forwarding with generic lambdas - How to use std::forward on a generic argument to pass the arguments further in the call stack.
- LIFTING with lambdas - This allows passing a set of function overloads into a function template which takes a callable object. For example, when you call algorithms from the Standard Library.
- Recursive lambdas - Several tricks you can use to call the closure object inside its body.Variadic generic lambdas- How to use variadic arguments in a lambda expression.
C++17 Chapter
- The overload pattern - The mechanism that allows to derive from multiple lambda expressions and pass it to std::visit.
- IIFE improvements- How to improve readability with std::invoke.
- Updates to Variadic Generic Lambdas - Leveraging fold expressions for simpler code.
- Lambdas and asynchronous execution - What are the pitfalls of using lambdas with threads async and parallel algorithms.
C++20 Chapter
- Updates to the overloaded pattern - Even more simplification with more deduction guides.
- Updates to Capturing a Parameter Pack - Better support for r-value references.
# 附录B - 五大使用C++ Lambda的优势
# 参考
- C++11 - [expr.prim.lambda]
- C++14 - [expr.prim.lambda]
- C++17 - [expr.prim.lambda]
- Lambda expressions - cppreference.com
- C++ compiler support - cppreference.com
- Effective Modern C++: 42 Specific Ways to Improve Your Use ofC++11 and C++14 1st Edition by Scott Meyers, see @Amazon.com
- Microsoft Docs - Lambda Expressions in C++
- Sticky Bits - Demystifying C++ lambdas
- The View from Aristeia: Lambdas vs. Closures
- Simon Brand - Passing overload sets to functions
- Jason Turner - C++ Weekly - Ep 128 - C++20’s Template Syntax ForLambdas
- Jason Turner - C++ Weekly - Ep 41 - C++17’s constexpr LambdaSupport
- Stack Overflow: c++ - Recursive lambda functions in C++11
- Pedro Melendez: Recursive lambdas in C++(14)
- Scott Meyers Standard C++ - Universal References in C++11
- Standard C++: Quick Q: Why can noexcept generate faster code than throw()?
# 笔记