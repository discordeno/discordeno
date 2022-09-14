import { BotWithCache } from "../../deps.ts";
import { addRole } from "./addRole.ts";
import { createRole } from "./createRole.ts";
import { deleteRole } from "./deleteRole.ts";
import { editRole } from "./editRole.ts";
import { modifyRolePositions } from "./modifyRolePositions.ts";
import { removeRole } from "./removeRole.ts";

export function roles(bot: BotWithCache) {
  addRole(bot);
  createRole(bot);
  deleteRole(bot);
  editRole(bot);
  modifyRolePositions(bot);
  removeRole(bot);
}
