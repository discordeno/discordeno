import type { ChannelTypes, DiscordChannel } from '@discordeno/types'
import Base from '../../Base.js'
import type Client from '../../Client.js'

export class Channel extends Base {
  type: ChannelTypes
  client: Client

  constructor(data: DiscordChannel | Pick<DiscordChannel, 'id' | 'permissions' | 'name' | 'type'>, client: Client) {
    super(data.id)
    this.type = data.type
    this.client = client
  }

  get mention(): string {
    return `<#${this.id}>`
  }

  /**
   * @deprecated Removed this circular dependency hack for better alternative.
   */
  static from(_data: DiscordChannel, client: Client): void {
    console.error('Usage of channel.from is deprecated, please use generateChannelFrom(data, client)')
    client.emit('warn', new Error(`Usage of "Channel.from" is deprecated. Use "generateChanneFrom()"`))
  }

  toJSON(props: string[] = []): Record<string, any> {
    return super.toJSON(['type', ...props])
  }
}

export default Channel
