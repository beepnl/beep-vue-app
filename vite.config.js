import { readFileSync } from "node:fs";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";
import commonjs from "vite-plugin-commonjs";
import vueDevTools from "vite-plugin-vue-devtools";
import vuetify from "vite-plugin-vuetify";

import eslint from "vite-plugin-eslint";

const file = fileURLToPath(new URL("package.json", import.meta.url));
const json = readFileSync(file, "utf8");
const pkg = JSON.parse(json);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), vuetify(), commonjs(), eslint()],
  css: {
    devSourcemap: false,
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@assets/css/tokens" as *;`,
        api: "modern-compiler" // requires sass >=1.45 & vite >=5.4
      }
    }
  },
  define: {
    PKG: pkg
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL(".", import.meta.url)),
      "@public": fileURLToPath(new URL("public", import.meta.url)),
      "@src": fileURLToPath(new URL("src", import.meta.url)),
      "@api": fileURLToPath(new URL("src/api", import.meta.url)),
      "@router": fileURLToPath(new URL("src/router", import.meta.url)),
      "@views": fileURLToPath(new URL("src/router/views", import.meta.url)),
      "@layouts": fileURLToPath(new URL("src/router/layouts", import.meta.url)),
      "@components": fileURLToPath(new URL("src/components", import.meta.url)),
      "@assets": fileURLToPath(new URL("src/assets", import.meta.url)),
      "@utils": fileURLToPath(new URL("src/utils", import.meta.url)),
      "@plugins": fileURLToPath(new URL("src/plugins", import.meta.url)),
      "@state": fileURLToPath(new URL("src/state", import.meta.url)),
      "@modules": fileURLToPath(new URL("src/state/modules", import.meta.url)),
      "@mixins": fileURLToPath(new URL("src/mixins", import.meta.url))
    },
    build: {
      commonjsOptions: { transformMixedEsModules: true }
    }
  }
});
