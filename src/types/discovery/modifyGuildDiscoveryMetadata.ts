// TODO: add docs link
export interface ModifyGuildDiscoveryMetadata {
  /** The id of the primary discovery category. Default: 0 */
  primaryCategoryId?: number | null;
  /** Up to 10 discovery search kekywords. Default: null */
  keywords?: string[] | null;
  /** Whether guild info is shown when custom emojis are clicked. Default: true */
  emojiDiscoverabilityEnabled?: boolean | null;
}
