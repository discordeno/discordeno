[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/bot](../modules/discordeno_bot.md) / ModifyGuildMember

# Interface: ModifyGuildMember

[@discordeno/bot](../modules/discordeno_bot.md).ModifyGuildMember

https://discord.com/developers/docs/resources/guild#modify-guild-member

## Table of contents

### Properties

- [channelId](discordeno_bot.ModifyGuildMember.md#channelid)
- [communicationDisabledUntil](discordeno_bot.ModifyGuildMember.md#communicationdisableduntil)
- [deaf](discordeno_bot.ModifyGuildMember.md#deaf)
- [mute](discordeno_bot.ModifyGuildMember.md#mute)
- [nick](discordeno_bot.ModifyGuildMember.md#nick)
- [roles](discordeno_bot.ModifyGuildMember.md#roles)

## Properties

### channelId

• `Optional` **channelId**: `null` \| [`BigString`](../modules/discordeno_bot.md#bigstring)

Id of channel to move user to (if they are connected to voice). Requires the `MOVE_MEMBERS` permission

#### Defined in

[packages/bot/src/helpers/members/editMember.ts:57](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/members/editMember.ts#L57)

---

### communicationDisabledUntil

• `Optional` **communicationDisabledUntil**: `null` \| `number`

when the user's timeout will expire and the user will be able to communicate in the guild again (up to 28 days in the future), set to null to remove timeout. Requires the `MODERATE_MEMBERS` permission

#### Defined in

[packages/bot/src/helpers/members/editMember.ts:59](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/members/editMember.ts#L59)

---

### deaf

• `Optional` **deaf**: `null` \| `boolean`

Whether the user is deafened in voice channels. Will throw a 400 if the user is not in a voice channel. Requires the `MOVE_MEMBERS` permission

#### Defined in

[packages/bot/src/helpers/members/editMember.ts:55](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/members/editMember.ts#L55)

---

### mute

• `Optional` **mute**: `null` \| `boolean`

Whether the user is muted in voice channels. Will throw a 400 if the user is not in a voice channel. Requires the `MUTE_MEMBERS` permission

#### Defined in

[packages/bot/src/helpers/members/editMember.ts:53](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/members/editMember.ts#L53)

---

### nick

• `Optional` **nick**: `null` \| `string`

Value to set users nickname to. Requires the `MANAGE_NICKNAMES` permission

#### Defined in

[packages/bot/src/helpers/members/editMember.ts:49](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/members/editMember.ts#L49)

---

### roles

• `Optional` **roles**: `null` \| [`BigString`](../modules/discordeno_bot.md#bigstring)[]

Array of role ids the member is assigned. Requires the `MANAGE_ROLES` permission

#### Defined in

[packages/bot/src/helpers/members/editMember.ts:51](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/bot/src/helpers/members/editMember.ts#L51)
