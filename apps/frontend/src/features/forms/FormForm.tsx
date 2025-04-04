import { Button, Checkbox, Flex, Form, Input, Space, Typography } from "antd";
import React from "react";
import FieldForm from "../fields/FieldForm";
import CreateFieldsList from "../fields/CreateFieldsList";

function FormForm({ onSubmit, form, initalValues }) {
  const handleChange = (values) => {
    console.log("Form values: ", form.getFieldsValue());
  };
  return (
    <Form
      initialValues={initalValues}
      form={form}
      layout="vertical"
      onValuesChange={handleChange}
    >
      <Flex style={{ width: "100%" }}>
        <Form.Item
          style={{ width: "100%" }}
          name="isSaved"
          label="Save Form"
          valuePropName="checked"
          initialValue={false}
        >
          <Checkbox defaultChecked={false} />
        </Form.Item>
        <Form.Item dependencies={["isSaved"]} style={{ width: "100%" }}>
          {({ getFieldValue }) =>
            getFieldValue("isSaved") ? (
              <Form.Item name={"name"} label="Form Name" required>
                <Input placeholder="Form Name" />
              </Form.Item>
            ) : null
          }
        </Form.Item>
      </Flex>
      <CreateFieldsList />
      
      <Form.Item noStyle shouldUpdate>
        {() => (
          <Typography>
            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
          </Typography>
        )}
      </Form.Item>
    </Form>
  );
}

export default FormForm;
