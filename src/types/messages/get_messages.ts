export interface GetMessagesLimit {
  /** Max number of messages to return (1-100) default 50 */
  limit?: number;
}

export interface GetMessagesAround extends GetMessagesLimit {
  /** Get messages around this message id */
  around?: string;
}

export interface GetMessagesBefore extends GetMessagesLimit {
  /** Get messages before this message id */
  before?: string;
}

export interface GetMessagesAfter extends GetMessagesLimit {
  /** Get messages after this message id */
  after?: string;
}

export type GetMessages =
  & GetMessagesLimit
  & GetMessagesAfter
  & GetMessagesBefore
  & GetMessagesAround;

/** https://discord.com/developers/docs/resources/channel#get-channel-messages-query-string-params */
export type DiscordGetMessages = GetMessages;
