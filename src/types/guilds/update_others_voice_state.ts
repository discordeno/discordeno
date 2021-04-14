import { SnakeCaseProps } from "../util.ts";

export interface UpdateOthersVoiceState {
  /** The id of the channel the user is currently in */
  channelId: string;
  /** Toggles the user's suppress state */
  suppress?: boolean;
}

// TODO: add corresponding link to the resource
export type DiscordUpdateOthersVoiceState = SnakeCaseProps<
  UpdateOthersVoiceState
>;
