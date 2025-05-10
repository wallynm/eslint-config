import { commonPlugins, commonRules, globals } from "./base.js"
import { defineConfig } from "eslint/config"
import tseslint from "typescript-eslint"

const testConfig = defineConfig([
  {
    files: ["**/*.spec.ts", "**/*.spec.tsx", "**/*.test.ts", "**/*.test.tsx"],
    ignores: [
      "node_modules/**",
      ".turbo/**",
      ".next/**",
      "dist/**",
      "build/**",
      "coverage/**",
      "*.d.ts",
    ],
    plugins: {
      ...commonPlugins
    },
    languageOptions: {
      parser: tseslint.parser,
      globals: {
        ...globals,
        it: "readonly",
        describe: "readonly",
        expect: "readonly",
        vi: "readonly",
        jest: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        test: "readonly",
      },
    },
    rules: {  
      ...commonRules,
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unnecessary-condition": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "react/display-name": "off",
    },
  },
])

export default testConfig