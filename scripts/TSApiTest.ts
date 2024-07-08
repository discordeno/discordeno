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
  writeFileSync('interfaces.json', JSON.stringify(output, undefined, 4))
  writeFileSync('imports.json', JSON.stringify(imports, undefined, 4))

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
    const nullUnion = hasNullUnion(valueDeclaration)

    const stringifiedType = checker.typeToString(type, valueDeclaration, ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.NoTypeReduction)

    if (stringifiedType === 'any') {
      console.log(member)
    }

    return {
      type: `${stringifiedType}${nullUnion ? ' | null' : ''}`,
      isOptional: (member.getFlags() & ts.SymbolFlags.Optional) === ts.SymbolFlags.Optional,
      documentation: member.getDocumentationComment(checker),
      jsDoc: member.getJsDocTags(checker),
    }
  }

  function hasNullUnion(declaration: ts.Declaration): boolean {
    if (!ts.isPropertySignature(declaration)) return false

    assert(declaration.type)
    const type = declaration.type

    if (!ts.isUnionTypeNode(type)) return false

    return type.types.some((t) => ts.isLiteralTypeNode(t) && t.literal.kind === ts.SyntaxKind.NullKeyword)
  }
}

generateDocumentation(process.argv.at(2)!, {
  target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.ES2022,
})
