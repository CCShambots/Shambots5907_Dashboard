import TrueFalseButton from "../general-components/TrueFalseButton";
import RPMMonitor from "../specific-components/RPMMonitor";
import useEntry from "../../networktables/useEntry";
import './PageTeleop.css';
import StatusLight from "../specific-components/status-lights/StatusLight";


function PageTeleop(props) {

    const boxSize = '120px';

    const [ballCount] = useEntry("/SmartDashboard/Number of balls tracking", -1);
    const [lightStatus] = useEntry("/SmartDashboard/Lights/Current State", "Undetermined");

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
                    <RPMMonitor size={boxSize}></RPMMonitor>
                    <RPMMonitor size={boxSize}></RPMMonitor>
                    <RPMMonitor size={boxSize}></RPMMonitor>
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