import { expect } from 'chai'
import fs from 'node:fs'
import {
  createClientGatewayHandlers,
  createEventHandlers
} from '../src/handlers.js'
import * as handlers from '../src/handlers/index.js'

describe('Handler', () => {
  it('src/transformers/index.ts should export every file in src/transformers', async () => {
    const handlerNames = Object.keys(handlers)
    const missingExportHandlers: string[] = []
    const dirs = ['']
    for await (const dir of dirs) {
      await Promise.all(
        fs
          .readdirSync(`src/handlers${dir}`)
          .filter((file) => file !== 'index.ts')
          .map(async (file) => {
            if (!file.endsWith('.ts')) {
              dirs.push(`${dir}/${file}`)
              return
            }
            Object.keys(await import(`../src/handlers${dir}/${file}`)).forEach(
              (transformer) => {
                const index = handlerNames.indexOf(transformer)
                if (index !== -1) {
                  handlerNames.splice(index, 1)
                  return
                }
                missingExportHandlers.push(
                  `File: src/handlers${dir}/${file}\nFunction: ${transformer}`
                )
              }
            )
          })
      )
    }
    expect(
      missingExportHandlers,
      `\nThere is/are handlers(s) defined in src/handlers, but no export in src/handlers/index.js
--------------------------------------------------------------------------------------------
handlers found in src/handlers without export in src/handlers/index.js:

${
  missingExportHandlers.length !== 0
    ? missingExportHandlers.join('\n\n')
    : 'None'
}
`
    ).to.empty
  })

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
      if (['debug', 'raw', 'dispatchRequirements'].includes(eventHandler)) {
        return
      }
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
