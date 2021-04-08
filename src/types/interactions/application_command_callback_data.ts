import { Embed } from "../embeds/embed.ts";
import { AllowedMentions } from "../messages/allowed_mentions.ts";
import { SnakeCasedPropertiesDeep } from "../util.ts";

export interface InteractionApplicationCommandCallbackData {
  /** Is the response TTS */
  tts?: boolean;
  /** Message content */
  content?: string;
  /** Supports up to 10 embeds */
  embeds?: Embed[];
  /** Allowed Mentions object */
  allowedMentions?: AllowedMentions;
  /** Set to `64` to make your response ephemeral */
  flags?: number;
}

/** https://discord.com/developers/docs/interactions/slash-commands#interaction-response-interactionapplicationcommandcallbackdata */
export type DiscordInteractionApplicationCommandCallbackData = SnakeCasedPropertiesDeep<InteractionApplicationCommandCallbackData>;
