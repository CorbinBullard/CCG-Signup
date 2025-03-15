import { FieldType } from '../fields/FieldType';

export type ResponseType = {
  id?: number;
  value: any;
  field?: FieldType;
  fieldId?: number;
};
