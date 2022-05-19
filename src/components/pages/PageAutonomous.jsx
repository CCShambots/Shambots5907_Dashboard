import React, {Component} from "react";
import useEntry from "../../networktables/useEntry";
import SendableChooser from "../building-blocks/SendableChooser";

function PageAutonomous(props) {

    const pathToSelector = "/Shuffleboard/Drive Team/Select Autonomous Route/";

    const [defaultSelection] = useEntry(pathToSelector + "/default", '');
    const [name] = useEntry(pathToSelector + ".name");
    const [activeSelection, setActiveSelection] = useEntry(pathToSelector + 'active', '');
    const [options] = useEntry(pathToSelector + 'options', []);

    if(props.activeTab == "Auto") {
        return (
            <div>
                <SendableChooser name={name} active={activeSelection} setActiveSelection={(newValue) => setActiveSelection(newValue)} options={options}/>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

export default PageAutonomous;