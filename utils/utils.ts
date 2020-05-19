import { StatusType } from "../types/discord.ts";
import { ActivityType } from "../types/activity.ts";
import { sendGatewayCommand } from "../module/shardingManager.ts";

export const sleep = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export function editBotsStatus(
  status: StatusType,
  name?: string,
  type = ActivityType.Game,
) {
  sendGatewayCommand("EDIT_BOTS_STATUS", { status, game: { name, type } });
}
