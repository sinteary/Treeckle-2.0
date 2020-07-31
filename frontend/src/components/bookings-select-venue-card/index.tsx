import React from "react";
import { Card, Accordion } from "semantic-ui-react";

const data = [
  {
    category: "Common Lounge",
    venues: [
      {
        id: 312312,
        name: "Flying Seed",
        recommendedCapacity: 100,
        contactName: "Anna",
        contactEmail: "anna@treeckle.com",
        contactNumber: "81217123",
        placeholderText: "Please input your reason for booking...",
      },
    ],
  },
];

function BookingsSelectVenueCard() {
  return (
    <Card raised centered fluid>
      <Card.Content>
        <Card.Header textAlign="center">Select a venue</Card.Header>
      </Card.Content>

      <Card.Content>
        <Accordion fluid />
      </Card.Content>
    </Card>
  );
}

export default BookingsSelectVenueCard;
