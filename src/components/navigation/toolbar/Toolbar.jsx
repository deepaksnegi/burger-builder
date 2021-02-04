import React from "react";

import "./Toolbar.css";
import Logo from "../../logo/Logo";
import NavigationItems from "../navigationItems/NavigationItems";
import DrawerToggle from "../sideDrawer/drawerToggle/DrawerToggle";

const toolbar = (props) => (
  <header className="Toolbar">
    <DrawerToggle clicked={props.drawerToggleClicked} />
    <div className="Logo">
      <Logo />
    </div>
    <nav className="DesktopOnly">
      <NavigationItems isAuthenticated={props.isAuth} />
    </nav>
  </header>
);

export default toolbar;
