import { isPlant } from 'game'
import { Plant } from './plant'
import { Seed } from './seed'
import { GameState } from './state'
import { Tile } from './tile'

export abstract class Activity {
  constructor(
    readonly name: string,
    readonly actor: any,
    public time: number
  ) {}

  public get isFinished(): boolean {
    return this.time <= 0
  }

  public abstract update(state: GameState, delta: number): void
}

export class ActivityPlant extends Activity {
  constructor(
    actor: any,
    readonly tile: Tile,
    readonly seed: Seed,
    public amount: number
  ) {
    super('Plant', actor, seed.timeToPlant)
  }

  public update(state: GameState, delta: number) {
    console.log('Planting...', this.seed, this.time)
    this.time -= delta
    if (this.isFinished) {
      state.farm.tiles[this.tile.x][this.tile.y].plant(
        this.seed.clone(this.tile)
      )
      this.amount--
      if (this.amount >= 0) {
        this.time = this.seed.timeToPlant
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
    console.log('Harvesting...')
    this.time -= delta
    if (this.isFinished) {
      const tile = state.farm.tiles[this.y][this.x]
      console.log('Tile', tile)
      const plants = tile.plots.filter(
        (p) => isPlant(p) && p.isGrown
      ) as Plant[]
      console.log('harvest plants', plants)
      plants.forEach((p) => {
        p.activeHarvest(state)
      })
      state.farm.tiles[this.y][this.x].plots = tile.plots.filter(
        (p) => isPlant(p) && !p.isGrown
      )
    }
  }
}
