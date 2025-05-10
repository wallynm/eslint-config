export default {
  meta: {
    type: "problem",
    fixable: "code",
    docs: {
      description: 'Garante que "use client" esteja na primeira linha do arquivo.',
    },
    schema: [],
    messages: {
      mustBeFirst: '"use client" deve ser a primeira linha do arquivo.',
    },
  },

  create(context) {
    return {
      Program(node) {
        const sourceCode = context.getSourceCode()
        const statements = node.body

        const directiveNode = statements.find(
          (stmt) =>
            stmt.type === "ExpressionStatement" &&
            stmt.expression.type === "Literal" &&
            stmt.expression.value === "use client"
        )

        if (!directiveNode) return

        const firstNonCommentToken = sourceCode.getFirstToken(node, { includeComments: false })
        const firstStatement = statements[0]

        if (directiveNode !== firstStatement) {
          context.report({
            node: directiveNode,
            messageId: "mustBeFirst",
            fix(fixer) {
              const directiveText = sourceCode.getText(directiveNode)

              const fixes = [fixer.remove(directiveNode)]

              fixes.push(fixer.insertTextBefore(firstStatement, `${directiveText}\n\n`))

              return fixes
            },
          })
        }
      },
    }
  },
}
