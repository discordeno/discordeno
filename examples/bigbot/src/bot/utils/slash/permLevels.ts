import type { Interaction } from 'discordeno'
import { validatePermissions } from 'discordeno/permissions-plugin'
import type { Command } from './createCommand.js'

export default async function hasPermissionLevel(command: Command<any>, payload: Interaction): Promise<boolean> {
  // This command doesnt require a perm level so allow the command.
  if (!command.permissionLevels) return true

  // If a custom function was provided
  if (typeof command.permissionLevels === 'function') {
    return await command.permissionLevels(payload, command)
  }

  // If an array of perm levels was provided
  for (const permlevel of command.permissionLevels) {
    // If this user has one of the allowed perm level, the loop is canceled and command is allowed.
    if (await PermissionLevelHandlers[permlevel](payload, command)) return true
  }

  // None of the perm levels were met. So cancel the command
  return false
}

export const PermissionLevelHandlers: Record<
  keyof typeof PermissionLevels,
  (payload: Interaction, command: Command<any>) => boolean | Promise<boolean>
> = {
  MEMBER: () => true,
  MODERATOR: (payload) =>
    Boolean(payload.member?.permissions) && validatePermissions(payload.member!.permissions!, ['MANAGE_GUILD']),
  ADMIN: (payload) =>
    Boolean(payload.member?.permissions) && validatePermissions(payload.member!.permissions!, ['ADMINISTRATOR']),
  // TODO(cache): fix this
  SERVER_OWNER: () => false,
  BOT_SUPPORT: () => false,
  BOT_DEVS: () => false,
  BOT_OWNERS: (payload) => [130136895395987456n, 615542460151496705n].includes(payload.user.id),
}

export enum PermissionLevels {
  MEMBER,
  MODERATOR,
  ADMIN,
  SERVER_OWNER,
  BOT_SUPPORT,
  BOT_DEVS,
  BOT_OWNERS,
}
