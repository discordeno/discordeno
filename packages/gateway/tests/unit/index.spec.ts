import { describe, it } from 'mocha'

describe('index.ts', () => {
  it('will import without error', async () => {
    await import('../../src/index.js')
  })
})
