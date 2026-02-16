/** Types for: https://docs.discord.com/developers/resources/soundboard */

import type { DiscordUser } from './user.js';

/** https://docs.discord.com/developers/resources/soundboard#soundboard-sound-object-soundboard-sound-structure */
export interface DiscordSoundboardSound {
  /** The name of this sound */
  name: string;
  /** The id of this sound */
  sound_id: string;
  /** The volume of this sound, from 0 to 1 */
  volume: number;
  /** The id of this sound's custom emoji */
  emoji_id: string | null;
  /** The unicode character of this sound's standard emoji */
  emoji_name: string | null;
  /** The id of the guild this sound is in */
  guild_id?: string;
  /** Whether this sound can be used, may be false due to loss of Server Boosts */
  available: boolean;
  /** The user who created this sound */
  user?: DiscordUser;
}
