// @__ts-check

import es from "@eslint/js";
import ts from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";
import prettier from "eslint-plugin-prettier";
import globals from "globals";

export default ts.config(
  es.configs.recommended,
  ts.configs.strict,
  prettierConfig,
  {
    ignores: ["dist/", "node_modules/"],
  },
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    languageOptions: {
      globals: { ...globals.node },
    },
    plugins: { "@ypescript-eslint": ts.plugin, prettier: prettier },
    rules: {
      "prettier/prettier": "error",
    },
  },
);
