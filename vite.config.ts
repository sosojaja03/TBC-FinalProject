import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", // This should match your deployment environment
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
