import type { Bot } from "../../bot.ts";
import { Embed, Message } from "../../mod.ts";
import { DiscordMessage } from "../../types/discord.ts";
import { AllowedMentions, FileContent, MessageComponents } from "../../types/discordeno.ts";
import { InteractionResponseTypes } from "../../types/shared.ts";

/**
 * Send a response to a users application command. The command data will have the id and token necessary to respond.
 * Interaction `tokens` are valid for **15 minutes** and can be used to send followup messages.
 *
 * NOTE: By default we will suppress mentions. To enable mentions, just pass any mentions object.
 */
export async function sendInteractionResponse(
  bot: Bot,
  id: bigint,
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

/** https://discord.com/developers/docs/interactions/slash-commands#interaction-response */
export interface InteractionResponse {
  /** The type of response */
  type: InteractionResponseTypes;
  /** An optional response message */
  data?: InteractionApplicationCommandCallbackData;
}

/** https://discord.com/developers/docs/interactions/slash-commands#interaction-response-interactionapplicationcommandcallbackdata */
export interface InteractionApplicationCommandCallbackData {
  /** The message contents (up to 2000 characters) */
  content?: string;
  /** True if this is a TTS message */
  tts?: boolean;
  /** Embedded `rich` content (up to 6000 characters) */
  embeds?: Embed[];
  /** Allowed mentions for the message */
  allowedMentions?: AllowedMentions;
  /** The contents of the file being sent */
  file?: FileContent | FileContent[];
  /** The customId you want to use for this modal response. */
  customId?: string;
  /** The title you want to use for this modal response. */
  title?: string;
  /** The components you would like to have sent in this message */
  components?: MessageComponents;
  /** Message flags combined as a bit field (only SUPPRESS_EMBEDS and EPHEMERAL can be set) */
  flags?: number;
  /** Autocomplete choices (max of 25 choices) */
  choices?: ApplicationCommandOptionChoice[];
}

/** https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptionchoice */
export interface ApplicationCommandOptionChoice {
  /** 1-100 character choice name */
  name: string;
  /** Value of the choice, up to 100 characters if string */
  value: string | number;
}
