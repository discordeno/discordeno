/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-useless-call */
/* eslint-disable @typescript-eslint/return-await */

import type { DiscordRole, DiscordRoleTags } from '@discordeno/types'
import Base from '../../Base.js'
import { ROLE_ICON } from '../../Endpoints.js'
import type { RoleOptions } from '../../typings.js'
import Permission from '../Permission.js'
import type Guild from './Guild.js'

export class Role extends Base {
  permissions: Permission
  name: string
  color: number
  hoist: boolean
  mentionable: boolean
  managed: boolean
  icon?: string
  unicodeEmoji?: string
  position: number
  guild: Guild
  tags?: Omit<DiscordRoleTags, 'premium_subscriber'> & { premium_subscriber?: boolean }

  constructor(data: DiscordRole, guild: Guild) {
    super(data.id)
    this.guild = guild

    this.name = data.name
    this.permissions = new Permission(data.permissions)
    this.color = data.color
    this.hoist = !!data.hoist
    this.mentionable = !!data.mentionable
    this.managed = !!data.managed
    this.icon = data.icon
    this.unicodeEmoji = data.unicode_emoji
    this.position = data.position
    this.tags = data.tags
      ? {
          bot_id: data.tags.bot_id,
          integration_id: data.tags.integration_id,
          premium_subscriber: data.tags.premium_subscriber === null,
        }
      : undefined
  }

  update(data: DiscordRole) {
    if (data.name !== undefined) {
      this.name = data.name
    }
    if (data.mentionable !== undefined) {
      this.mentionable = data.mentionable
    }
    if (data.managed !== undefined) {
      this.managed = data.managed
    }
    if (data.hoist !== undefined) {
      this.hoist = data.hoist
    }
    if (data.color !== undefined) {
      this.color = data.color
    }
    if (data.position !== undefined) {
      this.position = data.position
    }
    if (data.permissions !== undefined) {
      this.permissions = new Permission(data.permissions)
    }
    if (data.tags !== undefined) {
      this.tags = {
        bot_id: data.tags.bot_id,
        integration_id: data.tags.integration_id,
        premium_subscriber: data.tags.premium_subscriber === null,
      }
    }
    if (data.icon !== undefined) {
      this.icon = data.icon
    }
    if (data.unicode_emoji !== undefined) {
      this.unicodeEmoji = data.unicode_emoji
    }
  }

  get iconURL() {
    return this.icon ? this.guild.client._formatImage(ROLE_ICON(this.id, this.icon)) : null
  }

  get json() {
    return this.permissions.json
  }

  get mention() {
    return `<@&${this.id}>`
  }

  /** Delete the role */
  async delete(reason: string): Promise<void> {
    return await this.guild.client.deleteRole.call(this.guild.client, this.guild.id, this.id, reason)
  }

  /** Edit the guild role */
  async edit(options: RoleOptions, reason?: string): Promise<Role> {
    return await this.guild.client.editRole.call(this.guild.client, this.guild.id, this.id, options, reason)
  }

  /** Edit the role's position. Note that role position numbers are highest on top and lowest at the bottom. */
  async editPosition(position: number): Promise<void> {
    return await this.guild.client.editRolePosition.call(this.guild.client, this.guild.id, this.id, position)
  }

  toJSON(props: string[] = []): Record<string, any> {
    return super.toJSON(['color', 'hoist', 'icon', 'managed', 'mentionable', 'name', 'permissions', 'position', 'tags', 'unicodeEmoji', ...props])
  }
}

export default Role
