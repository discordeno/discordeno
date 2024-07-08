import {
  ApplicationFlags,
  type Bot,
  ButtonStyles,
  type DiscordMessage,
  InteractionTypes,
  MemberToggles,
  MessageActivityTypes,
  MessageComponentTypes,
  MessageTypes,
  PremiumTypes,
  StickerFormatTypes,
  TeamMembershipStates,
  TextStyles,
  UserFlags,
  createBot,
  iconHashToBigInt,
} from '@discordeno/bot'
import { memoryBenchmark } from '../utils/memoryBenchmark.js'

export const CHANNEL_MENTION_REGEX = /<#[0-9]+>/g

const MESSAGE_SIZE = 20000

const bot = createBot({
  token: process.env.DISCORD_TOKEN ?? ' ',
  applicationId: 1n,
  events: {},
})

bot.transformers.desiredProperties.message.activity = true
bot.transformers.desiredProperties.message.application = true
bot.transformers.desiredProperties.message.applicationId = true
bot.transformers.desiredProperties.message.attachments = true
bot.transformers.desiredProperties.message.author = true
bot.transformers.desiredProperties.message.channelId = true
bot.transformers.desiredProperties.message.components = true
bot.transformers.desiredProperties.message.content = true
bot.transformers.desiredProperties.message.editedTimestamp = true
bot.transformers.desiredProperties.message.embeds = true
bot.transformers.desiredProperties.message.guildId = true
bot.transformers.desiredProperties.message.id = true
bot.transformers.desiredProperties.message.interaction.id = true
bot.transformers.desiredProperties.message.interaction.member = true
bot.transformers.desiredProperties.message.interaction.name = true
bot.transformers.desiredProperties.message.interaction.user = true
bot.transformers.desiredProperties.message.interaction.type = true
bot.transformers.desiredProperties.message.member = true
bot.transformers.desiredProperties.message.mentionedChannelIds = true
bot.transformers.desiredProperties.message.mentionedRoleIds = true
bot.transformers.desiredProperties.message.mentions = true
bot.transformers.desiredProperties.message.messageReference.messageId = true
bot.transformers.desiredProperties.message.messageReference.channelId = true
bot.transformers.desiredProperties.message.messageReference.guildId = true
bot.transformers.desiredProperties.message.nonce = true
bot.transformers.desiredProperties.message.reactions = true
bot.transformers.desiredProperties.message.stickerItems = true
bot.transformers.desiredProperties.message.thread = true
bot.transformers.desiredProperties.message.type = true
bot.transformers.desiredProperties.message.webhookId = true

const URL = 'https://discordeno.js.org/'
const IMAGE_HASH = '5fff867ae5f666fcd0626bd84f5e69c0'
const GUILD_ID = '785384884197392384'
const USER = {
  accent_color: 0,
  avatar: IMAGE_HASH,
  banner: IMAGE_HASH,
  bot: true,
  discriminator: '1234',
  email: 'discordeno@discordeno.com',
  flags: UserFlags.BotHttpInteractions,
  id: GUILD_ID,
  locale: 'en',
  mfa_enabled: true,
  premium_type: PremiumTypes.Nitro,
  public_flags: UserFlags.BotHttpInteractions,
  system: true,
  username: 'skillz',
  verified: true,
}
const MEMBER = {
  nick: 'John',
  roles: ['111111111111111111', '222222222222222222', '333333333333333333'],
  joined_at: '2022-01-01T00:00:00.000Z',
  premium_since: '2022-02-01T00:00:00.000Z',
  deaf: false,
  mute: true,
  pending: false,
  permissions: '2147483647',
}

console.log('before the bench')
await memoryBenchmark(
  '[transformer] message cache check',
  () => ({
    cache: [] as any[],
  }), // function returns a new instance of object wanted to test with
  (object, event: DiscordMessage) => object.cache.push(bot.transformers.message(bot, event)),
  // function specify how to add event to the object/ run the object
  [...new Array(MESSAGE_SIZE)].map(
    () =>
      ({
        activity: {
          party_id: 'party_id',
          type: MessageActivityTypes.Join,
        },
        application: {
          bot_public: true,
          bot_require_code_grant: true,
          cover_image: IMAGE_HASH,
          custom_install_url: 'https://google.com',
          description: 'discordeno is the best lib ever',
          flags: ApplicationFlags.GatewayGuildMembers,
          guild_id: GUILD_ID,
          icon: IMAGE_HASH,
          id: GUILD_ID,
          install_params: {
            permissions: '8',
            scopes: ['identify'],
          },
          name: 'skillz',
          owner: USER,
          primary_sku_id: GUILD_ID,
          privacy_policy_url: 'https://discordeno.js.org',
          role_connections_verification_url: 'https://discordeno.js.org',
          rpc_origins: [],
          slug: 'discordeno',
          tags: ['discordeno', 'discordeno', 'discordeno', 'discordeno', 'discordeno'],
          team: {
            icon: IMAGE_HASH,
            id: GUILD_ID,
            members: [
              {
                membership_state: TeamMembershipStates.Accepted,
                permissions: ['*'],
                team_id: GUILD_ID,
                user: USER,
              },
              {
                membership_state: TeamMembershipStates.Accepted,
                permissions: ['*'],
                team_id: GUILD_ID,
                user: USER,
              },
            ],
            name: 'discordeno',
            owner_user_id: GUILD_ID,
          },
          terms_of_service_url: 'https://discordeno.js.org',
          verify_key: IMAGE_HASH,
        },
        application_id: GUILD_ID,
        attachments: [
          {
            content_type: 'application/json',
            description: 'discordeno discordeno discordeno',
            ephemeral: true,
            filename: 'discordeno',
            height: 100,
            id: GUILD_ID,
            proxy_url: 'https://discordeno.js.org',
            size: 100,
            url: 'https://discordeno.js.org',
            width: 100,
          },
          {
            content_type: 'application/json',
            description: 'discordeno discordeno discordeno',
            ephemeral: true,
            filename: 'discordeno',
            height: 100,
            id: GUILD_ID,
            proxy_url: 'https://discordeno.js.org',
            size: 100,
            url: 'https://discordeno.js.org',
            width: 100,
          },
        ],
        author: USER,
        channel_id: GUILD_ID,
        components: [
          {
            type: 1,
            components: [
              {
                custom_id: GUILD_ID,
                disabled: true,
                emoji: {
                  animated: true,
                  id: GUILD_ID,
                  name: 'discordeno',
                },
                label: 'discordeno',
                style: ButtonStyles.Danger,
                type: MessageComponentTypes.Button,
                url: 'https://discordeno.js.org',
              },
            ],
          },
          {
            type: 1,
            components: [
              {
                type: MessageComponentTypes.InputText,
                custom_id: 'discordeno',
                label: 'discordeno',
                max_length: 100,
                min_length: 100,
                placeholder: 'discordeno',
                required: true,
                style: TextStyles.Paragraph,
                value: 'discordeno',
              },
            ],
          },
          {
            type: 1,
            components: [
              {
                type: MessageComponentTypes.SelectMenu,
                custom_id: 'discordeno',
                max_values: 100,
                min_values: 100,
                options: [
                  {
                    default: true,
                    description: 'idk idk idk',
                    emoji: {
                      animated: true,
                      id: GUILD_ID,
                      name: 'discordeno',
                    },
                    label: 'discordeno',
                    value: 'discordeno',
                  },
                ],
                placeholder: 'discordeno',
              },
            ],
          },
        ],
        content: 'discordeno',
        edited_timestamp: new Date().toISOString(),
        embeds: [
          {
            author: {
              icon_url: URL,
              name: 'discordeno',
              proxy_icon_url: URL,
              url: URL,
            },
            color: 0,
            description: 'discordeno',
            fields: [
              {
                name: 'discordeno',
                value: 'discordeno',
                inline: true,
              },
              {
                name: 'discordeno',
                value: 'discordeno',
                inline: true,
              },
            ],
            footer: {
              icon_url: URL,
              proxy_icon_url: URL,
              text: 'discordeno',
            },
            image: {
              height: 100,
              width: 100,
              proxy_url: URL,
              url: URL,
            },
            provider: {
              name: 'discordeno',
              url: URL,
            },
            thumbnail: {
              height: 100,
              width: 100,
              proxy_url: URL,
              url: URL,
            },
            timestamp: new Date().toISOString(),
            title: 'discordeno',
            type: 'rich',
            url: URL,
            video: {
              height: 100,
              width: 100,
              proxy_url: URL,
              url: URL,
            },
          },
        ],
        flags: 64,
        guild_id: GUILD_ID,
        id: GUILD_ID,
        interaction: {
          id: GUILD_ID,
          name: 'discordeno',
          type: InteractionTypes.ApplicationCommand,
          user: USER,
          member: MEMBER,
        },
        member: MEMBER,
        mention_channels: [
          {
            guild_id: GUILD_ID,
            id: GUILD_ID,
            name: 'discordeno',
            type: 0,
          },
        ],
        mention_roles: ['111111111111111111', '222222222222222222'],
        mention_everyone: false,
        mentions: [USER, USER, USER],
        message_reference: {
          message_id: GUILD_ID,
          channel_id: GUILD_ID,
          guild_id: GUILD_ID,
          fail_if_not_exists: true,
        },
        nonce: 'discordeno',
        pinned: true,
        position: 100,
        reactions: [
          {
            count: 100,
            emoji: {
              animated: true,
              id: GUILD_ID,
              name: 'discordeno',
            },
            me: true,
            me_burst: false,
            count_details: {
              normal: 100,
              burst: 0,
            },
            burst_colors: [],
          },
        ],
        sticker_items: [
          {
            format_type: StickerFormatTypes.APng,
            id: GUILD_ID,
            name: 'discordeno',
          },
        ],
        thread: {
          id: '987654321098765432',
          name: 'My Thread',
          type: 11,
          guild_id: '123456789012345678',
          parent_id: '876543210987654321',
          owner_id: '111111111111111111',
          message_count: 10,
          member_count: 5,
          created_timestamp: 1651388000,
          last_message_id: '876543210987654321',
          applied_tags: ['discordeno'],
          default_thread_rate_limit_per_user: 100,
          member: {
            flags: 100,
            id: GUILD_ID,
            join_timestamp: new Date().toISOString(),
            user_id: GUILD_ID,
          },
        },
        timestamp: new Date().toISOString(),
        tts: true,
        type: MessageTypes.Default,
        webhook_id: GUILD_ID,
      }) as unknown as DiscordMessage,
  ), // array of event to test with
  { times: 1, log: false, table: false },
)
console.log('after the bench')

function oldtransformMessage(bot: Bot, payload: DiscordMessage): any {
  const guildId = payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined
  const userId = bot.transformers.snowflake(payload.author.id)

  const message = {
    // UNTRANSFORMED STUFF HERE
    content: payload.content ?? '',
    isFromBot: payload.author.bot ?? false,
    tag: `${payload.author.username}#${payload.author.discriminator}`,
    timestamp: Date.parse(payload.timestamp),
    editedTimestamp: payload.edited_timestamp ? Date.parse(payload.edited_timestamp) : undefined,
    bitfield: (payload.tts ? 1n : 0n) | (payload.mention_everyone ? 2n : 0n) | (payload.pinned ? 4n : 0n),
    attachments: payload.attachments?.map((attachment) => bot.transformers.attachment(bot, attachment)),
    embeds: payload.embeds?.map((embed) => bot.transformers.embed(bot, embed)),
    reactions: payload.reactions?.map((reaction) => ({
      me: reaction.me,
      count: reaction.count,
      emoji: bot.transformers.emoji(bot, reaction.emoji),
    })),
    type: payload.type,
    activity: payload.activity
      ? {
          type: payload.activity.type,
          partyId: payload.activity.party_id,
        }
      : undefined,
    application: payload.application,
    flags: payload.flags,
    interaction: payload.interaction
      ? {
          id: bot.transformers.snowflake(payload.interaction.id),
          type: payload.interaction.type,
          name: payload.interaction.name,
          user: bot.transformers.user(bot, payload.interaction.user),
          member: payload.interaction.member
            ? {
                id: userId,
                guildId,
                nick: payload.interaction.member.nick ?? undefined,
                roles: payload.interaction.member.roles?.map((id) => bot.transformers.snowflake(id)),
                joinedAt: payload.interaction.member.joined_at ? Date.parse(payload.interaction.member.joined_at) : undefined,
                premiumSince: payload.interaction.member.premium_since ? Date.parse(payload.interaction.member.premium_since) : undefined,
                toggles: new MemberToggles(payload.interaction.member),
                avatar: payload.interaction.member.avatar ? iconHashToBigInt(payload.interaction.member.avatar) : undefined,
                permissions: payload.interaction.member.permissions ? bot.transformers.snowflake(payload.interaction.member.permissions) : undefined,
                communicationDisabledUntil: payload.interaction.member.communication_disabled_until
                  ? Date.parse(payload.interaction.member.communication_disabled_until)
                  : undefined,
              }
            : undefined,
        }
      : undefined,
    thread: payload.thread ? bot.transformers.channel(bot, { channel: payload.thread, guildId }) : undefined,
    components: payload.components?.map((component) => bot.transformers.component(bot, component)),
    stickerItems: payload.sticker_items?.map((sticker) => ({
      id: bot.transformers.snowflake(sticker.id),
      name: sticker.name,
      formatType: sticker.format_type,
    })),

    // TRANSFORMED STUFF BELOW
    id: bot.transformers.snowflake(payload.id),
    guildId,
    channelId: bot.transformers.snowflake(payload.channel_id),
    webhookId: payload.webhook_id ? bot.transformers.snowflake(payload.webhook_id) : undefined,
    authorId: userId,
    applicationId: payload.application_id ? bot.transformers.snowflake(payload.application_id) : undefined,
    messageReference: payload.message_reference
      ? {
          messageId: payload.message_reference.message_id ? bot.transformers.snowflake(payload.message_reference.message_id) : undefined,
          channelId: payload.message_reference.channel_id ? bot.transformers.snowflake(payload.message_reference.channel_id) : undefined,
          guildId: payload.message_reference.guild_id ? bot.transformers.snowflake(payload.message_reference.guild_id) : undefined,
        }
      : undefined,
    mentionedUserIds: payload.mentions ? payload.mentions.map((m) => bot.transformers.snowflake(m.id)) : [],
    mentionedRoleIds: payload.mention_roles ? payload.mention_roles.map((id) => bot.transformers.snowflake(id)) : [],
    mentionedChannelIds: [
      // Keep any ids tht discord sends
      ...(payload.mention_channels ?? []).map((m) => bot.transformers.snowflake(m.id)),
      // Add any other ids that can be validated in a channel mention format
      ...(payload.content?.match(CHANNEL_MENTION_REGEX) ?? []).map((text) =>
        // converts the <#123> into 123
        bot.transformers.snowflake(text.substring(2, text.length - 1)),
      ),
    ],
    member: payload.member && guildId ? bot.transformers.member(bot, payload.member, guildId, userId) : undefined,
    nonce: payload.nonce,
  }

  return message
}

await memoryBenchmark(
  '[transformer] old message cache check',
  () => ({
    cache: [] as any[],
  }), // function reutrn a new instance of object wanted to test with
  (object, event: DiscordMessage) => object.cache.push(oldtransformMessage(bot, event)),
  // function specify how to add event to the object/ run the object
  [...new Array(MESSAGE_SIZE)].map(
    () =>
      ({
        activity: {
          party_id: 'party_id',
          type: MessageActivityTypes.Join,
        },
        application: {
          bot_public: true,
          bot_require_code_grant: true,
          cover_image: IMAGE_HASH,
          custom_install_url: 'https://google.com',
          description: 'discordeno is the best lib ever',
          flags: ApplicationFlags.GatewayGuildMembers,
          guild_id: GUILD_ID,
          icon: IMAGE_HASH,
          id: GUILD_ID,
          install_params: {
            permissions: '8',
            scopes: ['identify'],
          },
          name: 'skillz',
          owner: USER,
          primary_sku_id: GUILD_ID,
          privacy_policy_url: 'https://discordeno.js.org',
          role_connections_verification_url: 'https://discordeno.js.org',
          rpc_origins: [],
          slug: 'discordeno',
          tags: ['discordeno', 'discordeno', 'discordeno', 'discordeno', 'discordeno'],
          team: {
            icon: IMAGE_HASH,
            id: GUILD_ID,
            members: [
              {
                membership_state: TeamMembershipStates.Accepted,
                permissions: ['*'],
                team_id: GUILD_ID,
                user: USER,
              },
              {
                membership_state: TeamMembershipStates.Accepted,
                permissions: ['*'],
                team_id: GUILD_ID,
                user: USER,
              },
            ],
            name: 'discordeno',
            owner_user_id: GUILD_ID,
          },
          terms_of_service_url: 'https://discordeno.js.org',
          verify_key: IMAGE_HASH,
        },
        application_id: GUILD_ID,
        attachments: [
          {
            content_type: 'application/json',
            description: 'discordeno discordeno discordeno',
            ephemeral: true,
            filename: 'discordeno',
            height: 100,
            id: GUILD_ID,
            proxy_url: 'https://discordeno.js.org',
            size: 100,
            url: 'https://discordeno.js.org',
            width: 100,
          },
          {
            content_type: 'application/json',
            description: 'discordeno discordeno discordeno',
            ephemeral: true,
            filename: 'discordeno',
            height: 100,
            id: GUILD_ID,
            proxy_url: 'https://discordeno.js.org',
            size: 100,
            url: 'https://discordeno.js.org',
            width: 100,
          },
        ],
        author: USER,
        channel_id: GUILD_ID,
        components: [
          {
            type: 1,
            components: [
              {
                custom_id: GUILD_ID,
                disabled: true,
                emoji: {
                  animated: true,
                  id: GUILD_ID,
                  name: 'discordeno',
                },
                label: 'discordeno',
                style: ButtonStyles.Danger,
                type: MessageComponentTypes.Button,
                url: 'https://discordeno.js.org',
              },
            ],
          },
          {
            type: 1,
            components: [
              {
                type: MessageComponentTypes.InputText,
                custom_id: 'discordeno',
                label: 'discordeno',
                max_length: 100,
                min_length: 100,
                placeholder: 'discordeno',
                required: true,
                style: TextStyles.Paragraph,
                value: 'discordeno',
              },
            ],
          },
          {
            type: 1,
            components: [
              {
                type: MessageComponentTypes.SelectMenu,
                custom_id: 'discordeno',
                max_values: 100,
                min_values: 100,
                options: [
                  {
                    default: true,
                    description: 'idk idk idk',
                    emoji: {
                      animated: true,
                      id: GUILD_ID,
                      name: 'discordeno',
                    },
                    label: 'discordeno',
                    value: 'discordeno',
                  },
                ],
                placeholder: 'discordeno',
              },
            ],
          },
        ],
        content: 'discordeno',
        edited_timestamp: new Date().toISOString(),
        embeds: [
          {
            author: {
              icon_url: URL,
              name: 'discordeno',
              proxy_icon_url: URL,
              url: URL,
            },
            color: 0,
            description: 'discordeno',
            fields: [
              {
                name: 'discordeno',
                value: 'discordeno',
                inline: true,
              },
              {
                name: 'discordeno',
                value: 'discordeno',
                inline: true,
              },
            ],
            footer: {
              icon_url: URL,
              proxy_icon_url: URL,
              text: 'discordeno',
            },
            image: {
              height: 100,
              width: 100,
              proxy_url: URL,
              url: URL,
            },
            provider: {
              name: 'discordeno',
              url: URL,
            },
            thumbnail: {
              height: 100,
              width: 100,
              proxy_url: URL,
              url: URL,
            },
            timestamp: new Date().toISOString(),
            title: 'discordeno',
            type: 'rich',
            url: URL,
            video: {
              height: 100,
              width: 100,
              proxy_url: URL,
              url: URL,
            },
          },
        ],
        flags: 64,
        guild_id: GUILD_ID,
        id: GUILD_ID,
        interaction: {
          id: GUILD_ID,
          name: 'discordeno',
          type: InteractionTypes.ApplicationCommand,
          user: USER,
          member: MEMBER,
        },
        member: MEMBER,
        mention_channels: [
          {
            guild_id: GUILD_ID,
            id: GUILD_ID,
            name: 'discordeno',
            type: 0,
          },
        ],
        mention_roles: ['111111111111111111', '222222222222222222'],
        mention_everyone: false,
        mentions: [USER, USER, USER],
        message_reference: {
          message_id: GUILD_ID,
          channel_id: GUILD_ID,
          guild_id: GUILD_ID,
          fail_if_not_exists: true,
        },
        nonce: 'discordeno',
        pinned: true,
        position: 100,
        reactions: [
          {
            count: 100,
            emoji: {
              animated: true,
              id: GUILD_ID,
              name: 'discordeno',
            },
            me: true,
            me_burst: false,
            count_details: {
              normal: 100,
              burst: 0,
            },
            burst_colors: [],
          },
        ],
        sticker_items: [
          {
            format_type: StickerFormatTypes.APng,
            id: GUILD_ID,
            name: 'discordeno',
          },
        ],
        thread: {
          id: '987654321098765432',
          name: 'My Thread',
          type: 11,
          guild_id: '123456789012345678',
          parent_id: '876543210987654321',
          owner_id: '111111111111111111',
          message_count: 10,
          member_count: 5,
          created_timestamp: 1651388000,
          last_message_id: '876543210987654321',
          applied_tags: ['discordeno'],
          default_thread_rate_limit_per_user: 100,
          member: {
            flags: 100,
            id: GUILD_ID,
            join_timestamp: new Date().toISOString(),
            user_id: GUILD_ID,
          },
        },
        timestamp: new Date().toISOString(),
        tts: true,
        type: MessageTypes.Default,
        webhook_id: GUILD_ID,
      }) as unknown as DiscordMessage,
  ), // array of event to test with
  { times: 1, log: false, table: false },
)
