import { DiscordChannelTypes } from "../channel_types.ts";

// TODO: add docs link
export interface StartThreadBase {
  /** 1-100 character thread name */
  name: string;
  /** Duration in minutes to automatically archive the thread after recent activity */
  autoArchiveDuration: 60 | 1440 | 4320 | 10080;
  /** The reason you are creating the thread */
  reason?: string;
}

export interface StartThreadWithMessage extends StartThreadBase {
  /** The message id with which to start a thread on. */
  messageId: bigint;
}

export interface StartThreadWithoutMessage extends StartThreadBase {
  /** the type of thread to create */
  type:
    | DiscordChannelTypes.GuildNewsThread
    | DiscordChannelTypes.GuildPublicThread
    | DiscordChannelTypes.GuildPrivateThread;
  /** whether non-moderators can add other non-moderators to a thread; only available when creating a private thread */
  invitable?: boolean;
}
