import React from "react";
import Mainlogo from "assets/sakerhetskontrollen-logo.svg";


const Logo = ({ large }) => {
  return (
    <img style={{width:200}} src={Mainlogo} alt="sakerhetskontrollen"/>
  );
};

export default Logo;
