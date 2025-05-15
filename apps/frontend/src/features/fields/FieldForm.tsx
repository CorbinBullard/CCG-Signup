// GenericFieldForm.tsx

import { Checkbox, Collapse, Flex, Form, Input, Select, Switch } from "antd";
import { FieldTypeEnum, SubFieldTypeEnum } from "./field.type";
import CostInput from "../../components/formComponents/CostInput";
import CreateList from "../../components/formComponents/CreateList";
import OptionForm from "./options/OptionForm";
import ConditionalFormItem from "../../components/formComponents/DependentItem";

interface GenericFieldFormProps {
  name: (string | number)[];
  mode?: "create" | "edit";
  isSubfield?: boolean;
  parentName?: (string | number)[];
}

export default function FieldForm({
  name,
  mode = "create",
  isSubfield = false,
  parentName = [],
}: GenericFieldFormProps) {
  const getName = (fieldName: (string | number)[]) => {
    return mode === "create" ? ["form", ...fieldName] : fieldName;
  };

  const typeEnum = isSubfield ? SubFieldTypeEnum : FieldTypeEnum;

  return (
    <>
      <Flex gap={16}>
        <Form.Item
          name={[name, "label"]}
          label="Label"
          required
          rules={[{ required: true, message: "Field Label is required" }]}
          style={{ flex: 1 }}
        >
          <Input placeholder="Field Label" />
        </Form.Item>

        <Form.Item
          name={[name, "type"]}
          label="Field Type"
          required
          initialValue={isSubfield ? FieldTypeEnum.Text : undefined}
          rules={[{ required: true, message: "Field Type is required" }]}
          style={{ flex: 1 }}
        >
          <Select
            options={Object.entries(typeEnum).map(([key, value]) => ({
              label: key,
              value: value,
            }))}
          />
        </Form.Item>

        <Form.Item
          name={[name, "required"]}
          label="Required"
          valuePropName="checked"
          initialValue={isSubfield ? true : undefined}
          style={{ flex: 1 }}
        >
          <Switch />
        </Form.Item>
      </Flex>

      <ConditionalFormItem
        dependency={
          isSubfield
            ? [...parentName, name, "type"]
            : getName(["fields", name, "type"])
        }
        shouldRender={(type: FieldTypeEnum | SubFieldTypeEnum) =>
          type === FieldTypeEnum.Switch ||
          type === SubFieldTypeEnum.Switch ||
          type === FieldTypeEnum.MultiResponse
        }
      >
        <Form.Item name={[name, "cost"]} label="Cost">
          <CostInput />
        </Form.Item>
      </ConditionalFormItem>

      <ConditionalFormItem
        dependency={
          isSubfield
            ? [...parentName, name, "type"]
            : getName(["fields", name, "type"])
        }
        shouldRender={(type: FieldTypeEnum | SubFieldTypeEnum) =>
          type === FieldTypeEnum.Select || type === SubFieldTypeEnum.Select
        }
      >
        <Collapse
          items={[
            {
              key: "1",
              label: "Options",
              children: (
                <CreateList
                  name={[name, "options"]}
                  buttonLabel="Add Option"
                  title="Option"
                  required
                  rules={[
                    {
                      validator: async (_, options) => {
                        if (!options || options.length < 2) {
                          return Promise.reject(
                            new Error(
                              "At least 2 Options are required for Select Field"
                            )
                          );
                        }
                      },
                    },
                  ]}
                >
                  <OptionForm />
                </CreateList>
              ),
            },
          ]}
        />
      </ConditionalFormItem>

      {!isSubfield && (
        <ConditionalFormItem
          dependency={getName(["fields", name, "type"])}
          shouldRender={(type: FieldTypeEnum) =>
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
                    name={[name, "subfields"]}
                    buttonLabel="Add Subfield"
                    title="Subfield"
                    card={true}
                    required
                    rules={[
                      {
                        validator: async (_, subfields) => {
                          console.log(_, subfields);
                          if (!subfields || subfields.length < 1) {
                            return Promise.reject(
                              new Error(
                                "At least 1 Subfield are required for Composite Field"
                              )
                            );
                          }
                        },
                      },
                      {
                        validator: async (_, subfields) => {
                          const hasRequired = subfields.some(
                            (subfield) => subfield.required
                          );
                          if (!hasRequired) {
                            return Promise.reject(
                              new Error(
                                "At least one Subfield must be marked as required."
                              )
                            );
                          }
                        },
                      },
                    ]}
                  >
                    <FieldForm
                      isSubfield={true}
                      parentName={getName(["fields", name, "subfields"])}
                      name={[]}
                    />
                  </CreateList>
                ),
              },
            ]}
          />
        </ConditionalFormItem>
      )}
    </>
  );
}
