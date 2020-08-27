import React, { useEffect, useState } from "react";
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
import { VenueField } from "../venues-field-editor/venue-field-types";
import VenueFieldEditor from "../venues-field-editor/venueFieldEditor";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./index.scss";

const sampleCategories = [
  {
    id: 1,
    name: "Seminar Room",
  },
  {
    id: 2,
    name: "Lounge",
  },
  {
    id: 3,
    name: "Classroom",
  },
];

type Option = {
  key: number;
  text: string;
  value: any;
};

function VenueCreationForm() {
  const [venueName, setVenueName] = useState("");
  // fetch categories and set options for dropdown
  const [existingCategories, setExistingCategories] = useState<Option[]>([]);
  // TODO: configure typescript for Category type
  const [category, setCategory] = useState<any>();
  const [recommendedCapacity, setRecommendedCapacity] = useState<number>();
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactNumber, setContactNumber] = useState<number>();
  const [fields, setFields] = useState<VenueField[]>([]);

  useEffect(() => {
    //fetch category options, massage data to fit dropdown options
    let categoryOptions = sampleCategories.map((category) => {
      return {
        key: category.id,
        text: category.name,
        value: category,
      };
    });
    setExistingCategories(categoryOptions);
  }, []);

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

  const removeField = (index: number) => {
    let currentFields = [...fields];
    currentFields.splice(index, 1);
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
              <div className="default-fields">
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
                    <Dropdown
                      style={{
                        float: "left",
                        marginBottom: "10px",
                        width: "200px",
                      }}
                      clearable
                      fluid
                      selection
                      options={existingCategories}
                      value={category}
                      onChange={(event, data) => {
                        setCategory(data.value);
                      }}
                    ></Dropdown>
                  </Form.Field>
                  <Form.Field inline>
                    <label>Recommended capacity</label>
                    <Input
                      placeholder="Eg. 50"
                      value={
                        recommendedCapacity == 0 ? "" : recommendedCapacity
                      }
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
              </div>
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
                                        // {...provided.dragHandleProps}
                                      >
                                        <VenueFieldEditor
                                          dragHandle={provided.dragHandleProps}
                                          key={index}
                                          field={field}
                                          index={index}
                                          editField={editField}
                                          removeField={removeField}
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
