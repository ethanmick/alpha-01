import { useGame } from 'game'
import Image from 'next/image'

export const Stats = () => {
  const { state } = useGame()
  if (!state) {
    return null
  }
  return (
    <div className="border-b">
      <div className="p-2">
        <div className="flex items-center">
          <Image src="/gold.png" width={24} height={24} priority />
          <span className="ml-2">{state.money}</span>
        </div>
      </div>
    </div>
  )
}
