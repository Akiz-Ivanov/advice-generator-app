import { useState } from "react"
import dice from "./assets/images/icon-dice.svg"
import dividerDesktop from "./assets/images/pattern-divider-desktop.svg"
import dividerMobile from "./assets/images/pattern-divider-mobile.svg"
import ClipLoader from "react-spinners/ClipLoader"

const App = () => {

  const [advice, setAdvice] = useState<string>('')
  const [adviceId, setAdviceId] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  const fetchAdvice = async () => {
    try {
      setLoading(true)
      const response = await fetch(`https://api.adviceslip.com/advice?timestamp=${Date.now()}`)
      const data = await response.json()
      setAdvice(data.slip.advice)
      setAdviceId(data.slip.id)
    } catch (error) {
      console.error('Failed to fetch advice:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="p-4">
      <div className="bg-blue-900 px-4 py-14 sm:p-14 rounded-2xl text-center gap-9 flex flex-col relative max-w-xl shadow-2xl shadow-black/20">
        <h1 className="text-green-300 tracking-[0.3em] text-sm leading-0">
          {adviceId > 0 ? `ADVICE #${adviceId}` : 'ADVICE'}
        </h1>
        <p className="text-blue-200">
          {advice ?
            <q>{advice}</q> :
            "Roll the dice for random advice"
          }
        </p>
        <picture>
          <source media="(min-width: 768px)" srcSet={dividerDesktop} />
          <img src={dividerMobile} alt="divider" className="mx-auto mb-6" />
        </picture>
        <button
          type="button"
          onClick={fetchAdvice}
          disabled={loading}
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-green-300 size-16 rounded-full cursor-pointer
        hover:shadow-[0_0_40px_hsl(150,100%,66%)] transition-shadow duration-300 flex justify-center items-center
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
        >
          {loading ?
            <ClipLoader size={24} /> :
            <img src={dice} alt="dice" />
          }
        </button>
      </div>
    </main>
  )
}

export default App