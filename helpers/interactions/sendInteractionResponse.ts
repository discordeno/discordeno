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
    file: options.data.file,
    custom_id: options.data.customId,
    title: options.data.title,
    components: options.data.components?.map((component) => ({
      type: component.type,
      components: component.components.map((subcomponent) => {
        if (subcomponent.type === MessageComponentTypes.InputText) {
          return {
            type: subcomponent.type,
            style: subcomponent.style,
            custom_id: subcomponent.customId,
            label: subcomponent.label,
            placeholder: subcomponent.placeholder,
            min_length: subcomponent.minLength ?? subcomponent.required === false ? 0 : subcomponent.minLength,
            max_length: subcomponent.maxLength,
          };
        }

        if (subcomponent.type === MessageComponentTypes.SelectMenu) {
          return {
            type: subcomponent.type,
            custom_id: subcomponent.customId,
            placeholder: subcomponent.placeholder,
            min_values: subcomponent.minValues,
            max_values: subcomponent.maxValues,
            options: subcomponent.options.map((option) => ({
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
          type: subcomponent.type,
          custom_id: subcomponent.customId,
          label: subcomponent.label,
          style: subcomponent.style,
          emoji: "emoji" in subcomponent && subcomponent.emoji
            ? {
              id: subcomponent.emoji.id?.toString(),
              name: subcomponent.emoji.name,
              animated: subcomponent.emoji.animated,
            }
            : undefined,
          url: "url" in subcomponent ? subcomponent.url : undefined,
          disabled: "disabled" in subcomponent ? subcomponent.disabled : undefined,
        };
      }),
    })),
    flags: options.data.flags,
    choices: options.data.choices,
  };

  // A reply has never been send
  if (bot.cache.unrepliedInteractions.delete(id)) {
    return await bot.rest.runMethod<undefined>(
      bot.rest,
      "post",
      bot.constants.endpoints.INTERACTION_ID_TOKEN(id, token),
      {
        type: options.type,
        data,
      },
    );
  }

  // If its already been executed, we need to send a followup response
  const result = await bot.rest.runMethod<DiscordMessage>(
    bot.rest,
    "post",
    bot.constants.endpoints.WEBHOOK(bot.applicationId, token),
    data,
  );

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
  /** true if this is a TTS message */
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
  /** message flags combined as a bitfield (only SUPPRESS_EMBEDS and EPHEMERAL can be set) */
  flags?: number;
  /** autocomplete choices (max of 25 choices) */
  choices?: ApplicationCommandOptionChoice[];
}

/** https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptionchoice */
export interface ApplicationCommandOptionChoice {
  /** 1-100 character choice name */
  name: string;
  /** Value of the choice, up to 100 characters if string */
  value: string | number;
}
