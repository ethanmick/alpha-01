import { GameState, Tile, useEngine, UserUpdate } from 'game'

interface TileProps {
  i: number
  tile: Tile
  update: UserUpdate
}

const Tile = ({ tile, i, update }: TileProps) => {
  return (
    <div className="bg-green-500 w-16 h-16">
      {!tile.seed && (
        <button
          onClick={() => {
            update((state) => {
              state.farm.tiles[i].seed = {
                name: 'Wheat',
                cost: 10,
                growingTime: 30 * 1000,
                time: 0
              }
            })
          }}
        >
          Plant Wheat
        </button>
      )}
      {tile.seed && tile.seed.time < tile.seed.growingTime && (
        <div>
          {tile.seed.name} -{' '}
          {Math.round((tile.seed.growingTime - tile.seed.time) / 1000)}{' '}
        </div>
      )}
      {tile.seed && tile.seed.time >= tile.seed.growingTime && (
        <button
          onClick={() => {
            update((state: GameState) => {
              state.farm.tiles[i].seed = null
              state.money += tile.seed.cost * 2
            })
          }}
        >
          HARVEST
        </button>
      )}
    </div>
  )
}

export default function Home() {
  const { state, update } = useEngine()
  return (
    <>
      <div>Magnolia Farm</div>
      <div>Money: {state.money}</div>
      <div className="bg-green-100  grid gap-2 grid-cols-4">
        {state.farm.tiles.map((tile, i) => (
          <Tile key={i} i={i} tile={tile} update={update} />
        ))}
      </div>
    </>
  )
}
