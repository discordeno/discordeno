import { botID } from "../../bot.ts";
import { RequestManager } from "../../rest/mod.ts";
import {
  CreateSlashCommandOptions,
  EditSlashCommandOptions,
  EditSlashResponseOptions,
  EditWebhookMessageOptions,
  Errors,
  ExecuteSlashCommandOptions,
  ExecuteWebhookOptions,
  MessageCreateOptions,
  WebhookCreateOptions,
  WebhookPayload,
} from "../../types/mod.ts";
import { cache } from "../../util/cache.ts";
import { endpoints } from "../../util/constants.ts";
import { botHasChannelPermissions } from "../../util/permissions.ts";
import { urlToBase64 } from "../../util/utils.ts";
import { structures } from "../structures/mod.ts";

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

  return await RequestManager.post(
    endpoints.CHANNEL_WEBHOOKS(channelID),
    {
      ...options,
      avatar: options.avatar ? await urlToBase64(options.avatar) : undefined,
    },
  ) as Promise<WebhookPayload>;
}

/** Execute a webhook with webhook ID and webhook token */
export async function executeWebhook(
  webhookID: string,
  webhookToken: string,
  options: ExecuteWebhookOptions,
) {
  if (!options.content && !options.file && !options.embeds) {
    throw new Error(Errors.INVALID_WEBHOOK_OPTIONS);
  }

  if (options.content && options.content.length > 2000) {
    throw Error(Errors.MESSAGE_MAX_LENGTH);
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

/** Returns the new webhook object for the given id. */
export function getWebhook(webhookID: string) {
  return RequestManager.get(endpoints.WEBHOOK_ID(webhookID));
}

export function editWebhookMessage(
  webhookID: string,
  webhookToken: string,
  messageID: string,
  options: EditWebhookMessageOptions,
) {
  if (options.content && options.content.length > 2000) {
    throw Error(Errors.MESSAGE_MAX_LENGTH);
  }

  if (options.embeds && options.embeds.length > 10) {
    options.embeds.splice(10);
  }

  if (options.allowed_mentions) {
    if (options.allowed_mentions.users?.length) {
      if (options.allowed_mentions.parse.includes("users")) {
        options.allowed_mentions.parse = options.allowed_mentions.parse.filter((
          p,
        ) => p !== "users");
      }

      if (options.allowed_mentions.users.length > 100) {
        options.allowed_mentions.users = options.allowed_mentions.users.slice(
          0,
          100,
        );
      }
    }

    if (options.allowed_mentions.roles?.length) {
      if (options.allowed_mentions.parse.includes("roles")) {
        options.allowed_mentions.parse = options.allowed_mentions.parse.filter((
          p,
        ) => p !== "roles");
      }

      if (options.allowed_mentions.roles.length > 100) {
        options.allowed_mentions.roles = options.allowed_mentions.roles.slice(
          0,
          100,
        );
      }
    }
  }

  return RequestManager.patch(
    endpoints.WEBHOOK_EDIT(webhookID, webhookToken, messageID),
    { ...options, allowed_mentions: options.allowed_mentions },
  );
}

export function deleteWebhookMessage(
  webhookID: string,
  webhookToken: string,
  messageID: string,
) {
  return RequestManager.delete(
    endpoints.WEBHOOK_DELETE(webhookID, webhookToken, messageID),
  );
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
export function upsertSlashCommand(
  commandID: string,
  options: CreateSlashCommandOptions,
) {
  return RequestManager.post(
    options.guildID
      ? endpoints.COMMANDS_GUILD_ID(botID, commandID, options.guildID)
      : endpoints.COMMANDS_ID(botID, commandID),
    {
      ...options,
    },
  );
}

/** Edit an existing slash command. */
export function editSlashCommand(
  commandID: string,
  options: CreateSlashCommandOptions,
) {
  return RequestManager.patch(
    options.guildID
      ? endpoints.COMMANDS_GUILD_ID(botID, commandID, options.guildID)
      : endpoints.COMMANDS_ID(botID, commandID),
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
 *
 * NOTE: By default we will suppress mentions. To enable mentions, just pass any mentions object.
 */
export function executeSlashCommand(
  id: string,
  token: string,
  options: ExecuteSlashCommandOptions,
) {
  // If its already been executed, we need to send a followup response
  if (cache.executedSlashCommands.has(token)) {
    return RequestManager.post(endpoints.WEBHOOK(botID, token), {
      ...options,
    });
  }

  // Expire in 15 minutes
  cache.executedSlashCommands.set(token, id);
  setTimeout(
    () => cache.executedSlashCommands.delete(token),
    Date.now() + 900000,
  );

  // IF NO MENTIONS ARE PROVIDED, FORCE DISABLE MENTIONS
  if (!(options.data.allowed_mentions)) {
    options.data.allowed_mentions = { parse: [] };
  }

  return RequestManager.post(endpoints.INTERACTION_ID_TOKEN(id, token), {
    ...options,
  });
}

/** To delete your response to a slash command. If a message id is not provided, it will default to deleting the original response. */
export function deleteSlashResponse(
  token: string,
  messageID?: string,
) {
  if (!messageID) {
    return RequestManager.delete(
      endpoints.INTERACTION_ORIGINAL_ID_TOKEN(botID, token),
    );
  }
  return RequestManager.delete(
    endpoints.INTERACTION_ID_TOKEN_MESSAGEID(botID, token, messageID),
  );
}

/** To edit your response to a slash command. If a messageID is not provided it will default to editing the original response. */
export function editSlashResponse(
  token: string,
  options: EditSlashResponseOptions,
) {
  return RequestManager.patch(
    endpoints.INTERACTION_ORIGINAL_ID_TOKEN(botID, token),
    options,
  );
}
