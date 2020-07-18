import React from "react";
import TabItem from "../tab-item";
import { EVENTS_PATH } from "../../../utils/route-path-constants";

type Props = {
  onTabClick?: () => void;
};

function EventsTab({ onTabClick }: Props) {
  return (
    <TabItem
      label="Events"
      redirectPath={EVENTS_PATH}
      onTabClick={onTabClick}
    />
  );
}

export default EventsTab;
