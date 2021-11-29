import { ActivityBar } from 'components'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div>
      <ActivityBar />

      <Link href="/farm">
        <a className="block">Farm</a>
      </Link>
      <Link href="/inventory">
        <a className="block">Inventory</a>
      </Link>
      <Link href="/market">
        <a className="block">Market</a>
      </Link>
    </div>
  )
}
