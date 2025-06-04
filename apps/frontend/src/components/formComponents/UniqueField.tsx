import { Form, Input } from "antd";
import React from "react";
import { useSavedForms } from "./hooks/useSavedForms";

export default function UniqueNameField({ label, name, getItemsQueryFn, ...props }) {
  const { data } = getItemsQueryFn({});
  const currentName = Form.useFormInstance().getFieldValue(name);
  const formFieldLookupObj = data?.reduce((acc, curr) => {
    if (currentName !== curr.name) acc[curr.name] = true;
    return acc;
  }, {});
  return (
    <Form.Item
      {...props}
      name={name}
      label={label}
      required
      layout="vertical"
      style={{ flex: 3 }}
      rules={[
        {
          validator: (_, value) => {
            if (!value) return Promise.reject(new Error(`${label} is required`));
            if (formFieldLookupObj[value]) {
              return Promise.reject(
                new Error(`${label} with name ${value} already exsists`)
              );
            }
            return Promise.resolve();
          },
        },
      ]}
    >
      <Input placeholder={`${label}`} />
    </Form.Item>
  );
}
