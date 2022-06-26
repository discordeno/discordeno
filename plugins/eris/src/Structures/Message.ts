import { DiscordMessage } from "../../deps.ts";
import { Base } from "../Base.ts";
import Client from "../Client.ts";

export class Message extends Base {
    timestamp: number;

    constructor(data: DiscordMessage, client: Client) {
        super(data.id);
        
        this.timestamp = Date.parse(data.timestamp);
    }
}

export default Message;
