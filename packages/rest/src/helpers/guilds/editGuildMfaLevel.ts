import type { BigString, MfaLevels } from '@discordeno/types'
import type { RestManager } from '../../index.js'

/** Modify a guild's MFA level. Requires guild ownership. */
export async function editGuildMfaLevel (
  rest: RestManager,
  guildId: BigString,
  mfaLevel: MfaLevels,
  reason?: string
): Promise<void> {
  return await rest.runMethod<void>(
    rest,
    'POST',
    rest.constants.routes.GUILD_MFA_LEVEL(guildId),
    { level: mfaLevel, reason }
  )
}
