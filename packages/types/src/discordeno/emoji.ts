/** Types for: https://docs.discord.com/developers/resources/emoji */

import type { BigString } from '../shared.js';

/** https://docs.discord.com/developers/resources/emoji#create-guild-emoji */
export interface CreateGuildEmoji {
  /** Name of the emoji */
  name: string;
  /** The 128x128 emoji image. */
  image: string;
  /** Roles allowed to use this emoji */
  roles: BigString[];
}

/** https://docs.discord.com/developers/resources/emoji#modify-guild-emoji */
export interface ModifyGuildEmoji {
  /** Name of the emoji */
  name?: string;
  /** Roles allowed to use this emoji */
  roles?: BigString[] | null;
}

/** https://docs.discord.com/developers/resources/emoji#create-application-emoji */
export interface CreateApplicationEmoji {
  /** Name of the emoji */
  name: string;
  /** The 128x128 emoji image. */
  image: string;
}

/** https://docs.discord.com/developers/resources/emoji#modify-application-emoji */
export interface ModifyApplicationEmoji {
  /** Name of the emoji */
  name: string;
}
