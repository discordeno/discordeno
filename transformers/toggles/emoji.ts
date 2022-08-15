import { DiscordEmoji, DiscordRole } from "../../types/discord.ts";
import { ToggleBitfield } from "./ToggleBitfield.ts";

export const EmojiToggle = {
  /** Whether this emoji must be wrapped in colons */
  requireColons: 1 << 0,
  /** Whether this emoji is managed */
  managed: 1 << 1,
  /** Whether this emoji is animated */
  animated: 1 << 2,
  /** Whether this emoji can be used, may be false due to loss of Server Boosts */
  available: 1 << 3,
};

export class EmojiToggles extends ToggleBitfield {
  constructor(role: DiscordEmoji) {
    super();

    if (role.require_colons) this.add(EmojiToggle.requireColons);
    if (role.managed) this.add(EmojiToggle.managed);
    if (role.animated) this.add(EmojiToggle.animated);
    if (role.available) this.add(EmojiToggle.available);
  }

  /** Whether this emoji must be wrapped in colons */
  get requireColons() {
    return this.has("requireColons");
  }

  /** Whether this emoji is managed */
  get managed() {
    return this.has("managed");
  }

  /** Whether this emoji is animated */
  get animated() {
    return this.has("animated");
  }

  /** Whether this emoji can be used, may be false due to loss of Server Boosts */
  get available() {
    return this.has("available");
  }

  /** Checks whether or not the permissions exist in this */
  has(permissions: EmojiToggleKeys | EmojiToggleKeys[]) {
    if (!Array.isArray(permissions)) return super.contains(EmojiToggle[permissions]);

    return super.contains(permissions.reduce((a, b) => (a |= EmojiToggle[b]), 0));
  }

  /** Lists all the toggles for the role and whether or not each is true or false. */
  list() {
    const json: Record<string, boolean> = {};
    for (const [key, value] of Object.entries(EmojiToggle)) {
      json[key] = super.contains(value);
    }

    return json as Record<EmojiToggleKeys, boolean>;
  }
}

export type EmojiToggleKeys = keyof typeof EmojiToggle;
