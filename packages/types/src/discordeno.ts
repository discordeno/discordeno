import type { BigString } from './shared'

export interface CreateMessageOptions {
  /** The message contents (up to 2000 characters) */
  content?: string
  //   /** Can be used to verify a message was sent (up to 25 characters). Value will appear in the Message Create event. */
  //   nonce?: string | number
  //   /** true if this is a TTS message */
  //   tts?: boolean
  /** Embedded `rich` content (up to 6000 characters) */
  //   embeds?: Embed[]
  /** Allowed mentions for the message */
  //   allowedMentions?: AllowedMentions
  /** Include to make your message a reply */
  //   messageReference?: {
  //     /** id of the originating message */
  //     messageId?: BigString
  //     /**
  //      * id of the originating message's channel
  //      * Note: `channel_id` is optional when creating a reply, but will always be present when receiving an event/response that includes this data model.
  //      */
  //     channelId?: BigString
  //     /** id of the originating message's guild */
  //     guildId?: BigString
  //     /** When sending, whether to error if the referenced message doesn't exist instead of sending as a normal (non-reply) message, default true */
  //     failIfNotExists: boolean
  //   }
  /** The contents of the file being sent */
  //   file?: FileContent | FileContent[]
  //   /** The components you would like to have sent in this message */
  //   components?: MessageComponents
  //   /** IDs of up to 3 stickers in the server to send in the message */
  //   stickerIds?:
  //   | [BigString]
  //   | [BigString, BigString]
  //   | [BigString, BigString, BigString]
}
// import type {
//   AllowedMentionsTypes,
//   ApplicationCommandTypes,
//   AuditLogEvents,
//   BigString,
//   ButtonStyles,
//   InteractionResponseTypes,
//   Localization,
//   MessageComponentTypes,
//   OverwriteTypes,
//   PermissionStrings,
//   TextStyles
// } from './shared.js'

// export type MessageComponents = ActionRow[]

// /** https://discord.com/developers/docs/interactions/message-components#actionrow */
// export interface ActionRow {
//   /** Action rows are a group of buttons. */
//   type: MessageComponentTypes.ActionRow
//   /** The components in this row */
//   components:
//   | [
//     | ButtonComponent
//     | InputTextComponent
//     | SelectMenuComponent
//     | SelectMenuChannelsComponent
//     | SelectMenuRolesComponent
//     | SelectMenuUsersComponent
//     | SelectMenuUsersAndRolesComponent
//   ]
//   | [ButtonComponent, ButtonComponent]
//   | [ButtonComponent, ButtonComponent, ButtonComponent]
//   | [ButtonComponent, ButtonComponent, ButtonComponent, ButtonComponent]
//   | [
//     ButtonComponent,
//     ButtonComponent,
//     ButtonComponent,
//     ButtonComponent,
//     ButtonComponent
//   ]
// }

// /** https://discord.com/developers/docs/interactions/message-components#button-object-button-structure */
// export interface ButtonComponent {
//   /** All button components have type 2 */
//   type: MessageComponentTypes.Button
//   /** for what the button says (max 80 characters) */
//   label?: string
//   /** a dev-defined unique string sent on click (max 100 characters). type 5 Link buttons can not have a custom_id */
//   customId?: string
//   /** For different styles/colors of the buttons */
//   style: ButtonStyles
//   /** Emoji object that includes fields of name, id, and animated supporting unicode and custom emojis. */
//   emoji?: {
//     /** Emoji id */
//     id?: bigint
//     /** Emoji name */
//     name?: string
//     /** Whether this emoji is animated */
//     animated?: boolean
//   }
//   /** optional url for link-style buttons that can navigate a user to the web. Only type 5 Link buttons can have a url */
//   url?: string
//   /** Whether or not this button is disabled */
//   disabled?: boolean
// }

// /** https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-menu-structure */
// export interface SelectMenuComponent {
//   /** SelectMenu Component is of type 3 */
//   type: MessageComponentTypes.SelectMenu
//   /** A custom identifier for this component. Maximum 100 characters. */
//   customId: string
//   /** A custom placeholder text if nothing is selected. Maximum 150 characters. */
//   placeholder?: string
//   /** The minimum number of items that must be selected. Default 1. Between 1-25. */
//   minValues?: number
//   /** The maximum number of items that can be selected. Default 1. Between 1-25. */
//   maxValues?: number
//   /** The choices! Maximum of 25 items. */
//   options: SelectOption[]
//   /** Whether or not this select is disabled */
//   disabled?: boolean
// }

// export interface SelectMenuUsersComponent {
//   /** SelectMenuChannels Component is of type 5 */
//   type: MessageComponentTypes.SelectMenuUsers
//   /** A custom identifier for this component. Maximum 100 characters. */
//   customId: string
//   /** A custom placeholder text if nothing is selected. Maximum 150 characters. */
//   placeholder?: string
//   /** The minimum number of items that must be selected. Default 1. Between 1-25. */
//   minValues?: number
//   /** The maximum number of items that can be selected. Default 1. Between 1-25. */
//   maxValues?: number
//   /** Whether or not this select is disabled */
//   disabled?: boolean
// }

// export interface SelectMenuRolesComponent {
//   /** SelectMenuChannels Component is of type 6 */
//   type: MessageComponentTypes.SelectMenuRoles
//   /** A custom identifier for this component. Maximum 100 characters. */
//   customId: string
//   /** A custom placeholder text if nothing is selected. Maximum 150 characters. */
//   placeholder?: string
//   /** The minimum number of items that must be selected. Default 1. Between 1-25. */
//   minValues?: number
//   /** The maximum number of items that can be selected. Default 1. Between 1-25. */
//   maxValues?: number
//   /** Whether or not this select is disabled */
//   disabled?: boolean
// }

// export interface SelectMenuUsersAndRolesComponent {
//   /** SelectMenuChannels Component is of type 7 */
//   type: MessageComponentTypes.SelectMenuUsersAndRoles
//   /** A custom identifier for this component. Maximum 100 characters. */
//   customId: string
//   /** A custom placeholder text if nothing is selected. Maximum 150 characters. */
//   placeholder?: string
//   /** The minimum number of items that must be selected. Default 1. Between 1-25. */
//   minValues?: number
//   /** The maximum number of items that can be selected. Default 1. Between 1-25. */
//   maxValues?: number
//   /** The choices! Maximum of 25 items. */
//   options: SelectOption[]
//   /** Whether or not this select is disabled */
//   disabled?: boolean
// }

// export interface SelectMenuChannelsComponent {
//   /** SelectMenuChannels Component is of type 8 */
//   type: MessageComponentTypes.SelectMenuChannels
//   /** A custom identifier for this component. Maximum 100 characters. */
//   customId: string
//   /** A custom placeholder text if nothing is selected. Maximum 150 characters. */
//   placeholder?: string
//   /** The minimum number of items that must be selected. Default 1. Between 1-25. */
//   minValues?: number
//   /** The maximum number of items that can be selected. Default 1. Between 1-25. */
//   maxValues?: number
//   /** Whether or not this select is disabled */
//   disabled?: boolean
// }

// export interface SelectOption {
//   /** The user-facing name of the option. Maximum 25 characters. */
//   label: string
//   /** The dev-defined value of the option. Maximum 100 characters. */
//   value: string
//   /** An additional description of the option. Maximum 50 characters. */
//   description?: string
//   /** The id, name, and animated properties of an emoji. */
//   emoji?: {
//     /** Emoji id */
//     id?: bigint
//     /** Emoji name */
//     name?: string
//     /** Whether this emoji is animated */
//     animated?: boolean
//   }
//   /** Will render this option as already-selected by default. */
//   default?: boolean
// }

// /** https://discord.com/developers/docs/interactions/message-components#text-inputs-text-input-structure */
// export interface InputTextComponent {
//   /** InputText Component is of type 4 */
//   type: MessageComponentTypes.InputText
//   /** The style of the InputText */
//   style: TextStyles
//   /** The customId of the InputText */
//   customId: string
//   /** The label of the InputText. Maximum 45 characters */
//   label: string
//   /** The placeholder of the InputText */
//   placeholder?: string
//   /** The minimum length of the text the user has to provide */
//   minLength?: number
//   /** The maximum length of the text the user has to provide */
//   maxLength?: number
//   /** Whether or not this input is required. */
//   required?: boolean
//   /** Pre-filled value for input text. */
//   value?: string
// }

// /** https://discord.com/developers/docs/resources/channel#allowed-mentions-object */
// export interface AllowedMentions {
//   /** An array of allowed mention types to parse from the content. */
//   parse?: AllowedMentionsTypes[]
//   /** For replies, whether to mention the author of the message being replied to (default false) */
//   repliedUser?: boolean

//   /** Array of role_ids to mention (Max size of 100) */
//   roles?: bigint[]
//   /** Array of user_ids to mention (Max size of 100) */
//   users?: bigint[]
// }

// export interface FileContent {
//   /** The file blob */
//   blob: Blob
//   /** The name of the file */
//   name: string
// }

// /** https://discord.com/developers/docs/resources/guild#search-guild-members-query-string-params */
// export interface SearchMembers {
//   /** Query string to match username(s) and nickname(s) against */
//   query: string
//   /** Max number of members to return (1-1000). Default: 1 */
//   limit?: number
// }

export interface WithReason {
  /** The reason which should be added in the audit logs for doing this action. */
  reason?: string
}

// export interface OverwriteReadable {
//   /** Role or user id */
//   id: bigint
//   /** Either 0 (role) or 1 (member) */
//   type: OverwriteTypes
//   /** Permission bit set */
//   allow?: PermissionStrings[]
//   /** Permission bit set */
//   deny?: PermissionStrings[]
// }

// export interface GetGatewayBot {
//   url: string
//   shards: number
//   sessionStartLimit: {
//     total: number
//     remaining: number
//     resetAfter: number
//     maxConcurrency: number
//   }
// }

/** https://discord.com/developers/docs/resources/channel#get-channel-messages-query-string-params */
export interface GetMessagesLimit {
  /** Max number of messages to return (1-100) default 50 */
  limit?: number
}

/** https://discord.com/developers/docs/resources/channel#get-channel-messages-query-string-params */
export interface GetMessagesAround extends GetMessagesLimit {
  /** Get messages around this message id */
  around?: BigString
}

/** https://discord.com/developers/docs/resources/channel#get-channel-messages-query-string-params */
export interface GetMessagesBefore extends GetMessagesLimit {
  /** Get messages before this message id */
  before?: BigString
}

/** https://discord.com/developers/docs/resources/channel#get-channel-messages-query-string-params */
export interface GetMessagesAfter extends GetMessagesLimit {
  /** Get messages after this message id */
  after?: BigString
}

export type GetMessagesOptions = GetMessagesAfter | GetMessagesBefore | GetMessagesAround | GetMessagesLimit

// /** https://discord.com/developers/docs/resources/channel#get-reactions-query-string-params */
// export interface GetReactions {
//   /** Get users after this user Id */
//   after?: string
//   /** Max number of users to return (1-100) */
//   limit?: number
// }

// /** https://discord.com/developers/docs/resources/channel#list-public-archived-threads-query-string-params */
// export interface ListArchivedThreads {
//   /** Returns threads before this timestamp */
//   before?: number
//   /** Optional maximum number of threads to return */
//   limit?: number
// }

// /** https://discord.com/developers/docs/resources/audit-log#get-guild-audit-log-query-string-parameters */
// export interface GetGuildAuditLog {
//   /** Entries from a specific user ID */
//   userId?: BigString | string
//   /** Entries for a specific audit log event */
//   actionType?: AuditLogEvents
//   /** Entries that preceded a specific audit log entry ID */
//   before?: BigString | string
//   /** Maximum number of entries (between 1-100) to return, defaults to 50 */
//   limit?: number
// }

// export interface GetBans {
//   /** Number of users to return (up to maximum 1000). Default: 1000 */
//   limit?: number
//   /** Consider only users before given user id */
//   before?: BigString
//   /** Consider only users after given user id */
//   after?: BigString
// }

// /** https://discord.com/developers/docs/resources/guild#list-guild-members */
// export interface ListGuildMembers {
//   /** Max number of members to return (1-1000). Default: 1000 */
//   limit?: number
//   /** The highest user id in the previous page. Default: 0 */
//   after?: string
// }

// /** https://discord.com/developers/docs/resources/guild#get-guild-prune-count */
// export interface GetGuildPruneCountQuery {
//   /** Number of days to count prune for (1 or more), default: 7 */
//   days?: number
//   /** Role(s) to include, default: none */
//   includeRoles?: string | string[]
// }

// export interface GetScheduledEventUsers {
//   /** number of users to return (up to maximum 100), defaults to 100 */
//   limit?: number
//   /** whether to also have member objects provided, defaults to false */
//   withMember?: boolean
//   /** consider only users before given user id */
//   before?: BigString
//   /** consider only users after given user id. If both before and after are provided, only before is respected. Fetching users in-between before and after is not supported. */
//   after?: BigString
// }

// /** https://discord.com/developers/docs/resources/invite#get-invite */
// export interface GetInvite {
//   /** Whether the invite should contain approximate member counts */
//   withCounts?: boolean
//   /** Whether the invite should contain the expiration date */
//   withExpiration?: boolean
//   /** the guild scheduled event to include with the invite */
//   scheduledEventId?: BigString
// }

// export type CreateApplicationCommand =
//   | CreateSlashApplicationCommand
//   | CreateContextApplicationCommand

// /** https://discord.com/developers/docs/interactions/application-commands#endpoints-json-params */
// export interface CreateSlashApplicationCommand {
//   /**
//    * Name of command, 1-32 characters.
//    * `ApplicationCommandTypes.ChatInput` command names must match the following regex `^[-_\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32}$` with the unicode flag set.
//    * If there is a lowercase variant of any letters used, you must use those.
//    * Characters with no lowercase variants and/or uncased letters are still allowed.
//    * ApplicationCommandTypes.User` and `ApplicationCommandTypes.Message` commands may be mixed case and can include spaces.
//    */
//   name: string
//   /** Localization object for the `name` field. Values follow the same restrictions as `name` */
//   nameLocalizations?: Localization
//   /** 1-100 character description */
//   description: string
//   /** Localization object for the `description` field. Values follow the same restrictions as `description` */
//   descriptionLocalizations?: Localization
//   /** Type of command, defaults `ApplicationCommandTypes.ChatInput` if not set  */
//   type?: ApplicationCommandTypes
//   /** Parameters for the command */
//   options?: ApplicationCommandOption[]
//   /** Set of permissions represented as a bit set */
//   defaultMemberPermissions?: PermissionStrings[]
//   /** Indicates whether the command is available in DMs with the app, only for globally-scoped commands. By default, commands are visible. */
//   dmPermission?: boolean
// }

// /** https://discord.com/developers/docs/interactions/application-commands#endpoints-json-params */
// export interface CreateContextApplicationCommand
//   extends Omit<
//   CreateSlashApplicationCommand,
//   'options' | 'description' | 'descriptionLocalizations'
//   > {
//   /** The type of the command */
//   type: ApplicationCommandTypes.Message | ApplicationCommandTypes.User
// }

// /** https://discord.com/developers/docs/interactions/slash-commands#interaction-response-interactionapplicationcommandcallbackdata */
// export interface InteractionCallbackData {
//   /** The message contents (up to 2000 characters) */
//   content?: string
//   /** True if this is a TTS message */
//   tts?: boolean
//   /** Embedded `rich` content (up to 6000 characters) */
//   embeds?: Embed[]
//   /** Allowed mentions for the message */
//   allowedMentions?: AllowedMentions
//   /** The contents of the file being sent */
//   file?: FileContent | FileContent[]
//   /** The customId you want to use for this modal response. */
//   customId?: string
//   /** The title you want to use for this modal response. */
//   title?: string
//   /** The components you would like to have sent in this message */
//   components?: MessageComponents
//   /** Message flags combined as a bit field (only SUPPRESS_EMBEDS and EPHEMERAL can be set) */
//   flags?: number
//   /** Autocomplete choices (max of 25 choices) */
//   choices?: ApplicationCommandOptionChoice[]
// }

// /** https://discord.com/developers/docs/interactions/slash-commands#interaction-response */
// export interface InteractionResponse {
//   /** The type of response */
//   type: InteractionResponseTypes
//   /** An optional response message */
//   data?: InteractionCallbackData
// }

// export interface ApplicationCommandOption {
//   /** Value of Application Command Option Type */
//   type: ApplicationCommandOptionTypes
//   /** 1-32 character name matching lowercase `^[\w-]{1,32}$` */
//   name: string
//   /** Localization object for the `name` field. Values follow the same restrictions as `name` */
//   nameLocalizations?: Localization
//   /** 1-100 character description */
//   description: string
//   /** Localization object for the `description` field. Values follow the same restrictions as `description` */
//   descriptionLocalizations?: Localization
//   /** If the parameter is required or optional--default `false` */
//   required?: boolean
//   /** Choices for `string` and `int` types for the user to pick from */
//   choices?: ApplicationCommandOptionChoice[]
//   /** If the option is a subcommand or subcommand group type, this nested options will be the parameters */
//   options?: ApplicationCommandOption[]
//   /** If the option is a channel type, the channels shown will be restricted to these types */
//   channelTypes?: ChannelTypes[]
//   /** Minimum number desired. */
//   minValue?: number
//   /** Maximum number desired. */
//   maxValue?: number
//   /** Minimum length desired. */
//   minLength?: number
//   /** Maximum length desired. */
//   maxLength?: number
//   /** if autocomplete interactions are enabled for this `String`, `Integer`, or `Number` type option */
//   autocomplete?: boolean
// }

/** https://discord.com/developers/docs/resources/emoji#create-guild-emoji */
export interface CreateGuildEmoji extends WithReason {
  /** Name of the emoji */
  name: string
  /** The 128x128 emoji image. Emojis and animated emojis have a maximum file size of 256kb. Attempting to upload an emoji larger than this limit will fail and return 400 Bad Request and an error message, but not a JSON status code. If a URL is provided to the image parameter, Discordeno will automatically convert it to a base64 string internally. */
  image: string
  /** Roles allowed to use this emoji */
  roles?: BigString[]
}

/** https://discord.com/developers/docs/resources/emoji#modify-guild-emoji */
export interface ModifyGuildEmoji extends WithReason {
  /** Name of the emoji */
  name?: string
  /** Roles allowed to use this emoji */
  roles?: BigString[] | null
}

/** https://discord.com/developers/docs/topics/gateway#request-guild-members */
export interface RequestGuildMembers {
  /** id of the guild to get members for */
  guildId: BigString
  /** String that username starts with, or an empty string to return all members */
  query?: string
  /** Maximum number of members to send matching the query; a limit of 0 can be used with an empty string query to return all members */
  limit: number
  /** Used to specify if we want the presences of the matched members */
  presences?: boolean
  /** Used to specify which users you wish to fetch */
  userIds?: BigString[]
  /** Nonce to identify the Guild Members Chunk response */
  nonce?: string
}
