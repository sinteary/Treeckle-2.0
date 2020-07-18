import React, { useState } from "react";
import { Accordion, MenuItem, Label } from "semantic-ui-react";
import TabItem from "../tab-item";
import {
  ADMIN_BOOKINGS_PATH,
  ADMIN_USERS_PATH,
  ADMIN_SETTINGS_PATH,
} from "../../../utils/route-path-constants";

type Props = {
  onTabClick?: () => void;
};

function MobileAdminTab({ onTabClick }: Props) {
  const [isExpanded, setExpanded] = useState(false);

  return (
    <Accordion as={MenuItem} fitted="vertically">
      <Accordion.Title
        onClick={() => setExpanded(!isExpanded)}
        active={isExpanded}
      >
        Admin <Label content={0} color="red" size="small" />
      </Accordion.Title>

      <Accordion.Content active={isExpanded}>
        <TabItem
          label="Bookings"
          redirectPath={ADMIN_BOOKINGS_PATH}
          onTabClick={onTabClick}
        />
        <TabItem
          label="Users"
          redirectPath={ADMIN_USERS_PATH}
          onTabClick={onTabClick}
        />
        <TabItem
          label="Settings"
          redirectPath={ADMIN_SETTINGS_PATH}
          onTabClick={onTabClick}
        />
      </Accordion.Content>
    </Accordion>
  );
}

export default MobileAdminTab;
