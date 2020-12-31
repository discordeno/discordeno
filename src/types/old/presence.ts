import { StatusType } from "./discord.ts";

export interface ClientStatusPayload {
  /** The user's status set for an active desktop (Windows, Linux, Mac) application session */
  desktop?: StatusType;

  /** The user's status set for an active mobile (iOS, Android) application session */
  mobile?: StatusType;

  /** The user's status set for an active web (browser, bot account) application session */
  web?: StatusType;
}
