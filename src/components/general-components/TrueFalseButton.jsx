import './TrueFalseButton.css'
import useEntry from "../../networktables/useEntry";

function TrueFalseButton(props) {

    const color = props.condition() ? "green" : "red";

    return (
        <div style={{minHeight: props.size, minWidth: props.size}} className={"buttonBox " + color}>
            {props.children}
        </div>
    );
}

export default TrueFalseButton;