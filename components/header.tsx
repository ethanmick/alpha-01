import Link from 'next/link'
import { UrlObject } from 'url'
import { ChevronLeft } from './icons'

interface Props {
  name: string
  back?: string | UrlObject
}

export const Header = ({ name, back }: Props) => (
  <header className="h-12 relative shadow flex justify-center items-center">
    {back && (
      <Link href={back}>
        <a className="absolute left-1 text-blue-500 font-bold flex items-center">
          <ChevronLeft />
          Back
        </a>
      </Link>
    )}
    <h1 className="font-bold text-xl">{name}</h1>
  </header>
)
