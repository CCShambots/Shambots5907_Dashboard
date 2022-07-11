import useEntry from "../../networktables/useEntry";
import SendableChooser from "../general-components/SendableChooser";

function AutonomousSelector(props) {

    const pathToSelector = "/SmartDashboard/Select Autonomous Route/";

    const [defaultSelection] = useEntry(pathToSelector + "/default", '');
    const [activeValue] = useEntry(pathToSelector + 'active', ''); //Active property is the value in the robot code
    const [selected, setSelected] = useEntry(pathToSelector + 'selected', activeValue); //Selected property is sent to the robot code
    const [options] = useEntry(pathToSelector + 'options', []);

    return (
        <div>
            <SendableChooser name={"Select Auto Route"} selected={selected} setSelection={(newValue) => setSelected(newValue)} active={activeValue} options={options}/>
        </div>
    )
}

export default AutonomousSelector;