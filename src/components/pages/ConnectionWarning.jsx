import NetworkTables from '../../networktables/networktables';
import React, { Component } from 'react';
import './ConnectionWarning.css'


class ConnectionWarning extends React.Component {

    constructor(props) {
      super(props);
  
      this.state = {
        connected: false,
      };
    }

    componentDidMount() {
      NetworkTables.addRobotConnectionListener((connected) => {
        this.setState({connected: connected});
      }, true);
    }

    
  
    render() {
        const visible = this.state.connected ? 'hidden' : 'visible';

        return(
            <div style={{zIndex:100, visibility: visible}}>
              <div className="background"/>
              <h1 className="warning-text" style= {{color: 'red', fontSize: '100px'}}><b>NT DISCONNECTED</b></h1>
            </div> 
        )
    }
   
}

export default ConnectionWarning;