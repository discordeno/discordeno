import { DiscordGuild } from "../../types/discord.ts";
import { GuildFeatures } from "../../types/shared.ts";
import { ToggleBitfieldBigint } from "./ToggleBitfield.ts";

const featureNames = [
  "inviteSplash",
  "vipRegions",
  "vanityUrl",
  "verified",
  "partnered",
  "community",
  "developerSupportServer",
  "news",
  "discoverable",
  "featurable",
  "animatedIcon",
  "banner",
  "welcomeScreenEnabled",
  "memberVerificationGateEnabled",
  "previewEnabled",
  "ticketedEventsEnabled",
  "monetizationEnabled",
  "moreStickers",
  "privateThreads",
  "roleIcons",
  "autoModeration",
  "invitesDisabled",
  "animatedBanner",
];

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

  /** Whether the guild has access to set an invite splash background */
  inviteSplash: 1n << 5n,
  /** Whether the guild has access to set 384 kbps bitrate in voice (previously VIP voice servers) */
  vipRegions: 1n << 6n,
  /** Whether the guild has access to set a vanity URL */
  vanityUrl: 1n << 7n,
  /** Whether the guild is verified */
  verified: 1n << 8n,
  /** Whether the guild is partnered */
  partnered: 1n << 9n,
  /** Whether the guild can enable welcome screen, Membership Screening, stage channels and discovery, and receives community updates */
  community: 1n << 10n,
  /** Whether the guild has access to set an animated guild banner image */
  animatedBanner: 1n << 11n,
  /** Whether the guild has access to create news channels */
  news: 1n << 12n,
  /** Whether the guild is able to be discovered in the directory */
  discoverable: 1n << 13n,
  /** Whether the guild is able to be featured in the directory */
  featurable: 1n << 15n,
  /** Whether the guild has access to set an animated guild icon */
  animatedIcon: 1n << 16n,
  /** Whether the guild has access to set a guild banner image */
  banner: 1n << 17n,
  /** Whether the guild has enabled the welcome screen */
  welcomeScreenEnabled: 1n << 18n,
  /** Whether the guild has enabled [Membership Screening](https://discord.com/developers/docs/resources/guild#membership-screening-object) */
  memberVerificationGateEnabled: 1n << 19n,
  /** Whether the guild can be previewed before joining via Membership Screening or the directory */
  previewEnabled: 1n << 20n,
  /** Whether the guild has enabled ticketed events */
  ticketedEventsEnabled: 1n << 21n,
  /** Whether the guild has enabled monetization */
  monetizationEnabled: 1n << 22n,
  /** Whether the guild has increased custom sticker slots */
  moreStickers: 1n << 23n,
  /** Whether the guild has access to create private threads */
  privateThreads: 1n << 26n,
  /** Whether the guild is able to set role icons */
  roleIcons: 1n << 27n,
  /** Whether the guild has set up auto moderation rules */
  autoModeration: 1n << 28n,
  /** Whether the guild has paused invites, preventing new users from joining */
  invitesDisabled: 1n << 29n,
  /** Whether the guild has been set as a support server on the App Directory */
  developerSupportServer: 1n << 30n,
};

export class GuildToggles extends ToggleBitfieldBigint {
  constructor(guildOrTogglesBigint: DiscordGuild | bigint) {
    super();

    if (typeof guildOrTogglesBigint == "bigint") this.bitfield = guildOrTogglesBigint;
    else {
      const guild = guildOrTogglesBigint;

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
      if (guild.features.includes(GuildFeatures.DeveloperSupportServer)) this.add(GuildToggle.developerSupportServer);
      if (guild.features.includes(GuildFeatures.AnimatedBanner)) this.add(GuildToggle.animatedBanner);
      if (guild.features.includes(GuildFeatures.News)) this.add(GuildToggle.news);
      if (guild.features.includes(GuildFeatures.Discoverable)) this.add(GuildToggle.discoverable);
      if (guild.features.includes(GuildFeatures.Featurable)) this.add(GuildToggle.featurable);
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
      if (guild.features.includes(GuildFeatures.PrivateThreads)) this.add(GuildToggle.privateThreads);
      if (guild.features.includes(GuildFeatures.RoleIcons)) this.add(GuildToggle.roleIcons);
      if (guild.features.includes(GuildFeatures.AutoModeration)) this.add(GuildToggle.autoModeration);
      if (guild.features.includes(GuildFeatures.InvitesDisabled)) this.add(GuildToggle.invitesDisabled);
    }
  }

  get features() {
    const features: GuildToggleKeys[] = [];
    for (const key of Object.keys(GuildToggle)) {
      if (!featureNames.includes(key)) continue;
      if (!super.contains(GuildToggle[key as GuildToggleKeys])) continue;

      features.push(key as GuildToggleKeys);
    }

    return features;
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
  get inviteSplash() {
    return this.has("inviteSplash");
  }
  /** Whether the guild has access to set 384 kbps bitrate in voice (previously VIP voice servers) */
  get vipRegions() {
    return this.has("vipRegions");
  }
  /** Whether the guild has access to set a vanity URL */
  get vanityUrl() {
    return this.has("vanityUrl");
  }
  /** Whether the guild is verified */
  get verified() {
    return this.has("verified");
  }
  /** Whether the guild is partnered */
  get partnered() {
    return this.has("partnered");
  }
  /** Whether the guild can enable welcome screen, Membership Screening, stage channels and discovery, and receives community updates */
  get community() {
    return this.has("community");
  }
  /** Whether the Guild has been set as a support server on the App Directory */
  get developerSupportServer() {
    return this.has("developerSupportServer");
  }
  /** Whether the guild has access to set an animated guild banner image */
  get animatedBanner() {
    return this.has("animatedBanner");
  }
  /** Whether the guild has access to create news channels */
  get news() {
    return this.has("news");
  }
  /** Whether the guild is able to be discovered in the directory */
  get discoverable() {
    return this.has("discoverable");
  }
  /** Whether the guild is able to be featured in the directory */
  get featurable() {
    return this.has("featurable");
  }
  /** Whether the guild has access to set an animated guild icon */
  get animatedIcon() {
    return this.has("animatedIcon");
  }
  /** Whether the guild has access to set a guild banner image */
  get banner() {
    return this.has("banner");
  }
  /** Whether the guild has enabled the welcome screen */
  get welcomeScreenEnabled() {
    return this.has("welcomeScreenEnabled");
  }
  /** Whether the guild has enabled [Membership Screening](https://discord.com/developers/docs/resources/guild#membership-screening-object) */
  get memberVerificationGateEnabled() {
    return this.has("memberVerificationGateEnabled");
  }
  /** Whether the guild can be previewed before joining via Membership Screening or the directory */
  get previewEnabled() {
    return this.has("previewEnabled");
  }
  /** Whether the guild has enabled ticketed events */
  get ticketedEventsEnabled() {
    return this.has("ticketedEventsEnabled");
  }
  /** Whether the guild has enabled monetization */
  get monetizationEnabled() {
    return this.has("monetizationEnabled");
  }
  /** Whether the guild has increased custom sticker slots */
  get moreStickers() {
    return this.has("moreStickers");
  }

  /** Whether the guild has access to create private threads */
  get privateThreads() {
    return this.has("privateThreads");
  }
  /** Whether the guild is able to set role icons */
  get roleIcons() {
    return this.has("roleIcons");
  }

  /** Whether the guild has set up auto moderation rules */
  get autoModeration() {
    return this.has("autoModeration");
  }

  /** Whether the guild has paused invites, preventing new users from joining */
  get invitesDisabled() {
    return this.has("invitesDisabled");
  }

  /** Checks whether or not the permissions exist in this */
  has(permissions: GuildToggleKeys | GuildToggleKeys[]) {
    if (!Array.isArray(permissions)) return super.contains(GuildToggle[permissions]);

    return super.contains(permissions.reduce((a, b) => (a |= GuildToggle[b]), 0n));
  }

  /** Lists all the toggles for the role and whether or not each is true or false. */
  list() {
    const json: Record<string, boolean> = {};
    for (const [key, value] of Object.entries(GuildToggle)) {
      json[key] = super.contains(value);
    }

    return json as Record<GuildToggleKeys, boolean>;
  }
}

export type GuildToggleKeys = keyof typeof GuildToggle;
