import { Header, Stats } from 'components'
import { GameState, Item, useGame, UserUpdate, WheatSeed } from 'game'

const Items = [new WheatSeed(-1, -1)]

const Store = ({ update }) => {
  const buy = (item: Item) => {
    update((state: GameState) => {
      if (item.cost > state.money) {
        return
      }
      state.inventory.add(item)
      state.money -= item.cost
    })
  }

  return (
    <ul className="divide-y">
      {Items.map((item) => (
        <li
          key={item.name}
          className="p-4 flex justify-between"
          onClick={() => buy(item)}
        >
          <div>{item.name}</div>
          <div>{item.cost}</div>
        </li>
      ))}
    </ul>
  )
}

interface InventorySectionProps {
  state: GameState
  update: UserUpdate
}

const InventorySection = ({ state, update }: InventorySectionProps) => {
  const sell = (item: Item) => {
    update((state: GameState) => {
      const stack = state.inventory.stacks.find(
        (stack) => stack.item.name === item.name && stack.count > 0
      )
      if (!stack) {
        return
      }
      stack.count -= 1
      state.money += stack.item.value
    })
  }

  return (
    <ul className="divide-y">
      {state.inventory.stacks
        .filter(({ count }) => count > 0)
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

export default function MarketPage() {
  const { state, update } = useGame()
  if (!state) {
    return null
  }
  return (
    <>
      <Header name="Store" back="/" />
      <Stats money={state.money} />
      <div className="text-center font-bold py-2 border-b">Market</div>
      <Store update={update} />
      <div className="text-center font-bold py-2 border-b">Your Inventory</div>
      <InventorySection state={state} update={update} />
    </>
  )
}
