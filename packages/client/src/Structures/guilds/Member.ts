/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-useless-call */
/* eslint-disable @typescript-eslint/return-await */

import type { BigString, DiscordMember, DiscordMemberWithUser } from '@discordeno/types'
import Base from '../../Base.js'
import type Client from '../../Client.js'
import type { ImageFormat, ImageSize } from '../../Client.js'
import { GUILD_AVATAR } from '../../Endpoints.js'
import type { MemberOptions } from '../../typings.js'
import User from '../users/User.js'
import type Guild from './Guild.js'

export class Member extends Base {
  /** The client manager */
  client: Client
  /** An array of role IDs this member is a part of */
  roles: BigString[]
  /** The guild the member is in */
  guild: Guild
  /** The user object of the member */
  user: User
  /** The server nickname of the member. */
  nick: string | null
  /** The timestamp when this member joined the server. */
  joinedAt?: number
  /** Timestamp of when the member boosted the guild */
  premiumSince?: number
  /** Whether the user has not yet passed the guild's Membership Screening requirements */
  pending?: boolean
  /** Timestamp of timeout expiry. If `null`, the member is not timed out */
  communicationDisabledUntil?: number | null

  /** The compressed form of the members avatar. */
  _avatar?: bigint

  constructor(data: (DiscordMember & { id: BigString }) | DiscordMemberWithUser, guild: Guild, client: Client) {
    super(client.isDiscordMemberWithUser(data) ? data.user.id : data.id)
    this.client = client
    this.guild = guild
    this.nick = null
    this.roles = data.roles ?? []

    const userID = client.isDiscordMemberWithUser(data) ? data.user.id : data.id

    this.user = client.users.get(userID)!
    if (data.user) {
      this.user = new User(data.user, client)
      client.users.set(this.user.id, this.user)
    }

    if (!this.user) {
      throw new Error('User associated with Member not found: ' + userID)
    }

    this.update(data)
  }

  update(data: (DiscordMember & { id: BigString }) | DiscordMemberWithUser) {
    if (data.joined_at !== undefined) {
      this.joinedAt = data.joined_at ? Date.parse(data.joined_at) : undefined
    }

    if (data.premium_since !== undefined) {
      this.premiumSince = data.premium_since === null ? undefined : Date.parse(data.premium_since)
    }

    // eslint-disable-next-line no-prototype-builtins
    if (data.hasOwnProperty('mute') && this.guild) {
      // TODO: voice stuff
      // const state = this.guild.voiceStates.get(this.id);
      // if (
      //   data.channel_id === null &&
      //   !data.mute &&
      //   !data.deaf &&
      //   !data.suppress
      // ) {
      //   this.guild.voiceStates.delete(this.id);
      // } else if (state) {
      //   state.update(data);
      // } else if (data.channel_id || data.mute || data.deaf || data.suppress) {
      //   this.guild.voiceStates.update(data);
      // }
    }

    if (data.nick !== undefined) this.nick = data.nick
    if (data.roles !== undefined) this.roles = data.roles
    if (data.pending !== undefined) this.pending = data.pending
    if (data.avatar !== undefined) this._avatar = data.avatar ? this.client.iconHashToBigInt(data.avatar) : undefined

    if (data.communication_disabled_until !== undefined) {
      if (data.communication_disabled_until !== null) {
        this.communicationDisabledUntil = Date.parse(data.communication_disabled_until)
      } else {
        this.communicationDisabledUntil = data.communication_disabled_until
      }
    }
  }

  get avatar(): string | undefined {
    return this._avatar ? this.client.iconBigintToHash(this._avatar) : undefined
  }

  get accentColor() {
    return this.user.accentColor
  }

  get avatarURL() {
    return this.avatar ? this.client._formatImage(GUILD_AVATAR(this.guild.id, this.id, this.avatar)) : this.user.avatarURL
  }

  get banner() {
    return this.user.banner
  }

  get bannerURL() {
    return this.user.bannerURL
  }

  get bot() {
    return this.user.bot
  }

  get createdAt() {
    return this.user.createdAt
  }

  get defaultAvatar() {
    return this.user.defaultAvatar
  }

  get defaultAvatarURL() {
    return this.user.defaultAvatarURL
  }

  get discriminator() {
    return this.user.discriminator
  }

  get mention() {
    return `<@!${this.id}>`
  }

  get permissions() {
    return this.guild.permissionsOf(this)
  }

  get staticAvatarURL() {
    return this.user.staticAvatarURL
  }

  get username() {
    return this.user.username
  }

  get voiceState() {
    if (this.guild?.voiceStates.has(this.id)) {
      return this.guild.voiceStates.get(this.id)
    } else {
      // @ts-expect-error some eris magic at play here
      return new VoiceState({ id: this.id })
    }
  }

  /** Add a role to the guild member */
  async addRole(roleID: BigString, reason?: string): Promise<void> {
    return await this.client.addGuildMemberRole.call(this.client, this.guild.id, this.id, roleID, reason)
  }

  /** Ban the user from the guild */
  async ban(deleteMessageDays = 0, reason?: string): Promise<void> {
    return await this.client.banGuildMember.call(this.client, this.guild.id, this.id, deleteMessageDays, reason)
  }

  /** Edit the guild member */
  async edit(options: MemberOptions, reason?: string): Promise<Member> {
    return await this.client.editGuildMember.call(this.client, this.guild.id, this.id, options, reason)
  }

  /** Get the member's avatar with the given format and size */
  dynamicAvatarURL(format?: ImageFormat, size?: ImageSize): string {
    return this.avatar
      ? this.client._formatImage(GUILD_AVATAR(this.guild.id, this.id, this.avatar), format, size)
      : this.user.dynamicAvatarURL(format, size)
  }

  /** Kick the member from the guild */
  async kick(reason?: string): Promise<void> {
    return await this.client.kickGuildMember.call(this.client, this.guild.id, this.id, reason)
  }

  /** Remove a role from the guild member */
  async removeRole(roleID: BigString, reason?: string): Promise<void> {
    return await this.client.removeGuildMemberRole.call(this.client, this.guild.id, this.id, roleID, reason)
  }

  /** Unban the user from the guild */
  async unban(reason?: string): Promise<void> {
    return await this.client.unbanGuildMember.call(this.client, this.guild.id, this.id, reason)
  }

  toJSON(props: string[] = []): Record<string, any> {
    return super.toJSON([
      'activities',
      'communicationDisabledUntil',
      'joinedAt',
      'nick',
      'pending',
      'premiumSince',
      'roles',
      'status',
      'user',
      'voiceState',
      ...props,
    ])
  }
}

export default Member
