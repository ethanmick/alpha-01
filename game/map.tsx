import { Tile, TileType } from './tile'

export const tiles: Tile[][] = [
  [
    new Tile(TileType.BasicDirt, 0, 0),
    new Tile(TileType.RockStone, 1, 0),
    new Tile(TileType.TreesBasic, 2, 0),
    new Tile(TileType.Water, 3, 0),
    new Tile(TileType.WoodLog, 4, 0)
  ]
]
