import { routes } from '@discordeno/constant'
import TRANSFORMERS from '@discordeno/transformer'
import type {
  BigString,
  Camelize,
  DiscordAuditLog,
  GetGuildAuditLog
} from '@discordeno/types'
import type { RestManager } from '../../restManager.js'

/**
 * Gets a guild's audit log.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild to get the audit log of.
 * @param options - The parameters for the fetching of the audit log.
 * @returns An instance of {@link AuditLog}.
 *
 * @remarks
 * Requires the `VIEW_AUDIT_LOG` permission.
 *
 * @see {@link https://discord.com/developers/docs/resources/audit-log#get-guild-audit-log}
 */
export async function getAuditLog (
  rest: RestManager,
  guildId: BigString,
  options?: GetGuildAuditLog
): Promise<Camelize<DiscordAuditLog>> {
  const result = await rest.runMethod<DiscordAuditLog>(
    'GET',
    routes.GUILD_AUDIT_LOGS(guildId, options)
  )

  return TRANSFORMERS.auditlogs.log(result)
}
