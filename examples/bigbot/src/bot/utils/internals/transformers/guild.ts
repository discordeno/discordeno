// SETUP-DD-TEMP: This file is an example, of how to customize an object properties that you do not want.
// Only keep the properties your bot uses. If your bot does not use emojis in cache, you can save all that memory.
// This file is currently disabled, but you can enable it should you choose when you go the customizer file.
// Feel free to delete this comment or file as you wish.
import type { Guild } from 'discordeno'
import { Collection } from 'discordeno'
import type { BotWithCustomProps } from '../../../bot.js'

export function customizeGuildTransformer(bot: BotWithCustomProps): void {
  bot.transformers.guild = function (bot, payload) {
    const guildId = bot.transformers.snowflake(payload.guild.id)

    return {
      name: payload.guild.name,
      joinedAt: payload.guild.joined_at ? Date.parse(payload.guild.joined_at) : undefined,
      memberCount: payload.guild.member_count ?? 0,
      shardId: payload.shardId,
      icon: payload.guild.icon ? bot.utils.iconHashToBigInt(payload.guild.icon) : undefined,
      roles: new Collection(
        payload.guild.roles?.map((role) => {
          const result = bot.transformers.role(bot, { role, guildId })
          return [result.id, result]
        }),
      ),
      id: guildId,
      ownerId: bot.transformers.snowflake(payload.guild.owner_id),
    } as unknown as Guild
  }
}
