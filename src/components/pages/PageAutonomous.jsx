import React, {Component} from "react";
import useEntry from "../../networktables/useEntry";
import SendableChooser from "../general-components/SendableChooser";
import AutonomousSelector from "../specific-components/AutonomousSelector";

function PageAutonomous(props) {

    if(props.activeTab == "Auto") {
        return (
            <div>
                <AutonomousSelector/>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

export default PageAutonomous;