import { ActivityBar, Header } from 'components'
import { useGame } from 'game'

// Ideas for craftable items:
// sprinkler
// water pump
// water wheel
// plow
// yoke
// harrow
//

const items = [
  {
    id: 'sprinkler',
    name: 'Sprinkler'
  }
]

const CraftTable = () => {
  const { state } = useGame()

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.name}
          <span>Requires: 10 logs</span>
        </li>
      ))}
    </ul>
  )
}

export default function CraftingPage() {
  const { state } = useGame()
  if (!state) {
    return null
  }
  return (
    <>
      <Header name="Crafting" back="/" />
      <ActivityBar />
      <CraftTable />
    </>
  )
}
