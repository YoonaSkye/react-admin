import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { viteMockServe } from 'vite-plugin-mock';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig(({ command, mode }) => {
  //获取各种环境下的对应的变量
  let env = loadEnv(mode, process.cwd());
  return {
    plugins: [react(), viteMockServe({ mockPath: 'mock' })],
    resolve: {
      alias: {
        '@': path.resolve('./src'), // 相对路径别名配置，使用 @ 代替 src
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          /**
           * 这里使用 @import 写法会导致sass报错，改为 '@use "引入文件路径" as *;'写法(记得加；)
           */
          additionalData: '@use "@/styles/variable.scss" as *;',
        },
      },
    },
    // 代理跨域
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          //获取数据的服务器地址设置
          target: env.VITE_SERVER,
          // 需要代理跨域
          changeOrigin: true,
          // 路径重写， 将开头的/api替代为空字符串
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
});
