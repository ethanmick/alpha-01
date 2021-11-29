import { Header } from 'components'
import { useGame } from 'game'

const Inventory = () => {
  const { state } = useGame()

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
      <Inventory />
    </>
  )
}
