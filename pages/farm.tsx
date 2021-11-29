import { ActivityBar, FarmTile, Header } from 'components'
import { useGame } from 'game'

const Plots = () => {
  const { state } = useGame()

  return (
    <div
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
  )
}

export default function FarmPage() {
  const { state } = useGame()
  if (!state) {
    return null
  }
  return (
    <>
      <Header name="Farm" back="/" />
      <ActivityBar />
      <Plots />
    </>
  )
}
