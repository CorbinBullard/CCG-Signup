import { Options } from "../../fields/options/option.type";
import {
  Empty,
  Flex,
  Form,
  FormItemProps,
  Select,
  Tag,
  Typography,
} from "antd";

export default function SelectField({
  options,
  ...props
}: {
  options: Options;
  props: FormItemProps;
}) {
  const optionobj = options
    ? options.map((option) => {
        return option
          ? {
              label: option.label,
              value: option.label,
              cost: option.cost,
            }
          : { label: "", value: "", cost: "" };
      })
    : [];

  return (
    <Form.Item
      {...props}
      rules={[
        { required: props.required, message: `${props.label} is required` },
      ]}
      initialValue={null}
    >
      <Select
        options={optionobj}
        placeholder={`Select ${props.label}`}
        optionRender={(option) => {
          return option ? (
            <Flex gap={8}>
              <Typography.Text>{option.label}</Typography.Text>
              {option.data.cost && <Tag>+${option.data.cost || null}</Tag>}
            </Flex>
          ) : (
            <Empty />
          );
        }}
      />
    </Form.Item>
  );
}
