import React, {useEffect, useState} from "react";
import "./ConveyorDisplay.css";
import useEntry from "../../../networktables/useEntry";

const deactivatedColor = "red";
const activatedColor = "#00ff37";
const sensorNotDetectedColor = "purple"


function ConveyorDisplay(props) {

    const [leftProx, setLeftProx] = useEntry("/SmartDashboard/conveyor/left-prox/activated", true);
    const [rightProx, setRightProx] = useEntry("/SmartDashboard/conveyor/right-prox/activated", true);
    const [centerProx, setCenterProx] = useEntry("/SmartDashboard/conveyor/center-prox/activated", true);
    const [leftColor, setLeftColor] = useEntry("/SmartDashboard/conveyor/left-color/color-value", "ERROR");
    const [rightColor, setRightColor] = useEntry("/SmartDashboard/conveyor/right-color/color-value", "ERROR");

    const [ball1Pos, setBall1Pos] = useEntry("/SmartDashboard/conveyor/ball-1/Position", "ERROR");
    const [ball1Color, setBall1Color] = useEntry("/SmartDashboard/conveyor/ball-1/Color", "ERROR");

    const [ball2Pos, setBall2Pos] = useEntry("/SmartDashboard/conveyor/ball-2/Position", "ERROR");
    const [ball2Color, setBall2Color] = useEntry("/SmartDashboard/conveyor/ball-2/Color", "ERROR");

    const [isRedAlliance, setIsRedAlliance] = useEntry("/FMSInfo/IsRedAlliance", true);

    const [leftCompactorSpeed, setLeftCompactorSpeed] = useEntry("/SmartDashboard/conveyor/left-compactor-speed", 0);
    const [rightCompactorSpeed, setRightCompactorSpeed] = useEntry("/SmartDashboard/conveyor/right-compactor-speed", 0);
    const [leftConveyorSpeed, setLeftConveyorSpeed] = useEntry("/SmartDashboard/conveyor/left-conveyor-speed", 0);
    const [rightConveyorSpeed, setRightConveyorSpeed] = useEntry("/SmartDashboard/conveyor/right-conveyor-speed", 0);

    return (
        <div>

            <div className={"size-container"}>
                <svg  className={"conveyor-display"}>
                    {renderBall(ball1Pos, ball1Color, isRedAlliance)}
                    {renderBall(ball2Pos, ball2Color, isRedAlliance)}

                    {renderArrows(100, leftCompactorSpeed, rightCompactorSpeed, leftConveyorSpeed, rightConveyorSpeed )}

                    <circle cx={214.5} cy={491} r={15} fill={leftProx ? activatedColor : deactivatedColor} stroke={"black"} strokeWidth={2}/>
                    <circle cx={400} cy={348} r={15} fill={centerProx ? activatedColor : deactivatedColor} stroke={"black"} strokeWidth={2}/>
                    <circle cx={585} cy={491} r={15} fill={rightProx ? activatedColor : deactivatedColor} stroke={"black"} strokeWidth={2}/>
                    <circle cx={150} cy={600} r={20} fill={getColorForColorSensor(leftColor)} stroke={"white"} strokeWidth={5}></circle>
                    <circle cx={647} cy={600} r={20} fill={getColorForColorSensor(rightColor)} stroke={"white"} strokeWidth={5}></circle>

                </svg>
            </div>
        </div>
    )

}

function renderArrows(length, leftCompactorSpeed, rightCompactorSpeed, leftConveyorSpeed, rightConveyorSpeed) {

    let arr = [];
    if(leftCompactorSpeed != 0) arr.push(renderArrow(length, {x: 50, y:400}, leftCompactorSpeed > 0 ? 0 : 180), "left-compactor");
    if(rightCompactorSpeed != 0) arr.push(renderArrow(length, {x: 798.5-50, y:400}, rightCompactorSpeed > 0 ? 180 : 0), "right-compactor");
    if(leftConveyorSpeed != 0) arr.push(renderArrow(length, {x: 150, y:100}, leftConveyorSpeed > 0 ? 0 : 180), "left-conveyor");
    if(rightConveyorSpeed != 0) arr.push(renderArrow(length, {x: 798.5-150, y:100}, rightConveyorSpeed > 0 ? 180 : 0), "right-conveyor");

    return arr;
}

function renderArrow(length, centerPoint, angle, name) {
    const lineAngle = toRadians(angle);
    const point1 = {x: centerPoint.x - Math.cos(lineAngle) * length/2, y: centerPoint.y + Math.sin(lineAngle) * length/2}
    const point2 = {x: centerPoint.x + Math.cos(lineAngle) * length/2, y: centerPoint.y - Math.sin(lineAngle) * length/2}

    const tip1Angle = lineAngle + toRadians(135);
    const tipPoint1 = {x: point2.x + Math.cos(tip1Angle) * 50, y: point2.y - Math.sin(tip1Angle) * 50}

    const tip2Angle = lineAngle - toRadians(135);
    const tipPoint2 = {x: point2.x + Math.cos(tip2Angle) * 50, y: point2.y - Math.sin(tip2Angle) * 50}

    let arr = [];

    arr.push(arrowPart(point1, point2, name  + "-main-arrow"))
    arr.push(arrowPart(point2, tipPoint1, name + "-tip-1"))
    arr.push(arrowPart(point2, tipPoint2, name + "-tip-2"))

    return arr;
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180)
}

function arrowPart(point1, point2, key) {
    return <line key={key} x1={point1.x} y1={point1.y} x2={point2.x} y2={point2.y} fill={"black"} strokeWidth={5} stroke={"white"}/>
}

function renderBall(position, color, isRedAlliance) {
    let point = {x: 0, y: 0}

    switch (position) {
        case "NotInBot":
            return;
        case "PastLeft":
            point = {x: 50, y: 380}; break;
        case "Left":
            point = {x: 175, y: 380}; break;
        case "BetweenLeftAndCenter":
            point = {x: 270, y: 360}; break;
        case "Center":
            point = {x: 400, y: 312}; break;
        case "BetweenRightAndCenter":
            point = {x: 528.5, y: 360}; break;
        case "Right":
            point = {x: 623.5, y: 380}; break;
        case "PastRight":
            point = {x: 748.5, y: 380}; break;
    }

    let ballColor = "red"
    if(color == "Ours") {
        if(isRedAlliance) {
            color = "red"
        } else {
            color = "blue"
        }
    } else if(color == "Opposing") {
        if(isRedAlliance) {
            color = "blue"
        } else {
            color = "red"
        }
    } else {
        return;
    }

    return <circle cx={point.x} cy={point.y} r={150} fill={color} stroke={"black"} strokeWidth={2}/>
}

function getColorForColorSensor(sensorValue) {
    switch (sensorValue) {
        case "NoBallDetected":
            return activatedColor
        case "SensorNotDetected":
            return sensorNotDetectedColor
        case "Red":
            return "red"
        case "Blue":
            return "blue"
    }
}

export default ConveyorDisplay;