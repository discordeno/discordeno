/** https://discord.com/developers/docs/resources/guild#guild-object-guild-features */
export enum DiscordGuildFeatures {
  /** Guild has access to set an invite splash background */
  INVITE_SPLASH = "INVITE_SPLASH",
  /** Guild has access to set 384kbps bitrate in voice (previously VIP voice servers) */
  VIP_REGIONS = "VIP_REGIONS",
  /** Guild has access to set a vanity URL */
  VANITY_URL = "VANITY_URL",
  /** Guild is verified */
  VERIFIED = "VERIFIED",
  /** Guild is partnered */
  PARTNERED = "PARTNERED",
  /** Guild can enable welcome screen, Membership Screening, stage channels and discovery, and recives community updates */
  COMMUNITY = "COMMUNITY",
  /** Guild has access to use commerce features (i.e. create store channels) */
  COMMERCE = "COMMERCE",
  /** Guild has access to create news channels */
  NEWS = "NEWS",
  /** Guild is able to be discovered in the directory */
  DISCOVERABLE = "DISCOVERABLE",
  /** Guild is able to be featured in the directory */
  FEATURABLE = "FEATURABLE",
  /** Guild has access to set an animated guild icon */
  ANIMATED_ICON = "ANIMATED_ICON",
  /** Guild has access to set a guild banner image */
  BANNER = "BANNER",
  /** Guild has enabled the welcome screen */
  WELCOME_SCREEN_ENABLED = "WELCOME_SCREEN_ENABLED",
  /** Guild has enabled [Membership Screening](https://discord.com/developers/docs/resources/guild#membership-screening-object) */
  MEMBER_VERIFICATION_GATE_ENABLED = "MEMBER_VERIFICATION_GATE_ENABLED",
  /** Guild can be previewed before joining via Membership Screening or the directory */
  PREVIEW_ENABLED = "PREVIEW_ENABLED",
}
