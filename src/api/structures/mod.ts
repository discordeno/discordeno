import { createChannelStructure } from "./channel.ts";
import { createGuildStructure } from "./guild.ts";
import { createMemberStructure } from "./member.ts";
import { createMessageStructure } from "./message.ts";
import { createRoleStructure } from "./role.ts";
import { createTemplateStructure } from "./template.ts";

/** This is the placeholder where the structure creation functions are kept. */
export let structures = {
  createChannelStructure,
  createGuildStructure,
  createMemberStructure,
  createMessageStructure,
  createRoleStructure,
  createTemplateStructure,
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
