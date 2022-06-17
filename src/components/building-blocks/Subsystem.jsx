import useEntry from "../../networktables/useEntry";
import React from "react";
import './Subsystem.css'

function Subsystem(props) {
    const baseEntry = "/SmartDashboard/subsystems/" + props.name + "/";
    console.log(baseEntry);

    const [name] = useEntry(baseEntry + "Name", "NOT FOUND");
    const [state] = useEntry(baseEntry + "Current State", "NOT FOUND");
    const [parentState] = useEntry(baseEntry + "Current Parent State", "NOT FOUND");
    const [desiredState] = useEntry(baseEntry + "Desired State", "NOT FOUND");
    const [flagState] = useEntry(baseEntry + "Current Flag State", "NOT FOUND");
    const [transitioning] = useEntry(baseEntry + "Transitioning", true);

    console.log(name);

    return(
        <tr className={"info"}>
            <td className={"element"}>{name}</td>
            <td className={"element"}>{state}</td>
            <td className={"element"}>{parentState}</td>
            <td className={"element"}>{desiredState}</td>
            <td className={"element"}>{flagState}</td>
            <td className={"element"}>{transitioning ? "true" : "false"}</td>
        </tr>
    )
}

export default Subsystem;