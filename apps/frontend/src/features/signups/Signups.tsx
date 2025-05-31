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

export default function Signups({ event }: { event: Event }) {
  const signups = useSignups(event.id).data || [];
  const deleteSignup = useDeleteSignup();
  const updateSignup = useUpdateSignup();
  const [currentSignupId, setCurrentSignupId] = useState<number | null>(null);
  const [updateSignupForm] = Form.useForm<Signup>();
  const { data: signup } = useSignup(currentSignupId);

  const handleDelete = async (id: number) => {
    await deleteSignup.mutate(id);
  };

  const onUpdateSignup = async () => {
    const values = await updateSignupForm.validateFields();
    console.log("values", values);
    await updateSignup.mutate({
      signup: values,
      id: updateSignupForm.getFieldValue("id"),
    });
    setCurrentSignupId(null);
  };

  const onEditClick = async (id: number) => {
    setCurrentSignupId(id);
  };

  useEffect(() => {
    if (signup) {
      updateSignupForm.setFieldsValue({
        ...signup,
        responses:
          event.form.fields.map((field) => {
            const response = signup.responses.find((response) => {
              return response.fieldId === field.id;
            });
            return Format.Response(response, field);
          }) || [],
      });
    }
    // if (signup) {
    //   console.log("Formatted Signup, ", Format.Signup(signup));
    //   updateSignupForm.setFieldsValue(Format.Signup(signup));
    // }
  }, [signup, updateSignupForm, event]);

  const tableData = useMemo(
    () =>
      new TableData(event, signups, {
        deleteSignup: handleDelete,
        editSignup: onEditClick,
      }),
    [event, signups]
  );

  const expandedRowRender = (record: any) => {
    if (!record._multiResponses) {
      return null;
    }

    return (
      <Flex style={{ width: "100%", paddingLeft: "16px" }} gap={16}>
        {record._multiResponses.map((response: any, index: number) => {
          return (
            <Flex vertical flex={1}>
              <Typography.Text
                strong
                style={{ paddingLeft: "8px", paddingBottom: "4px" }}
              >
                {response.fieldLabel}
              </Typography.Text>
              <Table
                style={{ width: "100%" }}
                key={index}
                columns={response.columns}
                dataSource={response.data}
                pagination={false}
                size="small"
                bordered
              />
            </Flex>
          );
        })}
      </Flex>
    );
  };

  return (
    <>
      <Table
        columns={tableData.columns}
        dataSource={tableData.data}
        expandable={{
          expandedRowRender,
          rowExpandable: (record) => {
            return !!record._multiResponses;
          },
        }}
        bordered
      />
      <Modal
        title="Update Signup"
        open={!!signup}
        onCancel={() => {
          setCurrentSignupId(null);
          updateSignupForm.resetFields();
        }}
        destroyOnClose
        onOk={onUpdateSignup}
        okText="Update Signup"
      >
        <Form layout="vertical" form={updateSignupForm}>
          <SignupForm fields={event.form.fields} />
        </Form>
      </Modal>
    </>
  );
}
