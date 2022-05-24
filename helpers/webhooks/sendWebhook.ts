import type { Bot } from "../../bot.ts";
import { Embed } from "../../transformers/embed.ts";
import { DiscordMessage } from "../../types/discord.ts";
import { AllowedMentions, FileContent, MessageComponents } from "../../types/discordeno.ts";

/** Send a webhook with webhook Id and webhook token */
export async function sendWebhook(bot: Bot, webhookId: bigint, webhookToken: string, options: ExecuteWebhook) {
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
    `${bot.constants.endpoints.WEBHOOK(webhookId, webhookToken)}?wait=${options.wait ?? false}${
      options.threadId ? `&thread_id=${options.threadId}` : ""
    }`,
    {
      wait: options.wait,
      thread_id: options.threadId,
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
  threadId?: bigint;
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
