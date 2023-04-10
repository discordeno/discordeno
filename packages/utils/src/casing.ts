import type { Camelize, Snakelize } from '@discordeno/types'

const CAMELIZE_CACHE: Record<string, string> = {
  stage_instances: 'stageInstances',
  owner_id: 'ownerId',
  discovery_splash: 'discoverySplash',
  voice_states: 'voiceStates',
  max_members: 'maxMembers',
  nsfw_level: 'nsfwLevel',
  afk_channel_id: 'afkChannelId',
  public_flags: 'publicFlags',
  joined_at: 'joinedAt',
  hoisted_role: 'hoistedRole',
  premium_tier: 'premiumTier',
  bot_id: 'botId',
  explicit_content_filter: 'explicitContentFilter',
  guild_hashes: 'guildHashes',
  rules_channel_id: 'rulesChannelId',
  embedded_activities: 'embeddedActivities',
  public_updates_channel_id: 'publicUpdatesChannelId',
  max_video_channel_users: 'maxVideoChannelUsers',
  default_message_notifications: 'defaultMessageNotifications',
  application_id: 'applicationId',
  premium_progress_bar_enabled: 'premiumProgressBarEnabled',
  verification_level: 'verificationLevel',
  application_command_counts: 'applicationCommandCounts',
  vanity_url_code: 'vanityUrlCode',
  member_count: 'memberCount',
  mfa_level: 'mfaLevel',
  preferred_locale: 'preferredLocale',
  system_channel_id: 'systemChannelId',
  guild_scheduled_events: 'guildScheduledEvents',
  rate_limit_per_user: 'rateLimitPerUser',
  last_message_id: 'lastMessageId',
  permission_overwrites: 'permissionOverwrites',
  user_limit: 'userLimit',
  rtc_region: 'rtcRegion',
  afk_timeout: 'afkTimeout',
  system_channel_flags: 'systemChannelFlags',
  premium_subscription_count: 'premiumSubscriptionCount',
  application_command_count: 'applicationCommandCount',
}

export function camelize<T>(object: T): Camelize<T> {
  return JSON.parse(snakeToCamelCase(JSON.stringify(object))) as Camelize<T>
  //   if (Array.isArray(object)) {
  //     return object.map((element) => camelize(element)) as Camelize<T>
  //   }

  //   if (typeof object === 'object' && object !== null) {
  //     const obj = {} as Camelize<T>
  //     ;(Object.keys(object) as Array<keyof T>).forEach((key) => {
  //       // @ts-expect-error js hack
  //       ;(obj[snakeToCamelCase(key)] as Camelize<(T & object)[keyof T]>) = camelize(object[key])
  //     })
  //     return obj
  //   }
  //   return object as Camelize<T>
}

export function snakelize<T>(object: T): Snakelize<T> {
  if (Array.isArray(object)) {
    return object.map((element) => snakelize(element)) as Snakelize<T>
  }

  if (typeof object === 'object' && object !== null) {
    const obj = {} as Snakelize<T>
    ;(Object.keys(object) as Array<keyof T>).forEach((key) => {
      // @ts-expect-error js hack
      ;(obj[camelToSnakeCase(key)] as Snakelize<(T & object)[keyof T]>) = snakelize(object[key])
    })
    return obj
  }
  return object as Snakelize<T>
}

export function snakeToCamelCase(str: string): string {
  if (CAMELIZE_CACHE[str]) return CAMELIZE_CACHE[str]
  if (!str.includes('_')) return str

  let result = ''
  for (let i = 0, len = str.length; i < len; ++i) {
    if (str[i] === '_') {
      result += str[++i].toUpperCase()

      continue
    }

    result += str[i]
  }

  return result
}

export function camelToSnakeCase(str: string): string {
  let result = ''
  for (let i = 0, len = str.length; i < len; ++i) {
    if (str[i] >= 'A' && str[i] <= 'Z') {
      result += `_${str[i].toLowerCase()}`

      continue
    }

    result += str[i]
  }

  return result
}
