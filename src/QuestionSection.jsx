import React from 'react'
import AnswerBtn from './AnswerBtn'
import { nanoid } from 'nanoid'
import { decode } from 'html-entities'



export default function QuestionSection(props) {

    const [answers, setAnswers] = React.useState(() => ([
        {answer: decode(props.answers[0]), id: nanoid(), isSelected: false},
        {answer: decode(props.answers[1]), id: nanoid(), isSelected: false}, 
        {answer: decode(props.answers[2]), id: nanoid(), isSelected: false}, 
        {answer: decode(props.answers[3]), id: nanoid(), isSelected: false}
    ]))

    const answerElements = answers.map(x => {
        return (
            <AnswerBtn 
                key={x.id}
                answer={x.answer}
                isSelected={x.isSelected}
                handleClick={() => answerSelected(x.id)}
            />)
    })

    function answerSelected(id) {
        const newArr = answers.map(answer => {
           if (answer.id === id) {
               return {...answer, isSelected: !answer.isSelected}
           } else {
               return {...answer, isSelected: false}
           }
       })
       setAnswers(newArr)
   }
   
    return (
        <div className='question-section--container'>
            <h2>{props.question}</h2>
            <div className='answers--container'>
                {answerElements}
            </div>
        </div>
    )
}

