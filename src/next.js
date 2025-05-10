import baseConfig from "./base.js"
import js from "@eslint/js"
import pluginNext from "@next/eslint-plugin-next"
import eslintConfigPrettier from "eslint-config-prettier"
import { defineConfig } from "eslint/config"
import tseslint from "typescript-eslint"

const nextJsConfig = defineConfig([
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...baseConfig,
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
    ],
    files: ["**/*.{js,jsx,mjs,cjs}"],
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
      "@typescript-eslint/await-thenable": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unnecessary-condition": "off",
    },
    settings: { react: { version: "detect" } },
  },
])


export default nextJsConfig
