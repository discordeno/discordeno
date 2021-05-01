/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#voice */
export enum DiscordVoiceOpcodes {
  Identify,
  SelectProtocol,
  Ready,
  Heartbeat,
  SessionDescription,
  Speaking,
  HeartbeatACK,
  Resume,
  Hello,
  Resumed,
  ClientDisconnect = 13,
}

export type VoiceOpcodes = DiscordVoiceOpcodes;
export const VoiceOpcodes = DiscordVoiceOpcodes;
