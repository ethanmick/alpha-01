import { ActivityBar, Header } from 'components'
import {
  ActivityPlant,
  GameState,
  HarvestActivity,
  isPlant,
  isSeed,
  Tile,
  TileType,
  useGame
} from 'game'
import { useParams } from 'hooks'
import Image from 'next/image'
import React, { useState } from 'react'

interface Params {
  x: number
  y: number
}

const Descriptions = {
  [TileType.BasicDirt]: 'Loamy soil ideal for planting crops.'
}

interface PlotBadgeProps {
  used: number
  total: number
}
const PlotBadge = ({ used, total }: PlotBadgeProps) => (
  <div className="absolute left-4 -bottom-8 h-16 w-16 rounded-full bg-red-900 text-white font-bold text-xl flex justify-center items-center shadow">
    {used} / {total}
  </div>
)

type SelectSeedProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  inventory: GameState['inventory']
}

const SelectSeed = ({ inventory, value, onChange }: SelectSeedProps) => {
  return (
    <select
      className="p-1 border rounded m-2"
      value={value}
      onChange={onChange}
    >
      <option disabled hidden value="">
        Select seed to plant
      </option>
      {inventory.stacks
        .filter(({ item, count }) => isSeed(item) && count > 0)
        .map(({ item, count }, i) => (
          <option value={item.id} key={i}>
            {item.name} ({count})
          </option>
        ))}
    </select>
  )
}

interface BasicDirtProps {
  tile: Tile
}

const BasicDirt = ({ tile }: BasicDirtProps) => {
  const { state, update } = useGame()
  const [seed, setSeed] = useState('')

  const canPlant = tile.plots.length != tile.capacity
  const canHarvest =
    tile.plots.filter((plot) => isPlant(plot) && plot.isGrown).length > 0

  const plant = () => {
    update((state: GameState) => {
      const stack = state.inventory.findById(seed)
      console.log(stack, seed)
      if (!stack) {
        return
      }
      const used = stack.use(tile.capacity)
      // TODO: fix types
      state.activities.push(
        new ActivityPlant(null, tile, stack.item as any, used)
      )
      // stack.count -= 1
      // const foundSeed = Seeds.find(({ name }) => name === stack.item.name)
      // state.farm.tiles[tile.y][tile.x].seed = { ...clone(foundSeed), time: 0 }
    })
  }

  const harvest = () => {
    update((state: GameState) => {
      state.activities.push(new HarvestActivity(null, tile))
    })
  }

  return (
    <>
      <div className="relative bg-gradient-to-t from-gray-300 flex justify-center items-center">
        <div className="py-8">
          <Image src="/dirt.png" priority width={128} height={128} />
        </div>
        <PlotBadge used={tile.plots.length} total={tile.capacity} />
      </div>
      <p className="text-center italic py-1 text-xs text-gray-500">
        {Descriptions[tile.type]}
      </p>
      <h2 className="text-xl px-2">Planted</h2>
      <ul className="divide-y">
        {tile.plots.map((plot, i) => (
          <li key={i} className="px-2 py-4 flex items-center">
            <Image src="/wheat.png" priority width={24} height={24} />
            <span className="ml-2">
              {plot.name} {(plot as any).time || ''}
            </span>
          </li>
        ))}
      </ul>
      {canPlant && (
        <>
          <SelectSeed
            inventory={state.inventory}
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
          />
          <button onClick={plant}>Plant</button>
        </>
      )}
      {canHarvest && (
        <button
          className="w-full p-4 text-center text-white font-bold bg-green-500"
          onClick={harvest}
        >
          Harvest
        </button>
      )}
    </>
  )
}

export default function TilePage() {
  const { state } = useGame()
  const { x, y } = useParams<Params>()
  if (!state || !x || !y) return null

  const tile = state.farm.tiles[y][x]
  if (!tile) {
    return <div>Tile not found</div>
  }
  return (
    <>
      <Header name="Farm" back="/farm" />
      <ActivityBar />
      <BasicDirt tile={tile} />
    </>
  )
}
