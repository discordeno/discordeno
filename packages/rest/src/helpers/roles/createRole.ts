import type {
  BigString,
  DiscordRole,
  DiscordCreateGuildRole,
  PermissionStrings
} from '@discordeno/types'
import { calculateBits } from '@discordeno/utils'
import type { RestManager } from '../../restManager.js'
import type { Role } from '../../transformers/role.js'

/**
 * Creates a role in a guild.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild to create the role in.
 * @param options - The parameters for the creation of the role.
 * @returns An instance of the created {@link Role}.
 *
 * @remarks
 * Requires the `MANAGE_ROLES` permission.
 *
 * Fires a _Guild Role Create_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#create-guild-role}
 */
export async function createRole (
  rest: RestManager,
  guildId: BigString,
  options: CreateGuildRole,
  reason?: string
): Promise<Role> {
  const result = await rest.runMethod<DiscordRole>(
    rest,
    'POST',
    rest.constants.routes.GUILD_ROLES(guildId),
    {
      name: options.name,
      color: options.color,
      hoist: options.hoist,
      mentionable: options.mentionable,
      permissions: calculateBits(options?.permissions ?? []),
      icon: options.icon,
      unicode_emoji: options.unicodeEmoji,
      reason
    } as DiscordCreateGuildRole
  )

  return rest.transformers.role(rest, {
    role: result,
    guildId: rest.transformers.snowflake(guildId)
  })
}

export interface CreateGuildRole {
  /** Name of the role, max 100 characters, default: "new role" */
  name?: string
  /** Bitwise value of the enabled/disabled permissions, default: everyone permissions in guild */
  permissions?: PermissionStrings[]
  /** RGB color value, default: 0 */
  color?: number
  /** Whether the role should be displayed separately in the sidebar, default: false */
  hoist?: boolean
  /** Whether the role should be mentionable, default: false */
  mentionable?: boolean
  /** The role's unicode emoji (if the guild has the `ROLE_ICONS` feature) */
  unicodeEmoji?: string
  /** the role's icon image (if the guild has the `ROLE_ICONS` feature) */
  icon?: string
}
