import { Header, Stats } from 'components'
import {
  EngineState,
  GameState,
  Item,
  ItemType,
  Seed,
  Seeds,
  useGame
} from 'game'
import Link from 'next/link'

const ChevronLeft = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 mr-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 19l-7-7 7-7"
    />
  </svg>
)

const Store = ({ update }) => {
  const buy = (seed: Seed) => {
    update((state: GameState) => {
      if (seed.cost > state.money) {
        return
      }
      let stack = state.inventory.find((stack) => stack.item.name === seed.name)
      if (!stack) {
        stack = {
          item: {
            name: seed.name,
            type: ItemType.Seed,
            value: seed.value
          },
          count: 0
        }
        state.inventory.push(stack)
      }
      stack.count += 1
      state.money -= seed.cost
    })
  }

  return (
    <ul className="divide-y">
      {Seeds.map((seed) => (
        <li
          key={seed.name}
          className="p-4 flex justify-between"
          onClick={() => buy(seed)}
        >
          <div>{seed.name}</div>
          <div>{seed.cost}</div>
        </li>
      ))}
    </ul>
  )
}

const Inventory = ({ state, update }: EngineState) => {
  const sell = (item: Item) => {
    update((state: GameState) => {
      const stack = state.inventory.find(
        (stack) =>
          stack.item.name === item.name && stack.item.type === ItemType.Plant
      )
      if (stack.count === 0) {
        return
      }
      stack.count -= 1
      state.money += item.value
    })
  }

  return (
    <ul className="divide-y">
      {state.inventory
        .filter(({ item, count }) => item.type === ItemType.Plant && count > 0)
        .map(({ item, count }) => (
          <li
            key={item.name}
            className="p-4 flex justify-between"
            onClick={() => sell(item)}
          >
            <span>
              {item.name} - ({count})
            </span>
            <span>{item.value}</span>
          </li>
        ))}
    </ul>
  )
}

export default function StorePage() {
  const { state, update } = useGame()
  return (
    <>
      <Header name="Store" />
      <div className="p-2 border-b">
        <Link href="/">
          <a className="text-blue-500 font-bold flex">
            <ChevronLeft /> Back to Farm
          </a>
        </Link>
      </div>
      <Stats money={state.money} />
      <div className="text-center font-bold py-2 border-b">Store</div>
      <Store update={update} />
      <div className="text-center font-bold py-2 border-b">Your Inventory</div>
      <Inventory state={state} update={update} />
    </>
  )
}
