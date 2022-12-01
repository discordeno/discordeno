[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / InteractionResponseTypes

# Enumeration: InteractionResponseTypes

[@discordeno/types](../modules/discordeno_types.md).InteractionResponseTypes

https://discord.com/developers/docs/interactions/slash-commands#interaction-response-interactionresponsetype

## Table of contents

### Enumeration Members

- [ApplicationCommandAutocompleteResult](discordeno_types.InteractionResponseTypes.md#applicationcommandautocompleteresult)
- [ChannelMessageWithSource](discordeno_types.InteractionResponseTypes.md#channelmessagewithsource)
- [DeferredChannelMessageWithSource](discordeno_types.InteractionResponseTypes.md#deferredchannelmessagewithsource)
- [DeferredUpdateMessage](discordeno_types.InteractionResponseTypes.md#deferredupdatemessage)
- [Modal](discordeno_types.InteractionResponseTypes.md#modal)
- [Pong](discordeno_types.InteractionResponseTypes.md#pong)
- [UpdateMessage](discordeno_types.InteractionResponseTypes.md#updatemessage)

## Enumeration Members

### ApplicationCommandAutocompleteResult

• **ApplicationCommandAutocompleteResult** = `8`

For Application Command Options, send an autocomplete result

#### Defined in

[packages/types/src/shared.ts:1246](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1246)

---

### ChannelMessageWithSource

• **ChannelMessageWithSource** = `4`

Respond to an interaction with a message

#### Defined in

[packages/types/src/shared.ts:1238](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1238)

---

### DeferredChannelMessageWithSource

• **DeferredChannelMessageWithSource** = `5`

ACK an interaction and edit a response later, the user sees a loading state

#### Defined in

[packages/types/src/shared.ts:1240](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1240)

---

### DeferredUpdateMessage

• **DeferredUpdateMessage** = `6`

For components, ACK an interaction and edit the original message later; the user does not see a loading state

#### Defined in

[packages/types/src/shared.ts:1242](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1242)

---

### Modal

• **Modal** = `9`

For Command or Component interactions, send a Modal response

#### Defined in

[packages/types/src/shared.ts:1248](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1248)

---

### Pong

• **Pong** = `1`

ACK a `Ping`

#### Defined in

[packages/types/src/shared.ts:1236](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1236)

---

### UpdateMessage

• **UpdateMessage** = `7`

For components, edit the message the component was attached to

#### Defined in

[packages/types/src/shared.ts:1244](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1244)
