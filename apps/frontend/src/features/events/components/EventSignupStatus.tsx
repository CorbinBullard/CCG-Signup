import { Flex, Typography } from "antd";
import React, { useMemo } from "react";
import { Event } from "../event.types";
import { UserOutlined } from "@ant-design/icons";

export default function EventSignupStatus({ event }: { event: Event }) {
  const signupLength = event?.signups?.length || 0;
  const limitStatus: "warning" | "danger" | undefined = useMemo(() => {
    if (!event.signupLimit) return undefined;
    if (signupLength >= event.signupLimit) return "danger";
    if (signupLength / event.signupLimit > 0.9) return "warning";
  }, [event]);

  return (
    <Typography.Text type={limitStatus}>
      {signupLength}
      {event.signupLimit ? `/${event.signupLimit}` : ""} <UserOutlined />
    </Typography.Text>
  );
}
