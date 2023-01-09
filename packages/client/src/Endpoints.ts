/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { BigString } from './Client.js'

export const ORIGINAL_INTERACTION_RESPONSE = (appID: BigString, interactToken: string) => `/webhooks/${appID}/${interactToken}`
export const COMMAND = (applicationID: BigString, commandID: BigString) => `/applications/${applicationID}/commands/${commandID}`
export const COMMANDS = (applicationID: BigString) => `/applications/${applicationID}/commands`
export const COMMAND_PERMISSIONS = (applicationID: BigString, guildID: BigString, commandID: BigString) =>
  `/applications/${applicationID}/guilds/${guildID}/commands/${commandID}/permissions`
export const CHANNEL = (chanID: BigString) => `/channels/${chanID}`
export const CHANNEL_BULK_DELETE = (chanID: BigString) => `/channels/${chanID}/messages/bulk-delete`
export const CHANNEL_CALL_RING = (chanID: BigString) => `/channels/${chanID}/call/ring`
export const CHANNEL_CROSSPOST = (chanID: BigString, msgID: BigString) => `/channels/${chanID}/messages/${msgID}/crosspost`
export const CHANNEL_FOLLOW = (chanID: BigString) => `/channels/${chanID}/followers`
export const CHANNEL_INVITES = (chanID: BigString) => `/channels/${chanID}/invites`
export const CHANNEL_MESSAGE_REACTION = (chanID: BigString, msgID: BigString, reaction: string) =>
  `/channels/${chanID}/messages/${msgID}/reactions/${reaction}`
export const CHANNEL_MESSAGE_REACTION_USER = (chanID: BigString, msgID: BigString, reaction: string, userID: BigString) =>
  `/channels/${chanID}/messages/${msgID}/reactions/${reaction}/${userID}`
export const CHANNEL_MESSAGE_REACTIONS = (chanID: BigString, msgID: BigString) => `/channels/${chanID}/messages/${msgID}/reactions`
export const CHANNEL_MESSAGE = (chanID: BigString, msgID: BigString) => `/channels/${chanID}/messages/${msgID}`
export const CHANNEL_MESSAGES = (chanID: BigString) => `/channels/${chanID}/messages`
export const CHANNEL_MESSAGES_SEARCH = (chanID: BigString) => `/channels/${chanID}/messages/search`
export const CHANNEL_PERMISSION = (chanID: BigString, overID: BigString) => `/channels/${chanID}/permissions/${overID}`
export const CHANNEL_PERMISSIONS = (chanID: BigString) => `/channels/${chanID}/permissions`
export const CHANNEL_PIN = (chanID: BigString, msgID: BigString) => `/channels/${chanID}/pins/${msgID}`
export const CHANNEL_PINS = (chanID: BigString) => `/channels/${chanID}/pins`
export const CHANNEL_RECIPIENT = (groupID: BigString, userID: BigString) => `/channels/${groupID}/recipients/${userID}`
export const CHANNEL_TYPING = (chanID: BigString) => `/channels/${chanID}/typing`
export const CHANNEL_WEBHOOKS = (chanID: BigString) => `/channels/${chanID}/webhooks`
export const CHANNELS = '/channels'
export const CUSTOM_EMOJI_GUILD = (emojiID: BigString) => `/emojis/${emojiID}/guild`
export const DISCOVERY_CATEGORIES = '/discovery/categories'
export const DISCOVERY_VALIDATION = '/discovery/valid-term'
export const GATEWAY = '/gateway'
export const GATEWAY_BOT = '/gateway/bot'
export const GUILD = (guildID: BigString) => `/guilds/${guildID}`
export const GUILD_AUDIT_LOGS = (guildID: BigString) => `/guilds/${guildID}/audit-logs`
export const GUILD_BAN = (guildID: BigString, memberID: BigString) => `/guilds/${guildID}/bans/${memberID}`
export const GUILD_BANS = (guildID: BigString) => `/guilds/${guildID}/bans`
export const GUILD_CHANNELS = (guildID: BigString) => `/guilds/${guildID}/channels`
export const GUILD_COMMAND = (applicationID: BigString, guildID: BigString, commandID: BigString) =>
  `/applications/${applicationID}/guilds/${guildID}/commands/${commandID}`
export const GUILD_COMMAND_PERMISSIONS = (applicationID: BigString, guildID: BigString) =>
  `/applications/${applicationID}/guilds/${guildID}/commands/permissions`
export const GUILD_COMMANDS = (applicationID: BigString, guildID: BigString) => `/applications/${applicationID}/guilds/${guildID}/commands`
export const GUILD_DISCOVERY = (guildID: BigString) => `/guilds/${guildID}/discovery-metadata`
export const GUILD_DISCOVERY_CATEGORY = (guildID: BigString, categoryID: BigString) => `/guilds/${guildID}/discovery-categories/${categoryID}`
export const GUILD_EMOJI = (guildID: BigString, emojiID: BigString) => `/guilds/${guildID}/emojis/${emojiID}`
export const GUILD_EMOJIS = (guildID: BigString) => `/guilds/${guildID}/emojis`
export const GUILD_INTEGRATION = (guildID: BigString, inteID: BigString) => `/guilds/${guildID}/integrations/${inteID}`
export const GUILD_INTEGRATION_SYNC = (guildID: BigString, inteID: BigString) => `/guilds/${guildID}/integrations/${inteID}/sync`
export const GUILD_INTEGRATIONS = (guildID: BigString) => `/guilds/${guildID}/integrations`
export const GUILD_INVITES = (guildID: BigString) => `/guilds/${guildID}/invites`
export const GUILD_VANITY_URL = (guildID: BigString) => `/guilds/${guildID}/vanity-url`
export const GUILD_MEMBER = (guildID: BigString, memberID: BigString) => `/guilds/${guildID}/members/${memberID}`
export const GUILD_MEMBER_NICK = (guildID: BigString, memberID: BigString) => `/guilds/${guildID}/members/${memberID}/nick`
export const GUILD_MEMBER_ROLE = (guildID: BigString, memberID: BigString, roleID: BigString) =>
  `/guilds/${guildID}/members/${memberID}/roles/${roleID}`
export const GUILD_MEMBERS = (guildID: BigString) => `/guilds/${guildID}/members`
export const GUILD_MEMBERS_SEARCH = (guildID: BigString) => `/guilds/${guildID}/members/search`
export const GUILD_MESSAGES_SEARCH = (guildID: BigString) => `/guilds/${guildID}/messages/search`
export const GUILD_PREVIEW = (guildID: BigString) => `/guilds/${guildID}/preview`
export const GUILD_PRUNE = (guildID: BigString) => `/guilds/${guildID}/prune`
export const GUILD_ROLE = (guildID: BigString, roleID: BigString) => `/guilds/${guildID}/roles/${roleID}`
export const GUILD_ROLES = (guildID: BigString) => `/guilds/${guildID}/roles`
export const GUILD_STICKER = (guildID: BigString, stickerID: BigString) => `/guilds/${guildID}/stickers/${stickerID}`
export const GUILD_STICKERS = (guildID: BigString) => `/guilds/${guildID}/stickers`
export const GUILD_TEMPLATE = (code: string) => `/guilds/templates/${code}`
export const GUILD_TEMPLATES = (guildID: BigString) => `/guilds/${guildID}/templates`
export const GUILD_TEMPLATE_GUILD = (guildID: BigString, code: string) => `/guilds/${guildID}/templates/${code}`
export const GUILD_VOICE_REGIONS = (guildID: BigString) => `/guilds/${guildID}/regions`
export const GUILD_WEBHOOKS = (guildID: BigString) => `/guilds/${guildID}/webhooks`
export const GUILD_WELCOME_SCREEN = (guildID: BigString) => `/guilds/${guildID}/welcome-screen`
export const GUILD_WIDGET = (guildID: BigString) => `/guilds/${guildID}/widget.json`
export const GUILD_WIDGET_SETTINGS = (guildID: BigString) => `/guilds/${guildID}/widget`
export const GUILD_VOICE_STATE = (guildID: BigString, user: BigString) => `/guilds/${guildID}/voice-states/${user}`
export const GUILDS = '/guilds'
export const INTERACTION_RESPOND = (interactID: BigString, interactToken: string) => `/interactions/${interactID}/${interactToken}/callback`
export const INVITE = (inviteID: string) => `/invites/${inviteID}`
export const OAUTH2_APPLICATION = (appID: BigString) => `/oauth2/applications/${appID}`
export const STAGE_INSTANCE = (channelID: BigString) => `/stage-instances/${channelID}`
export const STAGE_INSTANCES = '/stage-instances'
export const STICKER = (stickerID: BigString) => `/stickers/${stickerID}`
export const STICKER_PACKS = '/sticker-packs'
export const THREAD_MEMBER = (channelID: BigString, userID: BigString) => `/channels/${channelID}/thread-members/${userID}`
export const THREAD_MEMBERS = (channelID: BigString) => `/channels/${channelID}/thread-members`
export const THREAD_WITH_MESSAGE = (channelID: BigString, msgID: BigString) => `/channels/${channelID}/messages/${msgID}/threads`
export const THREAD_WITHOUT_MESSAGE = (channelID: BigString) => `/channels/${channelID}/threads`
export const THREADS_ACTIVE = (channelID: BigString) => `/channels/${channelID}/threads/active`
export const THREADS_ARCHIVED = (channelID: BigString, type: string) => `/channels/${channelID}/threads/archived/${type}`
export const THREADS_ARCHIVED_JOINED = (channelID: BigString) => `/channels/${channelID}/users/@me/threads/archived/private`
export const THREADS_GUILD_ACTIVE = (guildID: BigString) => `/guilds/${guildID}/threads/active`
export const USER = (userID: BigString) => `/users/${userID}`
export const USER_BILLING = (userID: BigString) => `/users/${userID}/billing`
export const USER_BILLING_PAYMENTS = (userID: BigString) => `/users/${userID}/billing/payments`
export const USER_BILLING_PREMIUM_SUBSCRIPTION = (userID: BigString) => `/users/${userID}/billing/premium-subscription`
export const USER_CHANNELS = (userID: BigString) => `/users/${userID}/channels`
export const USER_CONNECTIONS = (userID: BigString) => `/users/${userID}/connections`
export const USER_CONNECTION_PLATFORM = (userID: BigString, platform: string, id: string) => `/users/${userID}/connections/${platform}/${id}`
export const USER_GUILD = (userID: BigString, guildID: BigString) => `/users/${userID}/guilds/${guildID}`
export const USER_GUILDS = (userID: BigString) => `/users/${userID}/guilds`
export const USER_MFA_CODES = (userID: BigString) => `/users/${userID}/mfa/codes`
export const USER_MFA_TOTP_DISABLE = (userID: BigString) => `/users/${userID}/mfa/totp/disable`
export const USER_MFA_TOTP_ENABLE = (userID: BigString) => `/users/${userID}/mfa/totp/enable`
export const USER_NOTE = (userID: BigString, targetID: BigString) => `/users/${userID}/note/${targetID}`
export const USER_PROFILE = (userID: BigString) => `/users/${userID}/profile`
export const USER_RELATIONSHIP = (userID: BigString, relID: BigString) => `/users/${userID}/relationships/${relID}`
export const USER_SETTINGS = (userID: BigString) => `/users/${userID}/settings`
export const USERS = '/users'
export const VOICE_REGIONS = '/voice/regions'
export const WEBHOOK = (hookID: BigString) => `/webhooks/${hookID}`
export const WEBHOOK_MESSAGE = (hookID: BigString, token: string, msgID: BigString) => `/webhooks/${hookID}/${token}/messages/${msgID}`
export const WEBHOOK_SLACK = (hookID: BigString) => `/webhooks/${hookID}/slack`
export const WEBHOOK_TOKEN = (hookID: BigString, token: string) => `/webhooks/${hookID}/${token}`
export const WEBHOOK_TOKEN_SLACK = (hookID: BigString, token: string) => `/webhooks/${hookID}/${token}/slack`

// CDN Endpoints
export const ACHIEVEMENT_ICON = (applicationID: BigString, achievementID: BigString, icon: string) =>
  `/app-assets/${applicationID}/achievements/${achievementID}/icons/${icon}`
export const APPLICATION_ASSET = (applicationID: BigString, asset: string) => `/app-assets/${applicationID}/${asset}`
export const APPLICATION_ICON = (applicationID: BigString, icon: string) => `/app-icons/${applicationID}/${icon}`
export const BANNER = (guildOrUserID: BigString, hash: string) => `/banners/${guildOrUserID}/${hash}`
export const CHANNEL_ICON = (chanID: BigString, chanIcon: string) => `/channel-icons/${chanID}/${chanIcon}`
export const CUSTOM_EMOJI = (emojiID: BigString) => `/emojis/${emojiID}`
export const DEFAULT_USER_AVATAR = (userDiscriminator: string) => `/embed/avatars/${userDiscriminator}`
export const GUILD_AVATAR = (guildID: BigString, userID: BigString, guildAvatar: string) =>
  `/guilds/${guildID}/users/${userID}/avatars/${guildAvatar}`
export const GUILD_DISCOVERY_SPLASH = (guildID: BigString, guildDiscoverySplash: string) => `/discovery-splashes/${guildID}/${guildDiscoverySplash}`
export const GUILD_ICON = (guildID: BigString, guildIcon: string) => `/icons/${guildID}/${guildIcon}`
export const GUILD_SPLASH = (guildID: BigString, guildSplash: string) => `/splashes/${guildID}/${guildSplash}`
export const ROLE_ICON = (roleID: BigString, roleIcon: string) => `/role-icons/${roleID}/${roleIcon}`
export const TEAM_ICON = (teamID: BigString, teamIcon: string) => `/team-icons/${teamID}/${teamIcon}`
export const USER_AVATAR = (userID: BigString, userAvatar: string) => `/avatars/${userID}/${userAvatar}`

// Client Endpoints
export const MESSAGE_LINK = (guildID: BigString, channelID: BigString, messageID: BigString) => `/channels/${guildID}/${channelID}/${messageID}`
