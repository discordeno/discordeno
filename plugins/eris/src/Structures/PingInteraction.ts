import { DiscordInteraction } from "../../deps.ts";
import Client from "../Client.ts";

export class PingInteraction {
    constructor(data: DiscordInteraction, client: Client) {}
}

export default PingInteraction;
