[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/types](../modules/discordeno_types.md) / Errors

# Enumeration: Errors

[@discordeno/types](../modules/discordeno_types.md).Errors

## Table of contents

### Enumeration Members

- [BOTS_HIGHEST_ROLE_TOO_LOW](discordeno_types.Errors.md#bots_highest_role_too_low)
- [BUTTON_REQUIRES_CUSTOM_ID](discordeno_types.Errors.md#button_requires_custom_id)
- [CANNOT_ADD_USER_TO_ARCHIVED_THREADS](discordeno_types.Errors.md#cannot_add_user_to_archived_threads)
- [CANNOT_GET_MEMBERS_OF_AN_UNJOINED_PRIVATE_THREAD](discordeno_types.Errors.md#cannot_get_members_of_an_unjoined_private_thread)
- [CANNOT_LEAVE_ARCHIVED_THREAD](discordeno_types.Errors.md#cannot_leave_archived_thread)
- [CANNOT_REMOVE_FROM_ARCHIVED_THREAD](discordeno_types.Errors.md#cannot_remove_from_archived_thread)
- [CHANNEL_NOT_FOUND](discordeno_types.Errors.md#channel_not_found)
- [CHANNEL_NOT_IN_GUILD](discordeno_types.Errors.md#channel_not_in_guild)
- [CHANNEL_NOT_STAGE_VOICE](discordeno_types.Errors.md#channel_not_stage_voice)
- [CHANNEL_NOT_TEXT_BASED](discordeno_types.Errors.md#channel_not_text_based)
- [COMPONENT_CUSTOM_ID_TOO_BIG](discordeno_types.Errors.md#component_custom_id_too_big)
- [COMPONENT_LABEL_TOO_BIG](discordeno_types.Errors.md#component_label_too_big)
- [COMPONENT_PLACEHOLDER_TOO_BIG](discordeno_types.Errors.md#component_placeholder_too_big)
- [COMPONENT_SELECT_MAX_VALUE_TOO_LOW](discordeno_types.Errors.md#component_select_max_value_too_low)
- [COMPONENT_SELECT_MAX_VALUE_TOO_MANY](discordeno_types.Errors.md#component_select_max_value_too_many)
- [COMPONENT_SELECT_MIN_HIGHER_THAN_MAX](discordeno_types.Errors.md#component_select_min_higher_than_max)
- [COMPONENT_SELECT_MIN_VALUE_TOO_LOW](discordeno_types.Errors.md#component_select_min_value_too_low)
- [COMPONENT_SELECT_MIN_VALUE_TOO_MANY](discordeno_types.Errors.md#component_select_min_value_too_many)
- [COMPONENT_SELECT_MUST_BE_ALONE](discordeno_types.Errors.md#component_select_must_be_alone)
- [COMPONENT_SELECT_OPTIONS_TOO_LOW](discordeno_types.Errors.md#component_select_options_too_low)
- [COMPONENT_SELECT_OPTIONS_TOO_MANY](discordeno_types.Errors.md#component_select_options_too_many)
- [DELETE_MESSAGES_MIN](discordeno_types.Errors.md#delete_messages_min)
- [GUILD_NEWS_CHANNEL_ONLY_SUPPORT_PUBLIC_THREADS](discordeno_types.Errors.md#guild_news_channel_only_support_public_threads)
- [GUILD_NOT_DISCOVERABLE](discordeno_types.Errors.md#guild_not_discoverable)
- [GUILD_NOT_FOUND](discordeno_types.Errors.md#guild_not_found)
- [GUILD_WIDGET_NOT_ENABLED](discordeno_types.Errors.md#guild_widget_not_enabled)
- [HAVE_TO_BE_THE_CREATOR_OF_THE_THREAD_OR_HAVE_MANAGE_THREADS_TO_REMOVE_MEMBERS](discordeno_types.Errors.md#have_to_be_the_creator_of_the_thread_or_have_manage_threads_to_remove_members)
- [INVALID_CONTEXT_MENU_COMMAND_DESCRIPTION](discordeno_types.Errors.md#invalid_context_menu_command_description)
- [INVALID_CONTEXT_MENU_COMMAND_NAME](discordeno_types.Errors.md#invalid_context_menu_command_name)
- [INVALID_GET_MESSAGES_LIMIT](discordeno_types.Errors.md#invalid_get_messages_limit)
- [INVALID_SLASH_DESCRIPTION](discordeno_types.Errors.md#invalid_slash_description)
- [INVALID_SLASH_NAME](discordeno_types.Errors.md#invalid_slash_name)
- [INVALID_SLASH_OPTIONS](discordeno_types.Errors.md#invalid_slash_options)
- [INVALID_SLASH_OPTIONS_CHOICES](discordeno_types.Errors.md#invalid_slash_options_choices)
- [INVALID_SLASH_OPTIONS_CHOICE_VALUE_TYPE](discordeno_types.Errors.md#invalid_slash_options_choice_value_type)
- [INVALID_SLASH_OPTION_CHOICE_NAME](discordeno_types.Errors.md#invalid_slash_option_choice_name)
- [INVALID_SLASH_OPTION_DESCRIPTION](discordeno_types.Errors.md#invalid_slash_option_description)
- [INVALID_SLASH_OPTION_NAME](discordeno_types.Errors.md#invalid_slash_option_name)
- [INVALID_THREAD_PARENT_CHANNEL_TYPE](discordeno_types.Errors.md#invalid_thread_parent_channel_type)
- [INVALID_TOPIC_LENGTH](discordeno_types.Errors.md#invalid_topic_length)
- [INVALID_WEBHOOK_NAME](discordeno_types.Errors.md#invalid_webhook_name)
- [INVALID_WEBHOOK_OPTIONS](discordeno_types.Errors.md#invalid_webhook_options)
- [INVITE_MAX_AGE_INVALID](discordeno_types.Errors.md#invite_max_age_invalid)
- [INVITE_MAX_USES_INVALID](discordeno_types.Errors.md#invite_max_uses_invalid)
- [LINK_BUTTON_CANNOT_HAVE_CUSTOM_ID](discordeno_types.Errors.md#link_button_cannot_have_custom_id)
- [MEMBER_NOT_FOUND](discordeno_types.Errors.md#member_not_found)
- [MEMBER_NOT_IN_VOICE_CHANNEL](discordeno_types.Errors.md#member_not_in_voice_channel)
- [MEMBER_SEARCH_LIMIT_TOO_HIGH](discordeno_types.Errors.md#member_search_limit_too_high)
- [MEMBER_SEARCH_LIMIT_TOO_LOW](discordeno_types.Errors.md#member_search_limit_too_low)
- [MESSAGE_MAX_LENGTH](discordeno_types.Errors.md#message_max_length)
- [MISSING_ADD_REACTIONS](discordeno_types.Errors.md#missing_add_reactions)
- [MISSING_ADMINISTRATOR](discordeno_types.Errors.md#missing_administrator)
- [MISSING_ATTACH_FILES](discordeno_types.Errors.md#missing_attach_files)
- [MISSING_BAN_MEMBERS](discordeno_types.Errors.md#missing_ban_members)
- [MISSING_CHANGE_NICKNAME](discordeno_types.Errors.md#missing_change_nickname)
- [MISSING_CONNECT](discordeno_types.Errors.md#missing_connect)
- [MISSING_CREATE_INSTANT_INVITE](discordeno_types.Errors.md#missing_create_instant_invite)
- [MISSING_DEAFEN_MEMBERS](discordeno_types.Errors.md#missing_deafen_members)
- [MISSING_EMBED_LINKS](discordeno_types.Errors.md#missing_embed_links)
- [MISSING_INTENT_GUILD_MEMBERS](discordeno_types.Errors.md#missing_intent_guild_members)
- [MISSING_KICK_MEMBERS](discordeno_types.Errors.md#missing_kick_members)
- [MISSING_MANAGE_CHANNELS](discordeno_types.Errors.md#missing_manage_channels)
- [MISSING_MANAGE_EMOJIS](discordeno_types.Errors.md#missing_manage_emojis)
- [MISSING_MANAGE_GUILD](discordeno_types.Errors.md#missing_manage_guild)
- [MISSING_MANAGE_MESSAGES](discordeno_types.Errors.md#missing_manage_messages)
- [MISSING_MANAGE_NICKNAMES](discordeno_types.Errors.md#missing_manage_nicknames)
- [MISSING_MANAGE_ROLES](discordeno_types.Errors.md#missing_manage_roles)
- [MISSING_MANAGE_THREADS_AND_NOT_MEMBER](discordeno_types.Errors.md#missing_manage_threads_and_not_member)
- [MISSING_MANAGE_WEBHOOKS](discordeno_types.Errors.md#missing_manage_webhooks)
- [MISSING_MENTION_EVERYONE](discordeno_types.Errors.md#missing_mention_everyone)
- [MISSING_MOVE_MEMBERS](discordeno_types.Errors.md#missing_move_members)
- [MISSING_MUTE_MEMBERS](discordeno_types.Errors.md#missing_mute_members)
- [MISSING_PRIORITY_SPEAKER](discordeno_types.Errors.md#missing_priority_speaker)
- [MISSING_READ_MESSAGE_HISTORY](discordeno_types.Errors.md#missing_read_message_history)
- [MISSING_SEND_MESSAGES](discordeno_types.Errors.md#missing_send_messages)
- [MISSING_SEND_TTS_MESSAGES](discordeno_types.Errors.md#missing_send_tts_messages)
- [MISSING_SPEAK](discordeno_types.Errors.md#missing_speak)
- [MISSING_STREAM](discordeno_types.Errors.md#missing_stream)
- [MISSING_USE_EXTERNAL_EMOJIS](discordeno_types.Errors.md#missing_use_external_emojis)
- [MISSING_USE_VAD](discordeno_types.Errors.md#missing_use_vad)
- [MISSING_VIEW_AUDIT_LOG](discordeno_types.Errors.md#missing_view_audit_log)
- [MISSING_VIEW_CHANNEL](discordeno_types.Errors.md#missing_view_channel)
- [MISSING_VIEW_GUILD_INSIGHTS](discordeno_types.Errors.md#missing_view_guild_insights)
- [NICKNAMES_MAX_LENGTH](discordeno_types.Errors.md#nicknames_max_length)
- [NONCE_TOO_LONG](discordeno_types.Errors.md#nonce_too_long)
- [NOT_A_THREAD_CHANNEL](discordeno_types.Errors.md#not_a_thread_channel)
- [ONLY_STRING_OR_INTEGER_OPTIONS_CAN_HAVE_CHOICES](discordeno_types.Errors.md#only_string_or_integer_options_can_have_choices)
- [PRUNE_MAX_DAYS](discordeno_types.Errors.md#prune_max_days)
- [PRUNE_MIN_DAYS](discordeno_types.Errors.md#prune_min_days)
- [RATE_LIMIT_RETRY_MAXED](discordeno_types.Errors.md#rate_limit_retry_maxed)
- [REQUEST_CLIENT_ERROR](discordeno_types.Errors.md#request_client_error)
- [REQUEST_SERVER_ERROR](discordeno_types.Errors.md#request_server_error)
- [REQUEST_UNKNOWN_ERROR](discordeno_types.Errors.md#request_unknown_error)
- [ROLE_NOT_FOUND](discordeno_types.Errors.md#role_not_found)
- [RULES_CHANNEL_CANNOT_BE_DELETED](discordeno_types.Errors.md#rules_channel_cannot_be_deleted)
- [SELECT_OPTION_LABEL_TOO_BIG](discordeno_types.Errors.md#select_option_label_too_big)
- [SELECT_OPTION_TOO_MANY_DEFAULTS](discordeno_types.Errors.md#select_option_too_many_defaults)
- [SELECT_OPTION_VALUE_TOO_BIG](discordeno_types.Errors.md#select_option_value_too_big)
- [TOO_MANY_ACTION_ROWS](discordeno_types.Errors.md#too_many_action_rows)
- [TOO_MANY_COMPONENTS](discordeno_types.Errors.md#too_many_components)
- [TOO_MANY_SLASH_OPTIONS](discordeno_types.Errors.md#too_many_slash_options)
- [TOO_MANY_SLASH_OPTION_CHOICES](discordeno_types.Errors.md#too_many_slash_option_choices)
- [UPDATES_CHANNEL_CANNOT_BE_DELETED](discordeno_types.Errors.md#updates_channel_cannot_be_deleted)
- [USERNAME_INVALID_CHARACTER](discordeno_types.Errors.md#username_invalid_character)
- [USERNAME_INVALID_USERNAME](discordeno_types.Errors.md#username_invalid_username)
- [USERNAME_MAX_LENGTH](discordeno_types.Errors.md#username_max_length)
- [USERNAME_MIN_LENGTH](discordeno_types.Errors.md#username_min_length)
- [YOU_CAN_NOT_DM_THE_BOT_ITSELF](discordeno_types.Errors.md#you_can_not_dm_the_bot_itself)

## Enumeration Members

### BOTS_HIGHEST_ROLE_TOO_LOW

• **BOTS_HIGHEST_ROLE_TOO_LOW** = `"BOTS_HIGHEST_ROLE_TOO_LOW"`

#### Defined in

[packages/types/src/shared.ts:1260](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1260)

---

### BUTTON_REQUIRES_CUSTOM_ID

• **BUTTON_REQUIRES_CUSTOM_ID** = `"BUTTON_REQUIRES_CUSTOM_ID"`

#### Defined in

[packages/types/src/shared.ts:1363](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1363)

---

### CANNOT_ADD_USER_TO_ARCHIVED_THREADS

• **CANNOT_ADD_USER_TO_ARCHIVED_THREADS** = `"CANNOT_ADD_USER_TO_ARCHIVED_THREADS"`

#### Defined in

[packages/types/src/shared.ts:1376](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1376)

---

### CANNOT_GET_MEMBERS_OF_AN_UNJOINED_PRIVATE_THREAD

• **CANNOT_GET_MEMBERS_OF_AN_UNJOINED_PRIVATE_THREAD** = `"CANNOT_GET_MEMBERS_OF_AN_UNJOINED_PRIVATE_THREAD"`

#### Defined in

[packages/types/src/shared.ts:1285](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1285)

---

### CANNOT_LEAVE_ARCHIVED_THREAD

• **CANNOT_LEAVE_ARCHIVED_THREAD** = `"CANNOT_LEAVE_ARCHIVED_THREAD"`

#### Defined in

[packages/types/src/shared.ts:1377](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1377)

---

### CANNOT_REMOVE_FROM_ARCHIVED_THREAD

• **CANNOT_REMOVE_FROM_ARCHIVED_THREAD** = `"CANNOT_REMOVE_FROM_ARCHIVED_THREAD"`

#### Defined in

[packages/types/src/shared.ts:1378](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1378)

---

### CHANNEL_NOT_FOUND

• **CHANNEL_NOT_FOUND** = `"CHANNEL_NOT_FOUND"`

#### Defined in

[packages/types/src/shared.ts:1262](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1262)

---

### CHANNEL_NOT_IN_GUILD

• **CHANNEL_NOT_IN_GUILD** = `"CHANNEL_NOT_IN_GUILD"`

#### Defined in

[packages/types/src/shared.ts:1263](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1263)

---

### CHANNEL_NOT_STAGE_VOICE

• **CHANNEL_NOT_STAGE_VOICE** = `"CHANNEL_NOT_STAGE_VOICE"`

#### Defined in

[packages/types/src/shared.ts:1265](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1265)

---

### CHANNEL_NOT_TEXT_BASED

• **CHANNEL_NOT_TEXT_BASED** = `"CHANNEL_NOT_TEXT_BASED"`

#### Defined in

[packages/types/src/shared.ts:1264](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1264)

---

### COMPONENT_CUSTOM_ID_TOO_BIG

• **COMPONENT_CUSTOM_ID_TOO_BIG** = `"COMPONENT_CUSTOM_ID_TOO_BIG"`

#### Defined in

[packages/types/src/shared.ts:1362](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1362)

---

### COMPONENT_LABEL_TOO_BIG

• **COMPONENT_LABEL_TOO_BIG** = `"COMPONENT_LABEL_TOO_BIG"`

#### Defined in

[packages/types/src/shared.ts:1361](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1361)

---

### COMPONENT_PLACEHOLDER_TOO_BIG

• **COMPONENT_PLACEHOLDER_TOO_BIG** = `"COMPONENT_PLACEHOLDER_TOO_BIG"`

#### Defined in

[packages/types/src/shared.ts:1365](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1365)

---

### COMPONENT_SELECT_MAX_VALUE_TOO_LOW

• **COMPONENT_SELECT_MAX_VALUE_TOO_LOW** = `"COMPONENT_SELECT_MAX_VALUE_TOO_LOW"`

#### Defined in

[packages/types/src/shared.ts:1368](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1368)

---

### COMPONENT_SELECT_MAX_VALUE_TOO_MANY

• **COMPONENT_SELECT_MAX_VALUE_TOO_MANY** = `"COMPONENT_SELECT_MAX_VALUE_TOO_MANY"`

#### Defined in

[packages/types/src/shared.ts:1369](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1369)

---

### COMPONENT_SELECT_MIN_HIGHER_THAN_MAX

• **COMPONENT_SELECT_MIN_HIGHER_THAN_MAX** = `"COMPONENT_SELECT_MIN_HIGHER_THAN_MAX"`

#### Defined in

[packages/types/src/shared.ts:1375](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1375)

---

### COMPONENT_SELECT_MIN_VALUE_TOO_LOW

• **COMPONENT_SELECT_MIN_VALUE_TOO_LOW** = `"COMPONENT_SELECT_MIN_VALUE_TOO_LOW"`

#### Defined in

[packages/types/src/shared.ts:1366](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1366)

---

### COMPONENT_SELECT_MIN_VALUE_TOO_MANY

• **COMPONENT_SELECT_MIN_VALUE_TOO_MANY** = `"COMPONENT_SELECT_MIN_VALUE_TOO_MANY"`

#### Defined in

[packages/types/src/shared.ts:1367](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1367)

---

### COMPONENT_SELECT_MUST_BE_ALONE

• **COMPONENT_SELECT_MUST_BE_ALONE** = `"COMPONENT_SELECT_MUST_BE_ALONE"`

#### Defined in

[packages/types/src/shared.ts:1364](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1364)

---

### COMPONENT_SELECT_OPTIONS_TOO_LOW

• **COMPONENT_SELECT_OPTIONS_TOO_LOW** = `"COMPONENT_SELECT_OPTIONS_TOO_LOW"`

#### Defined in

[packages/types/src/shared.ts:1370](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1370)

---

### COMPONENT_SELECT_OPTIONS_TOO_MANY

• **COMPONENT_SELECT_OPTIONS_TOO_MANY** = `"COMPONENT_SELECT_OPTIONS_TOO_MANY"`

#### Defined in

[packages/types/src/shared.ts:1371](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1371)

---

### DELETE_MESSAGES_MIN

• **DELETE_MESSAGES_MIN** = `"DELETE_MESSAGES_MIN"`

#### Defined in

[packages/types/src/shared.ts:1291](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1291)

---

### GUILD_NEWS_CHANNEL_ONLY_SUPPORT_PUBLIC_THREADS

• **GUILD_NEWS_CHANNEL_ONLY_SUPPORT_PUBLIC_THREADS** = `"GUILD_NEWS_CHANNEL_ONLY_SUPPORT_PUBLIC_THREADS"`

#### Defined in

[packages/types/src/shared.ts:1282](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1282)

---

### GUILD_NOT_DISCOVERABLE

• **GUILD_NOT_DISCOVERABLE** = `"GUILD_NOT_DISCOVERABLE"`

#### Defined in

[packages/types/src/shared.ts:1271](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1271)

---

### GUILD_NOT_FOUND

• **GUILD_NOT_FOUND** = `"GUILD_NOT_FOUND"`

#### Defined in

[packages/types/src/shared.ts:1273](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1273)

---

### GUILD_WIDGET_NOT_ENABLED

• **GUILD_WIDGET_NOT_ENABLED** = `"GUILD_WIDGET_NOT_ENABLED"`

#### Defined in

[packages/types/src/shared.ts:1272](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1272)

---

### HAVE_TO_BE_THE_CREATOR_OF_THE_THREAD_OR_HAVE_MANAGE_THREADS_TO_REMOVE_MEMBERS

• **HAVE_TO_BE_THE_CREATOR_OF_THE_THREAD_OR_HAVE_MANAGE_THREADS_TO_REMOVE_MEMBERS** = `"HAVE_TO_BE_THE_CREATOR_OF_THE_THREAD_OR_HAVE_MANAGE_THREADS_TO_REMOVE_MEMBERS"`

#### Defined in

[packages/types/src/shared.ts:1286](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1286)

---

### INVALID_CONTEXT_MENU_COMMAND_DESCRIPTION

• **INVALID_CONTEXT_MENU_COMMAND_DESCRIPTION** = `"INVALID_CONTEXT_MENU_COMMAND_DESCRIPTION"`

#### Defined in

[packages/types/src/shared.ts:1306](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1306)

---

### INVALID_CONTEXT_MENU_COMMAND_NAME

• **INVALID_CONTEXT_MENU_COMMAND_NAME** = `"INVALID_CONTEXT_MENU_COMMAND_NAME"`

#### Defined in

[packages/types/src/shared.ts:1305](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1305)

---

### INVALID_GET_MESSAGES_LIMIT

• **INVALID_GET_MESSAGES_LIMIT** = `"INVALID_GET_MESSAGES_LIMIT"`

#### Defined in

[packages/types/src/shared.ts:1289](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1289)

---

### INVALID_SLASH_DESCRIPTION

• **INVALID_SLASH_DESCRIPTION** = `"INVALID_SLASH_DESCRIPTION"`

#### Defined in

[packages/types/src/shared.ts:1294](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1294)

---

### INVALID_SLASH_NAME

• **INVALID_SLASH_NAME** = `"INVALID_SLASH_NAME"`

#### Defined in

[packages/types/src/shared.ts:1295](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1295)

---

### INVALID_SLASH_OPTIONS

• **INVALID_SLASH_OPTIONS** = `"INVALID_SLASH_OPTIONS"`

#### Defined in

[packages/types/src/shared.ts:1296](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1296)

---

### INVALID_SLASH_OPTIONS_CHOICES

• **INVALID_SLASH_OPTIONS_CHOICES** = `"INVALID_SLASH_OPTIONS_CHOICES"`

#### Defined in

[packages/types/src/shared.ts:1297](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1297)

---

### INVALID_SLASH_OPTIONS_CHOICE_VALUE_TYPE

• **INVALID_SLASH_OPTIONS_CHOICE_VALUE_TYPE** = `"INVALID_SLASH_OPTIONS_CHOICE_VALUE_TYPE"`

#### Defined in

[packages/types/src/shared.ts:1300](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1300)

---

### INVALID_SLASH_OPTION_CHOICE_NAME

• **INVALID_SLASH_OPTION_CHOICE_NAME** = `"INVALID_SLASH_OPTION_CHOICE_NAME"`

#### Defined in

[packages/types/src/shared.ts:1299](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1299)

---

### INVALID_SLASH_OPTION_DESCRIPTION

• **INVALID_SLASH_OPTION_DESCRIPTION** = `"INVALID_SLASH_OPTION_DESCRIPTION"`

#### Defined in

[packages/types/src/shared.ts:1304](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1304)

---

### INVALID_SLASH_OPTION_NAME

• **INVALID_SLASH_OPTION_NAME** = `"INVALID_SLASH_OPTION_NAME"`

#### Defined in

[packages/types/src/shared.ts:1303](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1303)

---

### INVALID_THREAD_PARENT_CHANNEL_TYPE

• **INVALID_THREAD_PARENT_CHANNEL_TYPE** = `"INVALID_THREAD_PARENT_CHANNEL_TYPE"`

#### Defined in

[packages/types/src/shared.ts:1281](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1281)

---

### INVALID_TOPIC_LENGTH

• **INVALID_TOPIC_LENGTH** = `"INVALID_TOPIC_LENGTH"`

#### Defined in

[packages/types/src/shared.ts:1269](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1269)

---

### INVALID_WEBHOOK_NAME

• **INVALID_WEBHOOK_NAME** = `"INVALID_WEBHOOK_NAME"`

#### Defined in

[packages/types/src/shared.ts:1308](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1308)

---

### INVALID_WEBHOOK_OPTIONS

• **INVALID_WEBHOOK_OPTIONS** = `"INVALID_WEBHOOK_OPTIONS"`

#### Defined in

[packages/types/src/shared.ts:1309](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1309)

---

### INVITE_MAX_AGE_INVALID

• **INVITE_MAX_AGE_INVALID** = `"INVITE_MAX_AGE_INVALID"`

#### Defined in

[packages/types/src/shared.ts:1350](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1350)

---

### INVITE_MAX_USES_INVALID

• **INVITE_MAX_USES_INVALID** = `"INVITE_MAX_USES_INVALID"`

#### Defined in

[packages/types/src/shared.ts:1351](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1351)

---

### LINK_BUTTON_CANNOT_HAVE_CUSTOM_ID

• **LINK_BUTTON_CANNOT_HAVE_CUSTOM_ID** = `"LINK_BUTTON_CANNOT_HAVE_CUSTOM_ID"`

#### Defined in

[packages/types/src/shared.ts:1360](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1360)

---

### MEMBER_NOT_FOUND

• **MEMBER_NOT_FOUND** = `"MEMBER_NOT_FOUND"`

#### Defined in

[packages/types/src/shared.ts:1274](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1274)

---

### MEMBER_NOT_IN_VOICE_CHANNEL

• **MEMBER_NOT_IN_VOICE_CHANNEL** = `"MEMBER_NOT_IN_VOICE_CHANNEL"`

#### Defined in

[packages/types/src/shared.ts:1275](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1275)

---

### MEMBER_SEARCH_LIMIT_TOO_HIGH

• **MEMBER_SEARCH_LIMIT_TOO_HIGH** = `"MEMBER_SEARCH_LIMIT_TOO_HIGH"`

#### Defined in

[packages/types/src/shared.ts:1276](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1276)

---

### MEMBER_SEARCH_LIMIT_TOO_LOW

• **MEMBER_SEARCH_LIMIT_TOO_LOW** = `"MEMBER_SEARCH_LIMIT_TOO_LOW"`

#### Defined in

[packages/types/src/shared.ts:1277](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1277)

---

### MESSAGE_MAX_LENGTH

• **MESSAGE_MAX_LENGTH** = `"MESSAGE_MAX_LENGTH"`

#### Defined in

[packages/types/src/shared.ts:1266](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1266)

---

### MISSING_ADD_REACTIONS

• **MISSING_ADD_REACTIONS** = `"MISSING_ADD_REACTIONS"`

#### Defined in

[packages/types/src/shared.ts:1311](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1311)

---

### MISSING_ADMINISTRATOR

• **MISSING_ADMINISTRATOR** = `"MISSING_ADMINISTRATOR"`

#### Defined in

[packages/types/src/shared.ts:1312](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1312)

---

### MISSING_ATTACH_FILES

• **MISSING_ATTACH_FILES** = `"MISSING_ATTACH_FILES"`

#### Defined in

[packages/types/src/shared.ts:1313](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1313)

---

### MISSING_BAN_MEMBERS

• **MISSING_BAN_MEMBERS** = `"MISSING_BAN_MEMBERS"`

#### Defined in

[packages/types/src/shared.ts:1314](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1314)

---

### MISSING_CHANGE_NICKNAME

• **MISSING_CHANGE_NICKNAME** = `"MISSING_CHANGE_NICKNAME"`

#### Defined in

[packages/types/src/shared.ts:1315](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1315)

---

### MISSING_CONNECT

• **MISSING_CONNECT** = `"MISSING_CONNECT"`

#### Defined in

[packages/types/src/shared.ts:1316](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1316)

---

### MISSING_CREATE_INSTANT_INVITE

• **MISSING_CREATE_INSTANT_INVITE** = `"MISSING_CREATE_INSTANT_INVITE"`

#### Defined in

[packages/types/src/shared.ts:1317](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1317)

---

### MISSING_DEAFEN_MEMBERS

• **MISSING_DEAFEN_MEMBERS** = `"MISSING_DEAFEN_MEMBERS"`

#### Defined in

[packages/types/src/shared.ts:1318](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1318)

---

### MISSING_EMBED_LINKS

• **MISSING_EMBED_LINKS** = `"MISSING_EMBED_LINKS"`

#### Defined in

[packages/types/src/shared.ts:1319](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1319)

---

### MISSING_INTENT_GUILD_MEMBERS

• **MISSING_INTENT_GUILD_MEMBERS** = `"MISSING_INTENT_GUILD_MEMBERS"`

#### Defined in

[packages/types/src/shared.ts:1320](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1320)

---

### MISSING_KICK_MEMBERS

• **MISSING_KICK_MEMBERS** = `"MISSING_KICK_MEMBERS"`

#### Defined in

[packages/types/src/shared.ts:1321](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1321)

---

### MISSING_MANAGE_CHANNELS

• **MISSING_MANAGE_CHANNELS** = `"MISSING_MANAGE_CHANNELS"`

#### Defined in

[packages/types/src/shared.ts:1322](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1322)

---

### MISSING_MANAGE_EMOJIS

• **MISSING_MANAGE_EMOJIS** = `"MISSING_MANAGE_EMOJIS"`

#### Defined in

[packages/types/src/shared.ts:1323](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1323)

---

### MISSING_MANAGE_GUILD

• **MISSING_MANAGE_GUILD** = `"MISSING_MANAGE_GUILD"`

#### Defined in

[packages/types/src/shared.ts:1324](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1324)

---

### MISSING_MANAGE_MESSAGES

• **MISSING_MANAGE_MESSAGES** = `"MISSING_MANAGE_MESSAGES"`

#### Defined in

[packages/types/src/shared.ts:1325](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1325)

---

### MISSING_MANAGE_NICKNAMES

• **MISSING_MANAGE_NICKNAMES** = `"MISSING_MANAGE_NICKNAMES"`

#### Defined in

[packages/types/src/shared.ts:1326](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1326)

---

### MISSING_MANAGE_ROLES

• **MISSING_MANAGE_ROLES** = `"MISSING_MANAGE_ROLES"`

#### Defined in

[packages/types/src/shared.ts:1327](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1327)

---

### MISSING_MANAGE_THREADS_AND_NOT_MEMBER

• **MISSING_MANAGE_THREADS_AND_NOT_MEMBER** = `"MISSING_MANAGE_THREADS_AND_NOT_MEMBER"`

#### Defined in

[packages/types/src/shared.ts:1284](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1284)

---

### MISSING_MANAGE_WEBHOOKS

• **MISSING_MANAGE_WEBHOOKS** = `"MISSING_MANAGE_WEBHOOKS"`

#### Defined in

[packages/types/src/shared.ts:1328](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1328)

---

### MISSING_MENTION_EVERYONE

• **MISSING_MENTION_EVERYONE** = `"MISSING_MENTION_EVERYONE"`

#### Defined in

[packages/types/src/shared.ts:1329](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1329)

---

### MISSING_MOVE_MEMBERS

• **MISSING_MOVE_MEMBERS** = `"MISSING_MOVE_MEMBERS"`

#### Defined in

[packages/types/src/shared.ts:1330](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1330)

---

### MISSING_MUTE_MEMBERS

• **MISSING_MUTE_MEMBERS** = `"MISSING_MUTE_MEMBERS"`

#### Defined in

[packages/types/src/shared.ts:1331](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1331)

---

### MISSING_PRIORITY_SPEAKER

• **MISSING_PRIORITY_SPEAKER** = `"MISSING_PRIORITY_SPEAKER"`

#### Defined in

[packages/types/src/shared.ts:1332](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1332)

---

### MISSING_READ_MESSAGE_HISTORY

• **MISSING_READ_MESSAGE_HISTORY** = `"MISSING_READ_MESSAGE_HISTORY"`

#### Defined in

[packages/types/src/shared.ts:1333](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1333)

---

### MISSING_SEND_MESSAGES

• **MISSING_SEND_MESSAGES** = `"MISSING_SEND_MESSAGES"`

#### Defined in

[packages/types/src/shared.ts:1334](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1334)

---

### MISSING_SEND_TTS_MESSAGES

• **MISSING_SEND_TTS_MESSAGES** = `"MISSING_SEND_TTS_MESSAGES"`

#### Defined in

[packages/types/src/shared.ts:1335](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1335)

---

### MISSING_SPEAK

• **MISSING_SPEAK** = `"MISSING_SPEAK"`

#### Defined in

[packages/types/src/shared.ts:1336](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1336)

---

### MISSING_STREAM

• **MISSING_STREAM** = `"MISSING_STREAM"`

#### Defined in

[packages/types/src/shared.ts:1337](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1337)

---

### MISSING_USE_EXTERNAL_EMOJIS

• **MISSING_USE_EXTERNAL_EMOJIS** = `"MISSING_USE_EXTERNAL_EMOJIS"`

#### Defined in

[packages/types/src/shared.ts:1339](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1339)

---

### MISSING_USE_VAD

• **MISSING_USE_VAD** = `"MISSING_USE_VAD"`

#### Defined in

[packages/types/src/shared.ts:1338](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1338)

---

### MISSING_VIEW_AUDIT_LOG

• **MISSING_VIEW_AUDIT_LOG** = `"MISSING_VIEW_AUDIT_LOG"`

#### Defined in

[packages/types/src/shared.ts:1340](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1340)

---

### MISSING_VIEW_CHANNEL

• **MISSING_VIEW_CHANNEL** = `"MISSING_VIEW_CHANNEL"`

#### Defined in

[packages/types/src/shared.ts:1341](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1341)

---

### MISSING_VIEW_GUILD_INSIGHTS

• **MISSING_VIEW_GUILD_INSIGHTS** = `"MISSING_VIEW_GUILD_INSIGHTS"`

#### Defined in

[packages/types/src/shared.ts:1342](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1342)

---

### NICKNAMES_MAX_LENGTH

• **NICKNAMES_MAX_LENGTH** = `"NICKNAMES_MAX_LENGTH"`

#### Defined in

[packages/types/src/shared.ts:1344](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1344)

---

### NONCE_TOO_LONG

• **NONCE_TOO_LONG** = `"NONCE_TOO_LONG"`

#### Defined in

[packages/types/src/shared.ts:1349](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1349)

---

### NOT_A_THREAD_CHANNEL

• **NOT_A_THREAD_CHANNEL** = `"NOT_A_THREAD_CHANNEL"`

#### Defined in

[packages/types/src/shared.ts:1283](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1283)

---

### ONLY_STRING_OR_INTEGER_OPTIONS_CAN_HAVE_CHOICES

• **ONLY_STRING_OR_INTEGER_OPTIONS_CAN_HAVE_CHOICES** = `"ONLY_STRING_OR_INTEGER_OPTIONS_CAN_HAVE_CHOICES"`

#### Defined in

[packages/types/src/shared.ts:1302](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1302)

---

### PRUNE_MAX_DAYS

• **PRUNE_MAX_DAYS** = `"PRUNE_MAX_DAYS"`

#### Defined in

[packages/types/src/shared.ts:1278](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1278)

---

### PRUNE_MIN_DAYS

• **PRUNE_MIN_DAYS** = `"PRUNE_MIN_DAYS"`

#### Defined in

[packages/types/src/shared.ts:1292](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1292)

---

### RATE_LIMIT_RETRY_MAXED

• **RATE_LIMIT_RETRY_MAXED** = `"RATE_LIMIT_RETRY_MAXED"`

#### Defined in

[packages/types/src/shared.ts:1353](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1353)

---

### REQUEST_CLIENT_ERROR

• **REQUEST_CLIENT_ERROR** = `"REQUEST_CLIENT_ERROR"`

#### Defined in

[packages/types/src/shared.ts:1354](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1354)

---

### REQUEST_SERVER_ERROR

• **REQUEST_SERVER_ERROR** = `"REQUEST_SERVER_ERROR"`

#### Defined in

[packages/types/src/shared.ts:1355](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1355)

---

### REQUEST_UNKNOWN_ERROR

• **REQUEST_UNKNOWN_ERROR** = `"REQUEST_UNKNOWN_ERROR"`

#### Defined in

[packages/types/src/shared.ts:1356](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1356)

---

### ROLE_NOT_FOUND

• **ROLE_NOT_FOUND** = `"ROLE_NOT_FOUND"`

#### Defined in

[packages/types/src/shared.ts:1279](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1279)

---

### RULES_CHANNEL_CANNOT_BE_DELETED

• **RULES_CHANNEL_CANNOT_BE_DELETED** = `"RULES_CHANNEL_CANNOT_BE_DELETED"`

#### Defined in

[packages/types/src/shared.ts:1267](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1267)

---

### SELECT_OPTION_LABEL_TOO_BIG

• **SELECT_OPTION_LABEL_TOO_BIG** = `"SELECT_OPTION_LABEL_TOO_BIG"`

#### Defined in

[packages/types/src/shared.ts:1372](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1372)

---

### SELECT_OPTION_TOO_MANY_DEFAULTS

• **SELECT_OPTION_TOO_MANY_DEFAULTS** = `"SELECT_OPTION_TOO_MANY_DEFAULTS"`

#### Defined in

[packages/types/src/shared.ts:1374](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1374)

---

### SELECT_OPTION_VALUE_TOO_BIG

• **SELECT_OPTION_VALUE_TOO_BIG** = `"SELECT_OPTION_VALUE_TOO_BIG"`

#### Defined in

[packages/types/src/shared.ts:1373](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1373)

---

### TOO_MANY_ACTION_ROWS

• **TOO_MANY_ACTION_ROWS** = `"TOO_MANY_ACTION_ROWS"`

#### Defined in

[packages/types/src/shared.ts:1359](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1359)

---

### TOO_MANY_COMPONENTS

• **TOO_MANY_COMPONENTS** = `"TOO_MANY_COMPONENTS"`

#### Defined in

[packages/types/src/shared.ts:1358](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1358)

---

### TOO_MANY_SLASH_OPTIONS

• **TOO_MANY_SLASH_OPTIONS** = `"TOO_MANY_SLASH_OPTIONS"`

#### Defined in

[packages/types/src/shared.ts:1298](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1298)

---

### TOO_MANY_SLASH_OPTION_CHOICES

• **TOO_MANY_SLASH_OPTION_CHOICES** = `"TOO_MANY_SLASH_OPTION_CHOICES"`

#### Defined in

[packages/types/src/shared.ts:1301](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1301)

---

### UPDATES_CHANNEL_CANNOT_BE_DELETED

• **UPDATES_CHANNEL_CANNOT_BE_DELETED** = `"UPDATES_CHANNEL_CANNOT_BE_DELETED"`

#### Defined in

[packages/types/src/shared.ts:1268](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1268)

---

### USERNAME_INVALID_CHARACTER

• **USERNAME_INVALID_CHARACTER** = `"USERNAME_INVALID_CHARACTER"`

#### Defined in

[packages/types/src/shared.ts:1345](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1345)

---

### USERNAME_INVALID_USERNAME

• **USERNAME_INVALID_USERNAME** = `"USERNAME_INVALID_USERNAME"`

#### Defined in

[packages/types/src/shared.ts:1346](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1346)

---

### USERNAME_MAX_LENGTH

• **USERNAME_MAX_LENGTH** = `"USERNAME_MAX_LENGTH"`

#### Defined in

[packages/types/src/shared.ts:1347](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1347)

---

### USERNAME_MIN_LENGTH

• **USERNAME_MIN_LENGTH** = `"USERNAME_MIN_LENGTH"`

#### Defined in

[packages/types/src/shared.ts:1348](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1348)

---

### YOU_CAN_NOT_DM_THE_BOT_ITSELF

• **YOU_CAN_NOT_DM_THE_BOT_ITSELF** = `"YOU_CAN_NOT_DM_THE_BOT_ITSELF"`

#### Defined in

[packages/types/src/shared.ts:1379](https://github.com/deepsarda/discordeno/blob/c6dc30bb/packages/types/src/shared.ts#L1379)
