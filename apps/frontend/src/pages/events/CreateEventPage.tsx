import React, { useRef, useState } from "react";
import { Form, Button, Card, Layout, Flex, Steps } from "antd";
import { CaretRightOutlined, CaretLeftOutlined } from "@ant-design/icons";
import PageLayout from "../../components/layouts/PageLayout";
import EventForm from "../../features/events/components/EventForm";
import FormForm from "../../features/forms/FormForm";
import { useCreateEvent } from "../../features/events/useEvents";

function CreateEventPage() {
  const [eventStep, setEventStep] = useState(0);
  const [form] = Form.useForm();
  const fileRef = useRef<File | null>(null);

  const createEvent = useCreateEvent();

  // 👇 Controlled form schema state
  const [formSchema, setFormSchema] = useState({
    isSaved: false,
    name: "",
    fields: [{ label: "", type: "text", required: true }],
  });

  const next = async () => {
    const isValid = await form.validateFields();
    if (eventStep < 1) setEventStep(eventStep + 1);
  };

  const prev = () => {
    if (eventStep > 0) setEventStep(eventStep - 1);
  };

  const handleFormSchemaChange = (updatedSchema) => {
    console.log("Updated Schema", updatedSchema);
    setFormSchema(updatedSchema);
  };

  const submitForm = async () => {
    const values = await form.validateFields();

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("date", values.date.format("YYYY-MM-DD"));
    formData.append("time", values.time.format("HH:mm"));
    formData.append("cost", values.cost.toString());
    formData.append("form", JSON.stringify(formSchema));

    if (fileRef.current) {
      formData.append("image", fileRef.current);
    } else {
      console.error("No file selected");
    }
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }
    createEvent.mutate(formData);
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
            <EventForm form={form} ref={fileRef} />
          </div>
          <div style={{ display: eventStep === 1 ? "block" : "none" }}>
            <FormForm value={formSchema} onChange={handleFormSchemaChange} />
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
              <Button icon={<CaretRightOutlined />} onClick={next}>
                Next
              </Button>
            )}
            {eventStep === 1 && (
              <Button type="primary" onClick={submitForm}>
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
