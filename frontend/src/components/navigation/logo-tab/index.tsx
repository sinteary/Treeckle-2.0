import React from "react";
import { Image, MenuItem } from "semantic-ui-react";
import TabItem from "../tab-item";
import { DASHBOARD_PATH } from "../../../utils/route-path-constants";
import logo from "../../../images/treeckle-side.png";
import { Link } from "react-router-dom";

type Props = {
  onTabClick?: () => void;
};

function LogoTab({ onTabClick }: Props) {
  return (
    <MenuItem>
      <Image
        as={Link}
        to={DASHBOARD_PATH}
        onClick={onTabClick}
        src={logo}
        alt="Treeckle"
        size="small"
      />
    </MenuItem>
  );
}

export default LogoTab;