import { Collection } from "../../mod.ts";
import { VoiceServerUpdatePayload } from "../types/discord.ts";

const voiceConnections = new Collection();

export function connectVoice({ endpoint }: VoiceServerUpdatePayload) {
  // TODO: get the voice connection, if not present, create a new one
  endpoint = `wss://${endpoint}`;
  new WebSocket(endpoint);
}
