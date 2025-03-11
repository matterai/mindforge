import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist/renderer",
    emptyOutDir: true,
    // Ensure assets are correctly referenced when built for Electron
    assetsDir: "assets",
    // Prevent chunks for better Electron compatibility
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  server: {
    port: 5175,
  },
});
