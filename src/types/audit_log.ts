/** https://discord.com/developers/docs/resources/audit-log#audit-log-object-audit-log-structure */
export interface AuditLogPayload {
    /** list of webhooks found in the audit log */
    webhooks: WebhookPayload[];
    /** list of users found in the audit log */
    users: UserPayload[];
    /** list of audit log entries */
    audit_log_entries: AuditLogEntryPayload[];
    /** list of partial integration objects */
    integrations: PartialIntegrationPayload[];
}

/** https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-entry-structure */
export interface AuditLogEntryPayload {
    /** id of the affected entity (webhook, user, role, etc.) */
    target_id: string | null;
    /** changes made to the target_id */
    changes?: AuditLogChangePayload[];
    /** the user who made the changes */
    user_id: string;
    /** id of the entry */
    id: string;
    /** type of action that occurred */
    action_type: AuditLogEvents;
    /** additional info for certain action types */
    options?: OptionalAuditEntryInfo;
    /** the reason for the change (0-512 characters) */
    reason?: string;
}

/** https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-events */
export enum AuditLogEvents {
    GUILD_UPDATE = 1,

    CHANNEL_CREATE = 10,
    CHANNEL_UPDATE,
    CHANNEL_DELETE,
    CHANNEL_OVERWRITE_CREATE,
    CHANNEL_OVERWRITE_UPDATE,
    CHANNEL_OVERWRITE_DELETE,

    MEMBER_KICK = 20,
    MEMBER_PRUNE,
    MEMBER_BAN_ADD,
    MEMBER_BAN_REMOVE,
    MEMBER_UPDATE,
    MEMBER_ROLE_UPDATE,
    MEMBER_MOVE,
    MEMBER_DISCONNECT,
    BOT_ADD,

    ROLE_CREATE = 30,
    ROLE_UPDATE,
    ROLE_DELETE,

    INVITE_CREATE = 40,
    INVITE_UPDATE,
    INVITE_DELETE,

    WEBHOOK_CREATE = 50,
    WEBHOOK_UPDATE,
    WEBHOOK_DELETE,

    EMOJI_CREATE = 60,
    EMOJI_UPDATE,
    EMOJI_DELETE,

    MESSAGE_DELETE = 72,
    MESSAGE_BULK_DELETE,
    MESSAGE_PIN,
    MESSAGE_UNPIN,

    INTEGRATION_CREATE = 80,
    INTEGRATION_UPDATE,
    INTEGRATION_DELETE,
}

/** https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-optional-audit-entry-info */
export interface OptionalAuditEntryInfo {
    /** number of days after which inactive members were kicked */
    delete_member_days: string;
    /** number of members removed by the prune */
    members_removed: string;
    /** channel in which the entities were targeted */
    channel_id: string;
    /** id of the message that was targeted */
    message_id: string;
    /** number of entities that were targeted */
    count: string;
    /** id of the overwritten entity */
    id: string;
    /** type of overwritten entity - "0" for "role" or "1" for "member" */
    type: string;
    /** name of the role if type is "0" (not present if type is "1") */
    role_name: string;
}

/** https://discord.com/developers/docs/resources/audit-log#audit-log-change-object-audit-log-change-structure */
export interface AuditLogChangePayload {
    /** new value of the key */
    new_value?: AuditLogChangeKey;
    /** old value of the key */
    old_value?: AuditLogChangeKey;
    /** name of audit log change key */
    key: string;
}

/** https://discord.com/developers/docs/resources/audit-log#audit-log-change-object-audit-log-change-key */
export interface AuditLogChangeKey {
    /** name changed */
    name: string;
    /** icon changed */
    icon_hash: string;
    /** invite splash page artwork changed */
    splash_hash: string;
    /** owner changed */
    owner_id: string;
    /** region changed */
    region: string;
    /** afk channel changed */
    afk_channel_id: string;
    /** afk timeout duration changed */
    afk_timeout: number;
    /** two-factor auth requirement changed */
    mfa_level: number;
    /** required verification level changed */
    verification_level: number;
    /** change in whose messages are scanned and deleted for explicit content in the server */
    explicit_content_filter: number;
    /** default message notification level changed */
    default_message_notifications: number;
    /** guild invite vanity url changed */
    vanity_url_code: string;
    /** new role added */
    $add: PartialRolePayload[];
    /** role removed */
    $remove: PartialRolePayload[];
    /** change in number of days after which inactive and role-unassigned members are kicked */
    prune_delete_days: number;
    /** server widget enabled/disable */
    widget_enabled: boolean;
    /** channel id of the server widget changed */
    widget_channel_id: string;
    /** id of the system channel changed */
    system_channel_id: string;
    /** text or voice channel position changed */
    position: number;
    /** text channel topic changed */
    topic: string;
    /** voice channel bitrate changed */
    bitrate: number;
    /** permissions on a channel changed */
    permission_overwrites: OverwritePayload[];
    /** channel nsfw restriction changed */
    nsfw: boolean;
    /** application id of the added or removed webhook or bot */
    application_id: string;
    /** amount of seconds a user has to wait before sending another message changed */
    rate_limit_per_user: number;
    /** permissions for a role changed */
    permissions: string;
    /** role color changed */
    color: number;
    /** role is now displayed/no longer displayed separate from online users */
    hoist: boolean;
    /** role is now mentionable/unmentionable */
    mentionable: boolean;

    // TODO: more types
}