import { BotWithCache } from "../../deps.ts";
import addRole from "./add.ts";
import createRole from "./create.ts";
import deleteRole from "./delete.ts";
import editRole from "./edit.ts";
import removeRole from "./remove.ts";

export default function setupRolePermChecks(bot: BotWithCache) {
  addRole(bot);
  createRole(bot);
  deleteRole(bot);
  editRole(bot);
  removeRole(bot);
}
