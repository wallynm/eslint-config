import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import pluginNext from "@next/eslint-plugin-next";
import baseConfig from "./base.js";

/** @type {import("eslint").Linter.FlatConfig[]} */
export const nextJsConfig = [
  { 
    ignores: [
      "dist/**", 
      "node_modules/**", 
      ".next/**", 
      ".turbo/**", 
      "coverage/**",
      "eslint.config.js",
      "next.config.js",
      "next.config.mjs",
      "postcss.config.js",
      "postcss.config.cjs",
      "postcss.config.mjs",
      "tailwind.config.js",
      "tailwind.config.ts", 
    ]
  },
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...baseConfig,

  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        project: true,
      },
    },
    plugins: {
      "@next/next": pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
      "react/react-in-jsx-scope": "off",
    },
    settings: { react: { version: "detect" } },
  },

  {
    files: ["**/*.{js,jsx,mjs,cjs}"],
    plugins: {
       "@next/next": pluginNext,
    },
    rules: {
      "@typescript-eslint/await-thenable": "off",
      "@typescript-eslint/no-floating-promises": "off",
       "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-require-imports": "off", // Allow require in JS
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unnecessary-condition": "off",
    },
    settings: { react: { version: "detect" } },
  },
];

export default nextJsConfig;
