import { Resource, ResourceType } from './resource'
import { Tile, TileType } from './tile'

const logs = new Tile(TileType.WoodLog, 4, 0)
logs.plots = logs.plots.map(() => new Resource(ResourceType.Wood, 2))

const stone = new Tile(TileType.RockStone, 1, 0)
stone.plots = stone.plots.map(() => new Resource(ResourceType.Stone, 2))

export const tiles: Tile[][] = [
  [
    new Tile(TileType.BasicDirt, 0, 0),
    stone,
    new Tile(TileType.TreesBasic, 2, 0),
    new Tile(TileType.Water, 3, 0),
    logs
  ]
]
