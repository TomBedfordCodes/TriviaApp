import React from "react"
import QuestionSection from "./QuestionSection"
import { nanoid } from "nanoid"
import { decode } from 'html-entities'



export default function QuizScreen() {

    const [correctAnswerCount, setCorrectAnswerCount] = React.useState(0)
    const [showWarning, setShowWarning] = React.useState(false)

    const [questionsData, setQuestionsData] = React.useState([])
    const [isMarking, setIsMarking] = React.useState(false)

    const [questionsAndAnswers, setQuestionsAndAnswers] = React.useState([])
    // questionsAndAnswers array format:
    // [   {
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
    // },   ]

    
    // Get trivia data from API
    React.useEffect(function() {
        if (isMarking) {
            return
        }
        fetch("https://opentdb.com/api.php?amount=5&category=9&type=multiple")
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

    // When the Check Answers button is click, ensure all Qs have an answer selected, then score them
    function checkAnswers() {
        let tempCount = 0
        for (let qAndAObj of questionsAndAnswers) {
            let noneSelected = true
            for (let ans of qAndAObj.answers) {
                if (!ans.isSelected) {
                    continue
                }
                noneSelected = false
                if (qAndAObj.correctAnswer === ans.answer) {
                    tempCount += 1
                    // turn answer green
                } else {
                    // turn answer red
                }

                // Btns states:
                    // - are we marking or not? (pass them this state as a prop)
                    // - whether answer is correct (green color, bold text)
                    // - isSelected and answer incorrect (red color, faded text)
                    // - all others; not selected, not correct (faded text)

            }
            // if an answer isn't selected for any question, show warning div and stop checking
            if (noneSelected) {
                setShowWarning(true)
                return
            }
        }
        setCorrectAnswerCount(tempCount)
        setIsMarking(true)
    }

    // If warning div is shown, start timeout to clear it (returns a timeout cleanup function)
    React.useEffect(function() {
        if (!showWarning) {
            return
        }
        const unsubscribe = setTimeout(() => {
            setShowWarning(false)
        }, 5000)
        return () => clearTimeout(unsubscribe)
    }, [showWarning])


    // JSX COMPONENT
    return (
        <div className="quiz--container">
            {questionElements}
            {showWarning &&
                <div className="marking--footer">
                    <p className="warning--text">Answer all the questions!</p>
                </div>
            }
            {!isMarking && 
                <button className="checkanswers--btn" onClick={checkAnswers}>Check answers</button>
            }
            {isMarking && 
                <div className="marking--footer">
                    <p className="marking--score">You scored {correctAnswerCount}/5 correct answers</p>
                    <button className="marking--btn">Play again</button>
                </div>
            }
        </div>
    )
}

