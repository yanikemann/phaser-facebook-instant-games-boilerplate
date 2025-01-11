import { defineConfig } from 'vite';
import copy from 'rollup-plugin-copy';
import { rmSync } from 'fs';
import { createRequire } from 'module'; // Import createRequire from Node.js

const require = createRequire(import.meta.url); // Create a CommonJS require function
const glob = require('glob'); // Use CommonJS require to import glob

export default defineConfig({
  server: {
    port: 4040,
  },
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
    {
      name: 'cleanup-generated-files',
      writeBundle() {
        try {
          // Match all files with the pattern
          const files = glob.sync('dist/assets/index-*.js');
          // Delete each matched file
          files.forEach((file) => rmSync(file));
          console.log(`Cleanup completed: Removed ${files.length} unnecessary files.`);
        } catch (err) {
          console.error('Error during cleanup:', err);
        }
      },
    },
  ],
});
