import React, { useState } from "react";
import SideDrawer from "../navigation/sideDrawer/SideDrawer";
import Toolbar from "../navigation/toolbar/Toolbar";
import "./layout.css";

const Layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer((previousState) => !previousState.showSideDrawer);
  };

  return (
    <>
      <Toolbar drawerToggleClicked={sideDrawerToggleHandler} />
      <SideDrawer open={showSideDrawer} closed={sideDrawerClosedHandler} />
      <div className="Content">{props.children}</div>
    </>
  );
};

export default Layout;
