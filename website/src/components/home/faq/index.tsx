import {
  FaqAnswer,
  FaqContainer,
  FaqQuestion,
  FaqSection,
} from '@site/src/styling'
import React from 'react'

const Faq = ({
  question,
  answer,
  defaultExpanded,
}: {
  question: string
  answer: string
  defaultExpanded?: boolean
}) => {
  const [visible, setVisible] = React.useState(defaultExpanded ?? false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <FaqContainer>
      <div>
        <FaqQuestion onClick={toggleVisibility}>
          {question}
          {visible ? (
            <svg height="24" width="24" id="rotated">
              <path d="m12 15.375-6-6 1.4-1.4 4.6 4.6 4.6-4.6 1.4 1.4Z"></path>
            </svg>
          ) : (
            <svg height="24" width="24">
              <path d="m12 15.375-6-6 1.4-1.4 4.6 4.6 4.6-4.6 1.4 1.4Z"></path>
            </svg>
          )}
        </FaqQuestion>
        <FaqAnswer visible={visible}>{answer}</FaqAnswer>
      </div>
    </FaqContainer>
  )
}

const questions = [
  {
    question:
      'Does Discordeno work on all JavaScript runtimes like Deno, Node.js, and Bun?',
    answer:
      "Yes! Discordeno is designed to work on any JavaScript runtime, including Deno, Node.js, and even in the Bun environment. This means that you can use Discordeno in your project no matter where you're running your code.",
    defaultExpanded: true,
  },
  {
    question: 'Does Discordeno handle sharding?',
    answer:
      "Yes! Discordeno helps run some of the largest bot's on discord. Discordeno has built-in support for sharding, which allows you to distribute your bot across multiple processes or servers. Sharding can help improve the scalability and reliability of your bot, especially if you're working with a large number of guilds or users. Discordeno's sharding system is designed to be easy to use and configure, with support for automatic sharding and custom sharding strategies. Make sure to check the Discordeno documentation for more information on how to use sharding in your bot.",
    defaultExpanded: false,
  },
  {
    question: "Why doesn't Discordeno use classes like other libraries?",
    answer:
      'Generally, Discordeno does not use classes. Instead, Discordeno uses plain JavaScript objects to define commands, events, and other components. However, in certain cases where it makes sense, we do use classes. This design choice was made to keep the library lightweight and simple and to allow for more flexible and dynamic code, as components can be easily modified and extended at runtime. While classes can be useful in some cases, Discordeno has chosen to use a more functional approach.',
    defaultExpanded: false,
  },
  {
    question: 'Can I still use classes in my bot with Discordeno?',
    answer:
      "Yes! While Discordeno itself does not use classes, you can still use classes in your own code by using one of the many libraries or frameworks that provide class-based abstractions on top of Discordeno. Some examples of such libraries include the Discordeno.js which provides a very similar framework and API to Discord.js, or the Sinf library that provides a similar API to Eris library. These libraries provide classes and other abstractions that can help simplify the development of your bot, while still leveraging the power and flexibility of Discordeno's underlying object-based API. Make sure to check the documentation of these libraries for more information on how to use them in your bot.",
    defaultExpanded: false,
  },
]

export default function DiscordenoFAQ() {
  return (
    <>
      <FaqSection>
        <div>
          <h1>Frequently Asked Questions</h1>
          {questions.map((question, index) => (
            <Faq
              key={index}
              question={question.question}
              answer={question.answer}
              defaultExpanded={question.defaultExpanded}
            />
          ))}
        </div>
      </FaqSection>
    </>
  )
}
