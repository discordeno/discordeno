import type { BigString } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'

export const startTyping = triggerTypingIndicator

/**
 * Triggers a typing indicator for the bot user.
 *
 * @param bot - The bot instance to use to make the request.
 * @param channelId - The ID of the channel in which to trigger the typing indicator.
 *
 * @remarks
 * Generally, bots should _not_ use this route.
 *
 * Fires a _Typing Start_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#trigger-typing-indicator}
 */
export async function triggerTypingIndicator (
  rest: RestManager,
  channelId: BigString
): Promise<void> {
  return await rest.runMethod<void>(
    rest,
    'POST',
    rest.constants.routes.CHANNEL_TYPING(channelId)
  )
}
