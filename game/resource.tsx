import { GameState } from 'game'
import { Item } from './item'
import { BasicRockItem, TimberLogItem } from './items'

export enum ResourceType {
  Wood,
  Stone
}

export const ResourceItem: { [key in ResourceType]: Item } = {
  [ResourceType.Wood]: new TimberLogItem(),
  [ResourceType.Stone]: new BasicRockItem()
}

const ResourceNames: { [key in ResourceType]: string } = {
  [ResourceType.Wood]: 'Wood',
  [ResourceType.Stone]: 'Stone'
}

export class Resource {
  public name: string
  constructor(public key: ResourceType, public amount: number) {
    this.name = ResourceNames[key]
  }

  mine(amount: number): number {
    if (this.amount < amount) {
      amount = this.amount
      this.amount = 0
    } else {
      this.amount -= amount
    }
    return amount
  }

  public update(state: GameState, delta: number): void {}
}
