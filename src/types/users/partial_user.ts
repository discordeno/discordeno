import { User } from "./user.ts";

export type PartialUser =
  & Partial<User>
  & Pick<User, "avatar" | "discriminator" | "id" | "username">;
