export type VenueFieldType = "text" | "text-area" | "boolean" | "number";

export type VenueField = {
  fieldLabel: string;
  placeholder: string;
  type: VenueFieldType;
  isRequired: boolean;
};
