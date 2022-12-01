[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / GetGuildWidgetImageQuery

# Interface: GetGuildWidgetImageQuery

[@discordeno/bot](../modules/discordeno_bot.md).GetGuildWidgetImageQuery

https://discord.com/developers/docs/resources/guild#get-guild-widget-image-query-string-params

## Table of contents

### Properties

- [style](discordeno_bot.GetGuildWidgetImageQuery.md#style)

## Properties

### style

• `Optional` **style**: `"shield"` \| `"banner1"` \| `"banner2"` \| `"banner3"` \| `"banner4"`

Style of the widget returned, default: shield

Shield: Widget with Discord icon and guild members online count.
Banner1: Large image with guild icon, name and online count. "POWERED BY DISCORD" as the footer of the widget
Banner2: Smaller widget style with guild icon, name and online count. Split on the right with Discord logo
Banner3: Large image with guild icon, name and online count. In the footer, Discord logo on the left and "Chat Now" on the right
Banner4: Large Discord logo at the top of the widget. Guild icon, name and online count in the middle portion of the widget and a "JOIN MY SERVER" button at the bottom

#### Defined in

[packages/bot/src/helpers/guilds/widget/getWidgetImageUrl.ts:27](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/guilds/widget/getWidgetImageUrl.ts#L27)
