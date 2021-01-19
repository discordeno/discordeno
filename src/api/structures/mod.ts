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

export type { Channel } from "./channel.ts";
export type { Guild } from "./guild.ts";
export type { Member } from "./member.ts";
export type { Message } from "./message.ts";
export type { Role } from "./role.ts";
export type { Template } from "./template.ts";
