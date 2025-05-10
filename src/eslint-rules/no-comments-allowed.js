export default {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow comments except specific allowed ones",
    },
    fixable: "code",
    messages: {
      unexpected: "Comentários não permitidos, exceto: @ts-ignore, eslint-disable*, e @type",
    },
    schema: [],
  },

  create(context) {
    return {
      Program() {
        const sourceCode = context.getSourceCode()
        const comments = sourceCode.getAllComments()
        const lines = sourceCode.lines

        for (const comment of comments) {
          const text = sourceCode.getText(comment).trim()

          const allowed = [
            "@ts-ignore",
            "eslint-disable",
            "eslint-disable-line",
            "eslint-disable-next-line",
            "@type",
          ]

          const isAllowed = allowed.some(allowedText => text.includes(allowedText))
          if (isAllowed) continue

          context.report({
            loc: comment.loc,
            messageId: "unexpected",
            fix(fixer) {
              const startLineIdx = comment.loc.start.line - 1
              const endLineIdx = comment.loc.end.line - 1

              const beforeComment = lines[startLineIdx]?.slice(0, comment.loc.start.column).trim() ?? ""
              const afterComment = lines[endLineIdx]?.slice(comment.loc.end.column).trim() ?? ""

              const isBlockAlone =
                beforeComment === "" &&
                afterComment === "" &&
                lines.slice(startLineIdx + 1, endLineIdx).every(l => l.trim() === "")

              if (isBlockAlone) {
                const lineStart = sourceCode.getIndexFromLoc({
                  line: comment.loc.start.line,
                  column: 0, 
                })

                const safeLine = Math.min(comment.loc.end.line + 1, lines.length)
                const lineEnd =
                  safeLine === lines.length ?
                    sourceCode.getText().length :
                    sourceCode.getIndexFromLoc({
                      line: safeLine,
                      column: 0, 
                    })

                return fixer.removeRange([lineStart, lineEnd])
              }

              return fixer.remove(comment)
            },
          })
        }
      },
    }
  },
}
