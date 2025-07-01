import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function BreadcrumbNav() {
  const { pathname } = useLocation();
  const [pathArray, setPathArray] = useState<string[]>(pathname.split("/"));

  useEffect(() => {
    setPathArray(pathname.split("/"));
  }, [pathname]);
  console.log("pathArray: ", pathArray);
  return (
    <Breadcrumb
      items={[
        {
          href: "",
          title: <HomeOutlined />,
        },
        {
          href: `/${pathArray[1]}`,
          title: pathArray[1],
        },
        ...pathArray.slice(2).map((path) => ({ title: path })),
      ]}
    />
  );
}
