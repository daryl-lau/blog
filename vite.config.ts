import { loadEnv, ConfigEnv, Plugin } from "vite";
import type { UserConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import { Plugin as importToCDN } from "vite-plugin-cdn-import";
interface SourcemapExclude {
  excludeNodeModules?: boolean;
}
export function sourcemapExclude(opts?: SourcemapExclude): Plugin {
  return {
    name: "sourcemap-exclude",
    transform(code: string, id: string) {
      if (opts?.excludeNodeModules && id.includes("node_modules")) {
        return {
          code,
          // https://github.com/rollup/rollup/blob/master/docs/plugin-development/index.md#source-code-transformations
          map: { mappings: "" },
        };
      }
    },
  };
}

export default ({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  return {
    plugins: [
      sourcemapExclude({ excludeNodeModules: true }),
      react(),
      importToCDN({
        modules: [
          {
            name: "react",
            var: "React",
            path: "https://cdn.staticfile.org/react/18.2.0/umd/react.production.min.js",
          },
          {
            name: "react-dom",
            var: "ReactDOM",
            path: "https://cdn.staticfile.org/react-dom/18.2.0/umd/react-dom.production.min.js",
          },
          {
            name: "axios",
            var: "axios",
            path: "https://cdn.staticfile.org/axios/1.4.0/axios.min.js",
          },
          {
            name: "lodash",
            var: "_",
            path: "https://cdn.staticfile.org/lodash.js/4.17.21/lodash.min.js",
          },
          {
            name: "moment",
            var: "moment",
            path: "https://cdn.staticfile.org/moment.js/2.29.4/moment.min.js",
          },
          {
            name: "jquery",
            var: "$",
            path: "https://cdn.staticfile.org/jquery/3.6.4/jquery.min.js",
          },
        ],
      }),
    ],
    base: env.VITE_APP_BASE_URL,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `@import "${path.resolve(
            __dirname,
            "src/assets/styles/index.less"
          )}";`,
        },
      },
    },
    build: {
      outDir: "build",
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (
              id.includes("node_modules/antd") ||
              id.includes("node_modules/react-markdown-editor-cm5") ||
              id.includes("node_modules/highlight.js") ||
              id.includes("node_modules/codemirror") ||
              id.includes("node_modules/mermaid") ||
              id.includes("node_modules/elkjs") ||
              id.includes("node_modules/mathjax-full") ||
              id.includes("node_modules/cytoscape")
            ) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
          entryFileNames() {
            return "static/js/app-[hash].js";
          },
          chunkFileNames() {
            return "static/js/[name]-[hash].js";
          },
          assetFileNames(chunk) {
            if (chunk.name?.endsWith(".css")) {
              return "static/css/[name]-[hash].[ext]";
            }
            if (
              /.(png|PNG|jpg|JPG|gif|GIF|jpeg|JPEG|webp|WEBP|svg|SVG|ttf|TTF)$/.test(
                chunk.name || ""
              )
            ) {
              return "static/media/[name]-[hash].[ext]";
            }
            return `other/[name]-[hash].[ext]`;
          },
        },
      },
      sourcemap: false,
    },
    server: {
      proxy: {
        "/api": {
          target: "http://baihuzi.com:1993",
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
};
