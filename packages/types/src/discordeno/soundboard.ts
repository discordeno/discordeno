/** Types for: https://discord.com/developers/docs/resources/soundboard */

import type { BigString } from '../shared.js'

/** https://discord.com/developers/docs/resources/soundboard#send-soundboard-sound-json-params */
export interface SendSoundboardSound {
  /** The id of the soundboard sound to play */
  soundId: BigString
  /** The id of the guild the soundboard sound is from, required to play sounds from different servers */
  sourceGuildId?: BigString
}

/** https://discord.com/developers/docs/resources/soundboard#create-guild-soundboard-sound-json-params */
export interface CreateGuildSoundboardSound {
  /** Name of the soundboard sound (2-32 characters) */
  name: string
  /** The mp3 or ogg sound data, base64 encoded, similar to image data */
  sound: string
  /** The volume of the soundboard sound, from 0 to 1, defaults to 1 */
  volume?: number | null
  /** The id of the custom emoji for the soundboard sound */
  emojiId?: BigString | null
  /** The unicode character of a standard emoji for the soundboard sound */
  emojiName?: string | null
}

/** https://canary.discord.com/developers/docs/resources/soundboard#modify-guild-soundboard-sound-json-params */
export interface ModifyGuildSoundboardSound {
  /**
   * Name of the soundboard sound
   *
   * @remarks
   * 2-32 characters
   */
  name?: string
  /**
   * The volume of the soundboard sound
   *
   * @remarks
   * The value is from 0 to 1
   *
   * @default 1
   */
  volume?: number | null
  /** The id of the custom emoji for the soundboard sound */
  emojiId?: BigString | null
  /** The unicode character of a standard emoji for the soundboard sound */
  emojiName?: string | null
}
