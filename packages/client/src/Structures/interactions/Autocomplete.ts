/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable no-useless-call */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { BigString, DiscordInteraction, DiscordInteractionData } from '@discordeno/types'
import { InteractionResponseTypes } from '@discordeno/types'
import type Client from '../../Client.js'
import type { ApplicationCommandOptionChoice } from '../../typings.js'
import type NewsChannel from '../channels/News.js'
import type PrivateChannel from '../channels/Private.js'
import type TextChannel from '../channels/Text.js'
import type Guild from '../guilds/Guild.js'
import Member from '../guilds/Member.js'
import Permission from '../Permission.js'
import User from '../users/User.js'
import Interaction from './Interaction.js'

export class AutocompleteInteraction extends Interaction {
  /** The guild id if this interaction occurred in a guild. */
  guildID?: BigString
  /** The permissions the app or bot has within the channel, the interaction was sent from. */
  appPermissions?: Permission
  /** The channel id where this interaction was created in. */
  channelID: BigString
  /** The user who triggered the interaction. */
  user: User
  /** The data attached to this interaction. */
  data?: DiscordInteractionData
  /** The member who triggered the interaction. Sent when used in a guild. */
  member?: Member

  constructor(data: DiscordInteraction, client: Client) {
    super(data, client)

    this.channelID = data.channel_id!
    this.data = data.data

    if (data.guild_id !== undefined) {
      this.guildID = data.guild_id
    }

    if (data.member !== undefined && this.guild) {
      this.member = new Member(data.member, this.guild, this.client)
      this.guild.members.set(this.member.id, this.member)
    }

    this.user = new User(data.user ?? data.member!.user, this.client)
    this.client.users.set(this.user.id, this.user)

    if (data.app_permissions !== undefined) {
      this.appPermissions = new Permission(data.app_permissions)
    }
  }

  /** The channel the interaction was created in. */
  get channel(): PrivateChannel | TextChannel | NewsChannel {
    return this.client.getChannel(this.channelID) as PrivateChannel | TextChannel | NewsChannel
  }

  /** The guild the interaction was created in. */
  get guild(): Guild | undefined {
    return this.guildID ? this.client.guilds.get(this.guildID) : undefined
  }

  async acknowledge(choices: ApplicationCommandOptionChoice[]) {
    return await this.result(choices)
  }

  async result(choices: ApplicationCommandOptionChoice[]) {
    if (this.acknowledged) throw new Error('You have already acknowledged this interaction.')

    return this.client.createInteractionResponse
      .call(this.client, this.id, this.token, {
        type: InteractionResponseTypes.ApplicationCommandAutocompleteResult,
        data: { choices },
      })
      .then(() => this.update())
  }
}

export default AutocompleteInteraction
