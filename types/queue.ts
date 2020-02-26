import { DiscordPayload } from "./discord.ts";
import Gateway from "../module/gateway.ts";

export abstract class ActionQueue<Action> {
    protected actions: Action[] = [];

    push (action: Action) {
        if (this.shouldDispatchImmediately(action)) {
            this.dispatch(action);
        } else {
            this.actions.push(action);
        }
    }

    dispatchAll () {
        let index = 0;
        for (const action of this.actions) {
            this.actions.splice(index, 1);
            this.dispatch(action);
            index++;
        }
    }

    abstract dispatch (action: Action): void;
    abstract shouldDispatchImmediately (action: Action): boolean;
}

export class GatewayActionQueue extends ActionQueue<DiscordPayload> {
    constructor (protected gateway: Gateway) {
        super();
    }

    dispatch (action: DiscordPayload) {
        this.gateway.sendObject(action);
    }

    shouldDispatchImmediately ()
}
