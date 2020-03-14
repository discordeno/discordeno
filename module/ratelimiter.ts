import { sleep } from "../utils/utils.ts";

export interface Ratelimit {
    retryAfter: number;
    limit: number;
    remaining: number;
    reset: number;
}

export class Ratelimiter {
    buckets: Record<string, Ratelimit> = {};

    awaitRatelimit (ratelimit: Ratelimit): Promise<unknown> {
        if (ratelimit.remaining === 0) {
            return sleep(ratelimit.retryAfter);
        }

        return Promise.resolve();
    }

    addBucket (bucket: string, ratelimit: Ratelimit) {
        if (this.buckets[bucket]) {
            return;
        }

        // Otherwise, add this ratelimit to the registry.
        this.buckets[bucket] = ratelimit;
    }

    async awaitBucket (bucket: string) {
        if (this.buckets[bucket]) {
            // POSSIBLE MEMORY LEAK: Some buckets might never get cleaned up.
            await this.awaitRatelimit(this.buckets[bucket]);

            // IIRC, we avoid `delete` so v8 doesn't deoptimize this?
            this.buckets[bucket] = undefined as any;
        }

        return Promise.resolve();
    }
}
