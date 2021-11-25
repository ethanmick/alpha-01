import { clone } from 'ramda'
import { createContext, useContext, useEffect, useState } from 'react'
import { GameState } from './state'
import { update } from './update'

type UserAction = (s: GameState) => void

export type UserUpdate = (fn: UserAction) => void

export const GameContext = createContext<GameState>(null)
export const useGame = () => useContext(GameContext)

interface EngineState {
  state: GameState
  update: (fn: UserAction) => void
}

export const useEngine = (): EngineState => {
  const initial = useGame()
  const [state, setState] = useState<GameState>(initial)

  useEffect(() => {
    const interval = setInterval(() => {
      setState((state) => clone(update(state, initial.tick)))
    }, initial.tick)

    return () => clearInterval(interval)
  }, [])

  const action = (fn: UserAction) => {
    const cloned = clone(state)
    fn(cloned)
    setState(cloned)
  }

  return {
    state,
    update: (fn: UserAction) => action(fn)
  }
}
