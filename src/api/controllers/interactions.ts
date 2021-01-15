import { eventHandlers } from "../../bot.ts";
import {
  Application,
  DiscordPayload,
  InteractionCommandPayload,
} from "../../types/mod.ts";
import { structures } from "../structures/mod.ts";

export async function handleInternalInteractionCreate(data: DiscordPayload) {
  if (data.t !== "INTERACTION_CREATE") return;

  const payload = data.d as InteractionCommandPayload;
  eventHandlers.interactionCreate?.(
    {
      ...payload,
      member: await structures.createMemberStructure(
        payload.member,
        payload.guild_id,
      ),
    },
  );
}

export function handleInternalApplicationCommandCreate(
  data: DiscordPayload,
) {
  if (data.t !== "APPLICATION_COMMAND_CREATE") return;

  eventHandlers.applicationCommandCreate?.(data.d as Application);
}
