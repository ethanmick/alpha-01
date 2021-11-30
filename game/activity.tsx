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
    if (this.isFinished) {
      this.onFinish(state)
    }
  }

  public onFinish(state: GameState) {}
}

export abstract class TileActivity extends Activity {
  readonly x: number
  readonly y: number
  constructor(name: string, actor: any, timeRequired: number, tile: Tile) {
    super(name, actor, timeRequired)
    this.x = tile.x
    this.y = tile.y
  }

  public tile(state: GameState): Tile {
    return state.farm.tiles[this.y][this.x]
  }
}

export class ActivityPlant extends TileActivity {
  constructor(
    actor: any,
    tile: Tile,
    readonly seed: Seed,
    public amount: number
  ) {
    super(`Planting ${seed.name}`, actor, seed.timeToPlant * amount, tile)
  }

  onFinish(state: GameState) {
    for (let i = 0; i < this.amount; i++) {
      const tile = this.tile(state)
      tile.plant(this.seed.clone(tile))
    }
  }
}

export class HarvestActivity extends TileActivity {
  constructor(actor: any, tile: Tile) {
    super(`Harvesting`, actor, 5 * 1000, tile)
  }

  onFinish(state: GameState) {
    const tile = this.tile(state)
    const plants = tile.plots.filter((p) => isPlant(p) && p.isGrown) as Plant[]
    plants.forEach((p) => {
      p.activeHarvest(state)
    })
    tile.plots = tile.plots.filter((p) => isPlant(p) && !p.isGrown)
  }
}
