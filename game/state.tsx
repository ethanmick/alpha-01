export enum ItemType {
  Seed,
  Plant
}

export interface Plant {
  name: string
  value: number
}

export interface Item {
  name: string
  type: ItemType
  value?: number
}

export interface ItemStack {
  item: Item
  count: number
}

export interface Seed {
  name: string
  cost: number
  value: number
  growingTime: number
}

interface Growing {
  time: number
}

export interface Tile {
  seed?: Seed & Growing
}

export interface Farm {
  tiles: Tile[]
}

export interface GameState {
  lastUpdate: number
  tick: number
  money: number
  farm: Farm
  inventory: ItemStack[]
}
