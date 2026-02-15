/** Types for: https://docs.discord.com/developers/resources/sticker */

import type { FileContent } from './reference.js';

/** https://docs.discord.com/developers/resources/sticker#create-guild-sticker-form-params */
export interface CreateGuildStickerOptions {
  /** Name of the sticker (2-30 characters) */
  name: string;
  /** Description of the sticker (empty or 2-100 characters) */
  description: string;
  /** Autocomplete/suggestion tags for the sticker (max 200 characters) */
  tags: string;
  /** The sticker file to upload, must be a PNG, APNG, or Lottie JSON file, max 512 KB */
  file: FileContent;
}

/** https://docs.discord.com/developers/resources/sticker#modify-guild-sticker-json-params */
export interface EditGuildStickerOptions {
  /** Name of the sticker (2-30 characters) */
  name?: string;
  /** Description of the sticker (empty or 2-100 characters) */
  description?: string | null;
  /** Autocomplete/suggestion tags for the sticker (max 200 characters) */
  tags?: string;
}
