import Base from "./Base.ts";
import Client from "./Client.ts";
import { bigintToSnowflake, snowflakeToBigint } from "../../../util/bigint.ts";
import { GuildMemberWithUser } from "../../../types/members/guild_member.ts";
import User from "./User.ts";
import { DiscordImageFormat } from "../../../types/misc/image_format.ts";
import { DiscordImageSize } from "../../../types/misc/image_size.ts";
import { endpoints } from "../../../util/constants.ts";
import { snakelize } from "../../../util/utils.ts";
import { CreateGuildBan } from "../../../types/guilds/create_guild_ban.ts";
import { ModifyGuildMember } from "../../../types/guilds/modify_guild_member.ts";
import { CreateMessage } from "../../../types/messages/create_message.ts";
import { Channel as ChannelPayload } from "../../../types/channels/channel.ts";
import Channel from "./Channel.ts";

export class Member extends Base {
  /** The guild id for this member */
  guildId: bigint;
  /** The last timestamp when this member was active. USED for cleaning out inactive members from cache. */
  cachedAt: number;
  /** The timestamp when this member joined the guild. */
  joinedAt: number;
  /** Whether or not this member is deaf. */
  deaf: boolean;
  /** Whether or not this member is mute. */
  mute: boolean;
  /** The nickname of this member in this guild, if no nickname is set it will be an empty string. */
  nick: string;
  /** Whether or not this member is still pending verification to join the guild. */
  pending?: boolean;
  /** The ids of the roles that this member has. */
  roleIds: bigint[];
  /** The user data for this member */
  user: User;

  constructor(client: Client, payload: GuildMemberWithUser, guildId: bigint) {
    super(client, snowflakeToBigint(payload.user.id));

    this.guildId = guildId;
    this.cachedAt = Date.now();
    this.joinedAt = Date.parse(payload.joinedAt);
    this.deaf = payload.deaf;
    this.mute = payload.mute;
    this.nick = payload.nick || "";
    this.pending = payload.pending;
    this.roleIds = payload.roles.map((id) => snowflakeToBigint(id));

    this.user = new User(client, payload.user);
  }

  /** The guild where this member is in. */
  get guild() {
    return this.client.guilds.get(this.guildId);
  }

  /** Get the users avatar url using the default settings. */
  get avatarURL() {
    return this.user.avatarUrl;
  }

  /** Get the users avatar url by customizing the size and format of the avatar. */
  makeAvatarURL(options: { size?: DiscordImageSize; format?: DiscordImageFormat }) {
    return this.user.makeAvatarUrl(options);
  }

  /** Ban a user from the guild and optionally delete previous messages sent by the user. Requires the BAN_MEMBERS permission. */
  async ban(options: CreateGuildBan) {
    return await this.client.rest.put(endpoints.GUILD_BAN(this.guildId, this.id), snakelize(options));
  }

  /** Kicks a member from a voice channel */
  async disconnect() {
    return await this.edit({ channelId: null });
  }

  /** Edit the member */
  async edit(options: ModifyGuildMember) {
    const result = (await this.client.rest.patch(
      endpoints.GUILD_MEMBER(this.guildId, this.id),
      snakelize({
        ...options,
        channelId: options.channelId ? bigintToSnowflake(options.channelId) : undefined,
      }) as ModifyGuildMember
    )) as GuildMemberWithUser;

    const member = new Member(this.client, result, this.guildId);
    this.guild?.members.set(this.id, member);

    return member;
  }

  /** Kick a member from the server */
  async kick(reason?: string) {
    return await this.client.rest.delete(endpoints.GUILD_MEMBER(this.guildId, this.id), { reason });
  }

  /** Move a member from a voice channel to another. */
  async move(channelId: bigint) {
    return await this.edit({ channelId });
  }

  /** Send a message to a users DM. Note: this takes 2 API calls. 1 is to fetch the users dm channel. 2 is to send a message to that channel. */
  async sendDirectMessage(content: string | CreateMessage) {
    let dmChannel = this.client.dmChannels.get(this.id);
    if (!dmChannel) {
      // If not available in cache create a new one.
      const dmChannelData = (await this.client.rest.post(endpoints.USER_DM, {
        recipient_id: this.id,
      })) as ChannelPayload;
      const channel = new Channel(this.client, dmChannelData);
      // Recreate the channel and add it under the users id
      this.client.dmChannels.set(this.id, channel);
      dmChannel = channel;
    }

    // If it does exist try sending a message to this user
    return await dmChannel.sendMessage(content);
  }

  /** Remove the ban for a user. Requires BAN_MEMBERS permission */
  async unban() {
    return await this.client.rest.delete(endpoints.GUILD_BAN(this.guildId, this.id));
  }

  /** Add a role to the member */
  async addRole(roleId: bigint, reason?: string) {
    return await this.client.rest.put(endpoints.GUILD_MEMBER_ROLE(this.guildId, this.id, roleId), { reason });
  }

  /** Remove a role from the member */
  async removeRole(roleId: bigint, reason?: string) {
    return await this.client.rest.delete(endpoints.GUILD_MEMBER_ROLE(this.guildId, this.id, roleId), { reason });
  }
}

export default Member;
