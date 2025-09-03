import { defineConfig } from "vite";
import { string } from "rollup-plugin-string";

export default defineConfig({
  base: "/voronoi-myakumyaku-wgsl/",
  plugins: [
    string({
      include: "**/*.wgsl",
    }),
  ],
});
