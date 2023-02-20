/* eslint-disable no-useless-call */
import type { BigString, DiscordThreadMember } from "@discordeno/types"
import Base from "../../../Base.js"
import type Client from "../../../Client.js"
import type Member from "../../guilds/Member.js"


export class ThreadMember extends Base {
  client: Client
  /** The user-thread settings of this member */
  flags: number
  /** The ID of the thread this member is a part of */
  threadID: BigString
  /** Timestamp of when the member joined the thread */
  joinTimestamp: number
  /** The guild member that this thread member belongs to. This will never be present when fetching over REST */
  guildMember?: Member

  constructor(data: DiscordThreadMember, client: Client) {
    super(data.user_id)

    this.client = client
    this.flags = data.flags
    this.threadID = data.id
    this.joinTimestamp = Date.parse(data.join_timestamp)
  }

  get _client(): Client {
    return this.client
  }

  /** Remove the member from the thread */
  async leave(): Promise<void> {
    return await this._client.leaveThread.call(this._client, this.threadID, this.id)
  }

  toJSON(props: string[] = []): Record<string, any> {
    return super.toJSON(['threadID', 'joinTimestamp', ...props])
  }
}

export default ThreadMember
