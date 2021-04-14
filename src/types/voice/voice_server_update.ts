import { SnakeCasedPropertiesDeep } from "../util.ts";

export interface VoiceServerUpdate {
  /** Voice connection token */
  token: string;
  /** The guild this voice server update is for */
  guildId: string;
  /** The voice server host */
  endpoint: string | null;
}

/** https://discord.com/developers/docs/topics/gateway#voice-server-update */
export type DiscordVoiceServerUpdate = SnakeCasedPropertiesDeep<
  VoiceServerUpdate
>;
