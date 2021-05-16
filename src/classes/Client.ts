import { EventEmitter } from "./deps.ts";

import { helpers } from "../helpers/mod.ts";
import { ClientOptions } from "./types/client_options.ts";
import {
  ApplicationCommandPermissions,
  BeginGuildPrune,
  CreateChannelInvite,
  CreateGlobalApplicationCommand,
  CreateGuild,
  CreateGuildBan,
  CreateGuildChannel,
  CreateGuildEmoji,
  CreateMessage,
  DiscordenoEditWebhookMessage,
  DiscordenoInteractionResponse,
  DiscordImageFormat,
  DiscordImageSize,
  DiscordOverwrite,
  EditGlobalApplicationCommand,
  GetGuildAuditLog,
  GetGuildPruneCountQuery,
  GetGuildWidgetImageQuery,
  GetInvite,
  ListGuildMembers,
  ListPublicArchivedThreads,
  ModifyChannel,
  ModifyGuild,
  ModifyGuildChannelPositions,
  ModifyGuildDiscoveryMetadata,
  ModifyGuildEmoji,
  ModifyGuildMember,
  ModifyGuildWelcomeScreen,
  ModifyThread,
  Overwrite,
  PermissionStrings,
  RequestGuildMembers,
  SearchGuildMembers,
  StartThread,
  UpdateOthersVoiceState,
  UpdateSelfVoiceState,
} from "../types/mod.ts";

export class Client extends EventEmitter {
  /** The bot's token */
  token: string;
  /** The timestamp when the bot started. */
  startedAt = Date.now();

  constructor(options: ClientOptions) {
    super();

    this.token = options.token;
  }

  // GETTERS

  get uptime() {
    return Date.now() - this.startedAt;
  }

  /** Start connecting shards?? */
  async connect() {
    // TODO: we might wana do this slightly differently
  }

  // CHANNEL HELPER METHODS

  /** Adds the current user to a thread. Returns a 204 empty response on success. Also requires the thread is not archived. Fires a Thread Members Update Gateway event.Adds another user to a thread. Requires the ability to send messages in the thread. Also requires the thread is not archived. Returns a 204 empty response on success. Fires a Thread Members Update Gateway event */
  addToThread(channelId: bigint, userId?: bigint) {
    return helpers.addToThread(channelId, userId);
  }

  /** Returns all active threads in the channel, including public and private threads. Threads are ordered by their id, in descending order. Requires the READ_MESSAGE_HISTORY permission. */
  getActiveThreads(channelId: bigint) {
    return helpers.getActiveThreads(channelId);
  }

  getArchivedThreads(
    channelId: bigint,
    options?:
      | (ListPublicArchivedThreads & {
        type?: "public" | "private" | "privateJoinedThreads" | undefined;
      })
      | undefined,
  ) {
    return helpers.getArchivedThreads(channelId, options);
  }

  /** Returns array of thread members objects that are members of the thread. */
  getThreadMembers(channelId: bigint) {
    return helpers.getThreadMembers(channelId);
  }

  /** Removes another user from a thread. Requires the MANAGE_THREADS permission or that you are the creator of the thread. Also requires the thread is not archived. Returns a 204 empty response on success. Fires a Thread Members Update Gateway event */
  removeFromThread(channelId: bigint, userId?: bigint) {
    return helpers.removeFromThread(channelId, userId);
  }

  /** Creates a new public thread from an existing message. Returns a channel on success, and a 400 BAD REQUEST on invalid parameters. Fires a Thread Create Gateway event. */
  startThread(
    channelId: bigint,
    options: StartThread & {
      messageId?: bigint | undefined;
    },
  ) {
    return helpers.startThread(channelId, options);
  }

  /** Gets all the channels ids that are the children of this category. */
  categoryChildren(id: bigint) {
    return helpers.categoryChildren(id);
  }

  /** Checks if a channel overwrite for a user id or a role id has permission in this channel */
  channelOverwriteHasPermission(
    guildId: bigint,
    id: bigint,
    overwrites: (Omit<DiscordOverwrite, "id" | "allow" | "deny"> & {
      id: bigint;
      allow: bigint;
      deny: bigint;
    })[],
    permissions: PermissionStrings[],
  ) {
    return helpers.channelOverwriteHasPermission(
      guildId,
      id,
      overwrites,
      permissions,
    );
  }

  /** Create a copy of a channel */
  cloneChannel(channelId: bigint, reason?: string) {
    return helpers.cloneChannel(channelId, reason);
  }

  /** Create a channel in your server. Bot needs MANAGE_CHANNEL permissions in the server. */
  createChannel(
    guildId: bigint,
    options?: CreateGuildChannel,
    reason?: string,
  ) {
    return helpers.createChannel(guildId, options, reason);
  }

  /** Creates a new Stage instance associated to a Stage channel. Requires the user to be a moderator of the Stage channel. */
  createStageInstance(channelId: bigint, topic: string) {
    return helpers.createStageInstance(channelId, topic);
  }

  /** Delete the channel permission overwrites for a user or role in this channel. Requires MANAGE_ROLES permission. */
  deleteChannelOverwrite(
    guildId: bigint,
    channelId: bigint,
    overwriteId: bigint,
  ) {
    return helpers.deleteChannelOverwrite(guildId, channelId, overwriteId);
  }

  /** Delete a channel in your server. Bot needs MANAGE_CHANNEL permissions in the server. */
  deleteChannel(channelId: bigint, reason?: string) {
    return helpers.deleteChannel(channelId, reason);
  }

  /** Deletes the Stage instance. Requires the user to be a moderator of the Stage channel. */
  deleteStageInstance(channelId: bigint) {
    return helpers.deleteStageInstance(channelId);
  }

  /** Edit the channel permission overwrites for a user or role in this channel. Requires `MANAGE_ROLES` permission. */
  editChannelOverwrite(
    guildId: bigint,
    channelId: bigint,
    overwriteId: bigint,
    options: Omit<Overwrite, "id">,
  ) {
    return helpers.editChannelOverwrite(
      guildId,
      channelId,
      overwriteId,
      options,
    );
  }

  /** Update a channel's settings. Requires the `MANAGE_CHANNELS` permission for the guild. */
  editChannel(
    channelId: bigint,
    options: ModifyChannel | ModifyThread,
    reason?: string,
  ) {
    return helpers.editChannel(channelId, options, reason);
  }

  /** Follow a News Channel to send messages to a target channel. Requires the `MANAGE_WEBHOOKS` permission in the target channel. Returns the webhook id. */
  followChannel(sourceChannelId: bigint, targetChannelId: bigint) {
    return helpers.followChannel(sourceChannelId, targetChannelId);
  }

  /** Gets the webhooks for this channel. Requires MANAGE_WEBHOOKS */
  getChannelWebhooks(channelId: bigint) {
    return helpers.getChannelWebhooks(channelId);
  }

  /** Fetches a single channel object from the api. */
  getChannel(channelId: bigint, addToCache = true) {
    return helpers.getChannel(channelId, addToCache);
  }

  /** Returns a list of guild channel objects. */
  getChannels(guildId: bigint, addToCache = true) {
    return helpers.getChannels(guildId, addToCache);
  }

  /** Get pinned messages in this channel. */
  getPins(channelId: bigint) {
    return helpers.getPins(channelId);
  }

  /** Gets the stage instance associated with the Stage channel, if it exists. */
  getStageInstance(channelId: bigint) {
    return helpers.getStageInstance(channelId);
  }

  /** Checks whether a channel is synchronized with its parent/category channel or not. */
  isChannelSynced(channelId: bigint) {
    return helpers.isChannelSynced(channelId);
  }

  /**
   * Trigger a typing indicator for the specified channel. Generally bots should **NOT** implement this route.
   * However, if a bot is responding to a command and expects the computation to take a few seconds,
   * this endpoint may be called to let the user know that the bot is processing their message.
 */
  startTyping(channelId: bigint) {
    return helpers.startTyping(channelId);
  }

  /** Modify the positions of channels on the guild. Requires MANAGE_CHANNELS permisison. */
  swapChannels(
    guildId: bigint,
    channelPositions: ModifyGuildChannelPositions[],
  ) {
    return helpers.swapChannels(guildId, channelPositions);
  }

  /** Updates fields of an existing Stage instance. Requires the user to be a moderator of the Stage channel. */
  updateStageInstance(channelId: bigint, topic: string) {
    return helpers.updateStageInstance(channelId, topic);
  }

  /**
   * Updates the a user's voice state, defaults to the current user
   * Caveats:
   *  - `channel_id` must currently point to a stage channel.
   *  - User must already have joined `channel_id`.
   *  - You must have the `MUTE_MEMBERS` permission. But can always suppress yourself.
   *  - When unsuppressed, non-bot users will have their `request_to_speak_timestamp` set to the current time. Bot users will not.
   *  - You must have the `REQUEST_TO_SPEAK` permission to request to speak. You can always clear your own request to speak.
   *  - You are able to set `request_to_speak_timestamp` to any present or future time.
   *  - When suppressed, the user will have their `request_to_speak_timestamp` removed.
 */
  updateVoiceState(
    guildId: bigint,
    options: UpdateSelfVoiceState | { userId: bigint } & UpdateOthersVoiceState,
  ) {
    return helpers.updateVoiceState(guildId, options);
  }

  // DISCOVERY METHODS

  /** Add a discovery subcategory to the guild. Requires the MANAGE_GUILD permission. */
  addDiscoverySubcategory(guildId: bigint, categoryId: number) {
    return helpers.addDiscoverySubcategory(guildId, categoryId);
  }

  /** Modify the discovery metadata for the guild. Requires the MANAGE_GUILD permission. Returns the updated discovery metadata object on success. */
  editDiscovery(guildId: bigint, data: ModifyGuildDiscoveryMetadata) {
    return helpers.editDiscovery(guildId, data);
  }

  /** Returns discovery category objects that can be used when editing guilds */
  getDiscoveryCategories() {
    return helpers.getDiscoveryCategories();
  }

  /** Removes a discovery subcategory from the guild. Requires the MANAGE_GUILD permission. Returns a 204 No Content on success. */
  removeDiscoverySubcategory(guildId: bigint, categoryId: number) {
    return helpers.removeDiscoverySubcategory(guildId, categoryId);
  }

  validDiscoveryTerm(term: string) {
    return helpers.validDiscoveryTerm(term);
  }

  // EMOJI METHODS

  /** Create an emoji in the server. Emojis and animated emojis have a maximum file size of 256kb. Attempting to upload an emoji larger than this limit will fail and return 400 Bad Request and an error message, but not a JSON status code. If a URL is provided to the image parameter, Discordeno will automatically convert it to a base64 string internally. */
  createEmoji(
    guildId: bigint,
    name: string,
    image: string,
    options: CreateGuildEmoji,
  ) {
    return helpers.createEmoji(guildId, name, image, options);
  }

  /** Delete the given emoji. Requires the MANAGE_EMOJIS permission. Returns 204 No Content on success. */
  deleteEmoji(guildId: bigint, id: bigint, reason?: string) {
    return helpers.deleteEmoji(guildId, id, reason);
  }

  /** Modify the given emoji. Requires the MANAGE_EMOJIS permission. */
  editEmoji(guildId: bigint, id: bigint, options: ModifyGuildEmoji) {
    return helpers.editEmoji(guildId, id, options);
  }

  /** Creates a url to the emoji from the Discord CDN. */
  emojiURL(id: bigint, animated?: boolean) {
    return helpers.emojiURL(id, animated);
  }

  /** Returns an emoji for the given guild and emoji Id. */
  getEmoji(guildId: bigint, emojiId: bigint, addToCache?: boolean) {
    return helpers.getEmoji(guildId, emojiId, addToCache);
  }

  /** Returns a list of emojis for the given guild. */
  getEmojis(guildId: bigint, addToCache?: boolean) {
    return helpers.getEmojis(guildId, addToCache);
  }

  // GUILD METHODS

  /** Create a new guild. Returns a guild object on success. Fires a Guild Create Gateway event. This endpoint can be used only by bots in less than 10 guilds. */
  createGuild(options: CreateGuild) {
    return helpers.createGuild(options);
  }

  /** Delete a guild permanently. User must be owner. Returns 204 No Content on success. Fires a Guild Delete Gateway event. */
  deleteGuild(guildId: bigint) {
    return helpers.deleteGuild(guildId);
  }

  /** Modify a guilds settings. Requires the MANAGE_GUILD permission. */
  editGuild(guildId: bigint, options: ModifyGuild) {
    return helpers.editGuild(guildId, options);
  }

  editWelcomeScreen(guildId: bigint, options: ModifyGuildWelcomeScreen) {
    return helpers.editWelcomeScreen(guildId, options);
  }

  /** Modify a guild widget object for the guild. Requires the MANAGE_GUILD permission. */
  editWidget(guildId: bigint, enabled: boolean, channelId?: string | null) {
    return helpers.editWidget(guildId, enabled, channelId);
  }

  /** Returns the audit logs for the guild. Requires VIEW AUDIT LOGS permission */
  getAuditLogs(guildId: bigint, options: GetGuildAuditLog) {
    return helpers.getAuditLogs(guildId, options);
  }

  /** Returns an array of voice regions that can be used when creating servers. */
  getAvailableVoiceRegions() {
    return helpers.getAvailableVoiceRegions();
  }

  /** Returns a ban object for the given user or a 404 not found if the ban cannot be found. Requires the BAN_MEMBERS permission. */
  getBan(guildId: bigint, memberId: bigint) {
    return helpers.getBan(guildId, memberId);
  }

  /** Returns a list of ban objects for the users banned from this guild. Requires the BAN_MEMBERS permission. */
  getBans(guildId: bigint) {
    return helpers.getBans(guildId);
  }

  /** Returns the guild preview object for the given id. If the bot is not in the guild, then the guild must be Discoverable. */
  getGuildPreview(guildId: bigint) {
    return helpers.getGuildPreview(guildId);
  }

  /** This function fetches a guild's data. This is not the same data as a GUILD_CREATE. */
  getGuild(
    guildId: bigint,
    options: { counts?: boolean; addToCache?: boolean } = {
      counts: true,
      addToCache: true,
    },
  ) {
    return helpers.getGuild(guildId, options);
  }

  /** Check how many members would be removed from the server in a prune operation. Requires the KICK_MEMBERS permission */
  getPruneCount(guildId: bigint, options?: GetGuildPruneCountQuery) {
    return helpers.getPruneCount(guildId, options);
  }

  /** Returns the code and uses of the vanity url for this server if it is enabled else code will be null. Requires the MANAGE_GUILD permission. */
  getVanityURL(guildId: bigint) {
    return helpers.getVanityURL(guildId);
  }

  /** Returns a list of voice region objects for the guild. Unlike the similar /voice route, this returns VIP servers when the guild is VIP-enabled. */
  getVoiceRegions(guildId: bigint) {
    return helpers.getVoiceRegions(guildId);
  }

  getWelcomeScreen(guildId: bigint) {
    return helpers.getWelcomeScreen(guildId);
  }

  /** Returns the widget image URL for the guild. */
  getWidgetImageURL(
    guildId: bigint,
    options?: GetGuildWidgetImageQuery & { force?: boolean },
  ) {
    return helpers.getWidgetImageURL(guildId, options);
  }

  /** Returns the guild widget object. Requires the MANAGE_GUILD permission. */
  getWidgetSettings(guildId: bigint) {
    return helpers.getWidgetSettings(guildId);
  }

  /** Returns the widget for the guild. */
  getWidget(guildId: bigint, options?: { force: boolean }) {
    return helpers.getWidget(guildId, options);
  }

  /** The full URL of the banner from Discords CDN. Undefined if no banner is set. */
  guildBannerURL(id: bigint, options: {
    banner?: string | bigint;
    size?: DiscordImageSize;
    format?: DiscordImageFormat;
    animated?: boolean;
  }) {
    return helpers.guildBannerURL(id, options);
  }

  /** The full URL of the icon from Discords CDN. Undefined when no icon is set. */
  guildIconURL(id: bigint, options: {
    banner?: string | bigint;
    size?: DiscordImageSize;
    format?: DiscordImageFormat;
    animated?: boolean;
  }) {
    return helpers.guildIconURL(id, options);
  }

  /** The full URL of the splash from Discords CDN. Undefined if no splash is set. */
  guildSplashURL(id: bigint, options: {
    banner?: string | bigint;
    size?: DiscordImageSize;
    format?: DiscordImageFormat;
    animated?: boolean;
  }) {
    return helpers.guildSplashURL(id, options);
  }

  /** Leave a guild */
  leaveGuild(guildId: bigint) {
    return helpers.leaveGuild(guildId);
  }

  // INTEGRATION METHODS

  /** Delete the attached integration object for the guild with this id. Requires MANAGE_GUILD permission. */
  deleteIntegration(guildId: bigint, id: bigint) {
    return helpers.deleteIntegration(guildId, id);
  }

  /** Returns a list of integrations for the guild. Requires the MANAGE_GUILD permission. */
  getIntegrations(guildId: bigint) {
    return helpers.getIntegrations(guildId);
  }

  // INTERACTION METHODS

  /** Batch edits permissions for all commands in a guild. Takes an array of partial GuildApplicationCommandPermissions objects including `id` and `permissions`. */
  batchEditSlashCommandPermissions(
    guildId: bigint,
    options: { id: string; permissions: ApplicationCommandPermissions[] }[],
  ) {
    return helpers.batchEditSlashCommandPermissions(guildId, options);
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
  createSlashCommand(
    options: CreateGlobalApplicationCommand,
    guildId?: bigint,
  ) {
    return helpers.createSlashCommand(options, guildId);
  }

  /** Deletes a slash command. */
  deleteSlashCommand(id: bigint, guildId?: bigint) {
    return helpers.deleteSlashCommand(id, guildId);
  }

  /** To delete your response to a slash command. If a message id is not provided, it will default to deleting the original response. */
  deleteSlashResponse(token: string, messageId?: bigint) {
    return helpers.deleteSlashResponse(token, messageId);
  }

  /** Edits command permissions for a specific command for your application in a guild. */
  editSlashCommandPermissions(
    guildId: bigint,
    commandId: bigint,
    options: ApplicationCommandPermissions[],
  ) {
    return helpers.editSlashCommandPermissions(guildId, commandId, options);
  }

  /** To edit your response to a slash command. If a messageId is not provided it will default to editing the original response. */
  editSlashResponse(token: string, options: DiscordenoEditWebhookMessage) {
    return helpers.editSlashResponse(token, options);
  }

  /** Fetch all of the global commands for your application. If a guildId is provided, the guild command will be fetched. */
  getSlashCommandPermissions(guildId: bigint) {
    return helpers.getSlashCommandPermissions(guildId);
  }

  /** Fetchs the global command for the given Id. If a guildId is provided, the guild command will be fetched. */
  getSlashCommand(commandId: bigint, guildId?: bigint) {
    return helpers.getSlashCommand(commandId, guildId);
  }

  /** Fetch all of the global commands for your application. If a guildId is provided, the guild command will be fetched. */
  getSlashCommands(guildId?: bigint) {
    return helpers.getSlashCommands(guildId);
  }

  /** Edit an existing slash command. If this command did not exist, it will create it. */
  upsertSlashCommand(
    commandId: bigint,
    options: EditGlobalApplicationCommand,
    guildId?: bigint,
  ) {
    return helpers.upsertSlashCommand(commandId, options, guildId);
  }

  /**
   * Bulk edit existing slash commands. If a command does not exist, it will create it.
   *
   * **NOTE:** Any slash commands that are not specified in this function will be **deleted**. If you don't provide the commandId and rename your command, the command gets a new Id.
 */
  upsertSlashCommands(
    options: EditGlobalApplicationCommand[],
    guildId?: bigint,
  ) {
    return helpers.upsertSlashCommands(options, guildId);
  }

  /** Returns the initial Interactio response. Functions the same as Get Webhook Message */
  getOriginalInteractionResponse(token: string) {
    return helpers.getOriginalInteractionResponse(token);
  }

  /**
   * Send a response to a users slash command. The command data will have the id and token necessary to respond.
   * Interaction `tokens` are valid for **15 minutes** and can be used to send followup messages.
   *
   * NOTE: By default we will suppress mentions. To enable mentions, just pass any mentions object.
  */
  sendInteractionResponse(
    id: bigint,
    token: string,
    options: DiscordenoInteractionResponse,
  ) {
    return helpers.sendInteractionResponse(id, token, options);
  }

  // INVITE METHODS

  /** channelId: bigint, options: CreateChannelInvite */
  createInvite(channelId: bigint, options: CreateChannelInvite) {
    return helpers.createInvite(channelId, options);
  }

  /** Deletes an invite for the given code. Requires MANAGE_CHANNELS or MANAGE_GUILD permission */
  deleteInvite(channelId: bigint, inviteCode: string) {
    return helpers.deleteInvite(channelId, inviteCode);
  }

  /** Gets the invites for this channel. Requires MANAGE_CHANNEL */
  getChannelInvites(channelId: bigint) {
    return helpers.getChannelInvites(channelId);
  }

  /** Returns an invite for the given code or throws an error if the invite doesn't exists. */
  getInvite(inviteCode: string, options?: GetInvite) {
    return helpers.getInvite(inviteCode, options);
  }

  /** Get all the invites for this guild. Requires MANAGE_GUILD permission */
  getInvites(guildId: bigint) {
    return helpers.getInvites(guildId);
  }

  // MEMBER METHODS

  /** The users custom avatar or the default avatar if you don't have a member object. */
  avatarURL(userId: bigint, discriminator: bigint, options: {
    avatar?: string | bigint;
    size?: DiscordImageSize;
    format?: DiscordImageFormat;
    animated?: boolean;
  }) {
    return helpers.avatarURL(userId, discriminator, options);
  }

  /** Ban a user from the guild and optionally delete previous messages sent by the user. Requires the BAN_MEMBERS permission. */
  banMember(guildId: bigint, id: bigint, options: CreateGuildBan) {
    return helpers.banMember(guildId, id, options);
  }

  /** Kicks a member from a voice channel */
  disconnectMember(guildId: bigint, memberId: bigint) {
    return helpers.disconnectMember(guildId, memberId);
  }

  /** Edit the nickname of the bot in this guild */
  editBotNickname(guildId: bigint, nickname: string | null) {
    return helpers.editBotNickname(guildId, nickname);
  }

  /** Edit the member */
  editMember(
    guildId: bigint,
    memberId: bigint,
    options: Omit<ModifyGuildMember, "channelId"> & {
      channelId?: bigint | null;
    },
  ) {
    return helpers.editMember(guildId, memberId, options);
  }

  /**
   * Highly recommended to use this function to fetch members instead of getMember from REST.
   * REST: 50/s global(across all shards) rate limit with ALL requests this included
   * GW(this function): 120/m(PER shard) rate limit. Meaning if you have 8 shards your limit is now 960/m.
  */
  fetchMembers(
    guildId: bigint,
    shardId: number,
    options?: Omit<RequestGuildMembers, "guildId">,
  ) {
    return helpers.fetchMembers(guildId, shardId, options);
  }

  /** Returns a guild member object for the specified user. */
  getMember(guildId: bigint, id: bigint, options?: { force?: boolean }) {
    return helpers.getMember(guildId, id, options);
  }

  /**
   * Highly recommended to **NOT** use this function to get members instead use fetchMembers().
   * REST(this function): 50/s global(across all shards) rate limit with ALL requests this included
   * GW(fetchMembers): 120/m(PER shard) rate limit. Meaning if you have 8 shards your limit is 960/m.
  */
  getMembers(
    guildId: bigint,
    options?: ListGuildMembers & { addToCache?: boolean },
  ) {
    return helpers.getMembers(guildId, options);
  }

  /** Kick a member from the server */
  kickMember(guildId: bigint, memberId: bigint, reason?: string) {
    return helpers.kickMember(guildId, memberId, reason);
  }

  /** Move a member from a voice channel to another. */
  moveMember(guildId: bigint, memberId: bigint, channelId: bigint) {
    return helpers.moveMember(guildId, memberId, channelId);
  }

  /**
   * Begin a prune operation. Requires the KICK_MEMBERS permission. Returns an object with one 'pruned' key indicating the number of members that were removed in the prune operation. For large guilds it's recommended to set the computePruneCount option to false, forcing 'pruned' to null. Fires multiple Guild Member Remove Gateway events.
   * By default, prune will not remove users with roles. You can optionally include specific roles in your prune by providing the roles (resolved to include_roles internally) parameter. Any inactive user that has a subset of the provided role(s) will be included in the prune and users with additional roles will not.
  */
  pruneMembers(guildId: bigint, options: BeginGuildPrune) {
    return helpers.pruneMembers(guildId, options);
  }

  /** Query string to match username(s) and nickname(s) against */
  searchMembers(
    guildId: bigint,
    query: string,
    options?: Omit<SearchGuildMembers, "query"> & { cache?: boolean },
  ) {
    return helpers.searchMembers(guildId, query, options);
  }

  /** Send a message to a users DM. Note: this takes 2 API calls. 1 is to fetch the users dm channel. 2 is to send a message to that channel. */
  sendDirectMessage(memberId: bigint, content: string | CreateMessage) {
    return helpers.sendDirectMessage(memberId, content);
  }

  /** Remove the ban for a user. Requires BAN_MEMBERS permission */
  unbanMember(guildId: bigint, id: bigint) {
    return helpers.unbanMember(guildId, id);
  }

  /** Send a message to the channel. Requires SEND_MESSAGES permission. */
  sendMessage(channelId: bigint, content: string | CreateMessage) {
    return helpers.sendMessage(channelId, content);
  }
}

export default Client;
