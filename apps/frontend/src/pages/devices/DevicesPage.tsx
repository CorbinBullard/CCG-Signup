import { Flex, Form, Input, Typography } from "antd";
import OpenModalButton from "../../components/common/OpenModalButton";
import PageLayout from "../../components/layouts/PageLayout";
import DeviceList from "../../features/devices/DeviceList";
import DevicesForm from "../../features/devices/DevicesForm";
import {
  useCreateDevice,
  useDeleteDevice,
  useDevices,
  useRemoveInactiveDevice,
  useUpdateDevice,
} from "../../features/devices/hooks/useDevices";
import Loader from "../../components/common/Loader";
import { useEffect, useRef, useState } from "react";
import { UUID } from "crypto";
import { io, Socket } from "socket.io-client";
import { useNotifications } from "../../context/Notifications";

export default function DevicesPage() {
  const [queryParams, setQueryParams] = useState({});
  const [deviceId, setDeviceId] = useState<UUID | null>(null);
  const [deviceForm] = Form.useForm();
  const [oneTimeToken, setOneTimeToken] = useState<number | null>(null);

  const modalRef = useRef<{ closeModal: () => void; openModal: () => void }>(
    null
  );
  const socketRef = useRef<Socket | null>(null);

  const { data: devices, isLoading } = useDevices();
  const createDevice = useCreateDevice();
  const updateDevice = useUpdateDevice();
  const deleteDevice = useDeleteDevice();
  const removeInactiveDevice = useRemoveInactiveDevice();
  const openNotification = useNotifications();

  useEffect(() => {
    if (deviceId) {
      deviceForm.setFieldValue(
        "name",
        devices.find((device) => device.id === deviceId).name
      );
      modalRef.current?.openModal();
    }
  }, [deviceForm, deviceId, devices]);

  useEffect(() => {
    return removeInactiveDevice.mutate;
  }, []);

  const handleSubmit = async () => {
    if (oneTimeToken) return;
    try {
      const values = await deviceForm.validateFields();
      if (deviceId) {
        updateDevice.mutate({ id: deviceId, name: values.name });
      } else {
        const { oneTimeToken, id } = await createDevice.mutateAsync(
          values.name
        );
        setOneTimeToken(oneTimeToken);
        const apiURL = `${import.meta.env.VITE_API_URL}/device-registration`;
        console.log(apiURL);
        socketRef.current = io(apiURL, {
          query: { token: oneTimeToken },
        });

        socketRef.current.on("device-registered", () => {
          modalRef.current?.closeModal();
          socketRef.current?.disconnect();
          setOneTimeToken(null);
          openNotification({
            message: "Device Connected",
            description: "The device was successfully connected",
            type: "success",
          });
        });

        socketRef.current.on("error", (err) => {
          console.error(err);
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleModalClose = () => {
    deviceForm.resetFields();

    if (oneTimeToken) {
      console.log("ott", oneTimeToken);
      removeInactiveDevice.mutate();
      socketRef.current?.disconnect();
    }

    setDeviceId(null);
    setOneTimeToken(null);
  };

  if (isLoading) return <Loader />;

  return (
    <PageLayout
      title="Devices"
      actions={[
        <OpenModalButton
          key={"new-device-modal-btn"}
          label="Register New Device"
          modalTitle="New Device"
          ref={modalRef}
          onClose={handleModalClose}
          onOk={handleSubmit}
          footer={(_, { OkBtn }) => {
            if (!oneTimeToken) return <OkBtn />;
            else return null;
          }}
        >
          <>
            <Form
              form={deviceForm}
              layout="vertical"
              preserve={false}
              initialValues={
                deviceId ? devices.find((device) => device.id === deviceId) : {}
              }
            >
              <DevicesForm />
            </Form>
            {oneTimeToken ? (
              <Flex vertical>
                <Typography.Text></Typography.Text>
                <Typography.Text keyboard>{oneTimeToken}</Typography.Text>
              </Flex>
            ) : (
              <> </>
            )}
          </>
        </OpenModalButton>,
      ]}
    >
      <DeviceList
        devices={devices}
        handleDelete={deleteDevice.mutate}
        handleEdit={setDeviceId}
      />
    </PageLayout>
  );
}
