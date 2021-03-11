import { createChannelStruct } from "./channel.ts";
import { createGuildStruct } from "./guild.ts";
import { createMemberStruct } from "./member.ts";
import { createMessageStruct } from "./message.ts";
import { createRoleStruct } from "./role.ts";
import { createTemplateStruct } from "./template.ts";

/** This is the placeholder where the structure creation functions are kept. */
export let structures = {
  createChannelStruct,
  createGuildStruct,
  createMemberStruct,
  createMessageStruct,
  createRoleStruct,
  createTemplateStruct,
};

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
