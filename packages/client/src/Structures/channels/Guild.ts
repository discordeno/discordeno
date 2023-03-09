/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-useless-call */
import type { BigString, DiscordChannel, OverwriteTypes } from '@discordeno/types'
import { BitwisePermissionFlags, ChannelTypes } from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type Client from '../../Client.js'
import type { EditChannelOptions, EditChannelPositionOptions } from '../../typings.js'
import type Guild from '../guilds/Guild.js'
import type Member from '../guilds/Member.js'
import Permission from '../Permission.js'
import PermissionOverwrite from '../PermissionOverwrite.js'
import Channel from './Channel.js'

export class GuildChannel extends Channel {
  position: number
  name: string
  parentID?: string | null
  guild: Guild
  nsfw: boolean
  permissionOverwrites = new Collection<BigString, PermissionOverwrite>()
  /** The RTC region ID of the channel (automatic if `null`) (guild voice channels only) */
  rtcRegion: string | null = null

  constructor(data: DiscordChannel, client: Client) {
    super(data, client)

    this.position = data.position ?? 0
    this.guild = client.guilds.get(data.guild_id!)!
    this.name = data.name ?? ''
    this.parentID = data.parent_id
    this.nsfw = !!data.nsfw
  }

  update(data: DiscordChannel): void {
    if (data.type !== undefined) {
      this.type = data.type
    }
    if (data.name !== undefined) {
      this.name = data.name
    }
    if (data.position !== undefined) {
      this.position = data.position
    }
    if (data.parent_id !== undefined) {
      this.parentID = data.parent_id
    }
    this.nsfw = !!data.nsfw
    if (data.permission_overwrites) {
      data.permission_overwrites.forEach((overwrite) => {
        const perms = new PermissionOverwrite(overwrite)
        this.permissionOverwrites.set(perms.id, perms)
      })
    }
  }

  /** Delete the channel */
  async delete(reason?: string): Promise<void> {
    return await this.client.deleteChannel.call(this.client, this.id, reason)
  }

  /** Delete a channel permission overwrite */
  async deletePermission(overwriteID: BigString, reason?: string): Promise<void> {
    return await this.client.deleteChannelPermission.call(this.client, this.id, overwriteID, reason)
  }

  /** Edit the channel's properties */
  async edit(options: EditChannelOptions, reason?: string) {
    return await this.client.editChannel.call(this.client, this.id, options, reason)
  }

  /** Create a channel permission overwrite */
  async editPermission(overwriteID: BigString, allow: bigint | number, deny: bigint | number, type: OverwriteTypes, reason?: string): Promise<void> {
    return await this.client.editChannelPermission.call(this.client, this.id, overwriteID, allow, deny, type, reason)
  }

  /** Edit the channel's position. Note that channel position numbers are lowest on top and highest at the bottom. */
  async editPosition(position: number, options?: EditChannelPositionOptions): Promise<void> {
    return await this.client.editChannelPosition.call(this.client, this.id, position, options)
  }

  /** Get the channel-specific permissions of a member */
  permissionsOf(memberID: BigString | Member): Permission {
    const member = ['string', 'bigint'].includes(typeof memberID) ? this.guild.members.get(memberID as BigString)! : (memberID as Member)
    let permission = this.guild.permissionsOf(member).allow
    if (permission & BigInt(BitwisePermissionFlags.ADMINISTRATOR)) {
      return new Permission(BitwisePermissionFlags.ADMINISTRATOR)
    }
    const channel =
      [ChannelTypes.PublicThread, ChannelTypes.PrivateThread, ChannelTypes.AnnouncementThread].includes(this.type) && this.parentID
        ? this.guild.channels.get(this.parentID)
        : this
    let overwrite = channel?.permissionOverwrites.get(this.guild.id)
    if (overwrite) {
      permission = (permission & ~overwrite.deny) | overwrite.allow
    }
    let deny = 0n
    let allow = 0n
    for (const roleID of member.roles) {
      if ((overwrite = channel?.permissionOverwrites.get(roleID))) {
        deny |= overwrite.deny
        allow |= overwrite.allow
      }
    }
    permission = (permission & ~deny) | allow
    overwrite = channel?.permissionOverwrites.get(member.id)
    if (overwrite) {
      permission = (permission & ~overwrite.deny) | overwrite.allow
    }
    return new Permission(permission)
  }

  toJSON(props: string[] = []): Record<string, any> {
    return super.toJSON(['name', 'nsfw', 'parentID', 'permissionOverwrites', 'position', ...props])
  }
}

export default GuildChannel
