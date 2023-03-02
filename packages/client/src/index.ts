import Base from './Base.js'
import type { ClientOptions } from './Client.js'
import Client from './Client.js'
import Collection from './Collection.js'
import * as Constants from './Constants.js'
import Shard from './gateway/Shard.js'
import RequestHandler from './RequestHandler.js'
import { CategoryChannel } from './Structures/channels/Category.js'
import Channel from './Structures/channels/Channel.js'
import Guild, { GuildChannel } from './Structures/channels/Guild.js'
import { NewsChannel } from './Structures/channels/News.js'
import { PrivateChannel } from './Structures/channels/Private.js'
import { StageChannel } from './Structures/channels/Stage.js'
import { TextChannel } from './Structures/channels/Text.js'
import { TextVoiceChannel } from './Structures/channels/TextVoice.js'
import Member, { ThreadMember } from './Structures/channels/threads/Member.js'
import { NewsThreadChannel } from './Structures/channels/threads/NewsThread.js'
import { PrivateThreadChannel } from './Structures/channels/threads/PrivateThread.js'
import { PublicThreadChannel } from './Structures/channels/threads/PublicThread.js'
import { ThreadChannel } from './Structures/channels/threads/Thread.js'
import { VoiceChannel } from './Structures/channels/Voice.js'
import { GuildIntegration } from './Structures/guilds/Integration.js'
import { GuildPreview } from './Structures/guilds/Preview.js'
import Role from './Structures/guilds/Role.js'
import StageInstance from './Structures/guilds/StageInstance.js'
import { GuildTemplate } from './Structures/guilds/Template.js'
import { UnavailableGuild } from './Structures/guilds/Unavailable.js'
import { VoiceState } from './Structures/guilds/VoiceState.js'
import { AutocompleteInteraction } from './Structures/interactions/Autocomplete.js'
import Command, { CommandInteraction } from './Structures/interactions/Command.js'
import { ComponentInteraction } from './Structures/interactions/Component.js'
import Interaction from './Structures/interactions/Interaction.js'
import { PingInteraction } from './Structures/interactions/Ping.js'
import { UnknownInteraction } from './Structures/interactions/Unknown.js'
import Invite from './Structures/Invite.js'
import Message from './Structures/Message.js'
import Permission from './Structures/Permission.js'
import PermissionOverwrite from './Structures/PermissionOverwrite.js'
import { ExtendedUser } from './Structures/users/Extended.js'
import User from './Structures/users/User.js'
import Bucket from './utils/Bucket.js'
import DiscordRESTError from './utils/DiscordRESTError.js'
// TODO: MAKE THIS DYNAMIC FROM PACKAGE.JSON
export const VERSION = "19.0.0";

export function DiscordenoClient(token: string, options: ClientOptions): Client {
  return new Client(token, options)
}

DiscordenoClient.AutocompleteInteraction = AutocompleteInteraction
DiscordenoClient.Base = Base
DiscordenoClient.Bucket = Bucket
DiscordenoClient.CategoryChannel = CategoryChannel
DiscordenoClient.Channel = Channel
DiscordenoClient.CommandInteraction = CommandInteraction
DiscordenoClient.ComponentInteraction = ComponentInteraction
DiscordenoClient.Client = Client
DiscordenoClient.Collection = Collection
DiscordenoClient.Command = Command
// DiscordenoClient.CommandClient = CommandClient
DiscordenoClient.Constants = Constants
// DiscordenoClient.DiscordHTTPError = DiscordHTTPError
DiscordenoClient.DiscordRESTError = DiscordRESTError
DiscordenoClient.ExtendedUser = ExtendedUser
DiscordenoClient.Guild = Guild
DiscordenoClient.GuildChannel = GuildChannel
DiscordenoClient.GuildIntegration = GuildIntegration
DiscordenoClient.GuildPreview = GuildPreview
DiscordenoClient.GuildTemplate = GuildTemplate
DiscordenoClient.Interaction = Interaction
DiscordenoClient.Invite = Invite
DiscordenoClient.Member = Member
DiscordenoClient.Message = Message
DiscordenoClient.NewsChannel = NewsChannel
DiscordenoClient.NewsThreadChannel = NewsThreadChannel
DiscordenoClient.Permission = Permission
DiscordenoClient.PermissionOverwrite = PermissionOverwrite
DiscordenoClient.PingInteraction = PingInteraction
DiscordenoClient.PrivateChannel = PrivateChannel
DiscordenoClient.PrivateThreadChannel = PrivateThreadChannel
DiscordenoClient.PublicThreadChannel = PublicThreadChannel
DiscordenoClient.RequestHandler = RequestHandler
DiscordenoClient.Role = Role
DiscordenoClient.Shard = Shard
DiscordenoClient.StageChannel = StageChannel
DiscordenoClient.StageInstance = StageInstance
DiscordenoClient.TextChannel = TextChannel
DiscordenoClient.TextVoiceChannel = TextVoiceChannel
DiscordenoClient.ThreadChannel = ThreadChannel
DiscordenoClient.ThreadMember = ThreadMember
DiscordenoClient.UnavailableGuild = UnavailableGuild
DiscordenoClient.UnknownInteraction = UnknownInteraction
DiscordenoClient.User = User
DiscordenoClient.VERSION = VERSION
DiscordenoClient.VoiceChannel = VoiceChannel
DiscordenoClient.VoiceState = VoiceState

export * from './Base.js'
export * from './Client.js'
export * from './Collection.js'
export * from './Constants.js'
export * as Constants from './Constants.js'
export * from './Endpoints.js'
export * from './gateway/Shard.js'
export * from './gateway/ShardManager.js'
export * from './Structures/channels/Category.js'
export * from './Structures/channels/Channel.js'
export * from './Structures/channels/Guild.js'
export * from './Structures/channels/News.js'
export * from './Structures/channels/Private.js'
export * from './Structures/channels/Stage.js'
export * from './Structures/channels/Text.js'
export * from './Structures/channels/TextVoice.js'
export * from './Structures/channels/threads/Member.js'
export * from './Structures/channels/threads/NewsThread.js'
export * from './Structures/channels/threads/PrivateThread.js'
export * from './Structures/channels/threads/PublicThread.js'
export * from './Structures/channels/threads/Thread.js'
export * from './Structures/channels/Voice.js'
export * from './Structures/guilds/AuditLogEntry.js'
export * from './Structures/guilds/Guild.js'
export * from './Structures/guilds/Integration.js'
export * from './Structures/guilds/Member.js'
export * from './Structures/guilds/Preview.js'
export * from './Structures/guilds/Role.js'
export * from './Structures/guilds/StageInstance.js'
export * from './Structures/guilds/Template.js'
export * from './Structures/guilds/Unavailable.js'
export * from './Structures/guilds/VoiceState.js'
export * from './Structures/interactions/Autocomplete.js'
export * from './Structures/interactions/Command.js'
export * from './Structures/interactions/Component.js'
export * from './Structures/interactions/Interaction.js'
export * from './Structures/interactions/Ping.js'
export * from './Structures/interactions/Unknown.js'
export * from './Structures/Invite.js'
export * from './Structures/Message.js'
export * from './Structures/Permission.js'
export * from './Structures/PermissionOverwrite.js'
export * from './Structures/users/Extended.js'
export * from './Structures/users/User.js'
export * from './typings.js'
export * from './utils/BrowserWebSocket.js'
export * from './utils/Bucket.js'
export * from './utils/DiscordRESTError.js'
export * from './utils/generate.js'
