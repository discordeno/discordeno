import {
  ActionRow,
  ButtonComponent,
  ButtonStyles,
  InputTextComponent,
  MessageComponentTypes,
  SelectMenuChannelsComponent,
  SelectMenuComponent,
  SelectMenuRolesComponent,
  SelectMenuUsersAndRolesComponent,
  SelectMenuUsersComponent,
  SelectOption,
} from '@discordeno/types'

export type Component =
  | ButtonComponent
  | InputTextComponent
  | SelectMenuComponent
  | SelectMenuChannelsComponent
  | SelectMenuRolesComponent
  | SelectMenuUsersComponent
  | SelectMenuUsersAndRolesComponent

export const SNOWFLAKE_REGEX = /^\d{17,}$/

export class ComponentsBuilder extends Array<ActionRow> {
  actionRow() {
    if (this.length === 5) throw new Error('Maximum ActionRow count reached. Cannot have more than 5 ActionRows')

    this.push({ type: MessageComponentTypes.ActionRow, components: [] as any as ActionRow['components'] })

    return this
  }

  component(component: Component) {
    const actionRow = this.getCurrentActionRow()
    actionRow.components.push(component as any)

    return this
  }

  button(
    label: string,
    style: keyof typeof ButtonStyles | ButtonStyles,
    customIdOrLink: string,
    options?: { disabled?: boolean; emoji?: ButtonComponent['emoji'] | string | bigint },
  ) {
    let row = this.getCurrentActionRow()

    // If the Action Row already has 5 buttons create a new one
    if (row.components.length === 5 || row.components.some((component) => component.type !== MessageComponentTypes.Button)) {
      this.actionRow()
      row = this.getCurrentActionRow()
    }

    style = typeof style === 'string' ? ButtonStyles[style] : style

    row.components.push({
      type: MessageComponentTypes.Button,
      label: label,
      customId: style !== ButtonStyles.Link ? customIdOrLink : undefined,
      style,
      emoji: stringToEmoji(options?.emoji),
      url: style === ButtonStyles.Link ? customIdOrLink : undefined,
      disabled: options?.disabled,
    })

    return this
  }

  selectMenu(
    customId: string,
    selectOptions: SelectOption,
    options?: Pick<SelectMenuComponent, 'placeholder' | 'minValues' | 'maxValues' | 'disabled'>,
  ) {
    const row = this.getEmptyActionRow()

    row.components.push({
      // @ts-expect-error
      type: MessageComponentTypes.SelectMenu,
      customId,
      selectOptions,
      placeholder: options?.placeholder,
      minValues: options?.minValues,
      disabled: options?.disabled,
    })

    return this
  }

  userSelectMenu(customId: string, options?: Pick<SelectMenuUsersComponent, 'placeholder' | 'minValues' | 'maxValues' | 'disabled'>) {
    const row = this.getEmptyActionRow()

    row.components.push({
      // @ts-expect-error
      type: MessageComponentTypes.SelectMenuUsers,
      customId,
      placeholder: options?.placeholder,
      minValues: options?.minValues,
      disabled: options?.disabled,
    })

    return this
  }

  roleSelectMenu(customId: string, options?: Pick<SelectMenuRolesComponent, 'placeholder' | 'minValues' | 'maxValues' | 'disabled'>) {
    const row = this.getEmptyActionRow()

    row.components.push({
      // @ts-expect-error
      type: MessageComponentTypes.SelectMenuRoles,
      customId,
      placeholder: options?.placeholder,
      minValues: options?.minValues,
      disabled: options?.disabled,
    })

    return this
  }

  mentionableSelectMenu(customId: string, options?: Pick<SelectMenuUsersAndRolesComponent, 'placeholder' | 'minValues' | 'maxValues' | 'disabled'>) {
    const row = this.getEmptyActionRow()

    row.components.push({
      // @ts-expect-error
      type: MessageComponentTypes.SelectMenuUsersAndRoles,
      customId,
      placeholder: options?.placeholder,
      minValues: options?.minValues,
      disabled: options?.disabled,
    })

    return this
  }

  channelSelectMenu(
    customId: string,
    options?: Pick<SelectMenuChannelsComponent, 'channelTypes' | 'placeholder' | 'minValues' | 'maxValues' | 'disabled'>,
  ) {
    const row = this.getEmptyActionRow()

    row.components.push({
      // @ts-expect-error
      type: MessageComponentTypes.SelectMenuChannels,
      customId,
      channelTypes: options?.channelTypes,
      placeholder: options?.placeholder,
      minValues: options?.minValues,
      disabled: options?.disabled,
    })

    return this
  }

  private getCurrentActionRow() {
    if (this.length === 0) {
      this.actionRow()

      return this[0]
    }

    return this[this.length - 1]
  }

  private getEmptyActionRow() {
    const row = this.getCurrentActionRow()
    // @ts-expect-error
    if (row.components.length === 0) return row

    this.actionRow()

    return this.getCurrentActionRow()
  }
}

export class SelectOptionsBuilder extends Array<SelectOption> {
  option(label: string, value: string, options?: Pick<SelectOption, 'description' | 'default'> & { emoji: SelectOption['emoji'] | string | bigint }) {
    this.push({
      label,
      value,
      description: options?.description,
      emoji: stringToEmoji(options?.emoji),
      default: options?.default,
    })
  }
}

function stringToEmoji(emoji?: string | bigint | ButtonComponent['emoji']) {
  if (!emoji) return

  if (typeof emoji === 'bigint') {
    return { id: emoji }
  }

  if (typeof emoji === 'object') return emoji

  // A snowflake id was provided
  const match = emoji.match(SNOWFLAKE_REGEX)?.[0]
  if (match) {
    return {
      id: BigInt(match),
    }
  }

  // A unicode emoji was provided
  return {
    name: emoji,
  }
}
