import React, { useState } from "react";
import {
  CalendarOutlined,
  CheckSquareOutlined,
  FileTextOutlined,
  FormOutlined,
  TabletOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Flex, Image, Layout, Menu, theme } from "antd";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import PageLayout from "./PageLayout";
import BreadcrumbNav from "../BreadcrumbNav";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Events", "events", <CalendarOutlined />),
  getItem("Forms", "", <FormOutlined />, [
    getItem("Saved Forms", "forms", <FileTextOutlined />),
    getItem("Consent Forms", "consent-forms", <CheckSquareOutlined />),
  ]),
  getItem("Devices", "devices", <TabletOutlined />),
];

const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    navigate(`/${e.key}`);
  };

  return (
    <Layout style={{ minHeight: "100vh", width: "100vw" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={[pathname.split("/")[1]]}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            paddingLeft: 32,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Flex
            align="center"
            justify="space-between"
            style={{ width: "100%" }}
          >
            <BreadcrumbNav />
            <Image src="/logos/dove.png" preview={false} width={60} />
          </Flex>
        </Header>
        <Content
          style={{
            padding: 24,
          }}
        >
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Calvary Chapel Greer ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
