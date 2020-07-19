import React, { useContext } from "react";
import MobileNavigationBar from "../mobile-navigation-bar";
import DesktopNavigationBar from "../desktop-navigation-bar";
import { UserContext } from "../../../context-providers";

type Props = {
  children: React.ReactNode;
};

function NavigationContainer({ children }: Props) {
  const { token } = useContext(UserContext);

  return (
    <>
      {token ? (
        <>
          <DesktopNavigationBar>{children}</DesktopNavigationBar>
          <MobileNavigationBar>{children}</MobileNavigationBar>
        </>
      ) : (
        children
      )}
    </>
  );
}

export default NavigationContainer;
