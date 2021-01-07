import { AllowedMentions } from "./channel.ts";
import { UserPayload } from "./guild.ts";
import { InteractionType } from "./interactions.ts";
import { Embed } from "./message.ts";

export interface WebhookPayload {
  /** The id of the webhook */
  id: string;
  /** The type of the webhook */
  type: WebhookType;
  /** The guild id this webhook is for */
  guild_id?: string;
  /** The channel id this webhook is for */
  channel_id: string;
  /** The user this webhook was created by(not returned when getting a webhook with its token) */
  user?: UserPayload;
  /** The default name of the webhook */
  name?: string;
  /** The default avatar of the webhook */
  avatar?: string;
  /** The secure token of the webhook(returned for Incoming Webhooks) */
  token?: string;
}

export enum WebhookType {
  /** Incoming Webhooks can post messages to channels with a generated token */
  INCOMING = 1,
  /** Channel Follower Webhooks are internal webhooks used with Channel Following to post new messages into channels */
  CHANNEL_FOLLOWER = 2,
}

export interface WebhookCreateOptions {
  /** Name of the webhook (1-80 characters) */
  name: string;
  /** Image url for avatar image for the default webhook avatar */
  avatar?: string;
}

export interface ExecuteWebhookOptions {
  /** waits for server confirmation of message send before response, and returns the created message body (defaults to false; when false a message that is not saved does not return an error) */
  wait?: boolean;
  /** the message contents (up to 2000 characters) */
  content?: string;
  /** override the default username of the webhook */
  username?: string;
  /** override the default avatar of the webhook*/
  avatar_url?: string;
  /** true if this is a TTS message */
  tts?: boolean;
  /** file contents	the contents of the file being sent	one of content, file, embeds */
  file?: { blob: unknown; name: string };
  /** array of up to 10 embed objects	embedded rich content. */
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
}

export interface EditWebhookMessageOptions {
  content?: string;
  embeds?: Embed[];
  allowed_mentions?: AllowedMentions;
}

export interface CreateSlashCommandOptions {
  /** The name of the slash command.  */
  name: string;
  /** The description of the slash command. */
  description: string;
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

export interface SlashCommandOptionChoice {
  /** The name of the choice */
  name: string;
  /** The value of the choice */
  value: string | number;
}

export enum SlashCommandOptionType {
  SUB_COMMAND = 1,
  SUB_COMMAND_GROUP = 2,
  STRING = 3,
  INTEGER = 4,
  BOOLEAN = 5,
  USER = 6,
  CHANNEL = 7,
  ROLE = 8,
}

export interface Interaction {
  /** The id of the interaction */
  id: string;
  /** The type of interaction */
  type: InteractionType;
  /** The command data payload */
  data?: SlashCommandInteractionData;
  /** The id of the guild it was sent from */
  guild_id: string;
  /** The id of the channel it was sent from */
  channel_id: string;
  /** The Payload of the member it was sent from */
  member: UserPayload;
  /** The token for this interaction */
  token: string;
}

export interface SlashCommandInteractionData {
  /** The id of the command */
  id: string;
  /** The name of the command */
  name: string;
  /** the params and values from the user */
  options: SlashCommandInteractionDataOption[];
}

export interface SlashCommandInteractionDataOption {
  /** The name of the parammeter */
  name: string;
  /** The value of the pair */
  // deno-lint-ignore no-explicit-any
  value?: any;
  /** Present if this option is a group or subcommand */
  options?: SlashCommandInteractionDataOption[];
}

export interface InteractionResponse {
  /** The type of response */
  type: InteractionResponseType;
  /** The optional response message */
  data?: SlashCommandCallbackData;
}

export interface SlashCommandCallbackData {
  /** is the response TTS  */
  tts?: boolean;
  /** message content */
  content: string;
  /** supports up to 10 embeds */
  embeds?: Embed[];
  /** allowed mentions for the message */
  allowed_mentions?: AllowedMentions;
  /** acceptable values are message flags */
  flags?: number;
}

export enum InteractionResponseType {
  /** ACK a `Ping` */
  PONG = 1,
  /** ACK a command without sending a message, eating the user's input */
  ACKNOWLEDGE = 2,
  /** respond with a message, eating the user's input */
  CHANNEL_MESSAGE = 3,
  /** respond with a message, showing the user's input */
  CHANNEL_MESSAGE_WITH_SOURCE = 4,
  /** ACK a command without sending a message, showing the user's input */
  ACK_WITH_SOURCE = 5,
}

export interface EditSlashCommandOptions {
  id: string;
  guildID?: string;
}

export interface ExecuteSlashCommandOptions {
  type: InteractionResponseType;
  data: SlashCommandCallbackData;
}

export interface EditSlashResponseOptions extends SlashCommandCallbackData {
  /** If this is not provided, it will default to editing the original response. */
  messageID?: string;
}
