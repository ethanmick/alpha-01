import { GameState } from './state'

export function update(state: GameState, delta: number): GameState {
  for (const row of state.farm.tiles) {
    for (const tile of row) {
      tile.update(state, delta)
    }
  }

  // Iterate in reverse so that we can remove items from the array
  let i = state.activities.length
  while (i--) {
    const activity = state.activities[i]
    activity.update(state, delta)
    if (activity.isFinished) {
      state.activities.splice(i, 1)
    }
  }

  return state
}
