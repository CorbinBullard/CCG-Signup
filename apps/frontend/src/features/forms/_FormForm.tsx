import {
  Checkbox,
  Form,
  FormInstance,
  Input,
  Splitter,
  Typography,
} from "antd";
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
}: {
  form: FormInstance;
}) {
  const [newForm] = Form.useForm();

  // When any field changes, update the parent
  const handleChange = async () => {
    const allValues = newForm.getFieldsValue(true);
    onChange?.(allValues);
    console.log("VALIDATING?");
    if (!form) {
      const fields = await newForm.validateFields();
      console.log(fields);
    }
  };

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
          {/* <Form.Item name={"fields"}> */}
          <CreateList
            name={"fields"}
            buttonLabel="Add Field"
            title={"Field"}
            card={true}
          >
            <FieldForm />
          </CreateList>
          {/* </Form.Item> */}
        </Splitter.Panel>
        <Splitter.Panel collapsible>
          <Form.Item noStyle>
            {preview && <PreviewForm form={form || newForm} />}
          </Form.Item>
        </Splitter.Panel>
      </Splitter>
      <Form.Item noStyle shouldUpdate>
        {() => (
          <Typography>
            <pre>
              {JSON.stringify(
                form ? form.getFieldsValue() : newForm.getFieldValue(),
                null,
                2
              )}
            </pre>
          </Typography>
        )}
      </Form.Item>
    </Form>
  );
}

export default FormForm;
