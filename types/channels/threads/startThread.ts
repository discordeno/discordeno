import { ChannelTypes } from "../channelTypes.ts";

// TODO: add docs link
export interface StartThreadBase {
  /** 1-100 character thread name */
  name: string;
  /** Duration in minutes to automatically archive the thread after recent activity */
  autoArchiveDuration: 60 | 1440 | 4320 | 10080;
  /** Amount of seconds a user has to wait before sending another message (0-21600) */
  rateLimitPerUser?: number | null;
  /** The reason you are creating the thread */
  reason?: string;
}

export interface StartThreadWithoutMessage extends StartThreadBase {
  /** the type of thread to create */
  type: ChannelTypes.GuildNewsThread | ChannelTypes.GuildPublicThread | ChannelTypes.GuildPrivateThread;
  /** whether non-moderators can add other non-moderators to a thread; only available when creating a private thread */
  invitable?: boolean;
}
