import { expect } from 'chai'
import { findUp } from 'find-up'
import { describe, it } from 'mocha'
import ts from 'typescript'
import { typescriptOptions } from '../src/bin/generate/typescript.js'

describe('discordeno generate', () => {
  it('will emit without errors', async function () {
    // Mocha will crash if this takes more then 2s
    // Deno does not have the timeout function
    // Bun does not give a this object at all
    if (this?.timeout) {
      // we set the timeout to 20s, typescript can be slow at doing the entire type checking
      this.timeout(20_000)
    }

    const typesFile = await findUp('packages/bot/dist/types/transformers/types.d.ts', {
      allowSymlinks: true,
    })

    expect(typesFile).to.exist

    if (!typesFile) {
      throw new Error("Transformers types file not found!")
    }

    const program = ts.createProgram([typesFile], typescriptOptions)

    // Check if typescript is producing type errors for the program
    const emitResult = program.emit()
    const allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics)

    expect(allDiagnostics).to.be.an('array').that.is.empty
  })
})
