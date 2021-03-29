import { SnakeCaseProps } from "../util.ts";

export interface MembershipScreening {
  /** When the fields were last updated */
  version: string;
  /** The steps in the screening form */
  formFields: MembershipScreeningField[];
  /** The server description shown in the screening form */
  description: string | null;
}

export type DiscordMembershipScreening = SnakeCaseProps<MembershipScreening>;
