import { isPlant } from 'game'
import { Plant } from './plant'
import { Seed } from './seed'
import { GameState } from './state'
import { Tile } from './tile'

export abstract class Activity {
  public timeElapsed: number = 0
  constructor(
    readonly name: string,
    readonly actor: any,
    readonly timeRequired: number
  ) {}

  public get isFinished(): boolean {
    return this.timeElapsed >= this.timeRequired
  }

  public update(state: GameState, delta: number) {
    this.timeElapsed += delta
  }
}

export class ActivityPlant extends Activity {
  constructor(
    actor: any,
    readonly tile: Tile,
    readonly seed: Seed,
    public amount: number
  ) {
    super('Plant', actor, seed.timeToPlant * amount)
  }

  public update(state: GameState, delta: number) {
    super.update(state, delta)
    if (this.isFinished) {
      for (let i = 0; i < this.amount; i++) {
        state.farm.tiles[this.tile.x][this.tile.y].plant(
          this.seed.clone(this.tile)
        )
      }
    }
  }
}

export class HarvestActivity extends Activity {
  private x: number
  private y: number

  constructor(actor: any, tile: Tile) {
    super('Harvest', actor, 5 * 1000)
    this.x = tile.x
    this.y = tile.y
  }

  public update(state: GameState, delta: number): void {
    super.update(state, delta)
    if (this.isFinished) {
      const tile = state.farm.tiles[this.y][this.x]
      const plants = tile.plots.filter(
        (p) => isPlant(p) && p.isGrown
      ) as Plant[]
      plants.forEach((p) => {
        p.activeHarvest(state)
      })
      state.farm.tiles[this.y][this.x].plots = tile.plots.filter(
        (p) => isPlant(p) && !p.isGrown
      )
    }
  }
}
