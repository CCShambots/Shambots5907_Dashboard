import React, {useEffect, useRef, useState} from "react";
import "./PathingDisplay.css";
import useEntry from "../../networktables/useEntry";

function PathingDisplay(props) {
    const baseEntry = "/SmartDashboard/drivetrain/"
    const [pointsX] = useEntry(baseEntry + "Pure Pursuit/xPoints", []);
    const [pointsY] = useEntry(baseEntry + "Pure Pursuit/yPoints", []);

    const [robotX] = useEntry(baseEntry + "pose/x", 0);
    const [robotY] = useEntry(baseEntry + "pose/y", 0);
    const [robotTheta] = useEntry(baseEntry + "pose/theta", 0);

    const [followDistance] = useEntry(baseEntry + "Pure Pursuit/followDistance", 0)

    console.log([pointsX, pointsY]);

    const width = props.width;
    const height = props.height

    const points = []

    for(let i=0; i<pointsX.length; i++) {
        points.push({x:feet(pointsX[i]), y:feet(pointsY[i])})
    }

    console.log(points)

    const lines = getLines(points, width, height);
    const pointElements = getPoints(points, width, height);

    const botPose = {x: feet(robotX), y: feet(robotY), theta: degrees(robotTheta)}
    const followRadius = followDistance;
    const botSize = {length: 26./12, width: 26./12}

    const bot = getBotDisplay(botPose, botSize, followRadius, width, height);

    const poseHistory = useRef([])

    const newPoseHistory = poseHistory.current;
    newPoseHistory.push(botPose);
    if(newPoseHistory.length > 25) newPoseHistory.shift();
    poseHistory.current = newPoseHistory;

    const historyPoints = displayHistoryPoints(newPoseHistory, width, height);

    return <svg className={"display"} width={width} height={height}>
        {lines}
        {pointElements}
        {historyPoints}
        {bot}
    </svg>
}

function getLines(points, width, height) {
    let lineArray = [];

    for(let i = 0; i < points.length - 1; i++) {
        let point1 = fieldToImageCoords(points[i], width, height);
        let point2 = fieldToImageCoords(points[i+1], width, height);

        lineArray.push(
            <line key={"Line " + i} x1={point1.x} y1={point1.y} x2={point2.x} y2={point2.y} stroke={"black"} strokeWidth={"5px"}/>
        )
    }

    return lineArray;
}

function getPoints(points, width, height, variatePoints=false) {
    let pointArray = [];

    let opacity = 0;
    for(let i = 0; i<points.length; i++) {

        let correctedPoint = fieldToImageCoords(points[i], width, height);

        opacity += 256/points.length;
        let rounded = Math.round(opacity).toString(16)
        if(rounded.length == 1) rounded = "0" + rounded
        pointArray.push(<circle key={"Point " + i} cx={correctedPoint.x} cy={correctedPoint.y}  strokeWidth={4} r={5} stroke={variatePoints ? "#0000FF" + rounded : "blue"} fill={variatePoints ? "#ffffff" + rounded : "white"}/>)
    }

    return pointArray;
}

function getBotDisplay(botPose, botSize, followRadius, width, height) {

    const centerPoint = getPoints([botPose], width, height);

    const framePerimeter = getEdgesOfBot(botPose, botSize, width, height);

    const angleDisplay = getLines([botPose, move(botPose, botPose.theta+90, botSize.length)], width, height)

    const centerPointPixels = fieldToImageCoords(botPose, width, height)
    const followCircle = <circle key={"Follow distance"} cx={centerPointPixels.x} cy={centerPointPixels.y} r={fieldToImageCoords({x : followRadius, y: 0}, width, height).x} strokeWidth={4} stroke={"black"} fill={"rgba(0,255,255,0)"}></circle>

    let allElements = [];
    allElements.push(framePerimeter, angleDisplay, centerPoint, followCircle)
    return allElements;
}

function getEdgesOfBot(botPose, botSize, width, height) {
    let distanceToCorner = distance({x: 0, y: 0}, {x: botSize.width/2, y: botSize.length/2}) //Distance from center of bot to any corner
    let angleToCorner = degrees(Math.atan2(botSize.length/2, botSize.width/2)); //Angle from center of bot to front right corner
    let points = [move(botPose, botPose.theta-angleToCorner, distanceToCorner), //Front right
                    move(botPose, botPose.theta+angleToCorner, distanceToCorner), //Front left
                    move(botPose, botPose.theta-180-angleToCorner, distanceToCorner), //Back left
                    move(botPose, botPose.theta-180+angleToCorner, distanceToCorner), //Back right
                    ]
    points.push(points[0]);
    return getLines(points, width, height);
}

function displayHistoryPoints(history, width, height) {
    //Prune out duplicate values
    if(history.length>=2) {
        const entry1 = history[history.length-1];
        const entry2 = history[history.length-2];
        if(entry1.x==entry2.x && entry1.y == entry2.y) history.pop();
    }

    return getPoints(history, width, height, true);
}

function move(point, angle, unit) {
    let x = point.x;
    let y = point.y;
    let rad = radians(angle % 360);

    x += unit*Math.sin(rad);
    y += unit*Math.cos(rad);

    return {x:x, y:y};
}

function radians(degree) {
    return degree * (Math.PI/180);
}

function degrees(radians) {
    return radians * (180/Math.PI);
}

function feet(meters) {
    return meters * 3.28084;
}

function distance(point1, point2) {
    return Math.sqrt(Math.pow(point2.x-point1.x, 2) + Math.pow(point2.y-point1.y, 2));
}

function fieldToImageCoords(point, imgWidth, imgHeight) {
    const x = point.x * (imgWidth/54);
    const y = (27-point.y) * (imgHeight/27);

    return {x : x, y : y};
}

export default PathingDisplay;