import { SnakeCaseProps } from "../util.ts";

export interface ModifyCurrentUserNickParams {
  /** Value to set users nickname to. Requires the CHANGENICKNAME permission */
  nick?: string | null;
}

/** https://discord.com/developers/docs/resources/guild#modify-current-user-nick */
export type DiscordModifyCurrentUserNickParams = SnakeCaseProps<
  ModifyCurrentUserNickParams
>;
