import { Header, Stats } from 'components'
import { GameState, ItemType, Seeds, Tile, useGame } from 'game'
import Link from 'next/link'
import { clone } from 'ramda'
import { useState } from 'react'

interface TileProps {
  i: number
  tile: Tile
  plant: (i: number) => void
  harvest: (i: number) => void
}

const Tile = ({ tile, i, plant, harvest }: TileProps) => {
  if (!tile.seed) {
    return (
      <button
        className="border rounded h-24 flex justify-center items-center"
        onClick={() => plant(i)}
      >
        Plant
      </button>
    )
  }

  if (tile.seed && tile.seed.time < tile.seed.growingTime) {
    return (
      <div className="border rounded h-24 text-center">
        <div>{tile.seed.name}</div>
        <div>{Math.round((tile.seed.growingTime - tile.seed.time) / 1000)}</div>
      </div>
    )
  }

  return (
    <button
      className="border rounded h-24 flex justify-center items-center"
      onClick={() => harvest(i)}
    >
      Harvest {tile.seed.name}
    </button>
  )
}

const Plots = () => {
  const [seed, setSeed] = useState<string>('')
  const { state, update } = useGame()

  const plant = (i: number) => {
    update((state: GameState) => {
      const stack = state.inventory.find(
        ({ item }) => item.name === seed && item.type === ItemType.Seed
      )
      if (!stack) {
        return
      }
      stack.count -= 1
      const foundSeed = Seeds.find(({ name }) => name === stack.item.name)
      state.farm.tiles[i].seed = { ...clone(foundSeed), time: 0 }
    })
  }

  const harvest = (i: number) => {
    update((state: GameState) => {
      let stack = state.inventory.find(
        ({ item }) =>
          item.name === state.farm.tiles[i].seed.name &&
          item.type === ItemType.Plant
      )
      if (!stack) {
        stack = {
          item: {
            name: state.farm.tiles[i].seed.name,
            type: ItemType.Plant,
            value: state.farm.tiles[i].seed.value
          },
          count: 0
        }
        state.inventory.push(stack)
      }
      stack.count += 1
      state.farm.tiles[i].seed = null
    })
  }

  return (
    <>
      <select
        className="border rounded m-2"
        value={seed}
        onChange={(e) => {
          setSeed(e.target.value)
        }}
      >
        <option value="">Select Seed</option>
        {state.inventory
          .filter(
            (stack) => stack.item.type === ItemType.Seed && stack.count > 0
          )
          .map(({ item, count }, i) => (
            <option value={item.name} key={i}>
              {item.name} ({count})
            </option>
          ))}
      </select>
      <div
        className="grid gap-2 grid-cols-4 p-2"
        style={{
          backgroundColor: '#936D4E'
        }}
      >
        {state.farm.tiles.map((tile, i) => (
          <Tile key={i} i={i} tile={tile} plant={plant} harvest={harvest} />
        ))}
      </div>
    </>
  )
}

const ChevronRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
)

export default function Farm() {
  const { state } = useGame()
  return (
    <>
      <Header name="Farm" />
      <Stats money={state.money} />
      <Plots />
      <div className="p-2 border-b border-t mt-4">
        <Link href="/store">
          <a className="text-blue-500 font-bold flex justify-between">
            <span>Store</span>
            <ChevronRight />
          </a>
        </Link>
      </div>
    </>
  )
}
