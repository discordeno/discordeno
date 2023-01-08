/* eslint-disable no-useless-call */

import type { DiscordInvite, DiscordInviteCreate, DiscordMemberWithUser, TargetTypes } from '@discordeno/types'
import Base from '../Base.js'
import type Client from '../Client.js'
import type Channel from './channels/Channel.js'
import Guild from './guilds/Guild.js'
import Member from './guilds/Member.js'
import User from './users/User.js'

export class Invite {
  /** The client object. */
  client: Client
  /** The invite code (unique Id) */
  code: string
  /** The channel this invite is for */
  channel?: Channel
  /** The guild this invite is for. */
  guild?: Guild
  /** The user who created this invite. */
  inviter?: User
  /** The amount of times this invite has been used. */
  uses: number | null = null
  /** The amount of times this invite can be used. */
  maxUses: number | null = null
  /** How long the invite is valid for (in seconds) */
  maxAge: number | null = null
  /** Whether or not the invite is temporary (invited users will be kicked on disconnect unless they're assigned a role) */
  temporary: boolean = false
  /** The time at which the invite was created */
  createdAt?: number

  presenceCount?: number | null
  memberCount?: number | null

  stageInstance?: {
    members: Member[]
    participantCount: number
    speakerCount: number
    topic: string
  } | null

  targetApplicationID?: string | null
  targetType?: TargetTypes | null
  targetUser?: User | null

  constructor(data: DiscordInvite | DiscordInviteCreate, client: Client) {
    // super();
    this.client = client
    this.code = data.code
    // @ts-expect-error js hacks
    this.channel = data.channel

    if (data.inviter) {
      this.inviter = new User(data.inviter, client)
      client.users.set(this.inviter.id, this.inviter)
    }

    if (this.isInviteCreate(data)) {
      this.uses = data.uses !== undefined ? data.uses : null
      this.maxUses = data.max_uses !== undefined ? data.max_uses : null
      this.maxAge = data.max_age !== undefined ? data.max_age : null
      this.temporary = data.temporary !== undefined ? data.temporary : false
      this.createdAt = Date.parse(data.created_at)
    } else {
      if (data.guild) {
        if (client.guilds.has(data.guild.id!)) {
          if (data.channel) {
            // @ts-expect-error should work i think dumb partials
            const channel = new GuildChannel(data.channel, client)
            client.guilds.get(data.guild.id!)?.channels.set(channel.id, channel)
          }
        } else {
          // @ts-expect-error js hacks
          this.guild = new Guild(data.guild, client)
        }
      }

      this.presenceCount = data.approximate_presence_count !== undefined ? data.approximate_presence_count : null
      this.memberCount = data.approximate_member_count !== undefined ? data.approximate_member_count : null
      if (data.stage_instance !== undefined) {
        this.stageInstance = {
          members: data.stage_instance.members.map((m) => {
            // @ts-expect-error js hacks
            const member = new Member(m as DiscordMemberWithUser, this.guild, client)
            this.guild?.members.set(member.id, member)
            return member
          }),
          participantCount: data.stage_instance.participant_count,
          speakerCount: data.stage_instance.speaker_count,
          topic: data.stage_instance.topic,
        }
      } else {
        this.stageInstance = null
      }
    }

    this.targetApplicationID = data.target_application !== undefined ? data.target_application.id : null
    this.targetType = data.target_type !== undefined ? data.target_type : null
    this.targetUser = data.target_user !== undefined ? new User(data.target_user, client) : null
    if (this.targetUser) client.users.set(this.targetUser.id, this.targetUser)
  }

  /**
   * @deprecated Use .client
   */
  get _client(): Client {
    return this.client
  }

  /**
   * @deprecated Use .createdAt
   */
  get _createdAt(): number | undefined {
    return this.createdAt
  }

  /** Delete the invite */
  async delete(reason?: string): Promise<void> {
    return await this.client.deleteInvite.call(this.client, this.code, reason)
  }

  toString(): string {
    return `[Invite ${this.code}]`
  }

  toJSON(props = []): Record<string, any> {
    return Base.prototype.toJSON([
      'channel',
      'code',
      'createdAt',
      'guild',
      'maxAge',
      'maxUses',
      'memberCount',
      'presenceCount',
      'revoked',
      'temporary',
      'uses',
      ...props,
    ])
  }

  isInviteCreate(data: DiscordInvite | DiscordInviteCreate): data is DiscordInviteCreate {
    return Reflect.has(data, 'created_at')
  }
}

export default Invite
