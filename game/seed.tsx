import { Item } from './item'
import { Plant, WheatPlant } from './plant'
import { GameState } from './state'
import { Tile } from './tile'

export abstract class Seed implements Item {
  public time: number
  constructor(
    readonly id: string,
    readonly name: string,
    readonly cost: number,
    readonly value: number,
    readonly timeToPlant: number,
    readonly timeToGrow: number
  ) {
    this.time = timeToGrow
  }

  public abstract clone(tile: Tile): Seed

  public abstract update(state: GameState, delta: number): void

  abstract grow(): Plant
}

export class WheatSeed extends Seed {
  constructor(readonly x: number, readonly y: number) {
    super('seed.wheat', 'Wheat Seed', 10, 5, 2 * 1000, 10 * 1000)
  }

  public update(state: GameState, delta: number) {
    this.time -= delta
    if (this.time <= 0) {
      const i = state.farm.tiles[this.y][this.x].plots.indexOf(this)
      state.farm.tiles[this.y][this.x].plots.push(this.grow())
      state.farm.tiles[this.y][this.x].plots.splice(i, 1)
    }
  }

  clone(tile: Tile): WheatSeed {
    return new WheatSeed(tile.x, tile.y)
  }

  grow(): WheatPlant {
    return new WheatPlant()
  }
}

// export const Seeds: Seed[] = [
//   new Seed('Wheat', 10, 5, {
//     plant: 5 * 1000,
//     grow: 60 * 1000
//   })
// {
//   id: 'seeds.lentil',
//   name: 'Lentils',
//   type: ItemType.Seed,
//   cost: 20,
//   value: 30,
//   growingTime: 120 * 1000
// },
// {
//   id: 'seed.turnip',
//   name: 'Turnips',
//   type: ItemType.Seed,
//   cost: 40,
//   value: 80,
//   growingTime: 300 * 1000
// },
// {
//   id: 'seed.olives',
//   name: 'Olives',
//   type: ItemType.Seed,
//   cost: 100,
//   value: 150,
//   growingTime: 600 * 1000
// },
// {
//   id: 'seed.grapes',
//   name: 'Grapes',
//   type: ItemType.Seed,
//   cost: 500,
//   value: 1000,
//   growingTime: 3000 * 1000
// }
// ]
