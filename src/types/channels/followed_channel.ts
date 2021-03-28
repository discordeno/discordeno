import { SnakeCaseProps } from "../util.ts";

export interface FollowedChannel {
  /** Source message id */
  channelId: string;
  /** Created target webhook id */
  webhookId: string;
}

/** https://discord.com/developers/docs/resources/channel#followed-channel-object */
export type DiscordFollowedChannel = SnakeCaseProps<FollowedChannel>;
