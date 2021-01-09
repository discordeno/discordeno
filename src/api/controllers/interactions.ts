import { eventHandlers } from "../../bot.ts";
import {
  GatewayPayload,
  GuildMemberPayload,
  Interaction,
  MessageApplicationPayload,
} from "../../types/mod.ts";
import { camelKeysToSnakeCase } from "../../util/utils.ts";
import { structures } from "../structures/mod.ts";

export async function handleInternalInteractionCreate(data: GatewayPayload) {
  if (data.t !== "INTERACTION_CREATE") return;

  const payload = data.d as Interaction;
  const member: GuildMemberPayload | undefined = camelKeysToSnakeCase(
    (await structures.createMember(payload.member, payload.guild_id))
      .guildMember(payload.guild_id),
  );
  if (!member) return;

  eventHandlers.interactionCreate?.(
    {
      ...payload,
      member: member,
    },
  );
}

export function handleInternalApplicationCommandCreate(
  data: GatewayPayload,
) {
  if (data.t !== "APPLICATION_COMMAND_CREATE") return;

  eventHandlers.applicationCommandCreate?.(data.d as MessageApplicationPayload);
}
