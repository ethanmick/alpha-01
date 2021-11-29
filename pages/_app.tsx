import {
  Game,
  GameContext,
  GameState,
  Inventory,
  ItemStack,
  tiles,
  useEngine,
  WheatSeed
} from 'game'
import { useEffect } from 'react'
import '../styles/index.css'

const state: GameState = {
  money: 100,
  farm: {
    tiles
  },
  inventory: new Inventory([new ItemStack(new WheatSeed(-1, -1), 8)]),
  activities: []
}

const initial: Game = {
  lastTick: new Date().getTime(),
  tickLength: 1000,
  state
}

const start = (): Game => {
  try {
    const s = null // JSON.parse(localStorage.getItem('game'))
    if (!s) {
      return initial
    }
    return s
  } catch {
    return initial
  }
}

function MyApp({ Component, pageProps }) {
  const { state, update, load } = useEngine()
  useEffect(() => {
    load(start())
  }, [])
  return (
    <GameContext.Provider value={{ state, update }}>
      <Component {...pageProps} />
    </GameContext.Provider>
  )
}

export default MyApp
