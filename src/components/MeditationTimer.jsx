import { useState, useRef, useEffect } from 'react'
// import useSound from 'use-sound'
// import singingBowl from '../../public/singing-bowl.mp3'

const MeditationTimer = () => {
  const [seconds, setSeconds] = useState(300)

  const [started, setStarted] = useState(false)

  const timerId = useRef(null)

  console.log(timerId)
  const decrementSeconds = (s) => {
    console.log('decrementSeconds --', s)
    setSeconds(s - 1)
  }

  // this function is re-initialized on every render...which somehow breaks things with setInterval
  // look at doing the custom hook implementation "useInterval"
  const startTimer = () => {
    if (!timerId.current) {
      timerId.current = setInterval(decrementSeconds, 1000, seconds)
    }
  }

  useEffect(() => {
    console.log('here we gooooo')
    if (started) startTimer()
  }, [started, startTimer])


  const stopTimer = (reset = false) => {
    if (timerId.current) clearInterval(timerId.current)
    setStarted(false)
    timerId.current = null

    if (reset) setSeconds(300)
  }

  // const [playSingingBowl] = useSound(singingBowl)

  const CountdownTimer = () => {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, '0')
    const remainingSeconds = `${seconds % 60}`.padStart(2, '0')

    return (
      <div className="countdown-timer">
        <h1>[ {minutes}:{remainingSeconds} ]</h1>
      </div>
    )
  }

  return (
    <div className="timer">
      <CountdownTimer />
      <hr />

      <div className="timer__action-btns">
        <button onClick={() => setStarted(true)}>start</button>
        <button onClick={stopTimer}>stop</button>
        <button onClick={() => stopTimer(true)}>reset</button>
      </div>
    </div>
  )
}

export default MeditationTimer
