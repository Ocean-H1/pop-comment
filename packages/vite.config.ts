import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue' // 处理Vue文件
import DefineOptions from 'unplugin-vue-define-options/vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts' //生成类库的声明文件.d.ts

const input = resolve('src') // 入口文件
const output = resolve('dist') // 输出文件

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    DefineOptions(),
    dts({
      include: ['src/**/*'],
      exclude: ['node_modules/**']
    })
  ],
  resolve: {
    alias: [
      {
        find: '~',
        replacement: resolve('src')
      }
    ]
  },
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  // 打包
  build: {
    outDir: output,
    lib: {
      entry: resolve(input, 'index.ts'),
      name: 'PopComment', // umd的变量名
      fileName: format => `index.${format}.js`,
      // 输出格式
      formats: ['es', 'umd']
    },
    rollupOptions: {
      output: {
        exports: 'named',
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus'
        }
      },
      // 打包过滤掉第三方库
      external: ['vue', 'element-plus']
    }
  }
})
