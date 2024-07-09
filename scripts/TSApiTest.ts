/* eslint-disable */
/// script stolen from Typescript compiler api wiki and adapted

import assert from 'node:assert'
import { writeFileSync } from 'node:fs'
import { inspect } from 'node:util'
import ts from 'typescript'

inspect.defaultOptions.depth = 5

interface DocEntry {
  name?: string
  documentation?: ts.SymbolDisplayPart[]
  jsDoc?: ts.JSDocTagInfo[]
  type?: string
  isOptional?: boolean
  members?: Record<string, DocEntry>
}

/** Generate documentation for all classes in a set of .ts files */
function generateDocumentation(fileName: string, options: ts.CompilerOptions): void {
  // Build a program using the set of root file names in fileNames
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

  // Get the checker, we will use it to find more about classes
  const checker = program.getTypeChecker()
  const output: DocEntry[] = []
  const imports: string[] = []

  const sourceFile = program.getSourceFile(fileName)

  if (!sourceFile || sourceFile.isDeclarationFile) {
    throw new Error('Cannot process a undefined file or a declaration file')
  }

  ts.forEachChild(sourceFile, (node) => {
    if (ts.isImportDeclaration(node)) {
      imports.push(node.getFullText())
      return
    }

    if (!ts.isInterfaceDeclaration(node)) return

    const symbol = checker.getSymbolAtLocation(node.name)

    if (!symbol) return

    output.push(serializeInterface(symbol))
  })

  // print out the doc
  writeFileSync('interfaces.json', JSON.stringify(output, undefined, 2))
  writeFileSync('imports.json', JSON.stringify(imports, undefined, 2))

  /** Serialize a symbol into a json object */
  function serializeSymbol(symbol: ts.Symbol): DocEntry {
    return {
      name: symbol.getName(),
      documentation: symbol.getDocumentationComment(checker),
      jsDoc: symbol.getJsDocTags(checker),
    }
  }

  /** Serialize a interface symbol information */
  function serializeInterface(symbol: ts.Symbol): DocEntry {
    const details = serializeSymbol(symbol)

    details.members = Object.fromEntries(Array.from(symbol.members!.entries()).map(([name, symbol]) => [name, serializeMember(symbol)]))

    return details
  }

  /** Serialize a member */
  function serializeMember(member: ts.Symbol): DocEntry {
    const valueDeclaration = member.valueDeclaration
    assert(valueDeclaration)

    const type = checker.getTypeOfSymbolAtLocation(member, valueDeclaration)

    const stringifiedType = checker.typeToString(type, valueDeclaration, ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.NoTypeReduction)

    assert.notEqual(stringifiedType, 'any')

    // Check if the "undefined" union was added by "typeToString" + "strictNullChecks" and it wasn't there in reality
    const hasStringifiedUndefined = stringifiedType.includes(' | undefined') && !hasUndefinedUnion(valueDeclaration)

    return {
      type: hasStringifiedUndefined ? stringifiedType.replace(' | undefined', '') : stringifiedType,
      isOptional: (member.getFlags() & ts.SymbolFlags.Optional) === ts.SymbolFlags.Optional,
      documentation: member.getDocumentationComment(checker),
      jsDoc: member.getJsDocTags(checker),
    }
  }

  function hasUndefinedUnion(declaration: ts.Declaration): boolean {
    if (!ts.isPropertySignature(declaration)) return false

    assert(declaration.type)
    const type = declaration.type

    if (!ts.isUnionTypeNode(type)) return false

    return type.types.some((t) => ts.isToken(t) && t.kind === ts.SyntaxKind.UndefinedKeyword)
  }
}

generateDocumentation(process.argv.at(2)!, {
  target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.Node16,
  moduleResolution: ts.ModuleResolutionKind.Node16,
  rootDir: './packages/bot/src',
  skipLibCheck: true,
  skipDefaultLibCheck: true,
  strict: true,
  noEmit: true,
})
