import React from "react";
import Logo from "../../logo/Logo";
import NavigationItems from "../navigationItems/NavigationItems";
import Backdrop from "../../ui/backdrop/Backdrop";

import "./SideDrawer.css";

const SideDrawer = (props) => {
  const attachedClasses = ["SideDrawer", props.open ? "Open" : "Close"].join(
    " "
  );

  return (
    <>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses}>
        <div className="SideDrawer_Logo">
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </>
  );
};

export default SideDrawer;
