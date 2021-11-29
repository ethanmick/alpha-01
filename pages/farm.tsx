import { FarmTile, Header } from 'components'
import { isSeed, useGame } from 'game'
import { useState } from 'react'

const Plots = () => {
  const { state, update } = useGame()
  // const defaultSeed =
  //   state.inventory.find(
  //     (stack) => stack.item.type === ItemType.Seed && stack.count > 0
  //   )?.item.name ?? ''
  const [seed, setSeed] = useState<string>('')

  /*
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

      if (stack.count === 0) {
        const newSeed =
          state.inventory.find(
            (stack) => stack.item.type === ItemType.Seed && stack.count > 0
          )?.item.name ?? ''
        setSeed(newSeed)
      }
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
  */

  return (
    <>
      <select
        className="p-1 border rounded m-2"
        value={seed}
        onChange={(e) => {
          setSeed(e.target.value)
        }}
      >
        <option value="">Choose seeds to plant</option>
        {state.inventory.stacks
          .filter(({ item, count }) => isSeed(item) && count > 0)
          .map(({ item, count }, i) => (
            <option value={item.name} key={i}>
              {item.name} ({count})
            </option>
          ))}
      </select>
      <div
        className={``}
        style={{
          backgroundColor: '#936D4E'
        }}
      >
        {state.farm.tiles.map((row, i) => (
          <div key={i} className="grid grid-cols-8">
            {row.map((tile, j) => (
              <FarmTile key={j} tile={tile} />
            ))}
          </div>
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

export default function FarmPage() {
  const { state } = useGame()
  if (!state) {
    return null
  }
  return (
    <>
      <Header name="Farm" back="/" />
      <Plots />
    </>
  )
}

/**

      <div className="p-2 border-b border-t mt-4">
        <Link href="/store">
          <a className="text-blue-500 font-bold flex justify-between">
            <span>Store</span>
            <ChevronRight />
          </a>
        </Link>
      </div>
 * 
 */
