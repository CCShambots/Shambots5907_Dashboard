import React, {Component} from "react";
import useEntry from "../../networktables/useEntry";
import { Dropdown, Select } from "semantic-ui-react";
import './SendableChooser.css';
import arrow from '../../images/dropdown-arrow.png'

class SendableChooser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dropDownActive: false,
        }
    }

    render() {
        
        const selectionOptions = this.props.options.map((option) => 
            <li key={option} className={"option"}>
                <div className={"box"} onClick={() => {
                    this.props.setActiveSelection(option);
                    this.setState({dropDownActive: false})
                }}>
                    <div className={"selectionContainer"}>
                        <p className={"normalText"}>{option}</p>
                    </div>    
                </div>
            </li>
        );
        
        return(
            <div className={"root"}>
                <p className={"title"}>{this.props.name}</p>
                <div className={"box"} onClick={() => this.setState({dropDownActive: !this.state.dropDownActive})}>
                    <div className={"selectionContainer"}>
                        <p className={"normalText"}>{this.props.active}</p>
                        <img className={"arrow, horizontalArrow"} src={arrow}/>
                    </div>
                </div>
                <div style={{visibility: this.state.dropDownActive ? 'visible' : 'hidden'}}>
                    <ul className={"selectionOptions"}>
                        {selectionOptions}
                    </ul>
                </div>

            </div>
        )
    }
}

export default SendableChooser;