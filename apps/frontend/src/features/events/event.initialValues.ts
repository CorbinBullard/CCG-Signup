import { FieldTypeEnum } from "../fields/field.type";

export const createEventInitialValues = {
  title: "",
  description: "",
  date: "",
  image: null,
  time: "",
  cost: 0,
  form: {
    isSaved: false,
    name: "",
    fields: [{ label: "", type: FieldTypeEnum.Text, required: true }],
  },
};
