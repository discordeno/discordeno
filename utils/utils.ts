import { StatusType } from "../types/discord.ts";
import { ActivityType } from "../types/activity.ts";
import { sendGatewayCommand } from "../module/shardingManager.ts";
import { encode } from "https://deno.land/std@0.61.0/encoding/base64.ts";

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

export function chooseRandom<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}

export async function urlToBase64(url: string) {
  const buffer = await fetch(url).then((res) => res.arrayBuffer());
  const imageStr = encode(buffer);
  const type = url.substring(url.lastIndexOf(".") + 1);
  return `data:image/${type};base64,${imageStr}`;
}
