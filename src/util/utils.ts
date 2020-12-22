import { sendGatewayCommand } from "../ws/shard_manager.ts";
import { ActivityType, StatusType } from "../types/types.ts";
import { encode } from "../../deps.ts"

export const sleep = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export interface BotStatusRequest {
  status: StatusType;
  game: {
    name?: string;
    type: ActivityType;
  };
}

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

export function delay(ms: number): Promise<void> {
  return new Promise((res): number =>
    setTimeout((): void => {
      res();
    }, ms)
  );
}
