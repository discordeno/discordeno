import { Buffer } from 'node:buffer';
import type {
  AddDmRecipientOptions,
  AddGuildMemberOptions,
  AddLobbyMember,
  AtLeastOne,
  BeginGuildPrune,
  BigString,
  BulkUpdateLobbyMember,
  Camelize,
  ChannelTypes,
  CreateApplicationCommand,
  CreateApplicationEmoji,
  CreateAutoModerationRuleOptions,
  CreateChannelInvite,
  CreateForumPostWithMessage,
  CreateGlobalApplicationCommandOptions,
  CreateGroupDmOptions,
  CreateGuildApplicationCommandOptions,
  CreateGuildBan,
  CreateGuildBulkBan,
  CreateGuildChannel,
  CreateGuildEmoji,
  CreateGuildRole,
  CreateGuildSoundboardSound,
  CreateGuildStickerOptions,
  CreateLobby,
  CreateMessageOptions,
  CreateOrJoinLobby,
  CreateScheduledEvent,
  CreateStageInstance,
  CreateTemplate,
  CreateTestEntitlement,
  CreateWebhook,
  DeleteWebhookMessageOptions,
  DiscordAccessTokenResponse,
  DiscordActivityInstance,
  DiscordApplication,
  DiscordApplicationCommand,
  DiscordApplicationCommandPermissions,
  DiscordApplicationIntegrationType,
  DiscordApplicationRoleConnection,
  DiscordApplicationRoleConnectionMetadata,
  DiscordAuditLog,
  DiscordAutoModerationRule,
  DiscordBan,
  DiscordBulkBan,
  DiscordChannel,
  DiscordConnection,
  DiscordCurrentAuthorization,
  DiscordEmoji,
  DiscordEntitlement,
  DiscordFollowedChannel,
  DiscordGetAnswerVotesResponse,
  DiscordGetChannelPins,
  DiscordGetGatewayBot,
  DiscordGuild,
  DiscordGuildApplicationCommandPermissions,
  DiscordGuildOnboarding,
  DiscordGuildPreview,
  DiscordGuildWidget,
  DiscordGuildWidgetSettings,
  DiscordIncidentsData,
  DiscordIntegration,
  DiscordInteraction,
  DiscordInteractionCallbackResponse,
  DiscordInvite,
  DiscordInviteMetadata,
  DiscordListActiveThreads,
  DiscordListArchivedThreads,
  DiscordLobby,
  DiscordLobbyInvite,
  DiscordLobbyMember,
  DiscordLobbyMessage,
  DiscordMember,
  DiscordMemberWithUser,
  DiscordMessage,
  DiscordPrunedCount,
  DiscordRole,
  DiscordScheduledEvent,
  DiscordSearchGuildMessages,
  DiscordSearchGuildMessagesIndexing,
  DiscordSku,
  DiscordSoundboardSound,
  DiscordStageInstance,
  DiscordSticker,
  DiscordStickerPack,
  DiscordSubscription,
  DiscordTargetUsersJobStatus,
  DiscordTemplate,
  DiscordThreadMember,
  DiscordTokenExchange,
  DiscordTokenRevocation,
  DiscordUser,
  DiscordVanityUrl,
  DiscordVoiceRegion,
  DiscordVoiceState,
  DiscordWebhook,
  DiscordWelcomeScreen,
  EditApplication,
  EditAutoModerationRuleOptions,
  EditChannelPermissionOverridesOptions,
  EditGuildOnboarding,
  EditGuildRole,
  EditGuildStickerOptions,
  EditMessage,
  EditOwnVoiceState,
  EditScheduledEvent,
  EditUserVoiceState,
  EditWebhookMessageOptions,
  ExecuteWebhook,
  GetApplicationCommandPermissionOptions,
  GetBans,
  GetChannelPinsOptions,
  GetEntitlements,
  GetGlobalApplicationCommandsOptions,
  GetGuildApplicationCommandsOptions,
  GetGuildAuditLog,
  GetGuildPruneCountQuery,
  GetInvite,
  GetLobbyMessages,
  GetMessagesOptions,
  GetPollAnswerVotes,
  GetReactions,
  GetScheduledEvents,
  GetScheduledEventUsers,
  GetThreadMember,
  GetUserGuilds,
  GetWebhookMessageOptions,
  GuildFeatures,
  InteractionCallbackData,
  InteractionCallbackOptions,
  InteractionResponse,
  LinkChannelToLobby,
  ListArchivedThreads,
  ListGuildMembers,
  ListSkuSubscriptionsOptions,
  ListThreadMembers,
  ModifyApplicationEmoji,
  ModifyChannel,
  ModifyCurrentMember,
  ModifyGuild,
  ModifyGuildChannelPositions,
  ModifyGuildEmoji,
  ModifyGuildIncidentActions,
  ModifyGuildMember,
  ModifyGuildSoundboardSound,
  ModifyGuildTemplate,
  ModifyGuildWelcomeScreen,
  ModifyLobby,
  ModifyRolePositions,
  ModifyWebhook,
  ScheduledEventEntityType,
  ScheduledEventStatus,
  SearchGuildMessagesOptions,
  SearchMembers,
  SendLobbyMessage,
  SendSoundboardSound,
  StartThreadWithMessage,
  StartThreadWithoutMessage,
  UpsertGlobalApplicationCommandOptions,
  UpsertGuildApplicationCommandOptions,
} from '@discordeno/types';
import { processReactionString, urlToBase64 } from '@discordeno/utils';
import type { MakeRequestOptions, RestManager } from './types.js';

/**
 * @internal You are not supposed to use the functions in this object directly. Use the RestManager instead.
 */
export const restEndpoints = {
  /**
   * Adds a reaction to a message.
   *
   * @param channelId - The ID of the channel the message to add a reaction to is in.
   * @param messageId - The ID of the message to add a reaction to.
   * @param reaction - The reaction to add to the message.
   * @returns
   *
   * @remarks
   * Requires the `READ_MESSAGE_HISTORY` permission.
   *
   * If nobody else has reacted to the message:
   * - Requires the `ADD_REACTIONS` permission.
   *
   * Fires a _Message Reaction Add_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/channel#create-reaction}
   */
  async addReaction(rest: RestManager, channelId: BigString, messageId: BigString, reaction: string): Promise<void> {
    reaction = processReactionString(reaction);

    await rest.put(rest.routes.channels.reactions.bot(channelId, messageId, reaction));
  },
  /**
   * Adds multiple a reaction to a message.
   *
   * This function uses the `addReaction()` helper behind the scenes.
   *
   * @param channelId - The ID of the channel the message to add reactions to is in.
   * @param messageId - The ID of the message to add the reactions to.
   * @param reactions - The reactions to add to the message.
   * @param ordered - Whether the reactions must be added in order or not.
   *
   * @remarks
   * Requires the `READ_MESSAGE_HISTORY` permission.
   *
   * If nobody else has reacted to the message:
   * - Requires the `ADD_REACTIONS` permission.
   *
   * Fires a _Message Reaction Add_ gateway event for every reaction added.
   */
  async addReactions(rest: RestManager, channelId: BigString, messageId: BigString, reactions: string[], ordered?: boolean): Promise<void> {
    if (!ordered) {
      await Promise.all(
        reactions.map(async (reaction) => {
          await restEndpoints.addReaction(rest, channelId, messageId, reaction);
        }),
      );
      return;
    }

    for (const reaction of reactions) {
      await restEndpoints.addReaction(rest, channelId, messageId, reaction);
    }
  },
  /**
   * Adds a role to a member.
   *
   * @param guildId - The ID of the guild the member to add the role to is in.
   * @param userId - The user ID of the member to add the role to.
   * @param roleId - The ID of the role to add to the member.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   *
   * @remarks
   * Requires the `MANAGE_ROLES` permission.
   *
   * Fires a _Guild Member Update_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild#add-guild-member-role}
   */
  async addRole(rest: RestManager, guildId: BigString, userId: BigString, roleId: BigString, reason?: string): Promise<void> {
    await rest.put(rest.routes.guilds.roles.member(guildId, userId, roleId), { reason });
  },
  /**
   * Adds a member to a thread.
   *
   * @param channelId - The ID of the thread to add the member to.
   * @param userId - The user ID of the member to add to the thread.
   *
   * @remarks
   * Requires the ability to send messages in the thread.
   * Requires the thread not be archived.
   *
   * Fires a _Thread Members Update_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/channel#add-thread-member}
   */
  async addThreadMember(rest: RestManager, channelId: BigString, userId: BigString): Promise<void> {
    await rest.put(rest.routes.channels.threads.user(channelId, userId));
  },
  /**
   * Adds a recipient to a group DM.
   *
   * @param channelId - The ID of the group dm to add the user to.
   * @param userId - The user ID of the user to add to the group dm.
   * @param options - The options for adding the user
   *
   * @remarks
   * Requires an OAuth2 access token with the `gdm.join` scope
   *
   * @see {@link https://docs.discord.com/developers/resources/channel#group-dm-add-recipient}
   */
  async addDmRecipient(rest: RestManager, channelId: BigString, userId: BigString, options: AddDmRecipientOptions): Promise<void> {
    await rest.put(rest.routes.channels.dmRecipient(channelId, userId), { body: options });
  },
  /**
   * Adds a member to a guild.
   *
   * @param guildId - The ID of the thread to add the member to.
   * @param userId - The user ID of the member to add to the thread.
   * @param options - The options for the add of a guild member
   *
   * @remarks
   * Requires the bot to be in the specified server
   * Requires an OAuth2 access token with the `guilds.join` scope
   *
   * Fires a _Guild Member Add_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild#add-guild-member}
   */
  async addGuildMember(rest: RestManager, guildId: BigString, userId: BigString, options: AddGuildMemberOptions): Promise<void> {
    return await rest.put(rest.routes.guilds.members.member(guildId, userId), {
      body: options,
    });
  },
  /**
   * Creates an automod rule in a guild.
   *
   * @param guildId - The ID of the guild to create the rule in.
   * @param options - The parameters for the creation of the rule.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns An instance of the created {@link DiscordAutoModerationRule}.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * Fires an _Auto Moderation Rule Create_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/auto-moderation#create-auto-moderation-rule}
   */
  async createAutomodRule(
    rest: RestManager,
    guildId: BigString,
    options: CreateAutoModerationRuleOptions,
    reason?: string,
  ): Promise<Camelize<DiscordAutoModerationRule>> {
    return await rest.post<DiscordAutoModerationRule>(rest.routes.guilds.automod.rules(guildId), { body: options, reason });
  },
  /**
   * Creates a channel within a guild.
   *
   * @param guildId - The ID of the guild to create the channel within.
   * @param options - The parameters for the creation of the channel.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns An instance of the created {@link DiscordChannel}.
   *
   * @remarks
   * Requires the `MANAGE_CHANNELS` permission.
   *
   * If setting permission overwrites, only the permissions the bot user has in the guild can be allowed or denied.
   *
   * Setting the `MANAGE_ROLES` permission is only possible for guild administrators.
   *
   * Fires a _Channel Create_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild#create-guild-channel}
   */
  async createChannel(rest: RestManager, guildId: BigString, options: CreateGuildChannel, reason?: string): Promise<Camelize<DiscordChannel>> {
    return await rest.post<DiscordChannel>(rest.routes.guilds.channels(guildId), { body: options, reason });
  },
  /**
   * Creates an emoji in a guild.
   *
   * @param guildId - The ID of the guild in which to create the emoji.
   * @param options - The parameters for the creation of the emoji.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns An instance of the created {@link DiscordEmoji}.
   *
   * @remarks
   * Requires the `CREATE_GUILD_EXPRESSIONS` permission.
   *
   * Emojis have a maximum file size of 256 kilobits. Attempting to upload a larger emoji will cause the route to return 400 Bad Request.
   *
   * Fires a _Guild Emojis Update_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/emoji#create-guild-emoji}
   */
  async createEmoji(rest: RestManager, guildId: BigString, options: CreateGuildEmoji, reason?: string): Promise<Camelize<DiscordEmoji>> {
    return await rest.post<DiscordEmoji>(rest.routes.guilds.emojis(guildId), { body: options, reason });
  },
  /**
   * Creates an emoji for the application.
   *
   * @param options - The parameters for the creation of the emoji.
   * @returns An instance of the created {@link DiscordEmoji}.
   *
   * @see {@link https://docs.discord.com/developers/resources/emoji#create-application-emoji}
   */
  async createApplicationEmoji(rest: RestManager, options: CreateApplicationEmoji): Promise<Camelize<DiscordEmoji>> {
    return await rest.post<DiscordEmoji>(rest.routes.applicationEmojis(rest.applicationId), { body: options });
  },
  /**
   * Creates a new thread in a forum channel or media channel, and sends a message within the created thread.
   *
   * @param channelId - The ID of the forum channel to create the thread within.
   * @param options - The parameters for the creation of the thread.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns An instance of {@link DiscordChannel} with a nested {@link DiscordChannel} object.
   *
   * @remarks
   * Requires the `CREATE_MESSAGES` permission.
   *
   * Fires a _Thread Create_ gateway event.
   * Fires a _Message Create_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/channel#start-thread-in-forum-or-media-channel}
   */
  async createForumThread(
    rest: RestManager,
    channelId: BigString,
    options: CreateForumPostWithMessage,
    reason?: string,
  ): Promise<Camelize<DiscordChannel>> {
    return await rest.post<DiscordChannel>(rest.routes.channels.forum(channelId), { body: options, files: options.files, reason });
  },
  /**
   * Creates an application command accessible globally; across different guilds and channels.
   *
   * @param command - The command to create.
   * @param options - Additional options for the endpoint
   * @returns An instance of the created {@link DiscordApplicationCommand}.
   *
   * @remarks
   * ⚠️ Creating a command with the same name as an existing command for your application will overwrite the old command.
   * ⚠️ Global commands once created are cached for periods of __an hour__, so changes made to existing commands will take an hour to surface.
   * ⚠️ You can only create up to 200 _new_ commands daily.
   *
   * When using the bearer token the token needs the `applications.commands.update` scope and must be a `Client grant` token.
   *  You will be able to update only your own application commands
   *
   * @see {@link https://docs.discord.com/developers/interactions/application-commands#create-global-application-command}
   */
  async createGlobalApplicationCommand(
    rest: RestManager,
    command: CreateApplicationCommand,
    options?: CreateGlobalApplicationCommandOptions,
  ): Promise<Camelize<DiscordApplicationCommand>> {
    const restOptions: MakeRequestOptions = { body: command };

    if (options?.bearerToken) {
      restOptions.unauthorized = true;
      restOptions.headers = {
        authorization: `Bearer ${options.bearerToken}`,
      };
    }

    return await rest.post<DiscordApplicationCommand>(rest.routes.interactions.commands.commands(rest.applicationId), restOptions);
  },
  /**
   * Creates an application command only accessible in a specific guild.
   *
   * @param command - The command to create.
   * @param guildId - The ID of the guild to create the command for.
   * @param options - Additional options for the endpoint
   * @returns An instance of the created {@link DiscordApplicationCommand}.
   *
   * @remarks
   * ⚠️ Creating a command with the same name as an existing command for your application will overwrite the old command.
   * ⚠️ You can only create up to 200 _new_ commands daily.
   *
   * When using the bearer token the token needs the `applications.commands.update` scope and must be a `Client grant` token.
   *  You will be able to update only your own application commands
   *
   * @see {@link https://docs.discord.com/developers/interactions/application-commands#create-guild-application-command}
   */
  async createGuildApplicationCommand(
    rest: RestManager,
    command: CreateApplicationCommand,
    guildId: BigString,
    options?: CreateGuildApplicationCommandOptions,
  ): Promise<Camelize<DiscordApplicationCommand>> {
    const restOptions: MakeRequestOptions = { body: command };

    if (options?.bearerToken) {
      restOptions.unauthorized = true;
      restOptions.headers = {
        authorization: `Bearer ${options.bearerToken}`,
      };
    }

    return await rest.post<DiscordApplicationCommand>(rest.routes.interactions.commands.guilds.all(rest.applicationId, guildId), restOptions);
  },
  /**
   * Create a new sticker for the guild.
   *
   * @param guildId The ID of the guild to get
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @return A {@link DiscordSticker}
   *
   * @remarks
   * Requires the `CREATE_GUILD_EXPRESSIONS` permission.
   * Fires a Guild Stickers Update Gateway event.
   * Every guilds has five free sticker slots by default, and each Boost level will grant access to more slots.
   * Lottie stickers can only be uploaded on guilds that have either the `VERIFIED` and/or the `PARTNERED` guild feature.
   *
   * @see {@link https://docs.discord.com/developers/resources/sticker#create-guild-sticker}
   */
  async createGuildSticker(
    rest: RestManager,
    guildId: BigString,
    options: CreateGuildStickerOptions,
    reason?: string,
  ): Promise<Camelize<DiscordSticker>> {
    const form = new FormData();
    form.append('file', options.file.blob, options.file.name);
    form.append('name', options.name);
    form.append('description', options.description);
    form.append('tags', options.tags);

    return await rest.post<DiscordSticker>(rest.routes.guilds.stickers(guildId), { body: form, reason });
  },
  /**
   * Creates a template from a guild.
   *
   * @param guildId - The ID of the guild to create the template from.
   * @param options - The parameters for the creation of the template.
   * @returns An instance of the created {@link DiscordTemplate}.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * Fires a _Guild Update_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild-template#create-guild-template}
   */
  async createGuildTemplate(rest: RestManager, guildId: BigString, options: CreateTemplate): Promise<Camelize<DiscordTemplate>> {
    return await rest.post<DiscordTemplate>(rest.routes.guilds.templates.all(guildId), { body: options });
  },
  /**
   * Creates an invite to a channel in a guild.
   *
   * @param channelId - The ID of the channel to create the invite to.
   * @param options - The parameters for the creation of the invite.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns An instance of the created {@link DiscordInvite}.
   *
   * @remarks
   * Requires the `CREATE_INSTANT_INVITE` permission.
   *
   * Fires an _Invite Create_ gateway event.
   *
   * @privateRemarks
   * The request body is not optional, and an empty JSON object must be sent regardless of whether any fields are being transmitted.
   *
   * @see {@link https://docs.discord.com/developers/resources/channel#create-channel-invite}
   */
  async createInvite(rest: RestManager, channelId: BigString, options?: CreateChannelInvite, reason?: string): Promise<Camelize<DiscordInvite>> {
    options ??= {};

    if (!options.targetUsersFile) {
      return await rest.post<DiscordInvite>(rest.routes.channels.invites(channelId), { body: options, reason });
    }

    // When we have to upload a file, we need to use FormData, and all other fields need to be part of the payload_json field.
    const form = new FormData();

    form.append('payload_json', JSON.stringify(rest.changeToDiscordFormat({ ...options, targetUsersFile: undefined })));
    form.append('target_users_file', options.targetUsersFile);

    return await rest.post<DiscordInvite>(rest.routes.channels.invites(channelId), { body: form, reason });
  },
  /**
   * Get guild role member counts
   *
   * Returns a map of role IDs to the number of members with the role. Does not include the \@everyone role.
   *
   * @param guildId - The ID of the guild to get role member counts for.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild#get-guild-role-member-counts}
   */
  async getGuildRoleMemberCounts(rest: RestManager, guildId: BigString): Promise<Record<string, number>> {
    return await rest.get<Record<string, number>>(rest.routes.guilds.roles.memberCounts(guildId));
  },
  /**
   * Creates a role in a guild.
   *
   * @param guildId - The ID of the guild to create the role in.
   * @param options - The parameters for the creation of the role.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns An instance of the created {@link DiscordRole}.
   *
   * @remarks
   * Requires the `MANAGE_ROLES` permission.
   *
   * Fires a _Guild Role Create_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild#create-guild-role}
   */
  async createRole(rest: RestManager, guildId: BigString, options: CreateGuildRole, reason?: string): Promise<Camelize<DiscordRole>> {
    return await rest.post<DiscordRole>(rest.routes.guilds.roles.all(guildId), { body: options, reason });
  },
  /**
   * Creates a scheduled event in a guild.
   *
   * @param guildId - The ID of the guild to create the scheduled event in.
   * @param options - The parameters for the creation of the scheduled event.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns An instance of the created {@link DiscordScheduledEvent}.
   *
   * @remarks
   * Requires the `MANAGE_EVENTS` permission.
   *
   * A guild can only have a maximum of 100 events with a status of {@link ScheduledEventStatus}.Active or {@link ScheduledEventStatus}.Scheduled (inclusive).
   *
   * Fires a _Guild Scheduled Event Create_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild-scheduled-event#create-guild-scheduled-event}
   */
  async createScheduledEvent(
    rest: RestManager,
    guildId: BigString,
    options: CreateScheduledEvent,
    reason?: string,
  ): Promise<Camelize<DiscordScheduledEvent>> {
    return await rest.post<DiscordScheduledEvent>(rest.routes.guilds.events.events(guildId), { body: options, reason });
  },
  /**
   * Creates a stage instance associated with a stage channel.
   *
   * @param options - The parameters for the creation of the stage instance.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns An instance of the created {@link DiscordStageInstance}.
   *
   * @remarks
   * Requires the user to be a moderator of the stage channel.
   *
   * Fires a _Stage Instance Create_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/stage-instance#create-stage-instance}
   */
  async createStageInstance(rest: RestManager, options: CreateStageInstance, reason?: string): Promise<Camelize<DiscordStageInstance>> {
    return await rest.post<DiscordStageInstance>(rest.routes.channels.stages(), { body: options, reason });
  },
  /**
   * Creates a webhook.
   *
   * @param channelId - The ID of the channel to create the webhook in.
   * @param options - The parameters for the creation of the webhook.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns An instance of the created {@link DiscordWebhook}.
   *
   * @remarks
   * Requires the `MANAGE_WEBHOOKS` permission.
   *
   * ⚠️ The webhook name must not contain the substrings 'clyde', or 'discord' (case-insensitive).
   *
   * Fires a _Webhooks Update_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/webhook#create-webhook}
   */
  async createWebhook(rest: RestManager, channelId: BigString, options: CreateWebhook, reason?: string): Promise<Camelize<DiscordWebhook>> {
    return await rest.post<DiscordWebhook>(rest.routes.channels.webhooks(channelId), {
      body: options,
      reason,
    });
  },
  /**
   * Deletes an automod rule.
   *
   * @param guildId - The ID of the guild to delete the rule from.
   * @param ruleId - The ID of the automod rule to delete.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * Fires an _Auto Moderation Rule Delete_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/auto-moderation#delete-auto-moderation-rule}
   */
  async deleteAutomodRule(rest: RestManager, guildId: BigString, ruleId: BigString, reason?: string): Promise<void> {
    await rest.delete(rest.routes.guilds.automod.rule(guildId, ruleId), { reason });
  },
  /**
   * Deletes a channel from within a guild.
   *
   * @param channelId - The ID of the channel to delete.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns nothing
   *
   * @remarks
   * For community guilds, the _Rules_, _Guidelines_ and _Community Update_ channels cannot be deleted.
   *
   * If the channel is a thread:
   * - Requires the `MANAGE_THREADS` permission.
   *
   * - Fires a _Thread Delete_ gateway event.
   *
   * Otherwise:
   * - Requires the `MANAGE_CHANNELS` permission.
   *
   * - ⚠️ Deleting a category channel does not delete its child channels.
   *   Instead, they will have their `parent_id` property removed, and a `Channel Update` gateway event will fire for each of them.
   *
   * - Fires a _Channel Delete_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/channel#deleteclose-channel}
   */
  async deleteChannel(rest: RestManager, channelId: BigString, reason?: string): Promise<void> {
    await rest.delete(rest.routes.channels.channel(channelId), {
      reason,
    });
  },
  /**
   * Deletes a permission override for a user or role in a channel.
   *
   * @param channelId - The ID of the channel to delete the permission override of.
   * @param overwriteId - The ID of the permission override to delete.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   *
   * @remarks
   * Requires the `MANAGE_ROLES` permission.
   *
   * Fires a _Channel Update_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/channel#delete-channel-permission}
   */
  async deleteChannelPermissionOverride(rest: RestManager, channelId: BigString, overwriteId: BigString, reason?: string): Promise<void> {
    await rest.delete(rest.routes.channels.overwrite(channelId, overwriteId), { reason });
  },
  /**
   * Deletes an emoji from a guild.
   *
   * @param guildId - The ID of the guild from which to delete the emoji.
   * @param id - The ID of the emoji to delete.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   *
   * @remarks
   * For emojis created by the current user, requires either the `CREATE_GUILD_EXPRESSIONS` or `MANAGE_GUILD_EXPRESSIONS` permission.
   * For other emojis, requires the `MANAGE_GUILD_EXPRESSIONS` permission.
   *
   * Fires a _Guild Emojis Update_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/emoji#delete-guild-emoji}
   */
  async deleteEmoji(rest: RestManager, guildId: BigString, id: BigString, reason?: string): Promise<void> {
    await rest.delete(rest.routes.guilds.emoji(guildId, id), { reason });
  },
  /**
   * Deletes an emoji from the application.
   *
   * @param id - The ID of the emoji to delete.
   *
   * @see {@link https://docs.discord.com/developers/resources/emoji#delete-application-emoji}
   */
  async deleteApplicationEmoji(rest: RestManager, id: BigString): Promise<void> {
    await rest.delete(rest.routes.applicationEmoji(rest.applicationId, id));
  },
  /**
   * Deletes a follow-up message to an interaction.
   *
   * @param token - The interaction token to use, provided in the original interaction.
   * @param messageId - The ID of the message to delete.
   *
   * @remarks
   * Unlike `deleteMessage()`, this endpoint allows the bot user to act without needing to see the channel the message is in.
   *
   * Fires a _Message Delete_ event.
   *
   * @see {@link https://docs.discord.com/developers/interactions/receiving-and-responding#delete-followup-message}
   */
  async deleteFollowupMessage(rest: RestManager, token: string, messageId: BigString): Promise<void> {
    await rest.delete(rest.routes.interactions.responses.message(rest.applicationId, token, messageId), { unauthorized: true });
  },
  /**
   * Deletes an application command registered globally.
   *
   * @param commandId - The ID of the command to delete.
   *
   * @see {@link https://docs.discord.com/developers/interactions/application-commands#delete-global-application-command}
   */
  async deleteGlobalApplicationCommand(rest: RestManager, commandId: BigString): Promise<void> {
    await rest.delete(rest.routes.interactions.commands.command(rest.applicationId, commandId));
  },
  /**
   * Deletes an application command registered in a guild.
   *
   * @param guildId - The ID of the guild to delete the command from.
   * @param commandId - The ID of the command to delete from the guild.
   *
   * @see {@link https://docs.discord.com/developers/interactions/application-commands#delete-guild-application-command}
   */
  async deleteGuildApplicationCommand(rest: RestManager, commandId: BigString, guildId: BigString): Promise<void> {
    await rest.delete(rest.routes.interactions.commands.guilds.one(rest.applicationId, guildId, commandId));
  },
  /**
   * Delete a new sticker for the guild.
   *
   * @param guildId The ID of the guild to get
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @return A {@link DiscordSticker}
   *
   * @remarks
   * For stickers created by the current user, requires either the `CREATE_GUILD_EXPRESSIONS` or `MANAGE_GUILD_EXPRESSIONS` permission.
   * For other stickers, requires the `MANAGE_GUILD_EXPRESSIONS` permission.
   * Fires a Guild Stickers Update Gateway event.
   * Every guilds has five free sticker slots by default, and each Boost level will grant access to more slots.
   * Lottie stickers can only be uploaded on guilds that have either the `VERIFIED` and/or the `PARTNERED` guild feature.
   *
   * @see {@link https://docs.discord.com/developers/resources/sticker#delete-guild-sticker}
   */
  async deleteGuildSticker(rest: RestManager, guildId: BigString, stickerId: BigString, reason?: string): Promise<void> {
    await rest.delete(rest.routes.guilds.sticker(guildId, stickerId), { reason });
  },
  /**
   * Deletes a template from a guild.
   *
   * @param guildId - The ID of the guild to delete the template from.
   * @param templateCode - The code of the template to delete.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * Fires a _Guild Update_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild-template#delete-guild-template}
   */
  async deleteGuildTemplate(rest: RestManager, guildId: BigString, templateCode: string): Promise<void> {
    await rest.delete(rest.routes.guilds.templates.guild(guildId, templateCode));
  },
  /**
   * Deletes an integration attached to a guild.
   *
   * @param guildId - The ID of the guild from which to delete the integration.
   * @param integrationId - The ID of the integration to delete from the guild.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * Deletes all webhooks associated with the integration, and kicks the associated bot if there is one.
   *
   * Fires a _Guild Integrations Update_ gateway event.
   * Fires a _Integration Delete_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild#delete-guild-integration}
   */
  async deleteIntegration(rest: RestManager, guildId: BigString, integrationId: BigString, reason?: string): Promise<void> {
    await rest.delete(rest.routes.guilds.integration(guildId, integrationId), { reason });
  },
  /**
   * Deletes an invite to a channel.
   *
   * @param inviteCode - The invite code of the invite to delete.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   *
   * @remarks
   * Requires the `MANAGE_CHANNELS` permission.
   *
   * Fires an _Invite Delete_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/channel#delete-channel-invite}
   */
  async deleteInvite(rest: RestManager, inviteCode: string, reason?: string): Promise<void> {
    await rest.delete(rest.routes.guilds.invite(inviteCode), { reason });
  },
  /**
   * Gets the users allowed to see and accept this invite.
   *
   * @param inviteCode - The invite code of the invite to update.
   * @returns CSV file containing the user IDs with the header `user_id` and each user ID from the original file
   *
   * @remarks
   * Requires called to be the inviter, or have `MANAGE_GUILD` permission, or have `VIEW_AUDIT_LOG` permission.
   *
   * @see {@link https://docs.discord.com/developers/resources/invite#get-target-users}
   */
  async getTargetUsers(rest: RestManager, inviteCode: string): Promise<string> {
    return await rest.get<string>(rest.routes.guilds.inviteTargetUsers(inviteCode));
  },
  /**
   * Updates the users allowed to see and accept this invite.
   *
   * @param inviteCode - The invite code of the invite to update.
   * @param targetUsersFile - A CSV file with a single column of user IDs for all the users able to accept this invite
   *
   * @remarks
   * Requires the caller to be the inviter or have the `MANAGE_GUILD` permission.
   *
   * Uploading a file with invalid user IDs will result in a 400 with the invalid IDs described.
   *
   * @see {@link https://docs.discord.com/developers/resources/invite#update-target-users}
   */
  async updateTargetUsers(rest: RestManager, inviteCode: string, targetUsersFile: Blob): Promise<void> {
    const form = new FormData();
    form.append('target_users_file', targetUsersFile);

    await rest.put(rest.routes.guilds.inviteTargetUsers(inviteCode), { body: form });
  },
  /**
   * Processing target users from a CSV when creating or updating an invite is done asynchronously. This endpoint allows you to check the status of that job.
   *
   * @param inviteCode - The invite code of the invite to check the target users job status for.
   * @returns An object containing the status of the target users job.
   *
   * @remarks
   * Requires the caller to be the inviter, or have `MANAGE_GUILD` permission, or have `VIEW_AUDIT_LOG` permission.
   *
   * @see {@link https://docs.discord.com/developers/resources/invite#get-target-users-job-status}
   */
  async getTargetUsersJobStatus(rest: RestManager, inviteCode: string): Promise<Camelize<DiscordTargetUsersJobStatus>> {
    return await rest.get<DiscordTargetUsersJobStatus>(rest.routes.guilds.inviteTargetUsersJobStatus(inviteCode));
  },
  /**
   * Deletes a message from a channel.
   *
   * @param channelId - The ID of the channel to delete the message from.
   * @param messageId - The ID of the message to delete from the channel.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   *
   * @remarks
   * If not deleting own message:
   * - Requires the `MANAGE_MESSAGES` permission.
   *
   * Fires a _Message Delete_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/channel#delete-message}
   */
  async deleteMessage(rest: RestManager, channelId: BigString, messageId: BigString, reason?: string): Promise<void> {
    await rest.delete(rest.routes.channels.message(channelId, messageId), { reason });
  },
  /**
   * Deletes multiple messages from a channel.
   *
   * @param channelId - The ID of the channel to delete the messages from.
   * @param messageIds - The IDs of the messages to delete from the channel.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   *
   * @remarks
   * Requires the `MANAGE_MESSAGES` permission.
   *
   * ⚠️ Messages older than 2 weeks old cannot be deleted.
   *
   * Fires a _Message Delete Bulk_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/channel#bulk-delete-messages}
   */
  async deleteMessages(rest: RestManager, channelId: BigString, messageIds: BigString[], reason?: string): Promise<void> {
    await rest.post(rest.routes.channels.bulk(channelId), {
      body: {
        messages: messageIds.slice(0, 100).map((id) => id.toString()),
      },
      reason,
    });
  },
  /**
   * Deletes the initial message response to an interaction.
   *
   * @param token - The interaction token to use, provided in the original interaction.
   *
   * @remarks
   * Unlike `deleteMessage()`, this endpoint allows the bot user to act without needing to see the channel the message is in.
   *
   * Fires a _Message Delete_ event.
   *
   * @see {@link https://docs.discord.com/developers/interactions/receiving-and-responding#delete-original-interaction-response}
   */
  async deleteOriginalInteractionResponse(rest: RestManager, token: string): Promise<void> {
    await rest.delete(rest.routes.interactions.responses.original(rest.applicationId, token), { unauthorized: true });
  },
  /**
   * Deletes a reaction added by the bot user from a message.
   *
   * @param channelId - The ID of the channel the message to delete the reaction from is in.
   * @param messageId - The ID of the message to delete the reaction from.
   * @param reaction - The reaction to delete from the message.
   *
   * @remarks
   * Requires the `READ_MESSAGE_HISTORY` permission.
   *
   * Fires a _Message Reaction Remove_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/channel#delete-own-reaction}
   */
  async deleteOwnReaction(rest: RestManager, channelId: BigString, messageId: BigString, reaction: string): Promise<void> {
    reaction = processReactionString(reaction);

    await rest.delete(rest.routes.channels.reactions.bot(channelId, messageId, reaction));
  },
  /**
   * Deletes all reactions for all emojis from a message.
   *
   * @param channelId - The ID of the channel the message to delete the reactions from is in.
   * @param messageId - The ID of the message to delete the reactions from.
   *
   * @remarks
   * Requires the `READ_MESSAGE_HISTORY` permission.
   *
   * Requires the `MANAGE_MESSAGES` permission.
   *
   * Fires a _Message Reaction Remove All_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/channel#delete-all-reactions}
   */
  async deleteReactionsAll(rest: RestManager, channelId: BigString, messageId: BigString): Promise<void> {
    await rest.delete(rest.routes.channels.reactions.all(channelId, messageId));
  },
  /**
   * Deletes all reactions for an emoji from a message.
   *
   * @param channelId - The ID of the channel the message to delete the reactions from is in.
   * @param messageId - The ID of the message to delete the reactions from.
   * @param reaction - The reaction to remove from the message.
   *
   * @remarks
   * Requires the `READ_MESSAGE_HISTORY` permission.
   *
   * Requires the `MANAGE_MESSAGES` permission.
   *
   * Fires a _Message Reaction Remove Emoji_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/channel#delete-all-reactions-for-emoji}
   */
  async deleteReactionsEmoji(rest: RestManager, channelId: BigString, messageId: BigString, reaction: string): Promise<void> {
    reaction = processReactionString(reaction);

    await rest.delete(rest.routes.channels.reactions.emoji(channelId, messageId, reaction));
  },
  /**
   * Deletes a role from a guild.
   *
   * @param guildId - The ID of the guild to delete the role from.
   * @param roleId - The ID of the role to delete.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   *
   * @remarks
   * Requires the `MANAGE_ROLES` permission.
   *
   * Fires a _Guild Role Delete_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild#delete-guild-role}
   */
  async deleteRole(rest: RestManager, guildId: BigString, roleId: BigString, reason?: string): Promise<void> {
    await rest.delete(rest.routes.guilds.roles.one(guildId, roleId), { reason });
  },
  /**
   * Deletes a scheduled event from a guild.
   *
   * @param guildId - The ID of the guild to delete the scheduled event from.
   * @param eventId - The ID of the scheduled event to delete.
   *
   * @remarks
   * Requires the `MANAGE_EVENTS` permission.
   *
   * Fires a _Guild Scheduled Event Delete_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild-scheduled-event#delete-guild-scheduled-event}
   */
  async deleteScheduledEvent(rest: RestManager, guildId: BigString, eventId: BigString): Promise<void> {
    await rest.delete(rest.routes.guilds.events.event(guildId, eventId));
  },
  /**
   * Deletes the stage instance associated with a stage channel, if one exists.
   *
   * @param channelId - The ID of the stage channel the stage instance is associated with.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   *
   * @remarks
   * Requires the user to be a moderator of the stage channel.
   *
   * Fires a _Stage Instance Delete_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/stage-instance#delete-stage-instance}
   */
  async deleteStageInstance(rest: RestManager, channelId: BigString, reason?: string): Promise<void> {
    await rest.delete(rest.routes.channels.stage(channelId), { reason });
  },
  /**
   * Deletes a user's reaction from a message.
   *
   * @param channelId - The ID of the channel the message to delete the reaction from is in.
   * @param messageId - The ID of the message to delete the reaction from.
   * @param userId - The ID of the user whose reaction to delete.
   * @param reaction - The reaction to delete from the message.
   *
   * @remarks
   * Requires the `READ_MESSAGE_HISTORY` permission.
   *
   * Requires the `MANAGE_MESSAGES` permission.
   *
   * Fires a _Message Reaction Remove_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/channel#delete-user-reaction}
   */
  async deleteUserReaction(rest: RestManager, channelId: BigString, messageId: BigString, userId: BigString, reaction: string): Promise<void> {
    reaction = processReactionString(reaction);

    await rest.delete(rest.routes.channels.reactions.user(channelId, messageId, reaction, userId));
  },
  /**
   * Deletes a webhook.
   *
   * @param webhookId - The ID of the webhook to delete.
   *
   * @remarks
   * Requires the `MANAGE_WEBHOOKS` permission.
   *
   * Fires a _Webhooks Update_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/webhook#delete-webhook}
   */
  async deleteWebhook(rest: RestManager, webhookId: BigString, reason?: string): Promise<void> {
    await rest.delete(rest.routes.webhooks.id(webhookId), { reason });
  },
  /**
   * Deletes a webhook message.
   *
   * @param webhookId - The ID of the webhook to delete the message belonging to.
   * @param token - The webhook token, used to manage the webhook.
   * @param messageId - The ID of the message to delete.
   * @param options - The parameters for the deletion of the message.
   *
   * @remarks
   * Fires a _Message Delete_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/webhook#delete-webhook}
   */
  async deleteWebhookMessage(
    rest: RestManager,
    webhookId: BigString,
    token: string,
    messageId: BigString,
    options?: DeleteWebhookMessageOptions,
  ): Promise<void> {
    await rest.delete(rest.routes.webhooks.message(webhookId, token, messageId, options), { unauthorized: true });
  },
  /**
   * Deletes a webhook message using the webhook token, thereby bypassing the need for authentication + permissions.
   *
   * @param webhookId - The ID of the webhook to delete the message belonging to.
   * @param token - The webhook token, used to delete the webhook.
   *
   * @remarks
   * Fires a _Message Delete_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/webhook#delete-webhook-with-token}
   */
  async deleteWebhookWithToken(rest: RestManager, webhookId: BigString, token: string): Promise<void> {
    await rest.delete(rest.routes.webhooks.webhook(webhookId, token), {
      unauthorized: true,
    });
  },
  /**
   * Edits the permissions for a guild application command.
   *
   * @param guildId - The ID of the guild the command is registered in.
   * @param commandId - The ID of the command to edit the permissions of.
   * @param bearerToken - The bearer token to use to make the request.
   * @param options - The parameters for the edit of the command permissions.
   * @returns An instance of the edited {@link DiscordGuildApplicationCommandPermissions}.
   *
   * @remarks
   * The bearer token requires the `applications.commands.permissions.update` scope to be enabled, and to have access to the guild whose ID has been provided in the parameters.
   *
   * @see {@link https://docs.discord.com/developers/interactions/application-commands#edit-application-command-permissions}
   */
  async editApplicationCommandPermissions(
    rest: RestManager,
    guildId: BigString,
    commandId: BigString,
    bearerToken: string,
    options: Camelize<DiscordApplicationCommandPermissions>[],
  ): Promise<Camelize<DiscordGuildApplicationCommandPermissions>> {
    return await rest.put<DiscordGuildApplicationCommandPermissions>(
      rest.routes.interactions.commands.permission(rest.applicationId, guildId, commandId),
      {
        body: {
          permissions: options,
        },
        headers: { authorization: `Bearer ${bearerToken}` },
      },
    );
  },
  /**
   * Edits an automod rule.
   *
   * @param guildId - The ID of the guild to edit the rule in.
   * @param ruleId - The ID of the rule to edit.
   * @param options - The parameters for the edit of the rule.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns An instance of the edited {@link DiscordAutoModerationRule}.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * Fires an _Auto Moderation Rule Update_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/auto-moderation#modify-auto-moderation-rule}
   */
  async editAutomodRule(
    rest: RestManager,
    guildId: BigString,
    ruleId: BigString,
    options: Partial<EditAutoModerationRuleOptions>,
    reason?: string,
  ): Promise<Camelize<DiscordAutoModerationRule>> {
    return await rest.patch<DiscordAutoModerationRule>(rest.routes.guilds.automod.rule(guildId, ruleId), { body: options, reason });
  },
  /**
   * Modifies the bot's username, avatar or banner.
   *
   * @param options - The parameters for the edit of the bot's profile.
   * @returns An instance of the edited {@link DiscordUser}.
   *
   * @remarks
   * Editing the `username` may cause the bot's discriminator to be randomized.
   *
   * `avatar` and `banner` must to be a Data URI scheme. {@link urlToBase64} from `@discordeno/utils` can be used to convert a URL to a Data URI scheme.
   *
   * @see {@link https://docs.discord.com/developers/resources/user#modify-current-user}
   */
  async editBotProfile(
    rest: RestManager,
    options: { username?: string; botAvatarURL?: string | null; botBannerURL?: string | null },
  ): Promise<Camelize<DiscordUser>> {
    return await rest.patch<DiscordUser>(rest.routes.currentUser(), {
      body: options,
    });
  },
  /**
   * Edits a channel's settings.
   *
   * @param channelId - The ID of the channel to edit.
   * @param options - The parameters for the edit of the channel.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns An instance of the edited {@link DiscordChannel}.
   *
   * @remarks
   * If editing a channel of type {@link ChannelTypes}.GroupDm:
   * - Fires a _Channel Update_ gateway event.
   *
   * If editing a thread channel:
   * - Requires the `MANAGE_THREADS` permission __unless__ if setting the `archived` property to `false` when the `locked` property is also `false`, in which case only the `SEND_MESSAGES` permission is required.
   *
   * - Fires a _Thread Update_ gateway event.
   *
   * If editing a guild channel:
   * - Requires the `MANAGE_CHANNELS` permission.
   *
   * - If modifying permission overrides:
   *   - Requires the `MANAGE_ROLES` permission.
   *
   *   - Only permissions the bot user has in the guild or parent channel can be allowed/denied __unless__ the bot user has a `MANAGE_ROLES` permission override in the channel.
   *
   * - If modifying a channel of type {@link ChannelTypes}.GuildCategory:
   *     - Fires a _Channel Update_ gateway event for each child channel impacted in this change.
   * - Otherwise:
   *     - Fires a _Channel Update_ gateway event.
   */
  async editChannel(rest: RestManager, channelId: BigString, options: ModifyChannel, reason?: string): Promise<Camelize<DiscordChannel>> {
    return await rest.patch<DiscordChannel>(rest.routes.channels.channel(channelId), { body: options, reason });
  },
  /**
   * Edits the permission overrides for a user or role in a channel.
   *
   * @param channelId - The ID of the channel to edit the permission overrides of.
   * @param options - The permission override.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   *
   * @remarks
   * Requires the `MANAGE_ROLES` permission.
   *
   * Only permissions the bot user has in the guild or parent channel can be allowed/denied __unless__ the bot user has a `MANAGE_ROLES` permission override in the channel.
   *
   * Fires a _Channel Update_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/channel#edit-channel-permissions}
   */
  async editChannelPermissionOverrides(
    rest: RestManager,
    channelId: BigString,
    options: EditChannelPermissionOverridesOptions,
    reason?: string,
  ): Promise<void> {
    await rest.put(rest.routes.channels.overwrite(channelId, options.id), { body: options, reason });
  },
  /**
   * Edits the positions of a set of channels in a guild.
   *
   * @param guildId - The ID of the guild in which to edit the positions of the channels.
   * @param channelPositions - A set of objects defining the updated positions of the channels.
   *
   * @remarks
   * Requires the `MANAGE_CHANNELS` permission.
   *
   * Fires a _Channel Update_ gateway event for every channel impacted in this change.
   *
   * At most one entry per request may change `parent_id`. A request that changes `parent_id` for more than one channel fails with a 400 response and error code 40009.
   *
   * Permissions are checked per entry, based on what the entry changes:
   * - An entry that only changes `position` requires the `MANAGE_CHANNELS` permission at the guild level (or on the channel's current parent category). It does **not** require access to the individual channel, so a full reordering may include channels the current user cannot view.
   * - An entry that changes `parent_id` requires the `MANAGE_CHANNELS` permission on that channel and on the destination (the new parent category, or the guild when moving the channel out of a category), and the current user must be able to view the channel. Otherwise the request fails with a `403` response and error code 50001. Setting `lock_permissions` additionally requires `MANAGE_ROLES`.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild#modify-guild-channel-positions}
   */
  async editChannelPositions(rest: RestManager, guildId: BigString, channelPositions: ModifyGuildChannelPositions[]): Promise<void> {
    await rest.patch(rest.routes.guilds.channels(guildId), { body: channelPositions });
  },
  /**
   * Edits an emoji.
   *
   * @param guildId - The ID of the guild in which to edit the emoji.
   * @param id - The ID of the emoji to edit.
   * @param options - The parameters for the edit of the emoji.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns An instance of the updated {@link DiscordEmoji}.
   *
   * @remarks
   * For emojis created by the current user, requires either the `CREATE_GUILD_EXPRESSIONS` or `MANAGE_GUILD_EXPRESSIONS` permission.
   * For other emojis, requires the `MANAGE_GUILD_EXPRESSIONS` permission.
   *
   * Fires a `Guild Emojis Update` gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/emoji#modify-guild-emoji}
   */
  async editEmoji(rest: RestManager, guildId: BigString, id: BigString, options: ModifyGuildEmoji, reason?: string): Promise<Camelize<DiscordEmoji>> {
    return await rest.patch<DiscordEmoji>(rest.routes.guilds.emoji(guildId, id), { body: options, reason });
  },
  /**
   * Edits an application emoji.
   *
   * @param id - The ID of the emoji to edit.
   * @param options - The parameters for the edit of the emoji.
   * @returns An instance of the updated {@link DiscordEmoji}.
   *
   * @see {@link https://docs.discord.com/developers/resources/emoji#modify-application-emoji}
   */
  async editApplicationEmoji(rest: RestManager, id: BigString, options: ModifyApplicationEmoji): Promise<Camelize<DiscordEmoji>> {
    return await rest.patch<DiscordEmoji>(rest.routes.applicationEmoji(rest.applicationId, id), { body: options });
  },
  /**
   * Edits a follow-up message to an interaction.
   *
   * @param token - The interaction token to use, provided in the original interaction.
   * @param messageId - The ID of the message to edit.
   * @param options - The parameters for the edit of the message.
   * @returns An instance of the edited {@link DiscordMessage}.
   *
   * @remarks
   * Unlike `editMessage()`, this endpoint allows the bot user to act without needing to see the channel the message is in.
   *
   * Does not support ephemeral follow-up messages due to these being stateless.
   *
   * Fires a _Message Update_ event.
   *
   * @see {@link https://docs.discord.com/developers/interactions/receiving-and-responding#edit-followup-message}
   */
  async editFollowupMessage(
    rest: RestManager,
    token: string,
    messageId: BigString,
    options: InteractionCallbackData,
  ): Promise<Camelize<DiscordMessage>> {
    return await rest.patch<DiscordMessage>(rest.routes.interactions.responses.message(rest.applicationId, token, messageId), {
      body: options,
      files: options.files,
      unauthorized: true,
    });
  },
  /**
   * Edits a global application command.
   *
   * @param commandId - The ID of the command to edit.
   * @param options - The parameters for the edit of the command.
   * @returns An instance of the edited {@link DiscordApplicationCommand}.
   *
   * @see {@link https://docs.discord.com/developers/interactions/application-commands#edit-global-application-command}
   */
  async editGlobalApplicationCommand(
    rest: RestManager,
    commandId: BigString,
    options: CreateApplicationCommand,
  ): Promise<Camelize<DiscordApplicationCommand>> {
    return await rest.patch<DiscordApplicationCommand>(rest.routes.interactions.commands.command(rest.applicationId, commandId), { body: options });
  },
  /**
   * Edits a guild's settings.
   *
   * @param guildId - The ID of the guild to edit.
   * @param options - The parameters for the edit of the guild.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns An instance of the edited {@link DiscordGuild}.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * If attempting to add or remove the {@link GuildFeatures}.Community feature:
   * - Requires the `ADMINISTRATOR` permission.
   *
   * Fires a _Guild Update_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild#modify-guild}
   */
  async editGuild(rest: RestManager, guildId: BigString, options: ModifyGuild, reason?: string): Promise<Camelize<DiscordGuild>> {
    return await rest.patch<DiscordGuild>(rest.routes.guilds.guild(guildId), { body: options, reason });
  },
  /**
   * Edits an application command registered in a guild.
   *
   * @param guildId - The ID of the guild the command is registered in.
   * @param commandId - The ID of the command to edit.
   * @param options - The parameters for the edit of the command.
   * @returns An instance of the edited {@link DiscordApplicationCommand}.
   *
   * @see {@link https://docs.discord.com/developers/interactions/application-commands#edit-guild-application-command}
   */
  async editGuildApplicationCommand(
    rest: RestManager,
    commandId: BigString,
    guildId: BigString,
    options: CreateApplicationCommand,
  ): Promise<Camelize<DiscordApplicationCommand>> {
    return await rest.patch<DiscordApplicationCommand>(rest.routes.interactions.commands.guilds.one(rest.applicationId, guildId, commandId), {
      body: options,
    });
  },
  /**
   * Edit the given sticker.
   *
   * @param guildId The ID of the guild to get
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @return A {@link DiscordSticker}
   *
   * @remarks
   * For stickers created by the current user, requires either the `CREATE_GUILD_EXPRESSIONS` or `MANAGE_GUILD_EXPRESSIONS` permission.
   * For other stickers, requires the `MANAGE_GUILD_EXPRESSIONS` permission.
   * Fires a Guild Stickers Update Gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/sticker#modify-guild-sticker}
   */
  async editGuildSticker(
    rest: RestManager,
    guildId: BigString,
    stickerId: BigString,
    options: AtLeastOne<EditGuildStickerOptions>,
    reason?: string,
  ): Promise<Camelize<DiscordSticker>> {
    return await rest.patch<DiscordSticker>(rest.routes.guilds.sticker(guildId, stickerId), { body: options, reason });
  },
  /**
   * Edits a template's settings.
   *
   * @param guildId - The ID of the guild to edit a template of.
   * @param templateCode - The code of the template to edit.
   * @param options - The parameters for the edit of the template.
   * @returns An instance of the edited {@link DiscordTemplate}.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * Fires a _Guild Update_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild-template#modify-guild-template}
   */
  async editGuildTemplate(
    rest: RestManager,
    guildId: BigString,
    templateCode: string,
    options: ModifyGuildTemplate,
  ): Promise<Camelize<DiscordTemplate>> {
    return await rest.patch<DiscordTemplate>(rest.routes.guilds.templates.guild(guildId, templateCode), { body: options });
  },
  /**
   * Edits a message.
   *
   * @param channelId - The ID of the channel to edit the message in.
   * @param messageId - The IDs of the message to edit.
   * @param options - The parameters for the edit of the message.
   * @returns An instance of the edited {@link DiscordMessage}.
   *
   * @remarks
   * If editing another user's message:
   * - Requires the `MANAGE_MESSAGES` permission.
   * - Only the {@link EditMessage.flags | flags} property of the options object parameter can be edited.
   *
   * Fires a _Message Update_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/channel#edit-message}
   */
  async editMessage(rest: RestManager, channelId: BigString, messageId: BigString, options: EditMessage): Promise<Camelize<DiscordMessage>> {
    return await rest.patch<DiscordMessage>(rest.routes.channels.message(channelId, messageId), { body: options, files: options.files });
  },
  /**
   * Edits the initial message response to an interaction.
   *
   * @param token - The interaction token to use, provided in the original interaction.
   * @param options - The parameters for the edit of the response.
   * @returns An instance of the edited {@link DiscordMessage}.
   *
   * @remarks
   * Unlike `editMessage()`, this endpoint allows the bot user to act without needing to see the channel the message is in.
   *
   * Does not support ephemeral follow-up messages due to these being stateless.
   *
   * Fires a _Message Update_ event.
   *
   * @see {@link https://docs.discord.com/developers/interactions/receiving-and-responding#edit-original-interaction-response}
   */
  async editOriginalInteractionResponse(rest: RestManager, token: string, options: InteractionCallbackData): Promise<Camelize<DiscordMessage>> {
    return await rest.patch<DiscordMessage>(rest.routes.interactions.responses.original(rest.applicationId, token), {
      body: options,
      files: options.files,
      unauthorized: true,
    });
  },
  /**
   * Edits the voice state of the bot user.
   *
   * @param guildId - The ID of the guild in which to edit the voice state of the bot user.
   * @param options - The parameters for the edit of the voice state.
   *
   * @remarks
   * The {@link EditOwnVoiceState.channelId | channelId} property of the options object parameter must point to a stage channel, and the bot user must already have joined it.
   *
   * If attempting to unmute oneself:
   * - Requires the `MUTE_MEMBERS` permission.
   *
   * If attempting to request to speak:
   * - Requires the `REQUEST_TO_SPEAK` permission.
   *
   * @see {@link https://docs.discord.com/developers/resources/voice#modify-current-user-voice-state}
   */
  async editOwnVoiceState(rest: RestManager, guildId: BigString, options: EditOwnVoiceState): Promise<void> {
    await rest.patch(rest.routes.guilds.voice(guildId), {
      body: {
        ...options,
        requestToSpeakTimestamp: options.requestToSpeakTimestamp
          ? new Date(options.requestToSpeakTimestamp).toISOString()
          : options.requestToSpeakTimestamp,
      },
    });
  },
  /**
   * Edits a role in a guild.
   *
   * @param guildId - The ID of the guild to edit the role in.
   * @param roleId - The ID of the role to edit.
   * @param options - The parameters for the edit of the role.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns An instance of the edited {@link DiscordRole}.
   *
   * @remarks
   * Requires the `MANAGE_ROLES` permission.
   *
   * Fires a _Guild Role Update_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild#modify-guild-role}
   */
  async editRole(rest: RestManager, guildId: BigString, roleId: BigString, options: EditGuildRole, reason?: string): Promise<Camelize<DiscordRole>> {
    return await rest.patch<DiscordRole>(rest.routes.guilds.roles.one(guildId, roleId), { body: options, reason });
  },
  /**
   * Edits the positions of a set of roles.
   *
   * @param guildId - The ID of the guild to edit the role positions in.
   * @param options - The parameters for the edit of the role positions.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns A collection of {@link DiscordRole} objects assorted by role ID.
   *
   * @remarks
   * Requires the `MANAGE_ROLES` permission.
   *
   * Fires a _Guild Role Update_ gateway event for every role impacted in this change.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild#modify-guild-role-positions}
   */
  async editRolePositions(rest: RestManager, guildId: BigString, options: ModifyRolePositions[], reason?: string): Promise<Camelize<DiscordRole>[]> {
    return await rest.patch<DiscordRole[]>(rest.routes.guilds.roles.all(guildId), { body: options, reason });
  },
  /**
   * Edits a scheduled event.
   *
   * @param guildId - The ID of the guild to edit the scheduled event in.
   * @param eventId - The ID of the scheduled event to edit.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns An instance of the edited {@link DiscordScheduledEvent}.
   *
   * @remarks
   * Requires the `MANAGE_EVENTS` permission.
   *
   * To start or end an event, modify the event's `status` property.
   *
   * The `entity_metadata` property is discarded for events whose `entity_type` is not {@link ScheduledEventEntityType}.External.
   *
   * Fires a _Guild Scheduled Event Update_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild-scheduled-event#modify-guild-scheduled-event}
   */
  async editScheduledEvent(
    rest: RestManager,
    guildId: BigString,
    eventId: BigString,
    options: Partial<EditScheduledEvent>,
    reason?: string,
  ): Promise<Camelize<DiscordScheduledEvent>> {
    return await rest.patch<DiscordScheduledEvent>(rest.routes.guilds.events.event(guildId, eventId), { body: options, reason });
  },
  /**
   * Edits a stage instance.
   *
   * @param channelId - The ID of the stage channel the stage instance is associated with.
   * @param topic - Topic of the Stage instance (1-120 characters).
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns An instance of the updated {@link DiscordStageInstance}.
   *
   * @remarks
   * Requires the user to be a moderator of the stage channel.
   *
   * Fires a _Stage Instance Update_ event.
   *
   * @see {@link https://docs.discord.com/developers/resources/stage-instance#modify-stage-instance}
   */
  async editStageInstance(rest: RestManager, channelId: BigString, topic: string, reason?: string): Promise<Camelize<DiscordStageInstance>> {
    return await rest.patch<DiscordStageInstance>(rest.routes.channels.stage(channelId), { body: { topic }, reason });
  },
  /**
   * Edits the voice state of another user.
   *
   * @param guildId - The ID of the guild in which to edit the voice state of the bot user.
   * @param options - The parameters for the edit of the voice state.
   *
   * @remarks
   * The {@link EditOwnVoiceState.channelId | channelId} property of the options object parameter must point to a stage channel, and the user must already have joined it.
   *
   * Requires the `MUTE_MEMBERS` permission.
   *
   * @see {@link https://docs.discord.com/developers/resources/voice#modify-user-voice-state}
   */
  async editUserVoiceState(rest: RestManager, guildId: BigString, options: EditUserVoiceState): Promise<void> {
    await rest.patch(rest.routes.guilds.voice(guildId, options.userId), { body: options });
  },
  /**
   * Edit the current user application role connection for the application.
   *
   * @param bearerToken - The access token of the user
   * @param applicationId - The id of the application to edit the role connection
   * @param options - The options to edit
   * @returns {DiscordApplicationRoleConnection}
   *
   * @remarks
   * This requires the `role_connections.write` scope.
   *
   * @see {@link https://docs.discord.com/developers/resources/user#update-user-application-role-connection}
   */
  async editUserApplicationRoleConnection(
    rest: RestManager,
    bearerToken: string,
    applicationId: BigString,
    options: Camelize<DiscordApplicationRoleConnection>,
  ): Promise<Camelize<DiscordApplicationRoleConnection>> {
    return await rest.put<DiscordApplicationRoleConnection>(rest.routes.oauth2.roleConnections(applicationId), {
      body: options,
      headers: {
        authorization: `Bearer ${bearerToken}`,
      },
      unauthorized: true,
    });
  },
  /**
   * Deletes the application role connection for the user.
   *
   * @param bearerToken - The access token of the user
   * @param applicationId - The id of the application to delete the role connection
   *
   * @remarks
   * This requires the `role_connections.write` scope.
   *
   * @see {@link https://docs.discord.com/developers/resources/user#delete-current-user-application-role-connection}
   */
  async deleteCurrentUserApplicationRoleConnection(rest: RestManager, bearerToken: string, applicationId: BigString): Promise<void> {
    return await rest.delete(rest.routes.oauth2.roleConnections(applicationId), {
      headers: {
        authorization: `Bearer ${bearerToken}`,
      },
      unauthorized: true,
    });
  },
  /**
   * Edits a webhook.
   *
   * @param webhookId - The ID of the webhook to edit.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns An instance of the edited {@link DiscordWebhook}.
   *
   * @remarks
   * Requires the `MANAGE_WEBHOOKS` permission.
   *
   * Fires a _Webhooks Update_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/webhook#edit-webhook}
   */
  async editWebhook(rest: RestManager, webhookId: BigString, options: ModifyWebhook, reason?: string): Promise<Camelize<DiscordWebhook>> {
    return await rest.patch<DiscordWebhook>(rest.routes.webhooks.id(webhookId), { body: options, reason });
  },
  /**
   * Edits a webhook message.
   *
   * @param webhookId - The ID of the webhook to edit the message of.
   * @param token - The webhook token, used to edit the message.
   * @param messageId - The ID of the message to edit.
   * @param options - The parameters for the edit of the message.
   * @returns An instance of the edited {@link DiscordMessage}.
   *
   * @remarks
   * Fires a _Message Update_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/webhook#edit-webhook-message}
   */
  async editWebhookMessage(
    rest: RestManager,
    webhookId: BigString,
    token: string,
    messageId: BigString,
    options: EditWebhookMessageOptions,
  ): Promise<Camelize<DiscordMessage>> {
    return await rest.patch<DiscordMessage>(rest.routes.webhooks.message(webhookId, token, messageId, options), {
      body: options,
      files: options.files,
      unauthorized: true,
    });
  },
  /**
   * Edits a webhook using the webhook token, thereby bypassing the need for authentication + permissions.
   *
   * @param webhookId - The ID of the webhook to edit.
   * @param token - The webhook token, used to edit the webhook.
   * @returns An instance of the edited {@link DiscordWebhook}.
   *
   * @remarks
   * Requires the `MANAGE_WEBHOOKS` permission.
   *
   * Fires a _Webhooks Update_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/webhook#modify-webhook-with-token}
   */
  async editWebhookWithToken(
    rest: RestManager,
    webhookId: BigString,
    token: string,
    options: Omit<ModifyWebhook, 'channelId'>,
  ): Promise<Camelize<DiscordWebhook>> {
    return await rest.patch<DiscordWebhook>(rest.routes.webhooks.webhook(webhookId, token), {
      body: options,
      unauthorized: true,
    });
  },
  /**
   * Edits a guild's welcome screen.
   *
   * @param guildId - The ID of the guild to edit the welcome screen of.
   * @param options - The parameters for the edit of the welcome screen.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns An instance of the edited {@link DiscordWelcomeScreen}.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * Fires a _Guild Update_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild#modify-guild-welcome-screen}
   */
  async editWelcomeScreen(
    rest: RestManager,
    guildId: BigString,
    options: ModifyGuildWelcomeScreen,
    reason?: string,
  ): Promise<Camelize<DiscordWelcomeScreen>> {
    return await rest.patch<DiscordWelcomeScreen>(rest.routes.guilds.welcome(guildId), { body: options, reason });
  },
  /**
   * Edits the settings of a guild's widget.
   *
   * @param guildId - The ID of the guild to edit the settings of the widget of.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns An instance of the edited {@link DiscordGuildWidgetSettings}.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * Fires a _Guild Update_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild#modify-guild-widget}
   */
  async editWidgetSettings(
    rest: RestManager,
    guildId: BigString,
    options: Camelize<DiscordGuildWidgetSettings>,
    reason?: string,
  ): Promise<Camelize<DiscordGuildWidgetSettings>> {
    return await rest.patch<DiscordGuildWidgetSettings>(rest.routes.guilds.widget(guildId), { body: options, reason });
  },
  /**
   * Executes a webhook, causing a message to be posted in the channel configured for the webhook.
   *
   * @param webhookId - The ID of the webhook to execute.
   * @param token - The webhook token, used to execute the webhook.
   * @param options - The parameters for the execution of the webhook.
   * @returns An instance of the created {@link DiscordMessage}, or `undefined` if the {@link ExecuteWebhook.wait | wait} property of the options object parameter is set to `false`.
   *
   * @remarks
   * If the webhook channel is a forum channel, you must provide a value for either `threadId` or `threadName`.
   *
   * @see {@link https://docs.discord.com/developers/resources/webhook#execute-webhook}
   */
  async executeWebhook(
    rest: RestManager,
    webhookId: BigString,
    token: string,
    options: ExecuteWebhook,
  ): Promise<Camelize<DiscordMessage> | undefined> {
    return await rest.post<DiscordMessage>(rest.routes.webhooks.webhook(webhookId, token, options), {
      body: options,
      unauthorized: true,
    });
  },
  /**
   * Follows an announcement channel, allowing messages posted within it to be cross-posted into the target channel.
   *
   * @param sourceChannelId - The ID of the announcement channel to follow.
   * @param targetChannelId - The ID of the target channel - the channel to cross-post to.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns An instance of {@link DiscordFollowedChannel}.
   *
   * @remarks
   * Requires the `MANAGE_WEBHOOKS` permission in the __target channel__.
   *
   * Fires a _Webhooks Update_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/channel#follow-announcement-channel}
   */
  async followAnnouncement(
    rest: RestManager,
    sourceChannelId: BigString,
    targetChannelId: BigString,
    reason?: string,
  ): Promise<Camelize<DiscordFollowedChannel>> {
    return await rest.post<DiscordFollowedChannel>(rest.routes.channels.follow(sourceChannelId), {
      body: {
        webhookChannelId: targetChannelId,
      },
      reason,
    });
  },
  /**
   * Gets the list of all active threads for a guild.
   *
   * @param guildId - The ID of the guild to get the threads of.
   * @returns An instance of {@link DiscordListActiveThreads}.
   *
   * @remarks
   * Returns both public and private threads.
   *
   * Threads are ordered by the `id` property in descending order.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild#list-active-guild-threads}
   */
  async getActiveThreads(rest: RestManager, guildId: BigString): Promise<Camelize<DiscordListActiveThreads>> {
    return await rest.get<DiscordListActiveThreads>(rest.routes.channels.threads.active(guildId));
  },
  /** Get the applications info */
  async getApplicationInfo(rest: RestManager): Promise<Camelize<DiscordApplication>> {
    return await rest.get<DiscordApplication>(rest.routes.oauth2.application());
  },
  /**
   * Edit properties of the app associated with the requesting bot user.
   *
   * @remarks
   * Only properties that are passed will be updated.
   */
  async editApplicationInfo(rest: RestManager, body: EditApplication): Promise<Camelize<DiscordApplication>> {
    return await rest.patch<DiscordApplication>(rest.routes.application(), {
      body,
    });
  },
  /**
   * Get the current authentication info for the authenticated user
   *
   * @param bearerToken - Any OAuth2 derived access token
   * @returns An instance of {@link DiscordCurrentAuthorization}
   *
   * @remarks
   * The user object is not defined if the scopes do not include `identify`.
   * In the user object, if defined, the email is not included if the scopes do not include `email`
   */
  async getCurrentAuthenticationInfo(rest: RestManager, bearerToken: string): Promise<Camelize<DiscordCurrentAuthorization>> {
    return await rest.get<DiscordCurrentAuthorization>(rest.routes.oauth2.currentAuthorization(), {
      headers: {
        authorization: `Bearer ${bearerToken}`,
      },
      unauthorized: true,
    });
  },
  /**
   * Exchange the information to get a OAuth2 accessToken token
   *
   * @param clientId - Application's client id
   * @param clientSecret - application's client secret
   * @param options - The options to make the exchange with discord
   */
  async exchangeToken(
    rest: RestManager,
    clientId: BigString,
    clientSecret: string,
    options: Camelize<DiscordTokenExchange>,
  ): Promise<Camelize<DiscordAccessTokenResponse>> {
    const basicCredentials = Buffer.from(`${clientId}:${clientSecret}`);

    const restOptions: MakeRequestOptions = {
      body: options,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        authorization: `Basic ${basicCredentials.toString('base64')}`,
      },
      runThroughQueue: false,
      unauthorized: true,
    };

    if (options.grantType === 'client_credentials') {
      restOptions.body.scope = options.scope.join(' ');
    }

    return await rest.post<DiscordAccessTokenResponse>(rest.routes.oauth2.tokenExchange(), restOptions);
  },
  /**
   * Revoke an access_token
   *
   * @param clientId - Application's client id
   * @param clientSecret - application's client secret
   * @param options - The options to revoke the access_token
   */
  async revokeToken(rest: RestManager, clientId: BigString, clientSecret: string, options: Camelize<DiscordTokenRevocation>): Promise<void> {
    const basicCredentials = Buffer.from(`${clientId}:${clientSecret}`);

    await rest.post(rest.routes.oauth2.tokenRevoke(), {
      body: options,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        authorization: `Basic ${basicCredentials.toString('base64')}`,
      },
      unauthorized: true,
    });
  },
  /**
   * Gets the permissions of a guild application command.
   *
   * @param guildId - The ID of the guild the command is registered in.
   * @param commandId - The ID of the command to get the permissions of.
   * @param options - The OAuth2 related optional parameters for the endpoint
   * @returns An instance of {@link DiscordGuildApplicationCommandPermissions}.
   *
   * @remarks
   * Then specifying the options object the access token passed-in requires the OAuth2 scope `applications.commands.permissions.update`
   *
   * @see {@link https://docs.discord.com/developers/interactions/application-commands#get-application-command-permissions}
   */
  async getApplicationCommandPermission(
    rest: RestManager,
    guildId: BigString,
    commandId: BigString,
    options?: GetApplicationCommandPermissionOptions,
  ): Promise<Camelize<DiscordGuildApplicationCommandPermissions>> {
    const restOptions: Omit<MakeRequestOptions, 'body'> = {};

    if (options?.accessToken) {
      restOptions.unauthorized = true;
      restOptions.headers = {
        authorization: `Bearer ${options.accessToken}`,
      };
    }

    return await rest.get<DiscordGuildApplicationCommandPermissions>(
      rest.routes.interactions.commands.permission(options?.applicationId ?? rest.applicationId, guildId, commandId),
      restOptions,
    );
  },
  /**
   * Gets the permissions of all application commands registered in a guild by the ID of the guild and optionally an external application.
   *
   * @param guildId - The ID of the guild to get the permissions objects of.
   * @param options - The OAuth2 related optional parameters for the endpoint
   * @returns A collection of {@link DiscordGuildApplicationCommandPermissions} objects assorted by command ID.
   *
   * @remarks
   * Then specifying the options object the access token passed-in requires the OAuth2 scope `applications.commands.permissions.update`
   *
   * @see {@link https://docs.discord.com/developers/interactions/application-commands#get-guild-application-command-permissions}
   */
  async getApplicationCommandPermissions(
    rest: RestManager,
    guildId: BigString,
    options?: GetApplicationCommandPermissionOptions,
  ): Promise<Camelize<DiscordGuildApplicationCommandPermissions>[]> {
    const restOptions: Omit<MakeRequestOptions, 'body'> = {};

    if (options?.accessToken) {
      restOptions.unauthorized = true;
      restOptions.headers = {
        authorization: `Bearer ${options.accessToken}`,
      };
    }

    return await rest.get<DiscordGuildApplicationCommandPermissions[]>(
      rest.routes.interactions.commands.permissions(options?.applicationId ?? rest.applicationId, guildId),
      restOptions,
    );
  },
  /**
   * Gets a guild's audit log.
   *
   * @param guildId - The ID of the guild to get the audit log of.
   * @param options - The parameters for the fetching of the audit log.
   * @returns An instance of {@link DiscordAuditLog}.
   *
   * @remarks
   * Requires the `VIEW_AUDIT_LOG` permission.
   *
   * @see {@link https://docs.discord.com/developers/resources/audit-log#get-guild-audit-log}
   */
  async getAuditLog(rest: RestManager, guildId: BigString, options?: GetGuildAuditLog): Promise<Camelize<DiscordAuditLog>> {
    return await rest.get<DiscordAuditLog>(rest.routes.guilds.auditlogs(guildId, options));
  },
  /**
   * Gets an automod rule by its ID.
   *
   * @param guildId - The ID of the guild to get the rule of.
   * @param ruleId - The ID of the rule to get.
   * @returns An instance of {@link DiscordAutoModerationRule}.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * @see {@link https://docs.discord.com/developers/resources/auto-moderation#get-auto-moderation-rule}
   */
  async getAutomodRule(rest: RestManager, guildId: BigString, ruleId: BigString): Promise<Camelize<DiscordAutoModerationRule>> {
    return await rest.get<DiscordAutoModerationRule>(rest.routes.guilds.automod.rule(guildId, ruleId));
  },
  /**
   * Gets the list of automod rules for a guild.
   *
   * @param guildId - The ID of the guild to get the rules from.
   * @returns A collection of {@link DiscordAutoModerationRule} objects assorted by rule ID.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * @see {@link https://docs.discord.com/developers/resources/auto-moderation#list-auto-moderation-rules-for-guild}
   */
  async getAutomodRules(rest: RestManager, guildId: BigString): Promise<Camelize<DiscordAutoModerationRule>[]> {
    return await rest.get<DiscordAutoModerationRule[]>(rest.routes.guilds.automod.rules(guildId));
  },
  /**
   * Gets the list of available voice regions.
   *
   * @returns A collection of {@link DiscordVoiceRegion} objects assorted by voice region ID.
   */
  async getAvailableVoiceRegions(rest: RestManager): Promise<Camelize<DiscordVoiceRegion>[]> {
    return await rest.get<DiscordVoiceRegion[]>(rest.routes.regions());
  },
  /**
   * Gets a ban by user ID.
   *
   * @param guildId - The ID of the guild to get the ban from.
   * @param userId - The ID of the user to get the ban for.
   * @returns An instance of {@link DiscordBan}.
   *
   * @remarks
   * Requires the `BAN_MEMBERS` permission.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild#get-guild-ban}
   */
  async getBan(rest: RestManager, guildId: BigString, userId: BigString): Promise<Camelize<DiscordBan>> {
    return await rest.get<DiscordBan>(rest.routes.guilds.members.ban(guildId, userId));
  },
  /**
   * Gets the list of bans for a guild.
   *
   * @param guildId - The ID of the guild to get the list of bans for.
   * @param options - The parameters for the fetching of the list of bans.
   * @returns A collection of {@link DiscordBan} objects assorted by user ID.
   *
   * @remarks
   * Requires the `BAN_MEMBERS` permission.
   *
   * Users are ordered by their IDs in _ascending_ order.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild#get-guild-bans}
   */
  async getBans(rest: RestManager, guildId: BigString, options?: GetBans): Promise<Camelize<DiscordBan>[]> {
    return await rest.get<DiscordBan[]>(rest.routes.guilds.members.bans(guildId, options));
  },
  /**
   * Gets a channel by its ID.
   *
   * @param channelId - The ID of the channel to get.
   * @returns An instance of {@link DiscordChannel}.
   *
   * @remarks
   * If the channel is a thread, a {@link DiscordThreadMember} object is included in the result.
   *
   * @see {@link https://docs.discord.com/developers/resources/channel#get-channel}
   */
  async getChannel(rest: RestManager, channelId: BigString): Promise<Camelize<DiscordChannel>> {
    return await rest.get<DiscordChannel>(rest.routes.channels.channel(channelId));
  },
  /**
   * Gets the list of invites for a channel.
   *
   * @param channelId - The ID of the channel to get the invites of.
   * @returns A collection of {@link DiscordInviteMetadata} objects assorted by invite code.
   *
   * @remarks
   * Requires the `MANAGE_CHANNELS` permission.
   *
   * Only usable for guild channels.
   *
   * @see {@link https://docs.discord.com/developers/resources/channel#get-channel-invites}
   */
  async getChannelInvites(rest: RestManager, channelId: BigString): Promise<Camelize<DiscordInviteMetadata>[]> {
    return await rest.get<DiscordInviteMetadata[]>(rest.routes.channels.invites(channelId));
  },
  /**
   * Gets the list of channels for a guild.
   *
   * @param guildId - The ID of the guild to get the channels of.
   * @returns A collection of {@link DiscordChannel} objects assorted by channel ID.
   *
   * @remarks
   * Excludes threads.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild#get-guild-channels}
   */
  async getChannels(rest: RestManager, guildId: BigString): Promise<Camelize<DiscordChannel>[]> {
    return await rest.get<DiscordChannel[]>(rest.routes.guilds.channels(guildId));
  },
  /**
   * Gets a list of webhooks for a channel.
   *
   * @param channelId - The ID of the channel which to get the webhooks of.
   * @returns A collection of {@link DiscordWebhook} objects assorted by webhook ID.
   *
   * @remarks
   * Requires the `MANAGE_WEBHOOKS` permission.
   *
   * @see {@link https://docs.discord.com/developers/resources/webhook#get-channel-webhooks}
   */
  async getChannelWebhooks(rest: RestManager, channelId: BigString): Promise<Camelize<DiscordWebhook>[]> {
    return await rest.get<DiscordWebhook[]>(rest.routes.channels.webhooks(channelId));
  },
  /**
   * Gets or creates a DM channel with a user.
   *
   * @param userId - The ID of the user to create the DM channel with.
   * @returns An instance of {@link DiscordChannel}.
   *
   * @see {@link https://docs.discord.com/developers/resources/user#create-dm}
   */
  async getDmChannel(rest: RestManager, userId: BigString): Promise<Camelize<DiscordChannel>> {
    return await rest.post<DiscordChannel>(rest.routes.channels.dm(), {
      body: { recipientId: userId },
    });
  },
  /**
   * Create a new group DM channel with multiple users.
   *
   * @param options - The options for create a new group dm
   * @returns An instance of {@link DiscordChannel}.
   *
   * @remarks
   * The access tokens require to have the `gdm.join` scope
   *
   * This endpoint is limited to 10 active group DMs.
   *
   * Fires a _Channel create_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/user#create-group-dm}
   */
  async getGroupDmChannel(rest: RestManager, options: CreateGroupDmOptions): Promise<Camelize<DiscordChannel>> {
    return await rest.post<DiscordChannel>(rest.routes.channels.dm(), {
      body: options,
    });
  },
  /**
   * Gets an emoji by its ID.
   *
   * @param guildId - The ID of the guild from which to get the emoji.
   * @param emojiId - The ID of the emoji to get.
   * @returns An instance of {@link DiscordEmoji}.
   *
   * @remarks
   * Includes the `user` field if the bot has the `MANAGE_GUILD_EXPRESSIONS` permission,
   * or if the bot created the emoji and has the `CREATE_GUILD_EXPRESSIONS` permission.
   *
   * @see {@link https://docs.discord.com/developers/resources/emoji#get-guild-emoji}
   */
  async getEmoji(rest: RestManager, guildId: BigString, emojiId: BigString): Promise<Camelize<DiscordEmoji>> {
    return await rest.get<DiscordEmoji>(rest.routes.guilds.emoji(guildId, emojiId));
  },
  /**
   * Gets an application emoji by its ID.
   *
   * @param emojiId - The ID of the emoji to get.
   * @returns An instance of {@link DiscordEmoji}.
   *
   * @remarks
   * Always includes the `user` object for the team member that uploaded the emoji from the app's settings, or for the bot user if uploaded using the API.
   *
   * @see {@link https://docs.discord.com/developers/resources/emoji#get-application-emoji}
   */
  async getApplicationEmoji(rest: RestManager, emojiId: BigString): Promise<Camelize<DiscordEmoji>> {
    return await rest.get<DiscordEmoji>(rest.routes.applicationEmoji(rest.applicationId, emojiId));
  },
  /**
   * Gets the list of emojis for a guild.
   *
   * @param guildId - The ID of the guild which to get the emojis of.
   * @returns A collection of {@link DiscordEmoji} objects assorted by emoji ID.
   *
   * @remarks
   * Includes `user` fields if the bot has the `CREATE_GUILD_EXPRESSIONS` or `MANAGE_GUILD_EXPRESSIONS` permission.
   *
   * @see {@link https://docs.discord.com/developers/resources/emoji#list-guild-emojis}
   */
  async getEmojis(rest: RestManager, guildId: BigString): Promise<Camelize<DiscordEmoji>[]> {
    return await rest.get<DiscordEmoji[]>(rest.routes.guilds.emojis(guildId));
  },
  /**
   * Gets the list of emojis for an application.
   *
   * @returns An object with the array of {@link DiscordEmoji} objects.
   *
   * @remarks
   * Always includes the `user` object for the team member that uploaded the emoji from the app's settings, or for the bot user if uploaded using the API.
   *
   * @see {@link https://docs.discord.com/developers/resources/emoji#list-application-emojis}
   */
  async getApplicationEmojis(rest: RestManager): Promise<{ items: Camelize<DiscordEmoji>[] }> {
    return await rest.get<{ items: DiscordEmoji[] }>(rest.routes.applicationEmojis(rest.applicationId));
  },
  /**
   * Gets a follow-up message to an interaction by the ID of the message.
   *
   * @param token - The interaction token to use, provided in the original interaction.
   * @param messageId - The ID of the message to get.
   * @returns An instance of {@link DiscordMessage}.
   *
   * @remarks
   * Unlike `getMessage()`, this endpoint allows the bot user to act without:
   * - Needing to be able to see the contents of the channel that the message is in. (`READ_MESSAGES` permission.)
   * - Requiring the `MESSAGE_CONTENT` intent.
   *
   * Does not support ephemeral follow-up messages due to these being stateless.
   *
   * @see {@link https://docs.discord.com/developers/interactions/receiving-and-responding#get-followup-message}
   */
  async getFollowupMessage(rest: RestManager, token: string, messageId: BigString): Promise<Camelize<DiscordMessage>> {
    return await rest.get<DiscordMessage>(rest.routes.interactions.responses.message(rest.applicationId, token, messageId), { unauthorized: true });
  },
  /** Get the bots Gateway metadata that can help during the operation of large or sharded bots. */
  async getGatewayBot(rest: RestManager): Promise<Camelize<DiscordGetGatewayBot>> {
    return await rest.get<DiscordGetGatewayBot>(rest.routes.gatewayBot());
  },
  /**
   * Gets a global application command by its ID.
   *
   * @param commandId - The ID of the command to get.
   * @returns An instance of {@link DiscordApplicationCommand}.
   *
   * @see {@link https://docs.discord.com/developers/interactions/application-commands#get-global-application-command}
   */
  async getGlobalApplicationCommand(rest: RestManager, commandId: BigString): Promise<Camelize<DiscordApplicationCommand>> {
    return await rest.get<DiscordApplicationCommand>(rest.routes.interactions.commands.command(rest.applicationId, commandId));
  },
  /**
   * Gets the list of your bot's global application commands.
   *
   * @param options - The parameters for the fetching of global application commands
   * @returns A collection of {@link DiscordApplicationCommand} objects assorted by command ID.
   *
   * @see {@link https://docs.discord.com/developers/interactions/application-commands#get-global-application-commands}
   */
  async getGlobalApplicationCommands(
    rest: RestManager,
    options?: GetGlobalApplicationCommandsOptions,
  ): Promise<Camelize<DiscordApplicationCommand>[]> {
    return await rest.get<DiscordApplicationCommand[]>(rest.routes.interactions.commands.commands(rest.applicationId, options?.withLocalizations));
  },
  /**
   * Gets a guild by its ID.
   *
   * @param guildId - The ID of the guild to get.
   * @param options - The parameters for the fetching of the guild.
   * @returns An instance of {@link DiscordGuild}.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild#get-guild}
   */
  async getGuild(rest: RestManager, guildId: BigString, options?: { counts?: boolean }): Promise<Camelize<DiscordGuild>> {
    options ??= { counts: true };

    return await rest.get<DiscordGuild>(rest.routes.guilds.guild(guildId, options.counts));
  },
  /**
   * Get the user guilds.
   *
   * @param bearerToken - The access token of the user, if unspecified the bot token is used instead
   * @param options - The parameters for the fetching of the guild.
   * @returns An array of partial {@link DiscordGuild}.
   *
   * @remarks
   * If used with an access token, the token needs to have the `guilds` scope
   *
   * @see {@link https://docs.discord.com/developers/resources/user#get-current-user-guilds}
   */
  async getGuilds(rest: RestManager, bearerToken?: string, options?: GetUserGuilds): Promise<Partial<Camelize<DiscordGuild>>[]> {
    const makeRequestOptions: MakeRequestOptions | undefined = bearerToken
      ? {
          headers: {
            authorization: `Bearer ${bearerToken}`,
          },
          unauthorized: true,
        }
      : undefined;

    return await rest.get<Partial<DiscordGuild>[]>(rest.routes.guilds.userGuilds(options), makeRequestOptions);
  },
  /**
   * Gets a guild application command by its ID.
   *
   * @param guildId - The ID of the guild the command is registered in.
   * @param commandId - The ID of the command to get.
   * @returns An instance of {@link DiscordApplicationCommand}.
   *
   * @see {@link https://docs.discord.com/developers/interactions/application-commands#get-guild-application-command}
   */
  async getGuildApplicationCommand(rest: RestManager, commandId: BigString, guildId: BigString): Promise<Camelize<DiscordApplicationCommand>> {
    return await rest.get<DiscordApplicationCommand>(rest.routes.interactions.commands.guilds.one(rest.applicationId, guildId, commandId));
  },
  /**
   * Gets the list of application commands registered by your bot in a guild.
   *
   * @param guildId - The ID of the guild the commands are registered in.
   * @param options - The parameters for the fetching of guild application commands
   * @returns A collection of {@link DiscordApplicationCommand} objects assorted by command ID.
   *
   * @see {@link https://docs.discord.com/developers/interactions/application-commands#get-global-application-commandss}
   */
  async getGuildApplicationCommands(
    rest: RestManager,
    guildId: BigString,
    options?: GetGuildApplicationCommandsOptions,
  ): Promise<Camelize<DiscordApplicationCommand>[]> {
    return await rest.get<DiscordApplicationCommand[]>(
      rest.routes.interactions.commands.guilds.all(rest.applicationId, guildId, options?.withLocalizations),
    );
  },
  /**
   * Gets the preview of a guild by a guild's ID.
   *
   * @param guildId - The ID of the guild to get the preview of.
   * @returns An instance of {@link DiscordGuildPreview}.
   *
   * @remarks
   * If the bot user is not in the guild, the guild must be discoverable.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild#get-guild-preview}
   */
  async getGuildPreview(rest: RestManager, guildId: BigString): Promise<Camelize<DiscordGuildPreview>> {
    return await rest.get<DiscordGuildPreview>(rest.routes.guilds.preview(guildId));
  },
  /**
   * Returns a sticker object for the given guild and sticker IDs.
   *
   * @param guildId The ID of the guild to get
   * @param stickerId The ID of the sticker to get
   * @return A {@link DiscordSticker}
   *
   * @remarks Includes the user field if the bot has the `CREATE_GUILD_EXPRESSIONS` or `MANAGE_GUILD_EXPRESSIONS` permission.
   *
   * @see {@link https://docs.discord.com/developers/resources/sticker#get-guild-sticker}
   */
  async getGuildSticker(rest: RestManager, guildId: BigString, stickerId: BigString): Promise<Camelize<DiscordSticker>> {
    return await rest.get<DiscordSticker>(rest.routes.guilds.sticker(guildId, stickerId));
  },
  /**
   * Returns an array of sticker objects for the given guild.
   *
   * @param guildId The ID of the guild to get
   * @returns A collection of {@link DiscordSticker} objects assorted by sticker ID.
   *
   * @remarks Includes user fields if the bot has the `CREATE_GUILD_EXPRESSIONS` or `MANAGE_GUILD_EXPRESSIONS` permission.
   *
   * @see {@link https://docs.discord.com/developers/resources/sticker#list-guild-stickers}
   */
  async getGuildStickers(rest: RestManager, guildId: BigString): Promise<Camelize<DiscordSticker>[]> {
    return await rest.get<DiscordSticker[]>(rest.routes.guilds.stickers(guildId));
  },
  /**
   * Gets a template by its code.
   *
   * @param templateCode - The code of the template to get.
   * @returns An instance of {@link DiscordTemplate}.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild-template#get-guild-template}
   */
  async getGuildTemplate(rest: RestManager, templateCode: string): Promise<Camelize<DiscordTemplate>> {
    return await rest.get<DiscordTemplate>(rest.routes.guilds.templates.code(templateCode));
  },
  /**
   * Gets the list of templates for a guild.
   *
   * @param guildId - The ID of the guild to get the list of templates for.
   * @returns A collection of {@link DiscordTemplate} objects assorted by template code.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild-template#get-guild-templates}
   */
  async getGuildTemplates(rest: RestManager, guildId: BigString): Promise<Camelize<DiscordTemplate>[]> {
    return await rest.get<DiscordTemplate[]>(rest.routes.guilds.templates.all(guildId));
  },
  /**
   * Gets the list of webhooks for a guild.
   *
   * @param guildId - The ID of the guild to get the list of webhooks for.
   * @returns A collection of {@link DiscordWebhook} objects assorted by webhook ID.
   *
   * @remarks
   * Requires the `MANAGE_WEBHOOKS` permission.
   *
   * @see {@link https://docs.discord.com/developers/resources/webhook#get-guild-webhooks}
   */
  async getGuildWebhooks(rest: RestManager, guildId: BigString): Promise<Camelize<DiscordWebhook>[]> {
    return await rest.get<DiscordWebhook[]>(rest.routes.guilds.webhooks(guildId));
  },
  /**
   * Gets the list of integrations attached to a guild.
   *
   * @param guildId - The ID of the guild to get the list of integrations from.
   * @returns A collection of {@link DiscordIntegration} objects assorted by integration ID.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild#get-guild-integrations}
   */
  async getIntegrations(rest: RestManager, guildId: BigString): Promise<Camelize<DiscordIntegration>[]> {
    return await rest.get<DiscordIntegration[]>(rest.routes.guilds.integrations(guildId));
  },
  /**
   * Gets an invite to a channel by its invite code.
   *
   * @param inviteCode - The invite code of the invite to get.
   * @param options - The parameters for the fetching of the invite.
   * @returns An instance of {@link DiscordInviteMetadata}.
   *
   * @see {@link https://docs.discord.com/developers/resources/invite#get-invite}
   */
  async getInvite(rest: RestManager, inviteCode: string, options?: GetInvite): Promise<Camelize<DiscordInviteMetadata>> {
    return await rest.get<DiscordInviteMetadata>(rest.routes.guilds.invite(inviteCode, options));
  },
  /**
   * Gets the list of invites for a guild.
   *
   * @param guildId - The ID of the guild to get the invites from.
   * @returns A collection of {@link DiscordInviteMetadata} objects assorted by invite code.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` or `VIEW_AUDIT_LOG` permission.
   *
   * @see {@link https://docs.discord.com/developers/resources/invite#get-invites}
   */
  async getInvites(rest: RestManager, guildId: BigString): Promise<Camelize<DiscordInviteMetadata>[]> {
    return await rest.get<DiscordInviteMetadata[]>(rest.routes.guilds.invites(guildId));
  },
  /**
   * Gets a message from a channel by the ID of the message.
   *
   * @param channelId - The ID of the channel from which to get the message.
   * @param messageId - The ID of the message to get.
   * @returns An instance of {@link DiscordMessage}.
   *
   * @remarks
   * Requires that the bot user be able to see the contents of the channel in which the message was posted.
   *
   * If getting a message from a guild channel:
   * - Requires the `READ_MESSAGE_HISTORY` permission.
   *
   * @see {@link https://docs.discord.com/developers/resources/channel#get-channel-message}
   */
  async getMessage(rest: RestManager, channelId: BigString, messageId: BigString): Promise<Camelize<DiscordMessage>> {
    return await rest.get<DiscordMessage>(rest.routes.channels.message(channelId, messageId));
  },
  /**
   * Gets multiple messages from a channel.
   *
   * @param channelId - The ID of the channel from which to get the messages.
   * @param options - The parameters for the fetching of the messages.
   * @returns Returns an array of {@link DiscordMessage} objects from newest to oldest on success.
   *
   * @remarks
   * Requires that the bot user be able to see the contents of the channel in which the messages were posted.
   *
   * If getting a messages from a guild channel:
   * - Requires the `READ_MESSAGE_HISTORY` permission.
   *
   * @see {@link https://docs.discord.com/developers/resources/channel#get-channel-messages}
   */
  async getMessages(rest: RestManager, channelId: BigString, options?: GetMessagesOptions): Promise<Camelize<DiscordMessage>[]> {
    return await rest.get<DiscordMessage[]>(rest.routes.channels.messages(channelId, options));
  },
  /**
   * Search messages in a guild.
   *
   * @remarks
   * Requires `READ_MESSAGE_HISTORY` and is restricted by the `MESSAGE_CONTENT` intent.
   *
   * @see {@link https://docs.discord.com/developers/resources/message#search-guild-messages}
   */
  async searchGuildMessages(
    rest: RestManager,
    guildId: BigString,
    options?: SearchGuildMessagesOptions,
  ): Promise<Camelize<DiscordSearchGuildMessages | DiscordSearchGuildMessagesIndexing>> {
    return await rest.get<DiscordSearchGuildMessages | DiscordSearchGuildMessagesIndexing>(rest.routes.guilds.messagesSearch(guildId, options));
  },
  /**
   * Returns a sticker pack for the given ID.
   *
   * @returns A {@link DiscordStickerPack} object.
   *
   * @see {@link https://docs.discord.com/developers/resources/sticker#get-sticker-pack}
   */
  async getStickerPack(rest: RestManager, stickerPackId: BigString): Promise<Camelize<DiscordStickerPack>> {
    return await rest.get<DiscordStickerPack>(rest.routes.stickerPack(stickerPackId));
  },
  /**
   * Returns the list of sticker packs available.
   *
   * @returns A collection of {@link DiscordStickerPack} objects assorted by sticker ID.
   *
   * @see {@link https://docs.discord.com/developers/resources/sticker#list-sticker-packs}
   */
  async getStickerPacks(rest: RestManager): Promise<Camelize<DiscordStickerPack>[]> {
    return await rest.get<DiscordStickerPack[]>(rest.routes.stickerPacks());
  },
  /**
   * Gets the initial message response to an interaction.
   *
   * @param token - The interaction token to use, provided in the original interaction.
   * @returns An instance of {@link DiscordMessage}.
   *
   * @remarks
   * Unlike `getMessage()`, this endpoint allows the bot user to act without:
   * - Needing to be able to see the contents of the channel that the message is in. (`READ_MESSAGES` permission.)
   * - Requiring the `MESSAGE_CONTENT` intent.
   *
   * Does not support ephemeral follow-up messages due to these being stateless.
   *
   * @see {@link https://docs.discord.com/developers/interactions/receiving-and-responding#get-original-interaction-response}
   */
  async getOriginalInteractionResponse(rest: RestManager, token: string): Promise<Camelize<DiscordMessage>> {
    return await rest.get<DiscordMessage>(rest.routes.interactions.responses.original(rest.applicationId, token), { unauthorized: true });
  },
  /**
   * Retrieves the list of pins in a channel.
   *
   * @param channelId - The ID of the channel to get the pins for.
   * @param options - The options for the fetching of the pins.
   * @returns A {@link DiscordGetChannelPins} objects
   *
   * @remarks
   * Requires the `VIEW_CHANNEL` permission.
   *
   * If the user is missing the `READ_MESSAGE_HISTORY` permission in the channel, then no pins will be returned.
   *
   * @see {@link https://docs.discord.com/developers/resources/message#get-channel-pins}
   */
  async getChannelPins(rest: RestManager, channelId: BigString, options?: GetChannelPinsOptions): Promise<Camelize<DiscordGetChannelPins>> {
    return await rest.get(rest.routes.channels.messagePins(channelId, options));
  },
  /**
   * Gets the pinned messages for a channel.
   *
   * @param channelId - The ID of the channel to get the pinned messages for.
   * @returns A collection of {@link DiscordMessage} objects assorted by message ID.
   *
   * @remarks
   * Requires that the bot user be able to see the contents of the channel in which the messages were posted.
   *
   * If getting a message from a guild channel:
   * - Requires the `READ_MESSAGE_HISTORY` permission.
   *
   * @see {@link https://docs.discord.com/developers/resources/message#get-pinned-messages-deprecated}
   * @deprecated Use {@link getChannelPins} instead.
   */
  async getPinnedMessages(rest: RestManager, channelId: BigString): Promise<Camelize<DiscordMessage>[]> {
    return await rest.get<DiscordMessage[]>(rest.routes.channels.pins(channelId));
  },
  /**
   * Gets the list of private archived threads for a channel.
   *
   * @param channelId - The ID of the channel to get the archived threads for.
   * @param options - The parameters for the fetching of threads.
   * @returns An instance of {@link DiscordListArchivedThreads}.
   *
   * @remarks
   * Requires the `READ_MESSAGE_HISTORY` permission.
   * Requires the `MANAGE_THREADS` permission.
   *
   * Returns threads of type {@link ChannelTypes}.GuildPrivateThread.
   *
   * Threads are ordered by the `archive_timestamp` property included in the metadata of the object in descending order.
   *
   * @see {@link https://docs.discord.com/developers/resources/channel#list-private-archived-threads}
   */
  async getPrivateArchivedThreads(
    rest: RestManager,
    channelId: BigString,
    options?: ListArchivedThreads,
  ): Promise<Camelize<DiscordListArchivedThreads>> {
    return await rest.get<DiscordListArchivedThreads>(rest.routes.channels.threads.private(channelId, options));
  },
  /**
   * Gets the list of private archived threads the bot is a member of for a channel.
   *
   * @param channelId - The ID of the channel to get the archived threads for.
   * @param options - The parameters for the fetching of threads.
   * @returns An instance of {@link DiscordListArchivedThreads}.
   *
   * @remarks
   * Requires the `READ_MESSAGE_HISTORY` permission.
   *
   * Returns threads of type {@link ChannelTypes}.GuildPrivateThread.
   *
   * Threads are ordered by the `id` property in descending order.
   *
   * @see {@link https://docs.discord.com/developers/resources/channel#list-joined-private-archived-threads}
   */
  async getPrivateJoinedArchivedThreads(
    rest: RestManager,
    channelId: BigString,
    options?: ListArchivedThreads,
  ): Promise<Camelize<DiscordListArchivedThreads>> {
    return await rest.get<DiscordListArchivedThreads>(rest.routes.channels.threads.joined(channelId, options));
  },
  /**
   * Gets the number of members that would be kicked from a guild during pruning.
   *
   * @param guildId - The ID of the guild to get the prune count of.
   * @param options - The parameters for the fetching of the prune count.
   * @returns A number indicating the number of members that would be kicked.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` and `KICK_MEMBERS` permissions.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild#get-guild-prune-count}
   */
  async getPruneCount(rest: RestManager, guildId: BigString, options?: GetGuildPruneCountQuery): Promise<Camelize<DiscordPrunedCount>> {
    return await rest.get<DiscordPrunedCount>(rest.routes.guilds.prune(guildId, options));
  },
  /**
   * Gets the list of public archived threads for a channel.
   *
   * @param channelId - The ID of the channel to get the archived threads for.
   * @param options - The parameters for the fetching of threads.
   * @returns An instance of {@link DiscordListArchivedThreads}.
   *
   * @remarks
   * Requires the `READ_MESSAGE_HISTORY` permission.
   *
   * If called on a channel of type {@link ChannelTypes}.GuildText, returns threads of type {@link ChannelTypes}.GuildPublicThread.
   * If called on a channel of type {@link ChannelTypes}.GuildNews, returns threads of type {@link ChannelTypes}.GuildNewsThread.
   *
   * Threads are ordered by the `archive_timestamp` property included in the metadata of the object in descending order.
   *
   * @see {@link https://docs.discord.com/developers/resources/channel#list-public-archived-threads}
   */
  async getPublicArchivedThreads(
    rest: RestManager,
    channelId: BigString,
    options?: ListArchivedThreads,
  ): Promise<Camelize<DiscordListArchivedThreads>> {
    return await rest.get<DiscordListArchivedThreads>(rest.routes.channels.threads.public(channelId, options));
  },
  /**
   * Gets the list of roles for a guild.
   *
   * @param guildId - The ID of the guild to get the list of roles for.
   * @returns A collection of {@link DiscordRole} objects assorted by role ID.
   *
   * @remarks
   * ⚠️ This endpoint should be used sparingly due to {@link DiscordRole} objects already being included in guild payloads.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild#get-guild-roles}
   */
  async getRoles(rest: RestManager, guildId: BigString): Promise<Camelize<DiscordRole>[]> {
    return await rest.get<DiscordRole[]>(rest.routes.guilds.roles.all(guildId));
  },
  /**
   * Gets a role by id for a guild.
   *
   * @param guildId - The ID of the guild to get role for.
   * @param roleId - The ID of the role.
   * @returns A {@link DiscordRole} object.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild#get-guild-role}
   */
  async getRole(rest: RestManager, guildId: BigString, roleId: BigString): Promise<Camelize<DiscordRole>> {
    return await rest.get<DiscordRole>(rest.routes.guilds.roles.one(guildId, roleId));
  },
  /**
   * Gets a scheduled event by its ID.
   *
   * @param guildId - The ID of the guild to get the scheduled event from.
   * @param eventId - The ID of the scheduled event to get.
   * @param options - The parameters for the fetching of the scheduled event.
   * @returns An instance of {@link DiscordScheduledEvent}.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild-scheduled-event#get-guild-scheduled-event}
   */
  async getScheduledEvent(
    rest: RestManager,
    guildId: BigString,
    eventId: BigString,
    options?: { withUserCount?: boolean },
  ): Promise<Camelize<DiscordScheduledEvent>> {
    return await rest.get<DiscordScheduledEvent>(rest.routes.guilds.events.event(guildId, eventId, options?.withUserCount));
  },
  /**
   * Gets the list of scheduled events for a guild.
   *
   * @param guildId - The ID of the guild to get the scheduled events from.
   * @param options - The parameters for the fetching of the scheduled events.
   * @returns A collection of {@link DiscordScheduledEvent} objects assorted by event ID.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild-scheduled-event#list-scheduled-events-for-guild}
   */
  async getScheduledEvents(rest: RestManager, guildId: BigString, options?: GetScheduledEvents): Promise<Camelize<DiscordScheduledEvent>[]> {
    return await rest.get<DiscordScheduledEvent[]>(rest.routes.guilds.events.events(guildId, options?.withUserCount));
  },
  /**
   * Gets the list of subscribers to a scheduled event from a guild.
   *
   * @param guildId - The ID of the guild to get the subscribers to the scheduled event from.
   * @param eventId - The ID of the scheduled event to get the subscribers of.
   * @param options - The parameters for the fetching of the subscribers.
   * @returns A collection of {@link DiscordUser} objects assorted by user ID.
   *
   * @remarks
   * Requires the `MANAGE_EVENTS` permission.
   *
   * Users are ordered by their IDs in _ascending_ order.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild-scheduled-event#get-guild-scheduled-event-users}
   */
  async getScheduledEventUsers(
    rest: RestManager,
    guildId: BigString,
    eventId: BigString,
    options?: GetScheduledEventUsers,
  ): Promise<Array<{ user: Camelize<DiscordUser>; member?: Camelize<DiscordMember> }>> {
    return await rest.get<Array<{ user: DiscordUser; member?: DiscordMember }>>(rest.routes.guilds.events.users(guildId, eventId, options));
  },
  /** Get the bots Gateway metadata that can help during the operation of large or sharded bots. */
  async getSessionInfo(rest: RestManager): Promise<Camelize<DiscordGetGatewayBot>> {
    return await restEndpoints.getGatewayBot(rest);
  },
  /**
   * Gets the stage instance associated with a stage channel, if one exists.
   *
   * @param channelId - The ID of the stage channel the stage instance is associated with.
   * @returns An instance of {@link DiscordStageInstance}.
   *
   * @see {@link https://docs.discord.com/developers/resources/stage-instance#get-stage-instance}
   */
  async getStageInstance(rest: RestManager, channelId: BigString): Promise<Camelize<DiscordStageInstance>> {
    return await rest.get<DiscordStageInstance>(rest.routes.channels.stage(channelId));
  },
  /**
   * Returns the current user's voice state in the guild.
   *
   * @param guildId - The ID of the guild to get the voice state from.
   * @returns An instance of {@link DiscordVoiceState}.
   *
   * @see {@link https://docs.discord.com/developers/resources/voice#get-current-user-voice-state}
   */
  async getOwnVoiceState(rest: RestManager, guildId: BigString): Promise<Camelize<DiscordVoiceState>> {
    return await rest.get<DiscordVoiceState>(rest.routes.guilds.voice(guildId));
  },
  /**
   * Returns the specified user's voice state in the guild.
   *
   * @param guildId - The ID of the guild to get the voice state from.
   * @param userId - The ID of the user to get the voice state from
   * @returns An instance of {@link DiscordVoiceState}.
   *
   * @remarks
   * If the specified user is connected to a voice channel, the current user must have permission to connect to the channel.
   *
   * @see {@link https://docs.discord.com/developers/resources/voice#get-user-voice-state}
   */
  async getUserVoiceState(rest: RestManager, guildId: BigString, userId: BigString): Promise<Camelize<DiscordVoiceState>> {
    return await rest.get<DiscordVoiceState>(rest.routes.guilds.voice(guildId, userId));
  },
  /**
   * Returns a sticker object for the given sticker ID.
   *
   * @param stickerId The ID of the sticker to get
   * @returns A {@link DiscordSticker}
   *
   * @see {@link https://docs.discord.com/developers/resources/sticker#get-sticker}
   */
  async getSticker(rest: RestManager, stickerId: BigString): Promise<Camelize<DiscordSticker>> {
    return await rest.get<DiscordSticker>(rest.routes.sticker(stickerId));
  },
  /**
   * Gets a thread member by their user ID.
   *
   * @param channelId - The ID of the thread to get the thread member of.
   * @param userId - The user ID of the thread member to get.
   * @param options - The parameters for the fetching of the thread member.
   * @returns An instance of {@link DiscordThreadMember}.
   *
   * @see {@link https://docs.discord.com/developers/resources/channel#get-thread-member}
   */
  async getThreadMember(
    rest: RestManager,
    channelId: BigString,
    userId: BigString,
    options?: GetThreadMember,
  ): Promise<Camelize<DiscordThreadMember>> {
    return await rest.get<DiscordThreadMember>(rest.routes.channels.threads.getUser(channelId, userId, options));
  },
  /**
   * Gets the list of thread members for a thread.
   *
   * @param channelId - The ID of the thread to get the thread members of.
   * @param options - The parameters for the fetching of the thread members.
   * @returns A collection of {@link DiscordThreadMember} assorted by user ID.
   *
   * @remarks
   * Requires the application to have the `GUILD_MEMBERS` privileged intent enabled.
   *
   * @see {@link https://docs.discord.com/developers/resources/channel#list-thread-members}
   */
  async getThreadMembers(rest: RestManager, channelId: BigString, options?: ListThreadMembers): Promise<Camelize<DiscordThreadMember>[]> {
    return await rest.get<DiscordThreadMember[]>(rest.routes.channels.threads.members(channelId, options));
  },
  /**
   * Gets the list of users that reacted with an emoji to a message.
   *
   * @param channelId - The ID of the channel the message to get the users for is in.
   * @param messageId - The ID of the message to get the users for.
   * @param reaction - The reaction for which to get the users.
   * @param options - The parameters for the fetching of the users.
   * @returns A collection of {@link DiscordUser} objects assorted by user ID.
   *
   * @see {@link https://docs.discord.com/developers/resources/channel#get-reactions}
   */
  async getReactions(
    rest: RestManager,
    channelId: BigString,
    messageId: BigString,
    reaction: string,
    options?: GetReactions,
  ): Promise<Camelize<DiscordUser>[]> {
    return await rest.get<DiscordUser[]>(rest.routes.channels.reactions.message(channelId, messageId, reaction, options));
  },
  /**
   * Get a user's data from the api
   *
   * @param id The user's id
   * @returns {DiscordUser}
   */
  async getUser(rest: RestManager, id: BigString): Promise<Camelize<DiscordUser>> {
    return await rest.get<DiscordUser>(rest.routes.user(id));
  },
  /**
   * Get the current user data.
   *
   * @param bearerToken - The access token of the user
   * @returns {DiscordUser}
   *
   * @remarks
   * This requires the `identify` scope.
   *
   * To get the mail this also requires the `email` scope
   */
  async getCurrentUser(rest: RestManager, bearerToken: string): Promise<Camelize<DiscordUser>> {
    return await rest.get<DiscordUser>(rest.routes.currentUser(), {
      headers: {
        authorization: `Bearer ${bearerToken}`,
      },
      unauthorized: true,
    });
  },
  /**
   * Get the current user connections.
   *
   * @param bearerToken - The access token of the user
   * @returns {DiscordConnection[]}
   *
   * @remarks
   * This requires the `connections` scope.
   */
  async getUserConnections(rest: RestManager, bearerToken: string): Promise<Camelize<DiscordConnection>[]> {
    return await rest.get<DiscordConnection[]>(rest.routes.oauth2.connections(), {
      headers: {
        authorization: `Bearer ${bearerToken}`,
      },
      unauthorized: true,
    });
  },
  /**
   * Get the current user application role connection for the application.
   *
   * @param bearerToken - The access token of the user
   * @param applicationId - The id of the application to get the role connection
   * @returns {DiscordApplicationRoleConnection}
   *
   * @remarks
   * The access token requires the `role_connections.write` scope.
   *
   * @see {@link https://docs.discord.com/developers/resources/user#get-user-application-role-connection}
   */
  async getUserApplicationRoleConnection(
    rest: RestManager,
    bearerToken: string,
    applicationId: BigString,
  ): Promise<Camelize<DiscordApplicationRoleConnection>> {
    return await rest.get<DiscordApplicationRoleConnection>(rest.routes.oauth2.roleConnections(applicationId), {
      headers: {
        authorization: `Bearer ${bearerToken}`,
      },
      unauthorized: true,
    });
  },
  /**
   * Gets information about the vanity url of a guild.
   *
   * @param guildId - The ID of the guild to get the vanity url information for.
   * @returns An instance of {@link DiscordVanityUrl}.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * The `code` property will be `null` if the guild does not have a set vanity url.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild#get-guild-vanity-url}
   */
  async getVanityUrl(rest: RestManager, guildId: BigString): Promise<Camelize<DiscordVanityUrl>> {
    return await rest.get<DiscordVanityUrl>(rest.routes.guilds.vanity(guildId));
  },
  /**
   * Gets the list of voice regions for a guild.
   *
   * @param guildId - The ID of the guild to get the voice regions for.
   * @returns A collection of {@link DiscordVoiceRegion} objects assorted by voice region ID.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild#get-guild-voice-regions}
   */
  async getVoiceRegions(rest: RestManager, guildId: BigString): Promise<Camelize<DiscordVoiceRegion>[]> {
    return await rest.get<DiscordVoiceRegion[]>(rest.routes.guilds.regions(guildId));
  },
  /**
   * Gets a webhook by its ID.
   *
   * @param webhookId - The ID of the webhook to get.
   * @returns An instance of {@link DiscordWebhook}.
   *
   * @remarks
   * Requires the `MANAGE_WEBHOOKS` permission unless the application making the request owns the webhook.
   *
   * @see {@link https://docs.discord.com/developers/resources/webhook#get-webhook}
   */
  async getWebhook(rest: RestManager, webhookId: BigString): Promise<Camelize<DiscordWebhook>> {
    return await rest.get<DiscordWebhook>(rest.routes.webhooks.id(webhookId));
  },
  /**
   * Gets a webhook message by its ID.
   *
   * @param webhookId - The ID of the webhook to get a message of.
   * @param token - The webhook token, used to get webhook messages.
   * @param messageId - the ID of the webhook message to get.
   * @param options - The parameters for the fetching of the message.
   * @returns An instance of {@link DiscordMessage}.
   *
   * @see {@link https://docs.discord.com/developers/resources/webhook#get-webhook-message}
   */
  async getWebhookMessage(
    rest: RestManager,
    webhookId: BigString,
    token: string,
    messageId: BigString,
    options?: GetWebhookMessageOptions,
  ): Promise<Camelize<DiscordMessage>> {
    return await rest.get<DiscordMessage>(rest.routes.webhooks.message(webhookId, token, messageId, options), {
      unauthorized: true,
    });
  },
  /**
   * Gets a webhook using the webhook token, thereby bypassing the need for authentication + permissions.
   *
   * @param webhookId - The ID of the webhook to get.
   * @param token - The webhook token, used to get the webhook.
   * @returns An instance of {@link DiscordWebhook}.
   *
   * @see {@link https://docs.discord.com/developers/resources/webhook#get-webhook-with-token}
   */
  async getWebhookWithToken(rest: RestManager, webhookId: BigString, token: string): Promise<Camelize<DiscordWebhook>> {
    return await rest.get<DiscordWebhook>(rest.routes.webhooks.webhook(webhookId, token), {
      unauthorized: true,
    });
  },
  /**
   * Gets the welcome screen for a guild.
   *
   * @param guildId - The ID of the guild to get the welcome screen for.
   * @returns An instance of {@link DiscordWelcomeScreen}.
   *
   * @remarks
   * If the welcome screen is not enabled:
   * - Requires the `MANAGE_GUILD` permission.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild#get-guild-welcome-screen}
   */
  async getWelcomeScreen(rest: RestManager, guildId: BigString): Promise<Camelize<DiscordWelcomeScreen>> {
    return await rest.get<DiscordWelcomeScreen>(rest.routes.guilds.welcome(guildId));
  },
  /**
   * Gets the guild widget by guild ID.
   *
   * @param guildId - The ID of the guild to get the widget of.
   * @returns An instance of {@link DiscordGuildWidget}.
   *
   * @remarks
   * Fires an `INVITE_CREATED` Gateway event when an invite channel is defined and a new `Invite` is generated.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild#get-guild-widget}
   */
  async getWidget(rest: RestManager, guildId: BigString): Promise<Camelize<DiscordGuildWidget>> {
    return await rest.get<DiscordGuildWidget>(rest.routes.guilds.widgetJson(guildId));
  },
  /**
   * Gets the settings of a guild's widget.
   *
   * @param guildId - The ID of the guild to get the widget of.
   * @returns An instance of {@link DiscordGuildWidgetSettings}.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild#get-guild-widget-settings}
   */
  async getWidgetSettings(rest: RestManager, guildId: BigString): Promise<Camelize<DiscordGuildWidgetSettings>> {
    return await rest.get<DiscordGuildWidgetSettings>(rest.routes.guilds.widget(guildId));
  },
  /**
   * Adds the bot user to a thread.
   *
   * @param channelId - The ID of the thread to add the bot user to.
   *
   * @remarks
   * Requires the thread not be archived.
   *
   * Fires a _Thread Members Update_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/channel#join-thread}
   */
  async joinThread(rest: RestManager, channelId: BigString): Promise<void> {
    await rest.put(rest.routes.channels.threads.me(channelId));
  },
  /**
   * Leaves a guild.
   *
   * @param guildId - The ID of the guild to leave.
   *
   * @remarks
   * Fires a _Guild Delete_ event.
   *
   * @see {@link https://docs.discord.com/developers/resources/user#leave-guild}
   */
  async leaveGuild(rest: RestManager, guildId: BigString): Promise<void> {
    await rest.delete(rest.routes.guilds.leave(guildId));
  },
  /**
   * Removes the bot user from a thread.
   *
   * @param channelId - The ID of the thread to remove the bot user from.
   *
   * @remarks
   * Requires the thread not be archived.
   *
   * Fires a _Thread Members Update_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/channel#leave-thread}
   */
  async leaveThread(rest: RestManager, channelId: BigString): Promise<void> {
    await rest.delete(rest.routes.channels.threads.me(channelId));
  },
  /**
   * Cross-posts a message posted in an announcement channel to subscribed channels.
   *
   * @param channelId - The ID of the announcement channel.
   * @param messageId - The ID of the message to cross-post.
   * @returns An instance of the cross-posted {@link DiscordMessage}.
   *
   * @remarks
   * Requires the `SEND_MESSAGES` permission.
   *
   * If not cross-posting own message:
   * - Requires the `MANAGE_MESSAGES` permission.
   *
   * Fires a _Message Create_ event in the guilds the subscribed channels are in.
   *
   * @see {@link https://docs.discord.com/developers/resources/channel#crosspost-message}
   */
  async publishMessage(rest: RestManager, channelId: BigString, messageId: BigString): Promise<Camelize<DiscordMessage>> {
    return await rest.post<DiscordMessage>(rest.routes.channels.crosspost(channelId, messageId));
  },
  /**
   * Removes a role from a member.
   *
   * @param guildId - The ID of the guild the member to remove the role from is in.
   * @param userId - The user ID of the member to remove the role from.
   * @param roleId - The ID of the role to remove from the member.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   *
   * @remarks
   * Requires the `MANAGE_ROLES` permission.
   *
   * Fires a _Guild Member Update_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild#remove-guild-member-role}
   */
  async removeRole(rest: RestManager, guildId: BigString, userId: BigString, roleId: BigString, reason?: string): Promise<void> {
    await rest.delete(rest.routes.guilds.roles.member(guildId, userId, roleId), { reason });
  },
  /**
   * Removes a member from a thread.
   *
   * @param channelId - The ID of the thread to remove the thread member of.
   * @param userId - The user ID of the thread member to remove.
   *
   * @remarks
   * If the thread is of type {@link ChannelTypes}.GuildPrivateThread, requires to be the creator of the thread.
   * Otherwise, requires the `MANAGE_THREADS` permission.
   *
   * Requires the thread not be archived.
   *
   * Fires a _Thread Members Update_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/channel#remove-thread-member}
   */
  async removeThreadMember(rest: RestManager, channelId: BigString, userId: BigString): Promise<void> {
    await rest.delete(rest.routes.channels.threads.user(channelId, userId));
  },
  /**
   * Removes a member from a Group DM.
   *
   * @param channelId - The ID of the channel to remove the recipient user of.
   * @param userId - The user ID of the user to remove.
   *
   * @see {@link https://docs.discord.com/developers/resources/channel#group-dm-remove-recipient}
   */
  async removeDmRecipient(rest: RestManager, channelId: BigString, userId: BigString): Promise<void> {
    await rest.delete(rest.routes.channels.dmRecipient(channelId, userId));
  },
  /**
   * Sends a message to a channel.
   *
   * @param channelId - The ID of the channel to send the message in.
   * @param options - The parameters for the creation of the message.
   * @returns An instance of the created {@link DiscordMessage}.
   *
   * @remarks
   * Requires that the bot user be able to see the contents of the channel the message is to be sent in.
   *
   * If sending a message to a guild channel:
   * - Requires the `SEND_MESSAGES` permission.
   *
   * If sending a TTS message:
   * - Requires the `SEND_TTS_MESSAGES` permission.
   *
   * If sending a message as a reply to another message:
   * - Requires the `READ_MESSAGE_HISTORY` permission.
   * - The message being replied to cannot be a system message.
   *
   * ⚠️ The maximum size of a request (accounting for any attachments and message content) for bot users is _8 MiB_.
   *
   * Fires a _Message Create_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/channel#create-message}
   */
  async sendMessage(rest: RestManager, channelId: BigString, options: CreateMessageOptions): Promise<Camelize<DiscordMessage>> {
    return await rest.post<DiscordMessage>(rest.routes.channels.messages(channelId), { body: options, files: options.files });
  },
  /**
   * Sends a follow-up message to an interaction.
   *
   * @param token - The interaction token to use, provided in the original interaction.
   * @param options - The parameters for the creation of the message.
   * @returns An instance of the created {@link DiscordMessage}.
   *
   * @remarks
   * ⚠️ Interaction tokens are only valid for _15 minutes_.
   *
   * By default, mentions are suppressed. To enable mentions, pass a mention object with the callback data.
   *
   * Unlike `sendMessage()`, this endpoint allows the bot user to act without:
   * - Needing to be able to see the contents of the channel that the message is in. (`READ_MESSAGES` permission.)
   * - Requiring the `MESSAGE_CONTENT` intent.
   *
   * Apps are limited to 5 followup messages per interaction if it was initiated from a user-installed app and isn't installed in the server
   * You can check if it was initiated from a user-installed app that isn't installed in the server by checking if {@link DiscordInteraction.authorizing_integration_owners | authorizingIntegrationOwners} only contains {@link DiscordApplicationIntegrationType.UserInstall | UserInstall}.
   *
   * Fires a _Message Create_ event.
   *
   * @see {@link https://docs.discord.com/developers/interactions/receiving-and-responding#create-followup-message}
   */
  async sendFollowupMessage(rest: RestManager, token: string, options: InteractionCallbackData): Promise<Camelize<DiscordMessage>> {
    return await rest.post(rest.routes.webhooks.webhook(rest.applicationId, token), {
      body: options,
      files: options.files,
      unauthorized: true,
    });
  },
  /**
   * Sends a response to an interaction.
   *
   * @param interactionId - The ID of the interaction to respond to.
   * @param token - The interaction token to use, provided in the original interaction.
   * @param options - The parameters for the creation of the message.
   * @param params - The query parameters for the response of the callback
   * @returns Nothing or the {@link DiscordInteractionCallbackResponse} if withResponse param is true
   *
   * @remarks
   * ⚠️ Interaction tokens are only valid for _15 minutes_.
   *
   * By default, mentions are suppressed. To enable mentions, pass a mention object with the callback data.
   *
   * Unlike `sendMessage()`, this endpoint allows the bot user to act without:
   * - Needing to be able to see the contents of the channel that the message is in. (`READ_MESSAGES` permission.)
   * - Requiring the `MESSAGE_CONTENT` intent.
   *
   * Fires a _Message Create_ event.
   *
   * @see {@link https://docs.discord.com/developers/interactions/receiving-and-responding#create-interaction-response}
   */
  async sendInteractionResponse(
    rest: RestManager,
    interactionId: BigString,
    token: string,
    options: InteractionResponse,
    params?: InteractionCallbackOptions,
  ): Promise<void | Camelize<DiscordInteractionCallbackResponse>> {
    return await rest.post<void | DiscordInteractionCallbackResponse>(rest.routes.interactions.responses.callback(interactionId, token, params), {
      body: options,
      files: options.data?.files,
      runThroughQueue: false,
      unauthorized: true,
    });
  },
  /**
   * Creates a thread, using an existing message as its point of origin.
   *
   * @param channelId - The ID of the channel in which to create the thread.
   * @param messageId - The ID of the message to use as the thread's point of origin.
   * @param options - The parameters to use for the creation of the thread.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns An instance of the created {@link DiscordChannel}.
   *
   * @remarks
   * If called on a channel of type {@link ChannelTypes}.GuildText, creates a {@link ChannelTypes}.GuildPublicThread.
   * If called on a channel of type {@link ChannelTypes}.GuildNews, creates a {@link ChannelTypes}.GuildNewsThread.
   * Does not work on channels of type {@link ChannelTypes}.GuildForum.
   *
   * The ID of the created thread will be the same as the ID of the source message.
   *
   * Fires a _Thread Create_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/channel#start-thread-from-message}
   */
  async startThreadWithMessage(
    rest: RestManager,
    channelId: BigString,
    messageId: BigString,
    options: StartThreadWithMessage,
    reason?: string,
  ): Promise<Camelize<DiscordChannel>> {
    return await rest.post<DiscordChannel>(rest.routes.channels.threads.message(channelId, messageId), { body: options, reason });
  },
  /**
   * Creates a thread without using a message as the thread's point of origin.
   *
   * @param channelId - The ID of the channel in which to create the thread.
   * @param options - The parameters to use for the creation of the thread.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns An instance of the created {@link DiscordChannel | Thread}.
   *
   * @remarks
   * Creating a private thread requires the server to be boosted.
   *
   * Fires a _Thread Create_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/channel#start-thread-without-message}
   */
  async startThreadWithoutMessage(
    rest: RestManager,
    channelId: BigString,
    options: StartThreadWithoutMessage,
    reason?: string,
  ): Promise<Camelize<DiscordChannel>> {
    return await rest.post<DiscordChannel>(rest.routes.channels.threads.all(channelId), { body: options, reason });
  },
  /**
   * Get a list of users that voted for this specific answer.
   *
   * @param channelId - The ID of the channel in which the message with the poll lives
   * @param messageId - The ID of the message in which the poll lives
   * @param answerId - The ID of the answer to get the users that voted that answer
   * @param options - The options for the request
   * @returns The list of users that voted for the specific answer.
   */
  async getPollAnswerVoters(
    rest: RestManager,
    channelId: BigString,
    messageId: BigString,
    answerId: number,
    options?: GetPollAnswerVotes,
  ): Promise<Camelize<DiscordGetAnswerVotesResponse>> {
    return await rest.get<DiscordGetAnswerVotesResponse>(rest.routes.channels.polls.votes(channelId, messageId, answerId, options));
  },
  /**
   * Immediately ends the poll.
   *
   * @param channelId - The ID of the channel in which the message with the poll lives
   * @param messageId - The ID of the message in which the poll lives
   * @returns The message with the expired poll
   *
   * @remarks
   * You cannot end polls from other users.
   *
   * Fires a _Message Update_ gateway event
   */
  async endPoll(rest: RestManager, channelId: BigString, messageId: BigString): Promise<Camelize<DiscordMessage>> {
    return await rest.post<DiscordMessage>(rest.routes.channels.polls.expire(channelId, messageId));
  },
  /**
   * Synchronises a template with the current state of a guild.
   *
   * @param guildId - The ID of the guild to synchronise a template of.
   * @returns An instance of the edited {@link DiscordTemplate}.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   *
   * Fires a _Guild Update_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild-template#get-guild-templates}
   */
  async syncGuildTemplate(rest: RestManager, guildId: BigString): Promise<Camelize<DiscordTemplate>> {
    return await rest.put<DiscordTemplate>(rest.routes.guilds.templates.all(guildId));
  },
  /**
   * Triggers a typing indicator for the specified channel, which expires after 10 seconds.
   *
   * @param channelId - The ID of the channel in which to trigger the typing indicator.
   *
   * @remarks
   * Generally bots should **not** use this route.
   * However, if a bot is responding to a command and expects the computation to take a few seconds,
   * this endpoint may be called to let the user know that the bot is processing their message.
   *
   * Fires a _Typing Start_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/channel#trigger-typing-indicator}
   */
  async triggerTypingIndicator(rest: RestManager, channelId: BigString): Promise<void> {
    await rest.post(rest.routes.channels.typing(channelId));
  },
  /**
   * Re-registers the list of global application commands, overwriting the previous commands completely.
   *
   * @param commands - The list of commands to use to overwrite the previous list.
   * @param options - Additional options for the endpoint.
   * @returns A collection of {@link DiscordApplicationCommand} objects assorted by command ID.
   *
   * @remarks
   * ❗ Commands that are not present in the `commands` array will be __deleted__.
   *
   * ⚠️ Commands that do not already exist will count towards the daily limit of _200_ new commands.
   *
   * When using the bearer token the token needs the `applications.commands.update` scope and must be a `Client grant` token.
   *  You will be able to update only your own application commands
   *
   * @see {@link https://docs.discord.com/developers/interactions/application-commands#bulk-overwrite-global-application-commands}
   */
  async upsertGlobalApplicationCommands(
    rest: RestManager,
    commands: CreateApplicationCommand[],
    options?: UpsertGlobalApplicationCommandOptions,
  ): Promise<Camelize<DiscordApplicationCommand>[]> {
    const restOptions: MakeRequestOptions = { body: commands };

    if (options?.bearerToken) {
      restOptions.unauthorized = true;
      restOptions.headers = {
        authorization: `Bearer ${options.bearerToken}`,
      };
    }

    return await rest.put<DiscordApplicationCommand[]>(rest.routes.interactions.commands.commands(rest.applicationId), restOptions);
  },
  /**
   * Re-registers the list of application commands registered in a guild, overwriting the previous commands completely.
   *
   * @param guildId - The ID of the guild whose list of commands to overwrite.
   * @param commands - The list of commands to use to overwrite the previous list.
   * @param options - Additional options for the endpoint.
   * @returns A collection of {@link DiscordApplicationCommand} objects assorted by command ID.
   *
   * @remarks
   * ❗ Commands that are not present in the `commands` array will be __deleted__.
   *
   * ⚠️ Commands that do not already exist will count towards the daily limit of _200_ new commands.
   *
   * When using the bearer token the token needs the `applications.commands.update` scope and must be a `Client grant` token.
   *  You will be able to update only your own application commands
   *
   * @see {@link https://docs.discord.com/developers/interactions/application-commands#bulk-overwrite-guild-application-commands}
   */
  async upsertGuildApplicationCommands(
    rest: RestManager,
    guildId: BigString,
    commands: CreateApplicationCommand[],
    options?: UpsertGuildApplicationCommandOptions,
  ): Promise<Camelize<DiscordApplicationCommand>[]> {
    const restOptions: MakeRequestOptions = { body: commands };

    if (options?.bearerToken) {
      restOptions.unauthorized = true;
      restOptions.headers = {
        authorization: `Bearer ${options.bearerToken}`,
      };
    }

    return await rest.put<DiscordApplicationCommand[]>(rest.routes.interactions.commands.guilds.all(rest.applicationId, guildId), restOptions);
  },
  /**
   * Bans a user from a guild.
   *
   * @param guildId - The ID of the guild to ban the user from.
   * @param userId - The ID of the user to ban from the guild.
   * @param options - The parameters for the creation of the ban.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   *
   * @remarks
   * Requires the `BAN_MEMBERS` permission.
   *
   * Fires a _Guild Ban Add_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild#create-guild-ban}
   */
  async banMember(rest: RestManager, guildId: BigString, userId: BigString, options?: CreateGuildBan, reason?: string): Promise<void> {
    await rest.put<void>(rest.routes.guilds.members.ban(guildId, userId), { body: options, reason });
  },
  /**
   * Bans up to 200 users from a guild.
   *
   * @param guildId - The ID of the guild to ban the users from.
   * @param options - The users to ban and the other options for the ban.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   *
   * @remarks
   * Requires the `BAN_MEMBERS` and `MANAGE_GUILD` permissions.
   *
   * If all provided users fail to be banned, discord will respond with an error (code: `500000: Failed to ban users`)
   *
   * Fires as many _Guild Ban Add_ gateway events as many user where banned.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild#bulk-guild-ban}
   */
  async bulkBanMembers(rest: RestManager, guildId: BigString, options: CreateGuildBulkBan, reason?: string): Promise<Camelize<DiscordBulkBan>> {
    return await rest.post<DiscordBulkBan>(rest.routes.guilds.members.bulkBan(guildId), { body: options, reason });
  },
  /**
   * Edits the nickname of the bot user.
   *
   * @param guildId - The ID of the guild to edit the nickname of the bot user in.
   * @param options - The parameters for the edit of the nickname.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns An instance of the edited {@link DiscordMember}
   *
   * @remarks
   * Fires a _Guild Member Update_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild#modify-current-member}
   */
  async editCurrentMember(rest: RestManager, guildId: BigString, options: ModifyCurrentMember, reason?: string): Promise<Camelize<DiscordMember>> {
    return await rest.patch<DiscordMember>(rest.routes.guilds.members.bot(guildId), { body: options, reason });
  },
  /**
   * Edits a member's properties.
   *
   * @param guildId - The ID of the guild to edit the member of.
   * @param userId - The user ID of the member to edit.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @param options - The parameters for the edit of the user.
   *
   * @remarks
   * This endpoint requires various permissions depending on what is edited about the member.
   * To find out the required permission to enact a change, read the documentation of this endpoint's {@link ModifyGuildMember | parameters}.
   *
   * Fires a _Guild Member Update_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild#modify-guild-member}
   */
  async editMember(
    rest: RestManager,
    guildId: BigString,
    userId: BigString,
    options: ModifyGuildMember,
    reason?: string,
  ): Promise<Camelize<DiscordMember>> {
    return await rest.patch<DiscordMemberWithUser>(rest.routes.guilds.members.member(guildId, userId), { body: options, reason });
  },
  /**
   * Gets the current member object.
   *
   * @param bearerToken - The access token of the user
   * @param guildId - The ID of the guild to get the member object for.
   * @returns An instance of {@link DiscordMemberWithUser}.
   *
   * @remarks
   * The access tokens needs the `guilds.members.read` scope
   *
   * @see {@link https://docs.discord.com/developers/resources/user#get-current-user-guild-member}
   */
  async getCurrentMember(rest: RestManager, guildId: BigString, bearerToken: string): Promise<Camelize<DiscordMemberWithUser>> {
    return await rest.get<DiscordMemberWithUser>(rest.routes.guilds.members.currentMember(guildId), {
      headers: {
        authorization: `Bearer ${bearerToken}`,
      },
      unauthorized: true,
    });
  },
  /**
   * Gets the member object by user ID.
   *
  
   * @param guildId - The ID of the guild to get the member object for.
   * @param userId - The ID of the user to get the member object for.
   * @returns An instance of {@link DiscordMemberWithUser}.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild#get-guild-member}
   */
  async getMember(rest: RestManager, guildId: BigString, userId: BigString): Promise<Camelize<DiscordMemberWithUser>> {
    return await rest.get<DiscordMemberWithUser>(rest.routes.guilds.members.member(guildId, userId));
  },
  /**
   * Gets the list of members for a guild.
   *
   * @param guildId - The ID of the guild to get the list of members for.
   * @param options - The parameters for the fetching of the members.
   * @returns A collection of {@link DiscordMemberWithUser} objects assorted by user ID.
   *
   * @remarks
   * Requires the `GUILD_MEMBERS` intent.
   *
   * ⚠️ It is not recommended to use this endpoint with very large bots. Instead, opt to use `fetchMembers()`:
   * REST communication only permits 50 requests to be made per second, while gateways allow for up to 120 requests
   * per minute per shard. For more information, read {@link https://docs.discord.com/developers/topics/rate-limits#rate-limits}.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild#list-guild-members}
   * @see {@link https://docs.discord.com/developers/events/gateway-events#request-guild-members}
   * @see {@link https://docs.discord.com/developers/topics/rate-limits#rate-limits}
   */
  async getMembers(rest: RestManager, guildId: BigString, options: ListGuildMembers): Promise<Camelize<DiscordMemberWithUser>[]> {
    return await rest.get<DiscordMemberWithUser[]>(rest.routes.guilds.members.members(guildId, options));
  },
  /**
   * Returns a serialized activity instance, if it exists. Useful for preventing unwanted activity sessions.
   *
   * @param applicationId - The ID of the application
   * @param instanceId - The ID of the activity instance
   */
  async getApplicationActivityInstance(rest: RestManager, applicationId: BigString, instanceId: string): Promise<Camelize<DiscordActivityInstance>> {
    return await rest.get<DiscordActivityInstance>(rest.routes.applicationActivityInstance(applicationId, instanceId));
  },
  /**
   * Kicks a member from a guild.
   *
  
   * @param guildId - The ID of the guild to kick the member from.
   * @param userId - The user ID of the member to kick from the guild.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   *
   * @remarks
   * Requires the `KICK_MEMBERS` permission.
   *
   * Fires a _Guild Member Remove_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild#remove-guild-member}
   */
  async kickMember(rest: RestManager, guildId: BigString, userId: BigString, reason?: string): Promise<void> {
    await rest.delete(rest.routes.guilds.members.member(guildId, userId), {
      reason,
    });
  },
  /**
   * Pins a message in a channel.
   *
   * @param channelId - The ID of the channel where the message is to be pinned.
   * @param messageId - The ID of the message to pin.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   *
   * @remarks
   * Requires the `PIN_MESSAGES` permission.
   *
   * Fires a _Channel Pins Update_ event.
   *
   * @see {@link https://docs.discord.com/developers/resources/message#pin-message}
   */
  async pinMessage(rest: RestManager, channelId: BigString, messageId: BigString, reason?: string): Promise<void> {
    await rest.put(rest.routes.channels.messagePin(channelId, messageId), { reason });
  },
  /**
   * Initiates the process of pruning inactive members.
   *
  
   * @param guildId - The ID of the guild to prune the members of.
   * @param options - The parameters for the pruning of members.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   * @returns A number indicating how many members were pruned.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` and `KICK_MEMBERS` permissions.
   *
   * ❗ Requests to this endpoint will time out for large guilds. To prevent this from happening, set the {@link BeginGuildPrune.computePruneCount} property of the options object parameter to `false`. This will begin the process of pruning, and immediately return `undefined`, rather than wait for the process to complete before returning the actual count of members that have been kicked.
   *
   * ⚠️ By default, this process will not remove members with a role. To include the members who have a _particular subset of roles_, specify the role(s) in the {@link BeginGuildPrune.includeRoles | includeRoles} property of the options object parameter.
   *
   * Fires a _Guild Member Remove_ gateway event for every member kicked.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild#begin-guild-prune}
   */
  async pruneMembers(rest: RestManager, guildId: BigString, options: BeginGuildPrune, reason?: string): Promise<{ pruned: number | null }> {
    return await rest.post<{ pruned: number | null }>(rest.routes.guilds.members.prune(guildId), { body: options, reason });
  },
  /**
   * Gets the list of members whose usernames or nicknames start with a provided string.
   *
  
   * @param guildId - The ID of the guild to search in.
   * @param query - The string to match usernames or nicknames against.
   * @param options - The parameters for searching through the members.
   * @returns A collection of {@link DiscordMember} objects assorted by user ID.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild#search-guild-members}
   */
  async searchMembers(
    rest: RestManager,
    guildId: BigString,
    query: string,
    options?: Omit<SearchMembers, 'query'>,
  ): Promise<Camelize<DiscordMemberWithUser>[]> {
    return await rest.get<DiscordMemberWithUser[]>(rest.routes.guilds.members.search(guildId, query, options));
  },
  /**
   * Unbans a user from a guild.
   *
   * @param guildId - The ID of the guild to unban the user in.
   * @param userId - The ID of the user to unban.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   *
   * @remarks
   * Requires the `BAN_MEMBERS` permission.
   *
   * Fires a _Guild Ban Remove_ gateway event.
   *
   * @see {@link https://docs.discord.com/developers/resources/guild#remove-guild-ban}
   */
  async unbanMember(rest: RestManager, guildId: BigString, userId: BigString, reason?: string): Promise<void> {
    await rest.delete(rest.routes.guilds.members.ban(guildId, userId), { reason });
  },
  /**
   * Unpin a message in a channel.
   *
   * @param channelId - The ID of the channel where the message is pinned.
   * @param messageId - The ID of the message to unpin.
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   *
   * @remarks
   * Requires the `PIN_MESSAGES` permission.
   *
   * Fires a _Channel Pins Update_ event.
   *
   * @see {@link https://docs.discord.com/developers/resources/message#unpin-message}
   */
  async unpinMessage(rest: RestManager, channelId: BigString, messageId: BigString, reason?: string): Promise<void> {
    await rest.delete(rest.routes.channels.messagePin(channelId, messageId), { reason });
  },
  /**
   * Get the guild onboarding
   *
   * @param guildId - The guild to get the onboarding from
   */
  async getGuildOnboarding(rest: RestManager, guildId: BigString): Promise<Camelize<DiscordGuildOnboarding>> {
    return await rest.get<DiscordGuildOnboarding>(rest.routes.guilds.onboarding(guildId));
  },
  /**
   * Modifies the onboarding configuration of the guild.
   *
   * @param guildId - The guild to edit the onboarding from
   * @param {string} [reason] - An optional reason for the action, to be included in the audit log.
   *
   * @remarks
   * Requires the `MANAGE_GUILD` and `MANAGE_ROLES` permissions.
   *
   * Onboarding enforces constraints when enabled. These constraints are:
   *  - at least 7 default channels
   *  - at least 5 of the 7 channels must allow sending messages to the \@everyone role
   *
   * The `mode` field modifies what is considered when enforcing these constraints.
   */
  async editGuildOnboarding(
    rest: RestManager,
    guildId: BigString,
    options: EditGuildOnboarding,
    reason?: string,
  ): Promise<Camelize<DiscordGuildOnboarding>> {
    return await rest.put<DiscordGuildOnboarding>(rest.routes.guilds.onboarding(guildId), {
      body: options,
      reason,
    });
  },
  /**
   * Modifies the incident actions of the guild.
   *
   * @param guildId - The guild to edit the incident actions from
   * @param options - The options for the incident actions
   *
   * @remarks
   * Requires the `MANAGE_GUILD` permission.
   */
  async modifyGuildIncidentActions(
    rest: RestManager,
    guildId: BigString,
    options: ModifyGuildIncidentActions,
  ): Promise<Camelize<DiscordIncidentsData>> {
    return await rest.put<DiscordIncidentsData>(rest.routes.guilds.incidentActions(guildId), { body: options });
  },
  /**
   * Returns all entitlements for a given app, active and expired.
   *
   * @param applicationId - The id of the application to get the entitlements
   * @param {GetEntitlements} [options] - The optional query params for the endpoint
   */
  async listEntitlements(rest: RestManager, applicationId: BigString, options?: GetEntitlements): Promise<Camelize<DiscordEntitlement>[]> {
    return await rest.get<DiscordEntitlement[]>(rest.routes.monetization.entitlements(applicationId, options));
  },
  /**
   * Returns an entitlement.
   *
   * @param applicationId - The id of the application to get the entitlement
   * @param entitlementId - The id of the entitlement to get
   */
  async getEntitlement(rest: RestManager, applicationId: BigString, entitlementId: BigString): Promise<Camelize<DiscordEntitlement>> {
    return await rest.get<DiscordEntitlement>(rest.routes.monetization.entitlement(applicationId, entitlementId));
  },
  /**
   * Creates a test entitlement to a given SKU for a given guild or user. Discord will act as though that user or guild has entitlement to your premium offering.
   *
   * @param applicationId - The id of the application to create the entitlement
   * @param body - The options for new entitlement
   *
   * @remarks
   * This endpoint returns a partial entitlement object.
   * It will not contain subscription_id, starts_at, or ends_at, as it's valid in perpetuity.
   */
  async createTestEntitlement(
    rest: RestManager,
    applicationId: BigString,
    body: CreateTestEntitlement,
  ): Promise<Partial<Camelize<DiscordEntitlement>>> {
    return await rest.post<DiscordEntitlement>(rest.routes.monetization.entitlements(applicationId), {
      body,
    });
  },
  /**
   * Deletes a currently-active test entitlement. Discord will act as though that user or guild no longer has entitlement to your premium offering.
   *
   * @param applicationId - The id of the application from where delete the entitlement
   * @param entitlementId - The id of the entitlement to delete
   */
  async deleteTestEntitlement(rest: RestManager, applicationId: BigString, entitlementId: BigString): Promise<void> {
    await rest.delete(rest.routes.monetization.entitlement(applicationId, entitlementId));
  },
  /**
   * For One-Time Purchase consumable SKUs, marks a given entitlement for the user as consumed. The entitlement will have `consumed: true` when using {@link listEntitlements | List Entitlements}
   *
   * @param applicationId - The id of the application to get the entitlement
   * @param entitlementId - The id of the entitlement to get
   */
  async consumeEntitlement(rest: RestManager, applicationId: BigString, entitlementId: BigString): Promise<void> {
    await rest.post(rest.routes.monetization.consumeEntitlement(applicationId, entitlementId));
  },
  /**
   * Returns all SKUs for a given application
   *
   * @param applicationId - The id of the application to get the SKUs
   */
  async listSkus(rest: RestManager, applicationId: BigString): Promise<Camelize<DiscordSku>[]> {
    return await rest.get<DiscordSku[]>(rest.routes.monetization.skus(applicationId));
  },
  /**
   * Returns all subscriptions containing the SKU, filtered by user.
   *
   * @param skuId - The id of the sku of get the subscriptions for
   */
  async listSubscriptions(rest: RestManager, skuId: BigString, options?: ListSkuSubscriptionsOptions): Promise<Camelize<DiscordSubscription[]>> {
    return await rest.get<DiscordSubscription[]>(rest.routes.monetization.subscriptions(skuId, options));
  },
  /**
   * Get a subscription by its ID.
   *
   * @param skuId - The id of the sku of get the subscriptions for
   */
  async getSubscription(rest: RestManager, skuId: BigString, subscriptionId: BigString): Promise<Camelize<DiscordSubscription>> {
    return await rest.get<DiscordSubscription>(rest.routes.monetization.subscription(skuId, subscriptionId));
  },
  /**
   * Send a soundboard sound to a voice channel the user is connected to.
   *
   * @param channelId - The id of the voice channel
   *
   * @remarks
   * Fires a _Voice Channel Effect Send_ Gateway event.
   *
   * Requires the `SPEAK` and `USE_SOUNDBOARD` permissions, and also the `USE_EXTERNAL_SOUNDS` permission if the sound is from a different server.
   * Additionally, requires the user to be connected to the voice channel, having a voice state without `deaf`, `self_deaf`, `mute`, or `suppress` enabled.
   */
  async sendSoundboardSound(rest: RestManager, channelId: BigString, options: SendSoundboardSound): Promise<void> {
    await rest.post(rest.routes.soundboard.sendSound(channelId), {
      body: options,
    });
  },
  /** Returns an array of soundboard sound objects that can be used by all users. */
  async listDefaultSoundboardSounds(rest: RestManager): Promise<Camelize<DiscordSoundboardSound>[]> {
    return await rest.get<DiscordSoundboardSound[]>(rest.routes.soundboard.listDefault());
  },
  /**
   * Returns a list of the guild's soundboard sounds.
   *
   * @param guildId - The guild to get the sounds from
   *
   * @remarks
   * Includes `user` fields if the bot has the `CREATE_GUILD_EXPRESSIONS` or `MANAGE_GUILD_EXPRESSIONS` permission.
   */
  async listGuildSoundboardSounds(rest: RestManager, guildId: BigString): Promise<{ items: Camelize<DiscordSoundboardSound>[] }> {
    return await rest.get<{ items: DiscordSoundboardSound[] }>(rest.routes.soundboard.guildSounds(guildId));
  },
  /**
   * Returns a soundboard sound object for the given sound id.
   *
   * @param guildId - The guild to get the sounds from
   * @param soundId - The sound id
   *
   * @remarks
   * Includes `user` fields if the bot has the `CREATE_GUILD_EXPRESSIONS` or `MANAGE_GUILD_EXPRESSIONS` permission.
   */
  async getGuildSoundboardSound(rest: RestManager, guildId: BigString, soundId: BigString): Promise<Camelize<DiscordSoundboardSound>> {
    return await rest.get<DiscordSoundboardSound>(rest.routes.soundboard.guildSound(guildId, soundId));
  },
  /**
   * Create a new soundboard sound for the guild.
   *
   * @param guildId - The guild to create the sounds in
   * @param options - The options to create the sound
   * @param reason - The audit log reason
   *
   * @remarks
   * Fires a _Guild Soundboard Sound Create_ Gateway event.
   *
   * Requires the `CREATE_GUILD_EXPRESSIONS` permission.
   */
  async createGuildSoundboardSound(
    rest: RestManager,
    guildId: BigString,
    options: CreateGuildSoundboardSound,
    reason?: string,
  ): Promise<Camelize<DiscordSoundboardSound>> {
    return await rest.post<DiscordSoundboardSound>(rest.routes.soundboard.guildSounds(guildId), {
      body: options,
      reason,
    });
  },
  /**
   * Modify the given soundboard sound.
   *
   * @param guildId - The guild to create the sounds in
   * @param soundId - The sound id to update
   * @param options - The options to update the sound
   * @param reason - The audit log reason
   *
   * @remarks
   * Fires a _Guild Soundboard Sound Update_ Gateway event.
   *
   * For sounds created by the current user, requires either the `CREATE_GUILD_EXPRESSIONS` or `MANAGE_GUILD_EXPRESSIONS` permission.
   * For other sounds, requires the `MANAGE_GUILD_EXPRESSIONS` permission.
   */
  async modifyGuildSoundboardSound(
    rest: RestManager,
    guildId: BigString,
    soundId: BigString,
    options: ModifyGuildSoundboardSound,
    reason?: string,
  ): Promise<Camelize<DiscordSoundboardSound>> {
    return await rest.post<DiscordSoundboardSound>(rest.routes.soundboard.guildSound(guildId, soundId), {
      body: options,
      reason,
    });
  },
  /**
   * Delete the given soundboard sound.
   *
   * @param guildId - The guild to create the sounds in
   * @param soundId - The sound id to delete
   * @param reason - The audit log reason
   *
   * @remarks
   * Fires a _Guild Soundboard Sound Delete_ Gateway event.
   *
   * For sounds created by the current user, requires either the `CREATE_GUILD_EXPRESSIONS` or `MANAGE_GUILD_EXPRESSIONS` permission.
   * For other sounds, requires the `MANAGE_GUILD_EXPRESSIONS` permission.
   */
  async deleteGuildSoundboardSound(rest: RestManager, guildId: BigString, soundId: BigString, reason?: string): Promise<void> {
    return await rest.delete(rest.routes.soundboard.guildSound(guildId, soundId), {
      reason,
    });
  },
  /**
   * Returns a list of application role connection metadata objects for the given application.
   *
   * @param applicationId - The application to get the role connections from
   * @returns A list of application role connection metadata objects
   */
  async listApplicationRoleConnectionsMetadataRecords(
    rest: RestManager,
    applicationId: BigString,
  ): Promise<Camelize<DiscordApplicationRoleConnectionMetadata>[]> {
    return await rest.get<DiscordApplicationRoleConnectionMetadata[]>(rest.routes.applicationRoleConnectionMetadata(applicationId));
  },
  /**
   * Updates and returns a list of application role connection metadata objects for the given application.
   *
   * @param applicationId - The application to get the role connections from
   * @param options - The options to update the role connections
   * @returns A list of application role connection metadata objects
   *
   * @remarks
   * An application can have a maximum of 5 metadata records.
   */
  async updateApplicationRoleConnectionsMetadataRecords(
    rest: RestManager,
    applicationId: BigString,
    options: Camelize<DiscordApplicationRoleConnectionMetadata>[],
  ): Promise<Camelize<DiscordApplicationRoleConnectionMetadata>[]> {
    return await rest.put<DiscordApplicationRoleConnectionMetadata[]>(rest.routes.applicationRoleConnectionMetadata(applicationId), {
      body: options,
    });
  },
  /**
   * Creates a new lobby, adding any of the specified members to it, if provided.
   *
   * @param options - The options to create the lobby
   * @returns The created lobby
   */
  async createLobby(rest: RestManager, options: CreateLobby): Promise<Camelize<DiscordLobby>> {
    return await rest.post<DiscordLobby>(rest.routes.lobby.create(), {
      body: options,
    });
  },
  /**
   * Creates a new lobby for the application identified by a `secret`, or joins the calling user to the existing lobby with that secret if one already exists.
   *
   * Updates lobby metadata and the calling member's metadata on join.
   *
   * @param options - The options to create or join the lobby
   * @returns - The created or joined lobby
   *
   * @remarks
   * Uses `Bearer` token for authorization with the `sdk.social_layer` scope.
   */
  async createOrJoinLobby(rest: RestManager, options: CreateOrJoinLobby): Promise<Camelize<DiscordLobby>> {
    return await rest.put<DiscordLobby>(rest.routes.lobby.create(), {
      body: options,
    });
  },
  /**
   * Returns a lobby object for the specified lobby id, if it exists.
   *
   * @param lobbyId - The ID of the lobby to get
   * @returns The lobby object
   */
  async getLobby(rest: RestManager, lobbyId: BigString): Promise<Camelize<DiscordLobby>> {
    return await rest.get<DiscordLobby>(rest.routes.lobby.lobby(lobbyId));
  },
  /**
   * Modifies the specified lobby with new values, if provided.
   *
   * @param lobbyId - The ID of the lobby to modify
   * @param options - The options to modify the lobby
   * @returns The modified lobby
   */
  async modifyLobby(rest: RestManager, lobbyId: BigString, options: ModifyLobby): Promise<Camelize<DiscordLobby>> {
    return await rest.patch<DiscordLobby>(rest.routes.lobby.lobby(lobbyId), {
      body: options,
    });
  },
  /**
   * Deletes the specified lobby if it exists.
   *
   * It is safe to call even if the lobby is already deleted as well.
   *
   * @param lobbyId - The ID of the lobby to delete
   * @returns Nothing
   */
  async deleteLobby(rest: RestManager, lobbyId: BigString): Promise<void> {
    return await rest.delete(rest.routes.lobby.lobby(lobbyId));
  },
  /**
   * Adds the provided user to the specified lobby. If called when the user is already a member of the lobby will update fields such as metadata on that user instead.
   *
   * @param lobbyId - The ID of the lobby to add the user to
   * @param userId - The ID of the user to add to the lobby
   * @param options - The options to add the user to the lobby
   * @returns The lobby member object
   */
  async addMemberToLobby(rest: RestManager, lobbyId: BigString, userId: BigString, options: AddLobbyMember): Promise<Camelize<DiscordLobbyMember>> {
    return await rest.put<DiscordLobbyMember>(rest.routes.lobby.member(lobbyId, userId), {
      body: options,
    });
  },
  /**
   * Adds, updates, or removes up to 25 members from the specified lobby in a single request.
   *
   * @param lobbyId - The ID of the lobby to add, update, or remove members from
   * @param options - The options to add, update, or remove members from the lobby
   * @returns Returns an array of lobby member objects for the upserted members. Removed members are not included in the response.
   *
   * @remarks
   * Members with `remove_member: false` (the default) are upserted — added if not present, or updated with the provided metadata and flags if already a member. Members with `remove_member: true` are removed.
   *
   * Users unknown to Discord will return a 404 UNKNOWN_USER error.
   * Users that fail permission checks or who have already reached the maximum number of lobbies per application (and are not already a member of this lobby) are silently dropped from the upsert set.
   *
   * @see {@link https://docs.discord.com/developers/resources/lobby#bulk-update-lobby-members}
   */
  async bulkUpdateLobbyMembers(rest: RestManager, lobbyId: BigString, options: BulkUpdateLobbyMember[]): Promise<Camelize<DiscordLobbyMember>[]> {
    return await rest.post<DiscordLobbyMember[]>(rest.routes.lobby.membersBulk(lobbyId), {
      body: options,
    });
  },
  /**
   * Removes the provided user from the specified lobby. It is safe to call this even if the user is no longer a member of the lobby, but will fail if the lobby does not exist.
   *
   * @param lobbyId - The ID of the lobby to remove the user from
   * @param userId - The ID of the user to remove from the lobby
   * @returns Nothing
   */
  async removeMemberFromLobby(rest: RestManager, lobbyId: BigString, userId: BigString): Promise<void> {
    return await rest.delete(rest.routes.lobby.member(lobbyId, userId));
  },
  /**
   * Removes the current user from the specified lobby. It is safe to call this even if the user is no longer a member of the lobby, but will fail if the lobby does not exist.
   *
   * @param lobbyId - The ID of the lobby to remove the user from
   * @param bearerToken - The access token of the user
   * @returns Nothing
   *
   * @remarks
   * This requires a bearer token for authorization
   */
  async leaveLobby(rest: RestManager, lobbyId: BigString, bearerToken: string): Promise<void> {
    return await rest.delete(rest.routes.lobby.leave(lobbyId), {
      headers: {
        authorization: `Bearer ${bearerToken}`,
      },
      unauthorized: true,
    });
  },
  /**
   * Links an existing text channel to a lobby.
   *
   * @param lobbyId - The ID of the lobby to link the channel to
   * @param bearerToken - The access token of the user
   * @param options - The options to link the channel to the lobby
   * @returns The updated lobby object
   *
   * @remarks
   * Uses bearer token for authorization and the user must be a lobby member with the CanLinkLobby lobby member flag.
   */
  async linkChannelToLobby(rest: RestManager, lobbyId: BigString, bearerToken: string, options: LinkChannelToLobby): Promise<Camelize<DiscordLobby>> {
    return await rest.patch<DiscordLobby>(rest.routes.lobby.link(lobbyId), {
      body: options,
      headers: {
        authorization: `Bearer ${bearerToken}`,
      },
      unauthorized: true,
    });
  },
  /**
   * Unlinks any currently linked channels from the specified lobby.
   *
   * @param lobbyId - The ID of the lobby to unlink the channel from
   * @param bearerToken - The access token of the user
   * @returns The updated lobby object
   *
   * @remarks
   * Uses bearer token for authorization and the user must be a lobby member with the CanLinkLobby lobby member flag.
   */
  async unlinkChannelToLobby(rest: RestManager, lobbyId: BigString, bearerToken: string): Promise<Camelize<DiscordLobby>> {
    return await rest.patch<DiscordLobby>(rest.routes.lobby.link(lobbyId), {
      headers: {
        authorization: `Bearer ${bearerToken}`,
      },
      unauthorized: true,
    });
  },
  /**
   * Sets the moderation metadata for a lobby message. The metadata is app-scoped and delivered to active game clients via the Social SDK as a realtime message update.
   *
   * @param lobbyId - The ID of the lobby to set the moderation metadata
   * @param messageId - The ID of the message to set the moderation metadata
   * @param options - The moderation metadata to set
   *
   * @remarks
   * Uses `Bot` token for authorization.
   *
   * For the options: Free-form key–value pairs describing the moderation decision. Up to 5 keys; key length <= 1024 characters; value length <= 2000 characters
   *
   * @see {@link https://discord.com/developers/docs/game-sdk/social-sdk/chat-moderation#server-side-chat-moderation} for the full moderation flow.
   */
  async updateLobbyMessageModerationMetadata(
    rest: RestManager,
    lobbyId: BigString,
    messageId: BigString,
    options: Record<string, string>,
  ): Promise<void> {
    await rest.put(rest.routes.lobby.moderationMetadata(lobbyId, messageId), {
      body: options,
    });
  },
  /**
   * Sends a message to the specified lobby. The calling user must be a member of the lobby.
   *
   * @param bearerToken - The access token of the user
   * @param lobbyId - The ID of the lobby to send the message to
   * @param options - The options to send the message
   * @returns Returns the created lobby message object.
   *
   * @remarks
   * Uses `Bearer` token for authorization with the `sdk.social_layer` scope.
   *
   * If the lobby has a linked channel, the message is also forwarded to that channel.
   * If forwarding fails (for example, due to AutoMod), the lobby message is still delivered to other lobby members.
   */
  async sendLobbyMessage(
    rest: RestManager,
    bearerToken: string,
    lobbyId: BigString,
    options: SendLobbyMessage,
  ): Promise<Camelize<DiscordLobbyMessage>> {
    return await rest.post<DiscordLobbyMessage>(rest.routes.lobby.messages(lobbyId), {
      body: options,
      headers: {
        authorization: `Bearer ${bearerToken}`,
      },
      unauthorized: true,
    });
  },
  /**
   * Returns the most recent messages in the specified lobby. The calling user must be a member of the lobby.
   *
   * @param bearerToken - The access token of the user
   * @param lobbyId - The ID of the lobby to get the messages from
   * @param options - The options to get the messages
   * @returns Returns an array of lobby message objects
   *
   * @remarks
   * Uses `Bearer` token for authorization with the `sdk.social_layer` scope.
   */
  async getLobbyMessages(
    rest: RestManager,
    bearerToken: string,
    lobbyId: BigString,
    options?: GetLobbyMessages,
  ): Promise<Camelize<DiscordLobbyMessage>[]> {
    return await rest.get<DiscordLobbyMessage[]>(rest.routes.lobby.messages(lobbyId, options), {
      headers: {
        authorization: `Bearer ${bearerToken}`,
      },
      unauthorized: true,
    });
  },
  /**
   * Creates a single-use guild invite to the lobby's linked channel, targeted at the calling user.
   *
   *
   * @param bearerToken - The access token of the user
   * @param lobbyId - The ID of the lobby to create the invite for
   * @returns The created invite object
   *
   * @remarks
   * Uses `Bearer` token for authorization with the `sdk.social_layer` scope.
   *
   * The lobby must have a linked channel and the caller must be a member of the lobby.
   * The invite expires after one hour.
   */
  async createLobbyChannelInviteForSelf(rest: RestManager, bearerToken: string, lobbyId: BigString): Promise<Camelize<DiscordLobbyInvite>> {
    return rest.post<DiscordLobbyInvite>(rest.routes.lobby.inviteSelf(lobbyId), {
      headers: {
        authorization: `Bearer ${bearerToken}`,
      },
      unauthorized: true,
    });
  },
  /**
   * Creates a single-use guild invite to the lobby's linked channel on behalf of an application, targeted at the specified user.
   *
   * @param lobbyId - The ID of the lobby to create the invite for
   * @param userId - The ID of the user to create the invite for
   * @returns The created invite object
   *
   * @remarks
   * Uses `Bot` token for authorization
   *
   * The lobby must have a linked channel.
   * The invite expires after one hour.
   */
  async createLobbyChannelInviteForUser(rest: RestManager, lobbyId: BigString, userId: BigString): Promise<Camelize<DiscordLobbyInvite>> {
    return rest.post<DiscordLobbyInvite>(rest.routes.lobby.inviteUser(lobbyId, userId));
  },
};

// We remove the rest parameter as it shouldn't be in the final function signature and is injected by the RestManager when calling the endpoint function.
export type RestEndpoints = {
  [K in keyof typeof restEndpoints]: (typeof restEndpoints)[K] extends (...args: [RestManager, ...infer B]) => infer R ? (...args: B) => R : never;
};
