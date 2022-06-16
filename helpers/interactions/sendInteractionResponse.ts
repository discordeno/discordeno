import type { Bot } from "../../bot.ts";
import { Embed } from "../../mod.ts";
import { DiscordMessage } from "../../types/discord.ts";
import { AllowedMentions, FileContent, MessageComponents } from "../../types/discordeno.ts";
import { InteractionResponseTypes, MessageComponentTypes } from "../../types/shared.ts";

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
) {
  // If no mentions are provided, force disable mentions
  if (!options.data?.allowedMentions) {
    options.data = { ...options.data, allowedMentions: { parse: [] } };
  }

  // DRY code a little bit
  const data = {
    content: options.data.content,
    tts: options.data.tts,
    embeds: options.data.embeds?.map((embed) => bot.transformers.reverse.embed(bot, embed)),
    allowed_mentions: {
      parse: options.data.allowedMentions!.parse,
      replied_user: options.data.allowedMentions!.repliedUser,
      users: options.data.allowedMentions!.users?.map((id) => id.toString()),
      roles: options.data.allowedMentions!.roles?.map((id) => id.toString()),
    },
    custom_id: options.data.customId,
    title: options.data.title,
    components: options.data.components?.map((component) => ({
      type: component.type,
      components: component.components.map((subComponent) => {
        if (subComponent.type === MessageComponentTypes.InputText) {
          return {
            type: subComponent.type,
            style: subComponent.style,
            custom_id: subComponent.customId,
            label: subComponent.label,
            placeholder: subComponent.placeholder,
            value: subComponent.value,
            min_length: subComponent.minLength,
            max_length: subComponent.maxLength,
            required: subComponent.required,
          };
        }

        if (subComponent.type === MessageComponentTypes.SelectMenu) {
          return {
            type: subComponent.type,
            custom_id: subComponent.customId,
            placeholder: subComponent.placeholder,
            min_values: subComponent.minValues,
            max_values: subComponent.maxValues,
            options: subComponent.options.map((option) => ({
              label: option.label,
              value: option.value,
              description: option.description,
              emoji: option.emoji
                ? {
                  id: option.emoji.id?.toString(),
                  name: option.emoji.name,
                  animated: option.emoji.animated,
                }
                : undefined,
              default: option.default,
            })),
          };
        }

        return {
          type: subComponent.type,
          custom_id: subComponent.customId,
          label: subComponent.label,
          style: subComponent.style,
          emoji: "emoji" in subComponent && subComponent.emoji
            ? {
              id: subComponent.emoji.id?.toString(),
              name: subComponent.emoji.name,
              animated: subComponent.emoji.animated,
            }
            : undefined,
          url: "url" in subComponent ? subComponent.url : undefined,
          disabled: "disabled" in subComponent ? subComponent.disabled : undefined,
        };
      }),
    })),
    flags: options.data.flags,
    choices: options.data.choices,
  };

  // A reply has never been send
  if (bot.cache.unrepliedInteractions.delete(id)) {
    return await bot.rest.sendRequest<undefined>(bot.rest, {
      url: bot.constants.routes.INTERACTION_ID_TOKEN(id, token),
      method: "POST",
      payload: {
        headers: {
          // remove authorization header
          Authorization: "",
        },
        body: JSON.stringify({ type: options.type, data, file: options.data.file }),
      },
    });
  }

  // If its already been executed, we need to send a followup response
  const result = await bot.rest.sendRequest<DiscordMessage>(bot.rest, {
    url: bot.constants.routes.WEBHOOK(bot.applicationId, token),
    method: "POST",
    payload: {
      headers: {
        // remove authorization header
        Authorization: "",
      },
      body: JSON.stringify({ ...data, file: options.data.file }),
    },
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
