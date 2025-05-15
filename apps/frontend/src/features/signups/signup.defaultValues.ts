import { Field, FieldTypeEnum } from "../fields/field.type";

export const signupDefaultValues = (fields: Field[]) => {
  return {
    note: "",
    responses: fields.map((field) => {
      let value = null;
      if (field.type === FieldTypeEnum.CheckBox) value = false;
      return { fieldId: field.id, value };
    }),
  };
};
