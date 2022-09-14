import { BotWithCache } from "../../../deps.ts";
import { connectToVoiceChannel } from "./connectToVoiceChannels.ts";

export function voice(bot: BotWithCache) {
  connectToVoiceChannel(bot);
}
