import type { RestManager } from '../../../restManager.js'

/**
 * Deletes an invite to a channel.
 *
 * @param rest - The rest manager to use to make the request.
 * @param inviteCode - The invite code of the invite to delete.
 *
 * @remarks
 * Requires the `MANAGE_CHANNELS` permission.
 *
 * Fires an _Invite Delete_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#delete-channel-invite}
 */
export async function deleteInvite (
  rest: RestManager,
  inviteCode: string,
  reason?: string
): Promise<void> {
  return await rest.runMethod<void>(
    rest,
    'DELETE',
    rest.constants.routes.INVITE(inviteCode),
    reason ? { reason } : undefined
  )
}
