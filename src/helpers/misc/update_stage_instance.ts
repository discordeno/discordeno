import { rest } from "../../rest/rest.ts";
import { Errors } from "../../types/discordeno/errors.ts";
import { StageInstance } from "../../types/misc/stage_instance.ts";
import { endpoints } from "../../util/constants.ts";
import { validateLength } from "../../util/validate_length.ts";

/** Updates fields of an existing Stage instance. Requires the user to be a moderator of the Stage channel. */
export async function updateStageInstance(channelId: bigint, topic: string) {
  if (
    !validateLength(topic, {
      min: 1,
      max: 120,
    })
  ) {
    throw new Error(Errors.INVALID_TOPIC_LENGTH);
  }

  return await rest.runMethod<StageInstance>(
    "patch",
    endpoints.STAGE_INSTANCE(channelId),
    {
      topic,
    },
  );
}
