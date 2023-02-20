/* eslint-disable no-useless-call */
import type { DiscordIntegration, DiscordIntegrationApplication } from '@discordeno/types'
import Base from '../../Base.js'
import type { IntegrationOptions } from '../../typings.js'
import User from '../users/User.js'
import type Guild from './Guild.js'

export class GuildIntegration extends Base {
  /** The guild where this integration exists. */
  guild: Guild
  /** The name of the integration. */
  name: string
  /** The type of integration. */
  type: string
  /** The user connected to the integration. */
  user?: User
  /** Whether the integration is syncing or not. */
  syncing?: boolean
  /** THe Unix timestamp of last integration sync. */
  syncedAt?: number
  /** The number of subscribers. */
  subscriberCount?: number
  /** The role id of the role connected to the integration. */
  roleID?: string
  /** WHether or not the application was revoked. */
  revoked?: boolean
  /** Whether integration emoticons are enabled or not. */
  enableEmoticons?: boolean
  /** Behavior of expired subscriptions */
  expireBehavior?: number
  /** Grace period for expired subscriptions. */
  expireGracePeriod?: number
  /** Whether the integration is enabled or not. */
  enabled?: boolean
  /** The bot/oauth2 application for integration. */
  application?: DiscordIntegrationApplication

  /** Info on the integration account */
  account: {
    /** The id of the integration account. */
    id: string
    /** The name of the integration account. */
    name: string
  }

  constructor(data: DiscordIntegration, guild: Guild) {
    super(data.id)

    this.guild = guild
    this.name = data.name
    this.type = data.type

    if (data.role_id !== undefined) {
      this.roleID = data.role_id
    }

    if (data.user) {
      this.user = new User(data.user, guild.client)
      guild.client.users.set(this.user.id, this.user)
    }

    this.account = data.account // not worth making a class for

    this.update(data)
  }

  update(data: DiscordIntegration): void {
    this.enabled = data.enabled
    if (data.syncing !== undefined) {
      this.syncing = data.syncing
    }
    if (data.expire_behavior !== undefined) {
      this.expireBehavior = data.expire_behavior
    }
    if (data.expire_behavior !== undefined) {
      this.expireGracePeriod = data.expire_grace_period
    }
    if (data.enable_emoticons) {
      this.enableEmoticons = data.enable_emoticons
    }
    if (data.subscriber_count !== undefined) {
      this.subscriberCount = data.subscriber_count
    }
    if (data.synced_at !== undefined) {
      this.syncedAt = Date.parse(data.synced_at)
    }
    if (data.revoked !== undefined) {
      this.revoked = data.revoked
    }
    if (data.application !== undefined) {
      this.application = data.application
    }
  }

  /** Delete the guild integration */
  async delete(): Promise<void> {
    return await this.guild.client.deleteGuildIntegration.call(this.guild.client, this.guild.id, this.id)
  }

  /** Edit the guild integration */
  async edit(options: IntegrationOptions): Promise<void> {
    return await this.guild.client.editGuildIntegration.call(this.guild.client, this.guild.id, this.id, options)
  }

  /** Force the guild integration to sync */
  async sync(): Promise<void> {
    return await this.guild.client.syncGuildIntegration.call(this.guild.client, this.guild.id, this.id)
  }

  toJSON(props: string[] = []): Record<string, any> {
    return super.toJSON([
      'account',
      'application',
      'enabled',
      'enableEmoticons',
      'expireBehavior',
      'expireGracePeriod',
      'name',
      'revoked',
      'roleID',
      'subscriberCount',
      'syncedAt',
      'syncing',
      'type',
      'user',
      ...props,
    ])
  }
}

export default GuildIntegration
