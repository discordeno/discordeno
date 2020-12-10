import { botID } from "../module/client.ts";
import { RequestManager } from "../module/requestManager.ts";
import { structures } from "../structures/structures.ts";
import {
  CreateSlashCommandOptions,
  EditSlashCommandOptions,
  Errors,
  ExecuteWebhookOptions,
  MessageCreateOptions,
  SlashCommandCallbackData,
  UpsertSlashCommandOptions,
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
 * Global commands are cached for **1 hour**. That means that new global commands will fan out slowly across all guilds, and will be guaranteed to be updated in an hour.
 * Guild commands update **instantly**. We recommend you use guild commands for quick testing, and global commands when they're ready for public use.
 * 
 * To make a **global** Slash Command, make an HTTP POST call like this:
 */
export function createSlashCommand(options: CreateSlashCommandOptions) {
  // Use ... for content length due to unicode characters and js .length handling
  if ([...options.name].length < 2 || [...options.name].length > 32) {
    throw new Error(Errors.INVALID_SLASH_NAME);
  }

  if (
    [...options.description].length < 1 || [...options.description].length > 100
  ) {
    throw new Error(Errors.INVALID_SLASH_DESCRIPTION);
  }

  return RequestManager.post(
    options.guildID
      ? endpoints.COMMANDS_GUILD(botID, options.guildID)
      : endpoints.COMMANDS(botID),
    {
      ...options,
    },
  );
}

/** Fetch all of the global commands for your application. */
export function getSlashCommands(guildID?: string) {
  // TODO: Should this be a returned as a collection?
  return RequestManager.get(
    guildID
      ? endpoints.COMMANDS_GUILD(botID, guildID)
      : endpoints.COMMANDS(botID),
  );
}

/**
 * Edit an existing slash command. If this command did not exist, it will create it.
 */
export function upsertSlashCommand(options: UpsertSlashCommandOptions) {
  return RequestManager.post(
    options.guildID
      ? endpoints.COMMANDS_GUILD_ID(botID, options.id, options.guildID)
      : endpoints.COMMANDS_ID(botID, options.id),
    {
      ...options,
    },
  );
}

/** Edit an existing slash command. */
export function editSlashCommand(options: EditSlashCommandOptions) {
  return RequestManager.patch(
    options.guildID
      ? endpoints.COMMANDS_GUILD_ID(botID, options.id, options.guildID)
      : endpoints.COMMANDS_ID(botID, options.id),
    {
      ...options,
    },
  );
}

/** Deletes a slash command. */
export function deleteSlashCommand(id: string, guildID?: string) {
  if (!guildID) return RequestManager.delete(endpoints.COMMANDS_ID(botID, id));
  return RequestManager.delete(endpoints.COMMANDS_GUILD_ID(botID, id, guildID));
}

/**
 * Send a response to a users slash command. The command data will have the id and token necessary to respond.
 * Interaction `tokens` are valid for **15 minutes** and can be used to send followup messages.
 */
export function executeSlashCommand(
  id: string,
  token: string,
  options: SlashCommandCallbackData,
) {
  return RequestManager.post(endpoints.INTERACTION_ID_TOKEN(id, token), {
    ...options,
  });
}

/** To delete your initial response to an slash command */
export function deleteSlashOriginalResponse(id: string, token: string) {
  return RequestManager.delete(
    endpoints.INTERACTION_ORIGINAL_ID_TOKEN(id, token),
  );
}

/** To delete your initial response to an slash command */
export function editSlashOriginalResponse(
  id: string,
  token: string,
  options: any,
) {
  return RequestManager.delete(
    endpoints.INTERACTION_ORIGINAL_ID_TOKEN(id, token),
  );
}
