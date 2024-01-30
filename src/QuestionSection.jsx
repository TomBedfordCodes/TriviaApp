import React from 'react'
import AnswerBtn from './AnswerBtn'



export default function QuestionSection(props) {

    const answerElements = props.answers.map(x => {
        return (
            <AnswerBtn 
                key={x.id}
                answer={x.answer}
                isSelected={x.isSelected}
                handleClick={() => props.handleClick(x.questionNumber, x.id)}
                isMarking={props.isMarking}
                isCorrect={props.correctAnswer === x.answer}
            />)
    })
    return (
        <div className='question-section--container'>
            <h2>{props.question}</h2>
            <div className='answers--container'>
                {answerElements}
            </div>
        </div>
    )
}