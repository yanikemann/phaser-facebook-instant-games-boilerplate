import { defineConfig } from 'vite';
import copy from 'rollup-plugin-copy';

export default defineConfig({
  build: {
    rollupOptions: {
      input: 'index.html', // Entry point for Vite
    },
    outDir: 'dist', // Output directory
    emptyOutDir: true, // Clears the output directory before building
  },
  plugins: [
    copy({
      targets: [
        { src: 'index.html', dest: 'dist' }, // Keep index.html
        { src: 'fbapp-config.json', dest: 'dist' }, // Keep fbapp-config.json
        { src: 'assets/**/*', dest: 'dist/assets' }, // Keep assets directory
      ],
      hook: 'writeBundle', // Ensures copying happens after the build
    }),
  ],
});
