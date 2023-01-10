/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-useless-call */
import Base from '../../Base.js';

import type { DiscordStageInstance } from '@discordeno/types'
import type Client from '../../Client.js'
import type { StageInstanceOptions } from '../../typings.js'
import type StageChannel from '../channels/Stage.js'
import type Guild from './Guild.js'

export class StageInstance extends Base {
  /** The client manager. */
  client: Client
  /** The associated stage channel */
  channel: StageChannel | { id: string }
  /** The guild of the associated stage channel */
  guild: Guild | { id: string }
  /** The stage channel topic */
  topic?: string | null

  constructor(data: DiscordStageInstance, client: Client) {
    super(data.id)

    this.client = client
    this.channel = client.getChannel(data.channel_id) ?? {
      id: data.channel_id,
    }
    this.guild = client.guilds.get(data.guild_id) ?? { id: data.guild_id }
    this.update(data)
  }

  /**
   * @deprecated Use `.client` instead.
   */
  get _client(): Client {
    return this.client
  }

  update(data: DiscordStageInstance) {
    if (data.topic !== undefined) {
      this.topic = data.topic
    }
  }

  /** Delete this stage instance */
  async delete(): Promise<void> {
    return await this.client.deleteStageInstance.call(this.client, this.channel.id)
  }

  /** Update this stage instance */
  async edit(options: StageInstanceOptions): Promise<StageInstance> {
    return await this.client.editStageInstance.call(this.client, this.channel.id, options)
  }
}

export default StageInstance
