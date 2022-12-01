[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / ApplicationFlags

# Enumeration: ApplicationFlags

[@discordeno/types](../modules/discordeno_types.md).ApplicationFlags

https://discord.com/developers/docs/topics/oauth2#application-application-flags

## Table of contents

### Enumeration Members

- [ApplicationCommandBadge](discordeno_types.ApplicationFlags.md#applicationcommandbadge)
- [Embedded](discordeno_types.ApplicationFlags.md#embedded)
- [GatewayGuildMembers](discordeno_types.ApplicationFlags.md#gatewayguildmembers)
- [GatewayGuildMembersLimited](discordeno_types.ApplicationFlags.md#gatewayguildmemberslimited)
- [GatewayMessageContent](discordeno_types.ApplicationFlags.md#gatewaymessagecontent)
- [GatewayMessageContentLimited](discordeno_types.ApplicationFlags.md#gatewaymessagecontentlimited)
- [GatewayPresence](discordeno_types.ApplicationFlags.md#gatewaypresence)
- [GatewayPresenceLimited](discordeno_types.ApplicationFlags.md#gatewaypresencelimited)
- [VerificationPendingGuildLimit](discordeno_types.ApplicationFlags.md#verificationpendingguildlimit)

## Enumeration Members

### ApplicationCommandBadge

• **ApplicationCommandBadge** = `8388608`

Indicates if an app has registered global application commands

#### Defined in

[packages/types/src/shared.ts:92](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L92)

---

### Embedded

• **Embedded** = `131072`

Indicates if an app is embedded within the Discord client (currently unavailable publicly)

#### Defined in

[packages/types/src/shared.ts:86](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L86)

---

### GatewayGuildMembers

• **GatewayGuildMembers** = `16384`

Intent required for bots in **100 or more servers** to receive member-related events like `guild_member_add`. See list of member-related events [under `GUILD_MEMBERS`](#DOCS_TOPICS_GATEWAY/list-of-intents)

#### Defined in

[packages/types/src/shared.ts:80](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L80)

---

### GatewayGuildMembersLimited

• **GatewayGuildMembersLimited** = `32768`

Intent required for bots in under 100 servers to receive member-related events like `guild_member_add`, found in Bot Settings. See list of member-related events [under `GUILD_MEMBERS`](#DOCS_TOPICS_GATEWAY/list-of-intents)

#### Defined in

[packages/types/src/shared.ts:82](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L82)

---

### GatewayMessageContent

• **GatewayMessageContent** = `262144`

Intent required for bots in **100 or more servers** to receive [message content](https://support-dev.discord.com/hc/en-us/articles/4404772028055)

#### Defined in

[packages/types/src/shared.ts:88](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L88)

---

### GatewayMessageContentLimited

• **GatewayMessageContentLimited** = `524288`

Intent required for bots in under 100 servers to receive [message content](https://support-dev.discord.com/hc/en-us/articles/4404772028055), found in Bot Settings

#### Defined in

[packages/types/src/shared.ts:90](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L90)

---

### GatewayPresence

• **GatewayPresence** = `4096`

Intent required for bots in **100 or more servers** to receive [`presence_update` events](#DOCS_TOPICS_GATEWAY/presence-update)

#### Defined in

[packages/types/src/shared.ts:76](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L76)

---

### GatewayPresenceLimited

• **GatewayPresenceLimited** = `8192`

Intent required for bots in under 100 servers to receive [`presence_update` events](#DOCS_TOPICS_GATEWAY/presence-update), found in Bot Settings

#### Defined in

[packages/types/src/shared.ts:78](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L78)

---

### VerificationPendingGuildLimit

• **VerificationPendingGuildLimit** = `65536`

Indicates unusual growth of an app that prevents verification

#### Defined in

[packages/types/src/shared.ts:84](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L84)
