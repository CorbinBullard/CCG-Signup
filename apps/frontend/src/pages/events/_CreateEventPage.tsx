import React, { useRef, useState } from "react";
import { Form, Button, Card, Layout, Flex, Steps } from "antd";
import { CaretRightOutlined, CaretLeftOutlined } from "@ant-design/icons";
import PageLayout from "../../components/layouts/PageLayout";
import EventForm from "../../features/events/components/_EventForm";
import NewFormForm from "../../features/forms/FormForm";
import { useEventSubmission } from "../../features/events/hooks/useEventSubmission";
import { useStepper } from "../../components/useStepper";
import { FieldTypeEnum } from "../../features/fields/field.type";
import FormForm from "../../features/forms/_FormForm";

function CreateEventPage() {
  const [form] = Form.useForm();
  const fileRef = useRef<File | null>(null);

  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    image: null,
    time: "",
    cost: 0,
  });

  const [formSchema, setFormSchema] = useState({
    name: "",
    fields: [{ label: "", type: FieldTypeEnum.Text, required: true }],
  });

  const { current: eventStep, next, prev } = useStepper(2);

  const { submit } = useEventSubmission(form, fileRef, formSchema);

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      await submit();
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <PageLayout
      title="Create Event"
      Component={() => (
        <Steps
          current={eventStep}
          items={[{ title: "Event Details" }, { title: "Build Form" }]}
        />
      )}
    >
      <Layout style={{ padding: "24px", width: "100%", height: "100%" }}>
        <Card>
          <div style={{ display: eventStep === 0 ? "block" : "none" }}>
            <EventForm
              form={form}
              ref={fileRef}
              onChange={(values) => setEventData(values)}
            />
          </div>
          <div style={{ display: eventStep === 1 ? "block" : "none" }}>
            <FormForm initialValues={formSchema} onChange={setFormSchema} />
          </div>

          <Flex justify="end" style={{ marginTop: 16 }}>
            {eventStep > 0 && (
              <Button
                icon={<CaretLeftOutlined />}
                onClick={prev}
                style={{ marginRight: 8 }}
              >
                Previous
              </Button>
            )}
            {eventStep < 1 && (
              <Button
                icon={<CaretRightOutlined />}
                onClick={async () => {
                  const valid = await form.validateFields();
                  if (valid) next();
                }}
              >
                Next
              </Button>
            )}
            {eventStep === 1 && (
              <Button type="primary" onClick={handleSubmit}>
                Submit
              </Button>
            )}
          </Flex>
        </Card>
      </Layout>
    </PageLayout>
  );
}

export default CreateEventPage;
