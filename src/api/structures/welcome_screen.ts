import { WelcomeScreenPayload } from "../../types/mod.ts";
import { createNewProp } from "../../util/utils.ts";

const baseWelcomeScreen: Partial<WelcomeScreen> = {};

export function createWelcomeScreen(
  data: WelcomeScreenPayload,
) {
  const {
    welcome_channels: welcomeChannels,
    ...rest
  } = data;

  const restProps: Record<string, Partial<PropertyDescriptor>> = {};
  for (const key of Object.keys(rest)) {
    restProps[key] = createNewProp(rest[key]);
  }

  return Object.create(baseWelcomeScreen, {
    ...restProps,
    welcomeChannels: createNewProp(
      welcomeChannels.map(
        ({ channel_id, emoji_id, emoji_name, ...props }) => ({
          channelID: channel_id,
          emojiID: emoji_id,
          emojiName: emoji_name,
          ...props,
        }),
      ),
    ),
  });
}

export interface WelcomeScreen {
  /** the server description shown in the welcome screen */
  description: string | null;
  /** the channels shown in the welcome screen, up to 5 */
  welcomeChannels: WelcomeScreenChannel[];
}

export interface WelcomeScreenChannel {
  /** the server description shown in the welcome screen */
  channelID: string;
  /** the description shown for the channel */
  description: string;
  /** the emoji id, if the emoji is custom */
  emojiID: string | null;
  /** the emoji name if custom, the unicode character if standard, or `null` if no emoji is set */
  emojiName: string | null;
}
