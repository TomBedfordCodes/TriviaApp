import React from 'react'


export default function AnswerBtn(props) {

    let backgroundColor = ""
    let border = ""
    let color = ""
    let opacity = 1

    if (props.isMarking) {
        if (props.isCorrect) {
            // if answer is correct, make green
            backgroundColor = "#94D7A2"
            border = "0.8px solid #94D7A2"
        } else {
            if (props.isSelected) {
                // if answer is incorrect but selected, make red
                backgroundColor = "#F8BCBC"
                border = "0.8px solid #F8BCBC"
                color = "#293264"
                opacity = 0.5
            } else {
                // if answer is incorrect and unselected
                border = "0.8px solid #4D5B9E"
                opacity = 0.5
            }
        }
    } else {
        // if not marking, style based on whether selected or not
        if (props.isSelected) {
            backgroundColor = "#D6DBF5"
            border = "0.8px solid #D6DBF5"
        } else {
            backgroundColor = ""
            border = "0.8px solid #4D5B9E"
        }
    }

    const styles = {
        backgroundColor: backgroundColor,
        border: border,
        color: color,
        opacity: opacity
        // backgroundColor: props.isSelected ? "#D6DBF5" : "",
        // border: props.isSelected ? "0.8px solid #D6DBF5" : "0.8px solid #4D5B9E"
    }
    return (
        <button 
            className='answer--btn'
            onClick={props.handleClick}
            style={styles}
            disabled={props.isMarking}
        >{props.answer}</button>
    )
}


