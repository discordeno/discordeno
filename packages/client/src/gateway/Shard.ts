// @ts-nocheck too annoying to fix type errors atm

/* eslint-disable no-useless-call */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-dynamic-delete */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  ChannelTypes,
  GatewayOpcodes,
  Intents,
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
  type DiscordHello,
  type DiscordInteraction,
  type DiscordInviteCreate,
  type DiscordInviteDelete,
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
  type DiscordVoiceServerUpdate,
  type DiscordVoiceState,
  type DiscordWebhookUpdate,
} from '@discordeno/types'
import EventEmitter from 'events'
import Base from '../Base.js'
import type Client from '../Client.js'
import Channel from '../Structures/channels/Channel.js'
import GuildChannel from '../Structures/channels/Guild.js'
import PrivateChannel from '../Structures/channels/Private.js'
import type StageChannel from '../Structures/channels/Stage.js'
import type TextChannel from '../Structures/channels/Text.js'
import type TextVoiceChannel from '../Structures/channels/TextVoice.js'
import ThreadChannel from '../Structures/channels/threads/Thread.js'
import type VoiceChannel from '../Structures/channels/Voice.js'
import Guild from '../Structures/guilds/Guild.js'
import Member from '../Structures/guilds/Member.js'
import Role from '../Structures/guilds/Role.js'
import StageInstance from '../Structures/guilds/StageInstance.js'
import UnavailableGuild from '../Structures/guilds/Unavailable.js'
import Interaction from '../Structures/interactions/Interaction.js'
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
import type BrowserWebSocket from '../utils/BrowserWebSocket.js'
import Bucket from '../utils/Bucket.js'

export class Shard extends EventEmitter {
  client: Client
  connectAttempts: number = 0
  connecting = false
  connectTimeout: number | null = null
  discordServerTrace?: string[]
  getAllUsersCount: { [guildID: string]: boolean } = {}
  getAllUsersLength: number = 0
  getAllUsersQueue: unknown[] = []
  globalBucket!: Bucket
  guildCreateTimeout: number | null = null
  guildSyncQueue: string[] = []
  guildSyncQueueLength: number = 0
  heartbeatInterval: number | null = null
  id: number
  lastHeartbeatAck = false
  lastHeartbeatReceived: number | null = null
  lastHeartbeatSent: number | null = null
  latency: number = 0
  preReady = false
  presence!: ClientPresence
  presenceUpdateBucket!: Bucket
  ready = false
  reconnectInterval: number = 0
  requestMembersPromise: { [s: string]: RequestMembersPromise } = {}
  seq: number = 0
  sessionID: string | null = null
  status: 'connecting' | 'disconnected' | 'handshaking' | 'identifying' | 'ready' | 'resuming' = 'disconnected'

  unsyncedGuilds: number = 0
  ws: WebSocket | BrowserWebSocket | null = null

  constructor(id: number, client: Client) {
    super()

    this.id = id
    this.client = client

    this.onPacket = this.onPacket.bind(this)
    this._onWSOpen = this._onWSOpen.bind(this)
    this._onWSMessage = this._onWSMessage.bind(this)
    this._onWSError = this._onWSError.bind(this)
    this._onWSClose = this._onWSClose.bind(this)

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

  checkReady() {
    if (!this.ready) {
      this.ready = true
      super.emit('ready')
    }
  }

  /** Tells the shard to connect */
  connect() {
    if (this.ws && this.ws.readyState !== WebSocket.CLOSED) {
      this.emit('error', new Error('Existing connection detected'), this.id)
      return
    }
    ++this.connectAttempts
    this.connecting = true
    return this.initializeWS()
  }

  createGuild(guild: Guild) {
    this.client.guildShardMap[guild.id] = this.id
    this.client.guilds.set(guild.id, guild)

    return guild
  }

  /** Disconnects the shard */
  disconnect(options: { reconnect?: boolean | 'auto' } = {}, error?: Error) {
    if (!this.ws) {
      return
    }

    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval)
      this.heartbeatInterval = null
    }

    if (this.ws.readyState !== WebSocket.CLOSED) {
      this.ws.removeEventListener('message', this._onWSMessage)
      this.ws.removeEventListener('close', this._onWSClose)
      try {
        if (options.reconnect && this.sessionID) {
          if (this.ws.readyState === WebSocket.OPEN) {
            this.ws.close(4901, 'Eris: reconnect')
          } else {
            this.emit('debug', `Terminating websocket (state: ${this.ws.readyState})`, this.id)
            this.ws.close(1000, `Terminating websocket (state: ${this.ws.readyState})`)
          }
        } else {
          this.ws.close(1000, 'Eris: normal')
        }
      } catch (err) {
        this.emit('error', err, this.id)
      }
    }
    this.ws = null
    this.reset()

    if (error) {
      this.emit('error', error, this.id)
    }

    super.emit('disconnect', error)

    if (this.sessionID && this.connectAttempts >= this.client.options.maxResumeAttempts) {
      this.emit('debug', `Automatically invalidating session due to excessive resume attempts | Attempt ${this.connectAttempts}`, this.id)
      this.sessionID = null
    }

    if (options.reconnect === 'auto' && this.client.options.autoreconnect) {
      if (this.sessionID) {
        this.emit('debug', `Immediately reconnecting for potential resume | Attempt ${this.connectAttempts}`, this.id)
        this.client.shards.connect(this)
      } else {
        this.emit('debug', `Queueing reconnect in ${this.reconnectInterval}ms | Attempt ${this.connectAttempts}`, this.id)
        setTimeout(() => {
          this.client.shards.connect(this)
        }, this.reconnectInterval)
        this.reconnectInterval = Math.min(Math.round(this.reconnectInterval * (Math.random() * 2 + 1)), 30000)
      }
    } else if (!options.reconnect) {
      this.hardReset()
    }
  }

  /**
   * Update the bot's AFK status.
   */
  editAFK(afk: boolean) {
    this.presence.afk = !!afk

    this.sendStatusUpdate()
  }

  /**
   * Updates the bot's status on all guilds the shard is in
   */
  editStatus(status: SelfStatus, activities?: Array<ActivityPartial<BotActivityType>> | ActivityPartial<BotActivityType>) {
    if (activities === undefined && typeof status === 'object') {
      activities = status
      // @ts-expect-error
      status = undefined
    }
    if (status) {
      this.presence.status = status
    }
    if (activities === null) {
      activities = []
    } else if (activities && !Array.isArray(activities)) {
      activities = [activities]
    }
    if (activities !== undefined) {
      if (activities.length > 0 && !activities[0].hasOwnProperty('type')) {
        activities[0].type = activities[0].url ? 1 : 0
      }
      this.presence.activities = activities
    }

    this.sendStatusUpdate()
  }

  emit(event: string, ...args: any[]) {
    this.client.emit.call(this.client, event, ...args)
    if (event !== 'error' || this.listeners('error').length > 0) {
      super.emit.call(this, event, ...args)
    }

    return false
  }

  getGuildMembers(guildID: string, timeout: number) {
    if (this.getAllUsersCount.hasOwnProperty(guildID)) {
      throw new Error('Cannot request all members while an existing request is processing')
    }
    this.getAllUsersCount[guildID] = true
    // Using intents, request one guild at a time
    if (this.client.options.intents) {
      if (!(this.client.options.intents & Intents.GuildMembers)) {
        throw new Error('Cannot request all members without guildMembers intent')
      }
      this.requestGuildMembers(guildID, { timeout })
    } else {
      if (this.getAllUsersLength + 3 + guildID.length > 4048) {
        // 4096 - "{\"op\":8,\"d\":{\"guild_id\":[],\"query\":\"\",\"limit\":0}}".length + 1 for lazy comma offset
        this.requestGuildMembers(this.getAllUsersQueue)
        this.getAllUsersQueue = [guildID]
        this.getAllUsersLength = 1 + guildID.length + 3
      } else {
        this.getAllUsersQueue.push(guildID)
        this.getAllUsersLength += guildID.length + 3
      }
    }
  }

  hardReset() {
    this.reset()
    this.seq = 0
    this.sessionID = null
    this.reconnectInterval = 1000
    this.connectAttempts = 0
    this.ws = null
    this.heartbeatInterval = null
    this.guildCreateTimeout = null
    this.globalBucket = new Bucket(120, 60000, { reservedTokens: 5 })
    this.presenceUpdateBucket = new Bucket(5, 20000)
    this.presence = JSON.parse(JSON.stringify(this.client.presence))
  }

  heartbeat(normal?: boolean) {
    // Can only heartbeat after identify/resume succeeds, session will be killed otherwise, discord/discord-api-docs#1619
    if (this.status === 'resuming' || this.status === 'identifying') {
      return
    }
    if (normal) {
      if (!this.lastHeartbeatAck) {
        this.emit(
          'debug',
          'Heartbeat timeout; ' +
            JSON.stringify({
              lastReceived: this.lastHeartbeatReceived,
              lastSent: this.lastHeartbeatSent,
              interval: this.heartbeatInterval,
              status: this.status,
              timestamp: Date.now(),
            }),
        )
        return this.disconnect(
          {
            reconnect: 'auto',
          },
          new Error("Server didn't acknowledge previous heartbeat, possible lost connection"),
        )
      }
      this.lastHeartbeatAck = false
    }
    this.lastHeartbeatSent = Date.now()
    this.sendWS(GatewayOpcodes.Heartbeat, this.seq, true)
  }

  identify() {
    this.status = 'identifying'
    const identify = {
      token: this.client.token,
      v: API_VERSION,
      compress: !!this.client.options.compress,
      large_threshold: this.client.options.largeThreshold,
      intents: this.client.options.intents,
      properties: {
        os: process.platform,
        browser: 'Eris',
        device: 'Eris',
      },
      shard: this.client.options.maxShards > 1 ? [this.id, this.client.options.maxShards] : undefined,
      presence: this.presence.status ? this.presence : undefined,
    }
    this.sendWS(GatewayOpcodes.Identify, identify)
  }

  initializeWS() {
    if (!this.token) {
      return this.disconnect(null, new Error('Token not specified'))
    }

    this.status = 'connecting'
    if (this.client.options.compress) {
      this.emit('debug', 'Initializing zlib-sync-based compression')
    }
    this.ws = new WebSocket(this.client.gatewayURL, this.client.options.ws)
    this.ws.addEventListener('open', this._onWSOpen)
    this.ws.addEventListener('message', this._onWSMessage)
    this.ws.addEventListener('error', this._onWSError)
    this.ws.addEventListener('close', this._onWSClose)

    this.connectTimeout = setTimeout(() => {
      if (this.connecting) {
        this.disconnect(
          {
            reconnect: 'auto',
          },
          new Error('Connection timeout'),
        )
      }
    }, this.client.options.connectionTimeout)
  }

  onPacket(packet: DiscordGatewayPayload) {
    if (this.listeners('rawWS').length > 0 || this.client.listeners('rawWS').length) {
      this.emit('rawWS', packet, this.id)
    }

    if (packet.s) {
      if (packet.s > this.seq + 1 && this.ws && this.status !== 'resuming') {
        this.emit('warn', `Non-consecutive sequence (${this.seq} -> ${packet.s})`, this.id)
      }
      this.seq = packet.s
    }

    switch (packet.op) {
      case GatewayOpcodes.Dispatch: {
        if (!this.client.options.disableEvents[packet.t]) {
          this.wsEvent(packet)
        }
        break
      }
      case GatewayOpcodes.Heartbeat: {
        this.heartbeat()
        break
      }
      case GatewayOpcodes.InvalidSession: {
        this.seq = 0
        this.sessionID = null
        this.emit('warn', 'Invalid session, reidentifying!', this.id)
        this.identify()
        break
      }
      case GatewayOpcodes.Reconnect: {
        this.emit('debug', 'Reconnecting due to server request', this.id)
        this.disconnect({
          reconnect: 'auto',
        })
        break
      }
      case GatewayOpcodes.Hello: {
        if ((packet.d as DiscordHello).heartbeat_interval > 0) {
          if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval)
          }
          this.heartbeatInterval = setInterval(() => this.heartbeat(true), (packet.d as DiscordHello).heartbeat_interval)
        }

        // @ts-expect-error js hacks
        this.discordServerTrace = packet.d._trace
        this.connecting = false
        if (this.connectTimeout) {
          clearTimeout(this.connectTimeout)
        }
        this.connectTimeout = null

        if (this.sessionID) {
          this.resume()
        } else {
          this.identify()
          // Cannot heartbeat when resuming, discord/discord-api-docs#1619
          this.heartbeat()
        }

        // @ts-expect-error js hacks
        this.emit('hello', packet.d._trace, this.id)
        break /* eslint-enable no-unreachable */
      }
      case GatewayOpcodes.HeartbeatACK: {
        this.lastHeartbeatAck = true
        this.lastHeartbeatReceived = Date.now()
        this.latency = this.lastHeartbeatReceived - (this.lastHeartbeatSent ?? 0)
        break
      }
      default: {
        this.emit('unknown', packet, this.id)
        break
      }
    }
  }

  async requestGuildMembers(guildID: string, options?: RequestGuildMembersOptions) {
    const opts = {
      guild_id: guildID,
      limit: options?.limit ?? 0,
      user_ids: options?.user_ids,
      query: options?.query,
      nonce: Date.now().toString() + Math.random().toString(36),
      presences: options?.presences,
    }
    if (!opts.user_ids && !opts.query) {
      opts.query = ''
    }
    if (!opts.query && !opts.user_ids && this.client.options.intents && !(this.client.options.intents & Intents.GuildMembers)) {
      throw new Error('Cannot request all members without guildMembers intent')
    }
    if (opts.presences && this.client.options.intents && !(this.client.options.intents & Intents.GuildPresences)) {
      throw new Error('Cannot request members presences without guildPresences intent')
    }
    if (opts.user_ids && opts.user_ids.length > 100) {
      throw new Error('Cannot request more than 100 users by their ID')
    }
    this.sendWS(GatewayOpcodes.RequestGuildMembers, opts)
    return await new Promise(
      (resolve) =>
        (this.requestMembersPromise[opts.nonce] = {
          resolve,
          received: 0,
          members: [],
          timeout: setTimeout(() => {
            resolve(this.requestMembersPromise[opts.nonce].members)
            delete this.requestMembersPromise[opts.nonce]
          }, options?.timeout ?? this.client.options.requestTimeout),
        }),
    )
  }

  reset() {
    this.connecting = false
    this.ready = false
    this.preReady = false
    if (this.requestMembersPromise !== undefined) {
      for (const guildID in this.requestMembersPromise) {
        if (!this.requestMembersPromise.hasOwnProperty(guildID)) {
          continue
        }
        clearTimeout(this.requestMembersPromise[guildID].timeout)
        this.requestMembersPromise[guildID].res(this.requestMembersPromise[guildID].received)
      }
    }
    this.requestMembersPromise = {}
    this.getAllUsersCount = {}
    this.getAllUsersQueue = []
    this.getAllUsersLength = 1
    this.guildSyncQueue = []
    this.guildSyncQueueLength = 1
    this.unsyncedGuilds = 0
    this.latency = Infinity
    this.lastHeartbeatAck = true
    this.lastHeartbeatReceived = null
    this.lastHeartbeatSent = null
    this.status = 'disconnected'
    if (this.connectTimeout) {
      clearTimeout(this.connectTimeout)
    }
    this.connectTimeout = null
  }

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
    this.status = 'resuming'
    this.sendWS(GatewayOpcodes.Resume, {
      token: this.client.token,
      session_id: this.sessionID,
      seq: this.seq,
    })
  }

  sendStatusUpdate() {
    this.sendWS(GatewayOpcodes.PresenceUpdate, {
      activities: this.presence.activities,
      afk: false,
      since: this.presence.status === 'idle' ? Date.now() : 0,
      status: this.presence.status,
    })
  }

  sendWS(op: number, _data: Record<string, unknown> | number, priority = false) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      let i = 0
      let waitFor = 1
      const func = () => {
        if (++i >= waitFor && this.ws && this.ws.readyState === WebSocket.OPEN) {
          const data = JSON.stringify({ op, d: _data })
          this.ws.send(data)
          // @ts-expect-error js hacks
          if (_data.token) {
            // @ts-expect-error js hacks
            delete _data.token
          }
          this.emit('debug', JSON.stringify({ op, d: _data }), this.id)
        }
      }
      if (op === GatewayOpcodes.PresenceUpdate) {
        ++waitFor
        this.presenceUpdateBucket.queue(func, priority)
      }
      this.globalBucket.queue(func, priority)
    }
  }

  wsEvent(pkt: Required<DiscordGatewayPayload>) {
    switch (
      pkt.t /* eslint-disable no-redeclare */ // (╯°□°）╯︵ ┻━┻
    ) {
      case 'PRESENCE_UPDATE': {
        const packet = pkt as Omit<DiscordGatewayPayload, 'd'> & {
          d: DiscordPresenceUpdate
        }

        if (packet.d.user.username !== undefined) {
          let user = this.client.users.get(packet.d.user.id)
          let oldUser = null
          if (
            user &&
            (user.username !== packet.d.user.username || user.discriminator !== packet.d.user.discriminator || user.avatar !== packet.d.user.avatar)
          ) {
            oldUser = {
              username: user.username,
              discriminator: user.discriminator,
              avatar: user.avatar,
            }
          }
          if (!user || oldUser) {
            user = this.client.users.update(new User(packet.d.user, this.client), this.client)
            this.emit('userUpdate', user, oldUser)
          }
        }

        const guild = this.client.guilds.get(packet.d.guild_id)
        if (!guild) {
          this.emit('debug', 'Rogue presence update: ' + JSON.stringify(packet), this.id)
          break
        }
        // @ts-expect-error js hacks
        let member = guild.members.get((packet.d.id = packet.d.user.id))
        let oldPresence = null
        if (member) {
          oldPresence = {
            activities: member.activities,
            clientStatus: member.clientStatus,
            status: member.status,
          }
        }
        if ((!member && packet.d.user.username) || oldPresence) {
          member = guild.members.update(packet.d, guild)
          this.emit('presenceUpdate', member, oldPresence)
        }
        break
      }
      case 'VOICE_STATE_UPDATE': {
        const packet = pkt as Omit<DiscordGatewayPayload, 'd'> & {
          d: DiscordVoiceState
        }

        // (╯°□°）╯︵ ┻━┻
        if (packet.d.guild_id && packet.d.user_id === this.client.id) {
          const voiceConnection = this.client.voiceConnections.get(packet.d.guild_id)
          if (voiceConnection) {
            if (packet.d.channel_id === null) {
              this.client.voiceConnections.leave(packet.d.guild_id)
            } else if (voiceConnection.channelID !== packet.d.channel_id) {
              voiceConnection.switchChannel(packet.d.channel_id, true)
            }
          }
        }
        if (packet.d.self_stream === undefined) {
          packet.d.self_stream = false
        }

        const guild = this.client.guilds.get(packet.d.guild_id!)
        if (!guild) {
          break
        }
        if (guild.pendingVoiceStates) {
          guild.pendingVoiceStates.push(packet.d)
          break
        }
        let member = guild.members.get((packet.d.id = packet.d.user_id))
        if (!member) {
          if (!packet.d.member) {
            this.emit(
              'voiceStateUpdate',
              {
                id: packet.d.user_id,
                voiceState: {
                  deaf: packet.d.deaf,
                  mute: packet.d.mute,
                  selfDeaf: packet.d.self_deaf,
                  selfMute: packet.d.self_mute,
                  selfStream: packet.d.self_stream,
                  selfVideo: packet.d.self_video,
                },
              },
              null,
            )
            break
          }
          // Updates the member cache with this member for future events.
          packet.d.member.id = packet.d.user_id
          member = new Member(packet.d.member, guild, this.client)
          guild.members.set(packet.d.user_id, member)

          const channel = guild.channels.find(
            (channel) =>
              (channel.type === ChannelTypes.GuildVoice || channel.type === ChannelTypes.GuildStageVoice) && channel.voiceMembers.get(packet.d.id),
          )
          if (channel) {
            channel.voiceMembers.remove(packet.d)
            this.emit('debug', 'VOICE_STATE_UPDATE member null but in channel: ' + packet.d.id, this.id)
          }
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
        member.update(packet.d)
        if (oldChannelID !== packet.d.channel_id) {
          let oldChannel: TextVoiceChannel | StageChannel | null, newChannel: TextVoiceChannel | StageChannel | null
          if (oldChannelID) {
            oldChannel = guild.channels.get(oldChannelID) as TextVoiceChannel | StageChannel
            if (oldChannel && oldChannel.type !== ChannelTypes.GuildVoice && oldChannel.type !== ChannelTypes.GuildStageVoice) {
              this.emit('warn', 'Old channel not a recognized voice channel: ' + oldChannelID, this.id)
              oldChannel = null
            }
          }
          if (
            packet.d.channel_id &&
            (newChannel = guild.channels.get(packet.d.channel_id) as TextVoiceChannel | StageChannel) &&
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
        const packet = pkt as Omit<DiscordGatewayPayload, 'd'> & {
          d: DiscordTypingStart
        }

        let member = null
        const guild = this.client.guilds.get(packet.d.guild_id ?? '')
        if (guild) {
          member = guild.members.update(new Member({ ...packet.d.member!, id: packet.d.user_id }, guild, this.client))
        }
        if (this.client.listeners('typingStart').length > 0) {
          this.emit(
            'typingStart',
            this.client.getChannel(packet.d.channel_id) ?? {
              id: packet.d.channel_id,
            },
            this.client.users.get(packet.d.user_id) ?? { id: packet.d.user_id },
            member,
          )
        }
        break
      }
      case 'MESSAGE_CREATE': {
        const packet = pkt as Omit<DiscordGatewayPayload, 'd'> & {
          d: DiscordMessage
        }

        const channel = this.client.getChannel(packet.d.channel_id)
        if (channel) {
          // MESSAGE_CREATE just when deleting o.o
          channel.lastMessageID = packet.d.id

          this.emit('messageCreate', channel.messages.add(new Message(packet.d, this.client)))
        } else {
          this.emit('messageCreate', new Message(packet.d, this.client))
        }
        break
      }
      case 'MESSAGE_UPDATE': {
        const packet = pkt as Omit<DiscordGatewayPayload, 'd'> & {
          d: DiscordMessage
        }

        const channel = this.client.getChannel(packet.d.channel_id)
        if (!channel) {
          packet.d.channel = {
            id: packet.d.channel_id,
          }
          this.emit('messageUpdate', packet.d, null)
          break
        }
        const message = channel.messages.get(packet.d.id)
        let oldMessage = null
        if (message) {
          oldMessage = {
            attachments: message.attachments,
            channelMentions: message.channelMentions,
            content: message.content,
            editedTimestamp: message.editedTimestamp,
            embeds: message.embeds,
            flags: message.flags,
            mentionedBy: message.mentionedBy,
            mentions: message.mentions,
            pinned: message.pinned,
            roleMentions: message.roleMentions,
            tts: message.tts,
          }
        } else if (!packet.d.timestamp) {
          packet.d.channel = channel
          this.emit('messageUpdate', packet.d, null)
          break
        }
        this.emit('messageUpdate', channel.messages.update(new Message(packet.d, this.client)), oldMessage)
        break
      }
      case 'MESSAGE_DELETE': {
        const packet = pkt as Omit<DiscordGatewayPayload, 'd'> & {
          d: DiscordMessageDelete
        }

        const channel = this.client.getChannel(packet.d.channel_id)

        this.emit(
          'messageDelete',
          channel?.messages.remove(new Message(packet.d, this.client)) || {
            id: packet.d.id,
            channel: channel ?? {
              id: packet.d.channel_id,
              guild: packet.d.guild_id ? { id: packet.d.guild_id } : undefined,
            },
            guildID: packet.d.guild_id,
          },
        )
        break
      }
      case 'MESSAGE_DELETE_BULK': {
        const packet = pkt as Omit<DiscordGatewayPayload, 'd'> & {
          d: DiscordMessageDeleteBulk
        }

        const channel = this.client.getChannel(packet.d.channel_id)

        this.emit(
          'messageDeleteBulk',
          packet.d.ids.map(
            (id) =>
              channel?.messages.remove({
                id,
              }) || {
                id,
                channel: {
                  id: packet.d.channel_id,
                  guild: packet.d.guild_id ? { id: packet.d.guild_id } : undefined,
                },
                guildID: packet.d.guild_id,
              },
          ),
        )
        break
      }
      case 'MESSAGE_REACTION_ADD': {
        const packet = pkt as Omit<DiscordGatewayPayload, 'd'> & {
          d: DiscordMessageReactionAdd
        }

        const channel = this.client.getChannel(packet.d.channel_id)
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
          message = channel.messages.get(packet.d.message_id)
          if (channel.guild) {
            if (packet.d.member) {
              // Updates the member cache with this member for future events.
              packet.d.member.id = packet.d.user_id
              member = channel.guild.members.update(packet.d.member, channel.guild)
            }
          }
        }
        if (message instanceof Message) {
          const reaction = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name!
          if (message.reactions[reaction]) {
            ++message.reactions[reaction].count
            if (packet.d.user_id === this.client.id) {
              message.reactions[reaction].me = true
            }
          } else {
            message.reactions[reaction] = {
              count: 1,
              me: packet.d.user_id === this.client.id,
            }
          }
        } else {
          message = {
            id: packet.d.message_id,
            channel: channel ?? { id: packet.d.channel_id },
          }

          if (packet.d.guild_id) {
            message.guildID = packet.d.guild_id
            if (!message.channel.guild) {
              message.channel.guild = { id: packet.d.guild_id }
            }
          }
        }
        this.emit('messageReactionAdd', message, packet.d.emoji, member || { id: packet.d.user_id })
        break
      }
      case 'MESSAGE_REACTION_REMOVE': {
        const packet = pkt as Omit<DiscordGatewayPayload, 'd'> & {
          d: DiscordMessageReactionRemove
        }

        const channel = this.client.getChannel(packet.d.channel_id)
        let message:
          | Message
          | {
              id: string
              channel: TextableChannel | { id: string }
              guildID?: string
            }
          | undefined
        if (channel) {
          message = channel.messages.get(packet.d.message_id)
        }
        if (message instanceof Message) {
          const reaction = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name!
          const reactionObj = message.reactions[reaction]
          if (reactionObj) {
            --reactionObj.count
            if (reactionObj.count === 0) {
              delete message.reactions[reaction]
            } else if (packet.d.user_id === this.client.id) {
              reactionObj.me = false
            }
          }
        } else {
          message = {
            id: packet.d.message_id,
            channel: channel ?? { id: packet.d.channel_id },
          }

          if (packet.d.guild_id) {
            message.guildID = packet.d.guild_id
            if (!message.channel.guild) {
              message.channel.guild = { id: packet.d.guild_id }
            }
          }
        }

        this.emit('messageReactionRemove', message, packet.d.emoji, packet.d.user_id)
        break
      }
      case 'MESSAGE_REACTION_REMOVE_ALL': {
        const packet = pkt as Omit<DiscordGatewayPayload, 'd'> & {
          d: DiscordMessageReactionRemoveAll
        }

        const channel = this.client.getChannel(packet.d.channel_id)
        let message
        if (channel) {
          message = channel.messages.get(packet.d.message_id)
          if (message) {
            message.reactions = {}
          }
        }
        if (!message) {
          message = {
            id: packet.d.message_id,
            channel: channel ?? { id: packet.d.channel_id },
          }
          if (packet.d.guild_id) {
            message.guildID = packet.d.guild_id
            if (!message.channel.guild) {
              message.channel.guild = { id: packet.d.guild_id }
            }
          }
        }

        this.emit('messageReactionRemoveAll', message)
        break
      }
      case 'MESSAGE_REACTION_REMOVE_EMOJI': {
        const packet = pkt as Omit<DiscordGatewayPayload, 'd'> & {
          d: DiscordMessageReactionRemoveEmoji
        }

        const channel = this.client.getChannel(packet.d.channel_id)
        let message
        if (channel) {
          message = channel.messages.get(packet.d.message_id)
          if (message) {
            const reaction = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name!
            delete message.reactions[reaction]
          }
        }
        if (!message) {
          message = {
            id: packet.d.message_id,
            channel: channel ?? { id: packet.d.channel_id },
          }
          if (packet.d.guild_id) {
            message.guildID = packet.d.guild_id
            if (!message.channel.guild) {
              message.channel.guild = { id: packet.d.guild_id }
            }
          }
        }

        this.emit('messageReactionRemoveEmoji', message, packet.d.emoji)
        break
      }
      case 'GUILD_MEMBER_ADD': {
        const packet = pkt as Omit<DiscordGatewayPayload, 'd'> & {
          d: DiscordGuildMemberAdd
        }

        const guild = this.client.guilds.get(packet.d.guild_id)
        if (!guild) {
          // Eventual Consistency™ (╯°□°）╯︵ ┻━┻
          this.emit('debug', `Missing guild ${packet.d.guild_id} in GUILD_MEMBER_ADD`)
          break
        }
        packet.d.id = packet.d.user.id
        guild.memberCount = (guild.memberCount ?? 0) + 1

        this.emit('guildMemberAdd', guild, guild.members.add(new Member(packet.d, guild, this.client)))
        break
      }
      case 'GUILD_MEMBER_UPDATE': {
        const packet = pkt as Omit<DiscordGatewayPayload, 'd'> & {
          d: DiscordGuildMemberUpdate
        }

        // Check for member update if GuildPresences intent isn't set, to prevent emitting twice
        if (!(this.client.options.intents & Intents.GuildPresences) && packet.d.user.username !== undefined) {
          let user = this.client.users.get(packet.d.user.id)
          let oldUser = null
          if (
            user &&
            (user.username !== packet.d.user.username || user.discriminator !== packet.d.user.discriminator || user.avatar !== packet.d.user.avatar)
          ) {
            oldUser = {
              username: user.username,
              discriminator: user.discriminator,
              avatar: user.avatar,
            }
          }
          if (!user || oldUser) {
            user = this.client.users.update(new User(packet.d.user, this.client))
            this.emit('userUpdate', user, oldUser)
          }
        }
        const guild = this.client.guilds.get(packet.d.guild_id)
        if (!guild) {
          this.emit('debug', `Missing guild ${packet.d.guild_id} in GUILD_MEMBER_UPDATE`)
          break
        }
        let member = guild.members.get((packet.d.id = packet.d.user.id))
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
        member = guild.members.update(new Member(packet.d, guild, this.client))

        this.emit('guildMemberUpdate', guild, member, oldMember)
        break
      }
      case 'GUILD_MEMBER_REMOVE': {
        const packet = pkt as Omit<DiscordGatewayPayload, 'd'> & {
          d: DiscordGuildMemberRemove
        }

        if (packet.d.user.id === this.client.id) {
          // The bot is probably leaving
          break
        }
        const guild = this.client.guilds.get(packet.d.guild_id)
        if (!guild) {
          break
        }
        guild.memberCount = (guild.memberCount ?? 0) - 1
        packet.d.id = packet.d.user.id

        this.emit(
          'guildMemberRemove',
          guild,
          guild.members.remove(new Member(packet.d, guild, this.client)) ?? {
            id: packet.d.id,
            user: new User(packet.d.user, this.client),
          },
        )
        break
      }
      case 'GUILD_CREATE': {
        const packet = pkt as Omit<DiscordGatewayPayload, 'd'> & {
          d: DiscordGuild
        }

        if (!packet.d.unavailable) {
          const guild = this.createGuild(new Guild(packet.d, this.client))
          if (this.ready) {
            if (this.client.unavailableGuilds.remove(new Guild(packet.d, this.client))) {
              this.emit('guildAvailable', guild)
            } else {
              this.emit('guildCreate', guild)
            }
          } else {
            this.client.unavailableGuilds.remove(new Guild(packet.d, this.client))
            this.restartGuildCreateTimeout()
          }
        } else {
          this.client.guilds.remove(new Guild(packet.d, this.client))

          this.emit('unavailableGuildCreate', this.client.unavailableGuilds.add(new UnavailableGuild(packet.d, this.client)))
        }
        break
      }
      case 'GUILD_UPDATE': {
        const packet = pkt as Omit<DiscordGatewayPayload, 'd'> & {
          d: DiscordGuild
        }

        const guild = this.client.guilds.get(packet.d.id)
        if (!guild) {
          this.emit('debug', `Guild ${packet.d.id} undefined in GUILD_UPDATE`)
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

        this.emit('guildUpdate', this.client.guilds.update(new Guild(packet.d, this.client)), oldGuild)
        break
      }
      case 'GUILD_DELETE': {
        const packet = pkt as Omit<DiscordGatewayPayload, 'd'> & {
          d: DiscordUnavailableGuild
        }

        const voiceConnection = this.client.voiceConnections.get(packet.d.id)
        if (voiceConnection) {
          if (voiceConnection.channelID) {
            this.client.leaveVoiceChannel(voiceConnection.channelID)
          } else {
            this.client.voiceConnections.leave(packet.d.id)
          }
        }

        delete this.client.guildShardMap[packet.d.id]
        const guild = this.client.guilds.remove(packet.d)
        if (guild) {
          // Discord sends GUILD_DELETE for guilds that were previously unavailable in READY
          guild.channels.forEach((channel) => {
            delete this.client.channelGuildMap[channel.id]
          })
        }
        if (packet.d.unavailable) {
          this.emit('guildUnavailable', this.client.unavailableGuilds.add(new UnavailableGuild(packet.d, this.client)))
        } else {
          this.emit(
            'guildDelete',
            guild ?? {
              id: packet.d.id,
            },
          )
        }
        break
      }
      case 'GUILD_BAN_ADD': {
        const packet = pkt as Omit<DiscordGatewayPayload, 'd'> & {
          d: DiscordGuildBanAddRemove
        }

        this.emit('guildBanAdd', this.client.guilds.get(packet.d.guild_id), this.client.users.update(new User(packet.d.user, this.client)))
        break
      }
      case 'GUILD_BAN_REMOVE': {
        const packet = pkt as Omit<DiscordGatewayPayload, 'd'> & {
          d: DiscordGuildBanAddRemove
        }

        this.emit('guildBanRemove', this.client.guilds.get(packet.d.guild_id), this.client.users.update(new User(packet.d.user, this.client)))
        break
      }
      case 'GUILD_ROLE_CREATE': {
        const packet = pkt as Omit<DiscordGatewayPayload, 'd'> & {
          d: DiscordGuildRoleCreate
        }

        const guild = this.client.guilds.get(packet.d.guild_id)
        if (!guild) {
          this.emit('debug', `Missing guild ${packet.d.guild_id} in GUILD_ROLE_CREATE`)
          break
        }
        this.emit('guildRoleCreate', guild, guild.roles.add(new Role(packet.d.role, guild)))
        break
      }
      case 'GUILD_ROLE_UPDATE': {
        const packet = pkt as Omit<DiscordGatewayPayload, 'd'> & {
          d: DiscordGuildRoleUpdate
        }

        const guild = this.client.guilds.get(packet.d.guild_id)
        if (!guild) {
          this.emit('debug', `Guild ${packet.d.guild_id} undefined in GUILD_ROLE_UPDATE`)
          break
        }
        const role = new Role(packet.d.role, guild)
        guild.roles.set(role.id, role)
        if (!role) {
          this.emit('debug', `Role ${packet.d.role.id} in guild ${packet.d.guild_id} undefined in GUILD_ROLE_UPDATE`)
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

        this.emit('guildRoleUpdate', guild, guild.roles.update(new Role(packet.d.role, guild)), oldRole)
        break
      }
      case 'GUILD_ROLE_DELETE': {
        const packet = pkt as Omit<DiscordGatewayPayload, 'd'> & {
          d: DiscordGuildRoleDelete
        }

        const guild = this.client.guilds.get(packet.d.guild_id)
        if (!guild) {
          this.emit('debug', `Missing guild ${packet.d.guild_id} in GUILD_ROLE_DELETE`)
          break
        }
        if (!guild.roles.has(packet.d.role_id)) {
          this.emit('debug', `Missing role ${packet.d.role_id} in GUILD_ROLE_DELETE`)
          break
        }
        this.emit('guildRoleDelete', guild, guild.roles.remove({ id: packet.d.role_id }))
        break
      }
      case 'INVITE_CREATE': {
        const packet = pkt as Omit<DiscordGatewayPayload, 'd'> & {
          d: DiscordInviteCreate
        }

        const guild = this.client.guilds.get(packet.d.guild_id ?? '')
        if (!guild) {
          this.emit('debug', `Missing guild ${packet.d.guild_id} in INVITE_CREATE`)
          break
        }
        const channel = this.client.getChannel(packet.d.channel_id)
        if (!channel) {
          this.emit('debug', `Missing channel ${packet.d.channel_id} in INVITE_CREATE`)
          break
        }

        this.emit(
          'inviteCreate',
          guild,
          new Invite(
            {
              ...packet.d,
              guild,
              channel,
            },
            this.client,
          ),
        )
        break
      }
      case 'INVITE_DELETE': {
        const packet = pkt as Omit<DiscordGatewayPayload, 'd'> & {
          d: DiscordInviteDelete
        }

        const guild = this.client.guilds.get(packet.d.guild_id ?? '')
        if (!guild) {
          this.emit('debug', `Missing guild ${packet.d.guild_id} in INVITE_DELETE`)
          break
        }
        const channel = this.client.getChannel(packet.d.channel_id)
        if (!channel) {
          this.emit('debug', `Missing channel ${packet.d.channel_id} in INVITE_DELETE`)
          break
        }

        this.emit(
          'inviteDelete',
          guild,
          new Invite(
            {
              ...packet.d,
              guild,
              channel,
            },
            this.client,
          ),
        )
        break
      }
      case 'CHANNEL_CREATE': {
        const packet = pkt as Omit<DiscordGatewayPayload, 'd'> & {
          d: DiscordChannel
        }

        const channel = Channel.from(packet.d, this.client)
        if (packet.d.guild_id) {
          if (!channel.guild) {
            channel.guild = this.client.guilds.get(packet.d.guild_id)
            if (!channel.guild) {
              this.emit('debug', `Received CHANNEL_CREATE for channel in missing guild ${packet.d.guild_id}`)
              break
            }
          }
          channel.guild.channels.add(channel, this.client)
          this.client.channelGuildMap[packet.d.id] = packet.d.guild_id

          this.emit('channelCreate', channel)
        } else {
          this.emit('warn', new Error('Unhandled CHANNEL_CREATE type: ' + JSON.stringify(packet, null, 2)))
          break
        }
        break
      }
      case 'CHANNEL_UPDATE': {
        const packet = pkt as Omit<DiscordGatewayPayload, 'd'> & {
          d: DiscordChannel
        }

        let channel = this.client.getChannel(packet.d.id) as GuildChannel
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
          this.emit('warn', `Unexpected CHANNEL_UPDATE for channel ${packet.d.id} with type ${oldType}`)
        }
        if (oldType === packet.d.type) {
          channel.update(packet.d)
        } else {
          this.emit('debug', `Channel ${packet.d.id} changed from type ${oldType} to ${packet.d.type}`)
          const newChannel = Channel.from(packet.d, this.client) as GuildChannel
          if (packet.d.guild_id) {
            const guild = this.client.guilds.get(packet.d.guild_id)
            if (!guild) {
              this.emit('debug', `Received CHANNEL_UPDATE for channel in missing guild ${packet.d.guild_id}`)
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
        const packet = pkt as Omit<DiscordGatewayPayload, 'd'> & {
          d: DiscordChannel
        }

        if (packet.d.type === ChannelTypes.DM || packet.d.type === undefined) {
          if (this.id === 0) {
            const channel = this.client.privateChannels.remove(new PrivateChannel(packet.d, this.client))
            if (channel) {
              delete this.client.privateChannelMap[channel.recipient?.id ?? '']

              this.emit('channelDelete', channel)
            }
          }
        } else if (packet.d.guild_id) {
          delete this.client.channelGuildMap[packet.d.id]
          const guild = this.client.guilds.get(packet.d.guild_id)
          if (!guild) {
            this.emit('debug', `Missing guild ${packet.d.guild_id} in CHANNEL_DELETE`)
            break
          }
          const channel = guild.channels.remove(new GuildChannel(packet.d, this.client))
          if (!channel) {
            break
          }
          if (channel.type === ChannelTypes.GuildVoice || channel.type === ChannelTypes.GuildStageVoice) {
            channel.voiceMembers.forEach((member) => {
              channel.voiceMembers.remove(member)
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
        const packet = pkt as Omit<DiscordGatewayPayload, 'd'> & {
          d: DiscordGuildMembersChunk
        }

        const guild = this.client.guilds.get(packet.d.guild_id)
        if (!guild) {
          this.emit(
            'debug',
            `Received GUILD_MEMBERS_CHUNK, but guild ${packet.d.guild_id} is ` +
              (this.client.unavailableGuilds.has(packet.d.guild_id) ? 'unavailable' : 'missing'),
            this.id,
          )
          break
        }

        const members = packet.d.members.map((member) => {
          member.id = member.user.id
          return guild.members.add(new Member(member, guild, this.client))
        })

        if (packet.d.presences) {
          packet.d.presences.forEach((presence) => {
            const member = guild.members.get(presence.user.id)
            if (member) {
              member.update(presence)
            }
          })
        }

        if (this.requestMembersPromise.hasOwnProperty(packet.d.nonce ?? '')) {
          this.requestMembersPromise[packet.d.nonce ?? ''].members.push(...members)
        }

        if (packet.d.chunk_index >= packet.d.chunk_count - 1) {
          if (this.requestMembersPromise.hasOwnProperty(packet.d.nonce ?? '')) {
            clearTimeout(this.requestMembersPromise[packet.d.nonce ?? ''].timeout)
            this.requestMembersPromise[packet.d.nonce ?? ''].res(this.requestMembersPromise[packet.d.nonce ?? ''].members)
            delete this.requestMembersPromise[packet.d.nonce ?? '']
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
        const packet = pkt as Omit<DiscordGatewayPayload, 'd'> & {
          d: DiscordReady
        }

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

        if (packet.t === 'RESUMED') {
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

        this.client.user = this.client.users.update(new ExtendedUser(packet.d.user, this.client), this.client)

        if (!this.client.token.startsWith('Bot ')) {
          this.client.token = 'Bot ' + this.client.token
        }

        if (packet.d._trace) {
          this.discordServerTrace = packet.d._trace
        }

        this.sessionID = packet.d.session_id

        packet.d.guilds.forEach((guild) => {
          if (guild.unavailable) {
            this.client.guilds.delete(guild.id)
            this.client.unavailableGuilds.set(guild.id, new UnavailableGuild(guild, this.client))
          } else {
            this.client.unavailableGuilds.remove(this.createGuild(guild))
          }
        })

        this.client.application = packet.d.application

        this.preReady = true

        this.emit('shardPreReady', this.id)

        if (this.client.unavailableGuilds.size > 0 && packet.d.guilds.length > 0) {
          this.restartGuildCreateTimeout()
        } else {
          this.checkReady()
        }

        break
      }
      case 'VOICE_SERVER_UPDATE': {
        const packet = pkt as Omit<DiscordGatewayPayload, 'd'> & {
          d: DiscordVoiceServerUpdate
        }

        packet.d.session_id = this.sessionID
        packet.d.user_id = this.client.id
        packet.d.shard = this

        this.client.voiceConnections.voiceServerUpdate(packet.d)

        break
      }
      case 'USER_UPDATE': {
        const packet = pkt as Omit<DiscordGatewayPayload, 'd'> & {
          d: DiscordUser
        }

        let user = this.client.users.get(packet.d.id)
        let oldUser = null
        if (user) {
          oldUser = {
            username: user.username,
            discriminator: user.discriminator,
            avatar: user.avatar,
          }
        }
        user = this.client.users.update(new User(packet.d, this.client))
        this.emit('userUpdate', user, oldUser)
        break
      }
      case 'GUILD_EMOJIS_UPDATE': {
        const packet = pkt as Omit<DiscordGatewayPayload, 'd'> & {
          d: DiscordGuildEmojisUpdate
        }

        const guild = this.client.guilds.get(packet.d.guild_id)
        let oldEmojis = null
        let emojis = packet.d.emojis
        if (guild) {
          oldEmojis = guild.emojis
          guild.update(packet.d)
          emojis = guild.emojis
        }

        this.emit('guildEmojisUpdate', guild ?? { id: packet.d.guild_id }, emojis, oldEmojis)
        break
      }
      // TODO: Add this when dd has the support for this event
      // case 'GUILD_STICKERS_UPDATE': {
      // const packet = pkt as Omit<DiscordGatewayPayload, 'd'> & { d: {} };

      // const guild = this.client.guilds.get(packet.d.guild_id);
      // let oldStickers = null;
      // let stickers = packet.d.stickers;
      // if (guild) {
      // oldStickers = guild.stickers;
      // guild.update(packet.d);
      // stickers = guild.stickers;
      // }
      // this.emit('guildStickersUpdate', guild || { id: packet.d.guild_id }, stickers, oldStickers);
      // break;
      // }

      case 'CHANNEL_PINS_UPDATE': {
        const packet = pkt as Omit<DiscordGatewayPayload, 'd'> & {
          d: DiscordChannelPinsUpdate
        }

        const channel = this.client.getChannel(packet.d.channel_id)
        if (!channel) {
          this.emit('debug', `CHANNEL_PINS_UPDATE target channel ${packet.d.channel_id} not found`)
          break
        }
        const oldTimestamp = channel.lastPinTimestamp
        channel.lastPinTimestamp = Date.parse(packet.d.last_pin_timestamp ?? '')

        this.emit('channelPinUpdate', channel, channel.lastPinTimestamp, oldTimestamp)
        break
      }
      case 'WEBHOOKS_UPDATE': {
        const packet = pkt as Omit<DiscordGatewayPayload, 'd'> & {
          d: DiscordWebhookUpdate
        }

        this.emit('webhooksUpdate', {
          channelID: packet.d.channel_id,
          guildID: packet.d.guild_id,
        })
        break
      }
      case 'THREAD_CREATE': {
        const packet = pkt as Omit<DiscordGatewayPayload, 'd'> & {
          d: DiscordChannel
        }

        const channel = Channel.from(packet.d, this.client) as ThreadChannel
        if (!channel.guild) {
          channel.guild = this.client.guilds.get(packet.d.guild_id ?? '')!
          if (!channel.guild) {
            this.emit('debug', `Received THREAD_CREATE for channel in missing guild ${packet.d.guild_id}`)
            break
          }
        }
        channel.guild.threads.add(channel, this.client)
        this.client.threadGuildMap[packet.d.id] = packet.d.guild_id ?? ''

        this.emit('threadCreate', channel)
        break
      }
      case 'THREAD_UPDATE': {
        const packet = pkt as Omit<DiscordGatewayPayload, 'd'> & {
          d: DiscordChannel
        }

        const channel = this.client.getChannel(packet.d.id)
        if (!channel) {
          const thread = Channel.from(packet.d, this.client) as ThreadChannel
          this.emit('threadUpdate', this.client.guilds.get(packet.d.guild_id ?? '')?.threads.add(thread, this.client), null)
          this.client.threadGuildMap[packet.d.id] = packet.d.guild_id ?? ''
          break
        }
        if (!(channel instanceof ThreadChannel)) {
          this.emit('warn', `Unexpected THREAD_UPDATE for channel ${packet.d.id} with type ${channel.type}`)
          break
        }
        const oldChannel = {
          name: channel.name,
          rateLimitPerUser: channel.rateLimitPerUser,
          threadMetadata: channel.threadMetadata,
        }
        channel.update(packet.d)

        this.emit('threadUpdate', channel, oldChannel)
        break
      }
      case 'THREAD_DELETE': {
        const packet = pkt as Omit<DiscordGatewayPayload, 'd'> & {
          d: Pick<DiscordChannel, 'id' | 'guild_id' | 'parent_id' | 'type'>
        }

        delete this.client.threadGuildMap[packet.d.id]
        const guild = this.client.guilds.get(packet.d.guild_id ?? '')
        if (!guild) {
          this.emit('debug', `Missing guild ${packet.d.guild_id} in THREAD_DELETE`)
          break
        }
        const channel = guild.threads.get(packet.d.id)
        guild.threads.delete(packet.d.id)
        if (!channel) {
          break
        }

        this.emit('threadDelete', channel)
        break
      }
      case 'THREAD_LIST_SYNC': {
        const packet = pkt as Omit<DiscordGatewayPayload, 'd'> & {
          d: DiscordThreadListSync
        }

        const guild = this.client.guilds.get(packet.d.guild_id)
        if (!guild) {
          this.emit('debug', `Missing guild ${packet.d.guild_id} in THREAD_LIST_SYNC`)
          break
        }
        const deletedThreads = (packet.d.channel_ids ?? guild.threads.map((c) => c.id)) // REVIEW Is this a good name?
          .filter((c) => !packet.d.threads.some((t) => t.id === c))
          .map((id) => guild.threads.remove({ id }) ?? { id })
        const activeThreads = packet.d.threads.map((t) => guild.threads.update(t, this.client))
        const joinedThreadsMember = packet.d.members.map((m) => guild.threads.get(m.id)?.members.update(m, this.client))

        this.emit('threadListSync', guild, deletedThreads, activeThreads, joinedThreadsMember)
        break
      }
      // TODO: Add this when dd has the support for this event
      // case 'THREAD_MEMBER_UPDATE': {
      //     const channel = this.client.getChannel(packet.d.id);
      //     if (!channel) {
      //         this.emit('debug', `Missing channel ${packet.d.id} in THREAD_MEMBER_UPDATE`);
      //         break;
      //     }
      //     let oldMember = null;
      //     // Thanks Discord
      //     packet.d.thread_id = packet.d.id;
      //     let member = channel.members.get((packet.d.id = packet.d.user_id));
      //     if (member) {
      //         oldMember = {
      //             flags: member.flags,
      //         };
      //     }
      //     member = channel.members.update(packet.d, this.client);
      //     this.emit('threadMemberUpdate', channel, member, oldMember);
      //     break;
      // }
      case 'THREAD_MEMBERS_UPDATE': {
        const packet = pkt as Omit<DiscordGatewayPayload, 'd'> & {
          d: DiscordThreadMembersUpdate
        }

        const channel = this.client.getChannel(packet.d.id) as unknown as ThreadChannel
        if (!channel) {
          this.emit('debug', `Missing channel ${packet.d.id} in THREAD_MEMBERS_UPDATE`)
          break
        }
        channel.update(packet.d)
        let addedMembers
        let removedMembers
        if (packet.d.added_members) {
          addedMembers = packet.d.added_members.map((m) => {
            if (m.presence) {
              m.presence.id = m.presence.user.id
              this.client.users.update(m.presence.user, this.client)
            }

            m.thread_id = m.id
            m.id = m.user_id
            m.member.id = m.member.user.id
            const guild = this.client.guilds.get(packet.d.guild_id)
            if (guild) {
              if (m.presence) {
                guild.members.update(m.presence, guild)
              }
              guild.members.update(m.member, guild)
            }
            return channel.members.update(m, this.client)
          })
        }
        if (packet.d.removed_member_ids) {
          removedMembers = packet.d.removed_member_ids.map((id) => channel.members.remove({ id }) ?? { id })
        }

        this.emit('threadMembersUpdate', channel, addedMembers ?? [], removedMembers ?? [])
        break
      }
      case 'STAGE_INSTANCE_CREATE': {
        const packet = pkt as Omit<DiscordGatewayPayload, 'd'> & {
          d: DiscordStageInstance
        }

        const guild = this.client.guilds.get(packet.d.guild_id)
        if (!guild) {
          this.emit('debug', `Missing guild ${packet.d.guild_id} in STAGE_INSTANCE_CREATE`)
          break
        }

        this.emit('stageInstanceCreate', guild.stageInstances.add(new StageInstance(packet.d, this.client)))
        break
      }
      case 'STAGE_INSTANCE_UPDATE': {
        const packet = pkt as Omit<DiscordGatewayPayload, 'd'> & {
          d: DiscordStageInstance
        }

        const guild = this.client.guilds.get(packet.d.guild_id)
        if (!guild) {
          this.emit('stageInstanceUpdate', packet.d, null)
          break
        }
        const stageInstance = guild.stageInstances.get(packet.d.id)
        let oldStageInstance = null
        if (stageInstance) {
          oldStageInstance = {
            topic: stageInstance.topic,
          }
        }

        this.emit('stageInstanceUpdate', guild.stageInstances.update(new StageInstance(packet.d, this.client)), oldStageInstance)
        break
      }
      case 'STAGE_INSTANCE_DELETE': {
        const packet = pkt as Omit<DiscordGatewayPayload, 'd'> & {
          d: DiscordStageInstance
        }

        const guild = this.client.guilds.get(packet.d.guild_id)
        if (!guild) {
          this.emit('stageInstanceDelete', new StageInstance(packet.d, this.client))
          break
        }

        this.emit('stageInstanceDelete', guild.stageInstances.remove(packet.d) ?? new StageInstance(packet.d, this.client))
        break
      }
      case 'GUILD_INTEGRATIONS_UPDATE': {
        // Ignore this
        break
      }
      case 'INTERACTION_CREATE': {
        const packet = pkt as Omit<DiscordGatewayPayload, 'd'> & {
          d: DiscordInteraction
        }

        this.emit('interactionCreate', Interaction.from(packet.d, this.client))
        break
      }
      default: {
        this.emit('unknown', pkt, this.id)
        break
      }
    } /* eslint-enable no-redeclare */
  }

  _onWSClose(event: { code: number; reason: string }) {
    let { code, reason } = event

    reason = reason.toString()
    this.emit(
      'debug',
      'WS disconnected: ' +
        JSON.stringify({
          code,
          reason,
          status: this.status,
        }),
    )
    let err: (Error & { code?: number }) | null = !code || code === 1000 ? null : new Error(code + ': ' + reason)
    let reconnect: 'auto' | boolean = 'auto'
    if (code) {
      this.emit('debug', `${code === 1000 ? 'Clean' : 'Unclean'} WS close: ${code}: ${reason}`, this.id)
      if (code === 4001) {
        err = new Error('Gateway received invalid OP code')
      } else if (code === 4002) {
        err = new Error('Gateway received invalid message')
      } else if (code === 4003) {
        err = new Error('Not authenticated')
        this.sessionID = null
      } else if (code === 4004) {
        err = new Error('Authentication failed')
        this.sessionID = null
        reconnect = false
        this.emit('error', new Error(`Invalid token: ${this.token}`))
      } else if (code === 4005) {
        err = new Error('Already authenticated')
      } else if (code === 4006 || code === 4009) {
        err = new Error('Invalid session')
        this.sessionID = null
      } else if (code === 4007) {
        err = new Error('Invalid sequence number: ' + this.seq)
        this.seq = 0
      } else if (code === 4008) {
        err = new Error('Gateway connection was ratelimited')
      } else if (code === 4010) {
        err = new Error('Invalid shard key')
        this.sessionID = null
        reconnect = false
      } else if (code === 4011) {
        err = new Error('Shard has too many guilds (>2500)')
        this.sessionID = null
        reconnect = false
      } else if (code === 4013) {
        err = new Error('Invalid intents specified')
        this.sessionID = null
        reconnect = false
      } else if (code === 4014) {
        err = new Error('Disallowed intents specified')
        this.sessionID = null
        reconnect = false
      } else if (code === 1006) {
        err = new Error('Connection reset by peer')
      } else if (code !== 1000 && reason) {
        err = new Error(code + ': ' + reason)
      }
      if (err) {
        err.code = code
      }
    } else {
      this.emit('debug', 'WS close: unknown code: ' + reason, this.id)
    }
    this.disconnect(
      {
        reconnect,
      },
      err ?? undefined,
    )
  }

  _onWSError(err: Error) {
    this.emit('error', err, this.id)
  }

  _onWSMessage(data) {
    try {
      if (data instanceof ArrayBuffer) {
        if (this.client.options.compress) {
          data = Buffer.from(data)
        }
      } else if (Array.isArray(data)) {
        // Fragmented messages
        data = Buffer.concat(data) // Copyfull concat is slow, but no alternative
      }
      if (this.client.options.compress) {
        if (data.length >= 4 && data.readUInt32BE(data.length - 4) === 0xffff) {
          return this.onPacket(JSON.parse(data.toString()))
        }
      } else {
        return this.onPacket(JSON.parse(data.toString()))
      }
    } catch (err) {
      this.emit('error', err, this.id)
    }
  }

  _onWSOpen() {
    this.status = 'handshaking'
    this.emit('connect', this.id)
    this.lastHeartbeatAck = true
  }

  toString() {
    return Base.prototype.toString.call(this)
  }

  toJSON(props: string[] = []) {
    return Base.prototype.toJSON.call(this, [
      'connecting',
      'ready',
      'discordServerTrace',
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
