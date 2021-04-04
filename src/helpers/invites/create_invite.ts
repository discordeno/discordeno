import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotChannelPermissions } from "../../util/permissions.ts";

/** Creates a new invite for this channel. Requires CREATE_INSTANT_INVITE */
export async function createInvite(
  channelId: string,
  options: CreateInviteOptions,
) {
  await requireBotChannelPermissions(channelId, ["CREATE_INSTANT_INVITE"]);

  if (options.max_age && (options.max_age > 604800 || options.max_age < 0)) {
    console.log(
      `The max age for invite created in ${channelId} was not between 0-604800. Using default values instead.`,
    );
    options.max_age = undefined;
  }

  if (options.max_uses && (options.max_uses > 100 || options.max_uses < 0)) {
    console.log(
      `The max uses for invite created in ${channelId} was not between 0-100. Using default values instead.`,
    );
    options.max_uses = undefined;
  }

  const result = await rest.runMethod(
    "post",
    endpoints.CHANNEL_INVITES(channelId),
    options,
  );

  return result;
}
