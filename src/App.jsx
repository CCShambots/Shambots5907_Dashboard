import { useState } from 'react';
import KeyValueTable from './components/KeyValueTable';
import useGlobalListener from './networktables/useGlobalListener';
import useEntry from './networktables/useEntry';
import './App.css';

function App() {
  const [tableEntries, setTableEntries] = useState({});
  useGlobalListener((key, value) => {
    setTableEntries(previousValue => ({
      ...previousValue,
      [key]: value,
    }));
  }, true);

  const [gyroAngle, setGyroAngle] = useEntry('/gyro/angle', 0);
  const [gyroPrecision] = useEntry('/gyro/precision', 2);

  return (
    <div className="App">
      <frc-gyro value={gyroAngle} precision={gyroPrecision}></frc-gyro>
      <div className="gyro-input">
        <label>Gyro Angle:</label>
        <input
          type="range"
          min="-360"
          max="360"
          value={gyroAngle}
          onChange={ev => setGyroAngle(parseFloat(ev.target.value))}
        />
      </div>
      <KeyValueTable keyValuePairs={tableEntries} />
    </div>
  );
}

export default App;
