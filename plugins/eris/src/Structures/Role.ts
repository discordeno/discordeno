import { DiscordRole } from "../../deps.ts";
import { Base } from "../Base.ts";
import Guild from "./Guild.ts";
import Permission from "./Permission.ts";

export class Role extends Base {
  permissions: Permission;
  name: string;
  color: number;
  hoist: boolean;
  mentionable: boolean;
  icon?: string;
  unicodeEmoji?: string;
  position: number;


  constructor(data: DiscordRole, guild: Guild) {
    super(data.id);

    this.name = data.name;
    this.permissions = new Permission(data.permissions);
    this.color = data.color;
    this.hoist = !!data.hoist;
    this.mentionable = !!data.mentionable;
    this.icon = data.icon;
    this.unicodeEmoji = data.unicode_emoji;
    this.position = data.position;
  }
}

export default Role;
