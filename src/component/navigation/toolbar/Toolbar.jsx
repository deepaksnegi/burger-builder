import React from "react";
import Logo from "../../logo/Logo";
import NavigationItems from "../navigationItems/NavigationItems";
import DrawerToggle from "../sideDrawer/DrawerToggle/DrawerToggle";
import "./Toolbar.css";

const Toolbar = (props) => {
  return (
    <header className="Toolbar">
      <DrawerToggle clicked={props.drawerToggleClicked} />
      <div className="Toolbar_Logo">
        <Logo />
      </div>
      <nav className="DesktopOnly">
        <NavigationItems />
      </nav>
    </header>
  );
};

export default Toolbar;
