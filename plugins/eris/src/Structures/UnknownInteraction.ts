import { DiscordInteraction } from "../../deps.ts";
import Client from "../Client.ts";

export class UnknownInteraction {
    constructor(data: DiscordInteraction, client: Client) {}

}

export default UnknownInteraction;
