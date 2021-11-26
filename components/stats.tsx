import Image from 'next/image'

interface Props {
  money: number
}

export const Stats = ({ money }: Props) => {
  return (
    <div className="border-b">
      <div className="p-2">
        <div className="flex items-center">
          <Image src="/gold.png" width={24} height={24} priority />
          <span className="ml-2">{money}</span>
        </div>
      </div>
    </div>
  )
}
