import React from 'react'
import StartScreen from './StartScreen'
import QuizScreen from './QuizScreen'


export default function App() {

  const [gameStarted, setGameStarted] = React.useState(false)
  
  function startGame() {
    setGameStarted(true)
  }

  return (
    <div>
      {gameStarted ? <QuizScreen />: <StartScreen handleBtnClick={startGame} />}
      <img src="/blob1.png" className="blob-topright"/>
      <img src="/blob2.png" className="blob-bottomleft"/>
    </div>
  )
}


