import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  srcDir: "./app",
  output: "static",
  devToolbar: { enabled: false },
  build: { assets: "assets", inlineStylesheets: "always" },
  vite: { plugins: [tailwindcss()] },
});
