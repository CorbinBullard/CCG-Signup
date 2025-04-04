import {
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
  Space,
  TimePicker,
  Upload,
} from "antd";

const EventForm = ({ onSubmit, initialValues = {}, form }) => {
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={(values) => {
        console.log("Form values: ", values);
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
          <Form.Item
            name="cost"
            label="Event Cost"
            rules={[{ required: true, message: "Please enter the event cost" }]}
          >
            <InputNumber
              min={0}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
              precision={2}
            />
          </Form.Item>
        </Flex>
        <Flex vertical flex={1} gap={16}>
          <Form.Item
            name="image"
            label="Event Image"
            rules={[
              { required: true, message: "Please enter the event image URL" },
            ]}
          >
            <Upload>
              <Button>Upload</Button>
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
