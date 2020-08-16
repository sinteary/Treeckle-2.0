import React, { useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import VenueCreationForm from "../../venues-creation-form";

function AdminVenuePage() {
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
          content={isCreating ? "Cancel venue creation" : "Create new venue"}
        />
        <Button.Content
          visible
          content={<Icon name={isCreating ? "close" : "add"} />}
        />
      </Button>

      {!isCreating && <h1 className="bookings-header">All Venues</h1>}
      {isCreating && <VenueCreationForm></VenueCreationForm>}
    </>
  );
}

export default AdminVenuePage;
