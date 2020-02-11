import { Timestamps } from "../types/discord.ts";

export interface ActivityPayload {
    /** The activity's name */
    name: string;
    
    /**  */
	type: number;
	url?: string;
	created_at: number;
	timestamps: Timestamps;
	details?: string;
}

export enum ActivityType {
    Game,
    Streaming,
    Listening,
    Custom = 4
}