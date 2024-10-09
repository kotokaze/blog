'use client';
import { useEffect } from 'react';

interface Props {
}

const UIkitIcons: React.FC<Props> = ({}) => {
  useEffect(() => {
    void (async function () {
      const UIkit = (await import('uikit')).default;
      const Icons = (await import('uikit/dist/js/uikit-icons')).default;
      UIkit.use(Icons);
    })();
  }, []);

  return null;
};

export default UIkitIcons;
