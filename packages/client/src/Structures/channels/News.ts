/* eslint-disable no-useless-call */
/* eslint-disable @typescript-eslint/return-await */
import type { BigString, DiscordChannel } from '@discordeno/types'
import type Client from '../../Client.js'
import type { ChannelFollow } from '../../typings.js'
import type Message from '../Message.js'
import TextChannel from './Text.js'

export class NewsChannel extends TextChannel {
  constructor(data: DiscordChannel, client: Client, messageLimit?: number) {
    super(data, client, messageLimit)

    this.rateLimitPerUser = 0
    this.update(data)
  }

  /** Crosspost (publish) a message to subscribed channels */
  async crosspostMessage(messageID: BigString): Promise<Message> {
    return await this.client.crosspostMessage.call(this.client, this.id, messageID)
  }

  /** Follow this channel in another channel. This creates a webhook in the target channel */
  async follow(webhookChannelID: BigString): Promise<ChannelFollow> {
    return await this.client.followChannel.call(this.client, this.id, webhookChannelID)
  }
}

export default NewsChannel
