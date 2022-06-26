import { ChannelTypes, DiscordChannel } from "../../deps.ts";
import { Client } from "../Client.ts";

export class GuildChannel {
    // TODO: should this be from base
    id: string;
    position: number;
    type: ChannelTypes;

    constructor(data: DiscordChannel, client: Client) {
        // TODO: should this be from base
        this.id = data.id;
        // TODO: should this be defaulted to 0?
        this.position = data.position ?? 0;
        this.type = data.type;
    }
}

export default GuildChannel;