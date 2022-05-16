import React from "react";
import useEntry from "../networktables/useEntry";
import { Dropdown } from "semantic-ui-react";
import '../components/SendableChooser.css';

function SendableChooser(props) {
    const path = props.path;

    const [defaultSelection] = useEntry(path + "/default", '');
    const [activeSelection, setActiveSelection] = useEntry(path + '/active', '');
    const [options] = useEntry(path + '/options', []);

    const list = options.map((option) => <option onChange={(event) => setActiveSelection(event.target.value)} key={option}>{option}</option>);

    const boxOptions = [];
    options.forEach((el) => {
        boxOptions.push({key:el, text:el, value:el, content:el})
    });
    console.log(boxOptions);

    return(
        <div>
            <select>
                {list}
            </select>

            <Dropdown
                    // inline
                    header='Adjust time span'
                    options={boxOptions}
                    defaultValue={boxOptions[0].value}
                />
        </div>
    )
}

export default SendableChooser;