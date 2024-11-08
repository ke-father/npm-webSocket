import resolve from '@rollup/plugin-node-resolve'  // 用于解析第三方模块
import commonjs from '@rollup/plugin-commonjs'   // 用于将CommonJS模块转换为ES模块
import typescript from 'rollup-plugin-typescript2'  //用于TypeScript编译
import json from 'rollup-plugin-json' // 用于处理JSON文件
import terser from '@rollup/plugin-terser' // 用于压缩代码

export default {
    // 指定输入文件的路径，这里是项目的入口点
    input: `./src/index.ts`,
    output: [
        {
            // 指定输出文件的路径和名称
            file: './dist/index.js'
        },
        {
            name: 'MyWebSocket',
            file: './dist/index.min.js',
            format: 'umd',
            plugins: [terser()]
        }
    ],
    // 使用的插件列表，这里只包含typescript插件，用于编译TypeScript代码
    plugins: [
        json(),
        typescript({useTsconfigDeclarationDir: true}),
        resolve(),
        commonjs()
    ],
}
