import { Guild } from "../guilds/guild.ts";

export interface GuildUpdateChange {
  key: keyof Guild;
  oldValue?: unknown;
  value?: unknown;
}
