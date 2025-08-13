/** Types for: https://discord.com/developers/docs/resources/guild-template */

/** https://discord.com/developers/docs/resources/guild-template#create-guild-template-json-params */
export interface CreateTemplate {
  /**
   * Name of the template
   *
   * @remarks
   * 1-100 characters
   */
  name: string
  /**
   * Description for the template
   *
   * @remarks
   * 0-120 characters
   */
  description?: string | null
}

/** https://discord.com/developers/docs/resources/guild-template#modify-guild-template-json-params */
export interface ModifyGuildTemplate {
  /**
   * Name of the template
   *
   * @remarks
   * 1-100 characters
   */
  name?: string
  /**
   * Description for the template
   *
   * @remark
   * 0-120 characters
   */
  description?: string | null
}
