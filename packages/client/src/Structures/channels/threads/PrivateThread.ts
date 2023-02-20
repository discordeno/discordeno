import type { DiscordChannel } from "@discordeno/types";
import type Client from "../../../Client.js";
import ThreadChannel from "./Thread.js";


export class PrivateThreadChannel extends ThreadChannel {
    constructor(data: DiscordChannel, client: Client, messageLimit?: number) {
        super(data, client, messageLimit);

        this.update(data);
    }

    update(data: DiscordChannel): void {
        if(data.thread_metadata !== undefined) {
            this.threadMetadata = {
                archiveTimestamp: Date.parse(data.thread_metadata.archive_timestamp),
                archived: data.thread_metadata.archived,
                autoArchiveDuration: data.thread_metadata.auto_archive_duration,
                invitable: data.thread_metadata.invitable,
                locked: data.thread_metadata.locked
            };
        }
    }
}

export default PrivateThreadChannel;