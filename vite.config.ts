import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import path from 'node:path';

export default defineConfig({
  plugins: [vue(), cssInjectedByJsPlugin()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/components/index.ts'),
      name: 'vue3MonthRangePicker',
      fileName: (format) => `vue3-month-range-picker.${format}.js`,
      formats: ['es', 'umd', 'cjs'], // 支援多種格式
    },
    minify: 'terser', // 強制使用 Terser 來壓縮
    terserOptions: {
      compress: {
        drop_console: true, // 移除 console.log
        drop_debugger: true, // 移除 debugger
      },
      format: {
        comments: false, // 移除註解
      },
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        compact: true, // 讓 Rollup 壓縮輸出
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
