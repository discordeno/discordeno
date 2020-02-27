import { DiscordPayload } from "../types/discord";
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

    async dispatchAll () {
        let index = 0;
        for (const action of this.actions) {
            if (this.shouldDispatchImmediately(action)) {
                this.actions.splice(index, 1);
                await this.dispatch(action);
                index++;
            }
        }
    }

    abstract dispatch (action: Action): void | Promise<void>;
    abstract shouldDispatchImmediately (action: Action): boolean;
}

export interface RatelimitDetails {
    /** The number of requests that can be made */
    limit: number;

    /** The number of remaining requests that can be made */
    remaining: number;

    /** Epoch time (seconds since 00:00:00 UTC on January 1, 1970) at which the rate limit resets */
    reset: number;

    /** A unique string denoting the rate limit being encountered (non-inclusive of major parameters in the route path) */
    bucket: string;

    /** Total time (in seconds) of when the current rate limit bucket will reset. */
    resetAfter: number;
}

export class RatelimitedActionQueue extends ActionQueue<DiscordPayload> {
    protected lastRatelimitDetails?: RatelimitDetails;

    constructor (protected gateway: Gateway) {
        super();
    }

    dispatch (action: DiscordPayload) {
        this.gateway.sendObject(action);
    }

    shouldDispatchImmediately () {
        return this.lastRatelimitDetails?.limit !== 0;
    }
}