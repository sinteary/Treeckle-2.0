import React, { useState } from "react";
import { Responsive, Sidebar, Menu } from "semantic-ui-react";
import LogoTab from "../logo-tab";
import DashboardTab from "../dashboard-tab";
import EventsTab from "../events-tab";
import BookingsTab from "../bookings-tab";
import MobileAdminTab from "../mobile-admin-tab";
import UserTab from "../user-tab";

type Props = {
  children: React.ReactNode;
};

function MobileNavigationBar({ children }: Props) {
  const [isSidebarOpened, setSidebarOpened] = useState(false);

  const onTabClick = () => {
    setSidebarOpened(false);
  };

  return (
    <Responsive
      as={Sidebar.Pushable}
      maxWidth={Responsive.onlyTablet.maxWidth}
      onUpdate={() =>
        (window?.innerWidth ?? 0) >
          (Responsive.onlyTablet.maxWidth ?? Number.MAX_SAFE_INTEGER) &&
        setSidebarOpened(false)
      }
    >
      <Sidebar
        as={Menu}
        animation="push"
        onHide={() => setSidebarOpened(false)}
        vertical
        visible={isSidebarOpened}
      >
        <LogoTab onTabClick={onTabClick} />
        <DashboardTab onTabClick={onTabClick} />
        <BookingsTab onTabClick={onTabClick} />
        <EventsTab onTabClick={onTabClick} />
        <MobileAdminTab onTabClick={onTabClick} />
      </Sidebar>

      <Sidebar.Pusher dimmed={isSidebarOpened}>
        <Menu borderless size="huge" fixed="top">
          <Menu.Item onClick={() => setSidebarOpened(true)} icon="sidebar" />
          <UserTab />
        </Menu>

        {children}
      </Sidebar.Pusher>
    </Responsive>
  );
}

export default MobileNavigationBar;
