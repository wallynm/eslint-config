import { RuleTester } from "eslint"
import noTemplateClassnameRule from "../src/eslint-rules/no-template-classname.js"

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
})

// Test default configuration (clsx from 'clsx')
ruleTester.run("no-template-classname - default config", noTemplateClassnameRule, {
  valid: [
    {
      code: "<div className={clsx('container', isActive ? 'active' : '', variant)}></div>",
    },
  ],
  invalid: [
    {
      code: "<div className={`container ${isActive ? 'active' : ''} ${variant}`}></div>",
      errors: [{ messageId: "useCn" }],
      output: "import { clsx } from \"clsx\"\n<div className={clsx('container', isActive ? 'active' : '', variant)}></div>",
    },
  ],
})

// Test custom configuration (cn from @tessel/utils)
ruleTester.run("no-template-classname - custom config", noTemplateClassnameRule, {
  valid: [
    {
      code: "<div className={cn('container', isActive ? 'active' : '', variant)}></div>",
      options: [{ importName: "cn", importPath: "@tessel/utils" }],
    },
  ],
  invalid: [
    {
      code: "<div className={`container ${isActive ? 'active' : ''} ${variant}`}></div>",
      options: [{ importName: "cn", importPath: "@tessel/utils" }],
      errors: [{ messageId: "useCn" }],
      output: "import { cn } from \"@tessel/utils\"\n<div className={cn('container', isActive ? 'active' : '', variant)}></div>",
    },
  ],
})

// Test another custom configuration (twMerge from tailwind-merge)
ruleTester.run("no-template-classname - tailwind-merge config", noTemplateClassnameRule, {
  valid: [
    {
      code: "<div className={twMerge('container', isActive ? 'active' : '', variant)}></div>",
      options: [{ importName: "twMerge", importPath: "tailwind-merge" }],
    },
  ],
  invalid: [
    {
      code: "<div className={`container ${isActive ? 'active' : ''} ${variant}`}></div>",
      options: [{ importName: "twMerge", importPath: "tailwind-merge" }],
      errors: [{ messageId: "useCn" }],
      output: "import { twMerge } from \"tailwind-merge\"\n<div className={twMerge('container', isActive ? 'active' : '', variant)}></div>",
    },
  ],
}) 