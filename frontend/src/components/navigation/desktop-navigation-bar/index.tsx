import React from "react";
import { Responsive, Menu, Container } from "semantic-ui-react";
import LogoTab from "../logo-tab";
import DashboardTab from "../dashboard-tab";
import EventsTab from "../events-tab";
import BookingsTab from "../bookings-tab";
import DesktopAdminTab from "../desktop-admin-tab";
import UserTab from "../user-tab";
import "./index.scss";

type Props = {
  children: React.ReactNode;
};

function DesktopNavigationBar({ children }: Props) {
  return (
    <Responsive
      className="desktop-root-container"
      minWidth={Responsive.onlyComputer.minWidth}
    >
      <Menu className="app-bar" borderless size="huge" fixed="top">
        <LogoTab />
        <DashboardTab />
        <BookingsTab />
        <EventsTab />
        <DesktopAdminTab />
        <UserTab />
      </Menu>

      <div className="desktop-page-container">
        <Container>{children}</Container>
      </div>
    </Responsive>
  );
}

export default DesktopNavigationBar;
