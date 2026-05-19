import js from "@eslint/js";
import skipFormatting from "eslint-config-prettier/flat";
import pluginOxlint from "eslint-plugin-oxlint";
import pluginVue from "eslint-plugin-vue";
import vuetify from "eslint-plugin-vuetify";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";

export default defineConfig([
  {
    name: "app/files-to-lint",
    files: ["**/*.{vue,js,mjs,jsx}"]
  },

  globalIgnores([
    "**/dist/**",
    "**/dist-ssr/**",
    "**/coverage/**",
    ".gitignore"
  ]),

  {
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  },

  js.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  ...vuetify.configs["flat/recommended-v4"],
  {
    rules: {
      "vue/no-mutating-props": "off",
      "no-unused-vars": "off",
      "no-undef": "off"
    }
  },

  ...pluginOxlint.buildFromOxlintConfigFile(".oxlintrc.json"),

  skipFormatting
]);
