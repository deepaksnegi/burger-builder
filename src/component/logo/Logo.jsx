import React from "react";
import logo from "../../assets/images/burger-logo.png";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="Logo">
      <img src={logo} alt="logo" />
    </div>
  );
};

export default Logo;
