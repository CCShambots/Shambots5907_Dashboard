import React, {Component} from "react";
import './Ribbon.css'
import logo from '../../images/header-white.png'

function Ribbon(props) {
    const activeTab = props.tab;

    const tabElements = props.tabs.map((name) => 
        <div>
            <li key={name} onClick={() =>props.setTab(name)} id={activeTab == name ? "active" : "inactive"}><b>{name}</b></li>
        </div>
    );

    return (
        <div className="ribbon">
            <ul className="tabs">{tabElements}</ul>
            <img className="logo" src={logo} alt="CC Shambots logo"/>
            <div className="rectangle"/>
        </div>
    )
}

export default Ribbon;

