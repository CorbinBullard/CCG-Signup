import { Field, FieldTypeEnum, SubField } from "../fields/field.type";

export const signupDefaultValues = (fields: Field[] | SubField[]) => {
  console.log(fields);
  return {
    note: "",
    responses: fields.map((field) => {
      let value = null;
      switch (field.type) {
        case FieldTypeEnum.Switch: {
          value = false;
          break;
        }
        default: {
          value = null;
        }
      }
      return { fieldId: field.id, value };
    }),
  };
};
