import { SnakeCaseProps } from "../util.ts";

export interface ModifyGuildMembershipScreeningFormParams {
  /** Whether Membership Screening is enabled */
  enabled: boolean;
  /** Arrray of field objects serialized in a string */
  formFields: string;
  /** The server description to show in the screening form */
  description: string;
}

export type DiscordModifyGuildMembershipScreeningFormParams = SnakeCaseProps<
  ModifyGuildMembershipScreeningFormParams
>;
