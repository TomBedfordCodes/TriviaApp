import React from 'react'
import StartScreen from './StartScreen'
import QuizScreen from './QuizScreen'


export default function App() {

  const [gameStarted, setGameStarted] = React.useState(false)
  const [showRequestsError, setShowRequestsError] = React.useState(false)
  
  function startGame() {
    setGameStarted(true)
  }

  function resetGame() {
    setGameStarted(false)
    setShowRequestsError(true)
  }

  React.useEffect(function() {
    if (!showRequestsError) {
        return
    }
    const unsubscribe = setTimeout(() => {
      setShowRequestsError(false)
    }, 5000)
    return () => clearTimeout(unsubscribe)
  }, [showRequestsError])

  
  return (
    <div>
      {gameStarted ? <QuizScreen errorHandling={resetGame} /> : <StartScreen handleBtnClick={startGame} />}
      {/* <img src="/blob1.png" className="blob-topright"/>
      <img src="/blob2.png" className="blob-bottomleft"/> */}
      {showRequestsError && 
        <p className="warning--text">
            Too many requests to the Trivia DB - please wait a moment and try again
        </p>
      }
    </div>
  )
}


