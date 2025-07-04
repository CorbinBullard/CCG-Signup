import { Options } from "./options/option.type";
export enum SubFieldTypeEnum {
  Text = "string",
  Number = "number",
  Switch = "boolean",
  Date = "date",
  Email = "email",
  Select = "select",
}

export enum FieldTypeEnum {
  Text = "string",
  Number = "number",
  Switch = "boolean",
  Date = "date",
  Email = "email",
  Select = "select",
  Composite = "composite",
  MultiResponse = "multiResponse",
}

export type Field = {
  id?: number;
  label: string;
  type: FieldTypeEnum;
  required: boolean;
  cost?: number;
  options?: Options;
  subfields?: SubField[];
};


export type SubField = {
  label: string;
  type: SubFieldTypeEnum;
  required: boolean;
  cost?: number;
  options?: Options;
};
