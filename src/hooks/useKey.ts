import {
  useCallback,
  useEffect,
  useRef,
} from 'react';

interface UseKeyOptions {
  listen?: boolean;
  type: keyof Pick<GlobalEventHandlersEventMap, 'keydown' | 'keypress' | 'keyup'>;
}

const useKey = (
  input: string | number,
  cb: (e: KeyboardEvent) => unknown,
  options: UseKeyOptions = {
    listen: true,
    type: 'keydown',
  },
): void => {
  const { listen, type } = options;
  const cbRef = useRef<(e: KeyboardEvent) => unknown>(cb);
  useEffect(() => {
    cbRef.current = cb;
  }, [cb]);

  const keyListener = useCallback(
    (e: KeyboardEvent) => {
      if (e.key.match(input.toString())) cbRef.current(e);
    },
    [input],
  );

  useEffect(() => {
    if (!Boolean(listen)) return;

    document.addEventListener(type, keyListener);
    return () => {
      document.removeEventListener(type, keyListener);
    };
  }, [keyListener, listen, type]);
};

export { useKey };
