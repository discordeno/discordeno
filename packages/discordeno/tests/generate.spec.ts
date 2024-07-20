import { expect } from 'chai'
import { findUp } from 'find-up'
import { describe, it } from 'mocha'
import ts from 'typescript'
import { typescriptOptions } from '../src/bin/config.js'
import { getPropertyDependencies, isPropertyDesired } from '../src/bin/generate/desiredProperty.js'
import { defineConfig } from '../src/index.js'

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
      throw new Error('Transformers types file not found!')
    }

    const program = ts.createProgram([typesFile], {
      ...typescriptOptions,
      noEmit: true,
    })

    // Check if typescript is producing type errors for the program
    const emitResult = program.emit()
    const allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics)

    expect(allDiagnostics).to.be.an('array').that.is.empty
  })

  it('can get propriety dependencies', () => {
    const deps = getPropertyDependencies('member', 'mute')

    expect(deps).to.have.members(['toggles'])
  })

  it('can get desired status for a prop', () => {
    const config = defineConfig({
      desiredProperties: {
        properties: {
          channel: {
            id: true,
          },
        },
      },
    })

    // desired
    const idProp = isPropertyDesired(config, 'channel', 'id')
    expect(idProp).to.be.equal(true)

    // not desired
    const nameProp = isPropertyDesired(config, 'channel', 'name')
    expect(nameProp).to.be.equal(false)
  })

  it('can get computed desired status for a prop', () => {
    const config = defineConfig({
      desiredProperties: {
        properties: {
          interaction: {
            type: true,
            token: true,
          },
        },
      },
    })

    // missing all deps
    const threadMetadata = isPropertyDesired(config, 'channel', 'threadMetadata')
    expect(threadMetadata).to.be.equal(false)

    // missing one dep
    const respond = isPropertyDesired(config, 'interaction', 'respond')
    expect(respond).to.be.equal(false)

    // having all deps
    const interactionDelete = isPropertyDesired(config, 'interaction', 'delete')
    expect(interactionDelete).to.be.equal(true)
  })
})
