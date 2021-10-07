import { RefObject, useCallback, useEffect, useState } from 'react'

const useWidth = (elementRef: RefObject<HTMLElement | undefined>): number => {
  const [width, setWidth] = useState<number>(0)

  const updateWidth = useCallback(() => {
    const { width } = elementRef.current!.getBoundingClientRect()
    setWidth(width)
  }, [elementRef])

  useEffect(() => updateWidth(), [updateWidth])

  return width
}

export { useWidth }
