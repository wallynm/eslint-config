# ESLint Config

Custom ESLint configuration and rules.

## Custom Rules

### no-template-classname

This rule enforces the usage of a utility function (like `clsx` or `cn`) over template strings in className attributes.

#### Configuration

You can configure the import name and path for the utility function using the rule options:

```js
// When using the rule in your ESLint configuration:
{
  "rules": {
    // Default configuration - will use clsx from 'clsx'
    "no-template-classname": "error",
    
    // OR with custom configuration:
    "no-template-classname": ["error", { 
      "importName": "cn", 
      "importPath": "@tessel/utils" 
    }]
  }
}
```

#### Examples

This rule will transform:

```jsx
<div className={`container ${isActive ? 'active' : ''} ${variant}`}></div>
```

Into:

```jsx
// With default config
import { clsx } from 'clsx'
<div className={clsx('container', isActive ? 'active' : '', variant)}></div>

// OR with custom config
import { cn } from '@tessel/utils'
<div className={cn('container', isActive ? 'active' : '', variant)}></div>
```

## Usage with Different Projects

You can configure the rule differently for different projects:

```js
// Project A - using clsx
rules: {
  "no-template-classname": "error" // Uses default (clsx from 'clsx')
}

// Project B - using cn from @tessel/utils
rules: {
  "no-template-classname": ["error", { 
    importName: "cn", 
    importPath: "@tessel/utils" 
  }]
}

// Project C - using tailwind-merge
rules: {
  "no-template-classname": ["error", { 
    importName: "twMerge", 
    importPath: "tailwind-merge" 
  }]
}
``` 