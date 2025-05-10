import _nextJsConfig from "./src/next.js"
import tseslint from "typescript-eslint"
import {
  noTemplateClassname,
  noCommentsAllowed,
  noExportDefaultFunction,
  typeOperatorStyle,
  useClientFirstLine
} from "./src/eslint-rules/index.js"


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
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    plugins: {
      custom: {
        rules: {
          "no-template-classname": noTemplateClassname,
          "no-comments-allowed": noCommentsAllowed,
          "no-export-default-function": noExportDefaultFunction,
          "type-operator-style": typeOperatorStyle,
          "use-client-first-line": useClientFirstLine,
        }
      }
    }
  },
  {
    rules: {
      "custom/no-template-classname": ["error", { 
        importName: "clsx", 
        importPath: "clsx"
      }],
      "custom/no-comments-allowed": "error",
      "custom/no-export-default-function": "error",
      "custom/type-operator-style": "error",
      "custom/use-client-first-line": "error",
    }
  }
)
