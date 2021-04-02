import { SnakeCaseProps } from "../util.ts";

export interface GatewayVoiceStateUpdate {
  /** Id of the guild */
  guildId: string;
  /** Id of the voice channel client wants to join (null if disconnecting) */
  channelId: string | null;
  /** Is the client muted */
  selfMute: boolean;
  /** Is the client deafened */
  selfDeaf: boolean;
}

/** https://discord.com/developers/docs/topics/gateway#update-voice-state-gateway-voice-state-update-structure */
export type DiscordGatewayVoiceStateUpdate = SnakeCaseProps<
  GatewayVoiceStateUpdate
>;
