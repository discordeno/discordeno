import { ApplicationCommandOptionTypes, ApplicationCommandTypes, ButtonStyles, InteractionTypes, type DiscordInteraction } from '@discordeno/types'
import { expect } from 'chai'
import { describe, it } from 'mocha'
import { commandOptionsParser } from '../src/interactions.js'

describe('Convert interaction to args', () => {
  it('interaction without data property handling', () => {
    const foo = commandOptionsParser({
      id: '',
      token: '',
      application_id: '',
      type: InteractionTypes.ApplicationCommand,
      version: 1,
      app_permissions: '',
    })
    expect(Object.keys(foo).length).equals(0)
  })

  it('interaction data without any options', () => {
    const foo = commandOptionsParser({
      id: '',
      token: '',
      application_id: '',
      type: InteractionTypes.ApplicationCommand,
      version: 1,
      app_permissions: '',
      data: {
        id: "",
        name: "",
        type: ApplicationCommandTypes.ChatInput,
      },
    })
    expect(Object.keys(foo).length).equals(0)
  })

  it('should convert commands', () => {
    const interaction: DiscordInteraction = {
      id: '',
      token: '',
      application_id: '',
      type: InteractionTypes.ApplicationCommand,
      version: 1,
      app_permissions: '',
      data: {
        id: '',
        name: 'roles',
        type: ApplicationCommandTypes.ChatInput,
        resolved: {
          attachments: {
            '123': {
              filename: 'idl',
              id: '123',
              proxy_url: 'https://discordeno.js/org',
              size: 100,
              url: 'https://discordeno.js.org',
            },
          },
          channels: {
            '123': {
              id: '123',
              type: 0,
            },
          },
          members: {
            '123': {
              roles: ['123'],
              nick: '123',
              permissions: '123',
              joined_at: new Date().toISOString(),
            },
            '456': {
              roles: ['456'],
              nick: '456',
              permissions: '456',
              joined_at: new Date().toISOString(),
            },
          },
          roles: {
            '123': {
              id: '123',
              hoist: true,
              permissions: '123',
              managed: true,
              mentionable: true,
              name: '123',
              position: 123,
              color: 0,
            },
          },
          users: {
            '123': {
              id: '123',
              username: '123',
              discriminator: '1234',
              avatar: null,
            },
            '456': {
              id: '456',
              username: '456',
              discriminator: '4567',
              avatar: null,
            },
          },
        },
        options: [
          {
            name: 'reactions',
            type: ApplicationCommandOptionTypes.SubCommandGroup,
            options: [
              {
                name: 'create',
                type: ApplicationCommandOptionTypes.SubCommand,
                options: [
                  {
                    name: 'emoji',
                    type: ApplicationCommandOptionTypes.String,
                    value: '123',
                  },
                  {
                    name: 'role',
                    type: ApplicationCommandOptionTypes.Role,
                    value: '123',
                  },
                  {
                    name: 'color',
                    type: ApplicationCommandOptionTypes.String,
                    value: ButtonStyles.Primary,
                  },
                  {
                    name: 'name',
                    type: ApplicationCommandOptionTypes.String,
                    value: 'discordeno',
                  },
                ],
              },
              {
                name: 'delete',
                type: ApplicationCommandOptionTypes.SubCommand,
                options: [
                  {
                    name: 'name',
                    type: ApplicationCommandOptionTypes.String,
                    value: 'discordeno',
                  },
                  {
                    name: 'number',
                    type: ApplicationCommandOptionTypes.Integer,
                    value: 123,
                  },
                ],
              },
            ],
          },
          {
            name: 'foo',
            type: ApplicationCommandOptionTypes.SubCommandGroup,
            options: [
              {
                name: 'bar',
                type: ApplicationCommandOptionTypes.SubCommand,
                options: [
                  {
                    name: 'channel',
                    type: ApplicationCommandOptionTypes.Channel,
                    value: '123',
                  },
                  {
                    name: 'user',
                    type: ApplicationCommandOptionTypes.User,
                    value: '123',
                  },
                  {
                    name: 'attachment',
                    type: ApplicationCommandOptionTypes.Attachment,
                    value: '123',
                  },
                  {
                    name: 'mentionable',
                    type: ApplicationCommandOptionTypes.Mentionable,
                    value: '123',
                  },
                  {
                    name: 'mentionable2',
                    type: ApplicationCommandOptionTypes.Mentionable,
                    value: '456',
                  },
                ],
              },
            ],
          },
        ],
      },
    }

    const args = commandOptionsParser(interaction)

    expect(args.reactions.create.emoji).equals('123')
    expect(args.reactions.create.role.id).equals('123')
    expect(args.reactions.create.color).equals(1)
    expect(args.reactions.create.name).equals('discordeno')
    expect(args.reactions.delete.name).equals('discordeno')
    expect(args.reactions.delete.number).equals(123)
    expect(args.foo.bar.channel.id).equals('123')
    expect(args.foo.bar.user.user.id).equals('123')
    expect(args.foo.bar.user.member.nick).equals('123')
    expect(args.foo.bar.attachment.id).equals('123')
    expect(args.foo.bar.mentionable.id).equals('123')
    expect(args.foo.bar.mentionable2.id).equals('456')
  })
})
