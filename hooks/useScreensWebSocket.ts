import { useEffect } from 'react';
import { useScreensStore } from '@/stores/useScreensStore';

export function useScreensWebSocket() {
  const setScreens = useScreensStore((s) => s.setScreens);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000/ws/pages');

    ws.onmessage = (evt) => {
      try {
        const data: Array<{ key: string; title: string; code: string }> =
          JSON.parse(evt.data);
        setScreens(data);
      } catch (e) {
        console.error('Invalid screens payload', e);
      }
    };

    ws.onerror = console.error;
    return () => ws.close();
  }, [setScreens]);
}
