import { Form, Input } from "antd";
import { useSavedForms } from "./hooks/useSavedForms";

export default function FormNameItem({ name, ...props }) {
  const { data: savedForms } = useSavedForms({});
  const currentName = Form.useFormInstance().getFieldValue("name");
  const formNamesLookup = savedForms?.reduce((acc, curr) => {
    if (currentName !== curr.name) acc[curr.name] = true;
    return acc;
  }, {});
  return (
    <Form.Item
      {...props}
      name={name}
      label="Form Name"
      required
      layout="vertical"
      style={{ flex: 3 }}
      rules={[
        {
          validator: (_, value) => {
            if (!value) return Promise.reject(new Error("Name is required"));
            if (formNamesLookup[value]) {
              return Promise.reject(
                new Error(`Form with name ${value} already exsists`)
              );
            }
            return Promise.resolve();
          },
        },
      ]}
    >
      <Input placeholder="Form Name" />
    </Form.Item>
  );
}
