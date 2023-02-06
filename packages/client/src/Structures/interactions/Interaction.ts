/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { InteractionTypes, type BigString, type DiscordInteraction } from '@discordeno/types'
import Base from '../../Base'
import type Client from '../../Client'
import AutocompleteInteraction from './Autocomplete'
import CommandInteraction from './Command'
import ComponentInteraction from './Component'
import PingInteraction from './Ping'
import UnknownInteraction from './Unknown'

export class Interaction extends Base {
  client: Client
  applicationID: BigString
  token: string
  type: InteractionTypes
  version: 1
  acknowledged: boolean

  constructor(data: DiscordInteraction, client: Client) {
    super(data.id)
    this.client = client

    this.applicationID = data.application_id
    this.token = data.token
    this.type = data.type
    this.version = data.version
    this.acknowledged = false
  }

  /**
   * @deprecated Use `.client`
   */
  get _client(): Client {
    return this.client
  }

  update() {
    this.acknowledged = true
  }

  static from(data: DiscordInteraction, client: Client) {
    switch (data.type) {
      case InteractionTypes.Ping: {
        return new PingInteraction(data, client)
      }
      case InteractionTypes.ApplicationCommand: {
        return new CommandInteraction(data, client)
      }
      case InteractionTypes.MessageComponent: {
        return new ComponentInteraction(data, client)
      }
      case InteractionTypes.ApplicationCommandAutocomplete: {
        return new AutocompleteInteraction(data, client)
      }
    }

    client.emit('warn', new Error(`Unknown interaction type: ${data.type}\n${JSON.stringify(data)}`))
    return new UnknownInteraction(data, client)
  }
}

export default Interaction
