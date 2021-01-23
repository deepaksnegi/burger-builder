import React from "react";
import NavigationItem from "./navigationItem/NavigationItem";
import "./NavigationItems.css";

const NavigationItems = () => {
  return (
    <ul className="NavigationItems">
      <NavigationItem link="/">Burger Builder</NavigationItem>
      <NavigationItem link="/orders">Orders</NavigationItem>
      <NavigationItem link="/login">Login</NavigationItem>
    </ul>
  );
};

export default NavigationItems;
