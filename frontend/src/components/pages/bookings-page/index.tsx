import React, { useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import BookingsTable from "../../bookings-table";
import BookingsCreationView from "../../bookings-creation-view";
import "./index.scss";

function BookingsPage() {
  const [isCreating, setCreating] = useState(false);

  return (
    <>
      <Button
        className="bookings-action-button"
        animated="vertical"
        fluid
        color={isCreating ? "red" : "teal"}
        onClick={() => setCreating(!isCreating)}
      >
        <Button.Content
          hidden
          content={
            isCreating ? "Cancel booking creation" : "Create new booking"
          }
        />
        <Button.Content
          visible
          content={<Icon name={isCreating ? "close" : "add"} />}
        />
      </Button>

      {!isCreating && <h1 className="bookings-header">My Bookings</h1>}

      {isCreating ? <BookingsCreationView /> : <BookingsTable />}
    </>
  );
}

export default BookingsPage;
