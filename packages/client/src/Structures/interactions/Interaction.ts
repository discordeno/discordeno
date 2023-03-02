/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { DiscordInteraction, InteractionTypes } from '@discordeno/types'
import Base from '../../Base.js'
import type Client from '../../Client.js'

export class Interaction extends Base {
  client: Client
  applicationID: string
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

  /**
   * @deprecated Use generateInteractionFrom(data, client) instead.
   */
  static from(data: DiscordInteraction, client: Client) {
    // Remove js hack of circular deps
    console.error('Usage of Interaction.from() is deprecated. Use generateInteractionFrom(data, client) instead.')
    client.emit('warn', new Error(`Usage of Interaction.from() is deprecated. Use generateInteractionFrom(data, client) instead.`))
  }
}

export default Interaction
