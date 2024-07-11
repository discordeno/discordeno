import assert from 'node:assert'
import { createWriteStream } from 'node:fs'
import ts from 'typescript'

// TODO: change this fileName to be based on the filesystem
const fileName = process.argv.at(2)!
const options: ts.CompilerOptions = {
  target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.Node16,
  moduleResolution: ts.ModuleResolutionKind.Node16,
  skipLibCheck: true,
  skipDefaultLibCheck: true,
  strict: true,
  noEmit: true,
}

const program = ts.createProgram([fileName], options)

// Check if typescript is producing type errors for the program
const emitResult = program.emit()
const allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics)

allDiagnostics.forEach((diagnostic) => {
  if (!diagnostic.file) {
    console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'))
    return
  }

  const { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start!)
  const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')
  console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`)
})

// The type checker will give us find more about symbols
const checker = program.getTypeChecker()
const sourceFile = program.getSourceFile(fileName)

if (!sourceFile || sourceFile.isDeclarationFile) {
  throw new Error('Cannot process a undefined file or a declaration file')
}

const writeStream = createWriteStream('interfaces.ts', 'utf-8')
writeStream.write('/* eslint-disable */\n\n')

ts.forEachChild(sourceFile, (node) => {
  if (ts.isImportDeclaration(node)) {
    let importText = node.getFullText().trim()

    // We manually add the newline afterwards, so we need to remove it from here
    if (importText.startsWith('\n')) {
      importText = importText.substring(1)
    }

    // The replace is here only because since we are placing the file in a random place (at this time) it will make ts error out
    // TODO: remove the replace when the file will be in the proper location
    writeStream.write(importText.replace('../index.js', '@discordeno/bot'))
    writeStream.write('\n')

    return
  }

  if (ts.isInterfaceDeclaration(node)) {
    // Get the symbol
    const symbol = checker.getSymbolAtLocation(node.name)

    if (!symbol) return

    assert(symbol.members)

    // Get the general information about the symbol and it's members
    const details = {
      name: symbol.getName(),
      documentation: symbol.getDocumentationComment(checker),
      jsDoc: symbol.getJsDocTags(checker),
      members: Array.from(symbol.members.values()).map(getMemberInformation),
    } satisfies TypeInformation

    writeStream.write('\n')

    writeJSDoc(details)

    writeStream.write(`export interface ${details.name} {\n`)

    // Generate the interface in the output file
    for (const memberMetadata of Object.values(details.members)) {
      assert(memberMetadata.type)
      assert(typeof memberMetadata.isOptional === 'boolean')

      writeJSDoc(memberMetadata, '  ')

      const isOptionalQuestionMark = memberMetadata.isOptional ? '?' : ''

      writeStream.write(`  ${memberMetadata.name}${isOptionalQuestionMark}: ${memberMetadata.type}\n`)
    }

    writeStream.write('}\n')
  }
})

function getMemberInformation(member: ts.Symbol): TypeInformation {
  const valueDeclaration = member.valueDeclaration
  assert(valueDeclaration)

  const valueDeclarationChildren = valueDeclaration.getChildren()
  const typeNode = valueDeclarationChildren.find((x) => ts.isTypeNode(x))
  assert(typeNode)

  // Since we are getting the type directly from the sourceFile it may have a trailing space, so we remove them
  const typeText = typeNode.getFullText().trim()

  return {
    name: member.getName(),
    type: typeText,
    isOptional: (member.getFlags() & ts.SymbolFlags.Optional) === ts.SymbolFlags.Optional,
    documentation: member.getDocumentationComment(checker),
    jsDoc: member.getJsDocTags(checker),
  }
}

function writeJSDoc(docEntry: TypeInformation, ident = ''): void {
  assert(docEntry.documentation)
  assert(docEntry.jsDoc)

  const withDocs = docEntry.documentation.length > 0
  const withJSdoc = docEntry.jsDoc.length > 0

  if (!withDocs && !withJSdoc) return

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

function writeDocumentation(documentation: ts.SymbolDisplayPart[], ident: string): void {
  const docs = parseDocumentation(documentation)
  const splitted = docs.split('\n')

  writeStream.write(' ')
  writeStream.write(splitted[0])

  for (const text of splitted.slice(1)) {
    writeStream.write(`\n${ident} * `)
    writeStream.write(text)
  }
}

function parseDocumentation(docs: ts.SymbolDisplayPart[]): string {
  let out = ''

  for (const doc of docs) {
    if (doc.kind === 'linkText') {
      out += ' | '
    }

    out += doc.text
  }

  return out
}

interface TypeInformation {
  name?: string
  documentation?: ts.SymbolDisplayPart[]
  jsDoc?: ts.JSDocTagInfo[]
  type?: string
  isOptional?: boolean
  members?: TypeInformation[]
}
