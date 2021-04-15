import { botId } from "../../bot.ts";
import { rest } from "../../rest/rest.ts";
import { DiscordenoMessage } from "../../structures/message.ts";
import { structures } from "../../structures/mod.ts";
import { EditMessage } from "../../types/messages/edit_message.ts";
import { DiscordMessage } from "../../types/messages/message.ts";
import { Errors } from "../../types/misc/errors.ts";
import { PermissionStrings } from "../../types/permissions/permission_strings.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotChannelPermissions } from "../../util/permissions.ts";

/** Edit the message. */
export async function editMessage(
  message: DiscordenoMessage,
  content: string | EditMessage,
) {
  if (message.author.id !== botId) {
    throw "You can only edit a message that was sent by the bot.";
  }

  if (typeof content === "string") content = { content };

  const requiredPerms: PermissionStrings[] = ["SEND_MESSAGES"];

  await requireBotChannelPermissions(message.channelId, requiredPerms);

  if (content.content && content.content.length > 2000) {
    throw new Error(Errors.MESSAGE_MAX_LENGTH);
  }

  const result: DiscordMessage = await rest.runMethod(
    "patch",
    endpoints.CHANNEL_MESSAGE(message.channelId, message.id),
    content,
  );

  return structures.createDiscordenoMessage(result);
}
