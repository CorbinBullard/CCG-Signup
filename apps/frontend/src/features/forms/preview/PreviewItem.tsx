import {
  Card,
  Checkbox,
  DatePicker,
  Empty,
  Flex,
  Form,
  Input,
  InputNumber,
  Select,
  Tag,
  Typography,
} from "antd";
import { FieldTypeEnum } from "../../fields/field.type";
import CreateList from "../../../components/formComponents/CreateList";

export default function PreviewItem({
  label,
  type,
  options,
  required,
  subfields,
  ...rest
}) {
  return (
    <Form.Item
      {...rest}
      label={label}
      required={required}
      shouldUpdate
      style={{ width: "100%" }}
    >
      {() => {
        switch (type) {
          case FieldTypeEnum.Text:
            return <TextField />;
          case FieldTypeEnum.Number:
            return <NumberField />;
          case FieldTypeEnum.Select:
            return <SelectField options={options} />;
          case FieldTypeEnum.Switch:
            return <CheckboxField />;
          case FieldTypeEnum.Date:
            return <DateField />;
          case FieldTypeEnum.Email:
            return <EmailField />;
          case FieldTypeEnum.Composite:
            return <CompositeField subfields={subfields} />;
          case FieldTypeEnum.MultiResponse:
            return <MultiResponseField title={label} subfields={subfields} />;
          default:
            return null;
        }
      }}
    </Form.Item>
  );
}

const TextField = () => <Input />;
const NumberField = () => <InputNumber style={{ width: "100%" }} />;

const SelectField = ({ options }) => {
  const optionobj = options
    ? options.map((option) => {
        return option
          ? {
              label: option.label,
              value: option.label,
              cost: option.cost,
            }
          : { label: "", value: "", cost: "" };
      })
    : [];

  return (
    <Select
      options={optionobj}
      optionRender={(option) => {
        return option ? (
          <Flex gap={8}>
            <Typography.Text>{option.label}</Typography.Text>
            {option.data.cost && <Tag>+${option.data.cost || null}</Tag>}
          </Flex>
        ) : (
          <Empty />
        );
      }}
    />
  );
};
const CheckboxField = () => <Checkbox />;
const DateField = () => <DatePicker />;
const EmailField = () => <Input type="email" />;
const CompositeField = ({ subfields }) => {
  return (
    <Flex gap={4}>
      {subfields &&
        subfields.map((subfield) => {
          return <PreviewItem {...subfield} />;
        })}
    </Flex>
  );
};
const MultiResponseField = ({ subfields, title }) => {
  return (
    <Card>
      <CreateList buttonLabel={`+ ${title}`} title={"Subfield"} name={title}>
        <CompositeField subfields={subfields} />
      </CreateList>
    </Card>
  );
};
