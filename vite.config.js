// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname, 'src/main/resources/templates'),
  plugins: [react()],
  server: {
    // If there are specific server settings like proxies, define them here
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'), // Adjust this path as needed
  },
});
