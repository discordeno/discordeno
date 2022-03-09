import { DiscordMember, DiscordUser } from "../discord.ts";

// We use these types much since user always exists unless its a `CREATE_MESSAGE` or `MESSAGE_UPDATE` event

/** https://discord.com/developers/docs/resources/guild#guild-member-object */
export type GuildMemberWithUser = Omit<DiscordMember, "user"> & { user: DiscordUser };
