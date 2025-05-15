import {
  Checkbox,
  Flex,
  Form,
  FormInstance,
  Input,
  Modal,
  Select,
  Splitter,
  Switch,
  Typography,
} from "antd";
import FieldForm from "../fields/FieldForm";
import CreateList from "../../components/formComponents/CreateList";
import ConditionalFormItem from "../../components/formComponents/DependentItem";
import PreviewForm from "./preview/PreviewForm";
import { FieldTypeEnum } from "../fields/field.type";
import { useForms } from "./hooks/useForms";

// FormForm.tsx
function FormForm({
  // form,
  preview = true,
  mode = "create",
  ...props
}: {
  form: FormInstance;
  mode?: "create" | "edit";
}) {
  const getName = (fieldName: string | string[]) => {
    return mode === "create"
      ? ["form", ...(Array.isArray(fieldName) ? fieldName : [fieldName])]
      : fieldName;
  };
  const form = Form.useFormInstance();
  const savedForms = useForms({ isSaved: true }).data || [];

  const handleFormSelect = (id) => {
    const { fields } = savedForms.find((form) => form.id === id);
    const formattedFields = fields.map((field) => ({
      ...field,
      id: undefined,
    }));
    const originalFields = form.getFieldValue(getName("fields"));
    if (originalFields.length > 0) {
      Modal.confirm({
        title: "Overwrite Fields",
        content:
          "This will overwrite the current fields. Do you want to proceed?",
        onOk: () => {
          form.setFieldValue(getName("fields"), formattedFields);
        },
      });
    } else form.setFieldValue(getName("fields"), formattedFields);
  };

  return (
    <>
      {/* Same body as before, just nesting under form removed now */}
      <Flex gap={16}>
        <Flex gap={16}>
          <Form.Item label="Import Form" layout="vertical">
            <Select
              placeholder="Select a Saved Form"
              options={savedForms.map((form) => ({
                label: form.name,
                value: form.id,
                data: form,
              }))}
              optionRender={(option) => {
                return <Typography.Text>{option.label}</Typography.Text>;
              }}
              onChange={handleFormSelect}
            />
          </Form.Item>
          <Form.Item
            name={getName("isSaved")}
            label="Save Form"
            valuePropName="checked"
            layout="vertical"
          >
            <Switch />
          </Form.Item>
        </Flex>

        <ConditionalFormItem
          dependency={getName("isSaved")}
          shouldRender={(isSaved) => isSaved}
        >
          <Form.Item
            name={getName("name")}
            label="Form Name"
            required
            layout="vertical"
            style={{ flex: 3 }}
            rules={[
              {
                required: true,
                message: "Please enter a form name",
              },
            ]}
          >
            <Input placeholder="Form Name" />
          </Form.Item>
        </ConditionalFormItem>
      </Flex>

      <Splitter>
        <Splitter.Panel min={500}>
          <CreateList
            name={getName("fields")}
            buttonLabel="Add Field"
            title={"Field"}
            card={true}
            initialValue={{
              label: "",
              type: FieldTypeEnum.Text,
              required: true,
            }}
            rules={[
              {
                validator: async (_, value) => {
                  // 1. Minimum 1 field
                  if (!Array.isArray(value) || value.length < 1) {
                    throw new Error("You must add at least one field.");
                  }
                  // 2. At least one field is required
                  const hasRequired = value.some((field) => field.required);
                  if (!hasRequired) {
                    throw new Error(
                      "At least one field must be marked as required."
                    );
                  }
                },
              },
            ]}
            required
          >
            <FieldForm mode={mode} />
          </CreateList>
        </Splitter.Panel>
        <Splitter.Panel collapsible>
          <Form.Item noStyle>
            {preview && <PreviewForm form={form} mode={mode} />}
          </Form.Item>
        </Splitter.Panel>
      </Splitter>
      <Form.Item noStyle shouldUpdate>
        {() => (
          <Typography>
            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
          </Typography>
        )}
      </Form.Item>
    </>
  );
}

export default FormForm;
