import noCommentsAllowed from "./eslint-rules/no-comments-allowed.js"
import noExportDefaultFunction from "./eslint-rules/no-export-default-function.js"
import noTemplateInClassName from "./eslint-rules/no-template-classname.js"
import typeOperatorStyle from "./eslint-rules/type-operator-style.js"
import useClientFirstLine from "./eslint-rules/use-client-first-line.js"
import stylistic from "@stylistic/eslint-plugin"
import stylisticJs from "@stylistic/eslint-plugin-js"
import stylisticJsx from "@stylistic/eslint-plugin-jsx"
import eslintPluginDesctructuring from "eslint-plugin-newline-destructuring"
import perfectionist from "eslint-plugin-perfectionist"
import pluginReact from "eslint-plugin-react"
import pluginReactHooks from "eslint-plugin-react-hooks"
import turboPlugin from "eslint-plugin-turbo"
import tseslint from "typescript-eslint"

export const commonPlugins = {
  turbo: turboPlugin,
  "@stylistic": stylistic,
  "@stylistic/jsx": stylisticJsx,
  "@stylistic/js": stylisticJs,
  perfectionist,
  "newline-destructuring": eslintPluginDesctructuring,
  "react-hooks": pluginReactHooks,
  "react": pluginReact,
}

export const globals = {
  process: "readonly",
  React: "readonly",
  google: "readonly",
  mount: "readonly",
  mountWithRouter: "readonly",
  shallow: "readonly",
  shallowWithRouter: "readonly",
  context: "readonly",
  expect: "readonly",
  jsdom: "readonly",
  JSX: "readonly",
}

export const commonRules = {
  ...pluginReact.configs.recommended.rules,
  ...pluginReactHooks.configs.recommended.rules,
  "perfectionist/sort-imports": [
    "error",
    {
      type: "alphabetical",
      order: "asc",
      ignoreCase: true,
      specialCharacters: "keep",
      internalPattern: ["^@tessel/.+", "^@/.+"],
      partitionByComment: false,
      partitionByNewLine: false,
      newlinesBetween: "always",
      maxLineLength: undefined,
      groups: [
        "react",
        "external",
        "internal",
        ["parent-type", "sibling-type", "index-type"],
        ["parent", "sibling", "index"],
        "object",
        "unknown",
      ],
      customGroups: {
        value: {
          react: ["^react", "^react-.*"],
          external: ["^next", "^@react", "^[^@]"],
          internal: ["^@/", "^@tessel/"],
        },
        type: {
          react: ["^react", "^react-.*"],
          external: ["^next", "^@react", "^[^@]"],
          internal: ["^@/", "^@tessel/"],
        },
      },
      environment: "node",
    },
  ],

  "func-style": ["error", "expression", { "allowArrowFunctions": true }],
  "no-console": "off",
  "newline-destructuring/newline": "error",
  "semi": ["error", "never"],
  "react/react-in-jsx-scope": "off",

  "@typescript-eslint/no-unsafe-member-access": "off",
  "@typescript-eslint/no-unsafe-argument": "off",
  "@typescript-eslint/no-unsafe-assignment": "off",
  "@typescript-eslint/no-unsafe-return": "off",
  "@typescript-eslint/no-unsafe-call": "off",
  "@typescript-eslint/no-unnecessary-condition": "off",

  
  "@typescript-eslint/no-explicit-any": ["warn", { "ignoreRestArgs": true }],
  "@typescript-eslint/consistent-type-definitions": ["error", "type"],
  "@typescript-eslint/no-floating-promises": "error",
  "react/no-unstable-nested-components": ["error", { "allowAsProps": true }],

  "@stylistic/jsx/jsx-closing-bracket-location": ["error"],
  "@stylistic/jsx/jsx-closing-tag-location": ["error", "tag-aligned"],
  "@stylistic/jsx/jsx-curly-spacing": ["error", {
    "when": "never",
    "children": true, 
  }],
  "@stylistic/jsx/jsx-curly-newline": ["error", "consistent"],
  "@stylistic/jsx/jsx-first-prop-new-line": ["error", "multiline-multiprop"],

  "@stylistic/js/operator-linebreak": ["error", "after"],
  "@stylistic/js/object-curly-newline": ["error", {
    ObjectExpression: {
      multiline: true,
      consistent: true, 
    },
    ObjectPattern: {
      multiline: true,
      consistent: true, 
    },
    ImportDeclaration: {
      multiline: true,
      consistent: true, 
    },
  }],
  "@stylistic/js/object-property-newline": ["error", {
    allowAllPropertiesOnSameLine: false,
  }],
  "@stylistic/js/comma-dangle": ["error", {
    arrays: "always-multiline",
    objects: "always-multiline",
    imports: "always-multiline",
    exports: "always-multiline",
    functions: "never",
  }],

  "@stylistic/jsx-quotes": ["error", "prefer-double"],
  "@stylistic/jsx-wrap-multilines": ["error", {
    "declaration": "parens-new-line",
    "assignment": "parens-new-line",
    "return": "parens-new-line",
    "arrow": "parens-new-line",
    "condition": "parens-new-line",
    "logical": "parens-new-line",
    "prop": "parens-new-line",
    "propertyValue": "parens-new-line",
  }],
  "@stylistic/jsx-max-props-per-line": ["error", { "maximum": 2 }],
  "@stylistic/indent": ["error", 2, {
    "MemberExpression": 1,
    "ObjectExpression": 1, 
  }],
  "@stylistic/jsx-equals-spacing": ["error", "never"],
  "@stylistic/function-call-argument-newline": ["error", "consistent"],
  "@stylistic/jsx-newline": [1, {
    "prevent": true,
    "allowMultilines": true, 
  }],
  "@stylistic/padding-line-between-statements": ["error", {
    "blankLine": "always",
    "prev": "*",
    "next": "return", 
  }],
  "no-duplicate-imports": "error",
  "turbo/no-undeclared-env-vars": "warn",
  "@stylistic/quotes": ["error", "double", { "avoidEscape": true }],
  "no-unused-vars": "off", 

  "@typescript-eslint/no-unused-vars": [1,
    {
      argsIgnorePattern: "^_",
      varsIgnorePattern: "^_",
      caughtErrorsIgnorePattern: "^_",
    },
  ],
}

const scriptConfig = {
  files: ["**/*.{js,jsx,ts,tsx}"],
  ignores: [
    "dist/**",
    "node_modules/**",
    "**/*.spec.ts",
    "**/*.spec.tsx",
    "**/*.test.ts",
    "**/*.test.tsx",
    ".turbo/**",
    ".next/**",
    ".git/**",
    "build/**",
    "coverage/**",
    "*.json",
    "pnpm-lock.yaml",
    ".DS_Store",
    ".vscode/**",
    ".github/**",
    "*.md",
    "turbo.json",
    "package.json",
    "packages/eslint-config/**", 
    "*.d.ts",
  ],
  plugins: commonPlugins,
  languageOptions: {
    parser: tseslint.parser,
    globals: globals,
  },
  rules: commonRules,
  "settings": {
    "react": {
      "version": "detect",
    },
  },
}


export default [
  ...tseslint.configs.recommendedTypeChecked,
  scriptConfig,
]

