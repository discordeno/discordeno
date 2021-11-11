import { Bot } from "../bot.ts";
import { Role } from "../types/mod.ts";
import { SnakeCasedPropertiesDeep } from "../types/util.ts";

export function transformRole(
  bot: Bot,
  payload: { role: SnakeCasedPropertiesDeep<Role> } & {
    guildId: bigint;
  }
): DiscordenoRole {
  return {
    // UNTRANSFORMED STUFF HERE
    name: payload.role.name,
    guildId: payload.guildId,
    position: payload.role.position,
    color: payload.role.color,
    bitfield:
      (payload.role.hoist ? 1n : 0n) |
      (payload.role.managed ? 2n : 0n) |
      (payload.role.mentionable ? 4n : 0n) |
      (payload.role.tags?.premium_subscriber ? 8n : 0n),

    // TRANSFORMED STUFF BELOW
    id: bot.transformers.snowflake(payload.role.id),
    botId: payload.role.tags?.bot_id ? bot.transformers.snowflake(payload.role.tags.bot_id) : undefined,
    integrationId: payload.role.tags?.integration_id
      ? bot.transformers.snowflake(payload.role.tags.integration_id)
      : undefined,
    permissions: bot.transformers.snowflake(payload.role.permissions),
    icon: payload.role.icon ? bot.utils.iconHashToBigInt(payload.role.icon) : undefined,
    unicodeEmoji: payload.role.unicode_emoji,
  };
}

export interface DiscordenoRole
  extends Omit<Role, "tags" | "id" | "permissions" | "hoist" | "mentionable" | "managed" | "icon"> {
  /** The role id */
  id: bigint;
  /** The bot id that is associated with this role. */
  botId?: bigint;
  /** The integration id that is associated with this role */
  integrationId?: bigint;
  /** The roles guildId */
  guildId: bigint;
  /** Permission bit set */
  permissions: bigint;
  /** Holds all the boolean toggles. */
  bitfield: bigint;
  /** The role icon emoji icon */
  icon?: bigint;
  /** The role icon emoji unicode */
  unicodeEmoji?: string;
}
