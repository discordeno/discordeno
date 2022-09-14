import type { Bot } from "../../bot.ts";
import { BigString, WithReason } from "../../mod.ts";
import { OverwriteReadable } from "../../types/discordeno.ts";

/**
 * Edits the permission overrides for a user or role in a channel.
 *
 * @param bot - The bot instance to use to make the request.
 * @param channelId - The ID of the channel to edit the permission overrides of.
 * @param options - The permission override.
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
  options: EditChannelPermissionOverridesOptions,
): Promise<void> {
  return await bot.rest.runMethod<void>(
    bot.rest,
    "PUT",
    bot.constants.routes.CHANNEL_OVERWRITE(channelId, options.id),
    {
      allow: options.allow ? bot.utils.calculateBits(options.allow) : "0",
      deny: options.deny ? bot.utils.calculateBits(options.deny) : "0",
      type: options.type,
      reason: options.reason,
    },
  );
}

export interface EditChannelPermissionOverridesOptions extends OverwriteReadable, WithReason {}
