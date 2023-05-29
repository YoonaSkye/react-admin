import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig(({ command, mode }) => {
  return {
    plugins: [react()],
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
  };
});
