/**
 * Types for:
 * - https://discord.com/developers/docs/interactions/receiving-and-responding
 * - https://discord.com/developers/docs/interactions/application-commands
 */

import type { DiscordApplicationIntegrationType } from './application.js'
import type { ChannelTypes, DiscordChannel } from './channel.js'
import type { DiscordMessageComponents, MessageComponentTypes } from './components.js'
import type { DiscordEntitlement } from './entitlement.js'
import type { DiscordGuild, DiscordMember, DiscordMemberWithUser } from './guild.js'
import type { DiscordAttachment, DiscordMessage } from './message.js'
import type { DiscordRole } from './permissions.js'
import type { Localization } from './reference.js'
import type { DiscordUser } from './user.js'

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-structure */
export interface DiscordInteraction {
  /** Id of the interaction */
  id: string
  /** Id of the application this interaction is for */
  application_id: string
  /** The type of interaction */
  type: InteractionTypes
  /** Guild that the interaction was sent from */
  guild?: Partial<DiscordGuild>
  /** The guild it was sent from */
  guild_id?: string
  /** The channel it was sent from */
  channel: Partial<DiscordChannel>
  /**
   * The ID of channel it was sent from
   *
   * @remarks
   * It is recommended that you begin using this channel field to identify the source channel of the interaction as they may deprecate the existing channel_id field in the future.
   */
  channel_id?: string
  /** Guild member data for the invoking user, including permissions */
  member?: DiscordInteractionMember
  /** User object for the invoking user, if invoked in a DM */
  user?: DiscordUser
  /** A continuation token for responding to the interaction */
  token: string
  /** Read-only property, always `1` */
  version: 1
  /** For components or modals triggered by components, the message they were attached to */
  message?: DiscordMessage
  /** the command data payload */
  data?: DiscordInteractionData
  /** The selected language of the invoking user */
  locale?: string
  /** The guild's preferred locale, if invoked in a guild */
  guild_locale?: string
  /** The computed permissions for a bot or app in the context of a specific interaction (including channel overwrites) */
  app_permissions: string
  /** For monetized apps, any entitlements for the invoking user, representing access to premium SKUs */
  entitlements: DiscordEntitlement[]
  /** Mapping of installation contexts that the interaction was authorized for to related user or guild IDs. */
  authorizing_integration_owners: DiscordAuthorizingIntegrationOwners
  /** Context where the interaction was triggered from */
  context?: DiscordInteractionContextType
  /** Attachment size limit in bytes */
  attachment_size_limit: number
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-type */
export enum InteractionTypes {
  Ping = 1,
  ApplicationCommand = 2,
  MessageComponent = 3,
  ApplicationCommandAutocomplete = 4,
  ModalSubmit = 5,
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-context-types */
export enum DiscordInteractionContextType {
  /** Interaction can be used within servers */
  Guild = 0,
  /** Interaction can be used within DMs with the app's bot user */
  BotDm = 1,
  /** Interaction can be used within Group DMs and DMs other than the app's bot user */
  PrivateChannel = 2,
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-authorizing-integration-owners-object */
export type DiscordAuthorizingIntegrationOwners = Partial<Record<DiscordApplicationIntegrationType, string>>

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-data */
export interface DiscordInteractionData {
  /** The type of component */
  component_type?: MessageComponentTypes
  /** The custom id provided for this component. */
  custom_id?: string
  /** The components if its a Modal Submit interaction. */
  components?: DiscordMessageComponents
  /** The values chosen by the user. */
  values?: string[]
  /** The Id of the invoked command */
  id: string
  /** The name of the invoked command */
  name: string
  /** the type of the invoked command */
  type: ApplicationCommandTypes
  /** Converted users + roles + channels + attachments */
  resolved?: DiscordInteractionDataResolved
  /** The params + values from the user */
  options?: DiscordInteractionDataOption[]
  /** The target id if this is a context menu command. */
  target_id?: string
  /** the id of the guild the command is registered to */
  guild_id?: string
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-resolved-data-structure */
export interface DiscordInteractionDataResolved {
  /** The Ids and Message objects */
  messages?: Record<string, DiscordMessage>
  /** The Ids and User objects */
  users?: Record<string, DiscordUser>
  /** The Ids and partial Member objects */
  members?: Record<string, Omit<DiscordInteractionMember, 'user' | 'deaf' | 'mute'>>
  /** The Ids and Role objects */
  roles?: Record<string, DiscordRole>
  /** The Ids and partial Channel objects */
  channels?: Record<string, Pick<DiscordChannel, 'id' | 'name' | 'type' | 'permissions'>>
  /** The ids and attachment objects */
  attachments: Record<string, DiscordAttachment>
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-application-command-interaction-data-option-structure */
export interface DiscordInteractionDataOption {
  /** Name of the parameter */
  name: string
  /** Value of application command option type */
  type: ApplicationCommandOptionTypes
  /** Value of the option resulting from user input */
  value?: string | boolean | number
  /** Present if this option is a group or subcommand */
  options?: DiscordInteractionDataOption[]
  /** `true` if this option is the currently focused option for autocomplete */
  focused?: boolean
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#message-interaction-object-message-interaction-structure */
export interface DiscordMessageInteraction {
  /** Id of the interaction */
  id: string
  /** The type of interaction */
  type: InteractionTypes
  /** The name of the ApplicationCommand including the name of the subcommand/subcommand group */
  name: string
  /** The user who invoked the interaction */
  user: DiscordUser
  /** The member who invoked the interaction in the guild */
  member?: Partial<DiscordMember>
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type */
export enum InteractionResponseTypes {
  /** ACK a `Ping` */
  Pong = 1,
  /** Respond to an interaction with a message */
  ChannelMessageWithSource = 4,
  /** ACK an interaction and edit a response later, the user sees a loading state */
  DeferredChannelMessageWithSource = 5,
  /** For components, ACK an interaction and edit the original message later; the user does not see a loading state */
  DeferredUpdateMessage = 6,
  /** For components, edit the message the component was attached to */
  UpdateMessage = 7,
  /** For Application Command Options, send an autocomplete result */
  ApplicationCommandAutocompleteResult = 8,
  /** For Command or Component interactions, send a Modal response */
  Modal = 9,
  /**
   * Respond to an interaction with an upgrade button, only available for apps with monetization enabled
   *
   * @deprecated You should migrate to the premium button components
   */
  PremiumRequired = 10,
  /**
   * Launch the Activity associated with the app.
   *
   * @remarks
   * Only available for apps with Activities enabled
   */
  LaunchActivity = 12,
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-callback-interaction-callback-response-object */
export interface DiscordInteractionCallbackResponse {
  /** The interaction object associated with the interaction response */
  interaction: DiscordInteractionCallback
  /** The resource that was created by the interaction response. */
  resource?: DiscordInteractionResource
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-callback-interaction-callback-object */
export interface DiscordInteractionCallback {
  /** ID of the interaction */
  id: string
  /** Interaction type */
  type: InteractionTypes
  /** Instance ID of the Activity if one was launched or joined */
  activity_instance_id?: string
  /** ID of the message that was created by the interaction */
  response_message_id?: string
  /** Whether or not the message is in a loading state */
  response_message_loading?: boolean
  /** Whether or not the response message was ephemeral */
  response_message_ephemeral?: boolean
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-callback-interaction-callback-resource-object */
export interface DiscordInteractionResource {
  type: InteractionResponseTypes
  /**
   * Represents the Activity launched by this interaction.
   *
   * @remarks
   * Only present if type is `LAUNCH_ACTIVITY`.
   */
  activity_instance?: DiscordActivityInstanceResource
  /**
   * Message created by the interaction.
   *
   * @remarks
   * Only present if type is either `CHANNEL_MESSAGE_WITH_SOURCE` or `UPDATE_MESSAGE`.
   */
  message?: DiscordMessage
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-callback-interaction-callback-activity-instance-resource */
export interface DiscordActivityInstanceResource {
  /** Instance ID of the Activity if one was launched or joined. */
  id: string
}

/** https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-structure */
export interface DiscordApplicationCommand extends DiscordCreateApplicationCommand {
  /** Unique ID of command */
  id: string
  /** ID of the parent application */
  application_id: string
  /** Guild id of the command, if not global */
  guild_id?: string
}

/** https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types */
export enum ApplicationCommandTypes {
  /** A text-based command that shows up when a user types `/` */
  ChatInput = 1,
  /** A UI-based command that shows up when you right click or tap on a user */
  User,
  /** A UI-based command that shows up when you right click or tap on a message */
  Message,
  /** A UI-based command that represents the primary way to invoke an app's Activity */
  PrimaryEntryPoint,
}

/** https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure */
export interface DiscordApplicationCommandOption {
  /** Type of option */
  type: ApplicationCommandOptionTypes
  /**
   * Name of command, 1-32 characters.
   *
   * @remarks
   * This value should be unique within an array of {@link DiscordApplicationCommandOption}
   *
   * {@link ApplicationCommandTypes.ChatInput | ChatInput} command names must match the following regex `^[-_ʼ\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32}$` with the unicode flag set.
   * If there is a lowercase variant of any letters used, you must use those.
   * Characters with no lowercase variants and/or uncased letters are still allowed.
   *
   * {@link ApplicationCommandTypes.User | User} and {@link ApplicationCommandTypes.Message | Message} commands may be mixed case and can include spaces.
   */
  name: string
  /** Localization object for the `name` field. Values follow the same restrictions as `name` */
  name_localizations?: Localization | null
  /** 1-100 character description */
  description: string
  /** Localization object for the `description` field. Values follow the same restrictions as `description` */
  description_localizations?: Localization | null
  /**
   * If the parameter is required or optional. default `false`
   *
   * @remarks
   * Valid in all option types except {@link ApplicationCommandOptionTypes.SubCommand | SubCommand} and {@link ApplicationCommandOptionTypes.SubCommandGroup | SubCommandGroup}
   */
  required?: boolean
  /**
   * Choices for the option from which the user can choose, max 25
   *
   * @remarks
   * Only valid in options of type {@link ApplicationCommandOptionTypes.String | String}, {@link ApplicationCommandOptionTypes.Integer | Integer}, or {@link ApplicationCommandOptionTypes.Number | Number}
   *
   * If you provide an array of choices, they will be the ONLY accepted values for this option
   */
  choices?: DiscordApplicationCommandOptionChoice[]
  /**
   * If the option is a subcommand or subcommand group type, these nested options will be the parameters
   *
   * @remarks
   * Only valid in option of type {@link ApplicationCommandOptionTypes.SubCommand | SubCommand} or {@link ApplicationCommandOptionTypes.SubCommandGroup | SubCommandGroup}
   */
  options?: DiscordApplicationCommandOption[]
  /**
   * If autocomplete interactions are enabled for this option.
   *
   * @remarks
   * Only valid in options of type {@link ApplicationCommandOptionTypes.String | String}, {@link ApplicationCommandOptionTypes.Integer | Integer}, or {@link ApplicationCommandOptionTypes.Number | Number}
   *
   * When {@link DiscordApplicationCommandOption.choices | choices} are provided, this may not be set to true
   */
  autocomplete?: boolean
  /**
   * The channels shown will be restricted to these types
   *
   * @remarks
   * Only valid in option of type {@link ApplicationCommandOptionTypes.Channel | Channel}
   */
  channel_types?: ChannelTypes[]
  /**
   * The minimum permitted value
   *
   * @remarks
   * Only valid in options of type {@link ApplicationCommandOptionTypes.Integer | Integer} or {@link ApplicationCommandOptionTypes.Number | Number}
   */
  min_value?: number
  /**
   * The maximum permitted value
   *
   * @remarks
   * Only valid in options of type {@link ApplicationCommandOptionTypes.Integer | Integer} or {@link ApplicationCommandOptionTypes.Number | Number}
   */
  max_value?: number
  /**
   * The minimum permitted length, should be in the range of from 0 to 600
   *
   * @remarks
   * Only valid in options of type {@link ApplicationCommandOptionTypes.String | String}
   */
  min_length?: number
  /**
   * The maximum permitted length, should be in the range of from 0 to 600
   *
   * @remarks
   * Only valid in options of type {@link ApplicationCommandOptionTypes.String | String}
   */
  max_length?: number
}

/** https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type */
export enum ApplicationCommandOptionTypes {
  SubCommand = 1,
  SubCommandGroup,
  String,
  Integer,
  Boolean,
  User,
  Channel,
  Role,
  Mentionable,
  Number,
  Attachment,
}

/** https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-choice-structure */
export interface DiscordApplicationCommandOptionChoice {
  /** 1-100 character choice name */
  name: string
  /** Localization object for the `name` field. Values follow the same restrictions as `name` */
  name_localizations?: Localization | null
  /** Value for the choice, up to 100 characters if string */
  value: string | number
}

/** https://discord.com/developers/docs/interactions/application-commands#application-command-object-entry-point-command-handler-types */
export enum DiscordInteractionEntryPointCommandHandlerType {
  /** The app handles the interaction using an interaction token */
  AppHandler = 1,
  /** Discord handles the interaction by launching an Activity and sending a follow-up message without coordinating with the app */
  DiscordLaunchActivity = 2,
}

/** https://discord.com/developers/docs/interactions/application-commands#application-command-permissions-object-guild-application-command-permissions-structure */
export interface DiscordGuildApplicationCommandPermissions {
  /** ID of the command or the application ID. When the `id` field is the application ID instead of a command ID, the permissions apply to all commands that do not contain explicit overwrites. */
  id: string
  /** ID of the application the command belongs to */
  application_id: string
  /** ID of the guild */
  guild_id: string
  /** Permissions for the command in the guild, max of 100 */
  permissions: DiscordApplicationCommandPermissions[]
}

/** https://discord.com/developers/docs/interactions/application-commands#application-command-permissions-object-application-command-permissions-structure */
export interface DiscordApplicationCommandPermissions {
  /** ID of the role, user, or channel. It can also be a permission constant */
  id: string
  /** ApplicationCommandPermissionTypes.Role, ApplicationCommandPermissionTypes.User, or ApplicationCommandPermissionTypes.Channel */
  type: ApplicationCommandPermissionTypes
  /** `true` to allow, `false`, to disallow */
  permission: boolean
}

/** https://discord.com/developers/docs/interactions/application-commands#application-command-permissions-object-application-command-permission-type */
export enum ApplicationCommandPermissionTypes {
  Role = 1,
  User,
  Channel,
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-structure specifcly the member propriety */
export interface DiscordInteractionMember extends DiscordMemberWithUser {
  /** Total permissions of the member in the channel, including overwrites, returned when in the interaction object */
  permissions: string
}

// TODO: This type does not match any structure discord defines it is however a subset of the props in
// https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-structure
// that is used by DiscordApplicationCommand.
// We should provably remove this type and merge it with DiscordApplicationCommand and re-define it as
// https://discord.com/developers/docs/interactions/application-commands#create-global-application-command-json-params
// as that would match the name
export interface DiscordCreateApplicationCommand {
  /** Type of command, defaults to `ApplicationCommandTypes.ChatInput` */
  type?: ApplicationCommandTypes
  /**
   * Name of command, 1-32 characters.
   * `ApplicationCommandTypes.ChatInput` command names must match the following regex `^[-_ʼ\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32}$` with the unicode flag set.
   * If there is a lowercase variant of any letters used, you must use those.
   * Characters with no lowercase variants and/or uncased letters are still allowed.
   * ApplicationCommandTypes.User` and `ApplicationCommandTypes.Message` commands may be mixed case and can include spaces.
   */
  name: string
  /** Localization object for `name` field. Values follow the same restrictions as `name` */
  name_localizations?: Localization | null
  /** Description for `ApplicationCommandTypes.ChatInput` commands, 1-100 characters. */
  description?: string
  /** Localization object for `description` field. Values follow the same restrictions as `description` */
  description_localizations?: Localization | null
  /** Parameters for the command, max of 25 */
  options?: DiscordApplicationCommandOption[]
  /** Set of permissions represented as a bit set */
  default_member_permissions?: string | null
  /**
   * Installation contexts where the command is available
   *
   * @remarks
   * This value is available only for globally-scoped commands
   * Defaults to the application configured contexts
   */
  integration_types?: DiscordApplicationIntegrationType[]
  /**
   * Interaction context(s) where the command can be used
   *
   * @remarks
   * This value is available only for globally-scoped commands.
   */
  contexts?: DiscordInteractionContextType[] | null
  /**
   * Indicates whether the command is available in DMs with the app, only for globally-scoped commands. By default, commands are visible.
   *
   * @deprecated use {@link contexts} instead
   */
  dm_permission?: boolean
  /** Indicates whether the command is age-restricted, defaults to false */
  nsfw?: boolean
  /** Auto incrementing version identifier updated during substantial record changes */
  version?: string
  /**
   * Determines whether the interaction is handled by the app's interactions handler or by Discord
   *
   * @remarks
   * This can only be set for application commands of type `PRIMARY_ENTRY_POINT` for applications with the `EMBEDDED` flag (i.e. applications that have an Activity).
   */
  handler?: DiscordInteractionEntryPointCommandHandlerType
}
