import type { WriteStream } from 'node:fs'
import type ts from 'typescript'

export function writeInterfaceMember(stream: WriteStream, name: string, type: string, optional: boolean) {
  stream.write(`  ${name}${optional ? '?' : ''}: ${type}\n`)
}

export function writeJSDoc(stream: WriteStream, docs: ts.SymbolDisplayPart[], jsDocTags: ts.JSDocTagInfo[], ident = ''): void {
  const withDocs = docs.length > 0
  const withJSdoc = jsDocTags.length > 0

  if (!withDocs && !withJSdoc) return

  stream.write(`${ident}/**`)

  if (withDocs && withJSdoc) {
    stream.write(`\n${ident} *`)
  }

  if (withDocs) {
    writeSymbolDisplayParts(stream, docs, ident)
  }

  for (const jsDoc of jsDocTags) {
    if (withDocs) {
      stream.write(`\n${ident} *`)
    }

    stream.write(`\n${ident} *`)
    stream.write(` @${jsDoc.name}\n${ident} *`)

    if (jsDoc.text) {
      writeSymbolDisplayParts(stream, jsDoc.text, ident)
    }
  }

  if (withJSdoc) {
    stream.write(`\n${ident}`)
  }

  stream.write(' */\n')
}

function writeSymbolDisplayParts(stream: WriteStream, documentation: ts.SymbolDisplayPart[], ident: string): void {
  const docs = documentation.reduce((acc, cur) => `${acc}${cur.kind === 'linkText' ? ' | ' : ''}${cur.text}`, '')
  const splitted = docs.split('\n')

  stream.write(' ')
  stream.write(splitted[0])

  for (const text of splitted.slice(1)) {
    stream.write(`\n${ident} * `)
    stream.write(text)
  }
}
