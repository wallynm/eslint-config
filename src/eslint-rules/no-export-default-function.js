export default {
    meta: {
      type: 'problem',
      docs: {
        description: 'Disallow `export default function` declarations and auto-fix to arrow function with const export',
      },
      fixable: 'code',
      messages: {
        noExportDefaultFunction: '`export default function` is not allowed. Use named const + export default instead.',
      },
      schema: [],
    },
  
    create(context) {
      const sourceCode = context.getSourceCode();
  
      return {
        ExportDefaultDeclaration(node) {
          const declaration = node.declaration;
  
          if (declaration.type === 'FunctionDeclaration') {
            const functionName = declaration.id?.name;
  
            if (!functionName) {
              // can't fix anonymous functions
              return context.report({
                node,
                messageId: 'noExportDefaultFunction',
              });
            }
  
            context.report({
              node,
              messageId: 'noExportDefaultFunction',
              fix(fixer) {
                const funcText = sourceCode.getText(declaration.body);
                const params = declaration.params.map(p => sourceCode.getText(p)).join(', ');
  
                const leadingComments = sourceCode.getCommentsBefore(node).map(c => sourceCode.getText(c)).join('\n');
                const newline = leadingComments ? '\n' : '';
  
                const replacement = `${leadingComments}${newline}const ${functionName} = (${params}) => ${funcText}\nexport default ${functionName}`;
  
                return fixer.replaceText(node, replacement);
              },
            });
          }
        },
      };
    },
  };
  