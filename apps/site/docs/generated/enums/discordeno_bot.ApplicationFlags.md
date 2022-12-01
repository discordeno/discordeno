[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / ApplicationFlags

# Enumeration: ApplicationFlags

[@discordeno/bot](../modules/discordeno_bot.md).ApplicationFlags

https://discord.com/developers/docs/topics/oauth2#application-application-flags

## Table of contents

### Enumeration Members

- [ApplicationCommandBadge](discordeno_bot.ApplicationFlags.md#applicationcommandbadge)
- [Embedded](discordeno_bot.ApplicationFlags.md#embedded)
- [GatewayGuildMembers](discordeno_bot.ApplicationFlags.md#gatewayguildmembers)
- [GatewayGuildMembersLimited](discordeno_bot.ApplicationFlags.md#gatewayguildmemberslimited)
- [GatewayMessageContent](discordeno_bot.ApplicationFlags.md#gatewaymessagecontent)
- [GatewayMessageContentLimited](discordeno_bot.ApplicationFlags.md#gatewaymessagecontentlimited)
- [GatewayPresence](discordeno_bot.ApplicationFlags.md#gatewaypresence)
- [GatewayPresenceLimited](discordeno_bot.ApplicationFlags.md#gatewaypresencelimited)
- [VerificationPendingGuildLimit](discordeno_bot.ApplicationFlags.md#verificationpendingguildlimit)

## Enumeration Members

### ApplicationCommandBadge

• **ApplicationCommandBadge** = `8388608`

Indicates if an app has registered global application commands

#### Defined in

packages/types/dist/shared.d.ts:82

---

### Embedded

• **Embedded** = `131072`

Indicates if an app is embedded within the Discord client (currently unavailable publicly)

#### Defined in

packages/types/dist/shared.d.ts:76

---

### GatewayGuildMembers

• **GatewayGuildMembers** = `16384`

Intent required for bots in **100 or more servers** to receive member-related events like `guild_member_add`. See list of member-related events [under `GUILD_MEMBERS`](#DOCS_TOPICS_GATEWAY/list-of-intents)

#### Defined in

packages/types/dist/shared.d.ts:70

---

### GatewayGuildMembersLimited

• **GatewayGuildMembersLimited** = `32768`

Intent required for bots in under 100 servers to receive member-related events like `guild_member_add`, found in Bot Settings. See list of member-related events [under `GUILD_MEMBERS`](#DOCS_TOPICS_GATEWAY/list-of-intents)

#### Defined in

packages/types/dist/shared.d.ts:72

---

### GatewayMessageContent

• **GatewayMessageContent** = `262144`

Intent required for bots in **100 or more servers** to receive [message content](https://support-dev.discord.com/hc/en-us/articles/4404772028055)

#### Defined in

packages/types/dist/shared.d.ts:78

---

### GatewayMessageContentLimited

• **GatewayMessageContentLimited** = `524288`

Intent required for bots in under 100 servers to receive [message content](https://support-dev.discord.com/hc/en-us/articles/4404772028055), found in Bot Settings

#### Defined in

packages/types/dist/shared.d.ts:80

---

### GatewayPresence

• **GatewayPresence** = `4096`

Intent required for bots in **100 or more servers** to receive [`presence_update` events](#DOCS_TOPICS_GATEWAY/presence-update)

#### Defined in

packages/types/dist/shared.d.ts:66

---

### GatewayPresenceLimited

• **GatewayPresenceLimited** = `8192`

Intent required for bots in under 100 servers to receive [`presence_update` events](#DOCS_TOPICS_GATEWAY/presence-update), found in Bot Settings

#### Defined in

packages/types/dist/shared.d.ts:68

---

### VerificationPendingGuildLimit

• **VerificationPendingGuildLimit** = `65536`

Indicates unusual growth of an app that prevents verification

#### Defined in

packages/types/dist/shared.d.ts:74
