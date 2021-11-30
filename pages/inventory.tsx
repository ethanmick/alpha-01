import { Header, Stats } from 'components'
import { useGame } from 'game'

const Inventory = () => {
  const { state } = useGame()
  if (!state) {
    return null
  }

  return (
    <ul>
      {state.inventory.stacks.map(({ item, count }, i) => (
        <li key={i}>
          {item.name} - {count}
        </li>
      ))}
    </ul>
  )
}

export default function InventoryPage() {
  return (
    <>
      <Header name="Inventory" back="/" />
      <Stats />
      <Inventory />
    </>
  )
}
