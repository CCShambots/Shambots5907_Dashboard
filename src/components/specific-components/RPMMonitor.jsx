import TrueFalseButton from "../building-blocks/TrueFalseButton";
import useEntry from "../../networktables/useEntry";
import './RPMMonitor.css'

function RPMMonitor(props) {

    const [flywheelVelo] = useEntry('Bottom Flywheel Measured Velo', 0);
    const [flywheelTarget] = useEntry('Bottom Flywheel Target Velo', 0);
    const [isFlywheelBusy] = useEntry('Is flywheel busy', true);


    return (
        <TrueFalseButton size={props.size} condition={() => isFlywheelBusy}>
            <p className={"text"} ><b>{flywheelVelo}</b></p>
            <p className={"text"}><b>Flywheel</b></p>
            <p className={"text"}><b>{flywheelTarget}</b></p>
        </TrueFalseButton>
    )
}

export default RPMMonitor;