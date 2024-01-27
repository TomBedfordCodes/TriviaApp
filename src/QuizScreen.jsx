import React from "react"
import QuestionSection from "./QuestionSection"
import { nanoid } from "nanoid"
import { decode } from 'html-entities'



export default function QuizScreen() {

    const [questionsData, setQuestionsData] = React.useState([])
    const [isMarking, setIsMarking] = React.useState(false)

    React.useEffect(function() {
        if (isMarking) {
            return
        }
        fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
            .then(res => res.json())
            .then(data => setQuestionsData(data.results))
            .catch(e => {
                console.error(e);
            })
    }, [isMarking])

    const questionElements = questionsData.map(x => {
        const answersArr = x.incorrect_answers
        const randInt = Math.floor(Math.random() * 4)
        answersArr.splice(randInt, 0, x.correct_answer)
        answersArr.sort(() => (Math.random() > .5) ? 1 : -1)
        return (
            <QuestionSection 
                question={decode(x.question)}
                answers={answersArr}
                correctAnswer={x.correct_answer}
                key={nanoid()}
            />
        )
    })

    return (
        <div className="quiz--container">
            {questionElements}
            <button className="checkanswers--btn">Check answers</button>
        </div>
    )
}

