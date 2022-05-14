import { DiscordGuildCreate } from "../../types/discord.ts";
import { GuildToggle, GuildToggles } from "./guild.ts";

export class GuildCreateToggles extends GuildToggles {
  constructor(guild: DiscordGuildCreate) {
    super(guild);

    if (guild.large) this.add(GuildToggle.large);
    if (guild.unavailable) this.add(GuildToggle.unavailable);
  }
}
