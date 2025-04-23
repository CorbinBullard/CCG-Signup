import { Flex, Table } from "antd";
import { Event } from "../../events/event.types";
import { useTableData } from "./useTableData";
import { useMemo } from "react";
import { TableData } from "./TableData";

export default function SignupTable({ event }: { event: Event }) {
  const { columns, data, extendedColumns } = useMemo(() => new TableData(event));

  return <Table columns={columns} dataSource={data} />;
}
