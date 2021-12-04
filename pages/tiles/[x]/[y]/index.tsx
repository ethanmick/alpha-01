import { ActivityBar, Header } from 'components'
import {
  ActivityPlant,
  ChopWoodActivity,
  GameState,
  HarvestActivity,
  isPlant,
  isPlotOpen,
  isPlotUsed,
  isResource,
  isSeed,
  MineStoneActivity,
  OpenPlotsRequiredToPlant,
  Resource,
  Seed,
  Tile,
  TileType,
  useGame
} from 'game'
import { ResourceType } from 'game/resource'
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

const Mine = ({ tile }) => {
  const { update } = useGame()
  const resources = tile.plots.filter((p) => isResource(p)) as Resource[]
  const resource = resources[0]

  const names = {
    [ResourceType.Wood]: 'Gather Wood',
    [ResourceType.Stone]: 'Gather Stone'
  }

  const action = {
    [ResourceType.Wood]: new ChopWoodActivity(null, tile),
    [ResourceType.Stone]: new MineStoneActivity(null, tile)
  }

  const onClick = () => {
    update((state) => {
      state.activities.push(action[resource.key])
    })
  }

  return (
    <div>
      <button className="bg-green-500" onClick={onClick}>
        Mine {names[resource.key]}
      </button>
    </div>
  )
}

const Harvest = ({ tile, clear }) => {
  const { update } = useGame()

  const onClick = () => {
    clear()
    update((state: GameState) => {
      state.activities.push(new HarvestActivity(null, tile))
    })
  }

  return (
    <div>
      <button className="bg-green-500" onClick={onClick}>
        Harvest
      </button>
    </div>
  )
}

const Plant = ({ tile, clear }) => {
  const { state, update } = useGame()
  const [itemID, setItemID] = useState('')

  const onClick = () => {
    clear()
    update((state: GameState) => {
      const stack = state.inventory.findById(itemID)
      state.activities.push(
        new ActivityPlant(null, tile, {
          seed: stack.item as Seed,
          amount: 8
        })
      )
    })
  }

  return (
    <div>
      <select
        className="p-1 border rounded m-2"
        value={itemID}
        onChange={(e) => setItemID(e.target.value)}
      >
        <option disabled hidden value="">
          Select seed to plant
        </option>
        {state.inventory.stacks
          .filter(({ item, count }) => isSeed(item) && count > 0)
          .map(({ item, count }, i) => (
            <option value={item.id} key={i}>
              {item.name} ({count})
            </option>
          ))}
      </select>
      <button className="bg-green-500" onClick={onClick}>
        Plant
      </button>
    </div>
  )
}

interface Action {
  label: string
  node: React.ReactNode
}

const actionsForTile = (tile: Tile): Action[] => {
  const actions: Array<Action> = []
  const resources = tile.plots.filter((p) => isResource(p))
  const added: { [key in ResourceType]?: string } = {}

  for (const resource of resources) {
    if (added[resource.key]) continue
    added[resource.key] = true
    actions.push({
      label: `Mine ${resource.name}`,
      node: Mine
    })
  }

  const harvestable = tile.plots.filter((p) => isPlant(p) && p.isGrown)
  if (harvestable.length > 0) {
    actions.push({
      label: `Harvest`,
      node: Harvest
    })
  }

  const openPlots = tile.plots.filter((p) => isPlotOpen(p))
  if (openPlots.length > OpenPlotsRequiredToPlant) {
    actions.push({
      label: `Plant`,
      node: Plant
    })
  }

  return actions
}

interface BasicDirtProps {
  tile: Tile
}

const BasicDirt = ({ tile }: BasicDirtProps) => {
  const actions = actionsForTile(tile)
  const [action, setAction] = useState({ label: '', node: null })
  const { state, update } = useGame()
  const [seed, setSeed] = useState('')

  const clear = () => {
    setAction({ label: '', node: null })
  }

  const Action = action.node || null

  return (
    <>
      <div className="relative bg-gradient-to-t from-gray-300 flex justify-center items-center">
        <div className="py-8">
          <Image src="/dirt.png" priority width={128} height={128} />
        </div>
        <PlotBadge
          used={tile.plots.filter(isPlotUsed).length}
          total={tile.plots.length}
        />
      </div>
      <p className="text-center italic py-1 text-xs text-gray-500">
        {Descriptions[tile.type]}
      </p>
      <h2 className="text-xl px-2">Planted</h2>
      <ul className="divide-y">
        {tile.plots.filter(isPlotUsed).map((plot, i) => (
          <li key={i} className="px-2 py-4 flex items-center">
            <Image src="/wheat.png" priority width={24} height={24} />
            <span className="ml-2">
              {plot.name} {(plot as any).time || ''}
            </span>
          </li>
        ))}
      </ul>
      <select
        value={action.label}
        onChange={(e) =>
          setAction(actions.find((a) => a.label == e.target.value))
        }
      >
        <option disabled hidden value="" />
        {actions.map(({ label }) => (
          <option key={label} value={label}>
            {label}
          </option>
        ))}
      </select>
      {Action && <Action tile={tile} clear={clear} />}
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
