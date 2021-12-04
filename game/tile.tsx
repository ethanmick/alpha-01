import { GameState, isResource } from 'game'
import { Plant } from './plant'
import { Resource, ResourceType } from './resource'
import { Seed } from './seed'

export enum TileType {
  BasicDirt,
  RockStone,
  WoodLog,
  TreesBasic,
  Water
}

export type Plot = Seed | Plant | Resource

export const OpenPlotsRequiredToPlant = 4

export class Tile {
  plots: Array<Plot> = Array(16).fill(null)
  constructor(public type: TileType, public x: number, public y: number) {}

  plant(seed: Seed) {
    const i = this.plots.findIndex(isPlotOpen)
    if (i > -1) {
      this.plots[i] = seed
    }
  }

  mine(r: ResourceType, amount: number): number {
    const i = this.plots.findIndex((p) => isResource(p) && p.key === r)
    if (i === -1) {
      return 0
    }
    const plot = this.plots[i] as Resource
    const mined = plot.mine(amount)
    if (plot.amount === 0) {
      this.plots[i] = null
    }
    return mined
  }

  update(state: GameState, delta: number) {
    this.plots
      .filter((p) => !isPlotOpen(p))
      .forEach((plot) => {
        plot.update(state, delta)
      })
  }
}

export const isPlotOpen = (p: Plot) => p === null
export const isPlotUsed = (p: Plot) => p !== null
