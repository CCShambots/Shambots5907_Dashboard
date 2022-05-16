import React, {Component} from "react";
import useEntry from "../networktables/useEntry";
import SendableChooser from "./SendableChooser";

function AutonomousPage(props) {

    // const pathToSelector = "/SmartDashboard/Select Autonomous Route/";
    // const [selected] = useEntry(pathToSelector + "");

    if(props.activeTab == "Autonomous") {
        return (
            <div className={"tab"}>
                <SendableChooser path="/SmartDashboard/Select Autonomous Route"/>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

export default AutonomousPage;