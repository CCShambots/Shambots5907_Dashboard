import { useState } from 'react';
import KeyValueTable from './components/building-blocks/KeyValueTable';
import useGlobalListener from './networktables/useGlobalListener';
import useEntry from './networktables/useEntry';
import ConnectionWarning from './components/pages/ConnectionWarning.jsx';
import React, {Component} from 'react';
import './App.css';
import Ribbon from './components/pages/Ribbon';
import PageAutonomous from './components/pages/PageAutonomous';
import PageTeleop from './components/pages/PageTeleop';
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

  const tabNames = ['Auto', 'Teleop', 'Test'];

  return (
    <div className="App">
      
      <ConnectionWarning/>

      <Ribbon tab={activeTab} setTab={(tab) => setActiveTab(tab)} tabs={tabNames}/>

      <PageAutonomous activeTab={activeTab}/>
      <PageTeleop activeTab={activeTab}/>
    </div>
  );
}

export default App;
