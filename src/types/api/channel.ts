/** https://discord.com/developers/docs/resources/channel#channel-object-channel-types */
export enum DiscordChannelTypes {
  /** a text channel within a server */
  GUILD_TEXT,
  /** a direct message between users */
  DM,
  /** a voice channel within a server */
  GUILD_VOICE,
  /** a direct message between multiple users */
  GROUP_DM,
  /** an organizational category that contains up to 50 channels */
  GUILD_CATEGORY,
  /** a channel that users can follow and crosspost into their own server */
  GUILD_NEWS,
  /** a channel in which game developers can sell their game on Discord */
  GUILD_STORE,
}
