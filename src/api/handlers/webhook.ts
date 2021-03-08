import { applicationID } from "../../bot.ts";
import { RequestManager } from "../../rest/request_manager.ts";
import {
  CreateSlashCommandOptions,
  EditSlashCommandOptions,
  EditSlashResponseOptions,
  EditWebhookMessageOptions,
  Errors,
  ExecuteWebhookOptions,
  MessageCreateOptions,
  SlashCommand,
  SlashCommandOption,
  SlashCommandOptionChoice,
  SlashCommandOptionType,
  SlashCommandResponseOptions,
  UpsertSlashCommandOptions,
  UpsertSlashCommandsOptions,
  WebhookCreateOptions,
  WebhookEditOptions,
  WebhookPayload,
} from "../../types/mod.ts";
import { cache } from "../../util/cache.ts";
import { Collection } from "../../util/collection.ts";
import { endpoints, SLASH_COMMANDS_NAME_REGEX } from "../../util/constants.ts";
import { botHasChannelPermissions } from "../../util/permissions.ts";
import { urlToBase64 } from "../../util/utils.ts";
import { structures } from "../structures/mod.ts";

/** 
 * Create a new webhook. Requires the MANAGE_WEBHOOKS permission. Returns a webhook object on success. Webhook names follow our naming restrictions that can be found in our Usernames and Nicknames documentation, with the following additional stipulations:
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

  const result = await RequestManager.post(
    endpoints.CHANNEL_WEBHOOKS(channelID),
    {
      ...options,
      avatar: options.avatar ? await urlToBase64(options.avatar) : undefined,
    },
  );

  return result as WebhookPayload;
}

/** Edit a webhook. Requires the `MANAGE_WEBHOOKS` permission. Returns the updated webhook object on success. */
export async function editWebhook(
  channelID: string,
  webhookID: string,
  options: WebhookEditOptions,
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

  const result = await RequestManager.patch(endpoints.WEBHOOK_ID(webhookID), {
    ...options,
    channel_id: options.channelID,
  });

  return result as WebhookPayload;
}

/** Edit a webhook. Returns the updated webhook object on success. */
export async function editWebhookWithToken(
  webhookID: string,
  webhookToken: string,
  options: Omit<WebhookEditOptions, "channelID">,
) {
  const result = await RequestManager.patch(
    endpoints.WEBHOOK(webhookID, webhookToken),
    options,
  );

  return result as WebhookPayload;
}

/** Delete a webhook permanently. Requires the `MANAGE_WEBHOOKS` permission. Returns a undefined on success */
export async function deleteWebhook(channelID: string, webhookID: string) {
  const hasManageWebhooksPerm = await botHasChannelPermissions(
    channelID,
    ["MANAGE_WEBHOOKS"],
  );
  if (
    !hasManageWebhooksPerm
  ) {
    throw new Error(Errors.MISSING_MANAGE_WEBHOOKS);
  }

  const result = await RequestManager.delete(endpoints.WEBHOOK_ID(webhookID));

  return result;
}

/** Delete a webhook permanently. Returns a undefined on success */
export async function deleteWebhookWithToken(
  webhookID: string,
  webhookToken: string,
) {
  const result = await RequestManager.delete(
    endpoints.WEBHOOK(webhookID, webhookToken),
  );

  return result;
}

/** Returns the new webhook object for the given id. */
export async function getWebhook(webhookID: string) {
  const result = await RequestManager.get(endpoints.WEBHOOK_ID(webhookID));

  return result as WebhookPayload;
}

/** Returns the new webhook object for the given id, this call does not require authentication and returns no user in the webhook object. */
export async function getWebhookWithToken(webhookID: string, token: string) {
  const result = await RequestManager.get(
    endpoints.WEBHOOK(webhookID, token),
  );

  return result as WebhookPayload;
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

  return structures.createMessageStruct(result as MessageCreateOptions);
}

export async function editWebhookMessage(
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

  const result = await RequestManager.patch(
    endpoints.WEBHOOK_MESSAGE(webhookID, webhookToken, messageID),
    { ...options, allowed_mentions: options.allowed_mentions },
  ) as MessageCreateOptions;

  const message = await structures.createMessageStruct(result);
  return message;
}

export async function deleteWebhookMessage(
  webhookID: string,
  webhookToken: string,
  messageID: string,
) {
  const result = await RequestManager.delete(
    endpoints.WEBHOOK_MESSAGE(webhookID, webhookToken, messageID),
  );

  return result;
}

function validateSlashOptionChoices(
  choices: SlashCommandOptionChoice[],
  optionType: SlashCommandOptionType,
) {
  for (const choice of choices) {
    if ([...choice.name].length < 1 || [...choice.name].length > 100) {
      throw new Error(Errors.INVALID_SLASH_OPTIONS_CHOICES);
    }

    if (
      (optionType === SlashCommandOptionType.STRING &&
        (typeof choice.value !== "string" || choice.value.length < 1 ||
          choice.value.length > 100)) ||
      (optionType === SlashCommandOptionType.INTEGER &&
        typeof choice.value !== "number")
    ) {
      throw new Error(Errors.INVALID_SLASH_OPTIONS_CHOICES);
    }
  }
}

function validateSlashOptions(options: SlashCommandOption[]) {
  for (const option of options) {
    if (
      (option.choices?.length && option.choices.length > 25) ||
      option.type !== SlashCommandOptionType.STRING &&
        option.type !== SlashCommandOptionType.INTEGER
    ) {
      throw new Error(Errors.INVALID_SLASH_OPTIONS_CHOICES);
    }

    if (
      ([...option.name].length < 1 || [...option.name].length > 32) ||
      ([...option.description].length < 1 ||
        [...option.description].length > 100)
    ) {
      throw new Error(Errors.INVALID_SLASH_OPTIONS_CHOICES);
    }

    if (option.choices) {
      validateSlashOptionChoices(option.choices, option.type);
    }
  }
}

function validateSlashCommands(
  commands: UpsertSlashCommandOptions[],
  create = false,
) {
  for (const command of commands) {
    if (
      (command.name && !SLASH_COMMANDS_NAME_REGEX.test(command.name)) ||
      (create && !command.name)
    ) {
      throw new Error(Errors.INVALID_SLASH_NAME);
    }

    if (
      (command.description &&
        ([...command.description].length < 1 ||
          [...command.description].length > 100)) ||
      (create && !command.description)
    ) {
      throw new Error(Errors.INVALID_SLASH_DESCRIPTION);
    }

    if (command.options?.length) {
      if (command.options.length > 25) {
        throw new Error(Errors.INVALID_SLASH_OPTIONS);
      }

      validateSlashOptions(command.options);
    }
  }
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
export async function createSlashCommand(options: CreateSlashCommandOptions) {
  validateSlashCommands([options], true);

  const result = await RequestManager.post(
    options.guildID
      ? endpoints.COMMANDS_GUILD(applicationID, options.guildID)
      : endpoints.COMMANDS(applicationID),
    {
      ...options,
    },
  );

  return result;
}

/** Fetchs the global command for the given ID. If a guildID is provided, the guild command will be fetched. */
export async function getSlashCommand(commandID: string, guildID?: string) {
  const result = await RequestManager.get(
    guildID
      ? endpoints.COMMANDS_GUILD_ID(applicationID, guildID, commandID)
      : endpoints.COMMANDS_ID(applicationID, commandID),
  );

  return result as SlashCommand;
}

/** Fetch all of the global commands for your application. */
export async function getSlashCommands(guildID?: string) {
  const result = (await RequestManager.get(
    guildID
      ? endpoints.COMMANDS_GUILD(applicationID, guildID)
      : endpoints.COMMANDS(applicationID),
  )) as SlashCommand[];

  return new Collection(result.map((command) => [command.name, command]));
}

/**
 * Edit an existing slash command. If this command did not exist, it will create it.
 */
export async function upsertSlashCommand(
  commandID: string,
  options: UpsertSlashCommandOptions,
  guildID?: string,
) {
  validateSlashCommands([options]);

  const result = await RequestManager.patch(
    guildID
      ? endpoints.COMMANDS_GUILD_ID(
        applicationID,
        guildID,
        commandID,
      )
      : endpoints.COMMANDS_ID(applicationID, commandID),
    options,
  );

  return result;
}

/**
 * Bulk edit existing slash commands. If a command does not exist, it will create it.
 * 
 * **NOTE:** Any slash commands that are not specified in this function will be **deleted**. If you don't provide the commandID and rename your command, the command gets a new ID.
 */
export async function upsertSlashCommands(
  options: UpsertSlashCommandsOptions[],
  guildID?: string,
) {
  validateSlashCommands(options);

  const result = await RequestManager.put(
    guildID
      ? endpoints.COMMANDS_GUILD(applicationID, guildID)
      : endpoints.COMMANDS(applicationID),
    options,
  );

  return result;
}

// TODO: remove this function for v11
/** 
 * Edit an existing slash command. 
 * @deprecated This function will be removed in v11. Use `upsertSlashCommand()` instead
 */
export async function editSlashCommand(
  commandID: string,
  options: EditSlashCommandOptions,
  guildID?: string,
) {
  if (!SLASH_COMMANDS_NAME_REGEX.test(options.name)) {
    throw new Error(Errors.INVALID_SLASH_NAME);
  }

  if (
    [...options.description].length < 1 || [...options.description].length > 100
  ) {
    throw new Error(Errors.INVALID_SLASH_DESCRIPTION);
  }

  const result = await RequestManager.patch(
    guildID
      ? endpoints.COMMANDS_GUILD_ID(
        applicationID,
        guildID,
        commandID,
      )
      : endpoints.COMMANDS_ID(applicationID, commandID),
    options,
  );

  return result;
}

/** Deletes a slash command. */
export function deleteSlashCommand(id: string, guildID?: string) {
  if (!guildID) {
    return RequestManager.delete(endpoints.COMMANDS_ID(applicationID, id));
  }
  return RequestManager.delete(
    endpoints.COMMANDS_GUILD_ID(applicationID, guildID, id),
  );
}

/**
 * Send a response to a users slash command. The command data will have the id and token necessary to respond.
 * Interaction `tokens` are valid for **15 minutes** and can be used to send followup messages.
 *
 * NOTE: By default we will suppress mentions. To enable mentions, just pass any mentions object.
 */
export async function executeSlashCommand(
  id: string,
  token: string,
  options: SlashCommandResponseOptions,
) {
  // If its already been executed, we need to send a followup response
  if (cache.executedSlashCommands.has(token)) {
    return RequestManager.post(endpoints.WEBHOOK(applicationID, token), {
      ...options,
    });
  }

  // Expire in 15 minutes
  cache.executedSlashCommands.set(token, id);
  setTimeout(
    () => cache.executedSlashCommands.delete(token),
    900000,
  );

  // If the user wants this as a private message mark it ephemeral
  if (options.private) {
    options.data.flags = 64;
  }

  // If no mentions are provided, force disable mentions
  if (!(options.data.allowed_mentions)) {
    options.data.allowed_mentions = { parse: [] };
  }

  const result = await RequestManager.post(
    endpoints.INTERACTION_ID_TOKEN(id, token),
    options,
  );

  return result;
}

/** To delete your response to a slash command. If a message id is not provided, it will default to deleting the original response. */
export async function deleteSlashResponse(
  token: string,
  messageID?: string,
) {
  const result = await RequestManager.delete(
    messageID
      ? endpoints.INTERACTION_ID_TOKEN_MESSAGEID(
        applicationID,
        token,
        messageID,
      )
      : endpoints.INTERACTION_ORIGINAL_ID_TOKEN(applicationID, token),
  );

  return result;
}

/** To edit your response to a slash command. If a messageID is not provided it will default to editing the original response. */
export async function editSlashResponse(
  token: string,
  options: EditSlashResponseOptions,
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

  const result = await RequestManager.patch(
    options.messageID
      ? endpoints.WEBHOOK_MESSAGE(applicationID, token, options.messageID)
      : endpoints.INTERACTION_ORIGINAL_ID_TOKEN(applicationID, token),
    options,
  );

  // If the original message was edited, this will not return a message
  if (!options.messageID) return result;

  const message = await structures.createMessageStruct(
    result as MessageCreateOptions,
  );
  return message;
}
