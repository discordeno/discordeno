/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { DiscordAuditLogChange, DiscordAuditLogEntry } from '@discordeno/types'
import { AuditLogEvents } from '@discordeno/types'
import Base from '../../Base.js'
import type GuildChannel from '../channels/Guild.js'
import type TextChannel from '../channels/Text.js'
import Invite from '../Invite.js'
import type Message from '../Message.js'
import type User from '../users/User.js'
import type Guild from './Guild.js'
import type Member from './Member.js'
import type Role from './Role.js'

export class GuildAuditLogEntry extends Base {
  /** The guild to which this entry belongs. */
  guild: Guild
  /** The action type of the entry. */
  actionType: AuditLogEvents
  /** The reason for the action. */
  reason: string | null
  /** The user that performed the action. */
  user?: User
  /** The properties of the targeted object before the action was taken. For example, if a channel was renamed from #general to #potato, this would be `{name: "general"}`` */
  before: Record<DiscordAuditLogChange['key'], DiscordAuditLogChange['old_value']>

  /** The properties of the targeted object after the action was taken. For example, if a channel was renamed from #general to #potato, this would be `{name: "potato"}`` */
  after: Record<DiscordAuditLogChange['key'], DiscordAuditLogChange['new_value']>

  /** The ID of the action target */
  targetID?: string
  /** The number of entities targeted. For example, for action type 26 (MEMBER_MOVE), this is the number of members that were moved/disconnected from the voice channel */
  count?: number
  /** The channel targeted in the entry, action types 26 (MEMBER_MOVE), 72/74/75 (MESSAGE_DELETE/PIN/UNPIN) and 83/84/85 (STAGE_INSTANCE_CREATE/UPDATE/DELETE) only */
  channel?: GuildChannel
  /** The message that was (un)pinned, action types 74/75 (MESSAGE_PIN/UNPIN) only. If the message is not cached, this will be an object with an `id` key. No other property is guaranteed. */
  message?: Message | { id: string }
  /** The number of days of inactivity to prune for, action type 21 (MEMBER_PRUNE) only */
  deleteMemberDays?: number
  /** The number of members pruned from the server, action type 21 (MEMBER_PRUNE) only */
  membersRemoved?: number
  /** The member described by the permission overwrite, action types 13-15 (CHANNEL\_OVERWRITE\_CREATE/UPDATE/DELETE) only. If the member is not cached, this could be {id: String} */
  member?: Member | { id: string }
  /** The role described by the permission overwrite, action types 13-15 (CHANNEL\_OVERWRITE\_CREATE/UPDATE/DELETE) only. If the role is not cached, this could be {id: String, name: String} */
  role?: Role | { id: string; name: string }

  constructor(data: DiscordAuditLogEntry, guild: Guild) {
    super(data.id)

    this.guild = guild
    this.actionType = data.action_type
    this.reason = data.reason ?? null
    this.user = data.user_id ? guild.client.users.get(data.user_id) : undefined
    this.before = {} as any
    this.after = {} as any
    if (data.changes) {
      data.changes.forEach((change) => {
        if (change.old_value !== undefined) {
          this.before[change.key] = change.old_value
        }
        if (change.new_value !== undefined) {
          this.after[change.key] = change.new_value
        }
      })
    }

    if (data.target_id) {
      this.targetID = data.target_id
    }
    if (data.options) {
      if (data.options.count) {
        this.count = +data.options.count
      }
      if (data.options.channel_id) {
        if (this.actionType >= 83) {
          this.channel = guild.threads.get(data.options.channel_id)
        } else {
          this.channel = guild.channels.get(data.options.channel_id)
        }
        if (data.options.message_id) {
          this.message = (this.channel && (this.channel as TextChannel).messages.get(data.options.message_id)) ?? {
            id: data.options.message_id,
          }
        }
      }
      if (data.options.delete_member_days) {
        this.deleteMemberDays = +data.options.delete_member_days
        this.membersRemoved = +data.options.members_removed
      }
      if (data.options.type) {
        if (data.options.type === '1') {
          this.member = guild.members.get(data.options.id) ?? {
            id: data.options.id,
          }
        } else if (data.options.type === '0') {
          this.role = guild.roles.get(data.options.id) ?? {
            id: data.options.id,
            name: data.options.role_name,
          }
        }
      }
    }
  }

  get target() {
    // pay more, get less
    if (this.actionType < 10) {
      // Guild
      return this.guild
    } else if (this.actionType < 20) {
      // Channel
      return this.guild?.channels.get(this.targetID!)
    } else if (this.actionType < 30) {
      // Member
      if (this.actionType === AuditLogEvents.MemberMove || this.actionType === AuditLogEvents.MemberDisconnect) {
        // MEMBER_MOVE / MEMBER_DISCONNECT
        return null
      }
      return this.guild?.members.get(this.targetID!)
    } else if (this.actionType < 40) {
      // Role
      return this.guild?.roles.get(this.targetID!)
    } else if (this.actionType < 50) {
      // Invite
      const changes = this.actionType === 42 ? this.before : this.after // Apparently the meaning of life is a deleted invite
      return new Invite(
        {
          code: changes.code as string,
          // @ts-expect-error idk why this is happening
          channel: changes.channel,
          guild: this.guild.toJSON(),
          uses: changes.uses as number,
          max_uses: changes.max_uses as number,
          max_age: changes.max_age as number,
          temporary: changes.temporary as boolean,
        },
        this.guild?.client,
      )
    } else if (this.actionType < 60) {
      // Webhook
      return null // Go get the webhook yourself
    } else if (this.actionType < 70) {
      // Emoji
      return this.guild?.emojis?.find((emoji) => emoji.id === this.targetID)
    } else if (this.actionType < 80) {
      // Message
      return this.guild?.client.users.get(this.targetID!)
    } else if (this.actionType < 83) {
      // Integrations
      return null
    } else if (this.actionType < 90) {
      // Stage Instances
      return this.guild?.threads.get(this.targetID!)
    } else if (this.actionType < 100) {
      // Sticker
      return this.guild?.stickers?.find((sticker) => sticker.id === this.targetID)
    } else {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      throw new Error('Unrecognized action type: ' + this.actionType)
    }
  }

  toJSON(props: string[] = []): Record<string, any> {
    return super.toJSON([
      'actionType',
      'after',
      'before',
      'channel',
      'count',
      'deleteMemberDays',
      'member',
      'membersRemoved',
      'reason',
      'role',
      'targetID',
      'user',
      ...props,
    ])
  }
}

export default GuildAuditLogEntry
