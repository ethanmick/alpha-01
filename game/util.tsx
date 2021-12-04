import { Item, Plot } from 'game'
import { Plant } from './plant'
import { Resource } from './resource'
import { Seed } from './seed'

export const isSeed = (p: Plot | Item): p is Seed => {
  return p instanceof Seed
}

export const isPlant = (p: Plot | Item): p is Plant => {
  return p instanceof Plant
}

export const isResource = (plot: Plot): plot is Resource => {
  return plot instanceof Resource
}
