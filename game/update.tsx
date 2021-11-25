import { GameState } from './state'

export function update(state: GameState, delta: number): GameState {
  for (const tile of state.farm.tiles) {
    if (tile.seed) {
      tile.seed.time += delta
    }
  }

  return state
}
