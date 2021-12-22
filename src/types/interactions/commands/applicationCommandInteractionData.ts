import { Message, User, Role, Channel, MessageComponentTypes, MessageComponents } from "../../mod.ts";
import { InteractionGuildMember } from "../interactionGuildMember.ts";
import { InteractionDataOption } from "./applicationCommandInteractionDataOption.ts";

export interface InteractionData {
  /** The type of component */
  componentType?: MessageComponentTypes;
  /** The custom id provided for this component. */
  customId?: string;
  /** The components if its a Modal Submit interaction. */
  components?: MessageComponents;
  /** The values chosen by the user. */
  values?: string[];
  /** The Id of the invoked command */
  id: string;
  /** The name of the invoked command */
  name: string;
  /** Converted users + roles + channels */
  resolved?: {
    /** The Ids and Message objects */
    messages?: Record<string, Message>;
    /** The Ids and User objects */
    users?: Record<string, User>;
    /** The Ids and partial Member objects */
    members?: Record<string, Omit<InteractionGuildMember, "user" | "deaf" | "mute">>;
    /** The Ids and Role objects */
    roles?: Record<string, Role>;
    /** The Ids and partial Channel objects */
    channels?: Record<string, Pick<Channel, "id" | "name" | "type" | "permissions">>;
  };
  /** The params + values from the user */
  options?: InteractionDataOption[];
  /** The target id if this is a context menu command. */
  targetId?: string;
}
