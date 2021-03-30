import { SnakeCaseProps } from "../util.ts";

export interface ModifyCurrentUserNick {
  /** Value to set users nickname to. Requires the CHANGENICKNAME permission */
  nick?: string | null;
}

/** https://discord.com/developers/docs/resources/guild#modify-current-user-nick */
export type DiscordModifyCurrentUserNick = SnakeCaseProps<
  ModifyCurrentUserNick
>;
