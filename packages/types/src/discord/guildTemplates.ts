/** Types for: https://discord.com/developers/docs/resources/guild-template */

import type { DiscordRole, DiscordUser } from '../discord.js'
import type { PickPartial } from '../shared.js'
import type { DiscordChannel, DiscordOverwrite } from './channels.js'
import type { DiscordGuild } from './guilds.js'

/** https://discord.com/developers/docs/resources/guild-template#guild-template-object-guild-template-structure */
export interface DiscordTemplate {
  /** The template code (unique Id) */
  code: string
  /** Template name */
  name: string
  /** The description for the template */
  description: string | null
  /** Number of times this template has been used */
  usage_count: number
  /** The Id of the user who created the template */
  creator_id: string
  /** The user who created the template */
  creator: DiscordUser
  /** When this template was created */
  created_at: string
  /** When this template was last synced to the source guild */
  updated_at: string
  /** The Id of the guild this template is based on */
  source_guild_id: string
  /** The guild snapshot this template contains */
  serialized_source_guild: DiscordTemplateSerializedSourceGuild
  is_dirty: boolean | null
}

/** https://discord.com/developers/docs/resources/guild-template#guild-template-object-guild-template-structure specificly the serialized_source_guild property */
export type DiscordTemplateSerializedSourceGuild = Omit<
  PickPartial<
    DiscordGuild,
    | 'name'
    | 'description'
    | 'verification_level'
    | 'default_message_notifications'
    | 'explicit_content_filter'
    | 'preferred_locale'
    | 'afk_timeout'
    | 'system_channel_flags'
  >,
  'roles' | 'channels' | 'afk_channel_id' | 'system_channel_id'
> & {
  afk_channel_id: number | null
  system_channel_id: number | null
  roles: Array<
    Omit<PickPartial<DiscordRole, 'name' | 'color' | 'hoist' | 'mentionable' | 'permissions' | 'icon' | 'unicode_emoji'>, 'id'> & {
      id: number
    }
  >
  channels: Array<
    Omit<
      PickPartial<
        DiscordChannel,
        | 'name'
        | 'type'
        | 'position'
        | 'topic'
        | 'bitrate'
        | 'user_limit'
        | 'nsfw'
        | 'rate_limit_per_user'
        | 'default_auto_archive_duration'
        | 'available_tags'
        | 'default_reaction_emoji'
        | 'default_thread_rate_limit_per_user'
        | 'default_sort_order'
        | 'default_forum_layout'
      >,
      'id' | 'permission_overwrites' | 'parent_id'
    > & {
      id: number
      permission_overwrites: DiscordOverwrite & { id: number }
      parent_id: number | null
    }
  >
}
