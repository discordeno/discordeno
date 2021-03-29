import { Embed } from "../../embeds/embed.ts";
import { AllowedMentions } from "../../messages/allowed_mentions.ts";
import { SnakeCaseProps } from "../../util.ts";

export interface CommandCallbackData {
  /** Is the response TTS */
  tts?: boolean;
  /** Message Content */
  content?: string;
  /** Supports up to 10 embeds */
  embeds?: Embed[];
  /** Allowed Mentions object */
  allowedMentions?: AllowedMentions;
  /** Set to `64` to make your response ephemeral */
  flags?: number;
}

/** https://discord.com/developers/docs/interactions/slash-commands#interaction-response-interactionapplicationcommandcallbackdata */
export type DiscordCommandCallbackData = SnakeCaseProps<
  CommandCallbackData
>;
