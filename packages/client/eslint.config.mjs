// @__ts-check

import es from "@eslint/js";
import ts from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";
import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import css from "eslint-plugin-css";

export default ts.config(
  es.configs.recommended,
  ts.configs.strict,
  react.configs.flat.recommended,
  css.configs["flat/recommended"],
  prettierConfig,
  {
    ignores: ["dist/", "node_modules/", "public/"],
  },
  {
    files: [
      "**/*.js",
      "**/*.jsx",
      "**/*.mjs",
      "**/*.cjs",
      "**/*.ts",
      "**/*.tsx",
    ],
    languageOptions: {
      globals: { ...globals.node, ...globals.browser },
    },
    plugins: {
      "@ypescript-eslint": ts.plugin,
      prettier: prettier,
      react: react,
      "react-hooks": reactHooks,
    },
    rules: {
      "prettier/prettier": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
    },
  },
);
