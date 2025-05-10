export default {
    meta: {
      type: 'layout',
      docs: {
        description: 'Garante que operadores & e | estejam no final da linha anterior e que tipos literais fiquem por último na interseção',
      },
      fixable: 'code',
      schema: [],
      messages: {
        operatorLinebreak: 'O operador `{{operator}}` deve estar ao final da linha anterior.',
        objectTypeLast: 'O tipo literal `{}` deve ser o último na interseção.',
      },
    },
  
    create(context) {
      const sourceCode = context.getSourceCode();
  
      function checkLinebreaks(node) {
        const types = node.types;
  
        for (let i = 1; i < types.length; i++) {
          const prev = types[i - 1];
          const curr = types[i];
  
          const operatorToken = sourceCode.getTokenBefore(curr, token =>
            token.value === '&' || token.value === '|'
          );
  
          if (!operatorToken) continue;
  
          const prevLine = sourceCode.getLocFromIndex(prev.range[1]).line;
          const opLine = sourceCode.getLocFromIndex(operatorToken.range[0]).line;
  
          if (opLine !== prevLine) {
            context.report({
              node: operatorToken,
              messageId: 'operatorLinebreak',
              data: { operator: operatorToken.value },
              fix(fixer) {
                return fixer.replaceTextRange(
                  [operatorToken.range[0], curr.range[0]],
                  ` ${operatorToken.value} `
                );
              },
            });
          }
        }
      }
  
      function checkObjectTypeOrder(node) {
        const types = node.types;
        const objectIndex = types.findIndex(t => t.type === 'TSTypeLiteral');
        const refIndex = types.findIndex(t => t.type === 'TSTypeReference');
  
        if (objectIndex !== -1 && refIndex !== -1 && objectIndex < refIndex) {
          context.report({
            node,
            messageId: 'objectTypeLast',
            fix(fixer) {
              const reordered = [...types].sort((a, b) => {
                if (a.type === 'TSTypeLiteral') return 1;
                if (b.type === 'TSTypeLiteral') return -1;
                return 0;
              });
  
              const replacement = reordered.map(t => sourceCode.getText(t)).join(' & ');
              return fixer.replaceText(node, replacement);
            },
          });
        }
      }
  
      return {
        TSUnionType: checkLinebreaks,
        TSIntersectionType(node) {
          checkLinebreaks(node);
          checkObjectTypeOrder(node);
        },
      };
    },
  };
  