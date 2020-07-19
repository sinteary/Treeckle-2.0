import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Dropdown, Menu, Image } from "semantic-ui-react";
import { PROFILE_PATH } from "../../../utils/route-path-constants";
import avatarImage from "../../../images/avatar.png";
import { UserContext } from "../../../context-providers";
import { echoSuccessfulMessage } from "../../../utils/toast-messages";
import "./index.scss";

function UserTab() {
  const { name, setName, setRole, setToken, setProfilePic } = useContext(
    UserContext
  );
  const location = useLocation();
  const pathname = location.pathname;

  const onSignOut = () => {
    setName(undefined);
    setRole(undefined);
    setToken(undefined);
    setProfilePic(undefined);
    echoSuccessfulMessage("signed out");
  };

  return (
    <Menu.Menu className="user-tab" position="right">
      <Menu.Item content={<strong>{name}</strong>} />

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
          <Dropdown.Item onClick={onSignOut} text="Sign Out" icon="sign out" />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu>
  );
}

export default UserTab;
