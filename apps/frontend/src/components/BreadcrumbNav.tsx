import { Breadcrumb } from "antd";
import React from "react";
import { useLocation } from "react-router-dom";

export default function BreadcrumbNav() {
  const { pathname } = useLocation();
  
  return <Breadcrumb />;
}
