import { DiscordGuild } from "../../types/discord.ts";
import { GuildFeatures } from "../../types/shared.ts";
import { ToggleBitfield } from "./ToggleBitfield.ts";

export const GuildToggle = {
  /** Whether the bot is the owner of the guild */
  owner: 1 << 0,
  /** Whether the server widget is enabled */
  widgetEnabled: 1 << 1,
  /** Whether this is considered a large guild */
  large: 1 << 2,
  /** Whether this guild is unavailable due to an outage */
  unavailable: 1 << 3,
  /** Whether the guild has the boost progress bar enabled */
  premiumProgressBarEnabled: 1 << 4,

  // GUILD FEATURES ARE BELOW THIS

  /** Whether the guild has access to set an invite splash background */
  inviteSplash: 1 << 5,
  /** Whether the guild has access to set 384kbps bitrate in voice (previously VIP voice servers) */
  vipRegions: 1 << 6,
  /** Whether the guild has access to set a vanity URL */
  vanityUrl: 1 << 7,
  /** Whether the guild is verified */
  verified: 1 << 8,
  /** Whether the guild is partnered */
  partnered: 1 << 9,
  /** Whether the guild can enable welcome screen, Membership Screening, stage channels and discovery, and recives community updates */
  community: 1 << 10,
  /** Whether the guild has access to use commerce features (i.e. create store channels) */
  commerce: 1 << 11,
  /** Whether the guild has access to create news channels */
  news: 1 << 12,
  /** Whether the guild is able to be discovered in the directory */
  discoverable: 1 << 13,
  /** Whether the guild cannot be discoverable */
  discoverableDisabled: 1 << 14,
  /** Whether the guild is able to be featured in the directory */
  feature: 1 << 15,
  /** Whether the guild has access to set an animated guild icon */
  animatedIcon: 1 << 16,
  /** Whether the guild has access to set a guild banner image */
  banner: 1 << 17,
  /** Whether the guild has enabled the welcome screen */
  welcomeScreenEnabled: 1 << 18,
  /** Whether the guild has enabled [Membership Screening](https://discord.com/developers/docs/resources/guild#membership-screening-object) */
  memberVerificationGateEnabled: 1 << 19,
  /** Whether the guild can be previewed before joining via Membership Screening or the directory */
  previewEnabled: 1 << 20,
  /** Whether the guild has enabled ticketed events */
  ticketedEventsEnabled: 1 << 21,
  /** Whether the guild has enabled monetization */
  monetizationEnabled: 1 << 22,
  /** Whether the guild has increased custom sticker slots */
  moreStickers: 1 << 23,
  /** Whether the guild has access to the three day archive time for threads */
  threeDayThreadArchive: 1 << 24,
  /** Whether the guild has access to the seven day archive time for threads */
  sevenDayThreadArchive: 1 << 25,
  /** Whether the guild has access to create private threads */
  privateThreads: 1 << 26,
  /** Whether the guild is able to set role icons */
  roleIcons: 1 << 27,
};

export class GuildToggles extends ToggleBitfield {
  constructor(guild: DiscordGuild) {
    super();

    if (guild.owner) this.add(GuildToggle.owner);
    if (guild.widget_enabled) this.add(GuildToggle.widgetEnabled);
    if (guild.large) this.add(GuildToggle.large);
    if (guild.unavailable) this.add(GuildToggle.unavailable);
    if (guild.premium_progress_bar_enabled) this.add(GuildToggle.premiumProgressBarEnabled);

    if (guild.features.includes(GuildFeatures.InviteSplash)) this.add(GuildToggle.inviteSplash);
    if (guild.features.includes(GuildFeatures.VipRegions)) this.add(GuildToggle.vipRegions);
    if (guild.features.includes(GuildFeatures.VanityUrl)) this.add(GuildToggle.vanityUrl);
    if (guild.features.includes(GuildFeatures.Verified)) this.add(GuildToggle.verified);
    if (guild.features.includes(GuildFeatures.Partnered)) this.add(GuildToggle.partnered);
    if (guild.features.includes(GuildFeatures.Community)) this.add(GuildToggle.community);
    if (guild.features.includes(GuildFeatures.Commerce)) this.add(GuildToggle.commerce);
    if (guild.features.includes(GuildFeatures.News)) this.add(GuildToggle.news);
    if (guild.features.includes(GuildFeatures.Discoverable)) this.add(GuildToggle.discoverable);
    if (guild.features.includes(GuildFeatures.DiscoverableDisabled)) this.add(GuildToggle.discoverableDisabled);
    if (guild.features.includes(GuildFeatures.Feature)) this.add(GuildToggle.feature);
    if (guild.features.includes(GuildFeatures.AnimatedIcon)) this.add(GuildToggle.animatedIcon);
    if (guild.features.includes(GuildFeatures.Banner)) this.add(GuildToggle.banner);
    if (guild.features.includes(GuildFeatures.WelcomeScreenEnabled)) this.add(GuildToggle.welcomeScreenEnabled);
    if (guild.features.includes(GuildFeatures.MemberVerificationGateEnabled)) {
      this.add(GuildToggle.memberVerificationGateEnabled);
    }
    if (guild.features.includes(GuildFeatures.PreviewEnabled)) this.add(GuildToggle.previewEnabled);
    if (guild.features.includes(GuildFeatures.TicketedEventsEnabled)) this.add(GuildToggle.ticketedEventsEnabled);
    if (guild.features.includes(GuildFeatures.MonetizationEnabled)) this.add(GuildToggle.monetizationEnabled);
    if (guild.features.includes(GuildFeatures.MoreStickers)) this.add(GuildToggle.moreStickers);
    if (guild.features.includes(GuildFeatures.ThreeDayThreadArchive)) this.add(GuildToggle.threeDayThreadArchive);
    if (guild.features.includes(GuildFeatures.SevenDayThreadArchive)) this.add(GuildToggle.sevenDayThreadArchive);
    if (guild.features.includes(GuildFeatures.PrivateThreads)) this.add(GuildToggle.privateThreads);
    if (guild.features.includes(GuildFeatures.RoleIcons)) this.add(GuildToggle.roleIcons);
  }

  /** Whether the bot is the owner of the guild */
  get owner() {
    return this.has("owner");
  }

  /** Whether the server widget is enabled */
  get widgetEnabled() {
    return this.has("widgetEnabled");
  }

  /** Whether this is considered a large guild */
  get large() {
    return this.has("large");
  }

  /** Whether this guild is unavailable due to an outage */
  get unavailable() {
    return this.has("unavailable");
  }

  /** Whether the guild has the boost progress bar enabled */
  get premiumProgressBarEnabled() {
    return this.has("premiumProgressBarEnabled");
  }

  /** Whether the guild has access to set an invite splash background */
  get InviteSplash() {
    return this.has("inviteSplash");
  }
  /** Whether the guild has access to set 384kbps bitrate in voice (previously VIP voice servers) */
  get VipRegions() {
    return this.has("vipRegions");
  }
  /** Whether the guild has access to set a vanity URL */
  get VanityUrl() {
    return this.has("vanityUrl");
  }
  /** Whether the guild is verified */
  get Verified() {
    return this.has("verified");
  }
  /** Whether the guild is partnered */
  get Partnered() {
    return this.has("partnered");
  }
  /** Whether the guild can enable welcome screen, Membership Screening, stage channels and discovery, and recives community updates */
  get Community() {
    return this.has("community");
  }
  /** Whether the guild has access to use commerce features (i.e. create store channels) */
  get Commerce() {
    return this.has("commerce");
  }
  /** Whether the guild has access to create news channels */
  get News() {
    return this.has("news");
  }
  /** Whether the guild is able to be discovered in the directory */
  get Discoverable() {
    return this.has("discoverable");
  }
  /** Whether the guild cannot be discoverable */
  get DiscoverableDisabled() {
    return this.has("discoverableDisabled");
  }
  /** Whether the guild is able to be featured in the directory */
  get Feature() {
    return this.has("feature");
  }
  /** Whether the guild has access to set an animated guild icon */
  get AnimatedIcon() {
    return this.has("animatedIcon");
  }
  /** Whether the guild has access to set a guild banner image */
  get Banner() {
    return this.has("banner");
  }
  /** Whether the guild has enabled the welcome screen */
  get WelcomeScreenEnabled() {
    return this.has("welcomeScreenEnabled");
  }
  /** Whether the guild has enabled [Membership Screening](https://discord.com/developers/docs/resources/guild#membership-screening-object) */
  get MemberVerificationGateEnabled() {
    return this.has("memberVerificationGateEnabled");
  }
  /** Whether the guild can be previewed before joining via Membership Screening or the directory */
  get PreviewEnabled() {
    return this.has("previewEnabled");
  }
  /** Whether the guild has enabled ticketed events */
  get TicketedEventsEnabled() {
    return this.has("ticketedEventsEnabled");
  }
  /** Whether the guild has enabled monetization */
  get MonetizationEnabled() {
    return this.has("monetizationEnabled");
  }
  /** Whether the guild has increased custom sticker slots */
  get MoreStickers() {
    return this.has("moreStickers");
  }
  /** Whether the guild has access to the three day archive time for threads */
  get ThreeDayThreadArchive() {
    return this.has("threeDayThreadArchive");
  }
  /** Whether the guild has access to the seven day archive time for threads */
  get SevenDayThreadArchive() {
    return this.has("sevenDayThreadArchive");
  }
  /** Whether the guild has access to create private threads */
  get PrivateThreads() {
    return this.has("privateThreads");
  }
  /** Whether the guild is able to set role icons */
  get RoleIcons() {
    return this.has("roleIcons");
  }

  /** Checks whether or not the permissions exist in this */
  has(permissions: GuildToggleKeys | GuildToggleKeys[]) {
    if (!Array.isArray(permissions)) return super.contains(GuildToggle[permissions]);

    return super.contains(permissions.reduce((a, b) => (a |= GuildToggle[b]), 0));
  }

  /** Lists all the toggles for the role and whether or not each is true or false. */
  list() {
    const json = {};
    for (const [key, value] of Object.entries(GuildToggle)) {
      // @ts-ignore
      json[key] = super.contains(value);
    }

    return json as Record<GuildToggleKeys, boolean>;
  }
}

export type GuildToggleKeys = keyof typeof GuildToggle;
