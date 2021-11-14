/** https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level */
export enum DiscordDefaultMessageNotificationLevels {
  /** Members will receive notifications for all messages by default */
  AllMessages,
  /** Members will receive notifications only for messages that @mention them by default */
  OnlyMentions,
}

export type DefaultMessageNotificationLevels = DiscordDefaultMessageNotificationLevels;
export const DefaultMessageNotificationLevels = DiscordDefaultMessageNotificationLevels;
