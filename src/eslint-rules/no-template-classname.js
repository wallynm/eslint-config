export default {
  meta: {
    type: "suggestion",
    fixable: "code",
    docs: {
      description: "Enforce usage of utility function over template strings in className",
    },
    messages: {
      useCn: "Prefer the usage of utility function over template strings in className",
    },
    schema: [
      {
        type: "object",
        properties: {
          importName: {
            type: "string",
            default: "clsx",
          },
          importPath: {
            type: "string",
            default: "clsx",
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    const sourceCode = context.getSourceCode()
    const options = context.options[0] || {}
    const importName = options.importName || "clsx"
    const importPath = options.importPath || "clsx"

    return {
      JSXAttribute(node) {
        if (
          node.name.name !== "className" ||
          !node.value ||
          node.value.type !== "JSXExpressionContainer" ||
          node.value.expression.type !== "TemplateLiteral"
        ) {
          return
        }

        const template = node.value.expression
        const staticStrings = []
        const dynamicExprs = []

        for (let i = 0; i < template.quasis.length; i++) {
          const str = template.quasis[i].value.cooked.trim()
          if (str) {
            staticStrings.push(...str.split(/\s+/).map(s => `'${s}'`))
          }

          if (template.expressions[i]) {
            const exprText = sourceCode.getText(template.expressions[i])
            dynamicExprs.push(exprText)
          }
        }

        context.report({
          node: node.value,
          messageId: "useCn",
          fix(fixer) {
            const allArgs = [...staticStrings, ...dynamicExprs].join(", ")
            const replacement = `${importName}(${allArgs})`
            const fixes = [fixer.replaceText(node.value, `{${replacement}}`)]

            const hasImport = sourceCode.ast.body.some(
              (n) =>
                n.type === "ImportDeclaration" &&
                n.source.value === importPath &&
                n.specifiers.some(
                  (s) => s.type === "ImportSpecifier" && s.imported.name === importName
                )
            )

            if (!hasImport) {
              fixes.push(
                fixer.insertTextBeforeRange(
                  [0, 0],
                  `import { ${importName} } from "${importPath}"\n`
                )
              )
            }

            return fixes
          },
        })
      },
    }
  },
}
