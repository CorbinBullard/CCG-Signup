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
function FormForm({ form, preview = true, mode = "create", ...props }: { form: FormInstance; mode?: "create" | "edit" }) {
  const getName = (fieldName: string | string[]) => {
    return mode === "create" ? ["form", ...(Array.isArray(fieldName) ? fieldName : [fieldName])] : fieldName;
  };

  return (
    <>
      {/* Same body as before, just nesting under form removed now */}
      <Form.Item
        name={getName("isSaved")}
        label="Save Form"
        valuePropName="checked"
      >
        <Checkbox />
      </Form.Item>

      <ConditionalFormItem
        dependency={getName("isSaved")}
        shouldRender={(isSaved) => isSaved}
      >
        <Form.Item name={getName("name")} label="Form Name" required>
          <Input placeholder="Form Name" />
        </Form.Item>
      </ConditionalFormItem>
      <Splitter>
        <Splitter.Panel min={500}>
          <CreateList
            name={getName("fields")}
            buttonLabel="Add Field"
            title={"Field"}
            card={true}
          >
            <FieldForm />
          </CreateList>
        </Splitter.Panel>
        {/* <Splitter.Panel collapsible>
          <Form.Item noStyle>
            {preview && <PreviewForm form={ } />}
          </Form.Item>
        </Splitter.Panel> */}
      </Splitter>
      {/* <Form.Item noStyle shouldUpdate>
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
      </Form.Item> */}
    </>
  );
}

export default FormForm;
