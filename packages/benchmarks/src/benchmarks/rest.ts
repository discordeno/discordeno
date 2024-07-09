import { createRestManager } from '@discordeno/rest'
import { suite } from '../benchmarkSuite.js'

const rest = createRestManager({ token: '1', applicationId: 1n })

suite.add(`rest.simplifyUrl`, () => {
  rest.simplifyUrl('/messages/555555555555555555', 'PUT')
  rest.simplifyUrl('/users/555555555555555555', 'PUT')
  rest.simplifyUrl('/webhooks/555555555555555555', 'PUT')
  rest.simplifyUrl('/channel/555555555555555555', 'PUT')
  rest.simplifyUrl('/guild/555555555555555555', 'PUT')
  rest.simplifyUrl('/channels/555555555555555555', 'PUT')
  rest.simplifyUrl('/guilds/555555555555555555', 'PUT')
  rest.simplifyUrl('/channels/555555555555555555/reactions/555555555555555555/wdiubaibfwuabfobaowbfoibnion', 'PUT')
  rest.simplifyUrl('/channels/555555555555555555/messages/555555555555555555', 'DELETE')
  rest.simplifyUrl('/channels/555555555555555555/messages/555555555555555555', 'POST')
  rest.simplifyUrl('/channels/555555555555555555/messages/555555555555555555', 'GET')
  rest.simplifyUrl('/channels/555555555555555555/messages/555555555555555555', 'PUT')
})
