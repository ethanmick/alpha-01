import { Item } from './item'
import { Plant } from './plant'
import { Seed } from './seed'

export const isSeed = (item: Item): item is Seed => {
  return item instanceof Seed
}

export const isPlant = (item: Item): item is Plant => {
  return item instanceof Plant
}
