import React, {Component} from "react";
import './Ribbon.css'
import logo from '../images/header-white.png'

function Ribbon(props) {
    const activeTab = props.tab;

    const tabElements = props.tabs.map((name) => <li onClick={props.setTab(name)} style={{color: activeTab == name ? "blue": "white"}}><b>{name}</b></li>);

    return (
        <div className="ribbon">
            <ul className="tabs">{tabElements}</ul>
            <img className="logo" src={logo} alt="CC Shambots logo"/>
        </div>
    )
}

export default Ribbon;

