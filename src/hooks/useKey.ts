import { useCallback, useEffect, useRef } from 'react'

interface UseKeyOptions {
  listen?: boolean
  eventType?: 'keydown' | 'keypress' | 'keyup'
}

const useKey = (
  input: string | number,
  cb: (e: KeyboardEvent) => any,
  options: UseKeyOptions = {
    listen: true,
    eventType: 'keydown',
  }
): void => {
  const { listen, eventType } = options
  const cbRef = useRef<(e: KeyboardEvent) => any>(cb)
  useEffect(() => {
    cbRef.current = cb
  })

  const keyListener = useCallback(
    (e: KeyboardEvent) => {
      if (e.key.match(input.toString())) cbRef.current(e)
    },
    [input]
  )

  useEffect(() => {
    if (!listen) return

    document.addEventListener(eventType!, keyListener)
    return () => document.removeEventListener(eventType!, keyListener)
  }, [keyListener, listen, eventType])
}

export { useKey }
