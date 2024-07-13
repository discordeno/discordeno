import type { DiscordGatewayPayload, DiscordThreadMembersUpdate } from '@discordeno/types'
import type { Bot } from '../../index.js'

export async function handleThreadMembersUpdate(bot: Bot, data: DiscordGatewayPayload, _shardId: number): Promise<void> {
  if (!bot.events.threadMembersUpdate) return

  const payload = data.d as DiscordThreadMembersUpdate

  bot.events.threadMembersUpdate({
    id: bot.transformers.snowflake(payload.id),
    guildId: bot.transformers.snowflake(payload.guild_id),
    addedMembers: payload.added_members?.map((member) => bot.transformers.threadMember?.(bot, member)),
    removedMemberIds: payload.removed_member_ids?.map((id) => bot.transformers.snowflake(id)),
  })
}
