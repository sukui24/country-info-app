import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    DataSource: "src/database/DataSource.ts",
  },
  outDir: "dist",
  clean: true,
  ignore: [
    "**/*.md",
    "**/*.log",
    "node_modules/**/*",
    "test/**/*",
    ".history/**/*",
  ],
  minify: false,
  sourcemap: true,
  target: "node18",
  platform: "node",
});
