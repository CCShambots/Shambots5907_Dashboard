import React from "react";

function PathingDisplay(props) {
    return <svg className={"display"} width={props.width} height={props.height}>
        <Line x1="0" y1={"0"} x2={"100"} y2={"100"} stroke={"red"} strokeWidth={"2"} />
    </svg>
}

export default PathingDisplay;