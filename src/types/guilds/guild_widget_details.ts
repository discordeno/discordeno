import { SnakeCasedPropertiesDeep } from "../util.ts";

export interface GuildWidgetDetails {
  id: string;
  name: string;
  instantInvite: string;
  channels: {
    id: string;
    name: string;
    position: number;
  }[];
  members: {
    id: string;
    username: string;
    discriminator: string;
    avatar?: string | null;
    status: string;
    avatar_url: string;
  }[];
  presenceCount: number;
}

/** https://discord.com/developers/docs/resources/guild#get-guild-widget-example-get-guild-widget */
export type DiscordGuildWidget = SnakeCasedPropertiesDeep<GuildWidgetDetails>;
