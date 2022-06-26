import { BigString } from "../Client.ts";
import { Collection } from "../Collection.ts";
import { AnyGuildChannel } from "../typings.ts";
import GuildChannel from "./GuildChannel.ts";

export class CategoryChannel extends GuildChannel {
  get channels(): Collection<BigString, Exclude<AnyGuildChannel, CategoryChannel>> {
    return this.guild?.channels.filter((c) => c.parentID === this.id, false);
  }
}

export default CategoryChannel;
