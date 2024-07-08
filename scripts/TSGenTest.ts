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

for (const inter of interfaces) {
  assert(inter.name)
  assert(inter.members)
  assert(inter.documentation)
  assert(inter.jsDoc)

  // TODO: jsdoc on the interface

  writeStream.write(`export interface ${inter.name} {\n`)

  for (const [memberName, memberMetadata] of Object.entries(inter.members)) {
    assert(memberMetadata.type)
    assert(typeof memberMetadata.isOptional === 'boolean')
    assert(memberMetadata.documentation)
    assert(memberMetadata.jsDoc)

    // TODO: handle jsdoc on the member

    const isOptionalQuestionMark = memberMetadata.isOptional ? '?' : ''

    writeStream.write(`  ${memberName}${isOptionalQuestionMark}: ${memberMetadata.type}\n`)
  }

  writeStream.write('}\n\n')
}

interface DocEntry {
  name?: string
  documentation?: ts.SymbolDisplayPart[]
  jsDoc?: ts.JSDocTagInfo[]
  type?: string
  isOptional?: boolean
  members?: Record<string, DocEntry>
}
