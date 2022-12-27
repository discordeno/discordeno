import { expect } from 'chai'
import fs from 'node:fs'
import { createTransformers } from '../src/transformer.js'
// import { createTransformers } from '../src/transformer.js'
import { describe, it } from 'mocha'
import * as transformers from '../src/transformers/index.js'

describe('Transformers', () => {
  it('src/transformers/index.ts should export every file in src/transformers', async () => {
    const transformerNames = Object.keys(transformers)
    const missingExportTransformers: string[] = []
    const dirs = ['', '/reverse', '/toggles']
    for await (const dir of dirs) {
      await Promise.all(
        fs
          .readdirSync(`src/transformers${dir}`)
          .filter((file) => file.endsWith('.ts') && file !== 'index.ts')
          .map(async (file) => {
            Object.keys(
              await import(`../src/transformers${dir}/${file}`)
            ).forEach((transformer) => {
              const index = transformerNames.indexOf(transformer)
              if (index !== -1) {
                transformerNames.splice(index, 1)
                return
              }
              missingExportTransformers.push(
                `File: src/transformers${dir}/${file}\nFunction: ${transformer}`
              )
            })
          })
      )
    }
    expect(
      missingExportTransformers,
      `\nThere is/are transformer(s) defined in src/transformers, but no export in src/transformers/index.js
--------------------------------------------------------------------------------------------
Transformers found in src/transformers without export in src/transformers/index.js:

${
  missingExportTransformers.length !== 0
    ? missingExportTransformers.join('\n\n')
    : 'None'
}
`
    ).to.empty
  })

  it('Transformers in src/transformers should be in createTransformers()', async () => {
    const transformerNames = Object.keys(createTransformers({}))
    const reverseTransformerNames = Object.keys(createTransformers({}).reverse)
    transformerNames.splice(transformerNames.indexOf('reverse'), 1)
    transformerNames.splice(transformerNames.indexOf('snowflake'), 1)
    reverseTransformerNames.splice(
      reverseTransformerNames.indexOf('snowflake'),
      1
    )
    const missingExportTransformers: string[] = []
    await Promise.all(
      fs
        .readdirSync('src/transformers')
        .filter((file) => file.endsWith('.ts') && file !== 'index.ts')
        .map(async (file) => {
          Object.keys(await import(`../src/transformers/${file}`))
            .filter((transformer) => transformer.startsWith('transform'))
            .forEach((transformer) => {
              const index = transformerNames.indexOf(
                `${transformer.slice(9, 10).toLowerCase()}${transformer
                  .replace('AutoModeration', 'Automod')
                  .slice(10)}`
              )
              if (index !== -1) {
                transformerNames.splice(index, 1)
                return
              }
              if (['transformThreadMemberGuildCreate'].includes(transformer)) {
                return
              }
              missingExportTransformers.push(
                `File: src/transformers/${file}\nFunction: ${transformer}`
              )
            })
        })
    )
    await Promise.all(
      fs
        .readdirSync('src/transformers/reverse')
        .filter((file) => file.endsWith('.ts') && file !== 'index.ts')
        .map(async (file) => {
          Object.keys(await import(`../src/transformers/reverse/${file}`))
            .filter((transformer) => transformer.startsWith('transform'))
            .forEach((transformer) => {
              const index = reverseTransformerNames.indexOf(
                `${transformer.slice(9, 10).toLowerCase()}${transformer
                  .replace('AutoModeration', 'Automod')
                  .split('To')[0]
                  .slice(10)}`
              )
              if (index !== -1) {
                reverseTransformerNames.splice(index, 1)
                return
              }
              missingExportTransformers.push(
                `File: src/transformers/reverse/${file}\nFunction: ${transformer}`
              )
            })
        })
    )
    expect(
      missingExportTransformers,
      `\nThere is/are transformer(s) defined in src/transformers, but not found in createTransformers() function at src/transformers.ts
--------------------------------------------------------------------------------------------
Transformers found in src/transformers without matching transformer in createTransformers():

${
  missingExportTransformers.length !== 0
    ? missingExportTransformers.join('\n\n')
    : 'None'
}

--------------------------------------------------------------------------------------------
Transformers found in createTransformers() without matching transformer:

${transformerNames.length !== 0 ? transformerNames.join('\n') : 'None'}

--------------------------------------------------------------------------------------------
Reverse transformers found in createTransformers() without matching transformer:

${
  reverseTransformerNames.length !== 0
    ? reverseTransformerNames.join('\n')
    : 'None'
}

`
    ).to.empty
  })
})
