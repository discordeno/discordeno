import { eventHandlers } from "../bot.ts";
import { cache } from "../cache.ts";
import { deleteRole } from "../helpers/roles/delete_role.ts";
import { editRole } from "../helpers/roles/edit_role.ts";
import { CreateGuildRole } from "../types/guilds/create_guild_role.ts";
import { DiscordGuildRoleCreate } from "../types/guilds/guild_role_create.ts";
import { Errors } from "../types/misc/errors.ts";
import { Role } from "../types/permissions/role.ts";
import { Collection } from "../util/collection.ts";
import { highestRole } from "../util/permissions.ts";
import { createNewProp, snakeKeysToCamelCase } from "../util/utils.ts";

const baseRole: Partial<RoleStruct> = {
  get guild() {
    return cache.guilds.get(this.guildId!);
  },
  get hexColor() {
    return this.color!.toString(16);
  },
  get members() {
    return cache.members.filter((m) =>
      m.guilds.some((g) => g.roles.includes(this.id!))
    );
  },
  get mention() {
    return `<@&${this.id}>`;
  },

  // METHODS
  delete() {
    return deleteRole(this.guildId!, this.id!).catch(console.error);
  },
  edit(options) {
    return editRole(this.guildId!, this.id!, options);
  },
  higherThanRole(roleId: string, position?: number) {
    // If no position try and find one from cache
    if (!position) position = this.guild?.roles.get(roleId)?.position;
    // If still none error out.
    if (!position) {
      throw new Error(
        "role.higherThanRoleId() did not have a position provided and the role or guild was not found in cache. Please provide a position like role.higherThanRoleId(roleId, position)",
      );
    }

    // Rare edge case handling
    if (this.position === position) {
      return this.id! < roleId;
    }

    return this.position! > position;
  },
  async higherThanMember(memberId: string) {
    const guild = this.guild;
    if (!guild) throw new Error(Errors.GUILD_NOT_FOUND);

    if (this.guild.ownerId === memberId) return false;

    const memberHighestRole = await highestRole(guild, memberId);
    return this.higherThanRole!(
      memberHighestRole.id,
      memberHighestRole.position,
    );
  },
};

// deno-lint-ignore require-await
export async function createRoleStruct(data: DiscordGuildRoleCreate) {
  const {
    tags = {},
    ...rest
  } = snakeKeysToCamelCase({ guildId: data.guild_id, ...data.role }) as Role & {
    guildId: string;
  };

  const props: Record<string, ReturnType<typeof createNewProp>> = {};
  for (const key of Object.keys(rest)) {
    eventHandlers.debug(
      "loop",
      `Running for of loop in createRoleStruct function.`,
    );
    // @ts-ignore index signature
    props[key] = createNewProp(rest[key]);
  }

  const role: RoleStruct = Object.create(baseRole, {
    ...props,
    botId: createNewProp(tags.botId),
    isNitroBoostRole: createNewProp("premiumSubscriber" in tags),
    integrationId: createNewProp(tags.integrationId),
  });

  return role;
}

export interface RoleStruct extends Omit<Role, "tags"> {
  /** The bot id that is associated with this role. */
  botId?: string;
  /** If this role is the nitro boost role. */
  isNitroBoostRole: boolean;
  /** The integration id that is associated with this role */
  integrationId: string;
  /** The roles guildId */
  guildId: string;

  // GETTERS

  /** The guild where this role is. If undefined, the guild is not cached */
  guild?: GuildStruct;
  /** The hex color for this role. */
  hexColor: string;
  /** The cached members that have this role */
  members: Collection<string, MemberStruct>;
  /** The @ mention of the role in a string. */
  mention: string;

  // METHODS

  /** Delete the role */
  delete(): ReturnType<typeof deleteRole>;
  /** Edits the role */
  edit(options: CreateGuildRole): ReturnType<typeof editRole>;
  /** Checks if this role is higher than another role. */
  higherThanRole(roleId: string, position?: number): boolean;
  /** Checks if the role has a higher position than the given member */
  higherThanMember(memberId: string): Promise<boolean>;
}
