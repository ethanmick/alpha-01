import { Tile, TileType } from 'game'
import Link from 'next/link'

interface SubTileProps {
  children?: React.ReactNode
  className?: string
  x: number
  y: number
}

const Dirt = ({ x, y }: SubTileProps) => (
  <Link
    href={{
      pathname: '/tiles/[x]/[y]',
      query: {
        x,
        y
      }
    }}
  >
    <a className="text-xs col-span-1 border h-12 flex justify-center items-center">
      Soil
    </a>
  </Link>
)

const WoodLog = ({ x, y }: SubTileProps) => (
  <Link
    href={{
      pathname: '/tiles/[x]/[y]',
      query: {
        x,
        y
      }
    }}
  >
    <a
      className="text-xs col-span-1 border h-12 flex justify-center items-center"
      style={{ backgroundColor: 'brown' }}
    >
      Logs
    </a>
  </Link>
)

const RockStone = ({ x, y }: SubTileProps) => (
  <Link
    href={{
      pathname: '/tiles/[x]/[y]',
      query: {
        x,
        y
      }
    }}
  >
    <a
      className="text-xs col-span-1 border h-12 flex justify-center items-center"
      style={{ backgroundColor: '#8a8a8a' }}
    >
      Stone
    </a>
  </Link>
)

const TreeBasic = ({ x, y }: SubTileProps) => (
  <Link
    href={{
      pathname: '/tiles/[x]/[y]',
      query: {
        x,
        y
      }
    }}
  >
    <a
      className="text-xs col-span-1 border h-12 flex justify-center items-center"
      style={{ backgroundColor: 'green' }}
    >
      Forest
    </a>
  </Link>
)

const Water = ({ x, y }: SubTileProps) => (
  <Link
    href={{
      pathname: '/tiles/[x]/[y]',
      query: {
        x,
        y
      }
    }}
  >
    <a className="text-xs col-span-1 border h-12 flex justify-center items-center bg-blue-200">
      Water
    </a>
  </Link>
)

const TypeToTile = {
  [TileType.BasicDirt]: Dirt,
  [TileType.RockStone]: RockStone,
  [TileType.TreesBasic]: TreeBasic,
  [TileType.Water]: Water,
  [TileType.WoodLog]: WoodLog
}

interface TileProps {
  tile: Tile
}

export const FarmTile = ({ tile }: TileProps) => {
  if (TypeToTile[tile.type]) {
    const Component = TypeToTile[tile.type]
    return <Component {...tile} />
  }

  /*
  if (tile.seed && tile.seed.time < tile.seed.growingTime) {
    return (
      <div className="border rounded h-12 flex items-center justify-center">
        <div className="text-center">
          <div className="font-bold text-green-200">{tile.seed.name}</div>
          <div className="text-xs text-gray-100">
            {Math.round((tile.seed.growingTime - tile.seed.time) / 1000)}
          </div>
        </div>
      </div>
    )
  }

  return (
    <button
      className="border rounded h-12 flex justify-center items-center"
      onClick={() => harvest(i)}
    >
      <div>
        <div className="font-bold text-green-200">{tile.seed.name}</div>
        <div>Harvest</div>
      </div>
    </button>
  )
  */
}
