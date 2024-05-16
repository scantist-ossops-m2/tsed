import {fileURLToPath} from "node:url";
import {resolve} from "path";
import {defineConfig} from "vite";
import dts from "vite-plugin-dts";
import {viteExternalsPlugin} from "vite-plugin-externals";
import strip from "vite-plugin-strip";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    viteExternalsPlugin({
      "@tsed/core": "@tsed/core",
      "@tsed/schema": "@tsed/schema"
    }),
    strip({
      enabled: true,
      domainList: [],
      start: "node_env:start",
      end: "node_env:end"
    }),
    dts({
      outDir: "lib/browser/types",
      include: ["src/browser", "src/common"],
      exclude: ["**/*.spec.{ts,tsx}", "**/*.stories.{ts,tsx}"]
    })
  ],
  resolve: {
    alias: {
      picomatch: fileURLToPath(import.meta.resolve("picomatch-browser"))
    }
  },
  build: {
    outDir: "lib/browser",
    lib: {
      entry: resolve(import.meta.dirname, "src/index.ts"),
      formats: ["umd", "es"],
      name: "@tsed/json-mapper",
      fileName: "json-mapper"
    }
  }
});
