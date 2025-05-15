import {
  Checkbox,
  Flex,
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

  return (
    <>
      {/* Same body as before, just nesting under form removed now */}
      <Flex gap={4}>
        <Form.Item
          name={getName("isSaved")}
          label="Save Form"
          valuePropName="checked"
          layout="horizontal"
          style={{ flex: 1 }}
        >
          <Checkbox />
        </Form.Item>

        <ConditionalFormItem
          dependency={getName("isSaved")}
          shouldRender={(isSaved) => isSaved}
        >
          <Form.Item
            name={getName("name")}
            label="Form Name"
            required
            layout="horizontal"
            style={{ flex: 3 }}
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
