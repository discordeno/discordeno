import {
  GetBans,
  GetGuildAuditLog,
  GetGuildPruneCountQuery,
  GetInvite,
  GetMessagesOptions,
  GetReactions,
  GetScheduledEventUsers,
  isGetMessagesAfter,
  isGetMessagesAround,
  isGetMessagesBefore,
  isGetMessagesLimit,
  ListArchivedThreads,
  ListGuildMembers,
} from "../helpers/mod.ts";
import { BigString } from "../types/shared.ts";
import { baseEndpoints } from "./constants.ts";

export const routes = {
  GATEWAY_BOT: () => {
    return `/gateway/bot`;
  },

  // Automod Endpoints
  AUTOMOD_RULES: (guildId: BigString) => {
    return `/guilds/${guildId}/auto-moderation/rules`;
  },
  AUTOMOD_RULE: (guildId: BigString, ruleId: BigString) => {
    return `/guilds/${guildId}/auto-moderation/rules/${ruleId}`;
  },

  // Channel Endpoints
  CHANNEL: (channelId: BigString) => {
    return `/channels/${channelId}`;
  },
  CHANNEL_MESSAGE: (channelId: BigString, messageId: BigString) => {
    return `/channels/${channelId}/messages/${messageId}`;
  },
  CHANNEL_MESSAGES: (channelId: BigString, options?: GetMessagesOptions) => {
    let url = `/channels/${channelId}/messages?`;

    if (options) {
      if (isGetMessagesAfter(options) && options.after) url += `after=${options.after}`;
      if (isGetMessagesBefore(options) && options.before) url += `&before=${options.before}`;
      if (isGetMessagesAround(options) && options.around) url += `&around=${options.around}`;
      if (isGetMessagesLimit(options) && options.limit) url += `&limit=${options.limit}`;
    }

    return url;
  },
  CHANNEL_PIN: (channelId: BigString, messageId: BigString) => {
    return `/channels/${channelId}/pins/${messageId}`;
  },
  CHANNEL_PINS: (channelId: BigString) => {
    return `/channels/${channelId}/pins`;
  },
  CHANNEL_BULK_DELETE: (channelId: BigString) => {
    return `/channels/${channelId}/messages/bulk-delete`;
  },
  CHANNEL_INVITES: (channelId: BigString) => {
    return `/channels/${channelId}/invites`;
  },
  CHANNEL_WEBHOOKS: (channelId: BigString) => {
    return `/channels/${channelId}/webhooks`;
  },
  CHANNEL_MESSAGE_REACTION_ME: (channelId: BigString, messageId: BigString, emoji: string) => {
    return `/channels/${channelId}/messages/${messageId}/reactions/${encodeURIComponent(emoji)}/@me`;
  },
  CHANNEL_MESSAGE_REACTION_USER: (channelId: BigString, messageId: BigString, emoji: string, userId: BigString) => {
    return `/channels/${channelId}/messages/${messageId}/reactions/${encodeURIComponent(emoji)}/${userId}`;
  },
  CHANNEL_MESSAGE_REACTIONS: (channelId: BigString, messageId: BigString) => {
    return `/channels/${channelId}/messages/${messageId}/reactions`;
  },
  CHANNEL_MESSAGE_REACTION: (channelId: BigString, messageId: BigString, emoji: string, options?: GetReactions) => {
    let url = `/channels/${channelId}/messages/${messageId}/reactions/${encodeURIComponent(emoji)}?`;

    if (options) {
      if (options.after) url += `after=${options.after}`;
      if (options.limit) url += `&limit=${options.limit}`;
    }

    return url;
  },
  CHANNEL_FOLLOW: (channelId: BigString) => {
    return `/channels/${channelId}/followers`;
  },
  CHANNEL_MESSAGE_CROSSPOST: (channelId: BigString, messageId: BigString) => {
    return `/channels/${channelId}/messages/${messageId}/crosspost`;
  },
  CHANNEL_OVERWRITE: (channelId: BigString, overwriteId: BigString) => {
    return `/channels/${channelId}/permissions/${overwriteId}`;
  },
  // Bots SHALL NOT use this endpoint but they can
  CHANNEL_TYPING: (channelId: BigString) => {
    return `/channels/${channelId}/typing`;
  },

  // Thread Endpoints
  THREAD_START_PUBLIC: (channelId: BigString, messageId: BigString) => {
    return `/channels/${channelId}/messages/${messageId}/threads`;
  },
  THREAD_START_PRIVATE: (channelId: BigString) => {
    return `/channels/${channelId}/threads`;
  },
  THREAD_ACTIVE: (guildId: BigString) => {
    return `/guilds/${guildId}/threads/active`;
  },
  THREAD_MEMBERS: (channelId: BigString) => {
    return `/channels/${channelId}/thread-members`;
  },
  THREAD_ME: (channelId: BigString) => {
    return `/channels/${channelId}/thread-members/@me`;
  },
  THREAD_USER: (channelId: BigString, userId: BigString) => {
    return `/channels/${channelId}/thread-members/${userId}`;
  },
  THREAD_ARCHIVED: (channelId: BigString) => {
    return `/channels/${channelId}/threads/archived`;
  },
  THREAD_ARCHIVED_PUBLIC: (channelId: BigString, options?: ListArchivedThreads) => {
    let url = `/channels/${channelId}/threads/archived/public?`;

    if (options) {
      if (options.before) url += `before=${new Date(options.before).toISOString()}`;
      if (options.limit) url += `&limit=${options.limit}`;
    }

    return url;
  },
  THREAD_ARCHIVED_PRIVATE: (channelId: BigString, options?: ListArchivedThreads) => {
    let url = `/channels/${channelId}/threads/archived/private?`;

    if (options) {
      if (options.before) url += `before=${new Date(options.before).toISOString()}`;
      if (options.limit) url += `&limit=${options.limit}`;
    }

    return url;
  },
  THREAD_ARCHIVED_PRIVATE_JOINED: (channelId: BigString, options?: ListArchivedThreads) => {
    let url = `/channels/${channelId}/users/@me/threads/archived/private?`;

    if (options) {
      if (options.before) url += `before=${new Date(options.before).toISOString()}`;
      if (options.limit) url += `&limit=${options.limit}`;
    }

    return url;
  },

  // Thread -> Forum Endpoints
  FORUM_START: (channelId: BigString) => {
    return `/channels/${channelId}/threads?has_message=true`;
  },

  // Guild Endpoints
  GUILD: (guildId: BigString, withCounts?: boolean) => {
    let url = `/guilds/${guildId}?`;

    if (withCounts !== undefined) {
      url += `with_counts=${withCounts}`;
    }

    return url;
  },
  GUILDS: () => {
    return `/guilds`;
  },
  GUILD_AUDIT_LOGS: (guildId: BigString, options?: GetGuildAuditLog) => {
    let url = `/guilds/${guildId}/audit-logs?`;

    if (options) {
      if (options.actionType) url += `action_type=${options.actionType}`;
      if (options.before) url += `&before=${options.before}`;
      if (options.limit) url += `&limit=${options.limit}`;
      if (options.userId) url += `&user_id=${options.userId}`;
    }

    return url;
  },
  GUILD_BAN: (guildId: BigString, userId: BigString) => {
    return `/guilds/${guildId}/bans/${userId}`;
  },
  GUILD_BANS: (guildId: BigString, options?: GetBans) => {
    let url = `/guilds/${guildId}/bans?`;

    if (options) {
      if (options.limit) url += `limit=${options.limit}`;
      if (options.after) url += `&after=${options.after}`;
      if (options.before) url += `&before=${options.before}`;
    }

    return url;
  },
  // TODO: move this away
  GUILD_BANNER: (guildId: BigString, icon: string) => {
    return `${baseEndpoints.CDN_URL}/banners/${guildId}/${icon}`;
  },
  GUILD_CHANNELS: (guildId: BigString) => {
    return `/guilds/${guildId}/channels`;
  },
  GUILD_WIDGET: (guildId: BigString) => {
    return `/guilds/${guildId}/widget`;
  },
  GUILD_WIDGET_JSON: (guildId: BigString) => {
    return `/guilds/${guildId}/widget.json`;
  },
  GUILD_WIDGET_IMAGE: (
    guildId: BigString,
    style?:
      | "shield"
      | "banner1"
      | "banner2"
      | "banner3"
      | "banner4",
  ) => {
    let url = `/guilds/${guildId}/widget.png?`;

    if (style) {
      url += `style=${style}`;
    }

    return url;
  },
  GUILD_EMOJI: (guildId: BigString, emojiId: BigString) => {
    return `/guilds/${guildId}/emojis/${emojiId}`;
  },
  GUILD_EMOJIS: (guildId: BigString) => {
    return `/guilds/${guildId}/emojis`;
  },
  // TODO: move this away
  GUILD_ICON: (guildId: BigString, icon: string) => {
    return `${baseEndpoints.CDN_URL}/icons/${guildId}/${icon}`;
  },
  GUILD_INTEGRATION: (guildId: BigString, integrationId: BigString) => {
    return `/guilds/${guildId}/integrations/${integrationId}`;
  },
  GUILD_INTEGRATION_SYNC: (guildId: BigString, integrationId: BigString) => {
    return `/guilds/${guildId}/integrations/${integrationId}/sync`;
  },
  GUILD_INTEGRATIONS: (guildId: BigString) => {
    return `/guilds/${guildId}/integrations?include_applications=true`;
  },
  GUILD_INVITES: (guildId: BigString) => {
    return `/guilds/${guildId}/invites`;
  },
  GUILD_LEAVE: (guildId: BigString) => {
    return `/users/@me/guilds/${guildId}`;
  },
  GUILD_MEMBER: (guildId: BigString, userId: BigString) => {
    return `/guilds/${guildId}/members/${userId}`;
  },
  GUILD_MEMBERS: (guildId: BigString, options?: ListGuildMembers) => {
    let url = `/guilds/${guildId}/members?`;

    if (options !== undefined) {
      if (options.limit) url += `limit=${options.limit}`;
      if (options.after) url += `&after=${options.after}`;
    }

    return url;
  },
  GUILD_MEMBER_ROLE: (guildId: BigString, memberId: BigString, roleId: BigString) => {
    return `/guilds/${guildId}/members/${memberId}/roles/${roleId}`;
  },
  GUILD_MEMBERS_SEARCH: (guildId: BigString, query: string, options?: { limit?: number }) => {
    let url = `/guilds/${guildId}/members/search?query=${encodeURIComponent(query)}`;

    if (options) {
      if (options.limit !== undefined) url += `&limit=${options.limit}`;
    }

    return url;
  },
  GUILD_PRUNE: (guildId: BigString, options?: GetGuildPruneCountQuery) => {
    let url = `/guilds/${guildId}/prune?`;

    if (options) {
      if (options.days) url += `days=${options.days}`;
      if (options.includeRoles) url += `&include_roles=${options.includeRoles}`;
    }

    return url;
  },
  GUILD_REGIONS: (guildId: BigString) => {
    return `/guilds/${guildId}/regions`;
  },
  GUILD_ROLE: (guildId: BigString, roleId: BigString) => {
    return `/guilds/${guildId}/roles/${roleId}`;
  },
  GUILD_ROLES: (guildId: BigString) => {
    return `/guilds/${guildId}/roles`;
  },
  // TODO: move this away
  GUILD_SPLASH: (guildId: BigString, icon: string) => {
    return `${baseEndpoints.CDN_URL}/splashes/${guildId}/${icon}`;
  },
  GUILD_VANITY_URL: (guildId: BigString) => {
    return `/guilds/${guildId}/vanity-url`;
  },
  GUILD_WEBHOOKS: (guildId: BigString) => {
    return `/guilds/${guildId}/webhooks`;
  },
  TEMPLATE: (code: string) => {
    return `/guilds/templates/${code}`;
  },
  GUILD_TEMPLATE: (guildId: BigString, code: string) => {
    return `/guilds/${guildId}/templates/${code}`;
  },
  GUILD_TEMPLATES: (guildId: BigString) => {
    return `/guilds/${guildId}/templates`;
  },
  GUILD_PREVIEW: (guildId: BigString) => {
    return `/guilds/${guildId}/preview`;
  },
  UPDATE_VOICE_STATE: (guildId: BigString, userId?: BigString) => {
    return `/guilds/${guildId}/voice-states/${userId ?? "@me"}`;
  },
  GUILD_WELCOME_SCREEN: (guildId: BigString) => {
    return `/guilds/${guildId}/welcome-screen`;
  },
  GUILD_SCHEDULED_EVENTS: (guildId: BigString, withUserCount?: boolean) => {
    let url = `/guilds/${guildId}/scheduled-events?`;

    if (withUserCount !== undefined) {
      url += `with_user_count=${withUserCount}`;
    }
    return url;
  },
  GUILD_SCHEDULED_EVENT: (guildId: BigString, eventId: BigString, withUserCount?: boolean) => {
    let url = `/guilds/${guildId}/scheduled-events/${eventId}`;

    if (withUserCount !== undefined) {
      url += `with_user_count=${withUserCount}`;
    }

    return url;
  },
  GUILD_SCHEDULED_EVENT_USERS: (guildId: BigString, eventId: BigString, options?: GetScheduledEventUsers) => {
    let url = `/guilds/${guildId}/scheduled-events/${eventId}/users?`;

    if (options) {
      if (options.limit) url += `limit=${options.limit}`;
      if (options.withMember) url += `&with_member=${options.withMember}`;
      if (options.after) url += `&after=${options.after}`;
      if (options.before) url += `&before=${options.before}`;
    }

    return url;
  },
  GUILD_MFA_LEVEL: (guildId: BigString) => `/guilds/${guildId}/mfa`,
  // Voice
  VOICE_REGIONS: () => {
    return `/voice/regions`;
  },

  INVITE: (inviteCode: string, options?: GetInvite) => {
    let url = `/invites/${inviteCode}?`;

    if (options) {
      if (options.withCounts) url += `with_counts=${options.withCounts}`;
      if (options.withExpiration) url += `&with_expiration=${options.withExpiration}`;
      if (options.scheduledEventId) url += `&guild_scheduled_event_id=${options.scheduledEventId}`;
    }

    return url;
  },

  WEBHOOK: (webhookId: BigString, token: string, options?: { wait?: boolean; threadId?: BigString }) => {
    let url = `/webhooks/${webhookId}/${token}?`;

    if (options) {
      if (options?.wait !== undefined) url += `wait=${options.wait}`;
      if (options.threadId) url += `thread_id=${options.threadId}`;
    }

    return url;
  },
  WEBHOOK_ID: (webhookId: BigString) => {
    return `/webhooks/${webhookId}`;
  },
  WEBHOOK_MESSAGE: (webhookId: BigString, token: string, messageId: BigString, options?: { threadId?: BigString }) => {
    let url = `/webhooks/${webhookId}/${token}/messages/${messageId}?`;

    if (options) {
      if (options.threadId) url += `thread_id=${options.threadId}`;
    }

    return url;
  },
  WEBHOOK_MESSAGE_ORIGINAL: (webhookId: BigString, token: string, options?: { threadId?: BigString }) => {
    let url = `/webhooks/${webhookId}/${token}/messages/@original?`;

    if (options) {
      if (options.threadId) url += `thread_id=${options.threadId}`;
    }

    return url;
  },
  WEBHOOK_SLACK: (webhookId: BigString, token: string) => {
    return `/webhooks/${webhookId}/${token}/slack`;
  },
  WEBHOOK_GITHUB: (webhookId: BigString, token: string) => {
    return `/webhooks/${webhookId}/${token}/github`;
  },

  // Application Endpoints
  COMMANDS: (applicationId: BigString) => {
    return `/applications/${applicationId}/commands`;
  },
  COMMANDS_GUILD: (applicationId: BigString, guildId: BigString) => {
    return `/applications/${applicationId}/guilds/${guildId}/commands`;
  },
  COMMANDS_PERMISSIONS: (applicationId: BigString, guildId: BigString) => {
    return `/applications/${applicationId}/guilds/${guildId}/commands/permissions`;
  },
  COMMANDS_PERMISSION: (applicationId: BigString, guildId: BigString, commandId: BigString) => {
    return `/applications/${applicationId}/guilds/${guildId}/commands/${commandId}/permissions`;
  },
  COMMANDS_ID: (applicationId: BigString, commandId: BigString, withLocalizations?: boolean) => {
    let url = `/applications/${applicationId}/commands/${commandId}?`;

    if (withLocalizations !== undefined) {
      url += `withLocalizations=${withLocalizations}`;
    }

    return url;
  },
  COMMANDS_GUILD_ID: (
    applicationId: BigString,
    guildId: BigString,
    commandId: BigString,
    withLocalizations?: boolean,
  ) => {
    let url = `/applications/${applicationId}/guilds/${guildId}/commands/${commandId}?`;

    if (withLocalizations !== undefined) {
      url += `with_localizations=${withLocalizations}`;
    }

    return url;
  },

  // Interaction Endpoints
  INTERACTION_ID_TOKEN: (interactionId: BigString, token: string) => {
    return `/interactions/${interactionId}/${token}/callback`;
  },
  INTERACTION_ORIGINAL_ID_TOKEN: (interactionId: BigString, token: string) => {
    return `/webhooks/${interactionId}/${token}/messages/@original`;
  },
  INTERACTION_ID_TOKEN_MESSAGE_ID: (applicationId: BigString, token: string, messageId: BigString) => {
    return `/webhooks/${applicationId}/${token}/messages/${messageId}`;
  },

  // User endpoints
  USER: (userId: BigString) => {
    return `/users/${userId}`;
  },
  USER_BOT: () => {
    return `/users/@me`;
  },
  USER_GUILDS: () => {
    return `/users/@me/guilds`;
  },
  // TODO: move this away
  USER_AVATAR: (userId: BigString, icon: string) => {
    return `${baseEndpoints.CDN_URL}/avatars/${userId}/${icon}`;
  },
  // TODO: move this away
  USER_DEFAULT_AVATAR: (icon: number) => {
    return `${baseEndpoints.CDN_URL}/embed/avatars/${icon}.png`;
  },
  USER_DM: () => {
    return `/users/@me/channels`;
  },
  USER_CONNECTIONS: () => {
    return `/users/@me/connections`;
  },
  USER_NICK: (guildId: BigString) => {
    return `/guilds/${guildId}/members/@me`;
  },

  // Discovery Endpoints
  DISCOVERY_CATEGORIES: () => {
    return `/discovery/categories`;
  },
  DISCOVERY_VALID_TERM: (term: string) => {
    return `/discovery/valid-term?term=${term}`;
  },
  DISCOVERY_METADATA: (guildId: BigString) => {
    return `/guilds/${guildId}/discovery-metadata`;
  },
  DISCOVERY_SUBCATEGORY: (guildId: BigString, categoryId: number) => {
    return `/guilds/${guildId}/discovery-categories/${categoryId}`;
  },

  // OAuth2
  OAUTH2_APPLICATION: () => {
    return `/oauth2/applications/@me`;
  },

  // Stage instances
  STAGE_INSTANCES: () => {
    return `/stage-instances`;
  },
  STAGE_INSTANCE: (channelId: BigString) => {
    return `/stage-instances/${channelId}`;
  },

  // Stickers Endpoints
  NITRO_STICKER_PACKS: () => {
    return "/sticker-packs";
  },
  STICKER: (stickerId: bigint) => {
    return `/stickers/${stickerId}`;
  },
  GUILD_STICKERS: (guildId: bigint) => {
    return `/guilds/${guildId}/stickers`;
  },
  GUILD_STICKER: (guildId: bigint, stickerId: bigint) => {
    return `/guilds/${guildId}/stickers/${stickerId}`;
  },
};
