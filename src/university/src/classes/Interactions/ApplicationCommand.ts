import { Interaction as InteractionPayload } from "../../../../types/interactions/interaction.ts";
import Client from "../Client.ts";
import Interaction from "./Interaction.ts";

export class ApplicationCommand extends Interaction {
    constructor(client: Client, payload: InteractionPayload) {
        super(client, payload);
    }
}

export default ApplicationCommand;