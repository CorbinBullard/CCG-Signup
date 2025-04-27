import {
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  TimePicker,
  Upload,
} from "antd";
import CostInput from "../../../components/formComponents/CostInput";
import { UploadOutlined } from "@ant-design/icons";
import { FundLocationEnum } from "../fund.type";
import ConditionalFormItem from "../../../components/formComponents/DependentItem";

const EventForm = ({ onSubmit, initialValues = {}, form, ref }: {
  onSubmit?: (values: any) => void;
  initialValues?: any;
  form?: any;
  ref?: React.RefObject<any>;
}) => {
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={(values) => {
        onSubmit(values);
      }}
      initialValues={initialValues}
    >
      <Flex gap={16} style={{ width: "100%" }}>
        <Flex vertical gap={16} flex={1}>
          <Form.Item
            name="title"
            label="Event Title"
            rules={[
              { required: true, message: "Please enter the event title" },
            ]}
          >
            <Input placeholder="Event Title" />
          </Form.Item>
          <Space>
            <Form.Item
              name="date"
              label="Event Date"
              rules={[
                { required: true, message: "Please enter the event date" },
              ]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              name="time"
              label="Event Time"
              rules={[
                { required: true, message: "Please enter the event time" },
              ]}
            >
              <TimePicker use12Hours format="h:mm a" minuteStep={15} />
            </Form.Item>
          </Space>
          <Space>
            <Form.Item
              name="cost"
              label="Event Cost"
              rules={[
                { required: true, message: "Please enter the event cost" },
              ]}
              initialValue={0}
            >
              <CostInput />
            </Form.Item>
            <ConditionalFormItem
              dependency="cost"
              shouldRender={(cost) => cost > 0}
            >
              <Form.Item name="funds" label="Event Funds">
                <Select
                  options={Object.entries(FundLocationEnum).map((type) => {
                    return { label: type[0], value: type[1] };
                  })}
                  placeholder="Select Fund Location"
                />
              </Form.Item>
            </ConditionalFormItem>
          </Space>
        </Flex>
        <Flex vertical flex={1} gap={16}>
          <Form.Item
            name="image"
            label="Event Image"
            rules={[
              { required: true, message: "Please enter the event image URL" },
            ]}
          >
            <Upload
              beforeUpload={(file) => {
                ref.current = file;
                return false;
              }}
              showUploadList={true}
              maxCount={1}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="description"
            label="Event Description"
            rules={[
              { required: true, message: "Please enter the event description" },
            ]}
          >
            <Input.TextArea
              placeholder="Event Description"
              style={{ height: 150 }}
            />
          </Form.Item>
        </Flex>
      </Flex>
    </Form>
  );
};

export default EventForm;
