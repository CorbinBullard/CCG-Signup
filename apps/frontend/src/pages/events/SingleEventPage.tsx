import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useDeleteEvent,
  useEvent,
  useUpdateECF,
} from "../../features/events/hooks/useEvents";
import PageLayout from "../../components/layouts/PageLayout";
import { Button, Flex, Form, Image, Modal, Tabs, TabsProps } from "antd";
import FormForm from "../../features/forms/FormForm";
import { useUpdateForm } from "../../features/forms/hooks/useForms";
import EventSignups from "../../features/signups/EventSignups";
import OpenModalButton from "../../components/common/OpenModalButton";
import SignupForm from "../../features/signups/SignupForm";
import { PlusOutlined } from "@ant-design/icons";
import UpdateEvent from "../../features/events/sections/UpdateEvent";
import { useCreateSignup } from "../../features/signups/hooks/useSignups";
import Loader from "../../components/common/Loader";
import { signupDefaultValues } from "../../features/signups/signup.defaultValues";
import OptionsButton from "../../components/common/OptionsButton";
import getMenuItems from "../../features/signups/signupTable/getMenuItems";
import AttachCFToEventForm from "../../features/ecf/AttachCFToEventForm";

export default function SingleEventPage() {
  const params = useParams<{ id: string }>();
  const eventId = Number(params.id);
  const modalRef = useRef<{ closeModal: () => void; openModal: () => void }>(
    null
  );

  const [formForm] = Form.useForm();
  const [signupForm] = Form.useForm();
  const [consentForm] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tab, setTab] = useState<"signups" | "form" | "consents">("signups");

  const updateForm = useUpdateForm();
  const deleteEvent = useDeleteEvent();
  const createSignup = useCreateSignup();
  const updateECF = useUpdateECF();

  const { data: event, isLoading, isError } = useEvent(eventId);

  if (isNaN(eventId)) {
    return <div>Invalid event ID</div>;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !event) {
    return <div>Event not found</div>;
  }
  console.log("EVENT CONSENT FORMS: ", event);

  const tabItems: TabsProps["items"] = [
    {
      key: "signups",
      label: "Signups",
      children: <EventSignups event={event} />,
    },
    {
      key: "form",
      label: "Form",
      children: (
        <Form form={formForm} initialValues={event.form} layout="vertical">
          <FormForm mode="edit" />
        </Form>
      ),
    },
    {
      key: "consents",
      label: "Consent Forms",
      children: (
        <Form
          form={consentForm}
          initialValues={{ consentForms: event.eventConsentForms || [] }}
        >
          <AttachCFToEventForm />
        </Form>
      ),
    },
  ];

  const tabActionItem = () => {
    switch (tab) {
      case "form": {
        return (
          <Button onClick={() => handleUpdateFormSubmit()} type="primary">
            Save Form
          </Button>
        );
      }
      case "signups": {
        return (
          <OpenModalButton
            label="New Signup"
            btnType="primary"
            icon={<PlusOutlined />}
            modalTitle="Create Signup"
            ref={modalRef}
            onOk={handleCreateSignupSubmit}
          >
            <Form
              layout="vertical"
              form={signupForm}
              initialValues={signupDefaultValues(event.form.fields)}
              scrollToFirstError
            >
              <SignupForm fields={event.form.fields} />
            </Form>
          </OpenModalButton>
        );
      }
      case "consents": {
        return (
          <Button onClick={() => handleUpdateEFC()} type="primary">
            Update Consent Forms
          </Button>
        );
        return;
      }
    }
  };

  const handleUpdateFormSubmit = async () => {
    const values = await formForm.validateFields();
    updateForm.mutate({
      id: event.form.id,
      form: values,
      eventId: event.id,
    });
    signupForm.resetFields();
  };
  const handleCreateSignupSubmit = async () => {
    try {
      const values = await signupForm.validateFields();
      createSignup.mutate({
        signup: values,
        eventId: event.id,
      });
      modalRef?.current?.closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateEFC = async () => {
    const { consentForms } = consentForm.getFieldsValue();
    updateECF.mutate({ id: event.id, ecfArray: consentForms });
  };
  return (
    <PageLayout
      title={event.title}
      actions={[
        <OptionsButton
          items={getMenuItems({
            name: "Event",
            handleDelete: () => deleteEvent.mutate(eventId),
            handleEdit: () => setIsModalOpen(true),
          })}
        />,
      ]}
    >
      <UpdateEvent
        event={event}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <Tabs
        type="card"
        items={tabItems}
        tabBarExtraContent={tabActionItem()}
        onChange={(key) => setTab(key)}
        activeKey={tab}
      />
    </PageLayout>
  );
}
