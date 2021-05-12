import { rest } from "../../rest/rest.ts";
import { StageInstance } from "../../types/channels/stage_instance.ts";
import { endpoints } from "../../util/constants.ts";

/** Gets the stage instance associated with the Stage channel, if it exists. */
export async function getStageInstance(channelId: bigint) {
  return await rest.runMethod<StageInstance>(
    "get",
    endpoints.STAGE_INSTANCE(channelId),
  );
}
