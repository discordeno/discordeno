import { DiscordChannelTypes } from "../channel/type.ts";

/** https://discord.com/developers/docs/resources/channel#channel-mention-object-channel-mention-structure */
export interface DiscordChannelMention {
  /** id of the channel */
  id: string;
  /** id of the guild containing the channel */
  // deno-lint-ignore camelcase
  guild_id: string;
  /** the type of channel */
  type: DiscordChannelTypes;
  /** the name of the channel */
  name: string;
}
