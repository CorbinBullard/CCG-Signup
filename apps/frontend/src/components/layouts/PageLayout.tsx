// PageLayout.jsx
import React from "react";
import { Layout, Typography, Button, Space } from "antd";

const { Header, Content } = Layout;
const { Title } = Typography;

const PageLayout = ({ title, actions, children }) => {
  return (
    <Layout
      style={{ background: "#fff", padding: 24, marginTop: 12, height: "100%" }}
    >
      <Header
        style={{
          background: "#fff",
          padding: "0 0 16px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={3} style={{ margin: 0 }}>
          {title}
        </Title>
        <Space>
          {actions &&
            actions.map((action, index) => (
              <Button
                key={index}
                type={action.type || "primary"}
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            ))}
        </Space>
      </Header>
      <Content>{children}</Content>
    </Layout>
  );
};

export default PageLayout;
