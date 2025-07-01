import { Checkbox, Collapse, Flex, Form, Input, Select } from "antd";
import { FieldTypeEnum, SubFieldTypeEnum } from "./field.type";
import CostInput from "../../components/formComponents/CostInput";
import CreateList from "../../components/formComponents/CreateList";
import OptionForm from "./options/OptionForm";
import ConditionalFormItem from "../../components/formComponents/DependentItem";

export default function SubfieldForm(subfield) {
  const { parent } = subfield;
  return (
    <>
      <Flex gap={16}>
        <Form.Item name={[subfield.name, "label"]} label="Label" required>
          <Input placeholder="Field Label" />
        </Form.Item>

        <Form.Item
          name={[subfield.name, "type"]}
          label="Field Type"
          required
          initialValue={FieldTypeEnum.Text}
        >
          <Select
            options={Object.entries(SubFieldTypeEnum).map((type) => {
              return { label: type[0], value: type[1] };
            })}
          />
        </Form.Item>

        <Form.Item
          name={[subfield.name, "required"]}
          label="Required"
          valuePropName="checked"
          initialValue={true}
        >
          <Checkbox />
        </Form.Item>
      </Flex>

      <ConditionalFormItem
        dependency={["fields", parent.name, "subfields", subfield.name, "type"]}
        shouldRender={(type: SubFieldTypeEnum) =>
          type === SubFieldTypeEnum.Switch
        }
      >
        <Form.Item name={[subfield.name, "cost"]} label="Cost">
          <CostInput />
        </Form.Item>
      </ConditionalFormItem>

      <ConditionalFormItem
        dependency={["fields", parent.name, "subfields", subfield.name, "type"]}
        shouldRender={(type) => type === SubFieldTypeEnum.Select}
      >
        <Collapse
          items={[
            {
              key: "1",
              label: "Options",
              children: (
                <CreateList
                  name={[subfield.name, "options"]}
                  buttonLabel={"Add Option"}
                  title={"Option"}
                >
                  <OptionForm />
                </CreateList>
              ),
            },
          ]}
        />
      </ConditionalFormItem>
    </>
  );
}
