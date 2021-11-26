import { clone } from 'ramda'
import { createContext, useContext, useEffect, useState } from 'react'
import { GameState } from './state'
import { update } from './update'

type UserAction = (s: GameState) => void

export type UserUpdate = (fn: UserAction) => void

export interface EngineState {
  state: GameState
  update: (fn: UserAction) => void
}

export const useEngine = (initial: GameState): EngineState => {
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

export const GameContext = createContext<EngineState>(null)
export const useGame = () => useContext(GameContext)
