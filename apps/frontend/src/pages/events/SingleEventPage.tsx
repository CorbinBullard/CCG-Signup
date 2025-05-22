import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useDeleteEvent,
  useEvent,
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

export default function SingleEventPage() {
  const params = useParams<{ id: string }>();
  const eventId = Number(params.id);
  const modalRef = useRef<{ closeModal: () => void; openModal: () => void }>(
    null
  );

  const [formForm] = Form.useForm();
  const [signupForm] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tab, setTab] = useState("signups");

  const updateForm = useUpdateForm();
  const deleteEvent = useDeleteEvent();
  const createSignup = useCreateSignup();

  const {
    data: event,
    isLoading,
    isError,
  } = useEvent(eventId);
  console.log(event, isLoading, isError)

  if (isNaN(eventId)) {
    return <div>Invalid event ID</div>;
  }

  if (isLoading) {
    return <Loader />;
  }
  console.log(isError, event)
  if (isError || !event) {
    return <div>Event not found</div>;
  }
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
  ];

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
        tabBarExtraContent={
          tab === "form" ? (
            <Button onClick={() => handleUpdateFormSubmit()} type="primary">
              Save Form
            </Button>
          ) : (
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
          )
        }
        onChange={(key) => setTab(key)}
        activeKey={tab}
      />
    </PageLayout>
  );
}
