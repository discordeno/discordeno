import { BitwisePermissionFlags, DiscordChannel, OverwriteTypes } from "../../deps.ts";
import { BigString, Client } from "../Client.ts";
import { Collection } from "../Collection.ts";
import { EditChannelOptions, EditChannelPositionOptions } from "../typings.ts";
import Channel from "./Channel.ts";
import Guild from "./Guild.ts";
import Member from "./Member.ts";
import Permission from "./Permission.ts";
import PermissionOverwrite from "./PermissionOverwrite.ts";
import ThreadChannel from "./ThreadChannel.ts";

export class GuildChannel extends Channel {
  position: number;
  name: string;
  parentID?: BigString | null;
  guild: Guild;
  nsfw: boolean;
  permissionOverwrites = new Collection<BigString, PermissionOverwrite>();

  constructor(data: DiscordChannel, client: Client) {
    super(data, client);

    this.position = data.position ?? 0;
    this.guild = client.guilds.get(data.guild_id!)!;
    this.name = data.name ?? "";
    this.parentID = data.parent_id;
    this.nsfw = !!data.nsfw;
  }

  update(data: DiscordChannel) {
    if (data.type !== undefined) {
      this.type = data.type;
    }
    if (data.name !== undefined) {
      this.name = data.name;
    }
    if (data.position !== undefined) {
      this.position = data.position;
    }
    if (data.parent_id !== undefined) {
      this.parentID = data.parent_id;
    }
    this.nsfw = !!data.nsfw;
    if (data.permission_overwrites) {
      data.permission_overwrites.forEach((overwrite) => {
        const perms = new PermissionOverwrite(overwrite);
        this.permissionOverwrites.set(perms.id, perms);
      });
    }
  }

  /** Delete the channel */
  async delete(reason?: string): Promise<void> {
    return await this.client.deleteChannel.call(this.client, this.id, reason);
  }

  /** Delete a channel permission overwrite */
  async deletePermission(overwriteID: BigString, reason?: string): Promise<void> {
    return await this.client.deleteChannelPermission.call(this.client, this.id, overwriteID, reason);
  }

  /** Edit the channel's properties */
  async edit(options: EditChannelOptions, reason?: string) {
    return this.client.editChannel.call(this.client, this.id, options, reason);
  }

  /** Create a channel permission overwrite */
  async editPermission(overwriteID: BigString, allow: bigint | number, deny: bigint | number, type: OverwriteTypes, reason?: string): Promise<void> {
    return await this.client.editChannelPermission.call(this.client, this.id, overwriteID, allow, deny, type, reason);
  }

  /** Edit the channel's position. Note that channel position numbers are lowest on top and highest at the bottom. */
  async editPosition(position: number, options?: EditChannelPositionOptions): Promise<void> {
    return await this.client.editChannelPosition.call(this.client, this.id, position, options);
  }

  /** Get the channel-specific permissions of a member */
  permissionsOf(memberID: BigString | Member): Permission {
    const member = ["string", "bigint"].includes(typeof memberID) ? this.guild.members.get(memberID as BigString)! : memberID as Member;
    let permission = this.guild.permissionsOf(member).allow;
    if (permission & BigInt(BitwisePermissionFlags.ADMINISTRATOR)) {
      return new Permission(BitwisePermissionFlags.ADMINISTRATOR);
    }
    const channel = this instanceof ThreadChannel ? this.guild.channels.get(this.parentID!) : this;
    let overwrite = channel && channel.permissionOverwrites.get(this.guild.id);
    if (overwrite) {
      permission = (permission & ~overwrite.deny) | overwrite.allow;
    }
    let deny = 0n;
    let allow = 0n;
    for (const roleID of member.roles) {
      if ((overwrite = channel && channel.permissionOverwrites.get(roleID))) {
        deny |= overwrite.deny;
        allow |= overwrite.allow;
      }
    }
    permission = (permission & ~deny) | allow;
    overwrite = channel && channel.permissionOverwrites.get(member.id);
    if (overwrite) {
      permission = (permission & ~overwrite.deny) | overwrite.allow;
    }
    return new Permission(permission);
  }

  toJSON(props: string[] = []) {
    return super.toJSON([
      "name",
      "nsfw",
      "parentID",
      "permissionOverwrites",
      "position",
      ...props,
    ]);
  }
}

export default GuildChannel;
