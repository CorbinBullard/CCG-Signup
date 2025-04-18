import { Checkbox, Form, Input, Splitter } from "antd";
import { useEffect } from "react";
import FieldForm from "../fields/FieldForm";
import CreateList from "../../components/formComponents/CreateList";
import ConditionalFormItem from "../../components/formComponents/DependentItem";
import PreviewForm from "./preview/PreviewForm";
import { FieldTypeEnum } from "../fields/field.type";

// FormForm.tsx
function FormForm({
  initialValues = {
    name: "",
    isSaved: false,
    fields: [{ label: "", type: FieldTypeEnum.Text, required: true }],
  },
  onChange,
  preview = true,
  form = null,
}) {
  const [newForm] = Form.useForm();

  // When any field changes, update the parent
  const handleChange = () => {
    const allValues = newForm.getFieldsValue(true);
    onChange?.(allValues);
  };

  useEffect(() => {
    newForm.setFieldsValue(initialValues);
  }, [initialValues]);

  return (
    <Form
      form={form || newForm}
      layout="vertical"
      initialValues={initialValues}
      onValuesChange={handleChange}
    >
      {/* Same body as before, just nesting under form removed now */}
      <Form.Item name="isSaved" label="Save Form" valuePropName="checked">
        <Checkbox />
      </Form.Item>

      <ConditionalFormItem
        dependency="isSaved"
        shouldRender={(isSaved) => isSaved}
      >
        <Form.Item name="name" label="Form Name" required>
          <Input placeholder="Form Name" />
        </Form.Item>
      </ConditionalFormItem>

      <Splitter>
        <Splitter.Panel min={500}>
          <CreateList
            name={"fields"}
            buttonLabel="Add Field"
            title={"Field"}
            card={true}
            initialValue={{ label: "", type: "text", required: true }}
          >
            <FieldForm />
          </CreateList>
        </Splitter.Panel>
        <Splitter.Panel collapsible>
          <Form.Item noStyle>
            {preview && <PreviewForm form={form} />}
          </Form.Item>
        </Splitter.Panel>
      </Splitter>
    </Form>
  );
}

export default FormForm;
