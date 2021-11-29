import { useRouter } from 'next/router'

const INTEGER_PARAMS = ['x', 'y']

export const useParams = <T>(): T => {
  const router = useRouter()
  const params = router.query
  for (const key in INTEGER_PARAMS) {
    if (params[key]) {
      params[key] = parseInt(params[key] as string) as any
    }
  }
  return params as unknown as T
}
