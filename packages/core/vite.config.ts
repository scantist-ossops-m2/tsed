import {defineConfig} from "vite";
import dts from "vite-plugin-dts";
import strip from "vite-plugin-strip";
import {resolve} from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    strip({
      enabled: true,
      domainList: [],
      start: "node_env:start",
      end: "node_env:end"
    }),
    dts({
      outDir: "lib/browser/types",
      include: ["src"],
      exclude: ["**/*.spec.{ts,tsx}", "**/*.stories.{ts,tsx}"]
    })
  ],
  build: {
    outDir: "lib/browser",
    lib: {
      entry: resolve(import.meta.dirname, "src/index.ts"),
      formats: ["umd", "es"],
      name: "@tsed/core",
      fileName: "core"
    }
  }
});
