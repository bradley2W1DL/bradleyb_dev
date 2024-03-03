import {Howl} from 'howler'

type StartTimerFn = () => void
type StopTimerFn = (reset: boolean) => void
type FormatSecondsFn = () => string
type MinuteChimeFn = (count: number) => void

interface MeditationTimer {
  secondsCount: number,
  timerId: number | null,
  formatSeconds: FormatSecondsFn,
  minuteChime: MinuteChimeFn,
  startTimer: StartTimerFn,
  stopTimer: StopTimerFn,
}

interface EditTimer {
  minutes: number;
  seconds: number;
  editStartTime: boolean;
  onSubmit(): void;
}

const bowlSound = new Howl({
  src: ["singing-bowl.mp3"]
})

const defaultSeconds = 300 // 5 minutes

export function editTimer(): EditTimer {
  return {
    minutes: this.$persist(0),
    seconds: this.$persist(0),
    editStartTime: false,
    onSubmit() {
      this.secondsCount = (Number(this.minutes * 60)) + Number(this.seconds)
      this.editStartTime = false
      this.stopTimer()
    }
  }
}

function timerData(): MeditationTimer {
  return {
    secondsCount: this.$persist(defaultSeconds),
    timerId: null,
    formatSeconds() {
      const minutes = String(Math.floor(this.secondsCount / 60)).padStart(2, '0')
      const remainingseconds = `${this.secondsCount % 60}`.padStart(2, '0')

      return `${minutes}:${remainingseconds}`
    },
    minuteChime(count) {
      if (count === defaultSeconds) return

      if (count % 60 === 0) {
        bowlSound.play()
      }
    },
    startTimer() {
      this.timerId = setInterval(() => (this.secondsCount -= 1), 1000)
    },
    stopTimer(reset = false) {
      if (this.timerId) clearInterval(this.timerId)
      this.timerId = null

      if (reset) this.secondsCount = defaultSeconds
    }
  }
}

export default timerData
