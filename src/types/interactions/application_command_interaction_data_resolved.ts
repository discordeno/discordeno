import { Channel } from "../channels/channel.ts";
import { GuildMember } from "../guilds/guild_member.ts";
import { Role } from "../permissions/role.ts";
import { User } from "../users/user.ts";

export interface ApplicationCommandInteractionDataResolved {
  /** The Ids and User objects */
  users?: Record<string, User>;
  /** The Ids and partial Member objects */
  members?: Record<string, Omit<GuildMember, "user" | "deaf" | "mute">>;
  /** The Ids and Role objects */
  roes?: Record<string, Role>;
  /** The Ids and partial Channel objects */
  channels?: Record<
    string,
    Pick<Channel, "id" | "name" | "type" | "permissionOverwrites">
  >;
}
