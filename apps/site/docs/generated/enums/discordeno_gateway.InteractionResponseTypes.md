[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / InteractionResponseTypes

# Enumeration: InteractionResponseTypes

[@discordeno/gateway](../modules/discordeno_gateway.md).InteractionResponseTypes

https://discord.com/developers/docs/interactions/slash-commands#interaction-response-interactionresponsetype

## Table of contents

### Enumeration Members

- [ApplicationCommandAutocompleteResult](discordeno_gateway.InteractionResponseTypes.md#applicationcommandautocompleteresult)
- [ChannelMessageWithSource](discordeno_gateway.InteractionResponseTypes.md#channelmessagewithsource)
- [DeferredChannelMessageWithSource](discordeno_gateway.InteractionResponseTypes.md#deferredchannelmessagewithsource)
- [DeferredUpdateMessage](discordeno_gateway.InteractionResponseTypes.md#deferredupdatemessage)
- [Modal](discordeno_gateway.InteractionResponseTypes.md#modal)
- [Pong](discordeno_gateway.InteractionResponseTypes.md#pong)
- [UpdateMessage](discordeno_gateway.InteractionResponseTypes.md#updatemessage)

## Enumeration Members

### ApplicationCommandAutocompleteResult

• **ApplicationCommandAutocompleteResult** = `8`

For Application Command Options, send an autocomplete result

#### Defined in

packages/types/dist/shared.d.ts:1126

---

### ChannelMessageWithSource

• **ChannelMessageWithSource** = `4`

Respond to an interaction with a message

#### Defined in

packages/types/dist/shared.d.ts:1118

---

### DeferredChannelMessageWithSource

• **DeferredChannelMessageWithSource** = `5`

ACK an interaction and edit a response later, the user sees a loading state

#### Defined in

packages/types/dist/shared.d.ts:1120

---

### DeferredUpdateMessage

• **DeferredUpdateMessage** = `6`

For components, ACK an interaction and edit the original message later; the user does not see a loading state

#### Defined in

packages/types/dist/shared.d.ts:1122

---

### Modal

• **Modal** = `9`

For Command or Component interactions, send a Modal response

#### Defined in

packages/types/dist/shared.d.ts:1128

---

### Pong

• **Pong** = `1`

ACK a `Ping`

#### Defined in

packages/types/dist/shared.d.ts:1116

---

### UpdateMessage

• **UpdateMessage** = `7`

For components, edit the message the component was attached to

#### Defined in

packages/types/dist/shared.d.ts:1124
