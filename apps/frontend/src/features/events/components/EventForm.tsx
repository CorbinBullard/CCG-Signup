import {
  Button,
  DatePicker,
  Flex,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Select,
  TimePicker,
  Upload,
} from "antd";
import CostInput from "../../../components/formComponents/CostInput";
import { UploadOutlined } from "@ant-design/icons";
import { FundLocationEnum } from "../fund.type";
import ConditionalFormItem from "../../../components/formComponents/DependentItem";

const EventForm = ({
  // form,
  ref,
}: {
  form: FormInstance;
  ref?: React.RefObject<any>;
}) => {
  return (
    <Flex gap={16} style={{ width: "100%" }}>
      <Flex vertical gap={16} flex={1}>
        <Form.Item
          preserve
          name="title"
          label="Event Title"
          rules={[{ required: true, message: "Please enter the event title" }]}
        >
          <Input placeholder="Event Title" />
        </Form.Item>
        <Flex gap={16}>
          <Form.Item
            name="date"
            label="Event Date"
            rules={[{ required: true, message: "Please enter the event date" }]}
            style={{ flex: 1 }}
          >
            <DatePicker format="M/DD/YYYY" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="time"
            label="Event Time"
            rules={[{ required: true, message: "Please enter the event time" }]}
            style={{ flex: 1 }}
          >
            <TimePicker
              use12Hours
              format="h:mm a"
              minuteStep={15}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Flex>
        <Flex gap={16}>
          <Form.Item
            name="cost"
            label="Event Cost"
            rules={[{ required: true, message: "Please enter the event cost" }]}
            initialValue={0}
            style={{ flex: 1 }}
          >
            <CostInput style={{ width: "100%" }} />
          </Form.Item>
          <ConditionalFormItem
            dependency="cost"
            shouldRender={(cost) => cost > 0}
          >
            <Form.Item
              name="funds"
              label="Event Funds"
              style={{ flex: 1 }}
              rules={[
                { required: true, message: "Please enter the event funds" },
              ]}
              initialValue={FundLocationEnum.General}
            >
              <Select
                options={Object.entries(FundLocationEnum).map((type) => {
                  return { label: type[0], value: type[1] };
                })}
                placeholder="Select Fund Location"
              />
            </Form.Item>
          </ConditionalFormItem>
        </Flex>
      </Flex>
      <Flex vertical flex={1} gap={16}>
        <Flex gap={16}>
          <Form.Item
            name="image"
            label="Event Image"
            rules={[
              { required: true, message: "Please upload an event Image" },
            ]}
            style={{ flex: 1 }}
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
              <Button icon={<UploadOutlined />} style={{ width: "100%" }}>
                Select Image
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="signupLimit"
            label="Signup Limit"
            rules={[
              { required: false, message: "Please enter the signup limit" },
            ]}
            style={{ flex: 2.5 }}
          >
            <InputNumber
              min={1}
              placeholder="Signup Limit"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Flex>
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
  );
};

export default EventForm;
