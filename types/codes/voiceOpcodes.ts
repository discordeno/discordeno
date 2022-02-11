/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#voice */
export enum VoiceOpcodes {
  /** Begin a voice websocket connection. */
  Identify,
  /** Select the voice protocol. */
  SelectProtocol,
  /** Complete the websocket handshake. */
  Ready,
  /** Keep the websocket connection alive. */
  Heartbeat,
  /** Describe the session. */
  SessionDescription,
  /** Indicate which users are speaking. */
  Speaking,
  /** Sent to acknowledge a received client heartbeat. */
  HeartbeatACK,
  /** Resume a connection. */
  Resume,
  /** Time to wait between sending heartbeats in milliseconds. */
  Hello,
  /** Acknowledge a successful session resume. */
  Resumed,
  /** A client has disconnected from the voice channel */
  ClientDisconnect = 13,
}
