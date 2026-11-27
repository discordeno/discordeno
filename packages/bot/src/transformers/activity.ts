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
  const props = bot.transformers.desiredProperties.activity;
  const activity = {} as SetupDesiredProps<Activity, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.name && payload.name) activity.name = payload.name;
  if (props.type && payload.type !== undefined) activity.type = payload.type;
  if (props.url && payload.url) activity.url = payload.url;
  if (props.createdAt && payload.created_at) activity.createdAt = payload.created_at;
  if (props.applicationId && payload.application_id) activity.applicationId = bot.transformers.snowflake(payload.application_id);
  if (props.statusDisplayType && payload.status_display_type) activity.statusDisplayType = payload.status_display_type;
  if (props.details && payload.details) activity.details = payload.details;
  if (props.detailsUrl && payload.details_url) activity.detailsUrl = payload.details_url;
  if (props.state && payload.state) activity.state = payload.state;
  if (props.stateUrl && payload.state_url) activity.stateUrl = payload.state_url;
  if (props.emoji && payload.emoji) activity.emoji = bot.transformers.activityEmoji(bot, payload.emoji);
  if (props.party && payload.party) activity.party = payload.party;
  if (props.assets && payload.assets) activity.assets = bot.transformers.activityAssets(bot, payload.assets);
  if (props.secrets && payload.secrets) activity.secrets = payload.secrets;
  if (props.instance && payload.instance) activity.instance = payload.instance;
  if (props.flags && payload.flags) activity.flags = payload.flags;
  if (props.buttons && payload.buttons) activity.buttons = payload.buttons;
  if (props.timestamps && payload.timestamps) activity.timestamps = payload.timestamps;

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

export function transformActivityAssets(bot: Bot, payload: Partial<DiscordActivityAssets>, extra?: { partial?: boolean }): ActivityAssets {
  const props = bot.transformers.desiredProperties.activityAssets;
  const activityAssets = {} as SetupDesiredProps<ActivityAssets, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.inviteCoverImage && payload.invite_cover_image) activityAssets.inviteCoverImage = payload.invite_cover_image;
  if (props.largeImage && payload.large_image) activityAssets.largeImage = payload.large_image;
  if (props.largeText && payload.large_text) activityAssets.largeText = payload.large_text;
  if (props.largeUrl && payload.large_url) activityAssets.largeUrl = payload.large_url;
  if (props.smallImage && payload.small_image) activityAssets.smallImage = payload.small_image;
  if (props.smallText && payload.small_text) activityAssets.smallText = payload.small_text;
  if (props.smallUrl && payload.small_url) activityAssets.smallUrl = payload.small_url;

  return callCustomizer('activityAssets', bot, payload, activityAssets, {
    partial: extra?.partial ?? false,
  });
}

export function transformActivityEmoji(bot: Bot, payload: Partial<DiscordActivityEmoji>, extra?: { partial?: boolean }): ActivityEmoji {
  const props = bot.transformers.desiredProperties.activityEmoji;
  const activityEmoji = {} as SetupDesiredProps<ActivityEmoji, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.id && payload.id) activityEmoji.id = bot.transformers.snowflake(payload.id);
  if (props.animated && payload.animated) activityEmoji.animated = payload.animated;
  if (props.name && payload.name) activityEmoji.name = payload.name;

  return callCustomizer('activityEmoji', bot, payload, activityEmoji, {
    partial: extra?.partial ?? false,
  });
}
