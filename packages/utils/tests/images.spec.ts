import { expect } from 'chai'
import { describe, it } from 'mocha'
import { formatImageUrl } from '../src/images.js'

describe('utils.ts', () => {
  it('[utils] format image url', () => {
    expect(formatImageUrl('https://skillz.is.pro')).to.be.equal('https://skillz.is.pro.jpg?size=128')
    expect(formatImageUrl('https://skillz.is.pro', 1024)).to.be.equal('https://skillz.is.pro.jpg?size=1024')
    expect(formatImageUrl('https://skillz.is.pro', 1024, 'gif')).to.be.equal('https://skillz.is.pro.gif?size=1024')
    expect(formatImageUrl('https://skillz.is.pro', undefined, 'gif')).to.be.equal('https://skillz.is.pro.gif?size=128')
  })
})
