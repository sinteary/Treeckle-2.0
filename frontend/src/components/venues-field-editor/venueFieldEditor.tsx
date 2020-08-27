import React, { useState } from "react";
import {
  Form,
  Icon,
  Input,
  Radio,
  Card,
  Dropdown,
  Button,
  TextArea,
} from "semantic-ui-react";
import { VenueField } from "./venue-field-types";
import "./index.scss";

type Props = {
  field: VenueField;
  index: number;
  editField: (index: number, changedField: string, value: any) => void;
  removeField: (index: number) => void;
  dragHandle: any;
};

const typeOptions = [
  {
    key: "text",
    value: "text",
    text: "Short answer",
    icon: "minus",
  },
  { key: "text-area", value: "text-area", text: "Long answer", icon: "bars" },
  { key: "number", value: "number", text: "Number", icon: "sort numeric down" },
  {
    key: "boolean",
    value: "boolean",
    text: "Yes / No",
    icon: "radio",
  },
];

function VenueFieldEditor(props: Props) {
  let field = props.field;
  let index = props.index;

  return (
    <>
      <div style={{ padding: 10 }}>
        <Card
          color={field.fieldLabel == "" ? "red" : "teal"}
          style={{ width: 600 }}
        >
          <Card.Content style={{ padding: "0px" }}>
            <div
              className="card-left-elements"
              style={{ padding: "10px 15px 10px 15px" }}
            >
              <p>{index + 1}</p>
            </div>
            <div className="card-left-elements" style={{ width: "25%" }}>
              <Dropdown
                fluid
                style={{ border: "0px" }}
                selection
                options={typeOptions}
                value={field.type}
                onChange={(event, data) => {
                  props.editField(index, "type", data.value);
                }}
              ></Dropdown>
            </div>

            <div {...props.dragHandle} className="drag-button">
              <Icon name="braille"></Icon>
            </div>
          </Card.Content>
          <Card.Content>
            <Form>
              <Form.Field>
                <label>Field label</label>
                <Input
                  placeholder="Required"
                  value={field.fieldLabel}
                  onChange={(e) => {
                    props.editField(props.index, "fieldLabel", e.target.value);
                  }}
                />
              </Form.Field>

              {field.type == "text-area" ? (
                <Form.Field>
                  <label>Placeholder text</label>
                  <TextArea
                    style={{ minHeight: 60 }}
                    rows={3}
                    placeholder={"Leave blank if none"}
                    value={field.placeholder}
                    onChange={(e, { value }) => {
                      props.editField(index, "placeholder", value);
                    }}
                  />
                </Form.Field>
              ) : null}

              {field.type == "text" || field.type == "number" ? (
                <Form.Field>
                  <label>Placeholder text</label>
                  <Input
                    style={{ width: field.type == "number" ? "50%" : "100%" }}
                    placeholder={"Leave blank if none"}
                    value={field.placeholder}
                    onChange={(e) => {
                      props.editField(index, "placeholder", e.target.value);
                    }}
                  />
                </Form.Field>
              ) : null}

              {field.type == "boolean" ? (
                <div>
                  <Radio
                    label="Yes"
                    checked
                    disabled
                    style={{ marginRight: "20px" }}
                  />
                  <Radio label="No" disabled />
                </div>
              ) : null}
            </Form>
          </Card.Content>
          <Card.Content style={{ padding: "0px" }}>
            <div
              className="card-left-elements"
              style={{ padding: "12.5px 20px 12.5px 15px" }}
            >
              <Radio
                toggle
                label="Required"
                checked={field.isRequired}
                onChange={() => {
                  props.editField(index, "isRequired", !field.isRequired);
                }}
              ></Radio>
            </div>
            <div className="card-right-elements" style={{ padding: "5px" }}>
              <Button
                onClick={() => props.removeField(index)}
                icon
                style={{ backgroundColor: "white", margin: "0px" }}
              >
                <Icon name="trash alternate outline"></Icon>
              </Button>
            </div>
          </Card.Content>
        </Card>
      </div>
    </>
  );
}

export default VenueFieldEditor;
