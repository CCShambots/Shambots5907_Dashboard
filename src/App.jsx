import { useState } from 'react';
import KeyValueTable from './components/general-components/KeyValueTable';
import useGlobalListener from './networktables/useGlobalListener';
import useEntry from './networktables/useEntry';
import ConnectionWarning from './components/pages/ConnectionWarning.jsx';
import React, {Component} from 'react';
import './App.css';
import Ribbon from './components/pages/Ribbon';
import PageAutonomous from './components/pages/PageAutonomous';
import PageTeleop from './components/pages/PageTeleop';
import 'bootstrap/dist/css/bootstrap.min.css';
import Debug from "./components/pages/Debug";
import PurePursuit from "./components/pages/PurePursuit";


function App() {

  const [tableEntries, setTableEntries] = useState({});
  useGlobalListener((key, value) => {
    setTableEntries(previousValue => ({
      ...previousValue,
      [key]: value,
    }));
  }, true);

  const [activeTab, setActiveTab] = useEntry('/SmartDashboard/Tab', 'Auto');

  const tabNames = ['Auto', 'Teleop', 'Test', 'Debug', 'Pathing'];

  return (
    <div className="App">
      
        <ConnectionWarning/>

        <Ribbon tab={activeTab} setTab={(tab) => setActiveTab(tab)} tabs={tabNames}/>

        <PageAutonomous activeTab={activeTab}/>
        <PageTeleop activeTab={activeTab}/>
        <Debug activeTab={activeTab}></Debug>
        <PurePursuit activeTab={activeTab}></PurePursuit>
    </div>
  );
}

export default App;
