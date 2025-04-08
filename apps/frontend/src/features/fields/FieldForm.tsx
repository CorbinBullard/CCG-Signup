import { Checkbox, Flex, Form, Input, Select } from "antd";
import { FieldTypeEnum } from "./field.type";
import CostInput from "../../components/CostInput";
import CreateList from "../../components/CreateList";
import SubfieldForm from "./SubfieldForm";
import OptionForm from "./options/OptionForm";

export default function FieldForm(field) {
  return (
    <>
      <Flex gap={16}>
        <Form.Item name={[field.name, "label"]} label="Label" required>
          <Input placeholder="Field Label" />
        </Form.Item>

        <Form.Item
          name={[field.name, "type"]}
          label="Field Type"
          required
          initialValue={FieldTypeEnum.Text}
        >
          <Select
            options={Object.entries(FieldTypeEnum).map((type) => {
              return { label: type[0], value: type[1] };
            })}
          />
        </Form.Item>

        <Form.Item
          name={[field.name, "required"]}
          label="Required"
          valuePropName="checked"
          initialValue={true}
        >
          <Checkbox />
        </Form.Item>
      </Flex>

      <Form.Item dependencies={[["fields", field.name, "type"]]}>
        {({ getFieldValue }) => {
          const type = getFieldValue(["fields", field.name, "type"]);
          if (
            type === FieldTypeEnum.CheckBox ||
            type === FieldTypeEnum.MultiResponse
          ) {
            return (
              <Form.Item name={[field.name, "cost"]} label="Cost">
                <CostInput />
              </Form.Item>
            );
          } else return null;
        }}
      </Form.Item>
      <Form.Item dependencies={[["fields", field.name, "type"]]}>
        {({ getFieldValue }) => {
          const type = getFieldValue(["fields", field.name, "type"]);
          if (type === FieldTypeEnum.Select) {
            return (
              <Form.Item label="Options">
                <CreateList
                  name={[field.name, "options"]}
                  buttonLabel={"Add Option"}
                >
                  <OptionForm />
                </CreateList>
              </Form.Item>
            );
          }
        }}
      </Form.Item>
      <Form.Item dependencies={[["fields", field.name, "type"]]}>
        {({ getFieldValue }) => {
          const type = getFieldValue(["fields", field.name, "type"]);
          if (
            type === FieldTypeEnum.Composite ||
            type === FieldTypeEnum.MultiResponse
          ) {
            return (
              <Form.Item label="Subfields">
                <CreateList
                  name={[field.name, "subfields"]}
                  buttonLabel={"Add Subfield"}
                >
                  <SubfieldForm />
                </CreateList>
              </Form.Item>
            );
          }
        }}
      </Form.Item>
    </>
  );
}
