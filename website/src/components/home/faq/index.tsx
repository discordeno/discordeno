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
    question: 'Question 1',
    answer: 'Answer 1',
    defaultExpanded: true,
  },
  {
    question: 'Question 2',
    answer: 'Answer 2',
    defaultExpanded: true,
  },
  {
    question: 'Question 3',
    answer: 'Answer 3',
  },
  {
    question: 'Question 4',
    answer: 'Answer 4',
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
