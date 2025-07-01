// GenericFieldForm.tsx
import { Collapse, Flex, Form, Input, Select, Switch } from "antd";
import { FieldTypeEnum, SubFieldTypeEnum } from "./field.type";
import CostInput from "../../components/formComponents/CostInput";
import CreateList from "../../components/formComponents/CreateList";
import OptionForm from "./options/OptionForm";
import ConditionalFormItem from "../../components/formComponents/DependentItem";

interface GenericFieldFormProps {
  name?: number;
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
  const form = Form.useFormInstance();

  const getName = (fieldName: (string | number)[]) => {
    return mode === "create" ? ["form", ...fieldName] : fieldName;
  };

  const typeEnum = isSubfield ? SubFieldTypeEnum : FieldTypeEnum;

  const handleTypeChange = () => {
    const fieldsPath =
      mode === "create" ? ["form", "fields", name] : ["fields", name];
    form.setFields([
      { name: [...fieldsPath, "subfields"], value: undefined },
      { name: [...fieldsPath, "options"], value: undefined },
    ]);
  };
  console.log("NAME: ", name)
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
            onChange={handleTypeChange}
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
              forceRender: true,
              children: (
                <CreateList
                  name={[name, "options"]}
                  buttonLabel="Add Option"
                  title="Option"
                  required
                  rules={[
                    {
                      validator: async (_: never, options) => {
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
                forceRender: true,
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
                          // Get the field type from the form instance
                          const type = form.getFieldValue(
                            getName(["fields", name, "type"])
                          );
                          if (type === FieldTypeEnum.Composite) {
                            if (!subfields || subfields.length < 2) {
                              return Promise.reject(
                                new Error(
                                  "At least 2 Subfields are required for Composite Field"
                                )
                              );
                            }
                          } else if (type === FieldTypeEnum.MultiResponse) {
                            if (!subfields || subfields.length < 1) {
                              return Promise.reject(
                                new Error(
                                  "At least 1 Subfield is required for MultiResponse Field"
                                )
                              );
                            }
                          }
                        },
                      },
                      {
                        validator: async (_, subfields) => {
                          if (!subfields || !subfields.length) return;
                          const hasRequired = subfields.some(
                            (subfield) => subfield.required
                          );
                          console.log(hasRequired);
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
