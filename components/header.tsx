interface Props {
  name: string
}

export const Header = ({ name }: Props) => (
  <header className="h-12 relative shadow flex justify-center items-center">
    <h1 className="font-bold text-xl">{name}</h1>
  </header>
)
