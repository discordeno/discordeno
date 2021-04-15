import { createDiscordenoChannel } from "./channel.ts";
import { createDiscordenoGuild } from "./guild.ts";
import { createDiscordenoMember } from "./member.ts";
import { createDiscordenoMessage } from "./message.ts";
import { createDiscordenoRole } from "./role.ts";

/** This is the placeholder where the structure creation functions are kept. */
export let structures = {
  createDiscordenoChannel,
  createDiscordenoGuild,
  createDiscordenoMember,
  createDiscordenoMessage,
  createDiscordenoRole,
};

// export type { Channel, Guild, Member, Message, Role, Template };

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
