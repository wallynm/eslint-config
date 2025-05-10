export default {
  meta: {
    type: 'suggestion',
    fixable: 'code',
    docs: {
      description: 'Enforce usage of `cn()` over template strings in className',
    },
    messages: {
      useCn: 'Prefira utilizar o utilitário `cn()` em vez de template strings em className',
    },
    schema: [],
  },
  create(context) {
    const sourceCode = context.getSourceCode()

    return {
      JSXAttribute(node) {
        if (
          node.name.name !== 'className' ||
          !node.value ||
          node.value.type !== 'JSXExpressionContainer' ||
          node.value.expression.type !== 'TemplateLiteral'
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
          messageId: 'useCn',
          fix(fixer) {
            const allArgs = [...staticStrings, ...dynamicExprs].join(', ')
            const replacement = `cn(${allArgs})`
            const fixes = [fixer.replaceText(node.value, `{${replacement}}`)]

            const hasCnImport = sourceCode.ast.body.some(
              (n) =>
                n.type === 'ImportDeclaration' &&
                n.source.value === '@tessel/utils' &&
                n.specifiers.some(
                  (s) => s.type === 'ImportSpecifier' && s.imported.name === 'cn'
                )
            )

            if (!hasCnImport) {
              fixes.push(
                fixer.insertTextBeforeRange(
                  [0, 0],
                  `import { cn } from "@tessel/utils"\n`
                )
              )
            }

            return fixes
          }
        })
      }
    }
  }
}
