import { GameContext, GameState, ItemType, Seeds, useEngine } from 'game'
import 'tailwindcss/tailwind.css'

const initial: GameState = {
  tick: 1000,
  money: 100,
  farm: {
    tiles: Array(8)
      .fill(null)
      .map(() => ({}))
  },
  inventory: [
    {
      item: {
        name: Seeds[0].name,
        type: ItemType.Seed,
        value: Seeds[0].value
      },
      count: 8
    }
  ]
}

function MyApp({ Component, pageProps }) {
  const { state, update } = useEngine(initial)
  return (
    <GameContext.Provider value={{ state, update }}>
      <Component {...pageProps} />
    </GameContext.Provider>
  )
}

export default MyApp
