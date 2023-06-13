import TrueFalseButton from "../general-components/TrueFalseButton";
import useEntry from "../../networktables/useEntry";
import './RPMMonitor.css'

function RPMMonitor(props) {

    const [flywheelVelo] = useEntry('/SmartDashboard/Bottom Flywheel Measured Velo', -1);
    const [flywheelTarget] = useEntry('/SmartDashboard/Bottom Flywheel Target Velo', -1);
    const [isFlywheelBusy] = useEntry('/SmartDashboard/Is flywheel busy', true);


    return (
        <TrueFalseButton size={props.size} condition={() => !isFlywheelBusy}>
            <p className={"text"} ><b>{flywheelVelo}</b></p>
            <p className={"text"}><b>Flywheel</b></p>
            <p className={"text"}><b>{flywheelTarget}</b></p>
        </TrueFalseButton>
    )
}

export default RPMMonitor;