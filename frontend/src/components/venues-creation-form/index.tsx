import React, { useState } from "react";
import {
  Button,
  Icon,
  Card,
  Form,
  Input,
  Dropdown,
  Container,
  Ref,
} from "semantic-ui-react";
import {
  VenueField,
  VenueFieldType,
} from "./venues-creation-field/venue-field-types";
import VenueFieldInput from "./venues-creation-field/venueField";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function VenueCreationForm() {
  const [venueName, setVenueName] = useState("");
  //fetch categories
  const [category, setCategory] = useState("");
  const [recommendedCapacity, setRecommendedCapacity] = useState<number>();
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactNumber, setContactNumber] = useState<number>();
  const [fields, setFields] = useState<VenueField[]>([]);

  const addNewField = () => {
    let newFields: VenueField[] = fields.concat([
      {
        fieldLabel: "",
        placeholder: "",
        isRequired: false,
        type: "text",
      },
    ]);
    setFields(newFields);
  };

  const editField = (index: number, changedField: string, value: any) => {
    let currentFields = [...fields];
    let editedField = { ...currentFields[index] };
    switch (changedField) {
      case "fieldLabel":
        editedField.fieldLabel = value;
        break;
      case "placeholder":
        editedField.placeholder = value;
        break;
      case "type":
        editedField.type = value;
        break;
      case "isRequired":
        editedField.isRequired = value;
        break;
      default:
        return;
    }
    console.log(editedField);
    currentFields.splice(index, 1, editedField);
    setFields(currentFields);
  };

  const onDragEnd = (result: any) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }
    if (destination.index === source.index) {
      return;
    }

    let src = source.index;
    let dest = destination.index;

    let fieldsCopy = [...fields];
    const moved = { ...fieldsCopy[src] };
    fieldsCopy.splice(src, 1);
    fieldsCopy.splice(dest, 0, moved);
    setFields(fieldsCopy);
  };

  return (
    <>
      <div>
        <h1>Create a New Venue</h1>
        <Card style={{ width: "100%" }}>
          <Card.Content>
            <Card.Header>Venue Details</Card.Header>
            <Card.Meta>Please fill in the details for the new venue</Card.Meta>
            <Card.Description>
              <Form>
                <Form.Field inline>
                  <label>Venue name</label>
                  <Input
                    placeholder="Eg. The Flying Seed"
                    value={venueName}
                    onChange={(e) => {
                      setVenueName(e.target.value);
                    }}
                  />
                </Form.Field>
                <Form.Field inline>
                  <label>Category</label>
                </Form.Field>
                <Form.Field inline>
                  <label>Recommended capacity</label>
                  <Input
                    placeholder="Eg. 50"
                    value={recommendedCapacity == 0 ? "" : recommendedCapacity}
                    type="number"
                    onChange={(event) => {
                      let value = parseInt(event.target.value);
                      if (value >= 0) setRecommendedCapacity(value);
                      if (isNaN(value)) setRecommendedCapacity(0);
                    }}
                  />
                </Form.Field>
                <Form.Field inline>
                  <label>Contact Name</label>
                  <Input
                    value={contactName}
                    onChange={(e) => {
                      setContactName(e.target.value);
                    }}
                  />
                </Form.Field>
                <Form.Field inline>
                  <label>Contact Email</label>
                  <Input
                    value={contactEmail}
                    onChange={(e) => {
                      setContactEmail(e.target.value);
                    }}
                  />
                </Form.Field>
                <Form.Field inline>
                  <label>Contact number</label>
                  <Input
                    value={contactNumber == 0 ? "" : contactNumber}
                    onChange={(event) => {
                      let value = parseInt(event.target.value);
                      if (value >= 0) setContactNumber(value);
                      if (isNaN(value)) setContactNumber(0);
                    }}
                  />
                </Form.Field>
              </Form>
            </Card.Description>
          </Card.Content>
          <Card.Content>
            <Card.Header>Additional Details</Card.Header>
            <Card.Meta>
              Add fields for many additional details that you would require from
              users who book the venue
            </Card.Meta>
            <Card.Description>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId={"fieldsList"}>
                  {(provided) => (
                    <Ref innerRef={provided.innerRef}>
                      <Form {...provided.droppableProps}>
                        {fields.length
                          ? fields.map((field, index) => {
                              return (
                                <Draggable
                                  key={index}
                                  draggableId={index.toString()}
                                  index={index}
                                >
                                  {(provided) => (
                                    <Ref innerRef={provided.innerRef}>
                                      <Container
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        <VenueFieldInput
                                          key={index}
                                          field={field}
                                          index={index}
                                          editField={editField}
                                        />
                                      </Container>
                                    </Ref>
                                  )}
                                </Draggable>
                              );
                            })
                          : null}
                        {provided.placeholder}
                      </Form>
                    </Ref>
                  )}
                </Droppable>
              </DragDropContext>

              <Button
                icon
                labelPosition="right"
                style={{ float: "right" }}
                onClick={addNewField}
              >
                Add a new field
                <Icon name="plus" />
              </Button>
            </Card.Description>
          </Card.Content>
          <Card.Content>
            <Button>Create venue</Button>
          </Card.Content>
        </Card>
      </div>
    </>
  );
}

export default VenueCreationForm;
