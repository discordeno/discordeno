/* eslint-disable no-useless-call */
import type { DiscordTemplate } from '@discordeno/types'
import Base from '../../Base.js'
import type Client from '../../Client.js'
import type { GuildTemplateOptions } from '../../typings.js'
import User from '../users/User.js'
import Guild from './Guild.js'

export class GuildTemplate {
  /** The client class itself. */
  client: Client
  /** The template code (unique Id) */
  code: string
  /** Template name */
  name: string
  /** The description for the template */
  description: string | null
  /** Number of times this template has been used */
  usageCount: number
  /** The user who created the template */
  creator: User
  /** When this template was created */
  createdAt: number
  /** When this template was last synced to the source guild */
  updatedAt: number
  /** The guild snapshot this template contains */
  serializedSourceGuild: Guild
  /** The guild this template is based on. If the guild is not cached, this will be an object with `id` key. No other property is guaranteed */
  sourceGuild: Guild | { id: string }
  /** Whether the template has un-synced changes */
  isDirty: boolean | null

  constructor(data: DiscordTemplate, client: Client) {
    this.client = client
    this.code = data.code
    this.createdAt = Date.parse(data.created_at)
    this.creator = new User(data.creator, client)
    this.client.users.set(this.creator.id, this.creator)
    this.description = data.description
    this.isDirty = data.is_dirty
    this.name = data.name
    this.sourceGuild = client.guilds.get(data.source_guild_id) ?? { id: data.source_guild_id }
    this.updatedAt = Date.parse(data.updated_at)
    this.usageCount = data.usage_count

    data.serialized_source_guild.features = []
    // @ts-expect-error Hacks to get this to not error
    this.serializedSourceGuild = new Guild(data.serialized_source_guild, client)
  }

  /**
   * @deprecated Use .client instead.
   */
  get _client(): Client {
    return this.client
  }

  /** Create a guild based on this template. Only for bots in less than 10 guilds */
  async createGuild(name: string, icon?: string): Promise<Guild> {
    return await this.client.createGuildFromTemplate.call(this.client, this.code, name, icon)
  }

  /** Delete this template */
  async delete(): Promise<void> {
    return await this.client.deleteGuildTemplate.call(this.client, this.sourceGuild.id, this.code)
  }

  /** Edit this template */
  async edit(options: GuildTemplateOptions): Promise<GuildTemplate> {
    return await this.client.editGuildTemplate.call(this.client, this.sourceGuild.id, this.code, options)
  }

  /** Force this template to sync to the guild's current state */
  async sync(): Promise<GuildTemplate> {
    return await this.client.syncGuildTemplate.call(this.client, this.sourceGuild.id, this.code)
  }

  toJSON(props: string[] = []): Record<string, any> {
    return Base.prototype.toJSON.call(this, [
      'code',
      'createdAt',
      'creator',
      'description',
      'isDirty',
      'name',
      'serializedSourceGuild',
      'sourceGuild',
      'updatedAt',
      'usageCount',
      ...props,
    ])
  }
}

export default GuildTemplate
