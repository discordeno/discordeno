import { Interaction as InteractionPayload } from "../../../types/interactions/interaction.ts";
import { ButtonData } from "../../../types/messages/components/button_data.ts";
import Client from "../Client.ts";
import Message from "../Message.ts";
import Interaction from "./Interaction.ts";

export class Button extends Interaction {
  /** Interaction data */
  data: ButtonData;
  /**  The message the button was attached to */
  message: Message;

  constructor(client: Client, payload: InteractionPayload) {
    super(client, payload);

    this.data = payload.data as ButtonData;
    this.message = new Message(client, payload.message!);
  }
}

export default Button;
