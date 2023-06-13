import { useState } from 'react';
import KeyValueTable from './components/general-components/KeyValueTable';
import useGlobalListener from './networktables/useGlobalListener';
import ConnectionWarning from './components/pages/ConnectionWarning.jsx';
import React, {Component} from 'react';
import './App.css';
import Grid from './components/pages/Grid';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const [tableEntries, setTableEntries] = useState({});
  useGlobalListener((key, value) => {
    setTableEntries(previousValue => ({
      ...previousValue,
      [key]: value,
    }));
  }, true);


  return (
    <div className="App">
        {/*<ConnectionWarning/>*/} {/*TODO: Uncomment*/}

        <Grid/>

    </div>
  );
}

export default App;
