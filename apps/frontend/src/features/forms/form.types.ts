import { Field } from "../fields/field.type";

export type Form = {
  id?: number;
  name?: string;
  isSaved: boolean;
  fields: Field[];
};
