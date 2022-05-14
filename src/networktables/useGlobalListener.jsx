import { useEffect } from 'react';
import NetworkTables from './networktables';

function useGlobalListener(callback, immediateNotify) {
  useEffect(() => {
    return NetworkTables.addGlobalListener((key, value, isNew) => {
      callback(key, value, isNew);
    }, immediateNotify);
  }, []);
}

export default useGlobalListener;