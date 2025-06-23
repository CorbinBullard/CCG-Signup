// PageLayout.jsx
import React, { JSX, Suspense } from "react";
import { Layout, Typography, Button, Space, Flex, Breadcrumb } from "antd";
import { CaretLeftOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../common/Loader";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "../common/ErrorPage";

const { Header, Content } = Layout;
const { Title } = Typography;

const PageLayout = ({
  title,
  actions,
  children,
  Component,
  isLoading,
}: {
  title: string;
  actions: JSX.Element[];
}) => {
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
          <Space align="baseline">{actions}</Space>
        </Flex>
      </Header>
      {/* MAKE BETTER LOADING */}
      <ErrorBoundary FallbackComponent={ErrorPage} fallbackRender={Loader}>
        <Content>{children}</Content>
      </ErrorBoundary>
    </Layout>
  );
};

export default PageLayout;
