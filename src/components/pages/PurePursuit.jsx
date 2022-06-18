import React, {Component} from "react";
import './Debug.css'
import field from '../../images/rapid-react-field.png';
import './PurePursuit.css';
import PathingDisplay from "../specific-components/PathingDisplay";

class PurePursuit extends Component {

    constructor(props) {
        super(props);
        this.state = {show : false}

        this.handleLoad = this.handleLoad.bind(this)

        this.imgRef = React.createRef();
    }

    renderDisplay() {
        return this.state.show ?
            <PathingDisplay width={this.imgRef.current.clientWidth} height={this.imgRef.current.clientHeight}></PathingDisplay>
            : null;
    }

    handleLoad() {
        this.setState({
            show: true
        })
    }

    render() {
        if(this.props.activeTab == 'Pathing') {
            return (
                <div className={"pathing-container"}>
                    <img onLoad={this.handleLoad} ref={this.imgRef} className="field" src={field} alt="Rapid React Field"/>
                    {this.renderDisplay()}
                </div>
            )
        } else {
            this.setState({show: false})
            return (
                <div>
                </div>
            )
        }
    }

}

export default PurePursuit;