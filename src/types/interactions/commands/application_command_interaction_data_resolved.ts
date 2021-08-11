import { Channel } from "../../channels/channel.ts";
import { Message } from "../../messages/message.ts";
import { Role } from "../../permissions/role.ts";
import { User } from "../../users/user.ts";
import { InteractionGuildMember } from "../interaction_guild_member.ts";

export interface ApplicationCommandInteractionDataResolved {
  /** The Ids and Message objects */
  messages?: Record<string, Message>;
  /** The Ids and User objects */
  users?: Record<string, User>;
  /** The Ids and partial Member objects */
  members?: Record<string, Omit<InteractionGuildMember, "user" | "deaf" | "mute">>;
  /** The Ids and Role objects */
  roles?: Record<string, Role>;
  /** The Ids and partial Channel objects */
  channels?: Record<string, Pick<Channel, "id" | "name" | "type" | "permissionOverwrites">>;
}
