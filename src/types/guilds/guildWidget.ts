import { Channel } from "../channels/channel.ts";
import { GuildMember } from "../members/guildMember.ts";

export interface GuildWidget {
  /** guild id */
  id: string;
  /** guild name (2-100 characters) */
  name: string;
  /** instant invite for the guilds specified widget invite channel */
  instantInvite: string | null;
  /** voice and stage channels which are accessible by @everyone */
  channels: Partial<Channel>[];
  /** special widget user objects that includes users presence (Limit 100) */
  members: Partial<GuildMember>[];
  /** number of online members in this guild */
  presenceCount: number;
}
