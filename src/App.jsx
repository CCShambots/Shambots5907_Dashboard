import AutonomousSelector from "./components/specific-components/AutonomousSelector";
import KeyValueTable from "./components/general-components/KeyValueTable";
import useEntry from "./networktables/useEntry";

function App() {
  const [time] = useEntry("/dashboard/time-left", 0.0);
  const [team] = useEntry("/dashboard/team", "FAILED TO GET TAM")

  return (
    <div>
      <div>
        <h1 style={{color: "white"}}>{time}</h1>
        <h1 style={{color: "white"}}>{team}</h1>
      </div>
      <AutonomousSelector />
    </div>
  );
}

export default App;
