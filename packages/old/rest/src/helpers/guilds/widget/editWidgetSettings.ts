import { routes } from '@discordeno/constant'
import TRANSFORMERS from '@discordeno/transformer'
import type { BigString, Camelize, DiscordEditGuildWidgetSettings, DiscordGuildWidgetSettings } from '@discordeno/types'
import type { RestManager } from '../../../restManager.js'
import type { GuildWidgetSettings } from '../../../transformers/widgetSettings.js'

// TODO: Use `options` instead of `enabled` and `channelId`.

/**
 * Edits the settings of a guild's widget.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild to edit the settings of the widget of.
 * @returns An instance of the edited {@link GuildWidgetSettings}.
 *
 * @remarks
 * Requires the `MANAGE_GUILD` permission.
 *
 * Fires a _Guild Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#modify-guild-widget}
 */
export async function editWidgetSettings (
  rest: RestManager,
  guildId: BigString,
  enabled: boolean,
  channelId?: string | null
): Promise<Camelize<DiscordGuildWidgetSettings>> {
  const result = await rest.runMethod<DiscordGuildWidgetSettings>(

    'PATCH',
    routes.GUILD_WIDGET(guildId),
    {
      enabled,
      channel_id: channelId
    } as DiscordEditGuildWidgetSettings
  )

  return TRANSFORMERS.widgetSettings(result)
}
