import { ActionRow, MessageComponentTypes, TextStyles } from '@discordeno/types'

export class ModalBuilder {
  customId: string
  title: string
  components: ActionRow[]

  constructor(customId: string, title: string) {
    this.customId = customId
    this.title = title
    this.components = []
  }

  inputText(
    label: string,
    customId: string,
    style: TextStyles,
    options: {
      minLength?: number
      maxLength?: number
      placeholder?: string
      required?: boolean
    },
  ) {
    const row = this.getActionRow()

    row.components.push({
      // TODO: check why this is broken
      // @ts-ignore
      type: MessageComponentTypes.InputText,
      label,
      customId,
      // @ts-ignore
      style,
      minLength: options.minLength,
      maxLength: options.maxLength,
      placeholder: options.placeholder,
      required: options.required,
    })

    return this
  }

  private getActionRow() {
    if (this.components.length === 5) throw new Error('Maximum Component count reached. Cannot have more than 5 Components.')

    this.components.push({ type: MessageComponentTypes.ActionRow, components: [] as any })

    return this.components[this.components.length - 1]
  }
}
