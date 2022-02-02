import { Bot } from "../bot.ts";
import { SnakeCasedPropertiesDeep } from "../types/util.ts";
import { Sticker } from "../types/stickers/sticker.ts";
import { StickerFormatTypes } from "../types/stickers/stickerFormatTypes.ts";
import { StickerTypes } from "../types/stickers/stickerTypes.ts";
import { DiscordenoUser } from "./member.ts";

export function transformSticker(bot: Bot, payload: SnakeCasedPropertiesDeep<Sticker>): DiscordenoSticker {
  return {
    id: bot.utils.snowflakeToBigint(payload.id),
    packId: payload.pack_id ? bot.utils.snowflakeToBigint(payload.pack_id) : undefined,
    name: payload.name,
    description: payload.description,
    tags: payload.tags,
    type: payload.type,
    formatType: payload.format_type,
    available: payload.available,
    guildId: payload.guild_id ? bot.utils.snowflakeToBigint(payload.guild_id) : undefined,
    user: payload.user ? bot.transformers.user(bot, payload.user) : undefined,
    sortValue: payload.sort_value,
  };
}

/** https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-structure */
export interface DiscordenoSticker {
  /** [Id of the sticker](https://discord.com/developers/docs/reference#image-formatting) */
  id: bigint;
  /** Id of the pack the sticker is from */
  packId?: bigint;
  /** Name of the sticker */
  name: string;
  /** Description of the sticker */
  description: string;
  /** a unicode emoji representing the sticker's expression */
  tags: string;
  /** [type of sticker](https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-types) */
  type: StickerTypes;
  /** [Type of sticker format](https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-format-types) */
  formatType: StickerFormatTypes;
  /**  Whether or not the sticker is available */
  available?: boolean;
  /** Id of the guild that owns this sticker */
  guildId?: bigint;
  /** The user that uploaded the sticker */
  user?: DiscordenoUser;
  /** A sticker's sort order within a pack */
  sortValue?: number;
}
