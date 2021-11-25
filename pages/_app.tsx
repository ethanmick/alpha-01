import { GameContext, GameState } from 'game'
import 'tailwindcss/tailwind.css'

const initial: GameState = {
  tick: 1000,
  money: 100,
  farm: {
    tiles: Array(8)
      .fill(null)
      .map(() => ({}))
  }
}

function MyApp({ Component, pageProps }) {
  return (
    <GameContext.Provider value={{ ...initial }}>
      <Component {...pageProps} />
    </GameContext.Provider>
  )
}

export default MyApp
