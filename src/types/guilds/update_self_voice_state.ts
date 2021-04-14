import { SnakeCaseProps } from "../util.ts";

export interface UpdateSelfVoiceState {
  /** The id of the channel the user is currently in */
  channelId: string;
  /** Toggles the user's suppress state */
  suppress?: boolean;
  /** Sets the user's request to speak */
  requestToSpeakTimestamp?: string | null;
}

// TODO: add corresponding link to the resource
export type DiscordUpdateSelfVoiceState = SnakeCaseProps<UpdateSelfVoiceState>;
