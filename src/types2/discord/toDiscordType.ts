import { Message, Embed, Channel, Interaction, VoiceState, User } from "../../types/mod.ts";

type SnakeCase<T extends PropertyKey> = string extends T
  ? string
  : T extends `${infer F}${infer U}${infer R}`
  ? `${F extends Uppercase<F> ? "_" : ""}${Lowercase<F>}${U extends Uppercase<U>
      ? "_"
      : ""}${Lowercase<U>}${SnakeCase<R>}`
  : T extends `${infer F}${infer R}`
  ? `${F extends Uppercase<F> ? "_" : ""}${Lowercase<F>}${SnakeCase<R>}`
  : "";

export type ToDiscordType<T> = T extends readonly any[]
  ? { [K in keyof T]: ToDiscordType<T[K]> }
  : T extends object
  ? {
      [K in keyof T as SnakeCase<Extract<K, string>>]: K extends
        | "createdAt"
        | "lastPinTimestamp"
        | "joinTimestamp"
        | "archiveTimestamp"
        | "requestToSpeakTimestamp"
        | "syncedAt"
        | "editedTimestamp"
        ? string
        : K extends "before"
        ? T[K] extends number
          ? string
          : ToDiscordType<T[K]>
        : K extends "joinedAt"
        ? K extends number | null
          ? string | null
          : ToDiscordType<T[K]>
        : K extends "premiumSince"
        ? K extends number | null | undefined
          ? string | null | undefined
          : ToDiscordType<T[K]>
        : K extends "timestamp"
        ? T extends Message | Embed
          ? string
          : ToDiscordType<T[K]>
        : K extends "guildId"
        ? T extends Channel | Interaction | Message
          ? string | undefined
          : ToDiscordType<T[K]>
        : K extends "channelId"
        ? T extends Interaction
          ? string | undefined
          : ToDiscordType<T[K]>
        : K extends "premiumSubscriber"
        ? null | undefined
        : K extends "voiceStates"
        ? Omit<VoiceState, "guildId">[] | undefined
        : T extends Interaction
        ? K extends "user"
          ? undefined | ToDiscordType<User>
          : ToDiscordType<T[K]>
        : K extends "permissionOverwrites"
        ? undefined | ToDiscordType<T[K]>
        : K extends "thread"
        ? T extends Message
          ? ToDiscordType<Channel> | undefined
          : ToDiscordType<T[K]>
        : ToDiscordType<T[K]>;
    }
  : T extends undefined
  ? T extends bigint
    ? string | undefined
    : undefined
  : T extends bigint
  ? string
  : T;
