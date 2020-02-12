import Client from "../module/client"
import { endpoints } from "../constants/discord"

export interface Edit_Member_Options {
  /** Value to set users nickname to. Requires MANAGE_NICKNAMES permission. */
  nick?: string
  /** Array of role ids the member is assigned. Requires MANAGE_ROLES permission. */
  roles?: string[]
  /** Whether the user is muted in voice channels. Requires MUTE_MEMBERS permission. */
  mute?: boolean
  /** Whether the user is deafened in voice channels. Requires DEAFEN_MEMBERS permission. */
  deaf?: boolean
  /** The id of the channel to move user to if they are connected to voice. To kick the user from their current channel, set to null. Requires MOVE_MEMBERS permission. When moving members to channels, must have permissions to both CONNECT to the channel and have the MOVE_MEMBER permission. */
  channel_id?: string | null
}

export interface Member {
  edit(options: Edit_Member_Options): Promise<Member>
}

export const createMember = (data: unknown, guild: Guild, client: Client) => {
  const Member: Member = {
    edit: (options) => {
        // TODO: check if has MANAGE_NICKNAME Permission
        // TODO: check if it is a valid nickname like 32 characters
        options.nick = undefined

        // TODO: check if has MANAGE_ROLES permission
      options.roles = undefined

      // TODO: This should check if the member is in a voice channel
          // TODO: CHeck if has MUTE_MEMBERS permission
      options.mute = undefined
          // TODO: check if has DEAFEN_MEMBERS permission
      options.deaf = undefined
      // TODO: if channel id is provided check if the bot has CONNECT and MOVE in channel and current channel
      options.channel_id = undefined

      return client.RequestManager.patch(endpoints.GUILD_MEMBER(guild.id, data.id), options),
    }
  }
}
