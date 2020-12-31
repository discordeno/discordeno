import { MemberCreatePayload } from "./member.ts";

export interface InteractionCommandPayload {
  /** id of the interaction */
  id: string;
  /** the type of interaction */
  type: InteractionType;
  /** the command data payload */
  data?: InteractionData;
  /** the guild it was sent from */
  guild_id: string;
  /** the channel it was sent from */
  channel_id: string;
  /** guild member data for the invoking user */
  member: MemberCreatePayload;
  /** a continuation token for responding to the interaction */
  token: string;
}

export enum InteractionType {
  /** This type is for ACK on webhook only setup. Discord may send these which require. In a sense its a heartbeat. */
  PING = 1,
  /** Slash commands */
  APPLICATION_COMMAND,
}

export interface InteractionData {
  /** the ID of the invoked command */
  id: string;
  /** the name of the invoked command */
  name: string;
  /** the params + values from the user */
  options: InteractionDataOption[];
}

export interface InteractionDataOption {
  /** the name of the parameter */
  name: string;
  /** the value of the pair. present if there was no more options */
  value?: string | number;
  /** present if this option is a group or subcommand */
  options?: InteractionDataOption[];
}
