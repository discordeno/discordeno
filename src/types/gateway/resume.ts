/** https://discord.com/developers/docs/topics/gateway#resume */
export interface Resume {
  /** Session token */
  token: string;
  /** Session id */
  session_id: string;
  /** Last sequence number received */
  seq: number;
}

export type DiscordResume = Resume;
