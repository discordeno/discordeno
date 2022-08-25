import { Interaction, validatePermissions } from "../../deps.ts";
import { Command } from "../bot/types/command.ts";

export default async function hasPermissionLevel(
  // deno-lint-ignore no-explicit-any
  command: Command<any>,
  payload: Interaction,
) {
  // This command doesn't require a perm level so allow the command.
  if (!command.permissionLevels) return true;

  // If a custom function was provided
  if (typeof command.permissionLevels === "function") {
    return await command.permissionLevels(payload, command);
  }

  // If an array of perm levels was provided
  for (const permLevel of command.permissionLevels) {
    // If this user has one of the allowed perm level, the loop is canceled and command is allowed.
    if (await PermissionLevelHandlers[permLevel](payload, command)) return true;
  }

  // None of the perm levels were met. So cancel the command
  return false;
}

export const PermissionLevelHandlers: Record<
  keyof typeof PermissionLevels,
  (
    payload: Interaction,
    // deno-lint-ignore no-explicit-any
    command: Command<any>,
  ) => boolean | Promise<boolean>
> = {
  MEMBER: () => true,
  MODERATOR: (payload) =>
    Boolean(payload.member?.permissions) &&
    validatePermissions(payload.member!.permissions!, ["MANAGE_GUILD"]),
  ADMIN: (payload) =>
    Boolean(payload.member?.permissions) &&
    validatePermissions(payload.member!.permissions!, ["ADMINISTRATOR"]),
  SERVER_OWNER: () => false,
  BOT_SUPPORT: () => false,
  BOT_DEVS: () => false,
  BOT_OWNERS: () => false,
};

export enum PermissionLevels {
  MEMBER,
  MODERATOR,
  ADMIN,
  SERVER_OWNER,
  BOT_SUPPORT,
  BOT_DEVS,
  BOT_OWNERS,
}
