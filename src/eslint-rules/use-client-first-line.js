export default {
  meta: {
    type: 'problem',
    fixable: 'code',
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
        const sourceCode = context.getSourceCode();
        const statements = node.body;

        // Procura "use client"
        const directiveNode = statements.find(
          (stmt) =>
            stmt.type === 'ExpressionStatement' &&
            stmt.expression.type === 'Literal' &&
            stmt.expression.value === 'use client'
        );

        if (!directiveNode) return;

        // Encontra a posição correta: antes de qualquer import ou declaração
        const firstNonCommentToken = sourceCode.getFirstToken(node, { includeComments: false });
        const firstStatement = statements[0];

        if (directiveNode !== firstStatement) {
          context.report({
            node: directiveNode,
            messageId: 'mustBeFirst',
            fix(fixer) {
              const directiveText = sourceCode.getText(directiveNode);

              // Remove "use client" da posição atual
              const fixes = [fixer.remove(directiveNode)];

              // Inserir no topo do programa (antes do primeiro statement)
              fixes.push(fixer.insertTextBefore(firstStatement, `${directiveText}\n\n`));

              return fixes;
            },
          });
        }
      },
    };
  },
};
