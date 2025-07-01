// PageLayout.jsx
import { JSX } from "react";
import { Layout, Typography, Space, Flex } from "antd";
import Loader from "../common/Loader";
import { ErrorBoundary } from "react-error-boundary";
const { Header, Content } = Layout;
const { Title } = Typography;

const PageLayout = ({
  title,
  actions,
  children,
  Component,
}: {
  title: string;
  actions?: JSX.Element[];
  children: JSX.Element;
  Component?: JSX.Element;
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
      <ErrorBoundary fallbackRender={Loader}>
        <Content>{children}</Content>
      </ErrorBoundary>
    </Layout>
  );
};

export default PageLayout;
