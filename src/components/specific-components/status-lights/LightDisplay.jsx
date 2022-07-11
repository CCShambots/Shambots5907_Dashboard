import React, {useEffect, useState} from "react";
import "./StatusLight.css";

class LightDisplay extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            color: "red",
            width: 50,
            x: 0,
            rate: 0.3,
            updateRate: 5
        }
    }

    render() {

        return (
            <svg width={this.props.width} height={this.props.height} className={"light-display"}>
                {this.getCurerntAnimation()}
            </svg>
        )
    }

    getCurerntAnimation() {
        let state = this.props.state;
        switch (state){
            case "Undetermined":
                return <rect displayName={"undetermined"}/>
            case "Idle":
                return <LarsonAnimation displayName={"idle"} width={this.props.width} height={this.props.height} size={.3} color={"blue"} speed={this.state.rate} updateRate={this.state.updateRate}/>
            case "Default":
                return <rect displayName={"default"}/>
            case "OneBall":
                return <StrobeAnimation displayName={"one-ball"} speed={this.state.rate} width={this.props.width} height={this.props.height} color={"blue"} updateRate={this.state.updateRate} />
            case "TwoBall":
                return this.getSolidAnimation("blue", "two-ball")
            case "LockedIn":
                if(this.props.ballCount == 1) {
                    return <StrobeAnimation displayName="locked-in-one-ball" speed={this.state.rate} width={this.props.width} height={this.props.height} color={"green"} updateRate={this.state.updateRate} />
                } else if(this.props.ballCount > 1) {
                    return this.getSolidAnimation("green", "locked-in-two-ball")
                } else {
                    return <rect displayName="locked-in-no-ball"/>
                }
            case "BottomEject":
                return <StrobeAnimation displayName="bottom-eject" speed={this.state.rate / 4} width={this.props.width} height={this.props.height} color={"red"} updateRate={this.state.updateRate} />
            case "Testing":
                return <StrobeAnimation displayName="testing" speed={this.state.rate} width={this.props.width} height={this.props.height} color={"yellow"} updateRate={this.state.updateRate} />
        }
        return null;
    }

    getSolidAnimation(color, className) {
        return <rect className={className} x={0} y={0} width={this.props.width} height={this.props.height} fill={color}/>
    }

}

export function StrobeAnimation(props) {
    const [currentColor, setCurrentColor] = useState(props.color);
    const [timePassed, setTimePassed] = useState(0);

    useEffect(() => {
        const msDelay = props.updateRate;
        const speed = props.speed;
        const interval = setInterval(() => {
            setTimePassed(timePassed+msDelay);

             if(timePassed > 1000 * speed) {
                setTimePassed(0)
            } else if(timePassed > 1000 * (speed /2)) {
                 setCurrentColor(props.color)
            } else {
                setCurrentColor("#333333")
            }

        }, msDelay);

        return () => {
            clearInterval(interval)
        };
    }, [timePassed]);

    return(
        <rect x={0} y={0} width={props.width} height={props.height} fill={currentColor} className={props.displayName}></rect>
    )
}

export function LarsonAnimation(props) {
    const [currentX, setCurrentX] = useState(0);
    const [timePassed, setTimePassed] = useState(0);

    useEffect(() => {
        const rate = props.updateRate;
        const interval = setInterval(() => {
            setTimePassed(timePassed + rate);

            let direction = timePassed / 1000 > props.speed ? "left" : "right";

            if(direction == "right" ) {
                setCurrentX(((timePassed /1000)*(1/props.speed)) * (props.width-props.size))
            } else if(direction == "left") {
                let timeGoingLeft = timePassed - 1000 * props.speed
                setCurrentX((props.width-props.size) - ((timeGoingLeft /1000)*(1/props.speed)) * (props.width-props.size))
            }

            if(timePassed > props.speed * 1000 * 2) {
                setTimePassed(0);
            }
        }, rate)

        return () => {
            clearInterval(interval)
        };
    }, [timePassed, currentX]);


    return(
        <rect x={currentX} y={0} width={props.width * props.size} height={props.height} fill={props.color} className={props.displayName}></rect>
    )
}



export default LightDisplay;