[discordeno-monorepo](../README.md) / [Modules](../modules.md) / [@discordeno/gateway](../modules/discordeno_gateway.md) / Errors

# Enumeration: Errors

[@discordeno/gateway](../modules/discordeno_gateway.md).Errors

## Table of contents

### Enumeration Members

- [BOTS_HIGHEST_ROLE_TOO_LOW](discordeno_gateway.Errors.md#bots_highest_role_too_low)
- [BUTTON_REQUIRES_CUSTOM_ID](discordeno_gateway.Errors.md#button_requires_custom_id)
- [CANNOT_ADD_USER_TO_ARCHIVED_THREADS](discordeno_gateway.Errors.md#cannot_add_user_to_archived_threads)
- [CANNOT_GET_MEMBERS_OF_AN_UNJOINED_PRIVATE_THREAD](discordeno_gateway.Errors.md#cannot_get_members_of_an_unjoined_private_thread)
- [CANNOT_LEAVE_ARCHIVED_THREAD](discordeno_gateway.Errors.md#cannot_leave_archived_thread)
- [CANNOT_REMOVE_FROM_ARCHIVED_THREAD](discordeno_gateway.Errors.md#cannot_remove_from_archived_thread)
- [CHANNEL_NOT_FOUND](discordeno_gateway.Errors.md#channel_not_found)
- [CHANNEL_NOT_IN_GUILD](discordeno_gateway.Errors.md#channel_not_in_guild)
- [CHANNEL_NOT_STAGE_VOICE](discordeno_gateway.Errors.md#channel_not_stage_voice)
- [CHANNEL_NOT_TEXT_BASED](discordeno_gateway.Errors.md#channel_not_text_based)
- [COMPONENT_CUSTOM_ID_TOO_BIG](discordeno_gateway.Errors.md#component_custom_id_too_big)
- [COMPONENT_LABEL_TOO_BIG](discordeno_gateway.Errors.md#component_label_too_big)
- [COMPONENT_PLACEHOLDER_TOO_BIG](discordeno_gateway.Errors.md#component_placeholder_too_big)
- [COMPONENT_SELECT_MAX_VALUE_TOO_LOW](discordeno_gateway.Errors.md#component_select_max_value_too_low)
- [COMPONENT_SELECT_MAX_VALUE_TOO_MANY](discordeno_gateway.Errors.md#component_select_max_value_too_many)
- [COMPONENT_SELECT_MIN_HIGHER_THAN_MAX](discordeno_gateway.Errors.md#component_select_min_higher_than_max)
- [COMPONENT_SELECT_MIN_VALUE_TOO_LOW](discordeno_gateway.Errors.md#component_select_min_value_too_low)
- [COMPONENT_SELECT_MIN_VALUE_TOO_MANY](discordeno_gateway.Errors.md#component_select_min_value_too_many)
- [COMPONENT_SELECT_MUST_BE_ALONE](discordeno_gateway.Errors.md#component_select_must_be_alone)
- [COMPONENT_SELECT_OPTIONS_TOO_LOW](discordeno_gateway.Errors.md#component_select_options_too_low)
- [COMPONENT_SELECT_OPTIONS_TOO_MANY](discordeno_gateway.Errors.md#component_select_options_too_many)
- [DELETE_MESSAGES_MIN](discordeno_gateway.Errors.md#delete_messages_min)
- [GUILD_NEWS_CHANNEL_ONLY_SUPPORT_PUBLIC_THREADS](discordeno_gateway.Errors.md#guild_news_channel_only_support_public_threads)
- [GUILD_NOT_DISCOVERABLE](discordeno_gateway.Errors.md#guild_not_discoverable)
- [GUILD_NOT_FOUND](discordeno_gateway.Errors.md#guild_not_found)
- [GUILD_WIDGET_NOT_ENABLED](discordeno_gateway.Errors.md#guild_widget_not_enabled)
- [HAVE_TO_BE_THE_CREATOR_OF_THE_THREAD_OR_HAVE_MANAGE_THREADS_TO_REMOVE_MEMBERS](discordeno_gateway.Errors.md#have_to_be_the_creator_of_the_thread_or_have_manage_threads_to_remove_members)
- [INVALID_CONTEXT_MENU_COMMAND_DESCRIPTION](discordeno_gateway.Errors.md#invalid_context_menu_command_description)
- [INVALID_CONTEXT_MENU_COMMAND_NAME](discordeno_gateway.Errors.md#invalid_context_menu_command_name)
- [INVALID_GET_MESSAGES_LIMIT](discordeno_gateway.Errors.md#invalid_get_messages_limit)
- [INVALID_SLASH_DESCRIPTION](discordeno_gateway.Errors.md#invalid_slash_description)
- [INVALID_SLASH_NAME](discordeno_gateway.Errors.md#invalid_slash_name)
- [INVALID_SLASH_OPTIONS](discordeno_gateway.Errors.md#invalid_slash_options)
- [INVALID_SLASH_OPTIONS_CHOICES](discordeno_gateway.Errors.md#invalid_slash_options_choices)
- [INVALID_SLASH_OPTIONS_CHOICE_VALUE_TYPE](discordeno_gateway.Errors.md#invalid_slash_options_choice_value_type)
- [INVALID_SLASH_OPTION_CHOICE_NAME](discordeno_gateway.Errors.md#invalid_slash_option_choice_name)
- [INVALID_SLASH_OPTION_DESCRIPTION](discordeno_gateway.Errors.md#invalid_slash_option_description)
- [INVALID_SLASH_OPTION_NAME](discordeno_gateway.Errors.md#invalid_slash_option_name)
- [INVALID_THREAD_PARENT_CHANNEL_TYPE](discordeno_gateway.Errors.md#invalid_thread_parent_channel_type)
- [INVALID_TOPIC_LENGTH](discordeno_gateway.Errors.md#invalid_topic_length)
- [INVALID_WEBHOOK_NAME](discordeno_gateway.Errors.md#invalid_webhook_name)
- [INVALID_WEBHOOK_OPTIONS](discordeno_gateway.Errors.md#invalid_webhook_options)
- [INVITE_MAX_AGE_INVALID](discordeno_gateway.Errors.md#invite_max_age_invalid)
- [INVITE_MAX_USES_INVALID](discordeno_gateway.Errors.md#invite_max_uses_invalid)
- [LINK_BUTTON_CANNOT_HAVE_CUSTOM_ID](discordeno_gateway.Errors.md#link_button_cannot_have_custom_id)
- [MEMBER_NOT_FOUND](discordeno_gateway.Errors.md#member_not_found)
- [MEMBER_NOT_IN_VOICE_CHANNEL](discordeno_gateway.Errors.md#member_not_in_voice_channel)
- [MEMBER_SEARCH_LIMIT_TOO_HIGH](discordeno_gateway.Errors.md#member_search_limit_too_high)
- [MEMBER_SEARCH_LIMIT_TOO_LOW](discordeno_gateway.Errors.md#member_search_limit_too_low)
- [MESSAGE_MAX_LENGTH](discordeno_gateway.Errors.md#message_max_length)
- [MISSING_ADD_REACTIONS](discordeno_gateway.Errors.md#missing_add_reactions)
- [MISSING_ADMINISTRATOR](discordeno_gateway.Errors.md#missing_administrator)
- [MISSING_ATTACH_FILES](discordeno_gateway.Errors.md#missing_attach_files)
- [MISSING_BAN_MEMBERS](discordeno_gateway.Errors.md#missing_ban_members)
- [MISSING_CHANGE_NICKNAME](discordeno_gateway.Errors.md#missing_change_nickname)
- [MISSING_CONNECT](discordeno_gateway.Errors.md#missing_connect)
- [MISSING_CREATE_INSTANT_INVITE](discordeno_gateway.Errors.md#missing_create_instant_invite)
- [MISSING_DEAFEN_MEMBERS](discordeno_gateway.Errors.md#missing_deafen_members)
- [MISSING_EMBED_LINKS](discordeno_gateway.Errors.md#missing_embed_links)
- [MISSING_INTENT_GUILD_MEMBERS](discordeno_gateway.Errors.md#missing_intent_guild_members)
- [MISSING_KICK_MEMBERS](discordeno_gateway.Errors.md#missing_kick_members)
- [MISSING_MANAGE_CHANNELS](discordeno_gateway.Errors.md#missing_manage_channels)
- [MISSING_MANAGE_EMOJIS](discordeno_gateway.Errors.md#missing_manage_emojis)
- [MISSING_MANAGE_GUILD](discordeno_gateway.Errors.md#missing_manage_guild)
- [MISSING_MANAGE_MESSAGES](discordeno_gateway.Errors.md#missing_manage_messages)
- [MISSING_MANAGE_NICKNAMES](discordeno_gateway.Errors.md#missing_manage_nicknames)
- [MISSING_MANAGE_ROLES](discordeno_gateway.Errors.md#missing_manage_roles)
- [MISSING_MANAGE_THREADS_AND_NOT_MEMBER](discordeno_gateway.Errors.md#missing_manage_threads_and_not_member)
- [MISSING_MANAGE_WEBHOOKS](discordeno_gateway.Errors.md#missing_manage_webhooks)
- [MISSING_MENTION_EVERYONE](discordeno_gateway.Errors.md#missing_mention_everyone)
- [MISSING_MOVE_MEMBERS](discordeno_gateway.Errors.md#missing_move_members)
- [MISSING_MUTE_MEMBERS](discordeno_gateway.Errors.md#missing_mute_members)
- [MISSING_PRIORITY_SPEAKER](discordeno_gateway.Errors.md#missing_priority_speaker)
- [MISSING_READ_MESSAGE_HISTORY](discordeno_gateway.Errors.md#missing_read_message_history)
- [MISSING_SEND_MESSAGES](discordeno_gateway.Errors.md#missing_send_messages)
- [MISSING_SEND_TTS_MESSAGES](discordeno_gateway.Errors.md#missing_send_tts_messages)
- [MISSING_SPEAK](discordeno_gateway.Errors.md#missing_speak)
- [MISSING_STREAM](discordeno_gateway.Errors.md#missing_stream)
- [MISSING_USE_EXTERNAL_EMOJIS](discordeno_gateway.Errors.md#missing_use_external_emojis)
- [MISSING_USE_VAD](discordeno_gateway.Errors.md#missing_use_vad)
- [MISSING_VIEW_AUDIT_LOG](discordeno_gateway.Errors.md#missing_view_audit_log)
- [MISSING_VIEW_CHANNEL](discordeno_gateway.Errors.md#missing_view_channel)
- [MISSING_VIEW_GUILD_INSIGHTS](discordeno_gateway.Errors.md#missing_view_guild_insights)
- [NICKNAMES_MAX_LENGTH](discordeno_gateway.Errors.md#nicknames_max_length)
- [NONCE_TOO_LONG](discordeno_gateway.Errors.md#nonce_too_long)
- [NOT_A_THREAD_CHANNEL](discordeno_gateway.Errors.md#not_a_thread_channel)
- [ONLY_STRING_OR_INTEGER_OPTIONS_CAN_HAVE_CHOICES](discordeno_gateway.Errors.md#only_string_or_integer_options_can_have_choices)
- [PRUNE_MAX_DAYS](discordeno_gateway.Errors.md#prune_max_days)
- [PRUNE_MIN_DAYS](discordeno_gateway.Errors.md#prune_min_days)
- [RATE_LIMIT_RETRY_MAXED](discordeno_gateway.Errors.md#rate_limit_retry_maxed)
- [REQUEST_CLIENT_ERROR](discordeno_gateway.Errors.md#request_client_error)
- [REQUEST_SERVER_ERROR](discordeno_gateway.Errors.md#request_server_error)
- [REQUEST_UNKNOWN_ERROR](discordeno_gateway.Errors.md#request_unknown_error)
- [ROLE_NOT_FOUND](discordeno_gateway.Errors.md#role_not_found)
- [RULES_CHANNEL_CANNOT_BE_DELETED](discordeno_gateway.Errors.md#rules_channel_cannot_be_deleted)
- [SELECT_OPTION_LABEL_TOO_BIG](discordeno_gateway.Errors.md#select_option_label_too_big)
- [SELECT_OPTION_TOO_MANY_DEFAULTS](discordeno_gateway.Errors.md#select_option_too_many_defaults)
- [SELECT_OPTION_VALUE_TOO_BIG](discordeno_gateway.Errors.md#select_option_value_too_big)
- [TOO_MANY_ACTION_ROWS](discordeno_gateway.Errors.md#too_many_action_rows)
- [TOO_MANY_COMPONENTS](discordeno_gateway.Errors.md#too_many_components)
- [TOO_MANY_SLASH_OPTIONS](discordeno_gateway.Errors.md#too_many_slash_options)
- [TOO_MANY_SLASH_OPTION_CHOICES](discordeno_gateway.Errors.md#too_many_slash_option_choices)
- [UPDATES_CHANNEL_CANNOT_BE_DELETED](discordeno_gateway.Errors.md#updates_channel_cannot_be_deleted)
- [USERNAME_INVALID_CHARACTER](discordeno_gateway.Errors.md#username_invalid_character)
- [USERNAME_INVALID_USERNAME](discordeno_gateway.Errors.md#username_invalid_username)
- [USERNAME_MAX_LENGTH](discordeno_gateway.Errors.md#username_max_length)
- [USERNAME_MIN_LENGTH](discordeno_gateway.Errors.md#username_min_length)
- [YOU_CAN_NOT_DM_THE_BOT_ITSELF](discordeno_gateway.Errors.md#you_can_not_dm_the_bot_itself)

## Enumeration Members

### BOTS_HIGHEST_ROLE_TOO_LOW

• **BOTS_HIGHEST_ROLE_TOO_LOW** = `"BOTS_HIGHEST_ROLE_TOO_LOW"`

#### Defined in

packages/types/dist/shared.d.ts:1137

---

### BUTTON_REQUIRES_CUSTOM_ID

• **BUTTON_REQUIRES_CUSTOM_ID** = `"BUTTON_REQUIRES_CUSTOM_ID"`

#### Defined in

packages/types/dist/shared.d.ts:1228

---

### CANNOT_ADD_USER_TO_ARCHIVED_THREADS

• **CANNOT_ADD_USER_TO_ARCHIVED_THREADS** = `"CANNOT_ADD_USER_TO_ARCHIVED_THREADS"`

#### Defined in

packages/types/dist/shared.d.ts:1241

---

### CANNOT_GET_MEMBERS_OF_AN_UNJOINED_PRIVATE_THREAD

• **CANNOT_GET_MEMBERS_OF_AN_UNJOINED_PRIVATE_THREAD** = `"CANNOT_GET_MEMBERS_OF_AN_UNJOINED_PRIVATE_THREAD"`

#### Defined in

packages/types/dist/shared.d.ts:1159

---

### CANNOT_LEAVE_ARCHIVED_THREAD

• **CANNOT_LEAVE_ARCHIVED_THREAD** = `"CANNOT_LEAVE_ARCHIVED_THREAD"`

#### Defined in

packages/types/dist/shared.d.ts:1242

---

### CANNOT_REMOVE_FROM_ARCHIVED_THREAD

• **CANNOT_REMOVE_FROM_ARCHIVED_THREAD** = `"CANNOT_REMOVE_FROM_ARCHIVED_THREAD"`

#### Defined in

packages/types/dist/shared.d.ts:1243

---

### CHANNEL_NOT_FOUND

• **CHANNEL_NOT_FOUND** = `"CHANNEL_NOT_FOUND"`

#### Defined in

packages/types/dist/shared.d.ts:1138

---

### CHANNEL_NOT_IN_GUILD

• **CHANNEL_NOT_IN_GUILD** = `"CHANNEL_NOT_IN_GUILD"`

#### Defined in

packages/types/dist/shared.d.ts:1139

---

### CHANNEL_NOT_STAGE_VOICE

• **CHANNEL_NOT_STAGE_VOICE** = `"CHANNEL_NOT_STAGE_VOICE"`

#### Defined in

packages/types/dist/shared.d.ts:1141

---

### CHANNEL_NOT_TEXT_BASED

• **CHANNEL_NOT_TEXT_BASED** = `"CHANNEL_NOT_TEXT_BASED"`

#### Defined in

packages/types/dist/shared.d.ts:1140

---

### COMPONENT_CUSTOM_ID_TOO_BIG

• **COMPONENT_CUSTOM_ID_TOO_BIG** = `"COMPONENT_CUSTOM_ID_TOO_BIG"`

#### Defined in

packages/types/dist/shared.d.ts:1227

---

### COMPONENT_LABEL_TOO_BIG

• **COMPONENT_LABEL_TOO_BIG** = `"COMPONENT_LABEL_TOO_BIG"`

#### Defined in

packages/types/dist/shared.d.ts:1226

---

### COMPONENT_PLACEHOLDER_TOO_BIG

• **COMPONENT_PLACEHOLDER_TOO_BIG** = `"COMPONENT_PLACEHOLDER_TOO_BIG"`

#### Defined in

packages/types/dist/shared.d.ts:1230

---

### COMPONENT_SELECT_MAX_VALUE_TOO_LOW

• **COMPONENT_SELECT_MAX_VALUE_TOO_LOW** = `"COMPONENT_SELECT_MAX_VALUE_TOO_LOW"`

#### Defined in

packages/types/dist/shared.d.ts:1233

---

### COMPONENT_SELECT_MAX_VALUE_TOO_MANY

• **COMPONENT_SELECT_MAX_VALUE_TOO_MANY** = `"COMPONENT_SELECT_MAX_VALUE_TOO_MANY"`

#### Defined in

packages/types/dist/shared.d.ts:1234

---

### COMPONENT_SELECT_MIN_HIGHER_THAN_MAX

• **COMPONENT_SELECT_MIN_HIGHER_THAN_MAX** = `"COMPONENT_SELECT_MIN_HIGHER_THAN_MAX"`

#### Defined in

packages/types/dist/shared.d.ts:1240

---

### COMPONENT_SELECT_MIN_VALUE_TOO_LOW

• **COMPONENT_SELECT_MIN_VALUE_TOO_LOW** = `"COMPONENT_SELECT_MIN_VALUE_TOO_LOW"`

#### Defined in

packages/types/dist/shared.d.ts:1231

---

### COMPONENT_SELECT_MIN_VALUE_TOO_MANY

• **COMPONENT_SELECT_MIN_VALUE_TOO_MANY** = `"COMPONENT_SELECT_MIN_VALUE_TOO_MANY"`

#### Defined in

packages/types/dist/shared.d.ts:1232

---

### COMPONENT_SELECT_MUST_BE_ALONE

• **COMPONENT_SELECT_MUST_BE_ALONE** = `"COMPONENT_SELECT_MUST_BE_ALONE"`

#### Defined in

packages/types/dist/shared.d.ts:1229

---

### COMPONENT_SELECT_OPTIONS_TOO_LOW

• **COMPONENT_SELECT_OPTIONS_TOO_LOW** = `"COMPONENT_SELECT_OPTIONS_TOO_LOW"`

#### Defined in

packages/types/dist/shared.d.ts:1235

---

### COMPONENT_SELECT_OPTIONS_TOO_MANY

• **COMPONENT_SELECT_OPTIONS_TOO_MANY** = `"COMPONENT_SELECT_OPTIONS_TOO_MANY"`

#### Defined in

packages/types/dist/shared.d.ts:1236

---

### DELETE_MESSAGES_MIN

• **DELETE_MESSAGES_MIN** = `"DELETE_MESSAGES_MIN"`

#### Defined in

packages/types/dist/shared.d.ts:1162

---

### GUILD_NEWS_CHANNEL_ONLY_SUPPORT_PUBLIC_THREADS

• **GUILD_NEWS_CHANNEL_ONLY_SUPPORT_PUBLIC_THREADS** = `"GUILD_NEWS_CHANNEL_ONLY_SUPPORT_PUBLIC_THREADS"`

#### Defined in

packages/types/dist/shared.d.ts:1156

---

### GUILD_NOT_DISCOVERABLE

• **GUILD_NOT_DISCOVERABLE** = `"GUILD_NOT_DISCOVERABLE"`

#### Defined in

packages/types/dist/shared.d.ts:1146

---

### GUILD_NOT_FOUND

• **GUILD_NOT_FOUND** = `"GUILD_NOT_FOUND"`

#### Defined in

packages/types/dist/shared.d.ts:1148

---

### GUILD_WIDGET_NOT_ENABLED

• **GUILD_WIDGET_NOT_ENABLED** = `"GUILD_WIDGET_NOT_ENABLED"`

#### Defined in

packages/types/dist/shared.d.ts:1147

---

### HAVE_TO_BE_THE_CREATOR_OF_THE_THREAD_OR_HAVE_MANAGE_THREADS_TO_REMOVE_MEMBERS

• **HAVE_TO_BE_THE_CREATOR_OF_THE_THREAD_OR_HAVE_MANAGE_THREADS_TO_REMOVE_MEMBERS** = `"HAVE_TO_BE_THE_CREATOR_OF_THE_THREAD_OR_HAVE_MANAGE_THREADS_TO_REMOVE_MEMBERS"`

#### Defined in

packages/types/dist/shared.d.ts:1160

---

### INVALID_CONTEXT_MENU_COMMAND_DESCRIPTION

• **INVALID_CONTEXT_MENU_COMMAND_DESCRIPTION** = `"INVALID_CONTEXT_MENU_COMMAND_DESCRIPTION"`

#### Defined in

packages/types/dist/shared.d.ts:1176

---

### INVALID_CONTEXT_MENU_COMMAND_NAME

• **INVALID_CONTEXT_MENU_COMMAND_NAME** = `"INVALID_CONTEXT_MENU_COMMAND_NAME"`

#### Defined in

packages/types/dist/shared.d.ts:1175

---

### INVALID_GET_MESSAGES_LIMIT

• **INVALID_GET_MESSAGES_LIMIT** = `"INVALID_GET_MESSAGES_LIMIT"`

#### Defined in

packages/types/dist/shared.d.ts:1161

---

### INVALID_SLASH_DESCRIPTION

• **INVALID_SLASH_DESCRIPTION** = `"INVALID_SLASH_DESCRIPTION"`

#### Defined in

packages/types/dist/shared.d.ts:1164

---

### INVALID_SLASH_NAME

• **INVALID_SLASH_NAME** = `"INVALID_SLASH_NAME"`

#### Defined in

packages/types/dist/shared.d.ts:1165

---

### INVALID_SLASH_OPTIONS

• **INVALID_SLASH_OPTIONS** = `"INVALID_SLASH_OPTIONS"`

#### Defined in

packages/types/dist/shared.d.ts:1166

---

### INVALID_SLASH_OPTIONS_CHOICES

• **INVALID_SLASH_OPTIONS_CHOICES** = `"INVALID_SLASH_OPTIONS_CHOICES"`

#### Defined in

packages/types/dist/shared.d.ts:1167

---

### INVALID_SLASH_OPTIONS_CHOICE_VALUE_TYPE

• **INVALID_SLASH_OPTIONS_CHOICE_VALUE_TYPE** = `"INVALID_SLASH_OPTIONS_CHOICE_VALUE_TYPE"`

#### Defined in

packages/types/dist/shared.d.ts:1170

---

### INVALID_SLASH_OPTION_CHOICE_NAME

• **INVALID_SLASH_OPTION_CHOICE_NAME** = `"INVALID_SLASH_OPTION_CHOICE_NAME"`

#### Defined in

packages/types/dist/shared.d.ts:1169

---

### INVALID_SLASH_OPTION_DESCRIPTION

• **INVALID_SLASH_OPTION_DESCRIPTION** = `"INVALID_SLASH_OPTION_DESCRIPTION"`

#### Defined in

packages/types/dist/shared.d.ts:1174

---

### INVALID_SLASH_OPTION_NAME

• **INVALID_SLASH_OPTION_NAME** = `"INVALID_SLASH_OPTION_NAME"`

#### Defined in

packages/types/dist/shared.d.ts:1173

---

### INVALID_THREAD_PARENT_CHANNEL_TYPE

• **INVALID_THREAD_PARENT_CHANNEL_TYPE** = `"INVALID_THREAD_PARENT_CHANNEL_TYPE"`

#### Defined in

packages/types/dist/shared.d.ts:1155

---

### INVALID_TOPIC_LENGTH

• **INVALID_TOPIC_LENGTH** = `"INVALID_TOPIC_LENGTH"`

#### Defined in

packages/types/dist/shared.d.ts:1145

---

### INVALID_WEBHOOK_NAME

• **INVALID_WEBHOOK_NAME** = `"INVALID_WEBHOOK_NAME"`

#### Defined in

packages/types/dist/shared.d.ts:1177

---

### INVALID_WEBHOOK_OPTIONS

• **INVALID_WEBHOOK_OPTIONS** = `"INVALID_WEBHOOK_OPTIONS"`

#### Defined in

packages/types/dist/shared.d.ts:1178

---

### INVITE_MAX_AGE_INVALID

• **INVITE_MAX_AGE_INVALID** = `"INVITE_MAX_AGE_INVALID"`

#### Defined in

packages/types/dist/shared.d.ts:1217

---

### INVITE_MAX_USES_INVALID

• **INVITE_MAX_USES_INVALID** = `"INVITE_MAX_USES_INVALID"`

#### Defined in

packages/types/dist/shared.d.ts:1218

---

### LINK_BUTTON_CANNOT_HAVE_CUSTOM_ID

• **LINK_BUTTON_CANNOT_HAVE_CUSTOM_ID** = `"LINK_BUTTON_CANNOT_HAVE_CUSTOM_ID"`

#### Defined in

packages/types/dist/shared.d.ts:1225

---

### MEMBER_NOT_FOUND

• **MEMBER_NOT_FOUND** = `"MEMBER_NOT_FOUND"`

#### Defined in

packages/types/dist/shared.d.ts:1149

---

### MEMBER_NOT_IN_VOICE_CHANNEL

• **MEMBER_NOT_IN_VOICE_CHANNEL** = `"MEMBER_NOT_IN_VOICE_CHANNEL"`

#### Defined in

packages/types/dist/shared.d.ts:1150

---

### MEMBER_SEARCH_LIMIT_TOO_HIGH

• **MEMBER_SEARCH_LIMIT_TOO_HIGH** = `"MEMBER_SEARCH_LIMIT_TOO_HIGH"`

#### Defined in

packages/types/dist/shared.d.ts:1151

---

### MEMBER_SEARCH_LIMIT_TOO_LOW

• **MEMBER_SEARCH_LIMIT_TOO_LOW** = `"MEMBER_SEARCH_LIMIT_TOO_LOW"`

#### Defined in

packages/types/dist/shared.d.ts:1152

---

### MESSAGE_MAX_LENGTH

• **MESSAGE_MAX_LENGTH** = `"MESSAGE_MAX_LENGTH"`

#### Defined in

packages/types/dist/shared.d.ts:1142

---

### MISSING_ADD_REACTIONS

• **MISSING_ADD_REACTIONS** = `"MISSING_ADD_REACTIONS"`

#### Defined in

packages/types/dist/shared.d.ts:1179

---

### MISSING_ADMINISTRATOR

• **MISSING_ADMINISTRATOR** = `"MISSING_ADMINISTRATOR"`

#### Defined in

packages/types/dist/shared.d.ts:1180

---

### MISSING_ATTACH_FILES

• **MISSING_ATTACH_FILES** = `"MISSING_ATTACH_FILES"`

#### Defined in

packages/types/dist/shared.d.ts:1181

---

### MISSING_BAN_MEMBERS

• **MISSING_BAN_MEMBERS** = `"MISSING_BAN_MEMBERS"`

#### Defined in

packages/types/dist/shared.d.ts:1182

---

### MISSING_CHANGE_NICKNAME

• **MISSING_CHANGE_NICKNAME** = `"MISSING_CHANGE_NICKNAME"`

#### Defined in

packages/types/dist/shared.d.ts:1183

---

### MISSING_CONNECT

• **MISSING_CONNECT** = `"MISSING_CONNECT"`

#### Defined in

packages/types/dist/shared.d.ts:1184

---

### MISSING_CREATE_INSTANT_INVITE

• **MISSING_CREATE_INSTANT_INVITE** = `"MISSING_CREATE_INSTANT_INVITE"`

#### Defined in

packages/types/dist/shared.d.ts:1185

---

### MISSING_DEAFEN_MEMBERS

• **MISSING_DEAFEN_MEMBERS** = `"MISSING_DEAFEN_MEMBERS"`

#### Defined in

packages/types/dist/shared.d.ts:1186

---

### MISSING_EMBED_LINKS

• **MISSING_EMBED_LINKS** = `"MISSING_EMBED_LINKS"`

#### Defined in

packages/types/dist/shared.d.ts:1187

---

### MISSING_INTENT_GUILD_MEMBERS

• **MISSING_INTENT_GUILD_MEMBERS** = `"MISSING_INTENT_GUILD_MEMBERS"`

#### Defined in

packages/types/dist/shared.d.ts:1188

---

### MISSING_KICK_MEMBERS

• **MISSING_KICK_MEMBERS** = `"MISSING_KICK_MEMBERS"`

#### Defined in

packages/types/dist/shared.d.ts:1189

---

### MISSING_MANAGE_CHANNELS

• **MISSING_MANAGE_CHANNELS** = `"MISSING_MANAGE_CHANNELS"`

#### Defined in

packages/types/dist/shared.d.ts:1190

---

### MISSING_MANAGE_EMOJIS

• **MISSING_MANAGE_EMOJIS** = `"MISSING_MANAGE_EMOJIS"`

#### Defined in

packages/types/dist/shared.d.ts:1191

---

### MISSING_MANAGE_GUILD

• **MISSING_MANAGE_GUILD** = `"MISSING_MANAGE_GUILD"`

#### Defined in

packages/types/dist/shared.d.ts:1192

---

### MISSING_MANAGE_MESSAGES

• **MISSING_MANAGE_MESSAGES** = `"MISSING_MANAGE_MESSAGES"`

#### Defined in

packages/types/dist/shared.d.ts:1193

---

### MISSING_MANAGE_NICKNAMES

• **MISSING_MANAGE_NICKNAMES** = `"MISSING_MANAGE_NICKNAMES"`

#### Defined in

packages/types/dist/shared.d.ts:1194

---

### MISSING_MANAGE_ROLES

• **MISSING_MANAGE_ROLES** = `"MISSING_MANAGE_ROLES"`

#### Defined in

packages/types/dist/shared.d.ts:1195

---

### MISSING_MANAGE_THREADS_AND_NOT_MEMBER

• **MISSING_MANAGE_THREADS_AND_NOT_MEMBER** = `"MISSING_MANAGE_THREADS_AND_NOT_MEMBER"`

#### Defined in

packages/types/dist/shared.d.ts:1158

---

### MISSING_MANAGE_WEBHOOKS

• **MISSING_MANAGE_WEBHOOKS** = `"MISSING_MANAGE_WEBHOOKS"`

#### Defined in

packages/types/dist/shared.d.ts:1196

---

### MISSING_MENTION_EVERYONE

• **MISSING_MENTION_EVERYONE** = `"MISSING_MENTION_EVERYONE"`

#### Defined in

packages/types/dist/shared.d.ts:1197

---

### MISSING_MOVE_MEMBERS

• **MISSING_MOVE_MEMBERS** = `"MISSING_MOVE_MEMBERS"`

#### Defined in

packages/types/dist/shared.d.ts:1198

---

### MISSING_MUTE_MEMBERS

• **MISSING_MUTE_MEMBERS** = `"MISSING_MUTE_MEMBERS"`

#### Defined in

packages/types/dist/shared.d.ts:1199

---

### MISSING_PRIORITY_SPEAKER

• **MISSING_PRIORITY_SPEAKER** = `"MISSING_PRIORITY_SPEAKER"`

#### Defined in

packages/types/dist/shared.d.ts:1200

---

### MISSING_READ_MESSAGE_HISTORY

• **MISSING_READ_MESSAGE_HISTORY** = `"MISSING_READ_MESSAGE_HISTORY"`

#### Defined in

packages/types/dist/shared.d.ts:1201

---

### MISSING_SEND_MESSAGES

• **MISSING_SEND_MESSAGES** = `"MISSING_SEND_MESSAGES"`

#### Defined in

packages/types/dist/shared.d.ts:1202

---

### MISSING_SEND_TTS_MESSAGES

• **MISSING_SEND_TTS_MESSAGES** = `"MISSING_SEND_TTS_MESSAGES"`

#### Defined in

packages/types/dist/shared.d.ts:1203

---

### MISSING_SPEAK

• **MISSING_SPEAK** = `"MISSING_SPEAK"`

#### Defined in

packages/types/dist/shared.d.ts:1204

---

### MISSING_STREAM

• **MISSING_STREAM** = `"MISSING_STREAM"`

#### Defined in

packages/types/dist/shared.d.ts:1205

---

### MISSING_USE_EXTERNAL_EMOJIS

• **MISSING_USE_EXTERNAL_EMOJIS** = `"MISSING_USE_EXTERNAL_EMOJIS"`

#### Defined in

packages/types/dist/shared.d.ts:1207

---

### MISSING_USE_VAD

• **MISSING_USE_VAD** = `"MISSING_USE_VAD"`

#### Defined in

packages/types/dist/shared.d.ts:1206

---

### MISSING_VIEW_AUDIT_LOG

• **MISSING_VIEW_AUDIT_LOG** = `"MISSING_VIEW_AUDIT_LOG"`

#### Defined in

packages/types/dist/shared.d.ts:1208

---

### MISSING_VIEW_CHANNEL

• **MISSING_VIEW_CHANNEL** = `"MISSING_VIEW_CHANNEL"`

#### Defined in

packages/types/dist/shared.d.ts:1209

---

### MISSING_VIEW_GUILD_INSIGHTS

• **MISSING_VIEW_GUILD_INSIGHTS** = `"MISSING_VIEW_GUILD_INSIGHTS"`

#### Defined in

packages/types/dist/shared.d.ts:1210

---

### NICKNAMES_MAX_LENGTH

• **NICKNAMES_MAX_LENGTH** = `"NICKNAMES_MAX_LENGTH"`

#### Defined in

packages/types/dist/shared.d.ts:1211

---

### NONCE_TOO_LONG

• **NONCE_TOO_LONG** = `"NONCE_TOO_LONG"`

#### Defined in

packages/types/dist/shared.d.ts:1216

---

### NOT_A_THREAD_CHANNEL

• **NOT_A_THREAD_CHANNEL** = `"NOT_A_THREAD_CHANNEL"`

#### Defined in

packages/types/dist/shared.d.ts:1157

---

### ONLY_STRING_OR_INTEGER_OPTIONS_CAN_HAVE_CHOICES

• **ONLY_STRING_OR_INTEGER_OPTIONS_CAN_HAVE_CHOICES** = `"ONLY_STRING_OR_INTEGER_OPTIONS_CAN_HAVE_CHOICES"`

#### Defined in

packages/types/dist/shared.d.ts:1172

---

### PRUNE_MAX_DAYS

• **PRUNE_MAX_DAYS** = `"PRUNE_MAX_DAYS"`

#### Defined in

packages/types/dist/shared.d.ts:1153

---

### PRUNE_MIN_DAYS

• **PRUNE_MIN_DAYS** = `"PRUNE_MIN_DAYS"`

#### Defined in

packages/types/dist/shared.d.ts:1163

---

### RATE_LIMIT_RETRY_MAXED

• **RATE_LIMIT_RETRY_MAXED** = `"RATE_LIMIT_RETRY_MAXED"`

#### Defined in

packages/types/dist/shared.d.ts:1219

---

### REQUEST_CLIENT_ERROR

• **REQUEST_CLIENT_ERROR** = `"REQUEST_CLIENT_ERROR"`

#### Defined in

packages/types/dist/shared.d.ts:1220

---

### REQUEST_SERVER_ERROR

• **REQUEST_SERVER_ERROR** = `"REQUEST_SERVER_ERROR"`

#### Defined in

packages/types/dist/shared.d.ts:1221

---

### REQUEST_UNKNOWN_ERROR

• **REQUEST_UNKNOWN_ERROR** = `"REQUEST_UNKNOWN_ERROR"`

#### Defined in

packages/types/dist/shared.d.ts:1222

---

### ROLE_NOT_FOUND

• **ROLE_NOT_FOUND** = `"ROLE_NOT_FOUND"`

#### Defined in

packages/types/dist/shared.d.ts:1154

---

### RULES_CHANNEL_CANNOT_BE_DELETED

• **RULES_CHANNEL_CANNOT_BE_DELETED** = `"RULES_CHANNEL_CANNOT_BE_DELETED"`

#### Defined in

packages/types/dist/shared.d.ts:1143

---

### SELECT_OPTION_LABEL_TOO_BIG

• **SELECT_OPTION_LABEL_TOO_BIG** = `"SELECT_OPTION_LABEL_TOO_BIG"`

#### Defined in

packages/types/dist/shared.d.ts:1237

---

### SELECT_OPTION_TOO_MANY_DEFAULTS

• **SELECT_OPTION_TOO_MANY_DEFAULTS** = `"SELECT_OPTION_TOO_MANY_DEFAULTS"`

#### Defined in

packages/types/dist/shared.d.ts:1239

---

### SELECT_OPTION_VALUE_TOO_BIG

• **SELECT_OPTION_VALUE_TOO_BIG** = `"SELECT_OPTION_VALUE_TOO_BIG"`

#### Defined in

packages/types/dist/shared.d.ts:1238

---

### TOO_MANY_ACTION_ROWS

• **TOO_MANY_ACTION_ROWS** = `"TOO_MANY_ACTION_ROWS"`

#### Defined in

packages/types/dist/shared.d.ts:1224

---

### TOO_MANY_COMPONENTS

• **TOO_MANY_COMPONENTS** = `"TOO_MANY_COMPONENTS"`

#### Defined in

packages/types/dist/shared.d.ts:1223

---

### TOO_MANY_SLASH_OPTIONS

• **TOO_MANY_SLASH_OPTIONS** = `"TOO_MANY_SLASH_OPTIONS"`

#### Defined in

packages/types/dist/shared.d.ts:1168

---

### TOO_MANY_SLASH_OPTION_CHOICES

• **TOO_MANY_SLASH_OPTION_CHOICES** = `"TOO_MANY_SLASH_OPTION_CHOICES"`

#### Defined in

packages/types/dist/shared.d.ts:1171

---

### UPDATES_CHANNEL_CANNOT_BE_DELETED

• **UPDATES_CHANNEL_CANNOT_BE_DELETED** = `"UPDATES_CHANNEL_CANNOT_BE_DELETED"`

#### Defined in

packages/types/dist/shared.d.ts:1144

---

### USERNAME_INVALID_CHARACTER

• **USERNAME_INVALID_CHARACTER** = `"USERNAME_INVALID_CHARACTER"`

#### Defined in

packages/types/dist/shared.d.ts:1212

---

### USERNAME_INVALID_USERNAME

• **USERNAME_INVALID_USERNAME** = `"USERNAME_INVALID_USERNAME"`

#### Defined in

packages/types/dist/shared.d.ts:1213

---

### USERNAME_MAX_LENGTH

• **USERNAME_MAX_LENGTH** = `"USERNAME_MAX_LENGTH"`

#### Defined in

packages/types/dist/shared.d.ts:1214

---

### USERNAME_MIN_LENGTH

• **USERNAME_MIN_LENGTH** = `"USERNAME_MIN_LENGTH"`

#### Defined in

packages/types/dist/shared.d.ts:1215

---

### YOU_CAN_NOT_DM_THE_BOT_ITSELF

• **YOU_CAN_NOT_DM_THE_BOT_ITSELF** = `"YOU_CAN_NOT_DM_THE_BOT_ITSELF"`

#### Defined in

packages/types/dist/shared.d.ts:1244
