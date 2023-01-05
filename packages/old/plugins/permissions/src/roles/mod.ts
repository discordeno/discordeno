import type { BotWithCache } from '../../deps.js'
import { addRole } from './addRole.js'
import { createRole } from './createRole.js'
import { deleteRole } from './deleteRole.js'
import { editRole } from './editRole.js'
import { modifyRolePositions } from './modifyRolePositions.js'
import { removeRole } from './removeRole.js'

export function roles (bot: BotWithCache) {
  addRole(bot)
  createRole(bot)
  deleteRole(bot)
  editRole(bot)
  modifyRolePositions(bot)
  removeRole(bot)
}
