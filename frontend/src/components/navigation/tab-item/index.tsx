import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MenuItem } from "semantic-ui-react";

type Props = {
  label: React.ReactNode;
  redirectPath: string;
  onTabClick?: () => void;
};

function TabItem({ label, redirectPath, onTabClick }: Props) {
  const location = useLocation();

  return (
    <MenuItem
      as={Link}
      to={redirectPath}
      active={location.pathname === redirectPath}
      content={label}
      onClick={onTabClick}
    />
  );
}

export default TabItem;
