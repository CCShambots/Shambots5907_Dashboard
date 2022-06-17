import React from "react";
import Subsystem from "../building-blocks/Subsystem";
import './Debug.css'

function Debug(props) {


    if(props.activeTab == "Debug") {
        return (
            <div>
                <table>
                    <tr><td>Name</td><td>Current</td><td>Parent</td><td>Desired</td><td>Flag</td><td>Transitioning</td></tr>
                    <Subsystem name={"example"}></Subsystem>
                    {/*<Subsystem name={"example2"}></Subsystem>*/}
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