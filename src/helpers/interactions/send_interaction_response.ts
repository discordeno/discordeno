import type { DiscordenoInteractionResponse } from "../../types/discordeno/interaction_response.ts";
import type { Bot } from "../../bot.ts";
import { Embed } from "../../types/embeds/embed.ts";
import { AllowedMentions } from "../../types/messages/allowed_mentions.ts";
import { MessageReference } from "../../types/messages/message_reference.ts";
import { FileContent } from "../../types/discordeno/file_content.ts";
import { MessageComponents } from "../../types/messages/components/message_components.ts";

// TODO: v12 remove | string
/**
 * Send a response to a users slash command. The command data will have the id and token necessary to respond.
 * Interaction `tokens` are valid for **15 minutes** and can be used to send followup messages.
 *
 * NOTE: By default we will suppress mentions. To enable mentions, just pass any mentions object.
 */
export async function sendInteractionResponse(
  bot: Bot,
  id: bigint | string,
  token: string,
  options: DiscordenoInteractionResponse
) {
  // TODO: add more options validations
  if (options.data?.components) bot.utils.validateComponents(bot, options.data?.components);

  // If the user wants this as a private message mark it ephemeral
  if (options.private) {
    options.data = { ...options.data, flags: 64 };
  }

  // If no mentions are provided, force disable mentions
  if (!options.data?.allowedMentions) {
    options.data = { ...options.data, allowedMentions: { parse: [] } };
  }

  // If its already been executed, we need to send a followup response
  if (bot.cache.executedSlashCommands.has(token)) {
    return await bot.rest.runMethod(bot.rest, "post", bot.cosntants.endpoints.WEBHOOK(bot.applicationId, token), {
      content: options.data.content,
      tts: options.data.tts,
      embeds: options.data.embeds,
      allowed_mentions: {
        parse: options.data.allowedMentions.parse,
        roles: options.data.allowedMentions.roles,
        users: options.data.allowedMentions.users,
        replied_user: options.data.allowedMentions.repliedUser,
      },
      ...(options.data.messageReference?.messageId
        ? {
            message_reference: {
              message_id: options.data.messageReference.messageId,
              channel_id: options.data.messageReference.channelId,
              guild_id: options.data.messageReference.guildId,
              fail_if_not_exists: options.data.messageReference.failIfNotExists === true,
            },
          }
        : {}),
      file: options.data.file,
      // TODO: Snakelize components??
      components: options.data.components,
      flags: options.data.flags,
    });
  }

  // Expire in 15 minutes
  cache.executedSlashCommands.add(token);
  setTimeout(() => {
    eventHandlers.debug?.("loop", `Running setTimeout in send_interaction_response file.`);
    cache.executedSlashCommands.delete(token);
  }, 900000);

  return await bot.rest.runMethod(
    bot.rest,
    "post",
    bot.constants.endpoints.INTERACTION_ID_TOKEN(typeof id === "bigint" ? id : bot.transformers.snowflake(id), token),
    {
      content: options.data.content,
      tts: options.data.tts,
      embeds: options.data.embeds,
      allowed_mentions: {
        parse: options.data.allowedMentions.parse,
        roles: options.data.allowedMentions.roles,
        users: options.data.allowedMentions.users,
        replied_user: options.data.allowedMentions.repliedUser,
      },
      ...(options.data.messageReference?.messageId
        ? {
            message_reference: {
              message_id: options.data.messageReference.messageId,
              channel_id: options.data.messageReference.channelId,
              guild_id: options.data.messageReference.guildId,
              fail_if_not_exists: options.data.messageReference.failIfNotExists === true,
            },
          }
        : {}),
      file: options.data.file,
      // TODO: Snakelize components??
      components: options.data.components,
      flags: options.data.flags,
    }
  );
}
