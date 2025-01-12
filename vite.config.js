// import path from "path";
// import react from "@vitejs/plugin-react";
// import { defineConfig } from "vite";
// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   base: "/", // This should match your deployment environment
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// });
import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
export default defineConfig({
    plugins: [react()],
    base: "/",
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        outDir: "dist",
        sourcemap: true,
        rollupOptions: {
            output: {
                manualChunks: undefined,
            },
        },
    },
});
