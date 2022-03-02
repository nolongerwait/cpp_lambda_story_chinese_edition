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

你可以使用一些在线编译器，这样就不用在本地创建项目来尝试运行和解读这些示例代码了。

这些在线编译器提供基础的文本编辑器，并且通常允许你自行编写源文件进行编译。

对于一些简短的代码而言，使用在线编译器来说是十分方便的，可以快速查看代码的运行结果，甚至你可以快速在不同版本，不同环境，不同编译器之间进行切换使用。

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

现就职于 Xara，负责开发高级文档编辑器。

同时，拥有桌面图形程序、游戏开发、大型航空系统、图形驱动甚至生物反馈方面的开发经验。

早前，在 Cracow 当地的大学中教授编程（游戏编程和图形编程）课程。

从2011年起，Bartek 开始在 [bfilipek.com](http://bfilipek.com) 上撰写博客。

起初，博文主题围绕图形编程，但是现在更多聚焦于C++核心内容。

同时，他也是 [Crocow C++](https://www.meetup.com/C-User-Group-Cracow/) 开发者组织的联合组织者。

你可以在 [@CppCast](https://cppcast.com/bartlomiej-filipek/) 找到他关于 C++17 ，博客和文本处理相关的内容。

从 2018 年 10 月起， Bartek 开始在 Polish National Body 就任C++专家一职，这是一家直接与 ISO/IEC JTC 1/SC 22 (C++ Standardisation Committee) 工作的公司。

同月， Bartek 获得了 Microsoft 授予的 2019/2020 年度的 MVP 头衔荣誉。

在空闲时间，喜欢和他心爱的小儿子一起收集和拼装乐高模型。

Bartek 也是《[C++ 17 In Detail](https://leanpub.com/cpp17indetail)》的作者。

## 致谢

如果没有 C++ 专家 Tomasz Kamiński 的宝贵意见，本书就不可能完成（参见 [Tomek 在 Linkedin 上的简介](https://www.linkedin.com/in/tomasz-kami%C5%84ski-208572b1/)）。

Tomek 在我们位于克拉科夫的 Local C++ 用户组中主持了关于 Lambda “历史”的现场编码演示：[Lambdas: From C++11 to C++20](https://www.meetup.com/pl-PL/C-User-Group-Cracow/events/258795519/)。

本书中使用的很多例子都来自那次会议。

尽管本书的初版相对较短，但后续扩展版本（额外的 100 页）是我从 JFT（John Taylor） 那得到返回和鼓励的结果。

John 花费了大量时间寻找可以改进和扩展的细节。

此外，我要对提供了很多有关 Lambda 返回内容的 [Dawid Pilarski](panicsoftware.com/about-me) 表示感谢。

最后也是相当重要的，我从博客读者、Patreon 论坛以及 C++ Polska 的讨论中获得了大量反馈和评论。

谢谢你们！

## 校阅历史

- 2019 年 03 月 25 日 - 第一版上线！
- 2020 年 01 月 05 日 - 语法、更好的例子、措辞、IIFE 部分、C++20 更新。
- 2020 年 04 月 17 日 - C++20 章节重写、语法、措辞、布局。
- 2020 年 04 月 30 日 - 从 C++11、C++17 和 C++20中的 lambda 派生
- 2020 年 06 月 19 日 - 主要更新：
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
