import { BotWithCache } from '../../deps.js'
import { createChannel } from './createChannel.js'
import { deleteChannel } from './deleteChannel.js'
import { deleteChannelPermissionOverride } from './deleteChannelPermissionOverride.js'
import { editChannel } from './editChannel.js'
import { editChannelPermissionOverrides } from './editChannelPermissionOverrides.js'
import { followAnnouncementChannel } from './followAnnouncementChannel.js'
import { forums } from './forums/mod.js'
import { getChannelWebhooks } from './getChannelWebhooks.js'
import { stages } from './stages/mod.js'
import { swapChannels } from './swapChannels.js'
import { threads } from './threads/mod.js'

export function channels(bot: BotWithCache) {
  forums(bot)
  stages(bot)
  threads(bot)

  createChannel(bot)
  deleteChannel(bot)
  deleteChannelPermissionOverride(bot)
  editChannel(bot)
  editChannelPermissionOverrides(bot)
  followAnnouncementChannel(bot)
  getChannelWebhooks(bot)
  swapChannels(bot)
}
