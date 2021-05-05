import { rest } from "../../rest/rest.ts";
import type {
  UpdateOthersVoiceState,
} from "../../types/guilds/update_others_voice_state.ts";
import { endpoints } from "../../util/constants.ts";
import { snakelize } from "../../util/utils.ts";

/**
 * Updates another user's voice state.
 * Caveats:
 *  - `channel_id` must currently point to a stage channel.
 *  - User must already have joined `channel_id`.
 *  - You must have the `MUTE_MEMBERS` permission. (Since suppression is the only thing that is available currently.)
 *  - When unsuppressed, non-bot users will have their `request_to_speak_timestamp` set to the current time. Bot users will not.
 *  - When suppressed, the user will have their `request_to_speak_timestamp` removed.
 */
export function updateVoiceState(
  guildId: bigint,
  userId: bigint,
  data: UpdateOthersVoiceState,
) {
  return rest.runMethod(
    "patch",
    endpoints.UPDATE_VOICE_STATE(guildId, userId),
    snakelize(data),
  );
}
