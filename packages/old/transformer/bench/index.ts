import Benchmark from 'benchmark'

import TRANSFORMERS from '../src/index.js'

const suite = new Benchmark.Suite()

// Fetch the cached guild
const discordGuild = JSON.parse(
  await (
    await fetch(
      'https://raw.githubusercontent.com/discordeno/discordeno/benchies/cache/cachedObject/guild.json'
    )
  ).text()
)

const guild = TRANSFORMERS.guild(discordGuild)

suite.add('[Transformer] snake Guild to a camel Guild', () => {
  TRANSFORMERS.guild(discordGuild)
})

suite.add('[Transformer] camel Guild to a snake Guild ', () => {
  TRANSFORMERS.reverse.guild(guild)
})

// Fetch the cached user
const discordUser = JSON.parse(
  await (
    await fetch(
      'https://raw.githubusercontent.com/discordeno/discordeno/benchies/cache/cachedObject/user.json'
    )
  ).text()
)

const user = TRANSFORMERS.user(discordUser)

suite.add('[Transformer] snake User to a camel User', () => {
  TRANSFORMERS.user(discordUser)
})

suite.add('[Transformer] camel User to a snake User', () => {
  TRANSFORMERS.reverse.user(user)
})

for (const channelType of [
  'rules',
  'announcement-channel',
  'moderator-channel',
  'text-channel',
  'stage-channel',
  'voice-channel'
]) {
  const discordChannel = JSON.parse(
    await (
      await fetch(
        `https://raw.githubusercontent.com/discordeno/discordeno/benchies/cache/cachedObject/${channelType}.json`
      )
    ).text()
  )
  let formattedChannelType = channelType
    .split('-')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ')
  if (formattedChannelType === 'Rules') formattedChannelType = 'Rules Channel'

  suite.add(
    `[Transformer] snake ${formattedChannelType} to a camel ${formattedChannelType}`,
    () => {
      TRANSFORMERS.channel(discordChannel)
    }
  )

  const channel = TRANSFORMERS.channel(discordChannel)

  suite.add(
    `[Transformer] camel ${formattedChannelType} to a snake ${formattedChannelType}`,
    () => {
      TRANSFORMERS.reverse.channel(channel)
    }
  )
}

// Fetch the cached member
const discordMember = JSON.parse(
  await (
    await fetch(
      'https://raw.githubusercontent.com/discordeno/discordeno/benchies/cache/cachedObject/member.json'
    )
  ).text()
)

const member = TRANSFORMERS.member(discordMember)

suite.add('[Transformer] snake Member to a camel Member', () => {
  TRANSFORMERS.member(discordMember)
})

suite.add('[Transformer] camel Member to a snake Member', () => {
  TRANSFORMERS.reverse.member(member)
})

// Fetch the cached role
const discordRole = JSON.parse(
  await (
    await fetch(
      'https://raw.githubusercontent.com/discordeno/discordeno/benchies/cache/cachedObject/role.json'
    )
  ).text()
)

const role = TRANSFORMERS.role(discordRole)

suite.add('[Transformer] snake Role to a camel Role', () => {
  TRANSFORMERS.role(discordRole)
})

suite.add('[Transformer] camel Role to a snake Role', () => {
  TRANSFORMERS.reverse.role(role)
})

/*
// Fetch the cached message
const discordMessage = JSON.parse(
  await (await fetch(
    'https://raw.githubusercontent.com/discordeno/discordeno/benchies/cache/cachedObject/message.json'
  ))
    .text()
)

const message = TRANSFORMERS.message(discordMessage)

suite.add('[Transformer] snake Message to a camel Message', () => {
  TRANSFORMERS.message(discordMessage)
})

suite.add('[Transformer] camel User to a snake User', () => {
  TRANSFORMERS.reverse.message(message)
})
*/

suite
  .on('cycle', function (event: any) {
    console.log(String(event.target))
  })
  .run()
