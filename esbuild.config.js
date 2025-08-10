import { build } from "esbuild";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = {
  entryPoints: ["src/server.ts"],
  bundle: true,
  outfile: "dist/server.js",
  platform: "node",
  target: "node22",
  format: "esm",
  minify: true,
  sourcemap: true,
  external: [
    // Don't bundle Node.js built-ins
    "fs",
    "path",
    "http",
    "https",
    "url",
    "crypto",
    "events",
    "stream",
    "util",
    "os",
    // Keep these as external dependencies (optional - comment out to bundle them)
    "express",
    "cors",
    "body-parser",
    "pino-http"
  ],
  define: {
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "production")
  },
  loader: {
    ".ts": "ts"
  },
  tsconfig: "tsconfig.build.json"
};

try {
  await build(config);
  console.log("✅ Build completed successfully!");
} catch (error) {
  console.error("❌ Build failed:", error);
  process.exit(1);
}
