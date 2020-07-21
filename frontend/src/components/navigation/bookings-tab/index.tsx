import React from "react";
import TabItem from "../tab-item";
import { BOOKINGS_PATH } from "../../../routes";

type Props = {
  onTabClick?: () => void;
};

function BookingsTab({ onTabClick }: Props) {
  return (
    <TabItem
      label="Bookings"
      redirectPath={BOOKINGS_PATH}
      onTabClick={onTabClick}
    />
  );
}

export default BookingsTab;
