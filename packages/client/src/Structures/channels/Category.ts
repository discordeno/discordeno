import type { BigString } from '@discordeno/types'
import type Collection from '../../Collection'
import type { AnyGuildChannel } from '../../typings'
import GuildChannel from './Guild'

export class CategoryChannel extends GuildChannel {
  get channels(): Collection<BigString, Exclude<AnyGuildChannel, CategoryChannel>> {
    return this.guild?.channels.filter((c) => c.parentID === this.id) as unknown as Collection<BigString, Exclude<AnyGuildChannel, CategoryChannel>>
  }
}

export default CategoryChannel
