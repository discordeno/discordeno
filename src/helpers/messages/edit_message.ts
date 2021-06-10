import { botId } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { rest } from "../../rest/rest.ts";
import { structures } from "../../structures/mod.ts";
import { Errors } from "../../types/discordeno/errors.ts";
import { EditMessage } from "../../types/messages/edit_message.ts";
import type { Message } from "../../types/messages/message.ts";
import type { PermissionStrings } from "../../types/permissions/permission_strings.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotChannelPermissions } from "../../util/permissions.ts";
import { snakelize, validateComponents } from "../../util/utils.ts";

/** Edit the message. */
export async function editMessage(channelId: bigint, messageId: bigint, content: string | EditMessage) {
  const message = await cacheHandlers.get("messages", messageId);

  if (message) {
    if (message.authorId !== botId) {
      throw new Error("You can only edit a message that was sent by the bot.");
    }
    const requiredPerms: PermissionStrings[] = ["SEND_MESSAGES"];

    await requireBotChannelPermissions(message.channelId, requiredPerms);
  }

  if (typeof content === "string") content = { content };

  if (content.components?.length) {
    validateComponents(content.components);
  }

  // TODO: v12 remove
  if (content.embed) {
    content.embeds = [content.embed, ...(content.embeds || [])];
    content.embed = undefined;
  }
  content.embeds?.splice(10);

  if (content.content && content.content.length > 2000) {
    throw new Error(Errors.MESSAGE_MAX_LENGTH);
  }

  const result = await rest.runMethod<Message>(
    "patch",
    endpoints.CHANNEL_MESSAGE(channelId, messageId),
    snakelize(content)
  );

  return await structures.createDiscordenoMessage(result);
}
