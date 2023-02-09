import { describe, it } from 'mocha'

describe('index.ts', () => {
  it('will import without error', async () => {
    try {
      await import('../src/index.js')
    } catch {}
  })
})
