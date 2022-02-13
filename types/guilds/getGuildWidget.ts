import { DiscordStatusTypes } from "../gateway/statusTypes.ts";

/** https://discord.com/developers/docs/resources/guild#get-guild-widget-object-get-guild-widget-structure */
export interface GetGuildWidget {
  /** guild id */
  id: string;
  /** guild name (2-100 characters) */
  name: string;
  /** instant invite for the guilds specified widget invite channel */
  instantInvite: string | null;
  /** voice and stage channels which are accessible by @everyone */
  channels: {
    id: string;
    name: string;
    position: number;
  }[];
  /** special widget user objects that includes users presence (Limit 100) */
  members: {
    activity: { name: string } | null;
    avatarUrl: string | null;
    deaf: boolean | null;
    mute: boolean | null;
    name: string;
    selfDeaf: boolean | null;
    selfMute: boolean | null;
    status: DiscordStatusTypes;
    suppress: boolean | null;
  }[];
  /** number of online members in this guild */
  presenceCount: number;
}
