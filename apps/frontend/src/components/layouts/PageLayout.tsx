// PageLayout.jsx
import React, { Suspense } from "react";
import { Layout, Typography, Button, Space, Flex, Breadcrumb } from "antd";
import { CaretLeftOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../common/Loader";

const { Header, Content } = Layout;
const { Title } = Typography;

const PageLayout = ({ title, actions, children, Component, isLoading }) => {
  return (
    <Layout
      style={{ background: "#fff", padding: 24, marginTop: 12, height: "100%" }}
    >
      {/* SET UP FUNCTIONING BREADCRUMB */}
      {/* <Breadcrumb items={[location]} /> */}
      <Header
        style={{
          background: "#fff",
          padding: "0 0 16px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Flex
          justify="space-between"
          align="center"
          style={{ width: "100%" }}
          gap={100}
        >
          <Title level={3} style={{ margin: 0, minWidth: "fit-content" }}>
            {title}
          </Title>
          {Component && Component}
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
        </Flex>
      </Header>
      {/* MAKE BETTER LOADING */}
      <Suspense fallback={<Loader />}>
        <Content>{children}</Content>
      </Suspense>
    </Layout>
  );
};

export default PageLayout;
