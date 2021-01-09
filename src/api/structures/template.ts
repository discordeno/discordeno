import { TemplatePayload, UserPayload } from "../../types/mod.ts";
import { cache } from "../../util/cache.ts";
import { createNewProp } from "../../util/utils.ts";
import { Guild } from "./guild.ts";

const baseTemplate: Partial<Template> = {
  get sourceGuild() {
    // deno-lint-ignore getter-return
    if (!this.sourceGuildID) return;
    return cache.guilds.get(this.sourceGuildID);
  },
};

export function createTemplate(
  data: TemplatePayload,
) {
  const {
    usage_count: usageCount,
    creator_id: creatorID,
    created_at: createdAt,
    updated_at: updatedAt,
    source_guild_id: sourceGuildID,
    serialized_source_guild: serializedSourceGuild,
    is_dirty: isDirty,
    ...rest
  } = data;

  const restProps: Record<string, Partial<PropertyDescriptor>> = {};
  for (const key of Object.keys(rest)) {
    restProps[key] = createNewProp(rest[key]);
  }

  return Object.create(baseTemplate, {
    ...restProps,
    usageCount: createNewProp(sourceGuildID),
    creatorID: createNewProp(creatorID),
    createdAt: createNewProp(createdAt),
    updatedAt: createNewProp(updatedAt),
    sourceGuildID: createNewProp(sourceGuildID),
    serializedSourceGuild: createNewProp(serializedSourceGuild),
    isDirty: createNewProp(isDirty),
  }) as Template;
}

export interface Template {
  /** the template code (unique ID) */
  code: string;
  /** template name */
  name: string;
  /** the description for the template */
  description: string | null;
  /** number of times this template has been used */
  usageCount: number;
  /** the ID of the user who created the template */
  createdID: string;
  /** the user who created the template */
  creator: UserPayload;
  /** when this template was created */
  createdAt: string;
  /** when this template was last synced to the source guild */
  updatedAt: string;
  /** the ID of the guild this template is based on */
  sourceGuildID: string;
  /** the guild snapshot this template contains */
  serializedSourceGuild: Partial<Guild>;
  /** whether the template has unsynced changes */
  isDirty: boolean | null;

  // GETTERS

  sourceGuild: Guild | undefined;
}
