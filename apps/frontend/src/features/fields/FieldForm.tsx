import { Card, Checkbox, Collapse, Flex, Form, Input, Select } from "antd";
import { FieldTypeEnum } from "./field.type";
import CostInput from "../../components/formComponents/CostInput";
import CreateList from "../../components/formComponents/CreateList";
import SubfieldForm from "./SubfieldForm";
import OptionForm from "./options/OptionForm";
import ConditionalFormItem from "../../components/formComponents/DependentItem";

export default function FieldForm(field) {
  return (
    <>
      <Flex gap={16}>
        <Form.Item
          name={[field.name, "label"]}
          label="Label"
          required
          rules={[{ required: true, message: "Field Label is required" }]}
        >
          <Input placeholder="Field Label" />
        </Form.Item>

        <Form.Item
          name={[field.name, "type"]}
          label="Field Type"
          required
          rules={[{ required: true, message: "Field Type is required" }]}
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
        >
          <Checkbox />
        </Form.Item>
      </Flex>

      <ConditionalFormItem
        dependency={["fields", field.name, "type"]}
        shouldRender={(type) =>
          type === FieldTypeEnum.CheckBox ||
          type === FieldTypeEnum.MultiResponse
        }
      >
        <Form.Item name={[field.name, "cost"]} label="Cost">
          <CostInput />
        </Form.Item>
      </ConditionalFormItem>

      <ConditionalFormItem
        dependency={["fields", field.name, "type"]}
        shouldRender={(type) => type === FieldTypeEnum.Select}
      >
        <Collapse
          items={[
            {
              key: "1",
              label: "Options",
              children: (
                <CreateList
                  name={[field.name, "options"]}
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

      <ConditionalFormItem
        dependency={["fields", field.name, "type"]}
        shouldRender={(type) =>
          type === FieldTypeEnum.Composite ||
          type === FieldTypeEnum.MultiResponse
        }
      >
        <Collapse
          items={[
            {
              key: "1",
              label: "Subfields",
              children: (
                <CreateList
                  name={[field.name, "subfields"]}
                  buttonLabel={"Add Subfield"}
                  title={"Subfield"}
                  card={true}
                >
                  <SubfieldForm parent={field} />
                </CreateList>
              ),
            },
          ]}
        />
      </ConditionalFormItem>
    </>
  );
}
