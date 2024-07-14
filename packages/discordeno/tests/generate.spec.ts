import { expect } from 'chai'
import { findUp } from 'find-up'
import { describe, it } from 'mocha'
import ts from 'typescript'
import { typescriptOptions } from '../src/bin/generate/typescript.js'

describe('discordeno generate', () => {
  it('will emit without errors', async function () {
    this.timeout(20_000) // 20s, typescript can be slow at doing the entire type checking

    // For the test we use the .ts file, as we unit tests don't depend on the types being compiled
    const typesFile = await findUp('packages/bot/src/transformers/types.ts', { allowSymlinks: true })

    expect(typesFile).to.exist

    if (!typesFile) {
      throw new Error("This shouldn't happen!")
    }

    const program = ts.createProgram([typesFile], typescriptOptions)

    // Check if typescript is producing type errors for the program
    const emitResult = program.emit()
    const allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics)

    expect(allDiagnostics).to.be.an('array').that.is.empty
  })
})
