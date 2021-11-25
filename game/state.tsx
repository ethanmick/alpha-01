export interface Plant {
  name: string
  value: number
}

export interface Seed {
  name: string
  cost: number
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
  tick: number
  money: number
  farm: Farm
}
