import { expect } from 'chai'
import {
  createClientGatewayHandlers,
  createEventHandlers
} from '../src/client.js'

describe('Handler', () => {
  it('Event in createEventHandlers() should have matching gateway event in createClientGatewayHandlers()', () => {
    const gatewayHandlers: Array<string | undefined> = []
    Object.keys(createClientGatewayHandlers({})).forEach((gatewayHandler) => {
      let name = gatewayHandler
      if (gatewayHandler.startsWith('MESSAGE_REACTION')) {
        name = name.slice('MESSAGE_'.length)
      }
      if (gatewayHandler.startsWith('GUILD_SCHEDULED_EVENT_')) {
        name = name.slice('GUILD_'.length)
      }
      if (gatewayHandler.startsWith('GUILD_ROLE_')) {
        name = name.slice('GUILD_'.length)
      }
      if (gatewayHandler.startsWith('GUILD_INTEGRATIONS_')) {
        name = name.slice('GUILD_'.length)
      }
      name = name
        .split('_')
        .map(
          (name, index) =>
            name.slice(0, index === 0 ? 0 : 1) +
            name.slice(index === 0 ? 0 : 1).toLowerCase()
        )
        .join('')
      gatewayHandlers.push(name)
    })

    const missingGatewayEventEventHandlers: string[] = []
    Object.keys(createEventHandlers({})).forEach((eventHandler) => {
      if (['debug', 'raw', 'dispatchRequirements'].includes(eventHandler)) { return }
      if (eventHandler === 'botUpdate') eventHandler = 'userUpdate'
      const index = gatewayHandlers.indexOf(
        eventHandler.replace('automod', 'autoModeration')
      )
      if (index !== -1) {
        gatewayHandlers[index] = undefined
        return
      }
      missingGatewayEventEventHandlers.push(eventHandler)
    })
    const missingClientEventEventHandlers = gatewayHandlers
      .map((gatewayHandler, index) => {
        if (!gatewayHandler) return gatewayHandler
        return Object.keys(createClientGatewayHandlers({}))[index]
      })
      .filter((gatewayHandler) => gatewayHandler !== undefined)

    const getErrorMessage = (): string => `
The following event(s) in createEventHandlers() missing a matching gateway event in createClientGatewayHandlers():

${
  missingGatewayEventEventHandlers.length !== 0
    ? missingGatewayEventEventHandlers.join('\n')
    : 'None'
}

--------------------------------------------------------------------------------------------
The following gateway event(s) in createClientGatewayHandlers() missing a matching event in createEventHandlers():

${
  missingClientEventEventHandlers.length !== 0
    ? missingClientEventEventHandlers.join('\n')
    : 'None'
}
`

    expect(missingClientEventEventHandlers, getErrorMessage()).to.be.empty
    expect(missingGatewayEventEventHandlers, getErrorMessage()).to.be.empty
  })
})
