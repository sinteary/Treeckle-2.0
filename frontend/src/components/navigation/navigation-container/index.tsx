import React from "react";
import MobileNavigationBar from "../mobile-navigation-bar";
import DesktopNavigationBar from "../desktop-navigation-bar";

type Props = {
  children: React.ReactNode;
};

function NavigationContainer({ children }: Props) {
  return (
    <>
      <DesktopNavigationBar>{children}</DesktopNavigationBar>
      <MobileNavigationBar>{children}</MobileNavigationBar>
    </>
  );
}

export default NavigationContainer;
