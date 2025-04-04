import React, { useState } from "react";
import PageLayout from "../../components/layouts/PageLayout";
import EventForm from "../../features/events/components/EventForm";
import { Button, Card, Col, Flex, Form, Layout, Row, Space, Steps } from "antd";
import { CaretRightOutlined, CaretLeftOutlined } from "@ant-design/icons";
import FormForm from "../../features/forms/FormForm";

function CreateEventPage() {
  const [form] = Form.useForm();

  // Better way to do this
  const [eventStep, setEventStep] = useState(0);
  const prev = () => {
    if (eventStep > 0) setEventStep(eventStep - 1);
  };
  const next = async () => {
    // const validation = await form.validateFields();
    // console.log(validation);
    if (eventStep < 1) setEventStep(eventStep + 1);
  };

  return (
    <PageLayout title={"Create Event"} actions={[{}]}>
      <Row gutter={16} style={{ height: "100%" }}>
        <Col span={4}>
          <Steps
            direction="vertical"
            current={eventStep}
            items={[{ title: "Event Details" }, { title: "Form Fields" }]}
          />
        </Col>
        <Col span={20}>
          <Layout
            style={{
              padding: "24px",
              color: "#fff",
              width: "100%",
              height: "100%",
            }}
          >
            <Card>
              {eventStep === 0 && <EventForm form={form} />}
              {eventStep === 1 && <FormForm form={form} />}
              <Flex justify="end">
                {eventStep > 0 && (
                  <Button
                    icon={<CaretLeftOutlined />}
                    onClick={prev}
                    style={{ marginRight: 8 }}
                  >
                    Previous
                  </Button>
                )}
                {eventStep < 2 && (
                  <Button icon={<CaretRightOutlined />} onClick={next}>
                    Next
                  </Button>
                )}
              </Flex>
            </Card>
          </Layout>
        </Col>
      </Row>
    </PageLayout>
  );
}

export default CreateEventPage;
