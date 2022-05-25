import type { Bot } from "../../bot.ts";
import { OverwriteTypes, PermissionStrings } from "../../types/shared.ts";

/** Edit the channel permission overwrites for a user or role in this channel. Requires `MANAGE_ROLES` permission. */
export async function editChannelOverwrite(
  bot: Bot,
  channelId: bigint,
  overwrite: OverwriteReadable,
) {
  await bot.rest.runMethod<undefined>(
    bot.rest,
    "put",
    bot.constants.routes.CHANNEL_OVERWRITE(channelId, overwrite.id),
    {
      allow: overwrite.allow ? bot.utils.calculateBits(overwrite.allow) : "0",
      deny: overwrite.deny ? bot.utils.calculateBits(overwrite.deny) : "0",
      type: overwrite.type,
    },
  );
}

export interface OverwriteReadable {
  /** Role or user id */
  id: bigint;
  /** Either 0 (role) or 1 (member) */
  type: OverwriteTypes;
  /** Permission bit set */
  allow?: PermissionStrings[];
  /** Permission bit set */
  deny?: PermissionStrings[];
}

export interface Overwrite {
  /** Role or user id */
  id: bigint;
  /** Either 0 (role) or 1 (member) */
  type: OverwriteTypes;
  /** Permission bit set */
  allow?: bigint;
  /** Permission bit set */
  deny?: bigint;
}
