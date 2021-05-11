import { validateLength } from "../../util/validate_length.ts";
import { Errors } from "../../types/discordeno/errors.ts";
import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";
import { StageInstance } from "../../types/misc/stage_instance.ts";

/** Creates a new Stage instance associated to a Stage channel. Requires the user to be a moderator of the Stage channel. */
export async function createStageInstance(channelId: string, topic: string) {
  if (
    !validateLength(topic, { max: 120, min: 1 })
  ) {
    throw new Error(Errors.INVALID_TOPIC_LENGTH);
  }

  return await rest.runMethod<StageInstance>(
    "post",
    endpoints.STAGE_INSTANCES,
    {
      "channel_id": channelId,
      topic,
    },
  );
}
