import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Dropdown, Menu, Image } from "semantic-ui-react";
import { PROFILE_PATH } from "../../../utils/route-path-constants";
import avatarImage from "../../../images/avatar.png";

function DesktopAdminTab() {
  const location = useLocation();
  const pathname = location.pathname;
  console.log(pathname);
  return (
    <Menu.Menu position="right">
      <Menu.Item content={<strong>Jeremy</strong>} />

      <Dropdown
        active={pathname === PROFILE_PATH}
        trigger={<Image src={avatarImage} avatar bordered size="mini" />}
        as={Menu.Item}
        icon={null}
        floating
      >
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to={PROFILE_PATH}
            active={pathname === PROFILE_PATH}
            text="Profile"
            icon="user"
          />
          <Dropdown.Item text="Sign Out" icon="sign out" />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu>
  );
}

export default DesktopAdminTab;
