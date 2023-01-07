/* eslint-disable no-useless-call */
/* eslint-disable @typescript-eslint/return-await */
import type { DiscordChannel } from "@discordeno/types"
import type { StageInstanceOptions } from "../../typings.js"
import type StageInstance from "../guilds/StageInstance.js"
import VoiceChannel from "./Voice.js"


export class StageChannel extends VoiceChannel {
  /** The topic of the channel */
  topic?: string | null

  update(data: DiscordChannel): void {
    super.update(data)

    if (data.topic !== undefined) {
      this.topic = data.topic
    }
  }

  /** Create a stage instance */
  async createInstance(options: StageInstanceOptions): Promise<StageInstance> {
    return await this.client.createStageInstance.call(this.client, this.id, options)
  }

  /** Delete the stage instance for this channel */
  async deleteInstance(): Promise<void> {
    return await this.client.deleteStageInstance.call(this.client, this.id)
  }

  /** Update the stage instance for this channel */
  async editInstance(options: StageInstanceOptions): Promise<StageInstance> {
    return await this.client.editStageInstance.call(this.client, this.id, options)
  }

  /** Get the stage instance for this channel */
  async getInstance(): Promise<StageInstance> {
    return await this.client.getStageInstance.call(this.client, this.id)
  }

  toJSON(props: string[] = []): Record<string, any> {
    return super.toJSON(['topic', ...props])
  }
}

export default StageChannel
