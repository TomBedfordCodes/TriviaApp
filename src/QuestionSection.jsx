import React from 'react'
import AnswerBtn from './AnswerBtn'

export default function QuestionSection() {
    return (
        <div className='question-section--container'>
            <h2>Which best selling toy of 1983 caused hysteria, 
                resulting in riots breaking in?</h2>
            <div className='answers--container'>
                <AnswerBtn />
                <AnswerBtn />
                <AnswerBtn />
                <AnswerBtn />
            </div>
        </div>
    )
}

