import React from "react"

export default function StartScreen(props) {
    return (
        <div className="container--startscreen">
            <h1>Trivia! 🔍</h1>
            <p>Multiple choice questions - try to get as many right as you can!</p>
            <button onClick={props.handleBtnClick}>Start quiz</button>
        </div>
    )
}

