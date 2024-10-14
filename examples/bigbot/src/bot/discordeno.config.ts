import { DesiredPropertiesBehavior, defineConfig } from 'discordeno'

export default defineConfig({
  desiredProperties: {
    behavior: DesiredPropertiesBehavior.TypeAsNever,
    // TEMPLATE-SETUP: Add/Remove the desired properties that you don't need
    properties: {
      user: {
        id: true,
        username: true,
      },
      interaction: {
        id: true,
        data: true,
        type: true,
        user: true,
        token: true,
        guildId: true,
      },
    },
  },
})
