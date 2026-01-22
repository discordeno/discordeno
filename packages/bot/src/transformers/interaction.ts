import {
  type BigString,
  DiscordApplicationIntegrationType,
  type DiscordInteraction,
  type DiscordInteractionCallback,
  type DiscordInteractionCallbackResponse,
  type DiscordInteractionDataOption,
  type DiscordInteractionDataResolved,
  type DiscordInteractionResource,
  InteractionResponseTypes,
  InteractionTypes,
  MessageFlags,
} from '@discordeno/types';
import { Collection } from '@discordeno/utils';
import type { Bot } from '../bot.js';
import type { InteractionResolvedDataChannel } from '../commandOptionsParser.js';
import type {
  CompleteDesiredProperties,
  DesiredPropertiesBehavior,
  SetupDesiredProps,
  TransformersDesiredProperties,
  TransformProperty,
} from '../desiredProperties.js';
import type {
  Interaction,
  InteractionCallback,
  InteractionCallbackResponse,
  InteractionDataOption,
  InteractionDataResolved,
  InteractionResource,
} from './types.js';

// Assume we have all desired properties for this or else typescript will get very confused for the return types of these functions.
// This is used as a prototype, so the actual type with the user desired properties will be set later.
export const baseInteraction: SetupDesiredProps<Interaction, CompleteDesiredProperties<{}, true>, DesiredPropertiesBehavior.RemoveKey> = {
  // This allows typescript to still check for type errors on functions below
  ...(undefined as unknown as SetupDesiredProps<Interaction, CompleteDesiredProperties<{}, true>, DesiredPropertiesBehavior.RemoveKey>),

  async respond(response, options) {
    let type = InteractionResponseTypes.ChannelMessageWithSource;

    // If user provides a string, change it to a response object
    if (typeof response === 'string') response = { content: response };

    // If user provides a type, use it
    if (options?.type) type = options.type;
    // Otherwise, determine if it should be an autocomplete or a modal response
    else {
      if (response.title) type = InteractionResponseTypes.Modal;
      if (this.type === InteractionTypes.ApplicationCommandAutocomplete) type = InteractionResponseTypes.ApplicationCommandAutocompleteResult;
    }

    // Modals cannot be chained
    if (this.type === InteractionTypes.ModalSubmit && type === InteractionResponseTypes.Modal)
      throw new Error('Cannot respond to a modal interaction with another modal.');

    if (type === InteractionResponseTypes.ChannelMessageWithSource && options?.isPrivate) {
      response.flags ??= 0;
      response.flags |= MessageFlags.Ephemeral;
    }

    // Since this has already been given a response, any further responses must be followups.
    if (this.acknowledged) return await this.sendFollowupMessage(response);

    const result = await this.bot.helpers.sendInteractionResponse(
      this.id,
      this.token,
      { type, data: response },
      { withResponse: options?.withResponse },
    );
    this.acknowledged = true;
    return result;
  },
  async sendFollowupMessage(response) {
    // If user provides a string, change it to a response object
    if (typeof response === 'string') response = { content: response };

    return await this.bot.helpers.sendFollowupMessage(this.token, response);
  },
  async edit(response, messageId, options) {
    if (this.type === InteractionTypes.ApplicationCommandAutocomplete) throw new Error('Cannot edit an autocomplete interaction.');

    // If user provides a string, change it to a response object
    if (typeof response === 'string') response = { content: response };

    if (messageId) {
      return await this.bot?.helpers.editFollowupMessage(this.token, messageId, response);
    }

    if (!this.acknowledged) {
      if (this.type !== InteractionTypes.MessageComponent && this.type !== InteractionTypes.ModalSubmit)
        throw new Error("This interaction has not been responded to yet and this isn't a MessageComponent or ModalSubmit interaction.");

      const result = await this.bot.helpers.sendInteractionResponse(
        this.id,
        this.token,
        { type: InteractionResponseTypes.UpdateMessage, data: response },
        options,
      );
      this.acknowledged = true;
      return result;
    }

    return await this.bot.helpers.editOriginalInteractionResponse(this.token, response);
  },
  async deferEdit(options) {
    if (this.type === InteractionTypes.ApplicationCommandAutocomplete) throw new Error('Cannot edit an autocomplete interaction.');
    if (this.acknowledged) throw new Error('Cannot defer an already responded interaction.');

    if (this.type !== InteractionTypes.MessageComponent && this.type !== InteractionTypes.ModalSubmit)
      throw new Error("Cannot defer to then edit an interaction that isn't a MessageComponent or ModalSubmit interaction.");

    const result = await this.bot.helpers.sendInteractionResponse(
      this.id,
      this.token,
      { type: InteractionResponseTypes.DeferredUpdateMessage },
      options,
    );
    this.acknowledged = true;
    return result;
  },
  async defer(isPrivate, options) {
    if (this.acknowledged) throw new Error('Cannot defer an already responded interaction.');

    const result = await this.bot.helpers.sendInteractionResponse(
      this.id,
      this.token,
      {
        type: InteractionResponseTypes.DeferredChannelMessageWithSource,
        data: {
          flags: isPrivate ? MessageFlags.Ephemeral : undefined,
        },
      },
      options,
    );
    this.acknowledged = true;
    return result;
  },
  async delete(messageId) {
    if (this.type === InteractionTypes.ApplicationCommandAutocomplete) throw new Error('Cannot delete an autocomplete interaction');

    if (messageId) return await this.bot?.helpers.deleteFollowupMessage(this.token, messageId);
    else return await this.bot?.helpers.deleteOriginalInteractionResponse(this.token);
  },
};

export function transformInteraction(bot: Bot, payload: DiscordInteraction, extra?: { shardId?: number }): Interaction {
  const guildId = payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined;

  const interaction: SetupDesiredProps<Interaction, TransformersDesiredProperties, DesiredPropertiesBehavior> = Object.create(baseInteraction);
  const props = bot.transformers.desiredProperties.interaction;

  interaction.bot = bot;
  interaction.acknowledged = false;

  if (props.id && payload.id) interaction.id = bot.transformers.snowflake(payload.id);
  if (props.applicationId && payload.application_id) interaction.applicationId = bot.transformers.snowflake(payload.application_id);
  if (props.type && payload.type) interaction.type = payload.type;
  if (props.token && payload.token) interaction.token = payload.token;
  if (props.version && payload.version) interaction.version = payload.version;
  if (props.locale && payload.locale) interaction.locale = payload.locale;
  if (props.guildLocale && payload.guild_locale) interaction.guildLocale = payload.guild_locale;
  if (props.guild && payload.guild)
    // @ts-expect-error payload.guild is a Partial<DiscordGuild>
    interaction.guild = bot.transformers.guild(bot, payload.guild, { shardId: extra?.shardId });
  if (props.guildId && guildId) interaction.guildId = guildId;
  if (props.user) {
    if (payload.member?.user) interaction.user = bot.transformers.user(bot, payload.member?.user);
    else if (payload.user) interaction.user = bot.transformers.user(bot, payload.user);
  }
  if (props.appPermissions && payload.app_permissions) interaction.appPermissions = bot.transformers.snowflake(payload.app_permissions);
  if (props.message && payload.message) interaction.message = bot.transformers.message(bot, payload.message, { shardId: extra?.shardId });
  if (props.channel && payload.channel)
    // @ts-expect-error payload.channel is a Partial<>
    interaction.channel = bot.transformers.channel(bot, payload.channel, { guildId });
  if (props.channelId && payload.channel_id) interaction.channelId = bot.transformers.snowflake(payload.channel_id);
  if (props.member && guildId && payload.member)
    interaction.member = bot.transformers.member(bot, payload.member, {
      guildId,
      userId: payload.member?.user.id ?? payload.user?.id,
    });
  if (props.entitlements && payload.entitlements) interaction.entitlements = payload.entitlements.map((e) => bot.transformers.entitlement(bot, e));
  if (props.authorizingIntegrationOwners && payload.authorizing_integration_owners) {
    interaction.authorizingIntegrationOwners = {};

    if (payload.authorizing_integration_owners['0'])
      interaction.authorizingIntegrationOwners[DiscordApplicationIntegrationType.GuildInstall] = bot.transformers.snowflake(
        payload.authorizing_integration_owners['0'],
      );
    if (payload.authorizing_integration_owners['1'])
      interaction.authorizingIntegrationOwners[DiscordApplicationIntegrationType.UserInstall] = bot.transformers.snowflake(
        payload.authorizing_integration_owners['1'],
      );
  }
  if (props.context && payload.context) interaction.context = payload.context;
  if (props.attachmentSizeLimit && payload.attachment_size_limit) interaction.attachmentSizeLimit = payload.attachment_size_limit;
  if (props.data && payload.data) {
    interaction.data = {
      type: payload.data.type,
      componentType: payload.data.component_type,
      customId: payload.data.custom_id,
      components: payload.data.components?.map((component) => bot.transformers.component(bot, component)),
      values: payload.data.values,
      id: payload.data.id ? bot.transformers.snowflake(payload.data.id) : undefined,
      name: payload.data.name,
      resolved: payload.data.resolved
        ? bot.transformers.interactionDataResolved(bot, payload.data.resolved, { shardId: extra?.shardId, guildId })
        : undefined,
      options: payload.data.options?.map((opt) => bot.transformers.interactionDataOptions(bot, opt)),
      targetId: payload.data.target_id ? bot.transformers.snowflake(payload.data.target_id) : undefined,
    };
  }

  // Typescript has an hard time with interaction.bot, so we need to tell him for sure this interaction is the of the correct type
  return bot.transformers.customizers.interaction(bot, payload, interaction as unknown as typeof bot.transformers.$inferredTypes.interaction, extra);
}

export function transformInteractionDataOption(bot: Bot, option: DiscordInteractionDataOption): InteractionDataOption {
  const opt = {
    name: option.name,
    type: option.type,
    value: option.value,
    options: option.options,
    focused: option.focused,
  } as InteractionDataOption;

  return bot.transformers.customizers.interactionDataOptions(bot, option, opt);
}

export function transformInteractionDataResolved(
  bot: Bot,
  payload: DiscordInteractionDataResolved,
  extra?: { shardId?: number; guildId?: BigString },
): TransformProperty<InteractionDataResolved, TransformersDesiredProperties, DesiredPropertiesBehavior.RemoveKey> {
  const transformed: TransformProperty<InteractionDataResolved, TransformersDesiredProperties, DesiredPropertiesBehavior.RemoveKey> = {};

  if (payload.messages) {
    transformed.messages = new Collection(
      Object.entries(payload.messages).map(([key, value]) => {
        // @ts-expect-error TODO: Deal with partials
        const message = bot.transformers.message(bot, value, { shardId: extra?.shardId });
        const id = bot.transformers.snowflake(key);

        return [id, message];
      }),
    );
  }

  if (payload.users) {
    transformed.users = new Collection(
      Object.entries(payload.users).map(([key, value]) => {
        const user = bot.transformers.user(bot, value);
        const id = bot.transformers.snowflake(key);

        return [id, user];
      }),
    );
  }

  if (extra?.guildId && payload.members) {
    transformed.members = new Collection(
      Object.entries(payload.members).map(([key, value]) => {
        // @ts-expect-error TODO: Deal with partials, value is missing 2 values but the transformer can handle it, despite what the types says
        const member = bot.transformers.member(bot, value, {
          guildId: extra.guildId,
          userId: bot.transformers.snowflake(key),
        });
        const id = bot.transformers.snowflake(key);

        return [id, member];
      }),
    );
  }

  if (extra?.guildId && payload.roles) {
    transformed.roles = new Collection(
      Object.entries(payload.roles).map(([key, value]) => {
        const role = bot.transformers.role(bot, value, { guildId: extra.guildId });
        const id = bot.transformers.snowflake(key);

        return [id, role];
      }),
    );
  }

  if (payload.channels) {
    transformed.channels = new Collection(
      Object.entries(payload.channels).map(([key, value]) => {
        const channel = bot.transformers.channel(bot, value) as InteractionResolvedDataChannel<
          TransformersDesiredProperties,
          DesiredPropertiesBehavior.RemoveKey
        >;
        const id = bot.transformers.snowflake(key);

        return [id, channel];
      }),
    );
  }

  if (payload.attachments) {
    transformed.attachments = new Collection(
      Object.entries(payload.attachments).map(([key, value]) => {
        const id = bot.transformers.snowflake(key);
        const attachment = bot.transformers.attachment(bot, value);

        return [id, attachment];
      }),
    );
  }

  return bot.transformers.customizers.interactionDataResolved(bot, payload, transformed, {
    shardId: extra?.shardId,
    guildId: extra?.guildId ? bot.transformers.snowflake(extra.guildId) : undefined,
  });
}

export function transformInteractionCallbackResponse(
  bot: Bot,
  payload: DiscordInteractionCallbackResponse,
  extra?: { shardId?: number },
): InteractionCallbackResponse {
  const props = bot.transformers.desiredProperties.interactionCallbackResponse;
  const response = {} as SetupDesiredProps<InteractionCallbackResponse, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.interaction && payload.interaction) response.interaction = bot.transformers.interactionCallback(bot, payload.interaction);
  if (props.resource && payload.resource)
    response.resource = bot.transformers.interactionResource(bot, payload.resource, { shardId: extra?.shardId });

  return bot.transformers.customizers.interactionCallbackResponse(bot, payload, response, extra);
}

export function transformInteractionCallback(bot: Bot, payload: DiscordInteractionCallback): InteractionCallback {
  const props = bot.transformers.desiredProperties.interactionCallback;
  const callback = {} as SetupDesiredProps<InteractionCallback, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.id && payload.id) callback.id = bot.transformers.snowflake(payload.id);
  if (props.type && payload.type) callback.type = payload.type;
  if (props.activityInstanceId && payload.activity_instance_id) callback.activityInstanceId = payload.activity_instance_id;
  if (props.responseMessageId && payload.response_message_id) callback.responseMessageId = bot.transformers.snowflake(payload.response_message_id);
  if (props.responseMessageEphemeral && payload.response_message_ephemeral) callback.responseMessageEphemeral = payload.response_message_ephemeral;
  if (props.responseMessageLoading && payload.response_message_loading) callback.responseMessageLoading = payload.response_message_loading;

  return bot.transformers.customizers.interactionCallback(bot, payload, callback);
}

export function transformInteractionResource(bot: Bot, payload: DiscordInteractionResource, extra?: { shardId?: number }): InteractionResource {
  const props = bot.transformers.desiredProperties.interactionResource;
  const resource = {} as SetupDesiredProps<InteractionResource, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.type && payload.type) resource.type = payload.type;
  if (props.activityInstance && payload.activity_instance) resource.activityInstance = payload.activity_instance;
  if (props.message && payload.message) resource.message = bot.transformers.message(bot, payload.message, { shardId: extra?.shardId });

  return bot.transformers.customizers.interactionResource(bot, payload, resource, extra);
}
