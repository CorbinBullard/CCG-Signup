import { Form, Input } from "antd";

import { FieldTypeEnum } from "../fields/field.type";
import TextField from "./FieldTypes/TextField";
import NumberField from "./FieldTypes/NumberField";
import SelectField from "./FieldTypes/SelectField";
import CheckboxField from "./FieldTypes/SwitchField";
import DateField from "./FieldTypes/DateField";
import EmailField from "./FieldTypes/EmailField";
import { Options } from "../fields/options/option.type";
import { SubField } from "../fields/field.type";
import CompositeField from "./FieldTypes/CompositeField";
import MultiResponseField from "./FieldTypes/MultiResponseField";

export default function ResponseItemForm(props: {
  label: string;
  type: FieldTypeEnum;
  options?: Options;
  required?: boolean;
  subfields?: SubField[];
  [key: string]: any;
  index: number;
  id: number;
}) {
  return (
    <>
      {(() => {
        switch (props.type) {
          case FieldTypeEnum.Text:
            return <TextField {...props} />;
          case FieldTypeEnum.Number:
            return <NumberField {...props} />;
          case FieldTypeEnum.Select:
            return <SelectField {...props} />;
          case FieldTypeEnum.Switch:
            return <CheckboxField {...props} />;
          case FieldTypeEnum.Date:
            return <DateField {...props} />;
          case FieldTypeEnum.Email:
            return <EmailField {...props} />;
          case FieldTypeEnum.Composite:
            return <CompositeField {...props} />;
          case FieldTypeEnum.MultiResponse:
            return <MultiResponseField {...props} />;
          default:
            return (
              <Input placeholder="Unknown field type" disabled type="error" />
            );
        }
      })()}
    </>
  );
}
