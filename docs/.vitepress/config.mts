import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "C++ Lambda Story",
    description: "Chinese Edition",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [

        ],

        sidebar: [
            {
                text: 'C++ Lambda Story',
                items: [
                    { text: '关于此书', link: '/chapters/chapter0/README.md' },
                    { text: 'Lambda in C++98/03', link: '/chapters/chapter1/README.md' },
                    { text: 'Lambda in C++11', link: '/chapters/chapter2/README.md' },
                    { text: 'Lambda in C++14', link: '/chapters/chapter3/README.md' },
                    { text: 'Lambda in C++17', link: '/chapters/chapter4/README.md' },
                    { text: 'Lambda in C++20', link: '/chapters/chapter5/README.md' }
                ]
            }
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/nolongerwait/cpp_lambda_story_chinese_edition' }
        ]
    }
})
