import { Button, Card, Form, Image, Input } from "antd";
import React, { JSX } from "react";

export default function LoginCard({ login, form }): JSX.Element {
  return (
    <Card
      title="CCG Login"
      extra={<Image preview={false} src="/logos/dove.png" width={50} />}
      style={{ width: 300, margin: "auto", marginTop: 100 }}
    >
      <Form layout="vertical" onFinish={login} form={form}>
        <Form.Item label="Email" name="email">
          <Input placeholder="example@email.com" />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password placeholder="password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
