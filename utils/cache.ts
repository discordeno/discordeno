import { User } from "../structures/user.ts";
import { Guild, Channel } from "../types/return-type.ts";
import { Message } from "../structures/message.ts";

export const cache = {
	guilds: new Map<string, Guild>(),
	users: new Map<string, User>(),
	channels: new Map<string, Channel>(),
	messages: new Map<string, Message>(),
	unavailableGuilds: new Map<string, number>()
}
