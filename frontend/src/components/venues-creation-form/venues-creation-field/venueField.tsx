import { type } from "os";
import React, { useState } from "react";
import { Form, Icon, Input, Radio, Card, Dropdown } from "semantic-ui-react";
import { VenueField, VenueFieldType } from "./venue-field-types";

type Props = {
  field: VenueField;
  index: number;
  editField: (index: number, changedField: string, value: any) => void;
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
    text: "Checkbox",
    icon: "check square outline",
  },
];

function VenueFieldInput(props: Props) {
  let field = props.field;
  let index = props.index;

  return (
    <>
      <Card style={{ width: 600 }}>
        <Card.Content>
          <Form>
            <Form.Group>
              <Form.Field>
                <label>Field label</label>
                <Input
                  placeholder="Eg. "
                  value={field.fieldLabel}
                  onChange={(e) => {
                    props.editField(props.index, "fieldLabel", e.target.value);
                  }}
                />
              </Form.Field>
              <Form.Field>
                <label>Form input type</label>
                <Dropdown
                  selection
                  options={typeOptions}
                  value={field.type}
                  onChange={(event, data) => {
                    props.editField(index, "type", data.value);
                  }}
                ></Dropdown>
              </Form.Field>
            </Form.Group>

            <Form.Field>
              <label>Placeholder text</label>
              <Input
                placeholder=""
                value={field.placeholder}
                onChange={(e) => {
                  props.editField(index, "placeholder", e.target.value);
                }}
              />
            </Form.Field>
          </Form>
        </Card.Content>
        <Card.Content>
          <Radio
            toggle
            label="Required"
            checked={field.isRequired}
            onChange={() => {
              props.editField(index, "isRequired", !field.isRequired);
            }}
          ></Radio>
        </Card.Content>
      </Card>
    </>
  );
}

export default VenueFieldInput;
