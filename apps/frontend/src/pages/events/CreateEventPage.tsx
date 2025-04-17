import React, { useRef, useState } from "react";
import { Form, Button, Card, Layout, Flex, Steps } from "antd";
import { CaretRightOutlined, CaretLeftOutlined } from "@ant-design/icons";
import PageLayout from "../../components/layouts/PageLayout";
import EventForm from "../../features/events/components/EventForm";
import FormForm from "../../features/forms/FormForm";
import { useEventSubmission } from "../../features/events/hooks/useEventSubmission";
import { useStepper } from "../../components/useStepper";
import { FieldTypeEnum } from "../../features/fields/field.type";

function CreateEventPage() {
  const [form] = Form.useForm();
  const fileRef = useRef<File | null>(null);
  const { current: eventStep, next, prev } = useStepper(2);

  const [formSchema, setFormSchema] = useState({
    isSaved: false,
    name: "",
    fields: [{ label: "", type: FieldTypeEnum.Text, required: true }],
  });

  const { submit } = useEventSubmission(form, fileRef, formSchema);

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
                onClick={() => next(() => form.validateFields())}
              >
                Next
              </Button>
            )}
            {eventStep === 1 && (
              <Button type="primary" onClick={submit}>
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
