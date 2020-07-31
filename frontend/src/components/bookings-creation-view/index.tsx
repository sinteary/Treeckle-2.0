import React from "react";
import { Grid } from "semantic-ui-react";
import BookingsSelectVenueCard from "../bookings-select-venue-card";

function BookingsCreationView() {
  return (
    <Grid columns="3" centered stackable stretched>
      <Grid.Column>
        <BookingsSelectVenueCard />
      </Grid.Column>
      <Grid.Column>
        <BookingsSelectVenueCard />
      </Grid.Column>
      <Grid.Column>
        <BookingsSelectVenueCard />
      </Grid.Column>
    </Grid>
  );
}

export default BookingsCreationView;
