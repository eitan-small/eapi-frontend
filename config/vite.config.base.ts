import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import configArcoStyleImportPlugin from './plugin/arcoStyleImport';

export default defineConfig({
  plugins: [vue(), configArcoStyleImportPlugin()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, '../src'),
      },
      {
        find: 'assets',
        replacement: resolve(__dirname, '../src/assets'),
      },
      {
        find: 'vue',
        replacement: 'vue/dist/vue.esm-bundler.js', // compile template
      },
    ],
    extensions: ['.ts', '.js'],
  },
  define: {
    'process.env': {},
  },
});
