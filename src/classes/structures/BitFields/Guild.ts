import { guildToggles } from "../../../structures/guild.ts";
import { BitField } from "./BitField.ts";

export class GuildBitField extends BitField {
  constructor(bits: bigint) {
    super(bits);
  }

  /** Whether the bot is the owner of this guild */
  get owner() {
    return this.has(guildToggles.owner);
  }

  /** Sets whether the bot is the owner of this guild */
  set owner(value: boolean) {
    this.set(guildToggles.owner, value);
  }

  /** Whether the guild widget is enabled */
  get widgetEnabled() {
    return this.has(guildToggles.widgetEnabled);
  }

  /** Sets whether the guild widget is enabled */
  set widgetEnabled(value: boolean) {
    this.set(guildToggles.widgetEnabled, value);
  }

  /** Whether this is a large guild */
  get large() {
    return this.has(guildToggles.large);
  }

  /** Sets whether this is a large guild */
  set large(value: boolean) {
    this.set(guildToggles.large, value);
  }

  /** Whether this guild is unavailable due to an outage */
  get unavailable() {
    return this.has(guildToggles.unavailable);
  }

  /** Sets whether this guild is unavailable due to an outage */
  set unavailable(value: boolean) {
    this.set(guildToggles.unavailable, value);
  }

  /** Whether this server's icon is animated */
  get animatedIcon() {
    return this.has(guildToggles.animatedIcon);
  }

  /** Sets whether this server's icon is animated */
  set animatedIcon(value: boolean) {
    this.set(guildToggles.animatedIcon, value);
  }

  /** Whether this server's banner is animated */
  get animatedBanner() {
    return this.has(guildToggles.animatedBanner);
  }

  /** Sets whether this server's banner is animated */
  set animatedBanner(value: boolean) {
    this.set(guildToggles.animatedBanner, value);
  }

  /** Whether this server's splash is animated */
  get animatedSplash() {
    return this.has(guildToggles.animatedSplash);
  }

  /** Sets whether this server's splash is animated */
  set animatedSplash(value: boolean) {
    this.set(guildToggles.animatedSplash, value);
  }
}

export default GuildBitField;
