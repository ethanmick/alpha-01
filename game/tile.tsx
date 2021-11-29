import { GameState } from 'game'
import { Plant } from './plant'
import { Seed } from './seed'

export enum TileType {
  BasicDirt,
  RockStone,
  WoodLog,
  TreesBasic,
  Water
}

export class Tile {
  plots: Array<Seed | Plant> = []
  public capacity: number = 4
  constructor(public type: TileType, public x: number, public y: number) {}

  plant(seed: Seed) {
    if (this.plots.length < this.capacity) {
      this.plots.push(seed)
    }
  }

  update(state: GameState, delta: number) {
    this.plots.forEach((plot) => {
      plot.update(state, delta)
    })
  }
}
