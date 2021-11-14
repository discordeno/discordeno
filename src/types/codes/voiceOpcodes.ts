/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#voice */
export enum VoiceOpcodes {
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
