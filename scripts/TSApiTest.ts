/* eslint-disable */
/// script stolen from Typescript compiler api wiki and adapted

import { writeFileSync } from 'node:fs'
import ts from 'typescript'

interface DocEntry {
  name?: string
  documentation?: ts.SymbolDisplayPart[]
  jsDoc?: ts.JSDocTagInfo[]
  type?: string
  isOptional?: boolean
  isArray?: boolean
  members?: Record<string, DocEntry>
}

/** Generate documentation for all classes in a set of .ts files */
function generateDocumentation(fileName: string, options: ts.CompilerOptions): void {
  // Build a program using the set of root file names in fileNames
  const program = ts.createProgram([fileName], options)

  // Get the checker, we will use it to find more about classes
  const checker = program.getTypeChecker()
  const output: DocEntry[] = []

  const sourceFile = program.getSourceFile(fileName)

  if (!sourceFile || sourceFile.isDeclarationFile) {
    throw new Error('Cannot process a undefined file or a declaration file')
  }

  ts.forEachChild(sourceFile, (node) => {
    if (!ts.isInterfaceDeclaration(node)) return

    const symbol = checker.getSymbolAtLocation(node.name)

    if (!symbol) return

    output.push(serializeInterface(symbol))
  })

  // print out the doc
  writeFileSync('interfaces.json', JSON.stringify(output, undefined, 4))

  /** Serialize a symbol into a json object */
  function serializeSymbol(symbol: ts.Symbol): DocEntry {
    return {
      name: symbol.getName(),
      documentation: symbol.getDocumentationComment(checker),
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
    return {
      type: checker.typeToString(checker.getTypeOfSymbolAtLocation(member, member.valueDeclaration!), undefined, ts.TypeFormatFlags.NoTruncation),
      isOptional: (member.getFlags() & ts.SymbolFlags.Optional) === ts.SymbolFlags.Optional,
      documentation: member.getDocumentationComment(checker),
      jsDoc: member.getJsDocTags(checker),
    }
  }
}

generateDocumentation(process.argv.at(2)!, {
  target: ts.ScriptTarget.ES5,
  module: ts.ModuleKind.CommonJS,
})
