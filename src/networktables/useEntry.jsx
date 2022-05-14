import { useState, useCallback } from 'react';
import useKeyListener from './useKeyListener';
import NetworkTables from './networktables';

function useEntry(key, defaultValue) {
  const [value, setValue] = useState(defaultValue);
  const updateNtValue = useCallback(newValue => {
    console.log('...', key, newValue);
    NetworkTables.setValue(key, newValue);
  }, []);

  useKeyListener(key, (_, newValue) => {
    setValue(newValue);
  }, true);
  
  return [value, updateNtValue];
}

export default useEntry;