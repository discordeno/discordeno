import {
  ReviewsBox,
  ReviewsElement,
  ReviewsElementWrapper,
  ReviewsHeader,
  ReviewsLeft,
  ReviewsOther,
  ReviewsOtherContainer,
  ReviewsRight,
  ReviewsSection,
  StarContainer,
  StarIcon,
} from '@site/src/styling'
import { DiscordLibraries, IReview } from '@site/src/types'
import React from 'react'

const reviewList: IReview[] = [
  {
    review: `The best library I've ever seen in JS, very much leaning towards optimization for larger bots while still keeping it easy to use. Highly customizable without needing to fork the lib at all. The maintainers and the community are very nice, friendly and helpful.     `,
    bot: {
      username: 'Giveaway Boat',
      discriminator: '2911',
      avatar:
        'https://media.discordapp.net/attachments/785384884197392387/1094721866167492658/giveaway_boat.png',
      invite_url: 'https://invite.giveaway.boats/',
      guild_count: 150000,
    },
    developer: {
      username: 'Awesome Stickz',
      discriminator: '9999',
    },
    stars: 5,
    previous_library: 'ERIS',
    memory_improvement: {
      from: 20000,
      to: 7000,
    },
  },
  {
    review: `DiscordEno is the best library that offers very high customization. It is perfect for scaling large Discord bots. This library helped us improve our memory usage by 7 times!`,
    bot: {
      username: 'Ai Image Generator',
      discriminator: '8424',
      avatar:
        'https://cdn.discordapp.com/avatars/1032699319368814652/8abbc5911333d3df288ff962a2120d75.png',
      invite_url:
        'https://discord.com/oauth2/authorize?client_id=1032699319368814652&permissions=274877959232&scope=bot%20applications.commands',
      guild_count: 41000,
    },
    developer: {
      username: '8au',
      discriminator: '7840',
    },
    stars: 5,
    previous_library: 'DISCORD_JS',
    memory_improvement: {
      from: 4500,
      to: 614,
    },
  },
  {
    review: `The library prioritizes the needs and opinions of its core users, and offers a straightforward yet highly customizable implementation. The Core Contributors bring their extensive experience in developing large-scale bots.`,
    bot: {
      username: 'Fibo',
      discriminator: '6503',
      avatar:
        'https://cdn.discordapp.com/avatars/735147814878969968/8b72f174c30276f4d48c1e66608df70c.webp',
      invite_url:
        'https://discord.com/api/oauth2/authorize?client_id=735147814878969968&permissions=805825744&scope=applications.commands%20bot',
      guild_count: 211477,
    },
    developer: {
      username: 'Meister',
      discriminator: '9667',
    },
    stars: 5,
    previous_library: 'DISCORD_JS',
    memory_improvement: {
      from: 13000,
      to: 11000,
    },
  },
  {
    review: `I think choosing discordeno is a very good option, we have been working with Discord.js for years, and yes... It's good, but for large scale bots... nothing better than discordeno. Besides its creator is very attentive, and gives us a hand whenever he can.`,
    bot: {
      username: 'CactusFire',
      discriminator: '3759',
      avatar:
        'https://cdn.discordapp.com/avatars/543567770579894272/ae83acadc61dcca989525d83e76a1783.webp?size=2048',
      invite_url:
        'https://discord.com/oauth2/authorize?client_id=543567770579894272&permissions=8&scope=bot%20applications.commands',
      guild_count: 259000,
    },
    developer: {
      username: 'LHCLYT',
      discriminator: '3996',
    },
    stars: 5,
    previous_library: 'DISCORD_JS',
    memory_improvement: {
      from: 64000,
      to: 9000,
    },
  },
]

export default function DiscordenoReviews() {
  return (
    <ReviewsSection>
      <div>
        <div>
          <h1>Discordeno Community Feedback</h1>
        </div>
        <ReviewsElementWrapper>
          {reviewList
            .sort((a, b) => {
              return b.bot.guild_count - a.bot.guild_count
            })
            .map((review, idx) => (
              <ReviewsElement key={review.bot.username}>
                <ReviewsHeader>
                  <ReviewsLeft>
                    <img src={review.bot.avatar} alt={review.bot.username} />
                    <div>
                      <span>
                        <div id="username">{review.bot.username}</div>
                        <div id="discriminator">
                          #{review.bot.discriminator}
                        </div>
                        <div id="badge">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="16"
                            viewBox="0 0 12 16"
                          >
                            <path
                              fill="#fff"
                              fillRule="evenodd"
                              d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5z"
                            ></path>
                          </svg>
                          Bot
                        </div>
                      </span>
                      <div id="sub_header">
                        by <div id="username">{review.developer.username}</div>
                        <div id="discriminator">
                          #{review.developer.discriminator}
                        </div>
                      </div>
                    </div>
                  </ReviewsLeft>
                  <ReviewsRight>
                    <StarContainer>
                      {([1, 2, 3, 4, 5] as const).map(star => (
                        <StarIcon
                          key={star}
                          active={star > review.stars}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <title>{`Star ${star}`}</title>
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </StarIcon>
                      ))}
                    </StarContainer>
                    <div>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2C9.38 2 7.25 4.13 7.25 6.75C7.25 9.32 9.26 11.4 11.88 11.49C11.96 11.48 12.04 11.48 12.1 11.49C12.12 11.49 12.13 11.49 12.15 11.49C12.16 11.49 12.16 11.49 12.17 11.49C14.73 11.4 16.74 9.32 16.75 6.75C16.75 4.13 14.62 2 12 2Z"
                          fill="currentColor"
                        />
                        <path
                          d="M17.0809 14.1606C14.2909 12.3006 9.74094 12.3006 6.93094 14.1606C5.66094 15.0006 4.96094 16.1506 4.96094 17.3806C4.96094 18.6106 5.66094 19.7506 6.92094 20.5906C8.32094 21.5306 10.1609 22.0006 12.0009 22.0006C13.8409 22.0006 15.6809 21.5306 17.0809 20.5906C18.3409 19.7406 19.0409 18.6006 19.0409 17.3606C19.0309 16.1406 18.3409 14.9906 17.0809 14.1606ZM14.3309 16.5606L11.8109 19.0806C11.6909 19.2006 11.5309 19.2606 11.3709 19.2606C11.2109 19.2606 11.0509 19.1906 10.9309 19.0806L9.67094 17.8206C9.43094 17.5806 9.43094 17.1806 9.67094 16.9406C9.91094 16.7006 10.3109 16.7006 10.5509 16.9406L11.3709 17.7606L13.4509 15.6806C13.6909 15.4406 14.0909 15.4406 14.3309 15.6806C14.5809 15.9206 14.5809 16.3206 14.3309 16.5606Z"
                          fill="currentColor"
                        />
                      </svg>
                      {String(review.bot.guild_count).replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ','
                      )}{' '}
                      guilds
                    </div>
                  </ReviewsRight>
                </ReviewsHeader>
                <ReviewsBox>{review.review}</ReviewsBox>
                <ReviewsOtherContainer>
                  <a
                    href={review.bot.invite_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16 12.75H12.75V16C12.75 16.41 12.41 16.75 12 16.75C11.59 16.75 11.25 16.41 11.25 16V12.75H8C7.59 12.75 7.25 12.41 7.25 12C7.25 11.59 7.59 11.25 8 11.25H11.25V8C11.25 7.59 11.59 7.25 12 7.25C12.41 7.25 12.75 7.59 12.75 8V11.25H16C16.41 11.25 16.75 11.59 16.75 12C16.75 12.41 16.41 12.75 16 12.75Z"
                        fill="currentColor"
                      />
                    </svg>
                    Invite this bot
                  </a>
                  <div>
                    <div>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22 22.75H5C2.93 22.75 1.25 21.07 1.25 19V2C1.25 1.59 1.59 1.25 2 1.25C2.41 1.25 2.75 1.59 2.75 2V19C2.75 20.24 3.76 21.25 5 21.25H22C22.41 21.25 22.75 21.59 22.75 22C22.75 22.41 22.41 22.75 22 22.75Z"
                          fill="currentColor"
                        />
                        <path
                          d="M4.99982 17.7498C4.82982 17.7498 4.64982 17.6898 4.50982 17.5698C4.19982 17.2998 4.15982 16.8298 4.42982 16.5098L9.01982 11.1498C9.51982 10.5698 10.2398 10.2198 10.9998 10.1898C11.7598 10.1698 12.5098 10.4498 13.0498 10.9898L13.9998 11.9398C14.2498 12.1898 14.5698 12.3098 14.9298 12.3098C15.2798 12.2998 15.5998 12.1398 15.8298 11.8698L20.4198 6.50982C20.6898 6.19982 21.1598 6.15982 21.4798 6.42982C21.7898 6.69982 21.8298 7.16982 21.5598 7.48982L16.9698 12.8498C16.4698 13.4298 15.7498 13.7798 14.9898 13.8098C14.2198 13.8298 13.4798 13.5498 12.9398 13.0098L11.9998 12.0598C11.7498 11.8098 11.4198 11.6798 11.0698 11.6898C10.7198 11.6998 10.3998 11.8598 10.1698 12.1298L5.57982 17.4898C5.41982 17.6598 5.20982 17.7498 4.99982 17.7498Z"
                          fill="currentColor"
                        />
                      </svg>
                      {review.memory_improvement
                        ? (review.memory_improvement.from / 1000)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
                          'GB' +
                          ` (${DiscordLibraries[review.previous_library]})`
                        : DiscordLibraries[review.previous_library]}
                      <div>→</div>
                      {review.memory_improvement
                        ? (review.memory_improvement.to / 1000)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'GB'
                        : 'Discordeno'}

                      {review.memory_improvement && (
                        // show in percentage the improvement
                        <div>
                          {' '}
                          —{' '}
                          <strong>
                            {(
                              ((review.memory_improvement.from -
                                review.memory_improvement.to) /
                                review.memory_improvement.from) as any
                            ).toFixed(2) * 100}
                            %
                          </strong>
                          RAM improvement
                        </div>
                      )}
                    </div>
                  </div>
                </ReviewsOtherContainer>
              </ReviewsElement>
            ))}
        </ReviewsElementWrapper>
      </div>
    </ReviewsSection>
  )
}
