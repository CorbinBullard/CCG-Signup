/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, Form, Modal, Table, Typography } from "antd";
import { useEffect, useMemo, useState } from "react";
import { TableData } from "./signupTable/TableData";
import {
  useDeleteSignup,
  useSignup,
  useSignups,
  useUpdateSignup,
} from "./hooks/useSignups";
import { Signup } from "./types/signup.type";
import SignupForm from "./SignupForm";
import { Event } from "../events/event.types";
import Format from "../../utils/Format";
import SignConsentFormsModal from "../scf/SignupConsentFormsModal";
import Loader from "../../components/common/Loader";

// Extracted Edit Modal
function EditSignupModal({ open, onCancel, onOk, form, fields }) {
  return (
    <Modal
      title="Update Signup"
      open={open}
      onCancel={onCancel}
      destroyOnClose
      onOk={onOk}
      okText="Update Signup"
    >
      <Form layout="vertical" form={form}>
        <SignupForm fields={fields} />
      </Form>
    </Modal>
  );
}

// Extracted Sign Forms Modal

export default function Signups({ event }: { event: Event }) {
  // State hooks
  const { data: signups = [], isLoading } = useSignups(event.id);
  const deleteSignup = useDeleteSignup();
  const updateSignup = useUpdateSignup();

  const [editSignupId, setEditSignupId] = useState<number | null>(null);
  const [signFormsSignupId, setSignFormsSignupId] = useState<number | null>(
    null
  );

  const [updateSignupForm] = Form.useForm<Signup>();
  const { data: editingSignup } = useSignup(editSignupId);

  // Callbacks
  const handleDelete = async (id: number) => await deleteSignup.mutate(id);
  const handleEditClick = (id: number) => setEditSignupId(id);
  const handleSignForms = (id: number) => setSignFormsSignupId(id);

  const handleUpdateSignup = async () => {
    const values = await updateSignupForm.validateFields();
    await updateSignup.mutate({
      signup: values,
      id: updateSignupForm.getFieldValue("id"),
    });
    setEditSignupId(null);
  };

  // Sync form with editing signup
  useEffect(() => {
    if (editingSignup) {
      updateSignupForm.setFieldsValue({
        ...editingSignup,
        responses:
          event.form.fields.map((field) => {
            const response = editingSignup.responses.find(
              (response) => response.fieldId === field.id
            );
            return Format.Response(response, field);
          }) || [],
      });
    }
  }, [editingSignup, updateSignupForm, event]);

  // Memoize table data instance
  const tableData = useMemo(
    () =>
      new TableData(event, signups, {
        deleteSignup: handleDelete,
        editSignup: handleEditClick,
        signForms: handleSignForms,
      }),
    [event, signups]
  );

  // Expanded row renderer
  const expandedRowRender = (record: any) => {
    if (!record._multiResponses) return null;
    return (
      <Flex style={{ width: "100%", paddingLeft: "16px" }} gap={16}>
        {record._multiResponses.map((response: any, index: number) => (
          <Flex vertical flex={1} key={index}>
            <Typography.Text
              strong
              style={{ paddingLeft: "8px", paddingBottom: "4px" }}
            >
              {response.fieldLabel}
            </Typography.Text>
            <Table
              style={{ width: "100%" }}
              columns={response.columns}
              dataSource={response.data}
              pagination={false}
              size="small"
              bordered
            />
          </Flex>
        ))}
      </Flex>
    );
  };

  // Render
  if (isLoading) return <Loader />;

  return (
    <>
      <Table
        columns={tableData.columns}
        dataSource={tableData.data}
        expandable={{
          expandedRowRender,
          rowExpandable: (record) => !!record._multiResponses,
        }}
        bordered
      />
      {/* Edit Modal */}
      <EditSignupModal
        open={!!editingSignup}
        onCancel={() => {
          setEditSignupId(null);
          updateSignupForm.resetFields();
        }}
        onOk={handleUpdateSignup}
        form={updateSignupForm}
        fields={event.form.fields}
      />
      {/* Sign Forms Modal */}
      <SignConsentFormsModal
        eventId={event.id}
        onCancel={() => {
          setSignFormsSignupId(null);
        }}
        signupId={signFormsSignupId}
      />
    </>
  );
}
