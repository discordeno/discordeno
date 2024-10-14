import { DesiredPropertiesBehavior, defineConfig } from 'discordeno'

export default defineConfig({
  desiredProperties: {
    behavior: DesiredPropertiesBehavior.TypeAsNever,
    properties: {
      user: {
        id: true,
      },
      message: {
        id: true,
      },
      member: {
        roles: true,
      },
      interaction: {
        id: true,
        data: true,
        type: true,
        user: true,
        token: true,
        member: true,
        message: true,
        guildId: true,
        channelId: true,
      },
      role: {
        id: true,
      },
    },
  },
})
