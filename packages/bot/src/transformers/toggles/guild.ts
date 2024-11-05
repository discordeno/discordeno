import { type DiscordGuild, GuildFeatures } from '@discordeno/types'
import { ToggleBitfieldBigint } from './ToggleBitfield.js'

const featureNames = [
  'animatedBanner',
  'animatedIcon',
  'applicationCommandPermissionsV2',
  'autoModeration',
  'banner',
  'community',
  'creatorMonetizableProvisional',
  'creatorStorePage',
  'developerSupportServer',
  'discoverable',
  'featurable',
  'invitesDisabled',
  'inviteSplash',
  'memberVerificationGateEnabled',
  'moreSoundboard',
  'moreStickers',
  'news',
  'partnered',
  'previewEnabled',
  'raidAlertsDisabled',
  'roleIcons',
  'roleSubscriptionsAvailableForPurchase',
  'roleSubscriptionsEnabled',
  'ticketedEventsEnabled',
  'vanityUrl',
  'verified',
  'vipRegions',
  'welcomeScreenEnabled',
] as const

export const GuildToggle = {
  /** Whether the bot is the owner of the guild */
  owner: 1n << 0n,
  /** Whether the server widget is enabled */
  widgetEnabled: 1n << 1n,
  /** Whether this is considered a large guild */
  large: 1n << 2n,
  /** Whether this guild is unavailable due to an outage */
  unavailable: 1n << 3n,
  /** Whether the guild has the boost progress bar enabled */
  premiumProgressBarEnabled: 1n << 4n,

  // GUILD FEATURES ARE BELOW THIS
  // MISSING VALUES IN THE BITFIELD: 26, 35+

  /** Whether the guild has access to set an animated guild banner image */
  animatedBanner: 1n << 11n,
  /** Whether the guild has access to set an animated guild icon */
  animatedIcon: 1n << 16n,
  /** Whether the guild is using the old permissions configuration behavior */
  applicationCommandPermissionsV2: 1n << 14n,
  /** Whether the guild has set up auto moderation rules */
  autoModeration: 1n << 28n,
  /** Whether the guild has access to set a guild banner image */
  banner: 1n << 17n,
  /** Whether the guild can enable welcome screen, Membership Screening, stage channels and discovery, and receives community updates */
  community: 1n << 10n,
  /** Whether the guild has enabled monetization. */
  creatorMonetizableProvisional: 1n << 31n,
  /** Whether the guild has enabled the role subscription promo page. */
  creatorStorePage: 1n << 32n,
  /** Whether the guild has been set as a support server on the App Directory */
  developerSupportServer: 1n << 30n,
  /** Whether the guild is able to be discovered in the directory */
  discoverable: 1n << 13n,
  /** Whether the guild is able to be featured in the directory */
  featurable: 1n << 15n,
  /** Whether the guild has paused invites, preventing new users from joining */
  invitesDisabled: 1n << 29n,
  /** Whether the guild has access to set an invite splash background */
  inviteSplash: 1n << 5n,
  /** Whether the guild has enabled [Membership Screening](https://discord.com/developers/docs/resources/guild#membership-screening-object) */
  memberVerificationGateEnabled: 1n << 19n,
  /** Whether the guild has more soundboard sound slot */
  moreSoundboard: 1n << 24n,
  /** Whether the guild has increased custom sticker slots */
  moreStickers: 1n << 23n,
  /** Whether the guild has access to create news channels */
  news: 1n << 12n,
  /** Whether the guild is partnered */
  partnered: 1n << 9n,
  /** Whether the guild can be previewed before joining via Membership Screening or the directory */
  previewEnabled: 1n << 20n,
  /** Whether the guild has disabled alerts for join raids in the configured safety alerts channel */
  raidAlertsDisabled: 1n << 22n,
  /** Whether the guild is able to set role icons */
  roleIcons: 1n << 27n,
  /** Whether the guild has role subscriptions that can be purchased. */
  roleSubscriptionsAvailableForPurchase: 1n << 33n,
  /** Whether the guild has enabled role subscriptions. */
  roleSubscriptionsEnabled: 1n << 34n,
  /** Whether the guild has created soundboard sounds. */
  soundboard: 1n << 25n,
  /** Whether the guild has enabled ticketed events */
  ticketedEventsEnabled: 1n << 21n,
  /** Whether the guild has access to set a vanity URL */
  vanityUrl: 1n << 7n,
  /** Whether the guild is verified */
  verified: 1n << 8n,
  /** Whether the guild has access to set 384 kbps bitrate in voice (previously VIP voice servers) */
  vipRegions: 1n << 6n,
  /** Whether the guild has enabled the welcome screen */
  welcomeScreenEnabled: 1n << 18n,
}

export class GuildToggles extends ToggleBitfieldBigint {
  constructor(guildOrTogglesBigint: DiscordGuild | bigint) {
    super()

    if (typeof guildOrTogglesBigint === 'bigint') this.bitfield = guildOrTogglesBigint
    else {
      const guild = guildOrTogglesBigint
      // Cause discord be smart like that
      if (!guild.features) guild.features = []

      if (guild.owner) this.add(GuildToggle.owner)
      if (guild.widget_enabled) this.add(GuildToggle.widgetEnabled)
      if (guild.large) this.add(GuildToggle.large)
      if (guild.unavailable) this.add(GuildToggle.unavailable)
      if (guild.premium_progress_bar_enabled) this.add(GuildToggle.premiumProgressBarEnabled)

      if (guild.features.includes(GuildFeatures.AnimatedBanner)) this.add(GuildToggle.animatedBanner)
      if (guild.features.includes(GuildFeatures.AnimatedIcon)) this.add(GuildToggle.animatedIcon)
      if (guild.features.includes(GuildFeatures.ApplicationCommandPermissionsV2)) this.add(GuildToggle.applicationCommandPermissionsV2)
      if (guild.features.includes(GuildFeatures.AutoModeration)) this.add(GuildToggle.autoModeration)
      if (guild.features.includes(GuildFeatures.Banner)) this.add(GuildToggle.banner)
      if (guild.features.includes(GuildFeatures.Community)) this.add(GuildToggle.community)
      if (guild.features.includes(GuildFeatures.CreatorMonetizableProvisional)) this.add(GuildToggle.creatorMonetizableProvisional)
      if (guild.features.includes(GuildFeatures.CreatorStorePage)) this.add(GuildToggle.creatorStorePage)
      if (guild.features.includes(GuildFeatures.DeveloperSupportServer)) this.add(GuildToggle.developerSupportServer)
      if (guild.features.includes(GuildFeatures.Discoverable)) this.add(GuildToggle.discoverable)
      if (guild.features.includes(GuildFeatures.Featurable)) this.add(GuildToggle.featurable)
      if (guild.features.includes(GuildFeatures.InvitesDisabled)) this.add(GuildToggle.invitesDisabled)
      if (guild.features.includes(GuildFeatures.InviteSplash)) this.add(GuildToggle.inviteSplash)
      if (guild.features.includes(GuildFeatures.MemberVerificationGateEnabled)) this.add(GuildToggle.memberVerificationGateEnabled)
      if (guild.features.includes(GuildFeatures.MoreSoundboard)) this.add(GuildToggle.moreSoundboard)
      if (guild.features.includes(GuildFeatures.MoreStickers)) this.add(GuildToggle.moreStickers)
      if (guild.features.includes(GuildFeatures.News)) this.add(GuildToggle.news)
      if (guild.features.includes(GuildFeatures.Partnered)) this.add(GuildToggle.partnered)
      if (guild.features.includes(GuildFeatures.PreviewEnabled)) this.add(GuildToggle.previewEnabled)
      if (guild.features.includes(GuildFeatures.RaidAlertsDisabled)) this.add(GuildToggle.raidAlertsDisabled)
      if (guild.features.includes(GuildFeatures.RoleIcons)) this.add(GuildToggle.roleIcons)
      if (guild.features.includes(GuildFeatures.RoleSubscriptionsAvailableForPurchase)) this.add(GuildToggle.roleSubscriptionsAvailableForPurchase)
      if (guild.features.includes(GuildFeatures.RoleSubscriptionsEnabled)) this.add(GuildToggle.roleSubscriptionsEnabled)
      if (guild.features.includes(GuildFeatures.Soundboard)) this.add(GuildToggle.soundboard)
      if (guild.features.includes(GuildFeatures.TicketedEventsEnabled)) this.add(GuildToggle.ticketedEventsEnabled)
      if (guild.features.includes(GuildFeatures.VanityUrl)) this.add(GuildToggle.vanityUrl)
      if (guild.features.includes(GuildFeatures.Verified)) this.add(GuildToggle.verified)
      if (guild.features.includes(GuildFeatures.VipRegions)) this.add(GuildToggle.vipRegions)
      if (guild.features.includes(GuildFeatures.WelcomeScreenEnabled)) this.add(GuildToggle.welcomeScreenEnabled)
    }
  }

  get features(): GuildFeatureKeys[] {
    const features: GuildFeatureKeys[] = []
    for (const key of Object.keys(GuildToggle)) {
      if (!featureNames.includes(key as GuildFeatureKeys)) continue
      if (!super.contains(GuildToggle[key as GuildToggleKeys])) continue

      features.push(key as GuildFeatureKeys)
    }

    return features
  }

  /** Whether the bot is the owner of the guild */
  get owner(): boolean {
    return this.has('owner')
  }

  /** Whether the server widget is enabled */
  get widgetEnabled(): boolean {
    return this.has('widgetEnabled')
  }

  /** Whether this is considered a large guild */
  get large(): boolean {
    return this.has('large')
  }

  /** Whether this guild is unavailable due to an outage */
  get unavailable(): boolean {
    return this.has('unavailable')
  }

  /** Whether the guild has the boost progress bar enabled */
  get premiumProgressBarEnabled(): boolean {
    return this.has('premiumProgressBarEnabled')
  }

  /** Whether the guild has access to set an invite splash background */
  get inviteSplash(): boolean {
    return this.has('inviteSplash')
  }

  /** Whether the guild has access to set 384 kbps bitrate in voice (previously VIP voice servers) */
  get vipRegions(): boolean {
    return this.has('vipRegions')
  }

  /** Whether the guild has access to set a vanity URL */
  get vanityUrl(): boolean {
    return this.has('vanityUrl')
  }

  /** Whether the guild is verified */
  get verified(): boolean {
    return this.has('verified')
  }

  /** Whether the guild is partnered */
  get partnered(): boolean {
    return this.has('partnered')
  }

  /** Whether the guild can enable welcome screen, Membership Screening, stage channels and discovery, and receives community updates */
  get community(): boolean {
    return this.has('community')
  }

  /** Whether the Guild has been set as a support server on the App Directory */
  get developerSupportServer(): boolean {
    return this.has('developerSupportServer')
  }

  /** Whether the guild has access to set an animated guild banner image */
  get animatedBanner(): boolean {
    return this.has('animatedBanner')
  }

  /** Whether the guild has access to create news channels */
  get news(): boolean {
    return this.has('news')
  }

  /** Whether the guild is able to be discovered in the directory */
  get discoverable(): boolean {
    return this.has('discoverable')
  }

  /** Whether the guild is able to be featured in the directory */
  get featurable(): boolean {
    return this.has('featurable')
  }

  /** Whether the guild has access to set an animated guild icon */
  get animatedIcon(): boolean {
    return this.has('animatedIcon')
  }

  /** Whether the guild has access to set a guild banner image */
  get banner(): boolean {
    return this.has('banner')
  }

  /** Whether the guild has enabled the welcome screen */
  get welcomeScreenEnabled(): boolean {
    return this.has('welcomeScreenEnabled')
  }

  /** Whether the guild has enabled [Membership Screening](https://discord.com/developers/docs/resources/guild#membership-screening-object) */
  get memberVerificationGateEnabled(): boolean {
    return this.has('memberVerificationGateEnabled')
  }

  /** Whether the guild has more soundboard sound slot */
  get moreSoundboard(): boolean {
    return this.has('moreSoundboard')
  }

  /** Whether the guild can be previewed before joining via Membership Screening or the directory */
  get previewEnabled(): boolean {
    return this.has('previewEnabled')
  }

  /** Whether the guild has enabled ticketed events */
  get ticketedEventsEnabled(): boolean {
    return this.has('ticketedEventsEnabled')
  }

  /** Whether the guild has increased custom sticker slots */
  get moreStickers(): boolean {
    return this.has('moreStickers')
  }

  /** Whether the guild is able to set role icons */
  get roleIcons(): boolean {
    return this.has('roleIcons')
  }

  /** Whether the guild has set up auto moderation rules */
  get autoModeration(): boolean {
    return this.has('autoModeration')
  }

  /** Whether the guild has paused invites, preventing new users from joining */
  get invitesDisabled(): boolean {
    return this.has('invitesDisabled')
  }

  /** Whether the guild is using the old permissions configuration behavior */
  get applicationCommandPermissionsV2(): boolean {
    return this.has('applicationCommandPermissionsV2')
  }

  /** Whether the guild has enabled monetization. */
  get creatorMonetizableProvisional(): boolean {
    return this.has('creatorMonetizableProvisional')
  }

  /** Whether the guild has enabled the role subscription promo page. */
  get creatorStorePage(): boolean {
    return this.has('creatorStorePage')
  }

  /** Whether the guild has disabled alerts for join raids in the configured safety alerts channel */
  get raidAlertsDisabled(): boolean {
    return this.has('raidAlertsDisabled')
  }

  /** Whether the guild has role subscriptions that can be purchased. */
  get roleSubscriptionsAvailableForPurchase(): boolean {
    return this.has('roleSubscriptionsAvailableForPurchase')
  }

  /** Whether the guild has enabled role subscriptions. */
  get roleSubscriptionsEnabled(): boolean {
    return this.has('roleSubscriptionsEnabled')
  }

  /** Whether the guild has created soundboard sounds. */
  get soundboard(): boolean {
    return this.has('soundboard')
  }

  /** Checks whether or not the permissions exist in this */
  has(permissions: GuildToggleKeys | GuildToggleKeys[]): boolean {
    if (!Array.isArray(permissions)) return super.contains(GuildToggle[permissions])

    return super.contains(permissions.reduce((a, b) => (a |= GuildToggle[b]), 0n))
  }

  /** Lists all the toggles for the role and whether or not each is true or false. */
  list(): Record<GuildToggleKeys, boolean> {
    const json: Record<string, boolean> = {}
    for (const [key, value] of Object.entries(GuildToggle)) {
      json[key] = super.contains(value)
    }

    return json as Record<GuildToggleKeys, boolean>
  }
}

export type GuildToggleKeys = keyof typeof GuildToggle

export type GuildFeatureKeys = (typeof featureNames)[number]
