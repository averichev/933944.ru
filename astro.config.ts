import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import { site } from "./app/content/site";

export default defineConfig({
  site: site.url,
  srcDir: "./app",
  output: "static",
  devToolbar: { enabled: false },
  build: { assets: "assets", inlineStylesheets: "always" },
  vite: { plugins: [tailwindcss()] },
});
