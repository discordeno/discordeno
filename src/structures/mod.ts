import { createChannel } from "./channel.ts";
import { createGuild } from "./guild.ts";
import { createMember } from "./member.ts";
import { createMessage } from "./message.ts";
import { createRole } from "./role.ts";
import { createTemplate } from "./template.ts";

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

/** This function is used to update/reload/customize the internal structure of Discordeno.
 *
 *  ⚠️ **ADVANCED USE ONLY: If you customize this in a wrong way, you could potentially create many new errors/bugs. Please take caution when using this.
*/
export function updateStructures(newStructures: Structures) {
  structures = {
    ...structures,
    ...newStructures,
  };
}
