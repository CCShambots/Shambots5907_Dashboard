import React, {Component} from "react";
import LightDisplay from "./LightDisplay";
import "./StatusLight.css";
import Image from "../../../images/blank.png"

class StatusLight extends Component {

    constructor(props) {
        super(props);
        this.state = {show : false}

        this.handleLoad = this.handleLoad.bind(this)

        this.sizeRef = React.createRef();
    }

    renderDisplay() {
        return this.state.show ?
            <LightDisplay width={this.sizeRef.current.clientWidth} height={this.sizeRef.current.clientHeight} state={this.props.lightStatus} ballCount={this.props.ballCount}></LightDisplay>
            : null;
    }

    handleLoad() {
        this.setState({
            show: true
        })
    }

    render() {
        return (
            <div className={"container"}>
                <img className={"blank-reference-image"} onLoad={this.handleLoad} ref={this.sizeRef} src={Image} />
                {this.renderDisplay()}
            </div>
        )
    }

}

export default StatusLight;