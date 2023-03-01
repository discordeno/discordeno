/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-useless-call */
import {
  BitwisePermissionFlags,
  ChannelTypes,
  type ApplicationCommandTypes,
  type BigString,
  type DefaultMessageNotificationLevels,
  type DiscordEmoji,
  type DiscordGuild,
  type DiscordMemberWithUser,
  type DiscordSticker,
  type ExplicitContentFilterLevels,
  type GuildFeatures,
  type GuildNsfwLevel,
  type MfaLevels,
  type PremiumTiers,
  type RequestGuildMembers,
  type SystemChannelFlags,
  type VerificationLevels,
} from '@discordeno/types'
import Base from '../../Base.js'
import type Client from '../../Client.js'
import type { ImageFormat, ImageSize } from '../../Client.js'
import Collection from '../../Collection.js'
import { BANNER, GUILD_DISCOVERY_SPLASH, GUILD_ICON, GUILD_SPLASH } from '../../Endpoints.js'
import type Shard from '../../gateway/Shard.js'
import type {
  AnyGuildChannel,
  AnyThreadChannel,
  ApplicationCommand,
  ApplicationCommandPermissions,
  ApplicationCommandStructure,
  ChannelPosition,
  CreateChannelOptions,
  CreateStickerOptions,
  DiscoveryMetadata,
  DiscoveryOptions,
  DiscoverySubcategoryResponse,
  EditStickerOptions,
  Emoji,
  EmojiOptions,
  GetGuildAuditLogOptions,
  GetGuildBansOptions,
  GetPruneOptions,
  GetRESTGuildMembersOptions,
  GuildApplicationCommandPermissions,
  GuildAuditLog,
  GuildBan,
  GuildOptions,
  GuildTemplateOptions,
  GuildVanity,
  IntegrationOptions,
  ListedGuildThreads,
  MemberOptions,
  PruneMemberOptions,
  RoleOptions,
  Sticker,
  VoiceRegion,
  VoiceStateOptions,
  Webhook,
  WelcomeScreen,
  WelcomeScreenOptions,
  Widget,
  WidgetData,
} from '../../typings.js'
import { generateChannelFrom } from '../../utils/generate.js'
import type CategoryChannel from '../channels/Category.js'
import type GuildChannel from '../channels/Guild.js'
import type StageChannel from '../channels/Stage.js'
import type TextChannel from '../channels/Text.js'
import type TextVoiceChannel from '../channels/TextVoice.js'
import type ThreadChannel from '../channels/threads/Thread.js'
import type VoiceChannel from '../channels/Voice.js'
import type Invite from '../Invite.js'
import Permission from '../Permission.js'
import User from '../users/User.js'
import type GuildIntegration from './Integration.js'
import Member from './Member.js'
import Role from './Role.js'
import StageInstance from './StageInstance.js'
import type GuildTemplate from './Template.js'
import type { VoiceState } from './VoiceState.js'

export class Guild extends Base {
  /** The client object */
  client: Client
  /** The id of the guild owner. */
  ownerID: BigString
  /** The id of the application. */
  applicationID?: BigString | null
  /** The id of the widget channel. */
  widgetChannelID?: BigString | null
  /** The afk channel id if one is set. */
  afkChannelID?: BigString | null
  /** The system channel id if one is set. */
  systemChannelID?: BigString | null
  /** The public updates channel id if one is set. */
  publicUpdatesChannelID?: BigString | null
  /** The rules channel id if one is set. */
  rulesChannelID?: BigString | null
  /** The name of the guild. */
  name?: string
  /** The description of the guild. */
  description?: string | null
  /** The vanity url if one is set. */
  vanityURL?: string | null
  /** The preferred locale of the server. */
  preferredLocale?: string
  /** The system channel flags. */
  systemChannelFlags?: SystemChannelFlags
  /** The verification level of the guild. */
  verificationLevel?: VerificationLevels
  /** The default notification level. */
  defaultNotifications?: DefaultMessageNotificationLevels
  /** The explicit content filter setting for this guild. */
  explicitContentFilter?: ExplicitContentFilterLevels
  /** Array of guild features */
  features: GuildFeatures[] = []
  /** The premium tier of the guild. */
  premiumTier?: PremiumTiers
  /** The MFA level of the guild. */
  mfaLevel?: MfaLevels
  /** The NSFW level of the guild. */
  nsfwLevel?: GuildNsfwLevel
  /** The compressed form of the guild splash image. */
  _splash?: bigint
  /** The compressed form of the guild's discovery splash image. */
  _discoverySplash?: bigint
  /** The compressed form of the guild's banner image. */
  _banner?: bigint
  /** The compressed form of the guild's icon image. */
  _icon?: bigint
  /** The cached emojis in the guild. */
  emojis?: DiscordEmoji[]
  /** The cached stickers in the guild. */
  stickers?: DiscordSticker[]
  /** The afk timeout in seconds. */
  afkTimeout?: number
  /** When this guild was joined at. */
  joinedAt: number
  /** The amount of members in the guild. */
  memberCount: number
  /** The approximate member count in the guild. */
  approximateMemberCount?: number
  /** The approximate presence count in the guild. */
  approximatePresenceCount?: number
  /** The amount of subscribers to the server. */
  premiumSubscriptionCount?: number
  /** The maximum amount of presences that can be in a guild. */
  maxPresences?: number | null
  /** The maximum amount of members that can be in the guild. */
  maxMembers?: number
  /** The maximum amount of members that can be in a video channel. */
  maxVideoChannelUsers?: number | null
  /** Whether or not this guild is unavailable. */
  unavailable: boolean
  /** Whether or not the widget is enabled in this guild. */
  widgetEnabled: boolean
  /** Whether or not this guild is considered large. */
  large?: boolean
  /** Whether or not the premium progress bar is enabled. */
  premiumProgressBarEnabled?: boolean
  /** Whether or not this server is nsfw. */
  nsfw?: boolean
  /** The welcome screen settings. */
  welcomeScreen?: {
    description: string | null
    welcomeChannels?: Array<{
      channelID: string
      description: string
      emojiID: string | null
      emojiName: string | null
    }>
  }

  /** The cached members in this guild. */
  members = new Collection<BigString, Member>()
  /** The cached roles in this guild. */
  roles = new Collection<BigString, Role>()
  /** The cached channels in this guild. */
  channels = new Collection<BigString, GuildChannel>()
  /** The cached threads in this guild. */
  threads = new Collection<BigString, ThreadChannel>()
  /** The cached voice states in this guild. */
  voiceStates = new Collection<BigString, VoiceState>()
  /** The cached stage instances in this guild. */
  stageInstances = new Collection<BigString, StageInstance>()
  /** The shard that manages this guild. */
  shard: Shard;

  constructor(data: DiscordGuild, client: Client) {
    super(data.id)
    this.client = client
    this.shard = client.shards.get(client.guildShardMap[this.id] || (Base.getDiscordEpoch(data.id) % (client.options.maxShards as number)) || 0)!;

    this.ownerID = data.owner_id

    this.unavailable = !!data.unavailable
    this.joinedAt = Date.parse(data.joined_at!)
    this.memberCount = data.member_count ?? 0
    this.applicationID = data.application_id
    this.widgetEnabled = !!data.widget_enabled

    if (data.widget_channel_id !== undefined) {
      this.widgetChannelID = data.widget_channel_id
    }

    if (data.approximate_member_count !== undefined) {
      this.approximateMemberCount = data.approximate_member_count
    }
    if (data.approximate_presence_count !== undefined) {
      this.approximatePresenceCount = data.approximate_presence_count
    }

    if (data.roles) {
      for (const r of data.roles) {
        const role = new Role(r, this)
        this.roles.set(role.id, role)
      }
    }

    if (data.channels) {
      for (const channelData of data.channels) {
        channelData.guild_id = this.id.toString()
        const channel = generateChannelFrom(channelData, client) as GuildChannel
        this.channels.set(channel.id, channel)
        client._channelGuildMap.set(channel.id, this.id)
      }
    }

    if (data.threads) {
      for (const threadData of data.threads) {
        threadData.guild_id = this.id.toString()
        const thread = generateChannelFrom(threadData, client) as unknown as ThreadChannel
        this.threads.set(thread.id, thread)
        client._threadGuildMap.set(thread.id, this.id)
      }
    }

    if (data.members) {
      for (const m of data.members) {
        const member = new Member(m as DiscordMemberWithUser, this, client)
        this.members.set(member.id, member)
      }
    }

    if (data.stage_instances) {
      for (const stageInstance of data.stage_instances) {
        stageInstance.guild_id = this.id

        const instance = new StageInstance(stageInstance, client)
        this.stageInstances.set(instance.id, instance)
      }
    }

    if (data.presences) {
      for (const presence of data.presences) {
        if (presence.user?.id) {
          const cached = this.client.users.get(presence.user.id)
          if (cached) cached.update(presence.user)
          else {
            const user = new User(presence.user, this.client)
            this.client.users.set(user.id, user)
          }
        }
      }
    }

    if (data.voice_states) {
      for (const voiceState of data.voice_states) {
        if (!this.members.get(voiceState.user_id)) continue

        if (voiceState.member) {
          const member = new Member(voiceState.member, this, client)
          this.members.set(member.id, member)
          const user = new User(voiceState.member.user, client)
          this.client.users.set(user.id, user)

          // TODO: check channel type maybe voice channel?
          ;(this.channels.get(voiceState.channel_id!) as VoiceChannel)?.voiceMembers.set(member.id, member)
        }

        // TODO: voice support
        // if (
        //   client.options.seedVoiceConnections &&
        //   voiceState.user_id === client.id &&
        //   !client.voiceConnections.get(this.id)
        // ) {
        //   process.nextTick(() =>
        //     this.client.joinVoiceChannel(voiceState.channel_id)
        //   );
        // }
      }
    }
    this.update(data)
  }

  /**
   * @deprecated - please use .client
   */
  get _client() {
    return this.client
  }

  update(data: DiscordGuild) {
    if (data.name !== undefined) {
      this.name = data.name
    }
    if (data.verification_level !== undefined) {
      this.verificationLevel = data.verification_level
    }
    if (data.splash !== undefined) {
      this._splash = data.splash ? this.client.iconHashToBigInt(data.splash) : undefined
    }

    if (data.discovery_splash !== undefined) {
      this._discoverySplash = data.discovery_splash ? this.client.iconHashToBigInt(data.discovery_splash) : undefined
    }

    if (data.banner !== undefined) {
      this._banner = data.banner ? this.client.iconHashToBigInt(data.banner) : undefined
    }

    if (data.owner_id !== undefined) {
      this.ownerID = data.owner_id
    }

    if (data.icon !== undefined) {
      this._icon = data.icon ? this.client.iconHashToBigInt(data.icon) : undefined
    }

    // TODO: compress features.
    if (data.features !== undefined) {
      this.features = data.features
    }

    if (data.emojis !== undefined) {
      this.emojis = data.emojis
    }

    if (data.stickers !== undefined) {
      this.stickers = data.stickers
    }

    if (data.afk_channel_id !== undefined) {
      this.afkChannelID = data.afk_channel_id
    }

    if (data.afk_timeout !== undefined) {
      this.afkTimeout = data.afk_timeout
    }

    if (data.default_message_notifications !== undefined) {
      this.defaultNotifications = data.default_message_notifications
    }

    if (data.mfa_level !== undefined) {
      this.mfaLevel = data.mfa_level
    }

    if (data.large !== undefined) {
      this.large = data.large
    }

    if (data.max_presences !== undefined) {
      this.maxPresences = data.max_presences
    }

    if (data.explicit_content_filter !== undefined) {
      this.explicitContentFilter = data.explicit_content_filter
    }

    if (data.system_channel_id !== undefined) {
      this.systemChannelID = data.system_channel_id
    }

    if (data.system_channel_flags !== undefined) {
      this.systemChannelFlags = data.system_channel_flags
    }
    if (data.premium_progress_bar_enabled !== undefined) {
      this.premiumProgressBarEnabled = data.premium_progress_bar_enabled
    }
    if (data.premium_tier !== undefined) {
      this.premiumTier = data.premium_tier
    }
    if (data.premium_subscription_count !== undefined) {
      this.premiumSubscriptionCount = data.premium_subscription_count
    }
    if (data.vanity_url_code !== undefined) {
      this.vanityURL = data.vanity_url_code
    }
    if (data.preferred_locale !== undefined) {
      this.preferredLocale = data.preferred_locale
    }
    if (data.description !== undefined) {
      this.description = data.description
    }
    if (data.max_members !== undefined) {
      this.maxMembers = data.max_members
    }
    if (data.public_updates_channel_id !== undefined) {
      this.publicUpdatesChannelID = data.public_updates_channel_id
    }
    if (data.rules_channel_id !== undefined) {
      this.rulesChannelID = data.rules_channel_id
    }
    if (data.max_video_channel_users !== undefined) {
      this.maxVideoChannelUsers = data.max_video_channel_users
    }
    if (data.welcome_screen !== undefined) {
      this.welcomeScreen = {
        description: data.welcome_screen.description,
        welcomeChannels: data.welcome_screen.welcome_channels?.map((c) => {
          return {
            channelID: c.channel_id,
            description: c.description,
            emojiID: c.emoji_id,
            emojiName: c.emoji_name,
          }
        }),
      }
    }
    // if (data.nsfw !== undefined) {
    //   this.nsfw = data.nsfw;
    // }
    if (data.nsfw_level !== undefined) {
      this.nsfwLevel = data.nsfw_level
    }
  }

  get banner(): string | undefined {
    return this._banner ? this.client.iconBigintToHash(this._banner) : undefined
  }

  get bannerURL(): string | null {
    return this.banner ? this.client._formatImage(BANNER(this.id, this.banner)) : null
  }

  get icon(): string | undefined {
    return this._icon ? this.client.iconBigintToHash(this._icon) : undefined
  }

  get iconURL(): string | null {
    return this.icon ? this.client._formatImage(GUILD_ICON(this.id, this.icon)) : null
  }

  get splash(): string | undefined {
    return this._splash ? this.client.iconBigintToHash(this._splash) : undefined
  }

  get splashURL(): string | null {
    return this.splash ? this.client._formatImage(GUILD_SPLASH(this.id, this.splash)) : null
  }

  get discoverySplash(): string | undefined {
    return this._discoverySplash ? this.client.iconBigintToHash(this._discoverySplash) : undefined
  }

  get discoverySplashURL(): string | null {
    return this.discoverySplash ? this.client._formatImage(GUILD_DISCOVERY_SPLASH(this.id, this.discoverySplash)) : null
  }

  /** Add a discovery subcategory */
  async addDiscoverySubcategory(categoryID: BigString, reason?: string): Promise<DiscoverySubcategoryResponse> {
    return await this.client.addGuildDiscoverySubcategory.call(this.client, this.id, categoryID, reason)
  }

  /** Add a role to a guild member */
  async addMemberRole(memberID: BigString, roleID: BigString, reason?: string): Promise<void> {
    return await this.client.addGuildMemberRole.call(this.client, this.id, memberID, roleID, reason)
  }

  /** Ban a user from the guild */
  async banMember(userID: BigString, deleteMessageDays = 0, reason?: string): Promise<void> {
    return await this.client.banGuildMember.call(this.client, this.id, userID, deleteMessageDays, reason)
  }

  /** Bulk create/edit guild application commands */
  async bulkEditCommands(commands: Array<ApplicationCommand<ApplicationCommandTypes>>): Promise<Array<ApplicationCommand<ApplicationCommandTypes>>> {
    return await this.client.bulkEditGuildCommands.call(this.client, this.id, commands)
  }

  /** Create a channel in the guild */
  async createChannel(
    name: string,
    type = ChannelTypes.GuildText,
    options: CreateChannelOptions,
  ): Promise<CategoryChannel | TextChannel | TextVoiceChannel | StageChannel> {
    return await this.client.createChannel.call(this.client, this.id, name, type as number, options)
  }

  /** Create a guild application command */
  async createCommand(command: ApplicationCommandStructure): Promise<ApplicationCommand<ApplicationCommandTypes>> {
    return await this.client.createGuildCommand.call(this.client, this.id, command)
  }

  /** Create a emoji in the guild */
  async createEmoji(options: EmojiOptions, reason?: string): Promise<Emoji> {
    return await this.client.createGuildEmoji.call(this.client, this.id, options, reason)
  }

  /** Create a guild role */
  async createRole(options: Role | RoleOptions, reason?: string): Promise<Role> {
    return await this.client.createRole.call(this.client, this.id, options, reason)
  }

  /** Create a guild sticker */
  async createSticker(options: CreateStickerOptions, reason?: string): Promise<Sticker> {
    return await this.client.createGuildSticker.call(this.client, this.id, options, reason)
  }

  /** Create a template for this guild */
  async createTemplate(name: string, description?: string): Promise<GuildTemplate> {
    return await this.client.createGuildTemplate.call(this.client, this.id, name, description)
  }

  /** Delete the guild (bot user must be owner) */
  async delete(): Promise<void> {
    if (this.ownerID !== this.client.id) throw new Error('To delete a guild, the bot must be the owner of the guild.')

    return await this.client.deleteGuild.call(this.client, this.id)
  }

  /** Delete a guild application command */
  async deleteCommand(commandID: BigString): Promise<void> {
    return await this.client.deleteGuildCommand.call(this.client, this.id, commandID)
  }

  /** Delete a discovery subcategory */
  async deleteDiscoverySubcategory(categoryID: BigString, reason?: string): Promise<void> {
    return await this.client.deleteGuildDiscoverySubcategory.call(this.client, this.id, categoryID, reason)
  }

  /** Delete a emoji in the guild */
  async deleteEmoji(emojiID: BigString, reason?: string): Promise<void> {
    return await this.client.deleteGuildEmoji.call(this.client, this.id, emojiID, reason)
  }

  /** Delete a guild integration */
  async deleteIntegration(integrationID: BigString): Promise<void> {
    return await this.client.deleteGuildIntegration.call(this.client, this.id, integrationID)
  }

  /** Delete a role */
  async deleteRole(roleID: BigString, reason?: string): Promise<void> {
    return await this.client.deleteRole.call(this.client, this.id, roleID, reason)
  }

  /** Delete a guild sticker */
  async deleteSticker(stickerID: BigString, reason?: string): Promise<void> {
    return await this.client.deleteGuildSticker.call(this.client, this.id, stickerID, reason)
  }

  /** Delete a guild template */
  async deleteTemplate(code: string): Promise<void> {
    return await this.client.deleteGuildTemplate.call(this.client, this.id, code)
  }

  /** Get the guild's banner with the given format and size */
  dynamicBannerURL(format?: ImageFormat, size?: ImageSize): string | null {
    return this.banner ? this.client._formatImage(BANNER(this.id, this.banner), format, size) : null
  }

  /** Get the guild's discovery splash with the given format and size */
  dynamicDiscoverySplashURL(format?: ImageFormat, size?: ImageSize): string | null {
    return this.discoverySplash ? this.client._formatImage(GUILD_DISCOVERY_SPLASH(this.id, this.discoverySplash), format, size) : null
  }

  /** Get the guild's icon with the given format and size */
  dynamicIconURL(format?: ImageFormat, size?: ImageSize): string | null {
    return this.icon ? this.client._formatImage(GUILD_ICON(this.id, this.icon), format, size) : null
  }

  /** Get the guild's splash with the given format and size */
  dynamicSplashURL(format?: ImageFormat, size?: ImageSize): string | null {
    return this.splash ? this.client._formatImage(GUILD_SPLASH(this.id, this.splash), format, size) : null
  }

  /** Edit the guild */
  async edit(options: GuildOptions, reason?: string): Promise<Guild> {
    return await this.client.editGuild.call(this.client, this.id, options, reason)
  }

  /** Edit multiple channels' positions. Note that channel position numbers are grouped by type (category, text, voice), then sorted in ascending order (lowest number is on top). */
  async editChannelPositions(channelPositions: ChannelPosition[]): Promise<void> {
    return await this.client.editChannelPositions.call(this.client, this.id, channelPositions)
  }

  /** Edit a guild application command */
  async editCommand(commandID: BigString, commands: ApplicationCommandStructure): Promise<ApplicationCommand<ApplicationCommandTypes>> {
    return await this.client.editGuildCommand.call(this.client, this.id, commandID, commands)
  }

  /**
   * Edits command permissions for a specific command in a guild.
   * Note: You can only add up to 10 permission overwrites for a command.
   */
  async editCommandPermissions(commandID: BigString, permissions: ApplicationCommandPermissions[]): Promise<GuildApplicationCommandPermissions> {
    return await this.client.editCommandPermissions.call(this.client, this.id, commandID, permissions)
  }

  /** Edit the guild's discovery data */
  async editDiscovery(options: DiscoveryOptions): Promise<DiscoveryMetadata> {
    return await this.client.editGuildDiscovery.call(this.client, this.id, options)
  }

  /**
   * Edit a emoji in the guild
   * @arg {String} emojiID The ID of the emoji you want to modify
   * @arg {Object} options Emoji options
   * @arg {String} [options.name] The name of emoji
   * @arg {Array} [options.roles] An array containing authorized role IDs
   * @arg {String} [reason] The reason to be displayed in audit logs
   * @returns {Promise<Object>} A guild emoji object
   */
  async editEmoji(
    emojiID: BigString,
    options: {
      name?: string | undefined
      roles?: string[] | undefined
    },
    reason?: string,
  ): Promise<Emoji> {
    return await this.client.editGuildEmoji.call(this.client, this.id, emojiID, options, reason)
  }

  /** Edit a guild integration */
  async editIntegration(integrationID: BigString, options: IntegrationOptions): Promise<void> {
    return await this.client.editGuildIntegration.call(this.client, this.id, integrationID, options)
  }

  /** Edit a guild member */
  async editMember(memberID: BigString, options: MemberOptions, reason?: string): Promise<Member> {
    return await this.client.editGuildMember.call(this.client, this.id, memberID, options, reason)
  }

  /** Edit the guild role */
  async editRole(roleID: BigString, options: RoleOptions, reason?: string): Promise<Role> {
    return await this.client.editRole.call(this.client, this.id, roleID, options, reason)
  }

  /** Edit a guild sticker */
  async editSticker(stickerID: BigString, options: EditStickerOptions, reason?: string): Promise<Sticker> {
    return await this.client.editGuildSticker.call(this.client, this.id, stickerID, options, reason)
  }

  /** Edit a guild template */
  async editTemplate(code: string, options: GuildTemplateOptions): Promise<GuildTemplate> {
    return await this.client.editGuildTemplate.call(this.client, this.id, code, options)
  }

  /** Modify the guild's vanity code */
  async editVanity(code: string | null): Promise<unknown> {
    return await this.client.editGuildVanity.call(this.client, this.id, code)
  }

  /** Update a user's voice state - See [caveats](https://discord.com/developers/docs/resources/guild#modify-user-voice-state-caveats) */
  async editVoiceState(options: VoiceStateOptions, userID: BigString = '@me'): Promise<void> {
    return await this.client.editGuildVoiceState.call(this.client, this.id, options, userID)
  }

  /** Edit the guild welcome screen */
  async editWelcomeScreen(options: WelcomeScreenOptions): Promise<WelcomeScreen> {
    return await this.client.editGuildWelcomeScreen.call(this.client, this.id, options)
  }

  /** Modify a guild's widget */
  async editWidget(options: Widget): Promise<Widget> {
    return await this.client.editGuildWidget.call(this.client, this.id, options)
  }

  /** Request all guild members from Discord */
  async fetchAllMembers(timeout?: number): Promise<number> {
    return await this.fetchMembers({
      guildId: this.id,
      limit: 0,
    }).then((m: any[]) => m.length)
  }

  /** Request specific guild members through the gateway connection */
  async fetchMembers(options: RequestGuildMembers): Promise<Member[]> {
    // TODO: Use gateway fetch
    return await this.client.getRESTGuildMembers(this.id, options)
  }

  /** Get all active threads in this guild */
  async getActiveThreads(): Promise<ListedGuildThreads<AnyThreadChannel>> {
    return await this.client.getActiveGuildThreads.call(this.client, this.id)
  }

  /** Get the audit log for the guild */
  async getAuditLog(options: GetGuildAuditLogOptions): Promise<GuildAuditLog> {
    return await this.client.getGuildAuditLog.call(this.client, this.id, options)
  }

  /** Get a ban from the ban list of a guild */
  async getBan(userID: BigString): Promise<GuildBan> {
    return await this.client.getGuildBan.call(this.client, this.id, userID)
  }

  /** Get the ban list of the guild */
  async getBans(options: GetGuildBansOptions): Promise<GuildBan[]> {
    return await this.client.getGuildBans.call(this.client, this.id, options)
  }

  /** Get a guild application command */
  async getCommand(commandID: BigString): Promise<ApplicationCommand<ApplicationCommandTypes>> {
    return await this.client.getGuildCommand.call(this.client, this.id, commandID)
  }

  /** Get the a guild's application command permissions */
  async getCommandPermissions(commandID: BigString): Promise<GuildApplicationCommandPermissions> {
    return await this.client.getCommandPermissions.call(this.client, this.id, commandID)
  }

  /** Get the guild's application commands */
  async getCommands(): Promise<ApplicationCommand<ApplicationCommandTypes>> {
    return await this.client.getGuildCommands.call(this.client, this.id)
  }

  /** Get the guild's discovery object */
  async getDiscovery(): Promise<DiscoveryMetadata> {
    return await this.client.getGuildDiscovery.call(this.client, this.id)
  }

  /** Get the all of a guild's application command permissions */
  async getGuildCommandPermissions(): Promise<GuildApplicationCommandPermissions[]> {
    return await this.client.getGuildCommandPermissions.call(this.client, this.id)
  }

  /** Get a list of integrations for the guild */
  async getIntegrations(): Promise<GuildIntegration[]> {
    return await this.client.getGuildIntegrations.call(this.client, this.id)
  }

  /** Get all invites in the guild */
  async getInvites(): Promise<Invite[]> {
    return await this.client.getGuildInvites.call(this.client, this.id)
  }

  /** Get the prune count for the guild */
  async getPruneCount(options: GetPruneOptions): Promise<number> {
    return await this.client.getPruneCount.call(this.client, this.id, options)
  }

  /** Get a guild's channels via the REST API. REST mode is required to use this endpoint. */
  async getRESTChannels(): Promise<AnyGuildChannel[]> {
    return await this.client.getRESTGuildChannels.call(this.client, this.id)
  }

  /** Get a guild emoji via the REST API. REST mode is required to use this endpoint. */
  async getRESTEmoji(emojiID: BigString): Promise<Emoji> {
    return await this.client.getRESTGuildEmoji.call(this.client, this.id, emojiID)
  }

  /** Get a guild's emojis via the REST API. REST mode is required to use this endpoint. */
  async getRESTEmojis(): Promise<Emoji[]> {
    return await this.client.getRESTGuildEmojis.call(this.client, this.id)
  }

  /** Get a guild's members via the REST API. REST mode is required to use this endpoint. */
  async getRESTMember(memberID: BigString): Promise<Member> {
    return await this.client.getRESTGuildMember.call(this.client, this.id, memberID)
  }

  /** Get a guild's members via the REST API. REST mode is required to use this endpoint. */
  async getRESTMembers(options?: GetRESTGuildMembersOptions): Promise<Member[]> {
    return await this.client.getRESTGuildMembers.call(this.client, this.id, options)
  }

  /** Get a guild's roles via the REST API. REST mode is required to use this endpoint. */
  async getRESTRoles(): Promise<Role[]> {
    return await this.client.getRESTGuildRoles.call(this.client, this.id)
  }

  /** Get a guild sticker via the REST API. REST mode is required to use this endpoint. */
  async getRESTSticker(stickerID: BigString): Promise<Sticker> {
    return await this.client.getRESTGuildSticker.call(this.client, this.id, stickerID)
  }

  /** Get a guild's stickers via the REST API. REST mode is required to use this endpoint. */
  async getRESTStickers(): Promise<Sticker[]> {
    return await this.client.getRESTGuildStickers.call(this.client, this.id)
  }

  /** Get the guild's templates */
  async getTemplates(): Promise<GuildTemplate[]> {
    return await this.client.getGuildTemplates.call(this.client, this.id)
  }

  /** Returns the vanity url of the guild */
  async getVanity(): Promise<GuildVanity> {
    return await this.client.getGuildVanity.call(this.client, this.id)
  }

  /** Get possible voice regions for a guild */
  async getVoiceRegions(): Promise<VoiceRegion[]> {
    return await this.client.getVoiceRegions.call(this.client, this.id)
  }

  /** Get all the webhooks in the guild */
  async getWebhooks(): Promise<Webhook[]> {
    return await this.client.getGuildWebhooks.call(this.client, this.id)
  }

  /** Get the welcome screen of the Community guild, shown to new members */
  async getWelcomeScreen(): Promise<WelcomeScreen> {
    return await this.client.getGuildWelcomeScreen.call(this.client, this.id)
  }

  /** Get a guild's widget object */
  async getWidget(): Promise<WidgetData> {
    return await this.client.getGuildWidget.call(this.client, this.id)
  }

  /** Get a guild's widget settings object */
  async getWidgetSettings(): Promise<Widget> {
    return await this.client.getGuildWidgetSettings.call(this.client, this.id)
  }

  /** Kick a member from the guild */
  async kickMember(userID: BigString, reason?: string): Promise<void> {
    return await this.client.kickGuildMember.call(this.client, this.id, userID, reason)
  }

  /** Leave the guild */
  async leave(): Promise<void> {
    return await this.client.leaveGuild.call(this.client, this.id)
  }

  // TODO: gateway voice
  // /** Leaves the voice channel in this guild */
  // async leaveVoiceChannel(): Promise<void> {
  //   return await this.client.closeVoiceConnection.call(this.client, this.id);
  // }

  /** Get the guild permissions of a member */
  permissionsOf(memberID: BigString | Member): Permission {
    const member = ['string', 'bigint'].includes(typeof memberID) ? this.members.get(memberID as BigString)! : (memberID as Member)
    if (member.id === this.ownerID) {
      return new Permission(BitwisePermissionFlags.ADMINISTRATOR)
    } else {
      let permissions = this.roles.get(this.id)!.permissions.allow
      if (permissions & BigInt(BitwisePermissionFlags.ADMINISTRATOR)) {
        return new Permission(BitwisePermissionFlags.ADMINISTRATOR)
      }
      for (const id of member.roles) {
        const role = this.roles.get(id)
        if (!role) {
          continue
        }

        const { allow: perm } = role.permissions
        if (perm & BigInt(BitwisePermissionFlags.ADMINISTRATOR)) {
          permissions = BigInt(BitwisePermissionFlags.ADMINISTRATOR)
          break
        } else {
          permissions |= perm
        }
      }
      return new Permission(permissions)
    }
  }

  /** Begin pruning the guild */
  async pruneMembers(options?: PruneMemberOptions): Promise<number> {
    return await this.client.pruneMembers.call(this.client, this.id, options)
  }

  /** Remove a role from a guild member */
  async removeMemberRole(memberID: BigString, roleID: BigString, reason?: string): Promise<void> {
    return await this.client.removeGuildMemberRole.call(this.client, this.id, memberID, roleID, reason)
  }

  /** Search for guild members by partial nickname/username */
  async searchMembers(query: string, limit = 1): Promise<Member[]> {
    return await this.client.searchGuildMembers.call(this.client, this.id, query, limit)
  }

  /** Force a guild integration to sync */
  async syncIntegration(integrationID: BigString): Promise<void> {
    return await this.client.syncGuildIntegration.call(this.client, this.id, integrationID)
  }

  /** Force a guild template to sync */
  async syncTemplate(code: string): Promise<GuildTemplate> {
    return await this.client.syncGuildTemplate.call(this.client, this.id, code)
  }

  /** Unban a user from the guild */
  async unbanMember(userID: BigString, reason?: string): Promise<void> {
    return await this.client.unbanGuildMember.call(this.client, this.id, userID, reason)
  }

  toJSON(props: string[] = []): Record<string, any> {
    return super.toJSON([
      'afkChannelID',
      'afkTimeout',
      'applicationID',
      'approximateMemberCount',
      'approximatePresenceCount',
      'autoRemoved',
      'banner',
      'categories',
      'channels',
      'defaultNotifications',
      'description',
      'discoverySplash',
      'emojiCount',
      'emojis',
      'explicitContentFilter',
      'features',
      'icon',
      'joinedAt',
      'keywords',
      'large',
      'maxMembers',
      'maxPresences',
      'maxVideoChannelUsers',
      'memberCount',
      'members',
      'mfaLevel',
      'name',
      'ownerID',
      'pendingVoiceStates',
      'preferredLocale',
      'premiumProgressBarEnabled',
      'premiumSubscriptionCount',
      'premiumTier',
      'primaryCategory',
      'primaryCategoryID',
      'publicUpdatesChannelID',
      'roles',
      'rulesChannelID',
      'splash',
      'stickers',
      'systemChannelFlags',
      'systemChannelID',
      'unavailable',
      'vanityURL',
      'verificationLevel',
      'voiceStates',
      'welcomeScreen',
      'widgetChannelID',
      'widgetEnabled',
      ...props,
    ])
  }
}

export default Guild
