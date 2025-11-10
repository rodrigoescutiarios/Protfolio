import { useEffect } from 'react';

export function useCursorPointerOnClick() {
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && e.target.onclick) {
        e.target.style.cursor = 'pointer';
      }
    };
    document.addEventListener('mouseover', handle);
    return () => document.removeEventListener('mouseover', handle);
  }, []);
}
