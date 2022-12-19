import type {
  AllowedMentionsTypes,
  AuditLogEvents,
  BigString,
  ButtonStyles,
  MessageComponentTypes,
  OverwriteTypes,
  PermissionStrings,
  TextStyles
} from './shared.js'

export type MessageComponents = ActionRow[]

/** https://discord.com/developers/docs/interactions/message-components#actionrow */
export interface ActionRow {
  /** Action rows are a group of buttons. */
  type: MessageComponentTypes.ActionRow
  /** The components in this row */
  components:
  | [
    | ButtonComponent
    | InputTextComponent
    | SelectMenuComponent
    | SelectMenuChannelsComponent
    | SelectMenuRolesComponent
    | SelectMenuUsersComponent
    | SelectMenuUsersAndRolesComponent
  ]
  | [ButtonComponent, ButtonComponent]
  | [ButtonComponent, ButtonComponent, ButtonComponent]
  | [ButtonComponent, ButtonComponent, ButtonComponent, ButtonComponent]
  | [
    ButtonComponent,
    ButtonComponent,
    ButtonComponent,
    ButtonComponent,
    ButtonComponent
  ]
}

/** https://discord.com/developers/docs/interactions/message-components#button-object-button-structure */
export interface ButtonComponent {
  /** All button components have type 2 */
  type: MessageComponentTypes.Button
  /** for what the button says (max 80 characters) */
  label: string
  /** a dev-defined unique string sent on click (max 100 characters). type 5 Link buttons can not have a custom_id */
  customId?: string
  /** For different styles/colors of the buttons */
  style: ButtonStyles
  /** Emoji object that includes fields of name, id, and animated supporting unicode and custom emojis. */
  emoji?: {
    /** Emoji id */
    id?: bigint
    /** Emoji name */
    name?: string
    /** Whether this emoji is animated */
    animated?: boolean
  }
  /** optional url for link-style buttons that can navigate a user to the web. Only type 5 Link buttons can have a url */
  url?: string
  /** Whether or not this button is disabled */
  disabled?: boolean
}

/** https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-menu-structure */
export interface SelectMenuComponent {
  /** SelectMenu Component is of type 3 */
  type: MessageComponentTypes.SelectMenu
  /** A custom identifier for this component. Maximum 100 characters. */
  customId: string
  /** A custom placeholder text if nothing is selected. Maximum 150 characters. */
  placeholder?: string
  /** The minimum number of items that must be selected. Default 1. Between 1-25. */
  minValues?: number
  /** The maximum number of items that can be selected. Default 1. Between 1-25. */
  maxValues?: number
  /** The choices! Maximum of 25 items. */
  options: SelectOption[]
  /** Whether or not this select is disabled */
  disabled?: boolean
}

export interface SelectMenuUsersComponent {
  /** SelectMenuChannels Component is of type 5 */
  type: MessageComponentTypes.SelectMenuUsers
  /** A custom identifier for this component. Maximum 100 characters. */
  customId: string
  /** A custom placeholder text if nothing is selected. Maximum 150 characters. */
  placeholder?: string
  /** The minimum number of items that must be selected. Default 1. Between 1-25. */
  minValues?: number
  /** The maximum number of items that can be selected. Default 1. Between 1-25. */
  maxValues?: number
  /** Whether or not this select is disabled */
  disabled?: boolean
}

export interface SelectMenuRolesComponent {
  /** SelectMenuChannels Component is of type 6 */
  type: MessageComponentTypes.SelectMenuRoles
  /** A custom identifier for this component. Maximum 100 characters. */
  customId: string
  /** A custom placeholder text if nothing is selected. Maximum 150 characters. */
  placeholder?: string
  /** The minimum number of items that must be selected. Default 1. Between 1-25. */
  minValues?: number
  /** The maximum number of items that can be selected. Default 1. Between 1-25. */
  maxValues?: number
  /** Whether or not this select is disabled */
  disabled?: boolean
}

export interface SelectMenuUsersAndRolesComponent {
  /** SelectMenuChannels Component is of type 7 */
  type: MessageComponentTypes.SelectMenuUsersAndRoles
  /** A custom identifier for this component. Maximum 100 characters. */
  customId: string
  /** A custom placeholder text if nothing is selected. Maximum 150 characters. */
  placeholder?: string
  /** The minimum number of items that must be selected. Default 1. Between 1-25. */
  minValues?: number
  /** The maximum number of items that can be selected. Default 1. Between 1-25. */
  maxValues?: number
  /** The choices! Maximum of 25 items. */
  options: SelectOption[]
  /** Whether or not this select is disabled */
  disabled?: boolean
}

export interface SelectMenuChannelsComponent {
  /** SelectMenuChannels Component is of type 8 */
  type: MessageComponentTypes.SelectMenuChannels
  /** A custom identifier for this component. Maximum 100 characters. */
  customId: string
  /** A custom placeholder text if nothing is selected. Maximum 150 characters. */
  placeholder?: string
  /** The minimum number of items that must be selected. Default 1. Between 1-25. */
  minValues?: number
  /** The maximum number of items that can be selected. Default 1. Between 1-25. */
  maxValues?: number
  /** Whether or not this select is disabled */
  disabled?: boolean
}

export interface SelectOption {
  /** The user-facing name of the option. Maximum 25 characters. */
  label: string
  /** The dev-defined value of the option. Maximum 100 characters. */
  value: string
  /** An additional description of the option. Maximum 50 characters. */
  description?: string
  /** The id, name, and animated properties of an emoji. */
  emoji?: {
    /** Emoji id */
    id?: bigint
    /** Emoji name */
    name?: string
    /** Whether this emoji is animated */
    animated?: boolean
  }
  /** Will render this option as already-selected by default. */
  default?: boolean
}

/** https://discord.com/developers/docs/interactions/message-components#text-inputs-text-input-structure */
export interface InputTextComponent {
  /** InputText Component is of type 4 */
  type: MessageComponentTypes.InputText
  /** The style of the InputText */
  style: TextStyles
  /** The customId of the InputText */
  customId: string
  /** The label of the InputText. Maximum 45 characters */
  label: string
  /** The placeholder of the InputText */
  placeholder?: string
  /** The minimum length of the text the user has to provide */
  minLength?: number
  /** The maximum length of the text the user has to provide */
  maxLength?: number
  /** Whether or not this input is required. */
  required?: boolean
  /** Pre-filled value for input text. */
  value?: string
}

/** https://discord.com/developers/docs/resources/channel#allowed-mentions-object */
export interface AllowedMentions {
  /** An array of allowed mention types to parse from the content. */
  parse?: AllowedMentionsTypes[]
  /** For replies, whether to mention the author of the message being replied to (default false) */
  repliedUser?: boolean

  /** Array of role_ids to mention (Max size of 100) */
  roles?: bigint[]
  /** Array of user_ids to mention (Max size of 100) */
  users?: bigint[]
}

export interface FileContent {
  /** The file blob */
  blob: Blob
  /** The name of the file */
  name: string
}

/** https://discord.com/developers/docs/resources/guild#search-guild-members-query-string-params */
export interface SearchMembers {
  /** Query string to match username(s) and nickname(s) against */
  query: string
  /** Max number of members to return (1-1000). Default: 1 */
  limit?: number
}

export interface WithReason {
  /** The reason which should be added in the audit logs for doing this action. */
  reason?: string
}

export interface OverwriteReadable {
  /** Role or user id */
  id: bigint
  /** Either 0 (role) or 1 (member) */
  type: OverwriteTypes
  /** Permission bit set */
  allow?: PermissionStrings[]
  /** Permission bit set */
  deny?: PermissionStrings[]
}

export interface GetGatewayBot {
  url: string
  shards: number
  sessionStartLimit: {
    total: number
    remaining: number
    resetAfter: number
    maxConcurrency: number
  }
}

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

export type GetMessagesOptions =
  | GetMessagesAfter
  | GetMessagesBefore
  | GetMessagesAround
  | GetMessagesLimit

/** https://discord.com/developers/docs/resources/channel#get-reactions-query-string-params */
export interface GetReactions {
  /** Get users after this user Id */
  after?: string
  /** Max number of users to return (1-100) */
  limit?: number
}

/** https://discord.com/developers/docs/resources/channel#list-public-archived-threads-query-string-params */
export interface ListArchivedThreads {
  /** Returns threads before this timestamp */
  before?: number
  /** Optional maximum number of threads to return */
  limit?: number
}

/** https://discord.com/developers/docs/resources/audit-log#get-guild-audit-log-query-string-parameters */
export interface GetGuildAuditLog {
  /** Entries from a specific user ID */
  userId?: BigString | string
  /** Entries for a specific audit log event */
  actionType?: AuditLogEvents
  /** Entries that preceded a specific audit log entry ID */
  before?: BigString | string
  /** Maximum number of entries (between 1-100) to return, defaults to 50 */
  limit?: number
}

export interface GetBans {
  /** Number of users to return (up to maximum 1000). Default: 1000 */
  limit?: number
  /** Consider only users before given user id */
  before?: BigString
  /** Consider only users after given user id */
  after?: BigString
}

/** https://discord.com/developers/docs/resources/guild#list-guild-members */
export interface ListGuildMembers {
  /** Max number of members to return (1-1000). Default: 1000 */
  limit?: number
  /** The highest user id in the previous page. Default: 0 */
  after?: string
}

/** https://discord.com/developers/docs/resources/guild#get-guild-prune-count */
export interface GetGuildPruneCountQuery {
  /** Number of days to count prune for (1 or more), default: 7 */
  days?: number
  /** Role(s) to include, default: none */
  includeRoles?: string | string[]
}

export interface GetScheduledEventUsers {
  /** number of users to return (up to maximum 100), defaults to 100 */
  limit?: number
  /** whether to also have member objects provided, defaults to false */
  withMember?: boolean
  /** consider only users before given user id */
  before?: BigString
  /** consider only users after given user id. If both before and after are provided, only before is respected. Fetching users in-between before and after is not supported. */
  after?: BigString
}

/** https://discord.com/developers/docs/resources/invite#get-invite */
export interface GetInvite {
  /** Whether the invite should contain approximate member counts */
  withCounts?: boolean
  /** Whether the invite should contain the expiration date */
  withExpiration?: boolean
  /** the guild scheduled event to include with the invite */
  scheduledEventId?: BigString
}
