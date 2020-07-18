import React from "react";
import { Responsive, Menu } from "semantic-ui-react";
import LogoTab from "../logo-tab";
import DashboardTab from "../dashboard-tab";
import EventsTab from "../events-tab";
import BookingsTab from "../bookings-tab";
import DesktopAdminTab from "../desktop-admin-tab";
import UserTab from "../user-tab";

type Props = {
  children: React.ReactNode;
};

function DesktopNavigationBar({ children }: Props) {
  return (
    <Responsive minWidth={Responsive.onlyComputer.minWidth}>
      <Menu borderless size="huge" fixed="top">
        <LogoTab />
        <DashboardTab />
        <BookingsTab />
        <EventsTab />
        <DesktopAdminTab />
        <UserTab />
      </Menu>

      {children}
    </Responsive>
  );
}

export default DesktopNavigationBar;
