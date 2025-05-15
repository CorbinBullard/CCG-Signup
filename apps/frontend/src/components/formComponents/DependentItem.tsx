import React from "react";
import { Form } from "antd";

// This component wraps an Ant Design Form.Item with noStyle and dependency tracking.
const ConditionalFormItem = ({
  dependency, // field name (or array of field names) to watch for changes
  shouldRender, // a function: value => boolean
  children, // the children to render when condition passes
  ...rest // any other props to pass to the outer Form.Item
}) => {
  // If you eventually want to support multiple dependencies, you can modify the logic accordingly.

  return (
    <Form.Item noStyle dependencies={[dependency]} {...rest}>
      {({ getFieldValue }) => {
        // Evaluate the condition with the current value of the dependency field.
        // Adjust here if dependency is an array.
        const fieldValue = getFieldValue(dependency);
        return shouldRender(fieldValue) ? children : null;
      }}
    </Form.Item>
  );
};

export default ConditionalFormItem;
