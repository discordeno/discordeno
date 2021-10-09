import { Bot } from "../bot.ts";
import { Role } from "../types/mod.ts";

export function transformRole(
  bot: Bot,
  payload: { role: Role } & {
    guildId: bigint;
  }
) {
  return {
    // TODO: decide if its better to spread like this or do manually
    ...payload,
    // UNTRANSFORMED STUFF HERE
    // TODO: decide if we should use spread above or do manually
    // name: payload.role.name,

    // TRANSFORMED STUFF BELOW
    id: bot.transformers.snowflake(payload.role.id),
    botId: payload.role.tags?.botId ? bot.transformers.snowflake(payload.role.tags?.botId) : undefined,
  };
}

export interface DiscordenoRole extends Omit<Role, "tags" | "id" | "permissions"> {
  /** The role id */
  id: bigint;
  /** The bot id that is associated with this role. */
  botId?: bigint;
  /** If this role is the nitro boost role. */
  isNitroBoostRole: boolean;
  /** The integration id that is associated with this role */
  integrationId: bigint;
  /** The roles guildId */
  guildId: bigint;
  /** Permission bit set */
  permissions: bigint;
  /** Holds all the boolean toggles. */
  bitfield: bigint;
}
