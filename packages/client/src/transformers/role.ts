import { DiscordRole, Optionalize } from '@discordeno/types'
import { Client } from '../client.js'
import { RoleToggles } from './toggles/role.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformRole (
  client: Client,
  payload: { role: DiscordRole } & { guildId: bigint }
) {
  const role = {
    name: payload.role.name,
    guildId: payload.guildId,
    position: payload.role.position,
    color: payload.role.color,
    toggles: new RoleToggles(payload.role),

    id: client.transformers.snowflake(payload.role.id),
    botId: payload.role.tags?.bot_id
      ? client.transformers.snowflake(payload.role.tags.bot_id)
      : undefined,
    integrationId: payload.role.tags?.integration_id
      ? client.transformers.snowflake(payload.role.tags.integration_id)
      : undefined,
    permissions: client.transformers.snowflake(payload.role.permissions),
    icon: payload.role.icon
      ? client.utils.iconHashToBigInt(payload.role.icon)
      : undefined,
    unicodeEmoji: payload.role.unicode_emoji
  }

  return role as Optionalize<typeof role>
}

export interface Role extends ReturnType<typeof transformRole> {}
