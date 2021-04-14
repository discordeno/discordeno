import { RequestManager } from "../../rest/request_manager.ts";
import {
  DiscordUpdateSelfVoiceState,
  UpdateSelfVoiceState,
} from "../../types/guilds/update_self_voice_state.ts";
import { endpoints } from "../../util/constants.ts";
import { camelKeysToSnakeCase } from "../../util/utils.ts";

/**
 * Updates the current user's voice state.
 * Caveats:
 *  - `channel_id` must currently point to a stage channel.
 *  - current user must already have joined `channel_id`.
 *  - You must have the `MUTE_MEMBERS` permission to unsuppress yourself. You can always suppress yourself.
 *  - You must have the `REQUEST_TO_SPEAK` permission to request to speak. You can always clear your own request to speak.
 *  - You are able to set `request_to_speak_timestamp` to any present or future time.
 */
export function updateBotVoiceState(
  guildId: string,
  data: UpdateSelfVoiceState,
) {
  const payload = camelKeysToSnakeCase<DiscordUpdateSelfVoiceState>(data);

  return RequestManager.patch(
    endpoints.UPDATE_VOICE_STATE(guildId),
    payload,
  );
}
