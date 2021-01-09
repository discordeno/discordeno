import { Channel, createChannel } from "./channel.ts";
import { createGuild, Guild } from "./guild.ts";
import { createMember, Member } from "./member.ts";
import { createMessage, Message } from "./message.ts";
import { createRole, Role } from "./role.ts";
import { createTemplate, Template } from "./template.ts";

/** This is the placeholder where the structure creation functions are kept. */
export let structures = {
  createChannel,
  createGuild,
  createMember,
  createMessage,
  createRole,
  createTemplate,
};

export type Structures = typeof structures;

/** This function is used to update/reload/customize the internal structures of Discordeno.
 *
 *  ⚠️ **ADVANCED USE ONLY: If you customize this incorrectly, you could potentially create many new errors/bugs.
 * Please take caution when using this.**
*/
export function updateStructures(newStructures: Structures) {
  structures = {
    ...structures,
    ...newStructures,
  };
}

export type { Channel, Guild, Member, Message, Role, Template };
