import React from "react";
import Subsystem from "../general-components/Subsystem";
import './Debug.css'
import ConveyorDisplay from "../specific-components/conveyor/ConveyorDisplay";

function Debug(props) {


    if(props.activeTab == "Debug") {
        return (
            <div>
                <table>
                    <thead><tr><td>Name</td><td>Current</td><td>Parent</td><td>Desired</td><td>Flag</td><td>Transitioning</td><td>Enabled</td></tr></thead>
                    <tbody>
                        <Subsystem name={"Lights"}></Subsystem>
                        <Subsystem name={"Intake"}></Subsystem>
                        <Subsystem name={"conveyor"}></Subsystem>
                        <Subsystem name={"turret"}></Subsystem>
                        <Subsystem name={"drivetrain"}></Subsystem>
                        <Subsystem name={"climber"}></Subsystem>
                        <Subsystem name={"Robot Manager"}></Subsystem>
                    </tbody>
                </table>
                <ConveyorDisplay/>

            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

export default Debug;