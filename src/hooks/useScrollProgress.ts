import { useEffect, useState } from 'react'

interface ScrollProgress {
  value: number
  max: number
}

const useScrollProgress = (): ScrollProgress => {
  const [yOffset, setYOffset] = useState<number>(0)
  const [max, setMax] = useState<number>(0)

  useEffect(() => {
    const handleOffset = () => setYOffset(Math.round(scrollY))
    const handleMax = () =>
      setMax(document.body.offsetHeight - document.documentElement.clientHeight)

    document.addEventListener('scroll', handleOffset, { passive: true })
    document.addEventListener('scroll', handleMax, { passive: true })
    return () => {
      document.removeEventListener('scroll', handleOffset)
      document.removeEventListener('scroll', handleMax)
    }
  }, [])

  return {
    value: yOffset,
    max: max,
  }
}

export { useScrollProgress }
