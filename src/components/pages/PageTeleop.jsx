import TrueFalseButton from "../general-components/TrueFalseButton";
import RPMMonitor from "../specific-components/RPMMonitor";
import useEntry from "../../networktables/useEntry";
import './PageTeleop.css';
import StatusLight from "../specific-components/status-lights/StatusLight";


function PageTeleop(props) {

    const boxSize = '120px';

    const [ballCount] = useEntry("/SmartDashboard/conveyor/ball-count", -1);
    const [lightStatus] = useEntry("/SmartDashboard/Lights/Current State", "Undetermined");

    const [isFlywheelBusy] = useEntry("/SmartDashboard/turret/flywheel busy", false);
    const [flywheelVelo] = useEntry("/SmartDashboard/turret/flywheel velo", -1);
    const [flywheelTarget] = useEntry("/SmartDashboard/turret/flywheel target", -1);

    const [isHoodBusy] = useEntry("/SmartDashboard/turret/hood busy", false);
    const [hoodPos] = useEntry("/SmartDashboard/turret/hood degrees", -1);
    const [hoodTarget] = useEntry("/SmartDashboard/turret/hood target", -1);

    if(props.activeTab == "Teleop") {
        return (
            <div>
                <div className={"mainDisplay"}>
                    <h1 className={"ballCount"}>{ballCount}</h1>
                    <div className={"webcamStream"}>
                        <h1 className={"legitStream"}><b>Legit webcam stream 0.o</b></h1>
                    </div>
                </div>

                <div className={"statusIndicators"}>
                    <TrueFalseButton size={boxSize} condition={() => !isFlywheelBusy}>
                        <p className={"text"} ><b>{flywheelVelo}</b></p>
                        <p className={"text"}><b>Flywheel</b></p>
                        <p className={"text"}><b>{flywheelTarget}</b></p>
                    </TrueFalseButton>

                    <TrueFalseButton size={boxSize} condition={() => !isHoodBusy}>
                        <p className={"text"} ><b>{hoodPos}</b></p>
                        <p className={"text"}><b>Hood</b></p>
                        <p className={"text"}><b>{hoodTarget}</b></p>
                    </TrueFalseButton>

                    {/*<TrueFalseButton size={boxSize} condition={() => !isHoodBusy}>*/}
                    {/*    <p className={"text"} ><b>{hoodPos}</b></p>*/}
                    {/*    <p className={"text"}><b>Hood</b></p>*/}
                    {/*    <p className={"text"}><b>{hoodTarget}</b></p>*/}
                    {/*</TrueFalseButton>*/}
                </div>

                <StatusLight lightStatus={lightStatus} ballCount={ballCount}></StatusLight>

            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

export default PageTeleop;