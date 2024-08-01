import React from "react";
import Image from "../images/Minions.png";
import "../stylesheet/Logo.css";

function Logo() {
    return (
        <div className="logo-container">
            <img className="logo" src={Image} alt="Minions"/>
        </div>
    );
}

export default Logo;