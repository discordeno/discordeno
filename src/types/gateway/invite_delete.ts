import { SnakeCaseProps } from "../util.ts";

export interface InviteDelete {
  /** The channel of the invite */
  channelId: string;
  /** The guild of the invite */
  guildId?: string;
  /** The unique invite code */
  code: string;
}

/** https://discord.com/developers/docs/topics/gateway#invite-delete */
export type DiscordInviteDelete = SnakeCaseProps<InviteDelete>;
