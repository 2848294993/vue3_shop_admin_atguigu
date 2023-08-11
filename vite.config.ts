import { defineConfig, loadEnv } from 'vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  //获取各种环境下对应的环境变量
  let env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        mockPath: './src/mock', // mock文件存放的位置
        localEnabled: command === 'serve', //在开发环境中启用 mock
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
    //配置代理
    server: {
      proxy: {
        // 所有以/api开头的请求
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_SERVER,
          changeOrigin: true,
          // 这个path和模块path没有关系
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }

  }
}
