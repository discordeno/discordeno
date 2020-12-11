import { RequestManager } from "../module/requestManager.ts";
import { structures } from "../structures/structures.ts";
import {
  Embed,
  Errors,
  ExecuteWebhookOptions,
  MessageCreateOptions,
  WebhookCreateOptions,
  WebhookPayload,
} from "../types/types.ts";
import { endpoints } from "../utils/constants.ts";
import { botID } from "../module/client.ts";
import { botHasChannelPermissions } from "../utils/permissions.ts";
import { urlToBase64 } from "../utils/utils.ts";
import { cache } from "../utils/cache.ts";

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
  setTimeout(() => cache.executedSlashCommands.delete(token), Date.now() + 900000);

  return RequestManager.post(endpoints.INTERACTION_ID_TOKEN(id, token), {
    ...options,
  });
}

/** To delete your initial response to an slash command. If a message id is not provided, it will default to deleting the original response. */
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

/** To edit your response to an slash command. If a messageID is not provided it will default to editing the original response. */
export function editSlashResponse(
  token: string,
  options: EditSlashResponseOptions,
) {
  return RequestManager.patch(
    endpoints.INTERACTION_ORIGINAL_ID_TOKEN(botID, token),
    options,
  );
}

export interface CreateSlashCommandOptions {
  /** The name of the slash command.  */
  name: string;
  /** The description of the slash command. */
  description: String;
  /** If a guildID is provided, this will be a GUILD command. If none is provided it will be a GLOBAL command. */
  guildID?: string;
  /** The options for this command */
  options?: SlashCommandOption[];
}

export interface SlashCommand {
  /** unique id of the command */
  id: string;
  /** unique id of the parent application */
  application_id: string;
  /** 3-32 character name */
  name: string;
  /** 1-100 character description */
  description: string;
  /** the parameters for the command */
  options?: SlashCommandOption[];
}

export interface SlashCommandOption {
  /** The type of option */
  type: SlashCommandOptionType;
  /** 1-32 character name */
  name: string;
  /** 1-100 character description*/
  description: string;
  /** the first `required` option for the user to complete--only one option can be `default` */
  default?: boolean;
  /** if the parameter is required or optional--default `false`*/
  required?: boolean;
  /** 
   * If you specify `choices` for an option, they are the **only** valid values for a user to pick.
   * choices for `string` and `int` types for the user to pick from 
  */
  choices?: SlashCommandOptionChoice[];
  /** if the option is a subcommand or subcommand group type, this nested options will be the parameters */
  options?: SlashCommandOption[];
}

export enum SlashCommandOptionType {
  SUB_COMMAND = 1,
  SUB_COMMAND_GROUP,
  STRING,
  INTEGER,
  BOOLEAN,
  USER,
  CHANNEL,
  ROLE,
}

export interface SlashCommandOptionChoice {
  /** The name of the choice */
  name: string;
  /** The value of the choice */
  value: string | number;
}

export interface ExecuteSlashCommandOptions {
  type: InteractionResponseType;
  data: {
    /** is the response TTS  */
    tts?: boolean;
    /** message content */
    content: string;
    /** supports up to 10 embeds */
    embeds?: Embed[];
    /** allowed mentions for the message */
    mentions?: {
      /** An array of allowed mention types to parse from the content. */
      parse: ("roles" | "users" | "everyone")[];
      /** Array of role_ids to mention (Max size of 100) */
      roles?: string[];
      /** Array of user_ids to mention (Max size of 100) */
      users?: string[];
    };
    /** acceptable values are message flags */
    flags?: number;
  };
}

export interface EditSlashResponseOptions extends ExecuteSlashCommandOptions {
  /** If this is not provided, it will default to editing the original response. */
  messageID?: string;
}

export interface EditSlashCommandOptions {
  id: string;
  guildID?: string;
}

export interface UpsertSlashCommandOptions {
  id: string;
  guildID?: string;
}

export enum InteractionResponseType {
  /** ACK a `Ping` */
  PONG = 1,
  /** ACK a command without sending a message, eating the user's input */
  ACKNOWLEDGE,
  /** respond with a message, eating the user's input */
  CHANNEL_MESSAGE,
  /** respond with a message, showing the user's input */
  CHANNEL_MESSAGE_WITH_SOURCE,
  /** ACK a command without sending a message, showing the user's input */
  ACK_WITH_SOURCE,
}
