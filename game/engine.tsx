import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react'
import { Game, GameState } from './state'
import { update } from './update'

const save = (s: Game) => {
  localStorage.setItem('game', JSON.stringify(s))
}

type UserAction = (s: GameState) => void

export type UserUpdate = (fn: UserAction) => void

export interface EngineState {
  state: GameState
  update: UserUpdate
  load: Dispatch<SetStateAction<Game>>
}

export const useEngine = (): EngineState => {
  const [state, setState] = useState<Game>(null)

  useEffect(() => {
    if (!state?.tickLength) {
      return
    }
    const interval = setInterval(() => {
      setState((state) => {
        const now = new Date()
        const elapsed = now.getTime() - state.lastTick
        const updated = {
          ...state,
          state: update(state.state, elapsed),
          lastTick: now.getTime()
        }
        save(updated)
        return updated
      })
    }, state?.tickLength)

    return () => clearInterval(interval)
  }, [state?.tickLength])

  const action = (fn: UserAction) => {
    fn(state.state)
    setState({ ...state })
    save(state)
  }

  return {
    state: state?.state,
    update: (fn: UserAction) => action(fn),
    load: setState
  }
}

export const GameContext = createContext<Partial<EngineState>>(null)
export const useGame = () => useContext(GameContext)
