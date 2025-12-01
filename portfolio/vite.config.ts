import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/wilkerHop/',
  build: {
    outDir: '../docs',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        articles: resolve(__dirname, 'articles.html'),
        news: resolve(__dirname, 'news.html'),
      },
    },
  },
});
