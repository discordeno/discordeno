import type {
  DiscordActivity,
  DiscordActivityAssets,
  DiscordActivityEmoji,
  DiscordActivityInstance,
  DiscordActivityLocation,
} from '@discordeno/types';
import type { Bot } from '../bot.js';
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js';
import { callCustomizer } from '../transformers.js';
import type { Activity, ActivityAssets, ActivityEmoji, ActivityInstance, ActivityLocation } from './types.js';

export function transformActivity(bot: Bot, payload: Partial<DiscordActivity>, extra?: { partial?: boolean }) {
  const activity = {} as SetupDesiredProps<Activity, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (payload.name) activity.name = payload.name;
  if (payload.type) activity.type = payload.type;
  if (payload.url) activity.url = payload.url;
  if (payload.created_at) activity.createdAt = payload.created_at;
  if (payload.application_id) activity.applicationId = bot.transformers.snowflake(payload.application_id);
  if (payload.status_display_type) activity.statusDisplayType = payload.status_display_type;
  if (payload.details) activity.details = payload.details;
  if (payload.details_url) activity.detailsUrl = payload.details_url;
  if (payload.state) activity.state = payload.state;
  if (payload.state_url) activity.stateUrl = payload.state_url;
  if (payload.emoji) activity.emoji = bot.transformers.activityEmoji(bot, payload.emoji);
  if (payload.party) activity.party = payload.party;
  if (payload.assets) activity.assets = bot.transformers.activityAssets(bot, payload.assets);
  if (payload.secrets) activity.secrets = payload.secrets;
  if (payload.instance) activity.instance = payload.instance;
  if (payload.flags) activity.flags = payload.flags;
  if (payload.buttons) activity.buttons = payload.buttons;
  if (payload.timestamps) activity.timestamps = payload.timestamps;

  return callCustomizer('activity', bot, payload, activity, {
    partial: extra?.partial ?? false,
  });
}

export function transformActivityInstance(bot: Bot, payload: Partial<DiscordActivityInstance>, extra?: { partial?: boolean }) {
  const props = bot.transformers.desiredProperties.activityInstance;
  const activityInstance = {} as SetupDesiredProps<ActivityInstance, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.applicationId && payload.application_id) activityInstance.applicationId = bot.transformers.snowflake(payload.application_id);
  if (props.instanceId && payload.instance_id) activityInstance.instanceId = payload.instance_id;
  if (props.launchId && payload.launch_id) activityInstance.launchId = bot.transformers.snowflake(payload.launch_id);
  if (props.location && payload.location) activityInstance.location = bot.transformers.activityLocation(bot, payload.location);
  if (props.users && payload.users) activityInstance.users = payload.users.map((x) => bot.transformers.snowflake(x));

  return callCustomizer('activityInstance', bot, payload, activityInstance, {
    partial: extra?.partial ?? false,
  });
}

export function transformActivityLocation(bot: Bot, payload: Partial<DiscordActivityLocation>, extra?: { partial?: boolean }) {
  const props = bot.transformers.desiredProperties.activityLocation;
  const activityLocation = {} as SetupDesiredProps<ActivityLocation, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.id && payload.id) activityLocation.id = payload.id;
  if (props.kind && payload.kind) activityLocation.kind = payload.kind;
  if (props.channelId && payload.channel_id) activityLocation.channelId = bot.transformers.snowflake(payload.channel_id);
  if (props.guildId && payload.guild_id) activityLocation.guildId = bot.transformers.snowflake(payload.guild_id);

  return callCustomizer('activityLocation', bot, payload, activityLocation, {
    partial: extra?.partial ?? false,
  });
}

export function transformActivityAssets(bot: Bot, payload: DiscordActivityAssets): ActivityAssets {
  const activityAssets = {
    inviteCoverImage: payload.invite_cover_image,
    largeImage: payload.large_image,
    largeText: payload.large_text,
    largeUrl: payload.large_url,
    smallImage: payload.small_image,
    smallText: payload.small_text,
    smallUrl: payload.small_url,
  } satisfies ActivityAssets;

  return bot.transformers.customizers.activityAssets(bot, payload, activityAssets);
}

export function transformActivityEmoji(bot: Bot, payload: Partial<DiscordActivityEmoji>, extra?: { partial?: boolean }): ActivityEmoji {
  const activityEmoji = {} as SetupDesiredProps<ActivityEmoji, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (payload.id) activityEmoji.id = bot.transformers.snowflake(payload.id);
  if (payload.animated) activityEmoji.animated = payload.animated;
  if (payload.name) activityEmoji.name = payload.name;

  return callCustomizer('activityEmoji', bot, payload, activityEmoji, {
    partial: extra?.partial ?? false,
  });
}
