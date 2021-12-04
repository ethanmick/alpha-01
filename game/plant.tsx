import { Item } from './item'
import { WheatBundleItem } from './items'
import { GameState } from './state'
import { uuid } from './uuid'

export abstract class Plant implements Item {
  public timeGrown: number = 0
  constructor(
    readonly id: string,
    readonly name: string,
    readonly key: string,
    public timeToGrow: number,
    readonly cost: number,
    readonly value: number,
    readonly harvestPassive: number,
    readonly harvestActive: number
  ) {}

  public isGrown(): boolean {
    return this.timeGrown >= this.timeToGrow
  }

  public update(state: GameState, delta: number): void {
    this.timeGrown += delta
  }

  public passiveHarvest(state: GameState): void {}

  public activeHarvest(state: GameState): void {}
}

export class WheatPlant extends Plant {
  constructor() {
    super(uuid(), 'Wheat', 'plant.wheat', 10 * 1000, 8, 4, 1, 2)
  }

  update(state: GameState, delta: number) {
    super.update(state, delta)
  }

  public activeHarvest(state: GameState): void {
    state.inventory.add(new WheatBundleItem())
  }
}
