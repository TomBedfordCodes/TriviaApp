import React from 'react'


export default function AnswerBtn(props) {
    const styles = {
        backgroundColor: props.isSelected ? "#D6DBF5" : "",
        border: props.isSelected ? "0.8px solid #D6DBF5" : "0.8px solid #4D5B9E"
    }
    return (
        <button 
            className='answer--btn'
            onClick={props.handleClick}
            style={styles}
        >{props.answer}</button>
    )
}


