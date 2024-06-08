import { translate } from '../languages/translate.js'
import { createCommand } from '../utils/slash/createCommand.js'

export default createCommand({
  name: 'PING_NAME',
  description: 'PING_DESCRIPTION',
  execute: async function (_, interaction) {
    return await interaction.reply(
      translate(interaction.guildId!, 'PING_RESPONSE_WITH_TIME', Date.now() - snowflakeToTimestamp(interaction.id)),
    )
  },
})

// TODO: This should be deleted once this is available in the helpers plugin.
export function snowflakeToTimestamp(id: bigint): number {
  return Number(id / 4194304n + 1420070400000n)
}
