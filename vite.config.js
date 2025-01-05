import { defineConfig } from 'vite';
import copy from 'rollup-plugin-copy';

export default defineConfig({
  build: {
    rollupOptions: {
      input: 'index.html', // Entry point for the app
    },
    assetsInlineLimit: 0, // Ensures assets aren't inlined as base64
    outDir: 'dist', // Output directory for the build
    emptyOutDir: true, // Clears the output directory before building
  },
  plugins: [
    copy({
      targets: [
        { src: 'assets/**/*', dest: 'dist/assets' }, // Copy all files from 'assets/' to 'dist/assets'
        { src: 'fbapp-config.json', dest: 'dist' }, // Copy 'fbapp-config.json' to 'dist'
      ],
      hook: 'writeBundle', // Ensure files are copied after the build is done
    }),
  ],
});
