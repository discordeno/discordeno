import {
  MembershipScreeningFieldTypes,
  MembershipScreeningPayload,
  ModifyGuildMembershipScreeningFormParams,
} from "../../types/mod.ts";
import { createNewProp } from "../../util/utils.ts";
import { editGuildMembershipScreeningForm } from "../handlers/guild.ts";

const baseMembershipScreening = {
  edit(guildID: string, options?: ModifyGuildMembershipScreeningFormParams) {
    return editGuildMembershipScreeningForm(guildID, options);
  },
};

export async function createMembershipScreening(
  { form_fields: formFields, ...rest }: MembershipScreeningPayload,
) {
  const restProps: Record<string, Partial<PropertyDescriptor>> = {};
  for (const key of Object.keys(rest)) {
    restProps[key] = createNewProp((rest as any)[key]);
  }

  return Object.create(baseMembershipScreening, {
    ...restProps,
    formFields: createNewProp(formFields),
  });
}

export interface MembershipScreening {
  /** When the fields were last updated */
  version: string;
  /** The steps in the screening form */
  formFields: MembershipScreeningFieldTypes[];
  /** The server description shown in the screening form */
  description: string | null;

  // METHODS
  edit(
    guildID: string,
    options?: ModifyGuildMembershipScreeningFormParams,
  ): ReturnType<typeof editGuildMembershipScreeningForm>;
}
