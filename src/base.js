import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import perfectionist from 'eslint-plugin-perfectionist';
import pluginReactHooks from "eslint-plugin-react-hooks";
import stylistic from '@stylistic/eslint-plugin';
import stylisticJsx from '@stylistic/eslint-plugin-jsx';
import stylisticJs from '@stylistic/eslint-plugin-js';
import eslintPluginDesctructuring from 'eslint-plugin-newline-destructuring';
import noCommentsAllowed from './eslint-rules/no-comments-allowed.js';
import noTemplateInClassName from './eslint-rules/no-template-classname.js';
import typeOperatorStyle from './eslint-rules/type-operator-style.js';
import noExportDefaultFunction from './eslint-rules/no-export-default-function.js';
import useClientFirstLine from './eslint-rules/use-client-first-line.js';

import pluginReact from "eslint-plugin-react";

const commonPlugins = {
  turbo: turboPlugin,
  '@stylistic': stylistic,
  '@stylistic/jsx': stylisticJsx,
  '@stylistic/js': stylisticJs,
  perfectionist,
  'newline-destructuring': eslintPluginDesctructuring,
  'custom-rules': {
    rules: {
      'no-comments-allowed': noCommentsAllowed,
      'no-template-classname': noTemplateInClassName,
      'type-operator-style': typeOperatorStyle,
      'no-export-default-function': noExportDefaultFunction,
      'use-client-first-line': useClientFirstLine,
    },
  },
  'react-hooks': pluginReactHooks,
  'react': pluginReact,
};

const commonLanguageOptions = {
  parser: tseslint.parser,
  parserOptions: {
    project: './tsconfig.json',
  },
  globals: {
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
  },
};

const commonRules = {
  ...pluginReact.configs.recommended.rules,
  ...pluginReactHooks.configs.recommended.rules,
  'perfectionist/sort-imports': [
    'error',
    {
      type: 'alphabetical',
      order: 'asc',
      ignoreCase: true,
      specialCharacters: 'keep',
      internalPattern: ['^@tessel/.+', '^@/.+'],
      partitionByComment: false,
      partitionByNewLine: false,
      newlinesBetween: 'always',
      maxLineLength: undefined,
      groups: [
        'react',
        'external',
        'internal',
        ['parent-type', 'sibling-type', 'index-type'],
        ['parent', 'sibling', 'index'],
        'object',
        'unknown',
      ],
      customGroups: {
        value: {
          react: ['^react', '^react-.*'],
          external: ['^next', '^@react', '^[^@]'],
          internal: ['^@/', '^@tessel/']
        },
        type: {
          react: ['^react', '^react-.*'],
          external: ['^next', '^@react', '^[^@]'],
          internal: ['^@/', '^@tessel/']
        }
      },
      environment: 'node',
    },
  ],
  // Custom rules
  'custom-rules/no-comments-allowed': 'error',
  'custom-rules/no-template-classname': 'error',
  'custom-rules/type-operator-style': 'error',
  'custom-rules/no-export-default-function': 'error',
  'custom-rules/use-client-first-line': 'error',

  // Eslint
  "func-style": ["error", "expression", { "allowArrowFunctions": true }],
  "no-console": "off",
  'newline-destructuring/newline': 'error',
  "semi": ["error", "never"],
  "react/react-in-jsx-scope": "off",

  // Disable unsafe rules
  "@typescript-eslint/no-unsafe-member-access": "off",
  '@typescript-eslint/no-unsafe-argument': 'off',
  "@typescript-eslint/no-unsafe-assignment": "off",
  "@typescript-eslint/no-unsafe-return": "off",
  "@typescript-eslint/no-unsafe-call": "off",
  "@typescript-eslint/no-unnecessary-condition": "off",

  
  // Typescript (non-type-aware)
  "@typescript-eslint/no-explicit-any": ["warn", { "ignoreRestArgs": true }],
  '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
  '@typescript-eslint/no-floating-promises': 'error',
  "react/no-unstable-nested-components": ["error", { "allowAsProps": true }],

  // Stylistic JSX
  "@stylistic/jsx/jsx-closing-bracket-location": ["error"],
  "@stylistic/jsx/jsx-closing-tag-location": ["error", "tag-aligned"],
  "@stylistic/jsx/jsx-curly-spacing": ["error", { "when": "never", "children": true }],
  "@stylistic/jsx/jsx-curly-newline": ["error", "consistent"],
  "@stylistic/jsx/jsx-first-prop-new-line": ["error", "multiline-multiprop"],

  // Stylistic JS
  '@stylistic/js/operator-linebreak': ['error', 'after'],
  "@stylistic/js/object-curly-newline": ["error", {
    ObjectExpression: { multiline: true, consistent: true },
    ObjectPattern: { multiline: true, consistent: true },
    ImportDeclaration: { multiline: true, consistent: true }
  }],
  "@stylistic/js/object-property-newline": ["error", {
    allowAllPropertiesOnSameLine: false
  }],
  '@stylistic/js/comma-dangle': ['error', {
    arrays: 'always-multiline',
    objects: 'always-multiline',
    imports: 'always-multiline',
    exports: 'always-multiline',
    functions: 'never'
  }],

  // Stylistic (General)
  "@stylistic/jsx-quotes": ["error", "prefer-double"],
  "@stylistic/jsx-wrap-multilines": ["error", {
    "declaration": "parens-new-line",
    "assignment": "parens-new-line",
    "return": "parens-new-line",
    "arrow": "parens-new-line",
    "condition": "parens-new-line",
    "logical": "parens-new-line",
    "prop": "parens-new-line",
    "propertyValue": "parens-new-line"
  }],
  // "@stylistic/jsx-closing-bracket-location": ["error"], // Duplicate
  // "@stylistic/jsx-closing-tag-location": ["error", "tag-aligned"], // Duplicate
  "@stylistic/jsx-max-props-per-line": ["error", { "maximum": 2 }],
  "@stylistic/indent": ["error", 2, { "MemberExpression": 1, "ObjectExpression": 1 }],
  // "@stylistic/jsx-curly-spacing": ["error", { "when": "never", "children": true }], // Duplicate
  "@stylistic/jsx-equals-spacing": ["error", "never"],
  // "@stylistic/jsx-first-prop-new-line": ["error", "multiline-multiprop"], // Duplicate
  "@stylistic/function-call-argument-newline": ["error", "consistent"],
  "@stylistic/jsx-newline": [1, { "prevent": true, "allowMultilines": true }],
  "@stylistic/padding-line-between-statements": ["error", { "blankLine": "always", "prev": "*", "next": "return" }],
  "no-duplicate-imports": "error",
  "turbo/no-undeclared-env-vars": "warn",
  "@stylistic/quotes": ["error", "double", { "avoidEscape": true }],
  // "@stylistic/no-require-imports": "off", // This is likely a typescript rule now?
  "no-unused-vars": "off", // Use typescript version

  // Typescript
  "@typescript-eslint/no-unused-vars": [1,
    {
      argsIgnorePattern: "^_",
      varsIgnorePattern: "^_",
      caughtErrorsIgnorePattern: "^_",
    },
  ],
};

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
  languageOptions: commonLanguageOptions,
  rules: commonRules,
  "settings": {
    "react": {
      "version": "detect"
    }
  }
};

const testConfig = {
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
  plugins: commonPlugins,
  languageOptions: {
    ...commonLanguageOptions,
    globals: {
      ...commonLanguageOptions.globals,
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
};

export default tseslint.config(
  ...tseslint.configs.recommendedTypeChecked,
  scriptConfig,
  testConfig
);

