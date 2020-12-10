import { RequestManager } from "../module/requestManager.ts";
import { structures } from "../structures/structures.ts";
import {
  Errors,
  ExecuteWebhookOptions,
  MessageCreateOptions,
  WebhookCreateOptions,
  WebhookPayload,
} from "../types/types.ts";
import { endpoints } from "../utils/constants.ts";
import { botHasChannelPermissions } from "../utils/permissions.ts";
import { urlToBase64 } from "../utils/utils.ts";

/** Create a new webhook. Requires the MANAGE_WEBHOOKS permission. Returns a webhook object on success. Webhook names follow our naming restrictions that can be found in our Usernames and Nicknames documentation, with the following additional stipulations:
*
* Webhook names cannot be: 'clyde'
*/
export async function createWebhook(
  channelID: string,
  options: WebhookCreateOptions,
) {
  const hasManageWebhooksPerm = await botHasChannelPermissions(
    channelID,
    ["MANAGE_WEBHOOKS"],
  );
  if (
    !hasManageWebhooksPerm
  ) {
    throw new Error(Errors.MISSING_MANAGE_WEBHOOKS);
  }

  if (
    // Specific usernames that discord does not allow
    options.name === "clyde" ||
    // Character limit checks. [...] checks are because of js unicode length handling
    [...options.name].length < 2 || [...options.name].length > 32
  ) {
    throw new Error(Errors.INVALID_WEBHOOK_NAME);
  }

  return RequestManager.post(
    endpoints.CHANNEL_WEBHOOKS(channelID),
    {
      ...options,
      avatar: options.avatar ? await urlToBase64(options.avatar) : undefined,
    },
  ) as Promise<WebhookPayload>;
}

export async function executeWebhook(
  webhookID: string,
  webhookToken: string,
  options: ExecuteWebhookOptions,
) {
  if (!options.content && !options.file && !options.embeds) {
    throw new Error(Errors.INVALID_WEBHOOK_OPTIONS);
  }

  if (options.embeds && options.embeds.length > 10) {
    options.embeds.splice(10);
  }

  if (options.mentions) {
    if (options.mentions.users?.length) {
      if (options.mentions.parse.includes("users")) {
        options.mentions.parse = options.mentions.parse.filter((p) =>
          p !== "users"
        );
      }

      if (options.mentions.users.length > 100) {
        options.mentions.users = options.mentions.users.slice(0, 100);
      }
    }

    if (options.mentions.roles?.length) {
      if (options.mentions.parse.includes("roles")) {
        options.mentions.parse = options.mentions.parse.filter((p) =>
          p !== "roles"
        );
      }

      if (options.mentions.roles.length > 100) {
        options.mentions.roles = options.mentions.roles.slice(0, 100);
      }
    }
  }

  const result = await RequestManager.post(
    `${endpoints.WEBHOOK(webhookID, webhookToken)}${
      options.wait ? "?wait=true" : ""
    }`,
    {
      ...options,
      allowed_mentions: options.mentions,
      avatar_url: options.avatar_url,
    },
  );
  if (!options.wait) return;

  return structures.createMessage(result as MessageCreateOptions);
}

export function getWebhook(webhookID: string) {
  return RequestManager.get(endpoints.WEBHOOK_ID(webhookID));
}

/**
 * There are two kinds of Slash Commands: global commands and guild commands. Global commands are available for every guild that adds your app; guild commands are specific to the guild you specify when making them. Command names are unique per application within each scope (global and guild). That means:
 *
 * - Your app **cannot** have two global commands with the same name
 * - Your app **cannot** have two guild commands within the same name **on the same guild**
 * - Your app **can** have a global and guild command with the same name
 * - Multiple apps **can** have commands with the same names
 * 
 * To make a **global** Slash Command, make an HTTP POST call like this:
 */
export function createSlashCommand(name: string, description: string, options: CreateSlashCommandOptions) {

  return RequestManager.post(endpoints.COMMANDS, {
    name,
    description,
    ...options
  })
}

export interface CreateSlashCommandOptions {
  name: string;
  description: String;
  type: SlashCommandOptionType;
  required: boolean;
  choices: SlashCommandOptionChoice[];
}

