import { BotWithCache } from "../../../deps.ts";
import { createStageInstance } from "./createStageInstance.ts";
import { deleteStageInstance } from "./deleteStageInstances.ts";
import { editStageInstance } from "./editStageInstance.ts";

export function stages(bot: BotWithCache) {
  createStageInstance(bot);
  deleteStageInstance(bot);
  editStageInstance(bot);
}
