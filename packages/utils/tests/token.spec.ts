import { expect } from 'chai'
import { removeTokenPrefix } from '../src/token.js'

it('[token] Remove token prefix when Bot is prefixed.', () => {
  expect(removeTokenPrefix('Bot discordeno is best lib')).to.be.equal(
    'discordeno is best lib'
  )
})

it('[token] Remove token prefix when Bot is NOT prefixed.', () => {
  expect(removeTokenPrefix('discordeno is best lib')).to.be.equal(
    'discordeno is best lib'
  )
})
