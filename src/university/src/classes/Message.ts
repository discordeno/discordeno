import { Message as MessagePayload } from "../../../types/messages/message.ts";
import { bigintToTimestamp, snowflakeToBigint } from "../../../util/bigint.ts";
import Base from "./Base.ts";
import Client from "./Client.ts";

export class Message extends Base {
    /** The id of the guild if this message was inside a guild. */
    guildId?: bigint;

    /** The reactions that are cached on this message. */
    reactions: { count: number; me: boolean; emoji: { id?: bigint, name: string; animated?: boolean } }[];

    /** The content of the message */
    content: string;
    
    constructor(client: Client, payload: MessagePayload) {
        super(client, snowflakeToBigint(payload.id));

        this.content = payload.content || "";
        
        if (payload.guildId) this.guildId = snowflakeToBigint(payload.guildId);
        this.timestamp

        this.reactions = payload.reactions?.map(reaction => ({
            ...reaction,
            emoji: {
                ...reaction.emoji,
                id: reaction.emoji.id ? snowflakeToBigint(reaction.emoji.id) : undefined,
                name: reaction.emoji.name || ""
            }
        })) || []
    }
    
    /** The timestamp when this message was sent. */
    get timestamp() {
        return bigintToTimestamp(this.id);
    }
}

export default Message;