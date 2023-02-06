import type { DiscordOverwrite, OverwriteTypes } from '@discordeno/types'
import { Base } from '../Base'
import type { BigString } from '../Client'
import Permission from './Permission'

export class PermissionOverwrite extends Permission {
  id: BigString
  type: OverwriteTypes

  constructor(data: DiscordOverwrite) {
    super(data.allow, data.deny)

    this.id = data.id
    this.type = data.type
  }

  toJSON(props: string[] = []): Record<string, any> {
    return Base.prototype.toJSON.call(['id', 'type', ...props])
  }
}

export default PermissionOverwrite
