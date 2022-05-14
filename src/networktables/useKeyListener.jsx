import { useEffect } from 'react';
import NetworkTables from './networktables';

function useKeyListener(key, callback, immediateNotify) {
  useEffect(() => {
    return NetworkTables.addKeyListener(key, (key, value, isNew) => {
      callback(key, value, isNew);
    }, immediateNotify);
  }, []);
}

export default useKeyListener;