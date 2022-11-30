import type { Bot } from "../../bot.ts";
import { Embed } from "../../transformers/embed.ts";
import { Message } from "../../transformers/message.ts";
import { DiscordMessage } from "../../types/discord.ts";
import { AllowedMentions, FileContent, MessageComponents } from "../../types/discordeno.ts";
import { BigString } from "../../types/shared.ts";

export const sendWebhookMessage = executeWebhook;

/**
 * Executes a webhook, causing a message to be posted in the channel configured for the webhook.
 *
 * @param bot - The bot instance to use to make the request.
 * @param webhookId - The ID of the webhook to execute.
 * @param token - The webhook token, used to execute the webhook.
 * @param options - The parameters for the execution of the webhook.
 * @returns An instance of the created {@link Message}, or `undefined` if the {@link ExecuteWebhook.wait | wait} property of the {@link options} object parameter is set to `false`.
 *
 * @remarks
 * If the webhook channel is a forum channel, you must provide a value for either `threadId` or `threadName`.
 *
 * @see {@link https://discord.com/developers/docs/resources/webhook#execute-webhook}
 */
export async function executeWebhook(
  bot: Bot,
  webhookId: BigString,
  token: string,
  options: ExecuteWebhook,
): Promise<Message | undefined> {
  const allowedMentions = options.allowedMentions
    ? {
      parse: options.allowedMentions.parse,
      replied_user: options.allowedMentions.repliedUser,
      users: options.allowedMentions.users?.map((id) => id.toString()),
      roles: options.allowedMentions.roles?.map((id) => id.toString()),
    }
    : { parse: [] };

  const result = await bot.rest.runMethod<DiscordMessage>(
    bot.rest,
    "POST",
    bot.constants.routes.WEBHOOK(webhookId, token, options),
    {
      wait: options.wait,
      thread_id: options.threadId,
      thread_name: options.threadName,
      content: options.content,
      username: options.username,
      avatar_url: options.avatarUrl,
      tts: options.tts,
      file: options.file,
      embeds: options.embeds?.map((embed) => bot.transformers.reverse.embed(bot, embed)),
      allowed_mentions: allowedMentions,
      components: options.components?.map((component) => bot.transformers.reverse.component(bot, component)),
    },
  );
  if (!options.wait) return;

  return bot.transformers.message(bot, result);
}

/** https://discord.com/developers/docs/resources/webhook#execute-webhook */
export interface ExecuteWebhook {
  /** Waits for server confirmation of message send before response, and returns the created message body (defaults to `false`; when `false` a message that is not saved does not return an error) */
  wait?: boolean;
  /** Send a message to the specified thread within a webhook's channel. The thread will automatically be unarchived. */
  threadId?: BigString;
  /** Name of the thread to create (target channel has to be type of forum channel) */
  threadName?: string;
  /** The message contents (up to 2000 characters) */
  content?: string;
  /** Override the default username of the webhook */
  username?: string;
  /** Override the default avatar of the webhook */
  avatarUrl?: string;
  /** True if this is a TTS message */
  tts?: boolean;
  /** The contents of the file being sent */
  file?: FileContent | FileContent[];
  /** Embedded `rich` content */
  embeds?: Embed[];
  /** Allowed mentions for the message */
  allowedMentions?: AllowedMentions;
  /** the components to include with the message */
  components?: MessageComponents;
}
