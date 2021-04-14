/** https://discord.com/developers/docs/resources/channel#channel-object-channel-types */
export enum DiscordChannelTypes {
  /** A text channel within a server */
  GUILD_TEXT,
  /** A direct message between users */
  DM,
  /** A voice channel within a server */
  GUILD_VOICE,
  /** A direct message between multiple users */
  GROUP_DM,
  /** An organizational category that contains up to 50 channels */
  GUILD_CATEGORY,
  /** A channel that users can follow and crosspost into their own server */
  GUILD_NEWS,
  /** A channel in which game developers can sell their game on Discord */
  GUILD_STORE,
  /** A voice channel for hosting events with an audience */
  GUILD_STAGE_VOICE = 13,
}
