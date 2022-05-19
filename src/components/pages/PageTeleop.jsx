import TrueFalseButton from "../building-blocks/TrueFalseButton";
import RPMMonitor from "../specific-components/RPMMonitor";


function PageTeleop(props) {

    const boxSize = '120px';

    if(props.activeTab == "Teleop") {
        return (
            <div>
                <RPMMonitor size={boxSize}></RPMMonitor>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

export default PageTeleop;