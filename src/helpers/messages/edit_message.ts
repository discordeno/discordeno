import { botId } from "../../bot.ts";
import { rest } from "../../rest/rest.ts";
import { Message, structures } from "../../structures/mod.ts";
import { Errors } from "../../types/misc/errors.ts";
import { PermissionStrings } from "../../types/permissions/permission_strings.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotChannelPermissions } from "../../util/permissions.ts";

/** Edit the message. */
export async function editMessage(
  message: Message,
  content: string | MessageContent,
) {
  if (message.author.id !== botId) {
    throw "You can only edit a message that was sent by the bot.";
  }

  if (typeof content === "string") content = { content };

  const requiredPerms: PermissionStrings[] = ["SEND_MESSAGES"];

  if (content.tts) requiredPerms.push("SEND_TTS_MESSAGES");

  await requireBotChannelPermissions(message.channelId, requiredPerms);

  if (content.content && content.content.length > 2000) {
    throw new Error(Errors.MESSAGE_MAX_LENGTH);
  }

  const result = await rest.runMethod(
    "patch",
    endpoints.CHANNEL_MESSAGE(message.channelId, message.id),
    content,
  );

  return structures.createDiscordenoMessage(result as MessageCreateOptions);
}
