/* eslint-disable no-useless-call */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-dynamic-delete */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { DiscordenoShard, ShardState } from '@discordeno/gateway'
import type { DiscordGuildStickersUpdate, DiscordThreadMemberUpdate } from '@discordeno/types'
import {
  ActivityTypes,
  ChannelTypes,
  GatewayOpcodes,
  Intents,
  type Camelize,
  type DiscordChannel,
  type DiscordChannelPinsUpdate,
  type DiscordGatewayPayload,
  type DiscordGuild,
  type DiscordGuildBanAddRemove,
  type DiscordGuildEmojisUpdate,
  type DiscordGuildMemberAdd,
  type DiscordGuildMemberRemove,
  type DiscordGuildMembersChunk,
  type DiscordGuildMemberUpdate,
  type DiscordGuildRoleCreate,
  type DiscordGuildRoleDelete,
  type DiscordGuildRoleUpdate,
  type DiscordInteraction,
  type DiscordInviteCreate,
  type DiscordInviteDelete,
  type DiscordMember,
  type DiscordMessage,
  type DiscordMessageDelete,
  type DiscordMessageDeleteBulk,
  type DiscordMessageReactionAdd,
  type DiscordMessageReactionRemove,
  type DiscordMessageReactionRemoveAll,
  type DiscordMessageReactionRemoveEmoji,
  type DiscordPresenceUpdate,
  type DiscordReady,
  type DiscordStageInstance,
  type DiscordThreadListSync,
  type DiscordThreadMembersUpdate,
  type DiscordTypingStart,
  type DiscordUnavailableGuild,
  type DiscordUser,
  type DiscordVoiceState,
  type DiscordWebhookUpdate,
} from '@discordeno/types'
import { snakelize } from '@discordeno/utils'
import EventEmitter from 'node:events'
import type WebSocket from 'ws'
import Base from '../Base.js'
import type Client from '../Client.js'
import GuildChannel from '../Structures/channels/Guild.js'
import PrivateChannel from '../Structures/channels/Private.js'
import type StageChannel from '../Structures/channels/Stage.js'
import type TextChannel from '../Structures/channels/Text.js'
import type TextVoiceChannel from '../Structures/channels/TextVoice.js'
import ThreadMember from '../Structures/channels/threads/Member.js'
import ThreadChannel from '../Structures/channels/threads/Thread.js'
import type VoiceChannel from '../Structures/channels/Voice.js'
import Guild from '../Structures/guilds/Guild.js'
import Member from '../Structures/guilds/Member.js'
import Role from '../Structures/guilds/Role.js'
import StageInstance from '../Structures/guilds/StageInstance.js'
import UnavailableGuild from '../Structures/guilds/Unavailable.js'
import Invite from '../Structures/Invite.js'
import Message from '../Structures/Message.js'
import ExtendedUser from '../Structures/users/Extended.js'
import User from '../Structures/users/User.js'
import type {
  ActivityPartial,
  BotActivityType,
  ClientPresence,
  RequestGuildMembersOptions,
  RequestMembersPromise,
  SelfStatus,
  TextableChannel,
} from '../typings.js'
import type Bucket from '../utils/Bucket.js'
import { generateChannelFrom, generateInteractionFrom } from '../utils/generate.js'

export class Shard extends EventEmitter {
  client: Client
  connectAttempts: number = 0
  connectTimeout: number | null = null
  getAllUsersCount: { [guildID: string]: boolean } = {}
  getAllUsersLength: number = 0
  getAllUsersQueue: unknown[] = []
  globalBucket!: Bucket
  guildCreateTimeout: NodeJS.Timeout | null = null
  guildSyncQueue: string[] = []
  guildSyncQueueLength: number = 0
  id: number
  latency: number = 0
  preReady = false
  presence: ClientPresence = { activities: [], afk: false, status: 'online', since: 0 }
  presenceUpdateBucket!: Bucket
  ready = false
  reconnectInterval: number = 0
  requestMembersPromise: { [s: string]: RequestMembersPromise } = {}
  unsyncedGuilds: number = 0
  // ws: WebSocket | BrowserWebSocket | null = null

  discordeno: DiscordenoShard

  constructor(id: number, client: Client) {
    super()

    this.id = id
    this.client = client

    this.onPacket = this.onPacket.bind(this)
    this._onWSOpen = this._onWSOpen.bind(this)
    this._onWSMessage = this._onWSMessage.bind(this)
    this._onWSError = this._onWSError.bind(this)
    this._onWSClose = this._onWSClose.bind(this)

    this.discordeno = new DiscordenoShard({
      id: this.id,
      // TODO: shard events
      events: {
        message: (_, payload) => {
          this.wsEvent(snakelize(payload))
        },
      },
      connection: {
        compress: this.client.options.compress,
        intents: this.client.options.intents,
        properties: {
          os: process.platform,
          browser: 'Discordeno',
          device: 'Discordeno',
        },
        token: this.client.token,
        totalShards: this.client.options.maxShards as number,
        url: this.client.gatewayURL,
        version: this.client.apiVersion,
      },
    })

    this.hardReset()
  }

  /**
   * @deprecated Use .token instead.
   */
  get _token(): string {
    return this.token
  }

  get token(): string {
    return this.client.token
  }

  get connecting(): boolean {
    return this.discordeno.state === ShardState.Connecting
  }

  set connecting(connecting: boolean) {
    this.discordeno.state = ShardState.Connecting
  }

  get heartbeatInterval(): number {
    return this.discordeno.heart.interval
  }

  set heartbeatInterval(interval: number) {
    this.discordeno.heart.interval = interval
  }

  get lastHeartbeatAck(): boolean {
    return this.discordeno.heart.acknowledged
  }

  set lastHeartbeatAck(acknowledged: boolean) {
    this.discordeno.heart.acknowledged = acknowledged
  }

  get lastHeartbeatReceived(): number | undefined {
    return this.discordeno.heart.lastAck
  }

  set lastHeartbeatReceived(lastAck: number | undefined) {
    this.discordeno.heart.lastAck = lastAck
  }

  get lastHeartbeatSent(): number | undefined {
    return this.discordeno.heart.lastBeat
  }

  set lastHeartbeatSent(lastSent: number | undefined) {
    this.discordeno.heart.lastBeat = lastSent
  }

  get sessionID(): string | undefined | null {
    return this.discordeno.sessionId
  }

  set sessionID(id: string | undefined | null) {
    this.discordeno.sessionId = id ?? undefined
  }

  get seq(): number {
    return this.discordeno.previousSequenceNumber ?? 0
  }

  set seq(sequence: number) {
    this.discordeno.previousSequenceNumber = sequence
  }

  get status() {
    switch (this.discordeno.state) {
      case ShardState.Disconnected:
        return 'disconnected'
      case ShardState.Connecting:
        return 'connecting'
      case ShardState.Resuming:
        return 'resuming'
      case ShardState.Identifying:
        return 'identifying'
      default:
        return 'disconnected'
    }
  }

  set status(state: 'connecting' | 'disconnected' | 'handshaking' | 'identifying' | 'ready' | 'resuming' | 'disconnected') {
    switch (state) {
      case 'connecting':
        this.discordeno.state = ShardState.Connecting
        break
      case 'disconnected':
        this.discordeno.state = ShardState.Disconnected
        break
      case 'identifying':
        this.discordeno.state = ShardState.Identifying
        break
      case 'resuming':
        this.discordeno.state = ShardState.Resuming
        break
      case 'handshaking':
      case 'ready':
        this.discordeno.state = ShardState.Connected
        break
      default:
        this.discordeno.state = ShardState.Disconnected
        break
    }
  }

  get ws(): WebSocket | undefined {
    return this.discordeno.socket
  }

  set ws(socket: WebSocket | undefined) {
    this.discordeno.socket = socket
  }

  checkReady() {
    if (!this.ready) {
      this.ready = true
      super.emit('ready')
    }
  }

  /** Tells the shard to connect */
  async connect() {
    return await this.discordeno.connect()
  }

  createGuild(guild: Guild) {
    this.client.guildShardMap[guild.id] = this.id
    this.client.guilds.set(guild.id, guild)

    return guild
  }

  /** Disconnects the shard */
  async disconnect(options: { reconnect?: boolean | 'auto' } = {}, error?: Error) {
    return await this.discordeno.shutdown()
  }

  /**
   * Update the bot's AFK status.
   * @deprecated self bot functionality
   */
  editAFK(_afk: boolean) {}

  /**
   * Updates the bot's status on all guilds the shard is in
   */
  async editStatus(status: SelfStatus, activities: Array<ActivityPartial<BotActivityType>> | ActivityPartial<BotActivityType> = []) {
    // Selfbots
    if (status === 'invisible') return
    if (!Array.isArray(activities)) activities = [activities]

    return await this.discordeno.editShardStatus({ status, activities: activities.map((a) => ({ ...a, type: a.type ?? ActivityTypes.Listening })) })
  }

  emit(event: string, ...args: any[]) {
    this.client.emit.call(this.client, event, ...args)
    if (event !== 'error' || this.listeners('error').length > 0) {
      super.emit.call(this, event, ...args)
    }

    return false
  }

  async getGuildMembers(guildID: string, timeout?: number): Promise<Camelize<DiscordMember[]>> {
    return await this.discordeno.requestMembers(guildID)
  }

  /**
   * @deprecated this is not really necessary for dd gateway functionality
   */
  hardReset() {
    // this.reset()
    // this.seq = 0
    // this.sessionID = null
    // this.reconnectInterval = 1000
    // this.connectAttempts = 0
    // this.ws = null
    // this.heartbeatInterval = null
    // this.guildCreateTimeout = null
    // this.globalBucket = new Bucket(120, 60000, { reservedTokens: 5 })
    // this.presenceUpdateBucket = new Bucket(5, 20000)
    // this.presence = JSON.parse(JSON.stringify(this.client.presence))
  }

  heartbeat(_normal?: boolean) {
    if (!this.discordeno.isOpen()) return

    this.discordeno.heart.lastBeat = Date.now()
    // Discord randomly sends this requiring an immediate heartbeat back.
    // Using a direct socket.send call here because heartbeat requests are reserved by us.
    this.discordeno.socket?.send(
      JSON.stringify({
        op: GatewayOpcodes.Heartbeat,
        d: this.discordeno.previousSequenceNumber,
      }),
    )
    this.discordeno.events.heartbeat?.(this.discordeno)
  }

  async identify() {
    return await this.discordeno.identify()
  }

  /**
   * @deprecated done in connect()
   */
  initializeWS() {}

  async onPacket(packet: DiscordGatewayPayload) {
    return await this.discordeno.handleDiscordPacket(packet)
  }

  async requestGuildMembers(guildID: string, options?: RequestGuildMembersOptions) {
    return await this.discordeno.requestMembers(guildID, {
      limit: 0,
      userIds: options?.user_ids,
      nonce: options?.nonce,
      query: options?.query,
      presences: options?.presences,
    })
  }

  /**
   * @deprecated Not necessarily used in dd style
   */
  reset() {}

  restartGuildCreateTimeout() {
    if (this.guildCreateTimeout) {
      clearTimeout(this.guildCreateTimeout)
      this.guildCreateTimeout = null
    }
    if (!this.ready) {
      if (this.client.unavailableGuilds.size === 0 && this.unsyncedGuilds === 0) {
        return this.checkReady()
      }
      this.guildCreateTimeout = setTimeout(() => {
        this.checkReady()
      }, this.client.options.guildCreateTimeout)
    }
  }

  resume() {
    this.discordeno.resume()
  }

  sendStatusUpdate() {
    if (this.presence.status === 'invisible') this.presence.status = 'online'

    this.discordeno.editBotStatus({
      status: this.presence.status,
      // @ts-expect-error eris weird types issues
      activities: this.presence.activities ?? [],
    })
  }

  sendWS(op: number, _data: Record<string, unknown> | number, priority = false) {
    this.discordeno.send({ op, d: _data }, priority)
  }

  wsEvent(pkt: Required<DiscordGatewayPayload>) {
    switch (
      pkt.t /* eslint-disable no-redeclare */ // (╯°□°）╯︵ ┻━┻
    ) {
      case 'PRESENCE_UPDATE': {
        const packet = pkt.d as DiscordPresenceUpdate

        if (packet.user.username !== undefined) {
          let user = this.client.users.get(packet.user.id)
          let oldUser = null
          if (
            user &&
            (user.username !== packet.user.username || user.discriminator !== packet.user.discriminator || user.avatar !== packet.user.avatar)
          ) {
            oldUser = {
              username: user.username,
              discriminator: user.discriminator,
              avatar: user.avatar,
            }
          }
          if (!user || oldUser) {
            user = this.client.users.update(new User(packet.user, this.client), this.client)
            this.emit('userUpdate', user, oldUser)
          }
        }
        break
      }
      case 'VOICE_STATE_UPDATE': {
        const packet = pkt.d as DiscordVoiceState

        // TODO: voice - support voice connections
        // if (packet.guild_id && packet.user_id === this.client.id) {
        //   const voiceConnection = this.client.voiceConnections.get(packet.guild_id)
        //   if (voiceConnection) {
        //     if (packet.channel_id === null) {
        //       this.client.voiceConnections.leave(packet.guild_id)
        //     } else if (voiceConnection.channelID !== packet.channel_id) {
        //       voiceConnection.switchChannel(packet.channel_id, true)
        //     }
        //   }
        // }
        if (packet.self_stream === undefined) {
          packet.self_stream = false
        }

        const guild = this.client.guilds.get(packet.guild_id!)
        if (!guild) {
          break
        }
        // TODO: voice - support voice connections
        // if (guild.pendingVoiceStates) {
        //   guild.pendingVoiceStates.push(packet)
        //   break
        // }
        let member = guild.members.get(packet.user_id)
        if (!member) {
          if (!packet.member) {
            this.emit(
              'voiceStateUpdate',
              {
                id: packet.user_id,
                voiceState: {
                  deaf: packet.deaf,
                  mute: packet.mute,
                  selfDeaf: packet.self_deaf,
                  selfMute: packet.self_mute,
                  selfStream: packet.self_stream,
                  selfVideo: packet.self_video,
                },
              },
              null,
            )
            break
          }
          // Updates the member cache with this member for future events.
          member = new Member(packet.member, guild, this.client)
          guild.members.set(packet.user_id, member)

          // TODO: voice - support voice connections
          // const channel = guild.channels.find(
          //   (channel) =>
          //     (channel.type === ChannelTypes.GuildVoice || channel.type === ChannelTypes.GuildStageVoice) && channel.voiceMembers.get(packet.user_id),
          // )
          // if (channel) {
          //   channel.voiceMembers.remove(packet)
          //   this.emit('debug', 'VOICE_STATE_UPDATE member null but in channel: ' + packet.user_id, this.id)
          // }
        }
        const oldState = {
          deaf: member.voiceState?.deaf,
          mute: member.voiceState?.mute,
          selfDeaf: member.voiceState?.selfDeaf,
          selfMute: member.voiceState?.selfMute,
          selfStream: member.voiceState?.selfStream,
          selfVideo: member.voiceState?.selfVideo,
        }
        const oldChannelID = member.voiceState?.channelID
        if (packet.member) member.update(packet.member)
        if (oldChannelID !== packet.channel_id) {
          let oldChannel: TextVoiceChannel | StageChannel | null, newChannel: TextVoiceChannel | StageChannel | null
          if (oldChannelID) {
            oldChannel = guild.channels.get(oldChannelID) as TextVoiceChannel | StageChannel
            if (oldChannel && oldChannel.type !== ChannelTypes.GuildVoice && oldChannel.type !== ChannelTypes.GuildStageVoice) {
              this.emit('warn', 'Old channel not a recognized voice channel: ' + oldChannelID, this.id)
              oldChannel = null
            }
          }
          if (
            packet.channel_id &&
            (newChannel = guild.channels.get(packet.channel_id) as TextVoiceChannel | StageChannel) &&
            (newChannel.type === ChannelTypes.GuildVoice || newChannel.type === ChannelTypes.GuildStageVoice)
          ) {
            // Welcome to Discord, where one can "join" text channels
            if (oldChannel!) {
              oldChannel.voiceMembers.remove(member)
              this.emit('voiceChannelSwitch', newChannel.voiceMembers.add(member, guild), newChannel, oldChannel)
            } else {
              this.emit('voiceChannelJoin', newChannel.voiceMembers.add(member, guild), newChannel)
            }
          } else if (oldChannel!) {
            oldChannel.voiceMembers.remove(member)
            this.emit('voiceChannelLeave', member, oldChannel)
          }
        }
        if (
          oldState.mute !== member.voiceState?.mute ||
          oldState.deaf !== member.voiceState?.deaf ||
          oldState.selfMute !== member.voiceState?.selfMute ||
          oldState.selfDeaf !== member.voiceState?.selfDeaf ||
          oldState.selfStream !== member.voiceState?.selfStream ||
          oldState.selfVideo !== member.voiceState?.selfVideo
        ) {
          this.emit('voiceStateUpdate', member, oldState)
        }
        break
      }
      case 'TYPING_START': {
        const packet = pkt.d as DiscordTypingStart

        let member = null
        const guild = this.client.guilds.get(packet.guild_id ?? '')
        if (guild) {
          member = guild.members.update(new Member({ ...packet.member!, id: packet.user_id }, guild, this.client))
        }
        if (this.client.listeners('typingStart').length > 0) {
          this.emit(
            'typingStart',
            this.client.getChannel(packet.channel_id) ?? {
              id: packet.channel_id,
            },
            this.client.users.get(packet.user_id) ?? { id: packet.user_id },
            member,
          )
        }
        break
      }
      case 'MESSAGE_CREATE': {
        const packet = pkt.d as DiscordMessage

        const channel = this.client.getChannel(packet.channel_id) as TextChannel
        if (channel) {
          // MESSAGE_CREATE just when deleting o.o
          channel.lastMessageID = packet.id

          this.emit('messageCreate', channel.messages.add(new Message(packet, this.client)))
        } else {
          this.emit('messageCreate', new Message(packet, this.client))
        }
        break
      }
      case 'MESSAGE_UPDATE': {
        const packet = pkt.d as DiscordMessage

        const channel = this.client.getChannel(packet.channel_id) as TextChannel
        if (!channel) {
          // @ts-expect-error eris hack
          packet.channel = {
            id: packet.channel_id,
          }
          this.emit('messageUpdate', packet, null)
          break
        }
        const message = channel.messages.get(packet.id)
        let oldMessage = null
        if (message) {
          oldMessage = {
            attachments: message.attachments,
            channelMentions: message.channelMentions,
            content: message.content,
            editedTimestamp: message.editedTimestamp,
            embeds: message.embeds,
            flags: message.flags,
            // mentionedBy: message.mentionedBy,
            mentions: message.mentions,
            pinned: message.pinned,
            roleMentions: message.roleMentions,
            tts: message.tts,
          }
        } else if (!packet.timestamp) {
          // @ts-expect-error eris hack
          packet.channel = channel
          this.emit('messageUpdate', packet, null)
          break
        }
        this.emit('messageUpdate', channel.messages.update(new Message(packet, this.client)), oldMessage)
        break
      }
      case 'MESSAGE_DELETE': {
        const packet = pkt.d as DiscordMessageDelete

        const channel = this.client.getChannel(packet.channel_id) as TextChannel
        const oldMessage = channel?.messages.get(packet.id)

        this.emit(
          'messageDelete',
          oldMessage ?? {
            id: packet.id,
            channel: channel ?? {
              id: packet.channel_id,
              guild: packet.guild_id ? { id: packet.guild_id } : undefined,
            },
            guildID: packet.guild_id,
          },
        )
        break
      }
      case 'MESSAGE_DELETE_BULK': {
        const packet = pkt.d as DiscordMessageDeleteBulk

        const channel = this.client.getChannel(packet.channel_id) as TextChannel

        this.emit(
          'messageDeleteBulk',
          packet.ids.map((id) => {
            const oldMessage = channel?.messages.get(id)

            return (
              oldMessage ?? {
                id,
                channel: {
                  id: packet.channel_id,
                  guild: packet.guild_id ? { id: packet.guild_id } : undefined,
                },
                guildID: packet.guild_id,
              }
            )
          }),
        )
        break
      }
      case 'MESSAGE_REACTION_ADD': {
        const packet = pkt.d as DiscordMessageReactionAdd

        const channel = this.client.getChannel(packet.channel_id) as TextChannel
        let message:
          | Message
          | {
              id: string
              channel: TextableChannel | { id: string }
              guildID?: string
            }
          | undefined
        let member
        if (channel) {
          message = channel.messages.get(packet.message_id)
          if (channel.guild) {
            if (packet.member) {
              const member = new Member(packet.member, channel.guild, this.client)
              channel.guild.members.set(member.user.id, member)
            }
          }
        }
        if (message instanceof Message) {
          const reaction = packet.emoji.id ? `${packet.emoji.name}:${packet.emoji.id}` : packet.emoji.name!
          if (message.reactions[reaction]) {
            ++message.reactions[reaction].count
            if (packet.user_id === this.client.id) {
              message.reactions[reaction].me = true
            }
          } else {
            message.reactions[reaction] = {
              count: 1,
              me: packet.user_id === this.client.id,
            }
          }
        } else {
          message = {
            id: packet.message_id,
            channel: channel ?? { id: packet.channel_id },
          }

          if (packet.guild_id) {
            message.guildID = packet.guild_id
            // @ts-expect-error eris hacks
            if (!message.channel.guild) {
              // @ts-expect-error eris hacks
              message.channel.guild = { id: packet.guild_id }
            }
          }
        }
        this.emit('messageReactionAdd', message, packet.emoji, member ?? { id: packet.user_id })
        break
      }
      case 'MESSAGE_REACTION_REMOVE': {
        const packet = pkt.d as DiscordMessageReactionRemove

        const channel = this.client.getChannel(packet.channel_id) as TextChannel
        let message:
          | Message
          | {
              id: string
              channel: TextableChannel | { id: string }
              guildID?: string
            }
          | undefined
        if (channel) {
          message = channel.messages.get(packet.message_id)
        }
        if (message instanceof Message) {
          const reaction = packet.emoji.id ? `${packet.emoji.name}:${packet.emoji.id}` : packet.emoji.name!
          const reactionObj = message.reactions[reaction]
          if (reactionObj) {
            --reactionObj.count
            if (reactionObj.count === 0) {
              delete message.reactions[reaction]
            } else if (packet.user_id === this.client.id) {
              reactionObj.me = false
            }
          }
        } else {
          message = {
            id: packet.message_id,
            channel: channel ?? { id: packet.channel_id },
          }

          if (packet.guild_id) {
            message.guildID = packet.guild_id
            // @ts-expect-error eris hacks
            if (!message.channel.guild) {
              // @ts-expect-error eris hacks
              message.channel.guild = { id: packet.guild_id }
            }
          }
        }

        this.emit('messageReactionRemove', message, packet.emoji, packet.user_id)
        break
      }
      case 'MESSAGE_REACTION_REMOVE_ALL': {
        const packet = pkt.d as DiscordMessageReactionRemoveAll

        const channel = this.client.getChannel(packet.channel_id) as TextChannel
        let message
        if (channel) {
          message = channel.messages.get(packet.message_id)
          if (message) {
            message.reactions = {}
          }
        }
        if (!message) {
          message = {
            id: packet.message_id,
            channel: channel ?? { id: packet.channel_id },
          }
          if (packet.guild_id) {
            // @ts-expect-error eris hacks
            message.guildID = packet.guild_id
            if (!message.channel.guild) {
              // @ts-expect-error eris hacks
              message.channel.guild = { id: packet.guild_id }
            }
          }
        }

        this.emit('messageReactionRemoveAll', message)
        break
      }
      case 'MESSAGE_REACTION_REMOVE_EMOJI': {
        const packet = pkt.d as DiscordMessageReactionRemoveEmoji

        const channel = this.client.getChannel(packet.channel_id) as TextChannel
        let message
        if (channel) {
          message = channel.messages.get(packet.message_id)
          if (message) {
            const reaction = packet.emoji.id ? `${packet.emoji.name}:${packet.emoji.id}` : packet.emoji.name!
            delete message.reactions[reaction]
          }
        }
        if (!message) {
          message = {
            id: packet.message_id,
            channel: channel ?? { id: packet.channel_id },
          }
          if (packet.guild_id) {
            // @ts-expect-error eris hacks
            message.guildID = packet.guild_id
            if (!message.channel.guild) {
              // @ts-expect-error eris hacks
              message.channel.guild = { id: packet.guild_id }
            }
          }
        }

        this.emit('messageReactionRemoveEmoji', message, packet.emoji)
        break
      }
      case 'GUILD_MEMBER_ADD': {
        const packet = pkt.d as DiscordGuildMemberAdd

        const guild = this.client.guilds.get(packet.guild_id)
        if (!guild) {
          // Eventual Consistency™ (╯°□°）╯︵ ┻━┻
          this.emit('debug', `Missing guild ${packet.guild_id} in GUILD_MEMBER_ADD`)
          break
        }
        guild.memberCount = (guild.memberCount ?? 0) + 1

        const member = new Member(packet, guild, this.client)
        guild.members.set(member.id, member)
        this.emit('guildMemberAdd', guild, member)
        break
      }
      case 'GUILD_MEMBER_UPDATE': {
        const packet = pkt.d as DiscordGuildMemberUpdate

        // Check for member update if GuildPresences intent isn't set, to prevent emitting twice
        if (!(this.client.options.intents & Intents.GuildPresences) && packet.user.username !== undefined) {
          let user = this.client.users.get(packet.user.id)
          let oldUser = null
          if (
            user &&
            (user.username !== packet.user.username || user.discriminator !== packet.user.discriminator || user.avatar !== packet.user.avatar)
          ) {
            oldUser = {
              username: user.username,
              discriminator: user.discriminator,
              avatar: user.avatar,
            }
          }
          if (!user || oldUser) {
            user = this.client.users.update(new User(packet.user, this.client))
            this.emit('userUpdate', user, oldUser)
          }
        }
        const guild = this.client.guilds.get(packet.guild_id)
        if (!guild) {
          this.emit('debug', `Missing guild ${packet.guild_id} in GUILD_MEMBER_UPDATE`)
          break
        }
        let member = guild.members.get(packet.user.id)
        let oldMember = null
        if (member) {
          oldMember = {
            avatar: member.avatar,
            communicationDisabledUntil: member.communicationDisabledUntil,
            roles: member.roles,
            nick: member.nick,
            premiumSince: member.premiumSince,
            pending: member.pending,
          }
        }
        member = guild.members.update(new Member(packet, guild, this.client))

        this.emit('guildMemberUpdate', guild, member, oldMember)
        break
      }
      case 'GUILD_MEMBER_REMOVE': {
        const packet = pkt.d as DiscordGuildMemberRemove

        if (packet.user.id === this.client.id) {
          // The bot is probably leaving
          break
        }
        const guild = this.client.guilds.get(packet.guild_id)
        if (!guild) {
          break
        }
        guild.memberCount = (guild.memberCount ?? 0) - 1

        this.emit(
          'guildMemberRemove',
          guild,
          guild.members.get(packet.user.id) ?? {
            id: packet.user.id,
            user: new User(packet.user, this.client),
          },
        )
        break
      }
      case 'GUILD_CREATE': {
        const packet = pkt.d as DiscordGuild

        if (!packet.unavailable) {
          const guild = this.createGuild(new Guild(packet, this.client))
          if (this.ready) {
            if (this.client.unavailableGuilds.remove(new Guild(packet, this.client))) {
              this.emit('guildAvailable', guild)
            } else {
              this.emit('guildCreate', guild)
            }
          } else {
            this.client.unavailableGuilds.remove(new Guild(packet, this.client))
            this.restartGuildCreateTimeout()
          }
        } else {
          this.client.guilds.remove(new Guild(packet, this.client))

          this.emit('unavailableGuildCreate', this.client.unavailableGuilds.add(new UnavailableGuild(packet, this.client)))
        }
        break
      }
      case 'GUILD_UPDATE': {
        const packet = pkt.d as DiscordGuild

        const guild = this.client.guilds.get(packet.id)
        if (!guild) {
          this.emit('debug', `Guild ${packet.id} undefined in GUILD_UPDATE`)
          break
        }
        const oldGuild = {
          afkChannelID: guild.afkChannelID,
          afkTimeout: guild.afkTimeout,
          banner: guild.banner,
          defaultNotifications: guild.defaultNotifications,
          description: guild.description,
          discoverySplash: guild.discoverySplash,
          emojis: guild.emojis,
          explicitContentFilter: guild.explicitContentFilter,
          features: guild.features,
          icon: guild.icon,
          large: guild.large,
          maxMembers: guild.maxMembers,
          maxVideoChannelUsers: guild.maxVideoChannelUsers,
          mfaLevel: guild.mfaLevel,
          name: guild.name,
          nsfw: guild.nsfw,
          nsfwLevel: guild.nsfwLevel,
          ownerID: guild.ownerID,
          preferredLocale: guild.preferredLocale,
          premiumSubscriptionCount: guild.premiumSubscriptionCount,
          premiumTier: guild.premiumTier,
          publicUpdatesChannelID: guild.publicUpdatesChannelID,
          rulesChannelID: guild.rulesChannelID,
          splash: guild.splash,
          stickers: guild.stickers,
          systemChannelFlags: guild.systemChannelFlags,
          systemChannelID: guild.systemChannelID,
          vanityURL: guild.vanityURL,
          verificationLevel: guild.verificationLevel,
        }

        this.emit('guildUpdate', this.client.guilds.update(new Guild(packet, this.client)), oldGuild)
        break
      }
      case 'GUILD_DELETE': {
        const packet = pkt.d as DiscordUnavailableGuild

        // TODO: voice - support voice stuff
        // const voiceConnection = this.client.voiceConnections.get(packet.id)
        // if (voiceConnection) {
        //   if (voiceConnection.channelID) {
        //     this.client.leaveVoiceChannel(voiceConnection.channelID)
        //   } else {
        //     this.client.voiceConnections.leave(packet.id)
        //   }
        // }

        delete this.client.guildShardMap[packet.id]
        const guild = this.client.guilds.remove(packet)
        if (guild) {
          // Discord sends GUILD_DELETE for guilds that were previously unavailable in READY
          guild.channels.forEach((channel) => {
            delete this.client.channelGuildMap[channel.id]
          })
        }
        if (packet.unavailable) {
          this.emit('guildUnavailable', this.client.unavailableGuilds.add(new UnavailableGuild(packet, this.client)))
        } else {
          this.emit(
            'guildDelete',
            guild ?? {
              id: packet.id,
            },
          )
        }
        break
      }
      case 'GUILD_BAN_ADD': {
        const packet = pkt.d as DiscordGuildBanAddRemove

        this.emit('guildBanAdd', this.client.guilds.get(packet.guild_id), this.client.users.update(new User(packet.user, this.client)))
        break
      }
      case 'GUILD_BAN_REMOVE': {
        const packet = pkt.d as DiscordGuildBanAddRemove

        this.emit('guildBanRemove', this.client.guilds.get(packet.guild_id), this.client.users.update(new User(packet.user, this.client)))
        break
      }
      case 'GUILD_ROLE_CREATE': {
        const packet = pkt.d as DiscordGuildRoleCreate

        const guild = this.client.guilds.get(packet.guild_id)
        if (!guild) {
          this.emit('debug', `Missing guild ${packet.guild_id} in GUILD_ROLE_CREATE`)
          break
        }
        this.emit('guildRoleCreate', guild, guild.roles.add(new Role(packet.role, guild)))
        break
      }
      case 'GUILD_ROLE_UPDATE': {
        const packet = pkt.d as DiscordGuildRoleUpdate

        const guild = this.client.guilds.get(packet.guild_id)
        if (!guild) {
          this.emit('debug', `Guild ${packet.guild_id} undefined in GUILD_ROLE_UPDATE`)
          break
        }
        const role = new Role(packet.role, guild)
        guild.roles.set(role.id, role)
        if (!role) {
          this.emit('debug', `Role ${packet.role.id} in guild ${packet.guild_id} undefined in GUILD_ROLE_UPDATE`)
          break
        }
        const oldRole = {
          color: role.color,
          hoist: role.hoist,
          icon: role.icon,
          managed: role.managed,
          mentionable: role.mentionable,
          name: role.name,
          permissions: role.permissions,
          position: role.position,
          tags: role.tags,
          unicodeEmoji: role.unicodeEmoji,
        }

        this.emit('guildRoleUpdate', guild, guild.roles.update(new Role(packet.role, guild)), oldRole)
        break
      }
      case 'GUILD_ROLE_DELETE': {
        const packet = pkt.d as DiscordGuildRoleDelete

        const guild = this.client.guilds.get(packet.guild_id)
        if (!guild) {
          this.emit('debug', `Missing guild ${packet.guild_id} in GUILD_ROLE_DELETE`)
          break
        }
        if (!guild.roles.has(packet.role_id)) {
          this.emit('debug', `Missing role ${packet.role_id} in GUILD_ROLE_DELETE`)
          break
        }
        this.emit('guildRoleDelete', guild, guild.roles.remove({ id: packet.role_id }))
        break
      }
      case 'INVITE_CREATE': {
        const packet = pkt.d as DiscordInviteCreate

        const guild = this.client.guilds.get(packet.guild_id ?? '')
        if (!guild) {
          this.emit('debug', `Missing guild ${packet.guild_id} in INVITE_CREATE`)
          break
        }
        const channel = this.client.getChannel(packet.channel_id) as GuildChannel
        if (!channel) {
          this.emit('debug', `Missing channel ${packet.channel_id} in INVITE_CREATE`)
          break
        }

        this.emit(
          'inviteCreate',
          guild,
          new Invite(
            {
              ...packet,
              guild: guild.toJSON(),
              channel,
            },
            this.client,
          ),
        )
        break
      }
      case 'INVITE_DELETE': {
        const packet = pkt.d as DiscordInviteDelete

        const guild = this.client.guilds.get(packet.guild_id ?? '')
        if (!guild) {
          this.emit('debug', `Missing guild ${packet.guild_id} in INVITE_DELETE`)
          break
        }
        const channel = this.client.getChannel(packet.channel_id) as GuildChannel
        if (!channel) {
          this.emit('debug', `Missing channel ${packet.channel_id} in INVITE_DELETE`)
          break
        }

        this.emit(
          'inviteDelete',
          guild,
          new Invite(
            {
              ...packet,
              guild: guild.toJSON(),
              channel,
            },
            this.client,
          ),
        )
        break
      }
      case 'CHANNEL_CREATE': {
        const packet = pkt.d as DiscordChannel

        const channel = generateChannelFrom(packet, this.client)
        if (packet.guild_id) {
          const guildChannel = channel as GuildChannel
          if (!guildChannel.guild) {
            guildChannel.guild = this.client.guilds.get(packet.guild_id)!
            if (!guildChannel.guild) {
              this.emit('debug', `Received CHANNEL_CREATE for channel in missing guild ${packet.guild_id}`)
              break
            }
          }

          guildChannel.guild.channels.set(guildChannel.id, guildChannel)
          this.client.channelGuildMap[packet.id] = packet.guild_id

          this.emit('channelCreate', channel)
        } else {
          this.emit('warn', new Error('Unhandled CHANNEL_CREATE type: ' + JSON.stringify(packet, null, 2)))
          break
        }
        break
      }
      case 'CHANNEL_UPDATE': {
        const packet = pkt.d as DiscordChannel

        let channel = this.client.getChannel(packet.id) as GuildChannel
        if (!channel) {
          break
        }
        let oldChannel
        const oldType = channel.type

        if (channel instanceof GuildChannel) {
          oldChannel = {
            bitrate: (channel as VoiceChannel).bitrate,
            name: channel.name,
            nsfw: channel.nsfw,
            parentID: channel.parentID,
            permissionOverwrites: channel.permissionOverwrites,
            position: channel.position,
            rateLimitPerUser: (channel as TextChannel).rateLimitPerUser,
            rtcRegion: (channel as VoiceChannel).rtcRegion,
            topic: (channel as TextChannel).topic,
            type: channel.type,
            userLimit: (channel as VoiceChannel).userLimit,
            videoQualityMode: (channel as VoiceChannel).videoQualityMode,
          }
        } else {
          this.emit('warn', `Unexpected CHANNEL_UPDATE for channel ${packet.id} with type ${oldType}`)
        }
        if (oldType === packet.type) {
          channel.update(packet)
        } else {
          this.emit('debug', `Channel ${packet.id} changed from type ${oldType} to ${packet.type}`)
          const newChannel = generateChannelFrom(packet, this.client) as GuildChannel
          if (packet.guild_id) {
            const guild = this.client.guilds.get(packet.guild_id)
            if (!guild) {
              this.emit('debug', `Received CHANNEL_UPDATE for channel in missing guild ${packet.guild_id}`)
              break
            }
            guild.channels.remove(channel)
            guild.channels.add(newChannel, this.client)
          } else if (channel instanceof PrivateChannel) {
            this.client.privateChannels.remove(channel)
            this.client.privateChannels.add(newChannel as unknown as PrivateChannel, this.client)
          } else {
            this.emit('warn', new Error('Unhandled CHANNEL_UPDATE type: ' + JSON.stringify(packet, null, 2)))
            break
          }
          channel = newChannel
        }

        this.emit('channelUpdate', channel, oldChannel)
        break
      }
      case 'CHANNEL_DELETE': {
        const packet = pkt.d as DiscordChannel

        if (packet.type === ChannelTypes.DM || packet.type === undefined) {
          if (this.id === 0) {
            const channel = this.client.privateChannels.remove(new PrivateChannel(packet, this.client))
            if (channel) {
              delete this.client.privateChannelMap[channel.recipient?.id ?? '']

              this.emit('channelDelete', channel)
            }
          }
        } else if (packet.guild_id) {
          delete this.client.channelGuildMap[packet.id]
          const guild = this.client.guilds.get(packet.guild_id)
          if (!guild) {
            this.emit('debug', `Missing guild ${packet.guild_id} in CHANNEL_DELETE`)
            break
          }
          const channel = guild.channels.remove(new GuildChannel(packet, this.client))
          if (!channel) {
            break
          }
          if (channel.type === ChannelTypes.GuildVoice || channel.type === ChannelTypes.GuildStageVoice) {
            const voiceChannel = channel as VoiceChannel | StageChannel
            voiceChannel.voiceMembers.forEach((member) => {
              voiceChannel.voiceMembers.remove(member)
              this.emit('voiceChannelLeave', member, channel)
            })
          }
          this.emit('channelDelete', channel)
        } else {
          this.emit('warn', new Error('Unhandled CHANNEL_DELETE type: ' + JSON.stringify(packet, null, 2)))
        }
        break
      }
      case 'GUILD_MEMBERS_CHUNK': {
        const packet = pkt.d as DiscordGuildMembersChunk

        const guild = this.client.guilds.get(packet.guild_id)
        if (!guild) {
          this.emit(
            'debug',
            `Received GUILD_MEMBERS_CHUNK, but guild ${packet.guild_id} is ` +
              (this.client.unavailableGuilds.has(packet.guild_id) ? 'unavailable' : 'missing'),
            this.id,
          )
          break
        }

        const members = packet.members.map((member) => {
          const memb = new Member(member, guild, this.client)
          guild.members.set(memb.id, memb)
          return memb
        })

        if (packet.presences) {
          packet.presences.forEach((presence) => {
            const member = guild.members.get(presence.user.id)
            if (member) {
              // member.update(presence)
            }
          })
        }

        if (this.requestMembersPromise.hasOwnProperty(packet.nonce ?? '')) {
          this.requestMembersPromise[packet.nonce ?? ''].members.push(...members)
        }

        if (packet.chunk_index >= packet.chunk_count - 1) {
          if (this.requestMembersPromise.hasOwnProperty(packet.nonce ?? '')) {
            clearTimeout(this.requestMembersPromise[packet.nonce ?? ''].timeout)
            this.requestMembersPromise[packet.nonce ?? ''].res(this.requestMembersPromise[packet.nonce ?? ''].members)
            delete this.requestMembersPromise[packet.nonce ?? '']
          }
          if (this.getAllUsersCount.hasOwnProperty(guild.id)) {
            delete this.getAllUsersCount[guild.id]
            this.checkReady()
          }
        }

        this.emit('guildMemberChunk', guild, members)

        this.lastHeartbeatAck = true

        break
      }
      case 'RESUMED':
      case 'READY': {
        const packet = pkt.d as DiscordReady

        this.connectAttempts = 0
        this.reconnectInterval = 1000

        this.connecting = false
        if (this.connectTimeout) {
          clearTimeout(this.connectTimeout)
        }
        this.connectTimeout = null
        this.status = 'ready'
        this.presence.status = 'online'
        this.client.shards._readyPacketCB(this.id)

        if (pkt.t === 'RESUMED') {
          // Can only heartbeat after resume succeeds, discord/discord-api-docs#1619
          this.heartbeat()

          this.preReady = true
          this.ready = true

          /**
           * Fired when a shard finishes resuming
           * @event Shard#resume
           */
          super.emit('resume')
          break
        }

        this.client.user = new ExtendedUser(packet.user, this.client)
        this.client.users.set(this.client.user.id, this.client.user)

        if (!this.client.token.startsWith('Bot ')) {
          this.client.token = 'Bot ' + this.client.token
        }

        this.sessionID = packet.session_id

        packet.guilds.forEach((guild) => {
          if (guild.unavailable) {
            this.client.guilds.delete(guild.id)
            this.client.unavailableGuilds.set(guild.id, new UnavailableGuild(guild, this.client))
          } else {
            this.client.guildShardMap[guild.id] = this.id
            this.client.unavailableGuilds.delete(guild.id)
          }
        })

        this.client.options.applicationId = packet.application.id

        this.preReady = true

        this.emit('shardPreReady', this.id)

        if (this.client.unavailableGuilds.size > 0 && packet.guilds.length > 0) {
          this.restartGuildCreateTimeout()
        } else {
          this.checkReady()
        }

        break
      }
      case 'VOICE_SERVER_UPDATE': {
        // const packet = pkt.d as DiscordVoiceServerUpdate
        // TODO: voice - support voice stuff
        // packet.session_id = this.sessionID
        // packet.user_id = this.client.id
        // packet.shard = this

        // this.client.voiceConnections.voiceServerUpdate(packet)

        break
      }
      case 'USER_UPDATE': {
        const packet = pkt.d as DiscordUser

        let user = this.client.users.get(packet.id)
        let oldUser = null
        if (user) {
          oldUser = {
            username: user.username,
            discriminator: user.discriminator,
            avatar: user.avatar,
          }
        }
        user = this.client.users.update(new User(packet, this.client))
        this.emit('userUpdate', user, oldUser)
        break
      }
      case 'GUILD_EMOJIS_UPDATE': {
        const packet = pkt.d as DiscordGuildEmojisUpdate

        const guild = this.client.guilds.get(packet.guild_id)
        let oldEmojis = null
        const emojis = packet.emojis
        if (guild) {
          oldEmojis = guild.emojis
          guild.emojis = emojis
        }

        this.emit('guildEmojisUpdate', guild ?? { id: packet.guild_id }, emojis, oldEmojis)
        break
      }
      case 'GUILD_STICKERS_UPDATE': {
        const packet = pkt.d as DiscordGuildStickersUpdate

        const guild = this.client.guilds.get(packet.guild_id)
        let oldStickers = null
        const stickers = packet.stickers
        if (guild) {
          oldStickers = guild.stickers
          guild.stickers = stickers
        }
        this.emit('guildStickersUpdate', guild ?? { id: packet.guild_id }, stickers, oldStickers)
        break
      }

      case 'CHANNEL_PINS_UPDATE': {
        const packet = pkt.d as DiscordChannelPinsUpdate

        const channel = this.client.getChannel(packet.channel_id) as TextChannel
        if (!channel) {
          this.emit('debug', `CHANNEL_PINS_UPDATE target channel ${packet.channel_id} not found`)
          break
        }
        const oldTimestamp = channel.lastPinTimestamp
        channel.lastPinTimestamp = Date.parse(packet.last_pin_timestamp ?? '')

        this.emit('channelPinUpdate', channel, channel.lastPinTimestamp, oldTimestamp)
        break
      }
      case 'WEBHOOKS_UPDATE': {
        const packet = pkt.d as DiscordWebhookUpdate

        this.emit('webhooksUpdate', {
          channelID: packet.channel_id,
          guildID: packet.guild_id,
        })
        break
      }
      case 'THREAD_CREATE': {
        const packet = pkt.d as DiscordChannel

        const channel = generateChannelFrom(packet, this.client) as ThreadChannel
        if (!channel.guild) {
          channel.guild = this.client.guilds.get(packet.guild_id ?? '')!
          if (!channel.guild) {
            this.emit('debug', `Received THREAD_CREATE for channel in missing guild ${packet.guild_id}`)
            break
          }
        }
        channel.guild.threads.add(channel, this.client)
        this.client.threadGuildMap[packet.id] = packet.guild_id ?? ''

        this.emit('threadCreate', channel)
        break
      }
      case 'THREAD_UPDATE': {
        const packet = pkt.d as DiscordChannel

        const channel = this.client.getChannel(packet.id)
        if (!channel) {
          const thread = generateChannelFrom(packet, this.client) as ThreadChannel
          this.emit('threadUpdate', this.client.guilds.get(packet.guild_id ?? '')?.threads.add(thread, this.client), null)
          this.client.threadGuildMap[packet.id] = packet.guild_id ?? ''
          break
        }
        if (!(channel instanceof ThreadChannel)) {
          // this.emit('warn', `Unexpected THREAD_UPDATE for channel ${packet.id} with type ${channel.type}`)
          break
        }
        const oldChannel = {
          name: channel.name,
          rateLimitPerUser: channel.rateLimitPerUser,
          threadMetadata: channel.threadMetadata,
        }
        channel.update(packet)

        this.emit('threadUpdate', channel, oldChannel)
        break
      }
      case 'THREAD_DELETE': {
        const packet = pkt.d as Pick<DiscordChannel, 'id' | 'guild_id' | 'parent_id' | 'type'>

        delete this.client.threadGuildMap[packet.id]
        const guild = this.client.guilds.get(packet.guild_id ?? '')
        if (!guild) {
          this.emit('debug', `Missing guild ${packet.guild_id} in THREAD_DELETE`)
          break
        }
        const channel = guild.threads.get(packet.id)
        guild.threads.delete(packet.id)
        if (!channel) {
          break
        }

        this.emit('threadDelete', channel)
        break
      }
      case 'THREAD_LIST_SYNC': {
        const packet = pkt.d as DiscordThreadListSync

        const guild = this.client.guilds.get(packet.guild_id)
        if (!guild) {
          this.emit('debug', `Missing guild ${packet.guild_id} in THREAD_LIST_SYNC`)
          break
        }
        const deletedThreads = (packet.channel_ids ?? guild.threads.map((c) => c.id)) // REVIEW Is this a good name?
          .filter((c) => !packet.threads.some((t) => t.id === c))
          .map((id) => guild.threads.remove({ id }) ?? { id })
        const activeThreads = packet.threads.map((t) => {
          const thread = generateChannelFrom(t, this.client) as ThreadChannel
          guild.threads.set(thread.id, thread)
          return thread
        })
        // @ts-expect-error js hack
        const joinedThreadsMember = packet.members.map((m) => guild.threads.get(m.id)?.members.update(m, this.client))

        this.emit('threadListSync', guild, deletedThreads, activeThreads, joinedThreadsMember)
        break
      }
      // TODO: Add this when dd has the support for this event
      case 'THREAD_MEMBER_UPDATE': {
        const packet = pkt.d as DiscordThreadMemberUpdate
        const channel = this.client.getChannel(packet.id) as ThreadChannel
        if (!channel) {
          this.emit('debug', `Missing channel ${packet.id} in THREAD_MEMBER_UPDATE`)
          break
        }
        let oldMember = null
        // Thanks Discord
        let member = channel.members.get(this.client.id)
        if (member) {
          oldMember = {
            flags: member.flags,
          }
        }
        member = new ThreadMember({ ...packet, user_id: this.client.id.toString(), join_timestamp: new Date().toISOString() }, this.client)
        this.emit('threadMemberUpdate', channel, member, oldMember)
        break
      }
      case 'THREAD_MEMBERS_UPDATE': {
        const packet = pkt.d as DiscordThreadMembersUpdate

        const channel = this.client.getChannel(packet.id) as ThreadChannel
        if (!channel) {
          this.emit('debug', `Missing channel ${packet.id} in THREAD_MEMBERS_UPDATE`)
          break
        }
        channel.memberCount = packet.member_count
        let addedMembers
        let removedMembers
        if (packet.added_members) {
          addedMembers = packet.added_members.map((m) => {
            // if (m.presence) {
            //   m.presence.id = m.presence.user.id
            //   this.client.users.update(m.presence.user, this.client)
            // }

            // m.thread_id = m.id
            // m.id = m.user_id
            // m.member.id = m.member.user.id
            // const guild = this.client.guilds.get(packet.guild_id)
            // if (guild) {
            //   if (m.presence) {
            //     guild.members.update(m.presence, guild)
            //   }
            //   guild.members.update(m.member, guild)
            // }
            const member = new ThreadMember(m, this.client)
            channel.members.set(member.id, member)
            return member
          })
        }
        if (packet.removed_member_ids) {
          removedMembers = packet.removed_member_ids.map((id) => channel.members.remove({ id }) ?? { id })
        }

        this.emit('threadMembersUpdate', channel, addedMembers ?? [], removedMembers ?? [])
        break
      }
      case 'STAGE_INSTANCE_CREATE': {
        const packet = pkt.d as DiscordStageInstance

        const guild = this.client.guilds.get(packet.guild_id)
        if (!guild) {
          this.emit('debug', `Missing guild ${packet.guild_id} in STAGE_INSTANCE_CREATE`)
          break
        }

        this.emit('stageInstanceCreate', guild.stageInstances.add(new StageInstance(packet, this.client)))
        break
      }
      case 'STAGE_INSTANCE_UPDATE': {
        const packet = pkt.d as DiscordStageInstance

        const guild = this.client.guilds.get(packet.guild_id)
        if (!guild) {
          this.emit('stageInstanceUpdate', packet, null)
          break
        }
        const stageInstance = guild.stageInstances.get(packet.id)
        let oldStageInstance = null
        if (stageInstance) {
          oldStageInstance = {
            topic: stageInstance.topic,
          }
        }

        this.emit('stageInstanceUpdate', guild.stageInstances.update(new StageInstance(packet, this.client)), oldStageInstance)
        break
      }
      case 'STAGE_INSTANCE_DELETE': {
        const packet = pkt.d as DiscordStageInstance

        const guild = this.client.guilds.get(packet.guild_id)
        if (!guild) {
          this.emit('stageInstanceDelete', new StageInstance(packet, this.client))
          break
        }

        this.emit('stageInstanceDelete', guild.stageInstances.remove(packet) ?? new StageInstance(packet, this.client))
        break
      }
      case 'GUILD_INTEGRATIONS_UPDATE': {
        // Ignore this
        break
      }
      case 'INTERACTION_CREATE': {
        const packet = pkt.d as DiscordInteraction

        this.emit('interactionCreate', generateInteractionFrom(packet, this.client))
        break
      }
      default: {
        this.emit('unknown', pkt, this.id)
        break
      }
    } /* eslint-enable no-redeclare */
  }

  _onWSClose(event: { code: number; reason: string }) {
    // dd handles this internally
  }

  _onWSError(_err: Error) {
    // dd handls this internally
  }

  _onWSMessage(data: any) {
    this.discordeno.handleMessage(data)
  }

  _onWSOpen() {
    // Handled by dd internally
    this.emit('connect', this.id)
  }

  toString() {
    return Base.prototype.toString.call(this)
  }

  toJSON(props: string[] = []) {
    return Base.prototype.toJSON.call(this, [
      'connecting',
      'ready',
      'status',
      'lastHeartbeatReceived',
      'lastHeartbeatSent',
      'latency',
      'preReady',
      'getAllUsersCount',
      'getAllUsersQueue',
      'getAllUsersLength',
      'guildSyncQueue',
      'guildSyncQueueLength',
      'unsyncedGuilds',
      'lastHeartbeatAck',
      'seq',
      'sessionID',
      'reconnectInterval',
      'connectAttempts',
      ...props,
    ])
  }
}

export default Shard
