import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
        input: {
          main: 'index.html',
          'fbapp-config.json': 'fbapp-config.json',
        },
        output: {
          entryFileNames: '[name]', // Output file names
        },
      },
  },
});
