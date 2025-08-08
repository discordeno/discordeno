import type {
  Activity,
  ActivityInstance,
  ActivityLocation,
  Bot,
  DesiredPropertiesBehavior,
  DiscordActivity,
  DiscordActivityInstance,
  DiscordActivityLocation,
  SetupDesiredProps,
  TransformersDesiredProperties,
} from '../index.js'

export function transformActivity(bot: Bot, payload: DiscordActivity): Activity {
  const activity = {
    name: payload.name,
    type: payload.type,
    url: payload.url ?? undefined,
    createdAt: payload.created_at,
    startedAt: payload.timestamps?.start,
    endedAt: payload.timestamps?.end,
    applicationId: payload.application_id ? bot.transformers.snowflake(payload.application_id) : undefined,
    details: payload.details ?? undefined,
    state: payload.state ?? undefined,
    emoji: payload.emoji
      ? {
          name: payload.emoji.name,
          animated: payload.emoji.animated,
          id: payload.emoji.id ? bot.transformers.snowflake(payload.emoji.id) : undefined,
        }
      : undefined,
    partyId: payload.party?.id,
    partyCurrentSize: payload.party?.size?.[0],
    partyMaxSize: payload.party?.size?.[1],
    largeImage: payload.assets?.large_image,
    largeText: payload.assets?.large_text,
    smallImage: payload.assets?.small_image,
    smallText: payload.assets?.small_text,
    join: payload.secrets?.join,
    spectate: payload.secrets?.spectate,
    match: payload.secrets?.match,
    instance: payload.instance,
    flags: payload.flags,
    buttons: payload.buttons,
  } as Activity

  return bot.transformers.customizers.activity(bot, payload, activity)
}

export function transformActivityInstance(bot: Bot, payload: DiscordActivityInstance): ActivityInstance {
  const props = bot.transformers.desiredProperties.activityInstance
  const activityInstance = {} as SetupDesiredProps<ActivityInstance, TransformersDesiredProperties, DesiredPropertiesBehavior>

  if (props.applicationId && payload.application_id) activityInstance.applicationId = bot.transformers.snowflake(payload.application_id)
  if (props.instanceId && payload.instance_id) activityInstance.instanceId = payload.instance_id
  if (props.launchId && payload.launch_id) activityInstance.launchId = bot.transformers.snowflake(payload.launch_id)
  if (props.location && payload.location) activityInstance.location = bot.transformers.activityLocation(bot, payload.location)
  if (props.users && payload.users) activityInstance.users = payload.users.map((x) => bot.transformers.snowflake(x))

  return bot.transformers.customizers.activityInstance(bot, payload, activityInstance)
}

export function transformActivityLocation(bot: Bot, payload: DiscordActivityLocation): ActivityLocation {
  const props = bot.transformers.desiredProperties.activityLocation
  const activityLocation = {} as SetupDesiredProps<ActivityLocation, TransformersDesiredProperties, DesiredPropertiesBehavior>

  if (props.id && payload.id) activityLocation.id = payload.id
  if (props.kind && payload.kind) activityLocation.kind = payload.kind
  if (props.channelId && payload.channel_id) activityLocation.channelId = bot.transformers.snowflake(payload.channel_id)
  if (props.guildId && payload.guild_id) activityLocation.guildId = bot.transformers.snowflake(payload.guild_id)

  return bot.transformers.customizers.activityLocation(bot, payload, activityLocation)
}
