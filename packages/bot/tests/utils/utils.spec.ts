import { expect } from 'chai'
import { formatImageURL, hasProperty } from '../../src/utils/utils.js'

const obj = { prop: 'lts372005' }

it('[utils] hasProperty does HAVE property', () => {
  expect(hasProperty(obj, 'prop')).to.be.equal(true)
})

it('[utils] hasProperty does NOT HAVE property', () => {
  expect(hasProperty(obj, 'lts372005')).to.be.equal(false)
})

it('[utils] format image url', () => {
  expect(formatImageURL('https://skillz.is.pro')).to.be.equal(
    'https://skillz.is.pro.jpg?size=128'
  )
  expect(formatImageURL('https://skillz.is.pro', 1024)).to.be.equal(
    'https://skillz.is.pro.jpg?size=1024'
  )
  expect(formatImageURL('https://skillz.is.pro', 1024, 'gif')).to.be.equal(
    'https://skillz.is.pro.gif?size=1024'
  )
  expect(formatImageURL('https://skillz.is.pro', undefined, 'gif')).to.be.equal(
    'https://skillz.is.pro.gif?size=128'
  )
})
