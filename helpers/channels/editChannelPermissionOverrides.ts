import type { Bot } from "../../bot.ts";
import { BigString, OverwriteTypes, PermissionStrings } from "../../types/shared.ts";

/**
 * Edits the permission overrides for a user or role in a channel.
 *
 * @param bot - The bot instance to use to make the request.
 * @param channelId - The ID of the channel to edit the permission overrides of.
 * @param overwrite - The permission override.
 *
 * @remarks
 * Requires the `MANAGE_ROLES` permission.
 *
 * Only permissions the bot user has in the guild or parent channel can be allowed/denied __unless__ the bot user has a `MANAGE_ROLES` permission override in the channel.
 *
 * Fires a _Channel Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#edit-channel-permissions}
 */
export async function editChannelPermissionOverrides(
  bot: Bot,
  channelId: BigString,
  overwrite: OverwriteReadable,
): Promise<void> {
  return await bot.rest.runMethod<void>(
    bot.rest,
    "PUT",
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
  id: BigString;
  /** Either 0 (role) or 1 (member) */
  type: OverwriteTypes;
  /** Permission bit set */
  allow?: PermissionStrings[];
  /** Permission bit set */
  deny?: PermissionStrings[];
}

export interface Overwrite {
  /** Role or user id */
  id: BigString;
  /** Either 0 (role) or 1 (member) */
  type: OverwriteTypes;
  /** Permission bit set */
  allow?: BigString;
  /** Permission bit set */
  deny?: BigString;
}
