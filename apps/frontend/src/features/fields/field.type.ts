import { Options } from "./options/option.type";

export enum FieldTypeEnum {
  Text = 'string',
  Number = 'number',
  CheckBox = 'boolean',
  Date = 'date',
  Email = 'email',
  Select = 'select',
  Composite = 'composite',
  MultiResponse = 'multiResponse',
}

export type Field = {
  label: string;
  type: FieldTypeEnum;
  required: boolean;
  cost?: number;
  options?: Options;
  subfields?: Field[];
}
  