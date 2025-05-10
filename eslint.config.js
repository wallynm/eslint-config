import _nextJsConfig from "./src/next.js"
import { config as reactConfig } from "./src/react.js"
import tseslint from "typescript-eslint"

/** @type {import('typescript-eslint').Config[]} */
const nextJsConfig = /** @type {any} */ (_nextJsConfig)

const parserOptions = {
  project: true,
  tsconfigRootDir: import.meta.dirname,
}

export default tseslint.config(
  {
    ignores: [
      "node_modules/",
      ".turbo/",
      ".next/",
      ".git/",
      "dist/",
      "build/",
      "coverage/",
      "**/*.json",
      "pnpm-lock.yaml",
      ".DS_Store",
      ".vscode/",
      ".github/",
      "**/*.md",
      "packages/eslint-config/",
    ],
  },
  
  {
    files: ["eslint.config.js", "src/**/*.js"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions,
    },
  },

  ...reactConfig,
  ...nextJsConfig.map(config => ({
    ...config,
    files: Array.isArray(config.files) ? 
      [...config.files, "apps/palantir/**/*.{ts,tsx,js,jsx}"] :
      ["apps/palantir/**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      ...(config.languageOptions || {}),
      parserOptions: {
        ...(config.languageOptions?.parserOptions || {}),
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  }))
)
