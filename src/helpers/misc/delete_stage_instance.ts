import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";

/** Deletes the Stage instance. Requires the user to be a moderator of the Stage channel. */
export async function deleteStageInstance(channelId: bigint) {
  return await rest.runMethod<undefined>(
    "delete",
    endpoints.STAGE_INSTANCE(channelId),
  );
}
