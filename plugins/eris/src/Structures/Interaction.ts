import { DiscordInteraction, InteractionTypes } from "../../deps.ts";
import { Base } from "../Base.ts";
import Client, { BigString } from "../Client.ts";
import AutocompleteInteraction from "./AutocompleteInteraction.ts";
import CommandInteraction from "./CommandInteraction.ts";
import ComponentInteraction from "./ComponentInteraction.ts";
import PingInteraction from "./PingInteraction.ts";
import UnknownInteraction from "./UnknownInteraction.ts";

export class Interaction extends Base {
    client: Client;
    applicationID: BigString;
    token: string;
    type: InteractionTypes;
    version: 1;
    acknowledged: boolean;

    constructor(data: DiscordInteraction, client: Client) {
        super(data.id);
        this.client = client;

        this.applicationID = data.application_id;
        this.token = data.token;
        this.type = data.type;
        this.version = data.version;
        this.acknowledged = false;
    }

    get _client(): Client {
        return this.client;
    }

    update() {
        this.acknowledged = true;
    }

    static from(data: DiscordInteraction, client: Client) {
        switch(data.type) {
            case InteractionTypes.Ping: {
                return new PingInteraction(data, client);
            }
            case InteractionTypes.ApplicationCommand: {
                return new CommandInteraction(data, client);
            }
            case InteractionTypes.MessageComponent: {
                return new ComponentInteraction(data, client);
            }
            case InteractionTypes.ApplicationCommandAutocomplete: {
                return new AutocompleteInteraction(data, client);
            }
        }

        client.emit("warn", new Error(`Unknown interaction type: ${data.type}\n${JSON.stringify(data)}`));
        return new UnknownInteraction(data, client);
    }
}


export default Interaction;
