import { Field } from "../fields/field.type";

export type Form = {
  name?: string;
  fields: Field[];
};
