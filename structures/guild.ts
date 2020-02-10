import Client from "../module/Client"
import { endpoints } from "../constants/discord"
import { formatImageURL } from "../utils/cdn"

interface CreateGuildPayload {
	/** The guild id */
	id: string
	/** The guild name 2-100 characters */
	name: string
	/** The guild icon image hash */
	icon: string | null
	/** The guild splash image hash */
	splash: string | null
	/** The id of the owner */
	owner_id: string
	/** The voice region id for the guild */
	region: string
	/** The afk channel id */
	afk_channel_id: string | null
	/** AFK Timeout in seconds. */
	afk_timeout: number
	/** The verification level required for the guild */
	verification_level: number
	/** The roles in the guild */
	roles: Role[]
	/** The custom guild emojis */
	emojis: Emoji[]
	/** Enabled guild features */
	features: GuildFeatures[]
	/** Required MFA level for the guild */
	mfa_level: number
	/** The id of the channel to which system mesages are sent */
	system_channel_id: string | null
	/** When this guild was joined at */
	joined_at: string
	/** Whether this is considered a large guild */
	large: boolean
	/** Whether this guild is unavailable */
	unavailable: boolean
	/** Total number of members in this guild */
	member_count: number
	voice_states: VoiceState[]
	/** Users in the guild */
	members: Member[]
	/** Channels in the guild */
	channels: Channel[]
	presences: Presence[]
	/** The maximum amount of presences for the guild(the default value, currently 5000 is in effect when null is returned.) */
	max_presences?: number | null
	/** The maximum amount of members for the guild */
	max_members?: number
	/** The vanity url code for the guild */
	vanity_url_code: string | null
	/** The description for the guild */
	description: string | null
	/** The banner hash */
	banner: string | null
	/** The premium tier */
	premium_tier: number
	/** The total number of users currently boosting this server. */
	premium_subscription_count: number
	/** The preferred local of this guild only set if guild has the DISCOVERABLE feature, defaults to en-US */
	preferred_locale: string
}

interface Guild {
	/** The guild id */
	id: string
	/** The guild name 2-100 characters */
	name: string
	/** The guild icon image hash */
	icon: string | null
	/** The guild splash image hash */
	splash: string | null
	/** The id of the owner */
	ownerID: string
	/** The voice region id for the guild */
	region: string
	/** The afk channel id */
	afkChannelID: string | null
	/** AFK Timeout in seconds. */
	afkTimeout: number
	/** The verification level required for the guild */
	verificationLevel: number
	/** The roles in the guild */
	roles: Role[]
	/** The custom guild emojis */
	emojis: Emoji[]
	/** Enabled guild features */
	features: GuildFeatures[]
	/** Required MFA level for the guild */
	mfaLevel: number
	/** The id of the channel to which system mesages are sent */
	systemChannelID: string | null
	/** When this guild was joined at */
	joinedAt: number
	/** Whether this is considered a large guild */
	large: boolean
	/** Whether this guild is unavailable */
	unavailable: boolean
	/** Total number of members in this guild */
	memberCount: number
	voiceStates: VoiceState[]
	/** Users in the guild */
	members: Member[]
	/** Channels in the guild */
	channels: Channel[]
	presences: Presence[]
	/** The maximum amount of presences for the guild(the default value, currently 5000 is in effect when null is returned.) */
	maxPresences?: number | null
	/** The maximum amount of members for the guild */
	maxMembers?: number
	/** The vanity url code for the guild */
	vanityURLCode: string | null
	/** The description for the guild */
	description: string | null
	/** The banner hash */
	banner: string | null
	/** The premium tier */
	premiumTier: number
	/** The total number of users currently boosting this server. */
	premiumSubscriptionCount: number
	/** The preferred local of this guild only set if guild has the DISCOVERABLE feature, defaults to en-US */
	preferredLocale: string
	/** The full URL of the icon from Discords CDN. Undefined when no icon is set. */
	iconURL(): string | undefined
	/** The full URL of the splash from Discords CDN. Undefined if no splash is set. */
	splashURL(): string | undefined
	/** The full URL of the banner from Discords CDN. Undefined if no banner is set. */
	bannerURL(): string | undefined
}

export type ImageSize = 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048
export type ImageFormats = 'jpg' | 'jpeg' | 'png' | 'webp' | 'gif'

export const createGuild = (data: CreateGuildPayload, client: Client) => {
	const guild: Guild = {
		id: data.id,
		name: data.name,
		icon: data.icon,
		splash: data.splash,
		ownerID: data.owner_id,
		region: data.region,
		afkChannelID: data.afk_channel_id,
		afkTimeout: data.afk_timeout,
		verificationLevel: data.verification_level,
		roles: data.roles.map(role => createRole(role)),
		emojis: data.emojis.map(emoji => createEmoji(emoji)),
		features: data.features,
		mfaLevel: data.mfa_level,
		systemChannelID: data.system_channel_id,
		joinedAt: Date.parse(data.joined_at),
		large: data.large,
		unavailable: data.unavailable,
		memberCount: data.member_count,
		voiceStates: data.voice_states.map(voiceState => createVoiceState(voiceState)),
		members: data.members.map(member => createMember(member)),
		channels: data.channels.map(channel => createChannel(channel)),
		presences: data.presences.map(presence => createPresence(presence)),
		maxPresences: data.max_presences,
		maxMembers: data.max_members,
		vanityURLCode: data.vanity_url_code,
		description: data.description,
		banner: data.banner,
		premiumTier: data.premium_tier,
		premiumSubscriptionCount: data.premium_subscription_count,
		preferredLocale: data.preferred_locale,
		iconURL: (size: ImageSize = 128, format?: ImageFormats) => data.icon ? formatImageURL(endpoints.GUILD_ICON(data.id, data.icon), size, format) : undefined,
		splashURL: (size: ImageSize = 128, format?: ImageFormats) => data.splash ? formatImageURL(endpoints.GUILD_SPLASH(data.id, data.splash), size, format) : undefined,
		bannerURL: (size: ImageSize = 128, format?: ImageFormats) => data.banner ? formatImageURL(endpoints.GUILD_BANNER(data.id, data.banner), size, format) : undefined,
		createChannel: (name, )
	}

	return guild
}
