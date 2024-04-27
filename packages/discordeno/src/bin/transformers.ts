/**
 * List of all the transformers and their proprieties to then generate them based on desired proprieties
 */
const transformers: Record<string, TransformerInformation> = {
  activity: {
    name: 'Activity',
    proprieties: {
      join: {
        type: 'string',
        optional: true,
      },
      flags: {
        type: 'number',
        optional: true,
      },
      applicationId: {
        type: 'bigint',
        optional: true,
      },
      spectate: {
        type: 'string',
        optional: true,
      },
      url: {
        type: 'string',
        optional: true,
      },
      startedAt: {
        type: 'number',
        optional: true,
      },
      endedAt: {
        type: 'number',
        optional: true,
      },
      details: {
        type: 'string',
        optional: true,
      },
      state: {
        type: 'string',
        optional: true,
      },
      emoji: {
        type: {
          id: {
            type: 'bigint',
            optional: true,
          },
          animated: {
            type: 'boolean',
            optional: true,
          },
          name: {
            type: 'string',
          },
        },
        optional: true,
      },
      partyId: {
        type: 'string',
        optional: true,
      },
      partyCurrentSize: {
        type: 'number',
        optional: true,
      },
      partyMaxSize: {
        type: 'number',
        optional: true,
      },
      largeImage: {
        type: 'string',
        optional: true,
      },
      largeText: {
        type: 'string',
        optional: true,
      },
      smallImage: {
        type: 'string',
        optional: true,
      },
      smallText: {
        type: 'string',
        optional: true,
      },
      match: {
        type: 'string',
        optional: true,
      },
      instance: {
        type: 'boolean',
        optional: true,
      },
      buttons: {
        type: {
          url: {
            type: 'string',
          },
          label: {
            type: 'string',
          },
        },
        optional: true,
        array: true,
      },
      name: {
        type: 'string',
      },
      type: {
        type: 'import("@discordeno/types").ActivityTypes',
      },
      createdAt: {
        type: 'number',
      },
    },
    withoutDesiredProprietySupport: true,
  },
  application: {
    name: 'Application',
    proprieties: {
      flags: {
        type: 'import("@discordeno/types").ApplicationFlags',
        optional: true,
      },
      icon: {
        type: 'bigint',
        optional: true,
      },
      rpcOrigins: {
        type: 'string',
        array: true,
        optional: true,
      },
      termsOfServiceUrl: {
        type: 'string',
        optional: true,
      },
      privacyPolicyUrl: {
        type: 'string',
        optional: true,
      },
      primarySkuId: {
        type: 'string',
        optional: true,
      },
      slug: {
        type: 'string',
        optional: true,
      },
      coverImage: {
        type: 'bigint',
        optional: true,
      },
      owner: {
        type: 'User',
        optional: true,
      },
      team: {
        type: 'Team',
        optional: true,
      },
      guildId: {
        type: 'bigint',
        optional: true,
      },
      guild: {
        type: 'Guild',
        optional: true,
      },
      id: {
        type: 'bigint',
      },
      name: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
      botPublic: {
        type: 'boolean',
      },
      botRequireCodeGrant: {
        type: 'boolean',
      },
      verifyKey: {
        type: 'string',
      },
      approximateGuildCount: {
        type: 'number',
        optional: true,
      },
      bot: {
        type: 'User',
        optional: true,
      },
      redirectUris: {
        type: 'string',
        optional: true,
        array: true,
      },
      interactionsEndpointUrl: {
        type: 'string',
        optional: true,
      },
    },
    withoutDesiredProprietySupport: true,
  },
  applicationCommand: {
    name: 'ApplicationCommand',
    proprieties: {
      options: {
        type: 'ApplicationCommandOption',
        optional: true,
        array: true,
      },
      description: {
        type: 'string',
        optional: true,
      },
      guildId: {
        type: 'bigint',
        optional: true,
      },
      nameLocalizations: {
        type: 'Record<import("@discordeno/types").Locales, string>',
        optional: true,
      },
      descriptionLocalizations: {
        type: 'Record<import("@discordeno/types").Locales, string>',
        optional: true,
      },
      defaultMemberPermissions: {
        type: 'bigint',
        optional: true,
      },
      type: {
        type: 'import("@discordeno/types").ApplicationCommandTypes',
        optional: true,
      },
      version: {
        type: 'string',
        optional: true,
      },
      id: {
        type: 'bigint',
      },
      name: {
        type: 'string',
      },
      applicationId: {
        type: 'bigint',
      },
      dmPermission: {
        type: 'boolean',
      },
    },
    withoutDesiredProprietySupport: true,
  },
  applicationCommandOption: {
    name: 'ApplicationCommandOption',
    proprieties: {
      type: {
        type: 'import("@discordeno/types").ApplicationCommandOptionTypes',
        comment: ['Value of Application Command Option Type'],
      },
      name: {
        type: 'string',
        comment: ['1-32 character name matching lowercase `^[\\w-]{1,32}$`'],
      },
      nameLocalizations: {
        type: 'import("@discordeno/types").Localization',
        optional: true,
        comment: ['Localization object for the `name` field. Values follow the same restrictions as `name`'],
      },
      description: {
        type: 'string',
        comment: ['1-100 character description'],
      },
      descriptionLocalizations: {
        type: 'import("@discordeno/types").Localization',
        optional: true,
        comment: ['Localization object for the `description` field. Values follow the same restrictions as `description`'],
      },
      required: {
        type: 'boolean',
        optional: true,
        comment: ['If the parameter is required or optional--default `false`'],
      },
      choices: {
        type: 'ApplicationCommandOptionChoice',
        optional: true,
        array: true,
        comment: ['Choices for `string` and `int` types for the user to pick from'],
      },
      options: {
        type: 'ApplicationCommandOption',
        optional: true,
        array: true,
        comment: ['If the option is a subcommand or subcommand group type, this nested options will be the parameters'],
      },
      channelTypes: {
        type: 'import("@discordeno/types").ChannelTypes',
        optional: true,
        array: true,
        comment: ['If the option is a channel type, the channels shown will be restricted to these types'],
      },
      minValue: {
        type: 'number',
        optional: true,
        comment: ['Minimum number desired.'],
      },
      maxValue: {
        type: 'number',
        optional: true,
        comment: ['Maximum number desired.'],
      },
      minLength: {
        type: 'number',
        optional: true,
        comment: ['Minimum length desired.'],
      },
      maxLength: {
        type: 'number',
        optional: true,
        comment: ['Maximum length desired.'],
      },
      autocomplete: {
        type: 'boolean',
        optional: true,
        comment: ['if autocomplete interactions are enabled for this `String`, `Integer`, or `Number` type option'],
      },
    },
    withoutDesiredProprietySupport: true,
  },
  applicationCOmmandOptionChoice: {
    name: 'ApplicationCommandOptionChoice',
    proprieties: {
      nameLocalizations: {
        type: 'Record<import("@discordeno/types").Locales, string>',
        optional: true,
      },
      name: {
        type: 'string',
      },
      value: {
        type: ['string', 'number'],
      },
    },
    withoutDesiredProprietySupport: true,
  },
  applicationCommandPermission: {
    name: 'ApplicationCommandPermission',
    proprieties: {
      id: {
        type: 'bigint',
      },
      guildId: {
        type: 'bigint',
      },
      applicationId: {
        type: 'bigint',
      },
      permissions: {
        type: {
          id: {
            type: 'bigint',
          },
          type: {
            type: 'import("@discordeno/types").ApplicationCommandPermissionTypes',
          },
          permission: {
            type: 'boolean',
          },
        },
        array: true,
      },
    },
    withoutDesiredProprietySupport: true,
  },
  attachment: {
    name: 'Attachment',
    proprieties: {
      filename: {
        type: 'string',
        comment: ['Name of file attached'],
      },
      contentType: {
        type: 'string',
        optional: true,
        comment: ["The attachment's [media type](https://en.wikipedia.org/wiki/Media_type)"],
      },
      size: {
        type: 'number',
        comment: ['Size of file in bytes'],
      },
      url: {
        type: 'string',
        comment: ['Source url of file'],
      },
      proxyUrl: {
        type: 'string',
        comment: ['A proxied url of file'],
      },
      id: {
        type: 'bigint',
        comment: ['Attachment id'],
      },
      description: {
        type: 'string',
        optional: true,
        comment: ['description for the file (max 1024 characters)'],
      },
      height: {
        type: 'number',
        optional: true,
        comment: ['Height of file (if image)'],
      },
      width: {
        type: 'number',
        optional: true,
        comment: ['Width of file (if image)'],
      },
      ephemeral: {
        type: 'boolean',
        optional: true,
        comment: [
          'whether this attachment is ephemeral.',
          'Ephemeral attachments will automatically be removed after a set period of time.',
          'Ephemeral attachments on messages are guaranteed to be available as long as the message itself exists.',
        ],
      },
      duration_secs: {
        type: 'number',
        optional: true,
        comment: ['The duration of the audio file for a voice message'],
      },
      waveform: {
        type: 'string',
        optional: true,
        comment: ['A base64 encoded bytearray representing a sampled waveform for a voice message'],
      },
      flags: {
        type: 'import("@discordeno/types").AttachmentFlags',
        optional: true,
        comment: ['Attachment flags combined as a bitfield'],
      },
    },
  },
  auditLogEntry: {
    name: 'AuditLogEntry',
    proprieties: {
      id: {
        type: 'bigint',
      },
      userId: {
        type: 'bigint',
        optional: true,
      },
      reason: {
        type: 'string',
        optional: true,
      },
      changes: {
        type: {
          new: {
            type: [
              'string',
              'number',
              'bigint',
              'boolean',
              {
                type: {
                  allow: {
                    type: 'string',
                    optional: true,
                  },
                  deny: {
                    type: 'string',
                    optional: true,
                  },
                  id: {
                    type: 'string',
                  },
                  type: {
                    type: 'import("@discordeno/types").OverwriteTypes',
                    optional: true,
                  },
                },
                array: true,
              },
              {
                type: {
                  id: {
                    type: 'bigint',
                    optional: true,
                  },
                  name: {
                    type: 'string',
                    optional: true,
                  },
                },
                array: true,
              },
            ],
            optional: true,
          },
          old: {
            type: [
              'string',
              'number',
              'bigint',
              'boolean',
              {
                type: {
                  allow: {
                    type: 'string',
                    optional: true,
                  },
                  deny: {
                    type: 'string',
                    optional: true,
                  },
                  id: {
                    type: 'string',
                  },
                  type: {
                    type: 'import("@discordeno/types").OverwriteTypes',
                    optional: true,
                  },
                },
                array: true,
              },
              {
                type: {
                  id: {
                    type: 'bigint',
                    optional: true,
                  },
                  name: {
                    type: 'string',
                    optional: true,
                  },
                },
                array: true,
              },
            ],
            optional: true,
          },
          key: {
            type: [
              '"id"',
              '"name"',
              '"description"',
              '"type"',
              '"permissions"',
              '"locked"',
              '"invitable"',
              '"nsfw"',
              '"archived"',
              '"position"',
              '"topic"',
              '"bitrate"',
              '"default_auto_archive_duration"',
              '"auto_archive_duration"',
              '"allow"',
              '"deny"',
              '"channel_id"',
              '"deaf"',
              '"mute"',
              '"status"',
              '"nick"',
              '"communication_disabled_until"',
              '"color"',
              '"permission_overwrites"',
              '"user_limit"',
              '"rate_limit_per_user"',
              '"owner_id"',
              '"application_id"',
              '"hoist"',
              '"mentionable"',
              '"location"',
              '"verification_level"',
              '"default_message_notifications"',
              '"explicit_content_filter"',
              '"preferred_locale"',
              '"afk_timeout"',
              '"afk_channel_id"',
              '"system_channel_id"',
              '"widget_enabled"',
              '"mfa_level"',
              '"vanity_url_code"',
              '"icon_hash"',
              '"widget_channel_id"',
              '"rules_channel_id"',
              '"public_updates_channel_id"',
              '"code"',
              '"region"',
              '"privacy_level"',
              '"entity_type"',
              '"enable_emoticons"',
              '"expire_behavior"',
              '"expire_grace_period"',
              '"uses"',
              '"max_uses"',
              '"max_age"',
              '"temporary"',
              '"discovery_splash_hash"',
              '"banner_hash"',
              '"image_hash"',
              '"splash_hash"',
              '"inviter_id"',
              '"avatar_hash"',
              '"command_id"',
              '"prune_delete_days"',
              '"$add"',
              '"$remove"',
            ],
          },
        },
        optional: true,
        array: true,
      },
      targetId: {
        type: 'bigint',
        optional: true,
      },
      actionType: {
        type: 'import("@discordeno/types").AuditLogEvents',
      },
      options: {
        type: {
          id: {
            type: 'bigint',
            optional: true,
          },
          channelId: {
            type: 'bigint',
            optional: true,
          },
          messageId: {
            type: 'bigint',
            optional: true,
          },
          type: {
            type: 'number',
          },
          count: {
            type: 'number',
          },
          deleteMemberDays: {
            type: 'number',
          },
          membersRemoved: {
            type: 'number',
          },
          roleName: {
            type: 'string',
          },
          autoModerationRuleName: {
            type: 'string',
          },
          autoModerationRuleTriggerType: {
            type: 'string',
          },
          integrationType: {
            type: 'string',
          },
        },
        optional: true,
      },
    },
    withoutDesiredProprietySupport: true,
  },
  autoModerationActionExecution: {
    name: 'AutoModerationActionExecution',
    proprieties: {
      channelId: {
        type: 'bigint',
        optional: true,
      },
      messageId: {
        type: 'bigint',
        optional: true,
      },
      alertSystemMessageId: {
        type: 'bigint',
        optional: true,
      },
      guildId: {
        type: 'bigint',
      },
      userId: {
        type: 'bigint',
      },
      content: {
        type: 'string',
      },
      action: {
        type: {
          type: {
            type: 'import("@discordeno/types").AutoModerationActionType',
          },
          metadata: {
            type: {
              customMessage: {
                type: 'string',
                optional: true,
              },
              durationSeconds: {
                type: 'number',
                optional: true,
              },
              channelId: {
                type: 'bigint',
                optional: true,
              },
            },
          },
        },
      },
      ruleTriggerType: {
        type: 'import("@discordeno/types").AutoModerationTriggerTypes',
      },
      ruleId: {
        type: 'bigint',
      },
      matchedKeyword: {
        type: 'string',
      },
      matchedContent: {
        type: 'string',
      },
    },
    withoutDesiredProprietySupport: true,
  },
  autoModerationRule: {
    name: 'AutoModerationRule',
    proprieties: {
      triggerMetadata: {
        type: {
          keywordFilter: {
            type: 'string',
            optional: true,
            array: true,
          },
          presets: {
            type: 'import("@discordeno/types").DiscordAutoModerationRuleTriggerMetadataPresets',
            optional: true,
            array: true,
          },
          allowList: {
            type: 'string',
            optional: true,
            array: true,
          },
          mentionTotalLimit: {
            type: 'number',
            optional: true,
          },
          regexPatterns: {
            type: 'string',
            array: true,
          },
        },
        optional: true,
      },
      id: {
        type: 'bigint',
      },
      name: {
        type: 'string',
      },
      guildId: {
        type: 'bigint',
      },
      eventType: {
        type: 'import("@discordeno/types").AutoModerationEventTypes',
      },
      triggerType: {
        type: 'import("@discordeno/types").AutoModerationTriggerTypes',
      },
      enabled: {
        type: 'boolean',
      },
      creatorId: {
        type: 'bigint',
      },
      exemptRoles: {
        type: 'bigint',
        array: true,
      },
      exemptChannels: {
        type: 'bigint',
        array: true,
      },
      actions: {
        type: {
          type: {
            type: 'import("@discordeno/types").AutoModerationActionType',
          },
          metadata: {
            type: {
              channelId: {
                type: 'bigint',
                optional: true,
              },
              customMessage: {
                type: 'string',
                optional: true,
              },
              durationSeconds: {
                type: 'number',
                optional: true,
              },
            },
            optional: true,
          },
        },
        array: true,
      },
    },
    withoutDesiredProprietySupport: true,
  },
  channel: {
    name: 'Channel',
    proprieties: {
      id: {
        type: 'bigint',
        comment: ['The id of the channel'],
      },
      toggles: {
        type: 'import("../index.js").ChannelToggles',
        comment: ['The compressed form of all the boolean values on this channel.'],
        alwaysPresent: true,
      },
      type: {
        type: 'import("@discordeno/types").ChannelTypes',
        comment: ['The type of channel'],
      },
      guildId: {
        type: 'bigint',
        optional: true,
        comment: ['The id of the guild'],
      },
      position: {
        type: 'number',
        optional: true,
        comment: ['Sorting position of the channel'],
      },
      name: {
        type: 'string',
        optional: true,
        comment: ['The name of the channel (1-100 characters)'],
      },
      topic: {
        type: 'string',
        optional: true,
        comment: ['The channel topic (0-4096 characters for GUILD_FORUM channels, 0-1024 characters for all others)'],
      },
      lastMessageId: {
        type: 'bigint',
        optional: true,
        comment: ['The id of the last message sent in this channel (may not point to an existing or valid message)'],
      },
      bitrate: {
        type: 'number',
        optional: true,
        comment: ['The bitrate (in bits) of the voice or stage channel'],
      },
      userLimit: {
        type: 'number',
        optional: true,
        comment: ['The user limit of the voice or stage channel'],
      },
      rateLimitPerUser: {
        type: 'number',
        optional: true,
        comment: [
          'Amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected',
        ],
      },
      ownerId: {
        type: 'bigint',
        optional: true,
        comment: ['Id of the creator of the thread'],
      },
      parentId: {
        type: 'bigint',
        optional: true,
        comment: [
          'For guild channels: Id of the parent category for a channel (each parent category can contain up to 50 channels), for threads: id of the text channel this thread was created',
        ],
      },
      lastPinTimestamp: {
        type: 'number',
        optional: true,
        comment: ['When the last pinned message was pinned. This may be null in events such as GUILD_CREATE when a message is not pinned.'],
      },
      rtcRegion: {
        type: 'string',
        optional: true,
        comment: ['Voice region id for the voice or stage channel, automatic when set to null'],
      },
      videoQualityMode: {
        type: 'import("@discordeno/types").VideoQualityModes',
        optional: true,
        comment: ['The camera video quality mode of the voice channel, 1 when not present'],
      },
      messageCount: {
        type: 'number',
        optional: true,
        comment: ['An approximate count of messages in a thread, stops counting at 50'],
      },
      memberCount: {
        type: 'number',
        optional: true,
        comment: ['An approximate count of users in a thread, stops counting at 50'],
      },
      member: {
        type: 'import("@discordeno/types").DiscordThreadMember',
        optional: true,
        comment: ['Thread member object for the current user, if they have joined the thread, only included on certain API endpoints'],
      },
      autoArchiveDuration: {
        type: 'number',
        optional: true,
        comment: [
          'Default duration for newly created threads, in minutes, to automatically archive the thread after recent activity, can be set to: 60, 1440, 4320, 10080',
        ],
      },
      permissions: {
        type: 'import("../index.js").Permissions',
        optional: true,
        comment: [
          'computed permissions for the invoking user in the channel, including overwrites, only included when part of the resolved data received on a slash command interaction. This does not include implicit permissions, which may need to be checked separately.',
        ],
      },
      flags: {
        type: 'number',
        optional: true,
        comment: ['The flags of the channel'],
      },
      nsfw: {
        type: 'boolean',
        comment: ['Whether the channel is nsfw'],
        alwaysPresent: true,
      },
      threadMetadata: {
        type: {
          archiveTimestamp: {
            type: 'number',
            optional: true,
            comment: ["Timestamp when the thread's archive status was last changed, used for calculating recent activity"],
          },
          createTimestamp: {
            type: 'number',
            optional: true,
            comment: ['Timestamp when the thread was created; only populated for threads created after 2022-01-09'],
          },
          autoArchiveDuration: {
            type: ['60', '1440', '4320', '10080'],
            optional: true,
            comment: ['Duration in minutes to automatically archive the thread after recent activity'],
          },
          locked: {
            type: 'boolean',
            optional: true,
            comment: ['When a thread is locked, only users with `MANAGE_THREADS` can unarchive it'],
          },
          invitable: {
            type: 'boolean',
            optional: true,
            comment: ['whether non-moderators can add other non-moderators to a thread; only available on private threads'],
          },
          archived: {
            type: 'boolean',
            optional: true,
            comment: ['Whether the thread is archived'],
          },
        },
        optional: true,
        comment: [
          'Thread-specific fields not needed by other channels',
          '@remarks',
          'Some of the proprieties, in the specific `archiveTimestamp`, `createTimestamp` and `autoArchiveDuration`, need to be explicitly enabled the following desired proprieties',
        ],
        alwaysPresent: true,
      },
      newlyCreated: {
        type: 'boolean',
        comment: ['When a thread is created this will be true on that channel payload for the thread.'],
        alwaysPresent: true,
      },
      locked: {
        type: 'boolean',
        comment: ['When a thread is locked, only users with `MANAGE_THREADS` can unarchive it'],
        alwaysPresent: true,
      },
      invitable: {
        type: 'boolean',
        comment: ['whether non-moderators can add other non-moderators to a thread; only available on private threads'],
        alwaysPresent: true,
      },
      archived: {
        type: 'boolean',
        comment: ['Whether the thread is archived'],
        alwaysPresent: true,
      },
      permissionOverwrites: {
        type: 'import("@discordeno/types").OverwriteReadable',
        array: true,
        comment: ['Explicit permission overwrites for members and roles.'],
      },
    },
  },
  component: {
    name: 'Component',
    proprieties: {
      type: {
        type: 'import("@discordeno/types").MessageComponentTypes',
        comment: ['component type'],
      },
      customId: {
        type: 'string',
        optional: true,
        comment: ['a developer-defined identifier for the component, max 100 characters'],
      },
      required: {
        type: 'boolean',
        optional: true,
        comment: ['whether this component is required to be filled, default true'],
      },
      disabled: {
        type: 'boolean',
        optional: true,
        comment: ['whether the component is disabled, default false'],
      },
      style: {
        type: ['import("@discordeno/types").ButtonStyles', 'import("@discordeno/types").TextStyles'],
        optional: true,
        comment: ['For different styles/colors of the buttons'],
      },
      label: {
        type: 'string',
        optional: true,
        comment: ['text that appears on the button (max 80 characters)'],
      },
      value: {
        type: 'string',
        optional: true,
        comment: ['the dev-define value of the option, max 100 characters for select or 4000 for input.'],
      },
      emoji: {
        type: {
          id: {
            type: 'bigint',
            optional: true,
            comment: ['Emoji id'],
          },
          animated: {
            type: 'boolean',
            optional: true,
            comment: ['Whether this emoji is animated'],
          },
          name: {
            type: 'string',
            optional: true,
            comment: ['Emoji name'],
          },
        },
        optional: true,
        comment: ['Emoji object that includes fields of name, id, and animated supporting unicode and custom emojis.'],
      },
      url: {
        type: 'string',
        optional: true,
        comment: ['optional url for link-style buttons that can navigate a user to the web. Only type 5 Link buttons can have a url'],
      },
      channelTypes: {
        type: 'import("@discordeno/types").ChannelTypes',
        optional: true,
        array: true,
        comment: ['List of channel types to include in a channel select menu options list'],
      },
      options: {
        type: 'import("@discordeno/types").SelectOption',
        optional: true,
        array: true,
        comment: ['The choices! Maximum of 25 items.'],
      },
      placeholder: {
        type: 'string',
        optional: true,
        comment: ['A custom placeholder text if nothing is selected. Maximum 150 characters.'],
      },
      minValues: {
        type: 'number',
        optional: true,
        comment: ['The minimum number of items that must be selected. Default 1. Between 1-25.'],
      },
      maxValues: {
        type: 'number',
        optional: true,
        comment: ['The maximum number of items that can be selected. Default 1. Between 1-25.'],
      },
      minLength: {
        type: 'number',
        optional: true,
        comment: ['The minimum input length for a text input. Between 0-4000.'],
      },
      maxLength: {
        type: 'number',
        optional: true,
        comment: ['The maximum input length for a text input. Between 1-4000.'],
      },
      components: {
        type: 'Component',
        optional: true,
        array: true,
        comment: ['a list of child components'],
      },
    },
    withoutDesiredProprietySupport: true,
  },
  embed: {
    name: 'Embed',
    proprieties: {
      description: {
        type: 'string',
        optional: true,
      },
      type: {
        type: 'import("@discordeno/types").EmbedTypes',
        optional: true,
      },
      url: {
        type: 'string',
        optional: true,
      },
      image: {
        type: {
          url: {
            type: 'string',
          },
          proxyUrl: {
            type: 'string',
            optional: true,
          },
          height: {
            type: 'number',
            optional: true,
          },
          width: {
            type: 'number',
            optional: true,
          },
        },
        optional: true,
      },
      video: {
        type: {
          url: {
            type: 'string',
            optional: true,
          },
          proxyUrl: {
            type: 'string',
            optional: true,
          },
          height: {
            type: 'number',
            optional: true,
          },
          width: {
            type: 'number',
            optional: true,
          },
        },
        optional: true,
      },
      title: {
        type: 'string',
        optional: true,
      },
      timestamp: {
        type: 'number',
        optional: true,
      },
      color: {
        type: 'number',
        optional: true,
      },
      footer: {
        type: {
          iconUrl: {
            type: 'string',
            optional: true,
          },
          proxyIconUrl: {
            type: 'string',
            optional: true,
          },
          text: {
            type: 'string',
          },
        },
        optional: true,
      },
      thumbnail: {
        type: {
          url: {
            type: 'string',
          },
          proxyUrl: {
            type: 'string',
            optional: true,
          },
          height: {
            type: 'number',
            optional: true,
          },
          width: {
            type: 'number',
            optional: true,
          },
        },
        optional: true,
      },
      provider: {
        type: {
          name: {
            type: 'string',
            optional: true,
          },
          url: {
            type: 'string',
            optional: true,
          },
        },
        optional: true,
      },
      author: {
        type: {
          iconUrl: {
            type: 'string',
            optional: true,
          },
          proxyIconUrl: {
            type: 'string',
            optional: true,
          },
          name: {
            type: 'string',
          },
          url: {
            type: 'string',
            optional: true,
          },
        },
        optional: true,
      },
      fields: {
        type: {
          name: {
            type: 'string',
          },
          value: {
            type: 'string',
          },
          inline: {
            type: 'boolean',
            optional: true,
          },
        },
        optional: true,
        array: true,
      },
    },
    withoutDesiredProprietySupport: true,
  },
  emoji: {
    name: 'Emoji',
    proprieties: {
      name: {
        type: 'string',
        optional: true,
        comment: ['Emoji name (can only be null in reaction emoji objects)'],
      },
      id: {
        type: 'bigint',
        optional: true,
        comment: ['Emoji id'],
      },
      roles: {
        type: 'bigint',
        optional: true,
        array: true,
        comment: ['Roles allowed to use this emoji'],
      },
      user: {
        type: 'User',
        optional: true,
        comment: ['User that created this emoji'],
      },
      requireColons: {
        type: 'boolean',
        optional: true,
        comment: ['Whether this emoji must be wrapped in colons'],
      },
      managed: {
        type: 'boolean',
        optional: true,
        comment: ['Whether this emoji is managed'],
      },
      animated: {
        type: 'boolean',
        optional: true,
        comment: ['Whether this emoji is animated'],
      },
      available: {
        type: 'boolean',
        optional: true,
        comment: ['Whether this emoji can be used, may be false due to loss of Server Boosts'],
      },
      toggles: {
        type: 'import("../index.js").EmojiToggles',
      },
    },
  },
  entitlement: {
    name: 'Entitlement',
    proprieties: {
      id: {
        type: 'bigint',
        comment: ['ID of the entitlement'],
      },
      skuId: {
        type: 'bigint',
        comment: ['ID of the SKU'],
      },
      userId: {
        type: 'bigint',
        optional: true,
        comment: ["ID of the user that is granted access to the entitlement's sku"],
      },
      guildId: {
        type: 'bigint',
        optional: true,
        comment: ["ID of the guild that is granted access to the entitlement's sku"],
      },
      applicationId: {
        type: 'bigint',
        comment: ['ID of the parent application'],
      },
      type: {
        type: 'import("@discordeno/types").DiscordEntitlementType',
        comment: ['Type of entitlement'],
      },
      deleted: {
        type: 'boolean',
        comment: ['Entitlement was deleted'],
      },
      startsAt: {
        type: 'number',
        optional: true,
        comment: ['Start date at which the entitlement is valid. Not present when using test entitlements'],
      },
      endsAt: {
        type: 'number',
        optional: true,
        comment: ['Date at which the entitlement is no longer valid. Not present when using test entitlements'],
      },
    },
  },
  getGatewayBot: {
    name: 'GetGatewayBot',
    proprieties: {
      url: {
        type: 'string',
      },
      shards: {
        type: 'number',
      },
      sessionStartLimit: {
        type: {
          total: {
            type: 'number',
          },
          remaining: {
            type: 'number',
          },
          resetAfter: {
            type: 'number',
          },
          maxConcurrency: {
            type: 'number',
          },
        },
      },
    },
    withoutDesiredProprietySupport: true,
  },
  guild: {
    name: 'Guild',
    proprieties: {
      name: {
        type: 'string',
        comment: ['Guild name (2-100 characters, excluding trailing and leading whitespace)'],
      },
      owner: {
        type: ['boolean', 'undefined'],
        comment: ['True if the user is the owner of the guild'],
      },
      afkTimeout: {
        type: 'number',
        comment: ['Afk timeout in seconds'],
      },
      widgetEnabled: {
        type: 'boolean',
        optional: true,
        comment: ['True if the server widget is enabled'],
      },
      verificationLevel: {
        type: 'import("@discordeno/types").VerificationLevels',
        comment: ['Verification level required for the guild'],
      },
      defaultMessageNotifications: {
        type: 'import("@discordeno/types").DefaultMessageNotificationLevels',
        comment: ['Default message notifications level'],
      },
      explicitContentFilter: {
        type: 'import("@discordeno/types").ExplicitContentFilterLevels',
        comment: ['Explicit content filter level'],
      },
      features: {
        type: 'import("@discordeno/types").GuildFeatures',
        array: true,
        comment: ['Enabled guild features'],
      },
      mfaLevel: {
        type: 'import("@discordeno/types").MfaLevels',
        comment: ['Required MFA level for the guild'],
      },
      systemChannelFlags: {
        type: 'import("@discordeno/types").SystemChannelFlags',
        comment: ['System channel flags'],
      },
      large: {
        type: 'boolean',
        optional: true,
        comment: ['True if this is considered a large guild'],
      },
      unavailable: {
        type: 'boolean',
        optional: true,
        comment: ['True if this guild is unavailable due to an outage'],
      },
      memberCount: {
        type: 'number',
        comment: ['Total number of members in this guild'],
      },
      maxPresences: {
        type: 'number',
        optional: true,
        comment: ['The maximum number of presences for the guild (the default value, currently 25000, is in effect when null is returned)'],
      },
      maxMembers: {
        type: 'number',
        optional: true,
        comment: ['The maximum number of members for the guild'],
      },
      vanityUrlCode: {
        type: 'string',
        optional: true,
        comment: ['The vanity url code for the guild'],
      },
      description: {
        type: 'string',
        optional: true,
        comment: ['The description of a guild'],
      },
      toggles: {
        type: 'import("../index.js").GuildToggles',
      },
      shardId: {
        type: 'number',
      },
      premiumTier: {
        type: 'import("@discordeno/types").PremiumTiers',
        comment: ['Premium tier (Server Boost level)'],
      },
      premiumSubscriptionCount: {
        type: 'number',
        optional: true,
        comment: ['The number of boosts this guild currently has'],
      },
      maxVideoChannelUsers: {
        type: 'number',
        optional: true,
        comment: ['The maximum amount of users in a video channel'],
      },
      maxStageVideoChannelUsers: {
        type: 'number',
        optional: true,
        comment: ['Maximum amount of users in a stage video channel'],
      },
      approximateMemberCount: {
        type: 'number',
        optional: true,
        comment: ['Approximate number of members in this guild, returned from the GET /guilds/id endpoint when with_counts is true'],
      },
      approximatePresenceCount: {
        type: 'number',
        optional: true,
        comment: ['Approximate number of non-offline members in this guild, returned from the GET /guilds/id endpoint when with_counts is true'],
      },
      nsfwLevel: {
        type: 'import("@discordeno/types").GuildNsfwLevel',
        comment: ['Guild NSFW level'],
      },
      premiumProgressBarEnabled: {
        type: 'boolean',
        comment: ['Whether the guild has the boost progress bar enabled'],
      },
      id: {
        type: 'bigint',
        comment: ['Guild id'],
      },
      icon: {
        type: 'bigint',
        optional: true,
        comment: ['Icon hash'],
      },
      iconHash: {
        type: 'bigint',
        optional: true,
        comment: ['Icon hash, returned when in the template object'],
      },
      splash: {
        type: 'bigint',
        optional: true,
        comment: ['Splash hash'],
      },
      discoverySplash: {
        type: 'bigint',
        optional: true,
        comment: ['Discovery splash hash; only present for guilds with the "DISCOVERABLE" feature'],
      },
      ownerId: {
        type: 'bigint',
        comment: ['Id of the owner'],
      },
      permissions: {
        type: 'bigint',
        comment: ['Total permissions for the user in the guild (excludes overwrites and implicit permissions)'],
      },
      afkChannelId: {
        type: 'bigint',
        optional: true,
        comment: ['Id of afk channel'],
      },
      widgetChannelId: {
        type: 'bigint',
        optional: true,
        comment: ['The channel id that the widget will generate an invite to, or null if set to no invite'],
      },
      roles: {
        type: 'import("@discordeno/utils").Collection<bigint, Role>',
        comment: ['Roles in the guild'],
      },
      emojis: {
        type: 'import("@discordeno/utils").Collection<bigint, Emoji>',
        comment: ['Custom guild emojis'],
      },
      applicationId: {
        type: 'bigint',
        optional: true,
        comment: ['Application id of the guild creator if it is bot-created'],
      },
      systemChannelId: {
        type: 'bigint',
        optional: true,
        comment: ['The id of the channel where guild notices such as welcome messages and boost events are posted'],
      },
      rulesChannelId: {
        type: 'bigint',
        optional: true,
        comment: ['The id of the channel where community guilds can display rules and/or guidelines'],
      },
      joinedAt: {
        type: 'number',
        optional: true,
        comment: ['When this guild was joined at'],
      },
      voiceStates: {
        type: 'import("@discordeno/utils").Collection<bigint, VoiceState>',
        comment: ['States of members currently in voice channels; lacks the guild_id key'],
      },
      members: {
        type: 'import("@discordeno/utils").Collection<bigint, Member>',
        comment: ['Users in the guild'],
      },
      channels: {
        type: 'import("@discordeno/utils").Collection<bigint, Channel>',
        comment: ['Channels in the guild'],
      },
      threads: {
        type: 'import("@discordeno/utils").Collection<bigint, Channel>',
        comment: ['All active threads in the guild that the current user has permission to view'],
        dependencies: ['channels'],
      },
      presences: {
        type: 'PresenceUpdate',
        optional: true,
        array: true,
        comment: ['Presences of the members in the guild, will only include non-offline members if the size is greater than large threshold'],
      },
      banner: {
        type: 'bigint',
        optional: true,
        comment: ['Banner hash'],
      },
      preferredLocale: {
        type: 'string',
        comment: ['The preferred locale of a Community guild; used in server discovery and notices from Discord; defaults to "en-US"'],
      },
      publicUpdatesChannelId: {
        type: 'bigint',
        optional: true,
        comment: ['The id of the channel where admins and moderators of Community guilds receive notices from Discord'],
      },
      welcomeScreen: {
        type: 'WelcomeScreen',
        optional: true,
        comment: ["The welcome screen of a Community guild, shown to new members, returned in an Invite's guild object"],
      },
      stageInstances: {
        type: 'StageInstance',
        optional: true,
        array: true,
        comment: ['Stage instances in the guild'],
      },
      stickers: {
        type: 'import("@discordeno/utils").Collection<bigint, Sticker>',
        optional: true,
        comment: ['Custom guild stickers'],
      },
      safetyAlertsChannelId: {
        type: 'bigint',
        optional: true,
        comment: ['The id of the channel where admins and moderators of Community guilds receive safety alerts from Discord'],
      },
    },
  },
  integration: {
    name: 'Integration',
    proprieties: {
      user: {
        type: 'User',
        optional: true,
      },
      enabled: {
        type: 'boolean',
        optional: true,
      },
      syncing: {
        type: 'boolean',
        optional: true,
      },
      roleId: {
        type: 'bigint',
        optional: true,
      },
      enableEmoticons: {
        type: 'boolean',
        optional: true,
      },
      expireBehavior: {
        type: 'import("@discordeno/types").IntegrationExpireBehaviors',
        optional: true,
      },
      expireGracePeriod: {
        type: 'number',
        optional: true,
      },
      syncedAt: {
        type: 'number',
        optional: true,
      },
      subscriberCount: {
        type: 'number',
        optional: true,
      },
      revoked: {
        type: 'boolean',
        optional: true,
      },
      application: {
        type: {
          bot: {
            type: 'User',
            optional: true,
          },
          icon: {
            type: 'bigint',
            optional: true,
          },
          id: {
            type: 'bigint',
          },
          name: {
            type: 'string',
          },
          description: {
            type: 'string',
          },
        },
        optional: true,
      },
      id: {
        type: 'bigint',
      },
      name: {
        type: 'string',
      },
      guildId: {
        type: 'bigint',
      },
      type: {
        type: ['"twitch"', '"youtube"', '"discord"'],
      },
      account: {
        type: {
          id: {
            type: 'bigint',
          },
          name: {
            type: 'string',
          },
        },
      },
      scopes: {
        type: 'import("@discordeno/types").OAuth2Scope',
        array: true,
      },
    },
    withoutDesiredProprietySupport: true,
  },
  interaction: {
    name: 'Interaction',
    proprieties: {
      bot: {
        type: 'import("../index.js").Bot',
        comment: ['The bot object'],
        alwaysPresent: true,
      },
      acknowledged: {
        type: 'boolean',
        comment: ['Whether or not this interaction has been responded to.'],
        alwaysPresent: true,
      },
      id: {
        type: 'bigint',
        comment: ['Id of the interaction'],
      },
      applicationId: {
        type: 'bigint',
        comment: ['Id of the application this interaction is for'],
      },
      type: {
        type: 'import("@discordeno/types").InteractionTypes',
        comment: ['The type of interaction'],
      },
      guildId: {
        type: 'bigint',
        optional: true,
        comment: ['The guild it was sent from'],
      },
      channel: {
        type: 'Partial<Channel>',
        comment: ['The channel it was sent from'],
      },
      channelId: {
        type: 'bigint',
        optional: true,
        comment: [
          'The ID of channel it was sent from',
          '@remarks',
          'It is recommended that you begin using this channel field to identify the source channel of the interaction as they may deprecate the existing channel_id field in the future.',
        ],
      },
      member: {
        type: 'Member',
        optional: true,
        comment: ['Guild member data for the invoking user, including permissions'],
      },
      user: {
        type: 'User',
        comment: ['User object for the invoking user, if invoked in a DM'],
      },
      token: {
        type: 'string',
        comment: ['A continuation token for responding to the interaction'],
      },
      version: {
        type: '1',
        comment: ['Read-only property, always `1`'],
      },
      message: {
        type: 'Message',
        optional: true,
        comment: ['For the message the button was attached to'],
      },
      data: {
        type: {
          type: {
            type: 'import("@discordeno/types").ApplicationCommandTypes',
            optional: true,
          },
          componentType: {
            type: 'import("@discordeno/types").MessageComponentTypes',
            optional: true,
          },
          customId: {
            type: 'string',
            optional: true,
          },
          components: {
            type: 'Component',
            optional: true,
            array: true,
          },
          values: {
            type: 'string',
            optional: true,
            array: true,
          },
          name: {
            type: 'string',
          },
          resolved: {
            type: 'InteractionDataResolved',
            optional: true,
          },
          options: {
            type: 'InteractionDataOption',
            optional: true,
            array: true,
          },
          id: {
            type: 'bigint',
            optional: true,
          },
          targetId: {
            type: 'bigint',
            optional: true,
          },
        },
        optional: true,
        comment: ['the command data payload'],
      },
      locale: {
        type: 'string',
        optional: true,
        comment: ['The selected language of the invoking user'],
      },
      guildLocale: {
        type: 'string',
        optional: true,
        comment: ["The guild's preferred locale, if invoked in a guild"],
      },
      appPermissions: {
        type: 'bigint',
        comment: ['The computed permissions for a bot or app in the context of a specific interaction (including channel overwrites)'],
      },
      respond: {
        type: '(response: string | import("@discordeno/types").InteractionCallbackData, options?: { isPrivate?: boolean }) => Promise<Message | void>',
        comment: [
          'Sends a response to an interaction.',
          '',
          '@remarks',
          'This will send a {@link InteractionResponseTypes.ChannelMessageWithSource}, {@link InteractionResponseTypes.ApplicationCommandAutocompleteResult} or {@link InteractionResponseTypes.Modal} response based on the type of the interaction you are responding to.',
          '',
          'If the interaction has been already acknowledged, indicated by {@link Interaction.acknowledged}, it will send a followup message instead.',
        ],
        dependencies: ['id', 'token', 'type'],
      },
      edit: {
        type: '(response: string | import("@discordeno/types").InteractionCallbackData, messageId?: import("@discordeno/types").BigString) => Promise<Message | void>',
        comment: [
          'Edit the original response of an interaction or a followup if the message id is provided.',
          '',
          '@remarks',
          'This will edit the original interaction response or, if the interaction has not yet been acknowledged and the type of the interaction is {@link InteractionTypes.MessageComponent} it will instead send a {@link InteractionResponseTypes.UpdateMessage} response instead.',
        ],
        dependencies: ['token', 'type'],
      },
      deferEdit: {
        type: '() => Promise<void>',
        comment: [
          'Defer the interaction for updating the referenced message at a later time with {@link edit}.',
          '',
          '@remarks',
          'This will send a {@link InteractionResponseTypes.DeferredUpdateMessage} response.',
        ],
        dependencies: ['id', 'token', 'type'],
      },
      defer: {
        type: '(isPrivate?: boolean) => Promise<void>',
        comment: [
          'Defer the interaction for updating the response at a later time with {@link edit}.',
          '',
          '@remarks',
          'This will send a {@link InteractionResponseTypes.DeferredChannelMessageWithSource} response.',
        ],
        dependencies: ['id', 'token', 'type'],
      },
      delete: {
        type: '(messageId?: import("@discordeno/types").BigString) => Promise<void>',
        comment: ['Delete the original interaction response or a followup if the message id is provided.'],
        dependencies: ['token', 'type'],
      },
      premiumRequired: {
        type: '() => Promise<void>',
        comment: [
          'Sends a response with an upgrade button.',
          '',
          '@remarks',
          'This will send a {@link InteractionResponseTypes.PremiumRequired} response.',
          '',
          'This can be used only with applications that have monetization enabled.',
        ],
        dependencies: ['type', 'token', 'id'],
      },
    },
  },
  interactionDataResolved: {
    name: 'InteractionDataResolved',
    proprieties: {
      messages: {
        type: 'import("@discordeno/utils").Collection<bigint, Message>',
        optional: true,
      },
      users: {
        type: 'import("@discordeno/utils").Collection<bigint, User>',
        optional: true,
      },
      members: {
        type: 'import("@discordeno/utils").Collection<bigint, Member>',
        optional: true,
      },
      roles: {
        type: 'import("@discordeno/utils").Collection<bigint, Role>',
        optional: true,
      },
      channels: {
        type: 'import("@discordeno/utils").Collection<bigint, { id: bigint; name: string; type: import("@discordeno/types").ChannelTypes; permissions: bigint; }>',
        optional: true,
      },
      attachments: {
        type: 'import("@discordeno/utils").Collection<bigint, Attachment>',
        optional: true,
      },
    },
    withoutDesiredProprietySupport: true,
  },
  interactionDataOption: {
    name: 'InteractionDataOption',
    proprieties: {
      name: {
        type: 'string',
      },
      type: {
        type: 'import("@discordeno/types").ApplicationCommandOptionTypes',
      },
      value: {
        type: ['string', 'number', 'boolean'],
        optional: true,
      },
      options: {
        type: 'InteractionDataOption',
        optional: true,
        array: true,
      },
      focused: {
        type: 'boolean',
        optional: true,
      },
    },
    withoutDesiredProprietySupport: true,
  },
  invite: {
    name: 'Invite',
    proprieties: {
      channelId: {
        type: 'bigint',
        comment: ['The channel the invite is for'],
      },
      code: {
        type: 'string',
        comment: ['The unique invite code'],
      },
      createdAt: {
        type: 'number',
        comment: ['The time at which the invite was created'],
      },
      guildId: {
        type: 'bigint',
        optional: true,
        comment: ['The guild of the invite'],
      },
      inviter: {
        type: 'User',
        optional: true,
        comment: ['The user that created the invite'],
      },
      maxAge: {
        type: 'number',
        comment: ['How long the invite is valid for (in seconds)'],
      },
      maxUses: {
        type: 'number',
        comment: ['The maximum number of times the invite can be used'],
      },
      targetType: {
        type: 'number',
        comment: ['The type of target for this voice channel invite'],
      },
      targetUser: {
        type: 'User',
        comment: ['The target user for this invite'],
      },
      targetApplication: {
        type: 'Application',
        optional: true,
        comment: ['The embedded application to open for this voice channel embedded application invite'],
      },
      temporary: {
        type: 'boolean',
        comment: ["Whether or not the invite is temporary (invited users will be kicked on disconnect unless they're assigned a role)"],
      },
      uses: {
        type: 'number',
        comment: ['How many times the invite has been used (always will be 0)'],
      },
      approximateMemberCount: {
        type: 'number',
        comment: ['Approximate count of online members (only present when target_user is set)'],
      },
      stageInstance: {
        type: 'InviteStageInstance',
        optional: true,
        comment: ['Stage instance data if there is a public Stage instance in the Stage channel this invite is for'],
      },
      expiresAt: {
        type: 'number',
        optional: true,
        comment: ['The expiration date of this invite, returned from the GET /invites/code endpoint when with_expiration is true'],
      },
      guildScheduledEvent: {
        type: 'ScheduledEvent',
        optional: true,
        comment: ['guild scheduled event data'],
      },
      approximatePresenceCount: {
        type: 'number',
        optional: true,
        comment: ['Approximate count of online members (only present when target_user is set)'],
      },
    },
  },
  member: {
    name: 'Member',
    proprieties: {
      id: {
        type: 'bigint',
        comment: ['The user id of the member.'],
      },
      toggles: {
        type: 'import("../index.js").MemberToggles',
        optional: true,
        comment: ['The compressed form of all the boolean values on this user.'],
      },
      guildId: {
        type: 'bigint',
        comment: ['The guild id where this member is.'],
      },
      user: {
        type: 'User',
        optional: true,
        comment: ['The user this guild member represents'],
      },
      nick: {
        type: 'string',
        optional: true,
        comment: ['This users guild nickname'],
      },
      avatar: {
        type: 'bigint',
        optional: true,
        comment: ['The members custom avatar for this server.'],
      },
      roles: {
        type: 'bigint',
        array: true,
        comment: ['Array of role object ids'],
      },
      joinedAt: {
        type: 'number',
        comment: ['When the user joined the guild'],
      },
      premiumSince: {
        type: 'number',
        optional: true,
        comment: ['When the user started boosting the guild'],
      },
      permissions: {
        type: 'import("../index.js").Permissions',
        optional: true,
        comment: ['The permissions this member has in the guild. Only present on interaction events.'],
      },
      communicationDisabledUntil: {
        type: 'number',
        optional: true,
        comment: [
          "when the user's timeout will expire and the user will be able to communicate in the guild again (set null to remove timeout), null or a time in the past if the user is not timed out",
        ],
      },
      deaf: {
        type: 'boolean',
        optional: true,
        comment: ['Whether the user is deafened in voice channels'],
      },
      mute: {
        type: 'boolean',
        optional: true,
        comment: ['Whether the user is muted in voice channels'],
      },
      pending: {
        type: 'boolean',
        optional: true,
        comment: ["Whether the user has not yet passed the guild's Membership Screening requirements"],
      },
    },
  },
  message: {
    name: 'Message',
    proprieties: {
      bitfield: {
        type: 'import("../index.js").ToggleBitfield',
        optional: true,
        comment: ['Holds all the boolean values on this message.'],
        alwaysPresent: true,
      },
      crossposted: {
        type: 'boolean',
        comment: ['Whether this message has been published to subscribed channels (via Channel Following)'],
        alwaysPresent: true,
      },
      ephemeral: {
        type: 'boolean',
        comment: ['Whether this message is only visible to the user who invoked the Interaction'],
        alwaysPresent: true,
      },
      failedToMentionSomeRolesInThread: {
        type: 'boolean',
        comment: ['Whether this message failed to mention some roles and add their members to the thread'],
        alwaysPresent: true,
      },
      flags: {
        type: 'import("../index.js").ToggleBitfield',
        optional: true,
        comment: ['Message flags combined as a bitfield'],
        alwaysPresent: true,
      },
      hasThread: {
        type: 'boolean',
        comment: ['Whether this message has an associated thread, with the same id as the message'],
        alwaysPresent: true,
      },
      isCrosspost: {
        type: 'boolean',
        comment: ['Whether this message originated from a message in another channel (via Channel Following)'],
        alwaysPresent: true,
      },
      loading: {
        type: 'boolean',
        comment: ['Whether this message is an Interaction Response and the bot is "thinking"'],
        alwaysPresent: true,
      },
      mentionedUserIds: {
        type: 'bigint',
        array: true,
        comment: ['The ids of the users who were mentioned in this message.'],
        dependencies: ['mentions'],
      },
      mentionEveryone: {
        type: 'boolean',
        comment: ['Whether this message mentions everyone'],
        alwaysPresent: true,
      },
      pinned: {
        type: 'boolean',
        comment: ['Whether this message is pinned'],
        alwaysPresent: true,
      },
      sourceMessageDeleted: {
        type: 'boolean',
        comment: ['Whether the source message for this crosspost has been deleted (via Channel Following)'],
        alwaysPresent: true,
      },
      suppressEmbeds: {
        type: 'boolean',
        comment: ['Whether do not include any embeds when serializing this message'],
        alwaysPresent: true,
      },
      suppressNotifications: {
        type: 'boolean',
        comment: ['Whether this message will not trigger push and desktop notifications'],
        alwaysPresent: true,
      },
      timestamp: {
        type: 'number',
        comment: ['The timestamp in milliseconds when this message was created'],
        dependencies: ['id'],
      },
      tts: {
        type: 'boolean',
        comment: ['Whether this was a TTS message.'],
        alwaysPresent: true,
      },
      urgent: {
        type: 'boolean',
        comment: ['Whether this message came from the urgent message system'],
        alwaysPresent: true,
      },
      activity: {
        type: {
          type: {
            type: 'import("@discordeno/types").MessageActivityTypes',
            comment: ['Type of message activity'],
          },
          partyId: {
            type: 'string',
            optional: true,
            comment: ['party_id from a Rich Presence event'],
          },
        },
        optional: true,
        comment: ['Sent with Rich Presence-related chat embeds'],
      },
      applicationId: {
        type: 'bigint',
        optional: true,
        comment: ['if the message is an Interaction or application-owned webhook, this is the id of the application'],
      },
      attachments: {
        type: 'Attachment',
        optional: true,
        array: true,
        comment: ['Any attached files on this message.'],
      },
      author: {
        type: 'User',
        comment: [
          "The author of this message (not guaranteed to be a valid user) Note: The author object follows the structure of the user object, but is only a valid user in the case where the message is generated by a user or bot user. If the message is generated by a webhook, the author object corresponds to the webhook's id, username, and avatar. You can tell if a message is generated by a webhook by checking for the webhook_id on the message object.",
        ],
      },
      channelId: {
        type: 'bigint',
        comment: ['id of the channel the message was sent in'],
      },
      components: {
        type: 'Component',
        array: true,
        comment: ['The components related to this message'],
      },
      content: {
        type: 'string',
        comment: ['Contents of the message'],
      },
      editedTimestamp: {
        type: 'number',
        optional: true,
        comment: ['The timestamp in milliseconds when this message was edited last.'],
      },
      embeds: {
        type: 'Embed',
        optional: true,
        array: true,
        comment: ['Any embedded content'],
      },
      guildId: {
        type: 'bigint',
        optional: true,
        comment: [
          'id of the guild the message was sent in Note: For MESSAGE_CREATE and MESSAGE_UPDATE events, the message object may not contain a guild_id or member field since the events are sent directly to the receiving user and the bot who sent the message, rather than being sent through the guild like non-ephemeral messages.',
        ],
      },
      id: {
        type: 'bigint',
        comment: ['id of the message'],
      },
      interaction: {
        type: {
          id: {
            type: 'bigint',
            comment: ['Id of the interaction'],
          },
          member: {
            type: 'Member',
            optional: true,
            comment: ['The member who invoked the interaction in the guild'],
          },
          name: {
            type: 'string',
            comment: ['The name of the ApplicationCommand including the name of the subcommand/subcommand group'],
          },
          type: {
            type: 'import("@discordeno/types").InteractionTypes',
            comment: ['The type of interaction'],
          },
          user: {
            type: 'User',
            comment: ['The user who invoked the interaction'],
          },
        },
        optional: true,
        comment: ['Sent if the message is a response to an Interaction'],
      },
      member: {
        type: 'Member',
        optional: true,
        comment: [
          "Member properties for this message's author Note: The member object exists in MESSAGE_CREATE and MESSAGE_UPDATE events from text-based guild channels. This allows bots to obtain real-time member data without requiring bots to store member state in memory.",
        ],
      },
      mentions: {
        type: 'User',
        optional: true,
        array: true,
        comment: [
          'Users specifically mentioned in the message Note: The user objects in the mentions array will only have the partial member field present in MESSAGE_CREATE and MESSAGE_UPDATE events from text-based guild channels.',
        ],
      },
      mentionedChannelIds: {
        type: 'bigint',
        optional: true,
        array: true,
        comment: [
          'Channels specifically mentioned in this message Note: Not all channel mentions in a message will appear in mention_channels. Only textual channels that are visible to everyone in a discoverable guild will ever be included. Only crossposted messages (via Channel Following) currently include mention_channels at all. If no mentions in the message meet these requirements, this field will not be sent.',
        ],
      },
      mentionedRoleIds: {
        type: 'bigint',
        optional: true,
        array: true,
        comment: ['Roles specifically mentioned in this message'],
      },
      messageReference: {
        type: {
          channelId: {
            type: 'bigint',
            optional: true,
            comment: [
              "id of the originating message's channel Note: channel_id is optional when creating a reply, but will always be present when receiving an event/response that includes this data model.",
            ],
          },
          guildId: {
            type: 'bigint',
            optional: true,
            comment: ["id of the originating message's guild"],
          },
          messageId: {
            type: 'bigint',
            optional: true,
            comment: ['id of the originating message'],
          },
        },
        optional: true,
        comment: ['Data showing the source of a crossposted channel follow add, pin or reply message'],
      },
      nonce: {
        type: ['string', 'number'],
        optional: true,
        comment: ['Used for validating a message was sent'],
      },
      reactions: {
        type: {
          me: {
            type: 'boolean',
            comment: ['Whether the current user reacted using this emoji'],
          },
          meBurst: {
            type: 'boolean',
            comment: ['Whether the current user super-reacted using this emoji'],
          },
          count: {
            type: 'number',
            comment: ['Times this emoji has been used to react'],
          },
          countDetails: {
            type: {
              burst: {
                type: 'number',
                comment: ['Count of super reactions'],
              },
              normal: {
                type: 'number',
                comment: ['Count of normal reactions'],
              },
            },
            comment: ['Reaction count details object'],
          },
          emoji: {
            type: 'Emoji',
            comment: ['Emoji information'],
          },
          burstColors: {
            type: 'string',
            array: true,
            comment: ['HEX colors used for super reaction'],
          },
        },
        optional: true,
        array: true,
        comment: ['Reactions on this message.'],
      },
      stickerItems: {
        type: {
          id: {
            type: 'bigint',
            comment: ['The id of this sticker.'],
          },
          name: {
            type: 'string',
            comment: ['The name of this sticker.'],
          },
          formatType: {
            type: 'import("@discordeno/types").StickerFormatTypes',
            comment: ['The type of this stickers format.'],
          },
        },
        optional: true,
        array: true,
        comment: ['Sent if the message contains stickers'],
      },
      type: {
        type: 'import("@discordeno/types").MessageTypes',
        comment: ['Type of message'],
      },
      thread: {
        type: 'Channel',
        optional: true,
        comment: ['The thread that was started from this message, includes thread member object'],
      },
      webhookId: {
        type: 'bigint',
        optional: true,
        comment: ["If the message is generated by a webhook, this is the webhook's id"],
      },
    },
  },
  guildOnboarding: {
    name: 'GuildOnboarding',
    proprieties: {
      guildId: {
        type: 'bigint',
        comment: ['ID of the guild this onboarding is part of'],
      },
      prompts: {
        type: 'GuildOnboardingPrompt',
        array: true,
        comment: ['Prompts shown during onboarding and in customize community'],
      },
      defaultChannelIds: {
        type: 'bigint',
        array: true,
        comment: ['Channel IDs that members get opted into automatically'],
      },
      enabled: {
        type: 'boolean',
        comment: ['Whether onboarding is enabled in the guild'],
      },
      mode: {
        type: 'import("@discordeno/types").DiscordGuildOnboardingMode',
        comment: ['Current mode of onboarding'],
      },
    },
  },
  guildOnboardingPrompt: {
    name: 'GuildOnboardingPrompt',
    proprieties: {
      id: {
        type: 'bigint',
        comment: ['ID of the prompt'],
      },
      type: {
        type: 'import("@discordeno/types").DiscordGuildOnboardingPromptType',
        comment: ['Type of prompt'],
      },
      options: {
        type: 'GuildOnboardingPromptOption',
        array: true,
        comment: ['Options available within the prompt'],
      },
      title: {
        type: 'string',
        comment: ['Title of the prompt'],
      },
      singleSelect: {
        type: 'boolean',
        comment: ['Indicates whether users are limited to selecting one option for the prompt'],
      },
      required: {
        type: 'boolean',
        comment: ['Indicates whether the prompt is required before a user completes the onboarding flow'],
      },
      inOnboarding: {
        type: 'boolean',
        comment: [
          'Indicates whether the prompt is present in the onboarding flow. If `false`, the prompt will only appear in the Channels & Roles tab',
        ],
      },
    },
  },
  guildOnboardingPromptOption: {
    name: 'GuildOnboardingPromptOption',
    proprieties: {
      id: {
        type: 'bigint',
        comment: ['ID of the prompt option'],
      },
      channelIds: {
        type: 'bigint',
        array: true,
        comment: ['IDs for channels a member is added to when the option is selected'],
      },
      roleIds: {
        type: 'bigint',
        array: true,
        comment: ['IDs for roles assigned to a member when the option is selected'],
      },
      emoji: {
        type: 'Emoji',
        comment: ['Emoji of the option'],
      },
      title: {
        type: 'string',
        comment: ['Title of the option'],
      },
      description: {
        type: ['string', 'undefined'],
        comment: ['Description of the option'],
      },
    },
  },
  presenceUpdate: {
    name: 'PresenceUpdate',
    proprieties: {
      desktop: {
        type: 'string',
        optional: true,
      },
      mobile: {
        type: 'string',
        optional: true,
      },
      web: {
        type: 'string',
        optional: true,
      },
      user: {
        type: 'User',
      },
      guildId: {
        type: 'bigint',
      },
      status: {
        type: 'import("@discordeno/types").PresenceStatus',
      },
      activities: {
        type: 'Activity',
        array: true,
      },
    },
    withoutDesiredProprietySupport: true,
  },
  role: {
    name: 'Role',
    proprieties: {
      tags: {
        type: {
          botId: {
            type: 'bigint',
            optional: true,
            comment: ['The id of the bot this role belongs to'],
          },
          integrationId: {
            type: 'bigint',
            optional: true,
            comment: ['The id of the integration this role belongs to'],
          },
          subscriptionListingId: {
            type: 'bigint',
            optional: true,
            comment: ["Id of this role's subscription sku and listing."],
          },
          availableForPurchase: {
            type: 'boolean',
            optional: true,
            comment: ['Whether this role is available for purchase.'],
          },
          guildConnections: {
            type: 'boolean',
            optional: true,
            comment: ["Whether this is a guild's linked role"],
          },
          premiumSubscriber: {
            type: 'boolean',
            optional: true,
            comment: ["Whether this is the guild's premium subscriber role"],
          },
        },
        optional: true,
        comment: ['The tags this role has'],
      },
      premiumSubscriber: {
        type: 'boolean',
        comment: ['Whether this is the guilds premium subscriber role'],
      },
      availableForPurchase: {
        type: 'boolean',
        comment: ['Whether this role is available for purchase.'],
      },
      guildConnections: {
        type: 'boolean',
        comment: ["Whether this is a guild's linked role."],
      },
      id: {
        type: 'bigint',
        comment: ['Role id'],
      },
      guildId: {
        type: 'bigint',
        comment: ['The guild id where this role is located.'],
      },
      toggles: {
        type: 'import("../index.js").RoleToggles',
        optional: true,
        comment: ['The compressed version of the boolean values on this role.'],
      },
      hoist: {
        type: 'boolean',
        comment: ['If this role is showed separately in the user listing'],
      },
      permissions: {
        type: 'import("../index.js").Permissions',
        comment: ['Permission bit set'],
      },
      managed: {
        type: 'boolean',
        comment: ['Whether this role is managed by an integration'],
      },
      mentionable: {
        type: 'boolean',
        comment: ['Whether this role is mentionable'],
      },
      icon: {
        type: 'bigint',
        optional: true,
        comment: ['the role emoji hash'],
      },
      name: {
        type: 'string',
        comment: ['Role name'],
      },
      color: {
        type: 'number',
        comment: ['Integer representation of hexadecimal color code'],
      },
      position: {
        type: 'number',
        comment: ['Position of this role'],
      },
      unicodeEmoji: {
        type: 'string',
        optional: true,
        comment: ['role unicode emoji'],
      },
      flags: {
        type: 'import("@discordeno/types").RoleFlags',
        comment: ['Role flags combined as a bitfield'],
      },
    },
  },
  scheduledEvent: {
    name: 'ScheduledEvent',
    proprieties: {
      id: {
        type: 'bigint',
        comment: ['the id of the scheduled event'],
      },
      guildId: {
        type: 'bigint',
        comment: ['the guild id which the scheduled event belongs to'],
      },
      channelId: {
        type: 'bigint',
        optional: true,
        comment: ['the channel id in which the scheduled event will be hosted if specified'],
      },
      creatorId: {
        type: 'bigint',
        optional: true,
        comment: ['the id of the user that created the scheduled event'],
      },
      name: {
        type: 'string',
        comment: ['the name of the scheduled event'],
      },
      description: {
        type: 'string',
        optional: true,
        comment: ['the description of the scheduled event'],
      },
      scheduledStartTime: {
        type: 'number',
        comment: ['the time the scheduled event will start'],
      },
      scheduledEndTime: {
        type: 'number',
        optional: true,
        comment: ['the time the scheduled event will end if it does end.'],
      },
      privacyLevel: {
        type: 'import("@discordeno/types").ScheduledEventPrivacyLevel',
        comment: ['the privacy level of the scheduled event'],
      },
      status: {
        type: 'import("@discordeno/types").ScheduledEventStatus',
        comment: ['the status of the scheduled event'],
      },
      entityType: {
        type: 'import("@discordeno/types").ScheduledEventEntityType',
        comment: ['the type of hosting entity associated with a scheduled event'],
      },
      entityId: {
        type: 'bigint',
        optional: true,
        comment: ['any additional id of the hosting entity associated with event'],
      },
      location: {
        type: "import('@discordeno/types').DiscordScheduledEventEntityMetadata['location']",
        optional: true,
        comment: ['the location for the scheduled event'],
      },
      creator: {
        type: 'User',
        optional: true,
        comment: ['the user that created the scheduled event'],
      },
      userCount: {
        type: 'number',
        optional: true,
        comment: ['the number of users subscribed to the scheduled event'],
      },
      image: {
        type: 'bigint',
        optional: true,
        comment: ['the cover image hash of the scheduled event'],
      },
    },
  },
  sku: {
    name: 'Sku',
    proprieties: {
      id: {
        type: 'bigint',
        comment: ['ID of SKU'],
      },
      type: {
        type: 'import("@discordeno/types").DiscordSkuType',
        comment: ['Type of SKU'],
      },
      applicationId: {
        type: 'bigint',
        comment: ['ID of the parent application'],
      },
      name: {
        type: 'string',
        comment: ['Customer-facing name of your premium offering'],
      },
      slug: {
        type: 'string',
        comment: ["System-generated URL slug based on the SKU's name"],
      },
      flags: {
        type: 'import("@discordeno/types").DiscordSkuFlag',
        comment: ['SKU flags combined as a bitfield'],
      },
    },
  },
  stageInstance: {
    name: 'StageInstance',
    proprieties: {
      topic: {
        type: 'string',
        comment: ['The topic of the Stage instance (1-120 characters)'],
      },
      id: {
        type: 'bigint',
        comment: ['The id of this Stage instance'],
      },
      guildId: {
        type: 'bigint',
        comment: ['The guild id of the associated Stage channel'],
      },
      channelId: {
        type: 'bigint',
        comment: ['The id of the associated Stage channel'],
      },
      guildScheduledEventId: {
        type: 'bigint',
        optional: true,
        comment: ['The id of the scheduled event for this Stage instance'],
      },
    },
  },
  inviteStageInstance: {
    name: 'InviteStageInstance',
    proprieties: {
      members: {
        type: 'Partial<Member>',
        array: true,
        comment: ['The members speaking in the Stage'],
      },
      participantCount: {
        type: 'number',
        comment: ['The number of users in the Stage'],
      },
      speakerCount: {
        type: 'number',
        comment: ['The number of users speaking in the Stage'],
      },
      topic: {
        type: 'string',
        comment: ['The topic of the Stage instance (1-120 characters)'],
      },
    },
  },
  sticker: {
    name: 'Sticker',
    proprieties: {
      id: {
        type: 'bigint',
        comment: ['[Id of the sticker](https://discord.com/developers/docs/reference#image-formatting)'],
      },
      packId: {
        type: 'bigint',
        optional: true,
        comment: ['Id of the pack the sticker is from'],
      },
      name: {
        type: 'string',
        comment: ['Name of the sticker'],
      },
      description: {
        type: 'string',
        comment: ['Description of the sticker'],
      },
      tags: {
        type: 'string',
        comment: ["a unicode emoji representing the sticker's expression"],
      },
      type: {
        type: 'import("@discordeno/types").StickerTypes',
        comment: ['[type of sticker](https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-types)'],
      },
      formatType: {
        type: 'import("@discordeno/types").StickerFormatTypes',
        comment: ['[Type of sticker format](https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-format-types)'],
      },
      available: {
        type: 'boolean',
        optional: true,
        comment: ['Whether or not the sticker is available'],
      },
      guildId: {
        type: 'bigint',
        optional: true,
        comment: ['Id of the guild that owns this sticker'],
      },
      user: {
        type: 'User',
        optional: true,
        comment: ['The user that uploaded the sticker'],
      },
      sortValue: {
        type: 'number',
        optional: true,
        comment: ["A sticker's sort order within a pack"],
      },
    },
  },
  stickerPack: {
    name: 'StickerPack',
    proprieties: {
      coverStickerId: {
        type: 'bigint',
        optional: true,
      },
      bannerAssetId: {
        type: 'bigint',
        optional: true,
      },
      id: {
        type: 'bigint',
      },
      name: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
      stickers: {
        type: 'Sticker',
        array: true,
      },
      skuId: {
        type: 'bigint',
      },
    },
    withoutDesiredProprietySupport: true,
  },
  team: {
    name: 'Team',
    proprieties: {
      icon: {
        type: ['bigint', 'undefined'],
        optional: true,
      },
      id: {
        type: 'bigint',
      },
      name: {
        type: 'string',
      },
      ownerUserId: {
        type: 'bigint',
      },
      members: {
        type: {
          membershipState: {
            type: 'import("@discordeno/types").TeamMembershipStates',
          },
          teamId: {
            type: 'bigint',
          },
          user: {
            type: 'User',
          },
          role: {
            type: 'import("@discordeno/types").DiscordTeamMemberRole',
          },
        },
        array: true,
      },
    },
    withoutDesiredProprietySupport: true,
  },
  template: {
    name: 'Template',
    proprieties: {
      description: {
        type: ['string', 'null'],
        optional: true,
      },
      isDirty: {
        type: 'boolean',
        optional: true,
      },
      name: {
        type: 'string',
      },
      creatorId: {
        type: 'bigint',
      },
      createdAt: {
        type: 'number',
      },
      code: {
        type: 'string',
      },
      usageCount: {
        type: 'number',
      },
      creator: {
        type: 'User',
      },
      updatedAt: {
        type: 'number',
      },
      sourceGuildId: {
        type: 'bigint',
      },
      serializedSourceGuild: {
        type: "NonNullable<import('@discordeno/types').DiscordTemplate['serialized_source_guild']>",
      },
    },
    withoutDesiredProprietySupport: true,
  },
  threadMember: {
    name: 'ThreadMember',
    proprieties: {
      id: {
        type: 'bigint',
        optional: true,
      },
      userId: {
        type: 'bigint',
        optional: true,
      },
      flags: {
        type: 'number',
      },
      joinTimestamp: {
        type: 'number',
      },
    },
    withoutDesiredProprietySupport: true,
  },
  threadMemberGuildCreate: {
    name: 'ThreadMemberGuildCreate',
    proprieties: {
      joinTimestamp: {
        type: 'number',
      },
    },
    withoutDesiredProprietySupport: true,
  },
  user: {
    name: 'User',
    proprieties: {
      tag: {
        type: 'string',
        comment: ['The user tag in the form of username#discriminator'],
        dependencies: ['username', 'discriminator'],
      },
      bot: {
        type: 'boolean',
        comment: ['Whether the user belongs to an OAuth2 application'],
      },
      system: {
        type: 'boolean',
        comment: ['Whether the user is an Official Discord System user (part of the urgent message system)'],
      },
      mfaEnabled: {
        type: 'boolean',
        comment: ['Whether the user has two factor enabled on their account'],
      },
      verified: {
        type: 'boolean',
        comment: ['Whether the email on this account has been verified'],
      },
      toggles: {
        type: 'import("../index.js").UserToggles',
        optional: true,
        comment: ['Compressed version of all the booleans on a user.'],
      },
      username: {
        type: 'string',
        comment: ["The user's username, not unique across the platform"],
      },
      globalName: {
        type: 'string',
        optional: true,
        comment: ["The user's display name, if it is set. For bots, this is the application name"],
      },
      locale: {
        type: 'string',
        optional: true,
        comment: ["The user's chosen language option"],
      },
      flags: {
        type: 'import("../index.js").ToggleBitfield',
        optional: true,
        comment: ["The flags on a user's account"],
      },
      premiumType: {
        type: 'import("@discordeno/types").PremiumTypes',
        optional: true,
        comment: ["The type of Nitro subscription on a user's account"],
      },
      publicFlags: {
        type: 'import("../index.js").ToggleBitfield',
        optional: true,
        comment: ["The public flags on a user's account"],
      },
      accentColor: {
        type: 'number',
        optional: true,
        comment: ["the user's banner color encoded as an integer representation of hexadecimal color code"],
      },
      id: {
        type: 'bigint',
        comment: ["The user's id"],
      },
      discriminator: {
        type: 'string',
        comment: ["The user's discord-tag"],
      },
      avatar: {
        type: 'bigint',
        optional: true,
        comment: ["The user's avatar hash"],
      },
      email: {
        type: 'string',
        optional: true,
        comment: ["The user's email"],
      },
      banner: {
        type: 'bigint',
        optional: true,
        comment: ["the user's banner, or null if unset"],
      },
      avatarDecoration: {
        type: 'bigint',
        optional: true,
        comment: ["the user's avatar decoration, or null if unset"],
      },
    },
  },
  voiceRegion: {
    name: 'VoiceRegion',
    proprieties: {
      id: {
        type: 'string',
      },
      name: {
        type: 'string',
      },
      custom: {
        type: 'boolean',
      },
      optimal: {
        type: 'boolean',
      },
      deprecated: {
        type: 'boolean',
      },
    },
    withoutDesiredProprietySupport: true,
  },
  voiceState: {
    name: 'VoiceState',
    proprieties: {
      requestToSpeakTimestamp: {
        type: 'number',
        optional: true,
      },
      channelId: {
        type: 'bigint',
        optional: true,
      },
      guildId: {
        type: 'bigint',
      },
      toggles: {
        type: 'import("../index.js").VoiceStateToggles',
      },
      sessionId: {
        type: 'string',
      },
      userId: {
        type: 'bigint',
      },
    },
  },
  webhook: {
    name: 'Webhook',
    proprieties: {
      type: {
        type: 'import("@discordeno/types").WebhookTypes',
        comment: ['The type of the webhook'],
      },
      token: {
        type: 'string',
        optional: true,
        comment: ['The secure token of the webhook (returned for Incoming Webhooks)'],
      },
      url: {
        type: 'string',
        optional: true,
        comment: ['The url used for executing the webhook (returned by the webhooks OAuth2 flow)'],
      },
      id: {
        type: 'bigint',
        comment: ['The id of the webhook'],
      },
      guildId: {
        type: 'bigint',
        optional: true,
        comment: ['The guild id this webhook is for'],
      },
      channelId: {
        type: 'bigint',
        optional: true,
        comment: ['The channel id this webhook is for'],
      },
      user: {
        type: 'User',
        optional: true,
        comment: ['The user this webhook was created by (not returned when getting a webhook with its token)'],
      },
      name: {
        type: 'string',
        optional: true,
        comment: ['The default name of the webhook'],
      },
      avatar: {
        type: 'bigint',
        optional: true,
        comment: ['The default user avatar hash of the webhook'],
      },
      applicationId: {
        type: 'bigint',
        optional: true,
        comment: ['The bot/OAuth2 application that created this webhook'],
      },
      sourceGuild: {
        type: 'Partial<Guild>',
        optional: true,
        comment: ['The guild of the channel that this webhook is following (returned for Channel Follower Webhooks)'],
      },
      sourceChannel: {
        type: 'Partial<Channel>',
        optional: true,
        comment: ['The channel that this webhook is following (returned for Channel Follower Webhooks)'],
      },
    },
  },
  welcomeScreen: {
    name: 'WelcomeScreen',
    proprieties: {
      description: {
        type: 'string',
        optional: true,
      },
      welcomeChannels: {
        type: {
          channelId: {
            type: 'bigint',
          },
          description: {
            type: 'string',
          },
          emojiId: {
            type: 'bigint',
            optional: true,
          },
          emojiName: {
            type: 'string',
            optional: true,
          },
        },
        array: true,
      },
    },
    withoutDesiredProprietySupport: true,
  },
  guildWidget: {
    name: 'GuildWidget',
    proprieties: {
      id: {
        type: 'bigint',
      },
      name: {
        type: 'string',
      },
      members: {
        type: {
          id: {
            type: 'bigint',
          },
          username: {
            type: 'string',
          },
          discriminator: {
            type: 'string',
          },
          avatar: {
            type: 'bigint',
            optional: true,
          },
          status: {
            type: 'string',
          },
          avatarUrl: {
            type: 'string',
          },
        },
        array: true,
      },
      channels: {
        type: {
          id: {
            type: 'bigint',
          },
          name: {
            type: 'string',
          },
          position: {
            type: 'number',
          },
        },
        array: true,
      },
      instant_invite: {
        type: 'string',
      },
      presenceCount: {
        type: 'number',
      },
    },
    withoutDesiredProprietySupport: true,
  },
  guildWidgetSettings: {
    name: 'GuildWidgetSettings',
    proprieties: {
      channelId: {
        type: 'string',
        optional: true,
      },
      enabled: {
        type: 'boolean',
      },
    },
    withoutDesiredProprietySupport: true,
  },
}

export default transformers

/** @internal */
export interface TransformerInformation {
  /** The name for the interface, should be in PascalCase */
  name: string
  /** The proprieties that the interface is composed of */
  proprieties: Record<string, TransformerObjectProprieties>
  /** Comment for the transformer type */
  comment?: string[]
  withoutDesiredProprietySupport?: boolean
}

/** @internal */
export interface TransformerObjectProprieties {
  /** The type of the propriety, may use the `import('...')` syntax to import types */
  type: string | Record<string, TransformerObjectProprieties> | Array<string | TransformerUnionTypes>
  /** Array of comment lines to build the comment */
  comment?: string[]
  /** Whatever the propriety should with be marked with a `?` on the type name, this does not add a null or undefined union */
  optional?: boolean
  /** Whatever the propriety should be wrapper with `Array<...>` */
  array?: boolean
  /** The desired proprieties this depends on */
  dependencies?: string[]
  /** Whatever this propriety is always present */
  alwaysPresent?: boolean
}

/** @internal */
export interface TransformerUnionTypes {
  /** The type that composes this option of the union */
  type: string | Record<string, TransformerObjectProprieties>
  /** Whatever the propriety should be wrapper with `Array<...>` */
  array?: boolean
}
