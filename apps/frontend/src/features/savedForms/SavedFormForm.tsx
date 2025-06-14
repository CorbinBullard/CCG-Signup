import {
  Flex,
  Form,
  FormInstance,
  Input,
  Select,
  Splitter,
  Typography,
} from "antd";
import CreateList from "../../components/formComponents/CreateList.tsx";
import { FieldTypeEnum } from "../fields/field.type.ts";
import FieldForm from "../fields/FieldForm.tsx";
import PreviewForm from "../forms/preview/PreviewForm.tsx";
import FormNameItem from "./FormNameItem.tsx";
import UniqueNameField from "../../components/formComponents/UniqueField.tsx";
import { useSavedForms } from "./hooks/useSavedForms.ts";

export default function SavedFormForm({
  form,
  preview = true,
  ...props
}: {
  form: FormInstance;
  preview?: boolean;
}) {
  return (
    <>
      <Flex gap={16}>
        <UniqueNameField
          label={"Name"}
          name={"name"}
          getItemsQueryFn={useSavedForms}
        />
      </Flex>
      <Splitter>
        <Splitter.Panel min={500}>
          <CreateList
            name={"fields"}
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
            <FieldForm mode={"edit"} />
          </CreateList>
        </Splitter.Panel>
        <Splitter.Panel collapsible>
          <Form.Item noStyle>
            {preview && <PreviewForm form={form} mode={"edit"} />}
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
