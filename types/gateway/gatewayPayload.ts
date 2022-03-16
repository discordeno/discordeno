export interface GatewayPayload {
  /** opcode for the payload */
  op: number;
  /** Event data */
  d: unknown | null;
  /** Sequence number, used for resuming sessions and heartbeats */
  s: number | null;
  /** The event name for this payload */
  t: GatewayEventNames | null;
}

/** https://discord.com/developers/docs/topics/gateway#payloads-gateway-payload-structure */
export type DiscordGatewayPayload = GatewayPayload;
export type GatewayDispatchEventNames =
  | "READY"
  | "CHANNEL_CREATE"
  | "CHANNEL_DELETE"
  | "CHANNEL_PINS_UPDATE"
  | "CHANNEL_UPDATE"
  | "GUILD_BAN_ADD"
  | "GUILD_BAN_REMOVE"
  | "GUILD_CREATE"
  | "GUILD_DELETE"
  | "GUILD_EMOJIS_UPDATE"
  | "GUILD_INTEGRATIONS_UPDATE"
  | "GUILD_MEMBER_ADD"
  | "GUILD_MEMBER_REMOVE"
  | "GUILD_MEMBER_UPDATE"
  | "GUILD_MEMBERS_CHUNK"
  | "GUILD_ROLE_CREATE"
  | "GUILD_ROLE_DELETE"
  | "GUILD_ROLE_UPDATE"
  | "GUILD_UPDATE"
  | "GUILD_SCHEDULED_EVENT_CREATE"
  | "GUILD_SCHEDULED_EVENT_DELETE"
  | "GUILD_SCHEDULED_EVENT_UPDATE"
  | "GUILD_SCHEDULED_EVENT_USER_ADD"
  | "GUILD_SCHEDULED_EVENT_USER_REMOVE"
  | "INTERACTION_CREATE"
  | "INVITE_CREATE"
  | "INVITE_DELETE"
  | "MESSAGE_CREATE"
  | "MESSAGE_DELETE"
  | "MESSAGE_REACTION_ADD"
  | "MESSAGE_REACTION_REMOVE_ALL"
  | "MESSAGE_REACTION_REMOVE_EMOJI"
  | "MESSAGE_REACTION_REMOVE"
  | "MESSAGE_UPDATE"
  | "PRESENCE_UPDATE"
  | "TYPING_START"
  | "USER_UPDATE"
  | "VOICE_SERVER_UPDATE"
  | "VOICE_STATE_UPDATE"
  | "WEBHOOKS_UPDATE"
  | "INTEGRATION_CREATE"
  | "INTEGRATION_UPDATE"
  | "INTEGRATION_DELETE"
  | "STAGE_INSTANCE_CREATE"
  | "STAGE_INSTANCE_UPDATE"
  | "STAGE_INSTANCE_DELETE";

export type GatewayEventNames = GatewayDispatchEventNames | "READY" | "RESUMED";
