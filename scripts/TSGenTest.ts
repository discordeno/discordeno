/* eslint-disable */

import assert from 'node:assert'
import { createWriteStream } from 'node:fs'
import { readFile } from 'node:fs/promises'
import ts from 'typescript'

const imports = JSON.parse(await readFile('imports.json', 'utf-8')) as string[]
const interfaces = JSON.parse(await readFile('interfaces.json', 'utf-8')) as DocEntry[]

const writeStream = createWriteStream('interfaces.ts', 'utf-8')

writeStream.write('/* eslint-disable */\n\n')

for (const imp of imports) {
  // the replace is here only because since we are placing the file in a random place it will make ts error out, this makes it less painful to test the script
  writeStream.write(imp.replace('../index.js', '@discordeno/bot'))
}

writeStream.write('\n\n')

interfaces.forEach((inter, i) => {
  assert(inter.name)
  assert(inter.members)

  writeJSDoc(inter)

  writeStream.write(`export interface ${inter.name} {\n`)

  for (const [memberName, memberMetadata] of Object.entries(inter.members)) {
    assert(memberMetadata.type)
    assert(typeof memberMetadata.isOptional === 'boolean')

    writeJSDoc(memberMetadata, '  ')

    const isOptionalQuestionMark = memberMetadata.isOptional ? '?' : ''

    writeStream.write(`  ${memberName}${isOptionalQuestionMark}: ${memberMetadata.type}\n`)
  }

  writeStream.write('}\n')

  if (i < interfaces.length - 1) {
    writeStream.write('\n')
  }
})

function writeJSDoc(docEntry: DocEntry, ident = '') {
  assert(docEntry.documentation)
  assert(docEntry.jsDoc)

  if (docEntry.documentation.length === 0 && docEntry.jsDoc.length === 0) return

  const withDocs = docEntry.documentation.length > 0
  const withJSdoc = docEntry.jsDoc.length > 0

  writeStream.write(`${ident}/**`)

  if (withDocs && withJSdoc) {
    writeStream.write(`\n${ident} *`)
  }

  if (withDocs) {
    writeDocumentation(docEntry.documentation, ident)
  }

  for (const jsDoc of docEntry.jsDoc) {
    if (withDocs) {
      writeStream.write(`\n${ident} *`)
    }

    writeStream.write(`\n${ident} *`)
    writeStream.write(` @${jsDoc.name}\n${ident} *`)

    if (jsDoc.text) {
      writeDocumentation(jsDoc.text, ident)
    }
  }

  if (withJSdoc) {
    writeStream.write(`\n${ident}`)
  }

  writeStream.write(' */\n')
}

function writeDocumentation(documentation: ts.SymbolDisplayPart[], ident: string) {
  const docs = parseDocumentation(documentation)
  const splitted = docs.split('\n')

  writeStream.write(' ')
  writeStream.write(splitted[0])

  for (const text of splitted.slice(1)) {
    writeStream.write(`\n${ident} * `)
    writeStream.write(text)
  }
}

function parseDocumentation(docs: ts.SymbolDisplayPart[]) {
  let out = ''

  for (const doc of docs) {
    if (doc.kind === 'linkText') {
      out += ' | '
    }

    out += doc.text
  }

  return out
}

interface DocEntry {
  name?: string
  documentation?: ts.SymbolDisplayPart[]
  jsDoc?: ts.JSDocTagInfo[]
  type?: string
  isOptional?: boolean
  members?: Record<string, DocEntry>
}
