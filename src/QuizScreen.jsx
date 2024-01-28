import React from "react"
import QuestionSection from "./QuestionSection"
import { nanoid } from "nanoid"
import { decode } from 'html-entities'



export default function QuizScreen() {

    const [questionsData, setQuestionsData] = React.useState([])
    const [isMarking, setIsMarking] = React.useState(false)

    const [questionsAndAnswers, setQuestionsAndAnswers] = React.useState([])
    // questionsAndAnswers array format:
    // [
    //     {
    //         question: x.question,
    //         answers: [
                // {
                    // questionNumber: i,
                    // answer: decode(y),
                    // id: nanoid(),
                    // isSelected: false
                // },
    //         ],
    //         correctAnswer: x.correct_answer
    //     },
    // ]

    
    // Get trivia data from API
    React.useEffect(function() {
        if (isMarking) {
            return
        }
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then(res => res.json())
            .then(data => setQuestionsData(data.results))
            .catch(e => {
                console.error(e);
            })
    }, [isMarking])


    // Put data from API into an array of objects (questions and answers together)
    React.useEffect(function() {
        const newArr = questionsData.map((x, i) => {
            const answersTempArr = x.incorrect_answers
            const randInt = Math.floor(Math.random() * 4)
            answersTempArr.splice(randInt, 0, x.correct_answer)
            answersTempArr.sort(() => (Math.random() > .5) ? 1 : -1)
            const answersArr = answersTempArr.map(y => {
                return ({
                        questionNumber: i,
                        answer: decode(y),
                        id: nanoid(),
                        isSelected: false
                    })
            })
            return ({
                    question: x.question,
                    answers: answersArr,
                    correctAnswer: x.correct_answer
                })
        })
        setQuestionsAndAnswers(newArr)
    }, [questionsData])


    // Set up question section elements, each has a question and four possible answers
    const questionElements = questionsAndAnswers.map(x => {
        return (
            <QuestionSection
                question={decode(x.question)}
                answers={x.answers}
                correctAnswer={x.correctAnswer}
                handleClick={answerSelected}
                key={nanoid()}
            />
        )
    })

    // When an answer button is clicked, find it in master array and change isSelected
    function answerSelected(questionNumber, id) {
        setQuestionsAndAnswers(oldArr => {
            const newArr = oldArr.slice()
            for (let answer of newArr[questionNumber].answers) {
                if (answer.id === id) {
                    answer.isSelected = !answer.isSelected
                } else {
                    answer.isSelected = false
                }
            }
            return newArr
        })
    }





    function checkAnswers() {
        setIsMarking(true)
        for (let qAndAObj of questionsAndAnswers) {
            
        }
    }





    return (
        <div className="quiz--container">
            {questionElements}
            {!isMarking && <button className="checkanswers--btn" onClick={checkAnswers}>Check answers</button>}
        </div>
    )
}

