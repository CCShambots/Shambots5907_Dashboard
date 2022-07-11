import React, {Component} from "react";
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
                <div className={"box"}>
                    <div onClick={() => {
                        this.props.setSelection(option);
                        this.setState({dropDownActive: false})
                    }} className={"selectionContainer"}>
                        <p className={"normalText"} style={{width: '125px'}}>{option}</p>
                    </div>    
                </div>
            </li>
        );

        const sentToDashboard = this.props.active == this.props.selected ? true : false;

        return(
            <div className={"root"}>
                <p className={"title"}><b>{this.props.name}</b></p>
                <div>
                    <div className={"box"} onClick={() => this.setState({dropDownActive: !this.state.dropDownActive})}>
                        <div className={"selectionContainer"}>
                            <p className={"normalText inlineText"}>{this.props.selected}</p>
                            <img className={"arrow"} id={this.state.dropDownActive ? "horizontalArrow" : "normalArrow"} src={arrow}/>
                        </div>
                    </div>
                    <p className={'title, sentIndicator'} id={sentToDashboard ? "" : "notSent"}>{sentToDashboard ? "✅" : "!"}</p>
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