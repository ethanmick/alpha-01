import { isPlant } from 'game'
import { Plant } from './plant'
import { ResourceItem, ResourceType } from './resource'
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
    if (this.timeElapsed === 0) {
      this.onStart(state)
    }
    this.timeElapsed += delta
    if (this.isFinished) {
      this.onFinish(state)
    }
  }

  public onStart(state: GameState) {}

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

interface ActivityPlantReq {
  seed: Seed
  amount: number
}

export class ActivityPlant extends TileActivity {
  public planting: number

  constructor(actor: any, tile: Tile, private reqs: ActivityPlantReq) {
    super(
      `Planting ${reqs.seed.name}`,
      actor,
      reqs.seed.timeToPlant * reqs.amount,
      tile
    )
  }

  onStart(state: GameState) {
    const stack = state.inventory.findByKey(this.reqs.seed.key)
    if (!stack) {
      throw new Error('No seed in inventory')
    }
    this.planting = stack.use(this.reqs.amount)
  }

  onFinish(state: GameState) {
    for (let i = 0; i < this.planting; i++) {
      const tile = this.tile(state)
      tile.plant(this.reqs.seed.clone(tile))
    }
  }
}

export class HarvestActivity extends TileActivity {
  constructor(actor: any, tile: Tile) {
    super(`Harvesting`, actor, 5 * 1000, tile)
  }

  onFinish(state: GameState) {
    const tile = this.tile(state)
    for (let i = 0; i < tile.plots.length; i++) {
      const p = isPlant(tile.plots[i]) && (tile.plots[i] as Plant)
      if (p && p.isGrown) {
        p.activeHarvest(state)
      }
      tile.plots[i] = null
    }
  }
}

export class ChopWoodActivity extends TileActivity {
  constructor(actor: any, tile: Tile) {
    super(`Chopping Wood`, actor, 10 * 1000, tile)
  }

  onFinish(state: GameState) {
    const amount = 1
    const tile = this.tile(state)
    const mined = tile.mine(ResourceType.Wood, amount)
    state.inventory.add(ResourceItem[ResourceType.Wood], mined)
  }
}

export class MineStoneActivity extends TileActivity {
  constructor(actor: any, tile: Tile) {
    super(`Mine Stone`, actor, 10 * 1000, tile)
  }

  onFinish(state: GameState) {
    const amount = 1
    const tile = this.tile(state)
    const mined = tile.mine(ResourceType.Stone, amount)
    state.inventory.add(ResourceItem[ResourceType.Stone], mined)
  }
}
