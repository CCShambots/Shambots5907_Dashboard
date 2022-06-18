import React from "react";
import Subsystem from "../building-blocks/Subsystem";
import './Debug.css'
import useEntry from "../../networktables/useEntry";

function Debug(props) {


    if(props.activeTab == "Debug") {
        return (
            <div>
                <table>
                    <thead><tr><td>Name</td><td>Current</td><td>Parent</td><td>Desired</td><td>Flag</td><td>Transitioning</td><td>Enabled</td></tr></thead>
                    <tbody>
                        <Subsystem name={"drivetrain"}></Subsystem>
                    </tbody>
                </table>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

export default Debug;