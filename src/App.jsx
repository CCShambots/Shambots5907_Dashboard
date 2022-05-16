import { useState } from 'react';
import KeyValueTable from './components/KeyValueTable';
import useGlobalListener from './networktables/useGlobalListener';
import useEntry from './networktables/useEntry';
import ConnectionWarning from './components/ConnectionWarning.jsx';
import React, {Component} from 'react';
import './App.css';
import Ribbon from './components/Ribbon';
import AutonomousPage from './components/AutonomousPage';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [tableEntries, setTableEntries] = useState({});
  useGlobalListener((key, value) => {
    setTableEntries(previousValue => ({
      ...previousValue,
      [key]: value,
    }));
  }, true);

  const [activeTab, setActiveTab] = useEntry('/dashboard/tab', 'Autonomous');

  const tabNames = ['Autonomous', 'Teleop', 'Test'];

  return (
    <div className="App">
      <ConnectionWarning/>

      <Ribbon tab={activeTab} setTab={(tab) => setActiveTab(tab)} tabs={tabNames}/>

      <AutonomousPage activeTab={activeTab}/>
      
    </div>
  );
}

export default App;
