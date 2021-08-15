import Base from "./Base.ts";
import Client from "./Client.ts";

import { snowflakeToBigint } from "../../util/bigint.ts";
import { Guild as GuildPayload } from "../../types/guilds/guild.ts";
import { Collection } from "../../util/collection.ts";
import Channel from "./Channel.ts";
import Member from "./Member.ts";
import VoiceState from "./VoiceState.ts";
import { Emoji } from "../../types/emojis/emoji.ts";
import Role from "./Role.ts";
import { CreateGuildChannel, DiscordCreateGuildChannel } from "../../types/guilds/create_guild_channel.ts";
import { endpoints } from "../../util/constants.ts";
import { DiscordChannelTypes } from "../../types/channels/channel_types.ts";
import { calculateBits } from "../../util/permissions.ts";
import { hasOwnProperty, snakelize } from "../../util/utils.ts";
import { UpdateSelfVoiceState } from "../../types/guilds/update_self_voice_state.ts";
import { UpdateOthersVoiceState } from "../../types/guilds/update_others_voice_state.ts";
import { ModifyGuildChannelPositions } from "../../types/guilds/modify_guild_channel_position.ts";
import { Channel as ChannelPayload } from "../../types/channels/channel.ts";

export class Guild extends Base {
  /** The channels available in this guild. */
  channels: Collection<bigint, Channel>;
  /** All of the member objects that have been cached since the bot acquired `READY` state, mapped by their Ids */
  members: Collection<bigint, Member>;
  /** All of the voice connections that are in this guild at the moment. Mapped by the user id. */
  voiceStates: Collection<bigint, VoiceState>;

  /** The shard in which this guild is connected. */
  shardId: number;

  /** The amount of members in this guild. If it is 0 which is impossible, it means discord did not tell us the amount of members. */
  memberCount: number;

  /** The cached emojis that are in this guild. */
  emojis: Collection<bigint, Emoji>;

  /** The roles that are cached in this guild. */
  roles: Collection<bigint, Role>;

  constructor(client: Client, payload: GuildPayload, shardId: number) {
    super(client, snowflakeToBigint(payload.id));

    this.shardId = shardId;
    this.memberCount = payload.memberCount || 0;

    this.emojis = new Collection(payload.emojis.map((emoji) => [snowflakeToBigint(emoji.id!), emoji]));

    this.channels = new Collection<bigint, Channel>([], {
      sweeper: { filter: client.channelSweeper, interval: 3660000 },
    });

    this.members = new Collection<bigint, Member>([], { sweeper: { filter: client.memberSweeper, interval: 300000 } });

    this.voiceStates = new Collection(
      payload.voiceStates?.map((vs) => [snowflakeToBigint(vs.userId), new VoiceState(client, vs)]) || []
    );

    this.roles = new Collection(payload.roles?.map((r) => [snowflakeToBigint(r.id), new Role(client, r)]) || []);
  }

  /** Create a channel in your server. Bot needs MANAGE_CHANNEL permissions in the server. */
  async createChannel(options?: CreateGuildChannel, reason?: string) {
    // BITRATES ARE IN THOUSANDS SO IF USER PROVIDES 32 WE CONVERT TO 32000
    if (options?.bitrate && options.bitrate < 1000) options.bitrate *= 1000;

    const result = await this.client.rest.post(
      endpoints.GUILD_CHANNELS(this.id),
      snakelize<DiscordCreateGuildChannel>({
        ...options,
        permissionOverwrites: options?.permissionOverwrites?.map((perm) => ({
          ...perm,
          allow: calculateBits(perm.allow),
          deny: calculateBits(perm.deny),
        })),
        type: options?.type || DiscordChannelTypes.GuildText,
        reason,
      })
    );

    const discordenoChannel = new Channel(this.client, result);
    this.channels.set(discordenoChannel.id, discordenoChannel);

    return discordenoChannel;
  }

  /**
   * Updates the a user's voice state, defaults to the current user
   * Caveats:
   *  - `channel_id` must currently point to a stage channel.
   *  - User must already have joined `channel_id`.
   *  - You must have the `MUTE_MEMBERS` permission. But can always suppress yourself.
   *  - When unsuppressed, non-bot users will have their `request_to_speak_timestamp` set to the current time. Bot users will not.
   *  - You must have the `REQUEST_TO_SPEAK` permission to request to speak. You can always clear your own request to speak.
   *  - You are able to set `request_to_speak_timestamp` to any present or future time.
   *  - When suppressed, the user will have their `request_to_speak_timestamp` removed.
   */
  async updateVoiceState(options: UpdateSelfVoiceState | ({ userId: bigint } & UpdateOthersVoiceState)) {
    return await this.client.rest.patch(
      endpoints.UPDATE_VOICE_STATE(this.id, hasOwnProperty(options, "userId") ? options.userId : undefined),
      snakelize(options)
    );
  }

  /** Modify the positions of channels on the guild. Requires MANAGE_CHANNELS permisison. */
  async swapChannels(channelPositions: ModifyGuildChannelPositions[]) {
    return await this.client.rest.patch(endpoints.GUILD_CHANNELS(this.id), snakelize(channelPositions));
  }

  /** Returns a list of guild channel objects.
   *
   * ⚠️ **If you need this, you are probably doing something wrong. This is not intended for use. Your channels will be cached in your guild.**
   */
  async fetchChannels() {
    const result = (await this.client.rest.get(endpoints.GUILD_CHANNELS(this.id))) as ChannelPayload[];

    for (const res of result) {
      const channel = new Channel(this.client, res);
      this.channels.set(channel.id, channel);
    }

    return this.channels;
  }

  /** Fetches a single channel object from the api.
   *
   * ⚠️ **If you need this, you are probably doing something wrong. This is not intended for use. Your channels will be cached in your guild.**
   */
  async fetchChannel(channelId: bigint) {
    const result = await this.client.rest.get(endpoints.CHANNEL_BASE(channelId));

    const channel = new Channel(this.client, result);
    this.channels.set(channel.id, channel);

    return channel;
  }
}
