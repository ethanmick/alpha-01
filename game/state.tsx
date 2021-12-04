import { Activity } from './activity'
import { Inventory } from './item'
import { Tile } from './tile'

export interface Farm {
  tiles: Tile[][]
}

export interface GameState {
  money: number
  farm: Farm
  inventory: Inventory
  activities: Activity[]
}

export interface Game {
  lastTick: number
  tickLength: number
  state: GameState
}
