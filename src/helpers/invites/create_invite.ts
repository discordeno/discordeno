import { RequestManager } from "../../rest/request_manager.ts";
import { CreateInviteOptions } from "../../types/mod.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotChannelPermissions } from "../../util/permissions.ts";

/** Creates a new invite for this channel. Requires CREATE_INSTANT_INVITE */
export async function createInvite(
  channelID: string,
  options: CreateInviteOptions,
) {
  await requireBotChannelPermissions(channelID, ["CREATE_INSTANT_INVITE"]);

  if (options.max_age && (options.max_age > 604800 || options.max_age < 0)) {
    console.log(
      `The max age for invite created in ${channelID} was not between 0-604800. Using default values instead.`,
    );
    options.max_age = undefined;
  }

  if (options.max_uses && (options.max_uses > 100 || options.max_uses < 0)) {
    console.log(
      `The max uses for invite created in ${channelID} was not between 0-100. Using default values instead.`,
    );
    options.max_uses = undefined;
  }

  const result = await RequestManager.post(
    endpoints.CHANNEL_INVITES(channelID),
    options,
  );

  return result;
}
