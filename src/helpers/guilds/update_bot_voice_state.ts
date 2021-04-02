import { RequestManager } from "../../rest/request_manager.ts";
import {
  DiscordUpdateSelfVoiceState,
  UpdateSelfVoiceState,
} from "../../types/guilds/update_self_voice_state.ts";
import { camelKeysToSnakeCase } from "../../util/utils.ts";

export function updateBotVoiceState(data: UpdateSelfVoiceState) {
  const payload: DiscordUpdateSelfVoiceState = camelKeysToSnakeCase(data);

  RequestManager.patch();
}
