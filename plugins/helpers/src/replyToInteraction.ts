import type { BigString, Bot, DiscordMessage, InteractionResponse, Message } from "../deps.ts";

/**
 * Send a response to a users application command. The command data will have the id and token necessary to respond.
 * Interaction `tokens` are valid for **15 minutes** and can be used to send followup messages.
 *
 * NOTE: By default we will suppress mentions. To enable mentions, just pass any mentions object.
 */
export async function replyToInteraction(
  bot: Bot,
  id: BigString,
  token: string,
  options: InteractionResponse,
): Promise<Message | undefined> {
  // If no mentions are provided, force disable mentions
  if (!options.data?.allowedMentions) {
    options.data = { ...options.data, allowedMentions: { parse: [] } };
  }

  // DRY code a little bit
  const data = {
    tts: options.data.tts,
    title: options.data.title,
    flags: options.data.flags,
    content: options.data.content,
    choices: options.data.choices,
    custom_id: options.data.customId,
    embeds: options.data.embeds?.map((embed) => bot.transformers.reverse.embed(bot, embed)),
    allowed_mentions: bot.transformers.reverse.allowedMentions(bot, options.data.allowedMentions!),
    components: options.data.components?.map((component) => bot.transformers.reverse.component(bot, component)),
  };

  // A reply has never been send
  if (bot.cache.unrepliedInteractions.delete(id)) {
    return await bot.rest.sendRequest<undefined>(bot.rest, {
      url: bot.constants.routes.INTERACTION_ID_TOKEN(id, token),
      method: "POST",
      payload: bot.rest.createRequestBody(bot.rest, {
        method: "POST",
        body: { type: options.type, data, file: options.data.file },
        headers: {
          // remove authorization header
          Authorization: "",
        },
      }),
    });
  }

  // If its already been executed, we need to send a followup response
  const result = await bot.rest.sendRequest<DiscordMessage>(bot.rest, {
    url: bot.constants.routes.WEBHOOK(bot.applicationId, token),
    method: "POST",
    payload: bot.rest.createRequestBody(bot.rest, {
      method: "POST",
      body: { ...data, file: options.data.file },
      headers: {
        // remove authorization header
        Authorization: "",
      },
    }),
  });

  return bot.transformers.message(bot, result);
}
