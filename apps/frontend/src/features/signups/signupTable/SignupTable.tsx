import { Flex, Table, Typography } from "antd";
import { useMemo } from "react";
import { TableData } from "./TableData";

export default function SignupTable({ event }: { event: Event }) {
  const tableData = useMemo(() => new TableData(event), [event]);

  const expandedRowRender = (record: any) => {
    if (!record._multiResponses) return null;

    return (
      <Flex style={{ width: "100%", paddingLeft: "16px" }} gap={16}>
        {record._multiResponses.map((response: any, index: number) => {
          console.log(record);
          return (
            <Flex vertical flex={1}>
              <Typography.Text
                strong
                style={{ paddingLeft: "8px", paddingBottom: "4px" }}
              >
                {response.fieldLabel}
              </Typography.Text>
              <Table
                style={{ width: "100%" }}
                key={index}
                columns={response.columns}
                dataSource={response.data}
                pagination={false}
                size="small"
                bordered
              />
            </Flex>
          );
        })}
      </Flex>
    );
  };

  return (
    <Table
      columns={tableData.columns}
      dataSource={tableData.data}
      expandable={{ expandedRowRender }}
      bordered
    />
  );
}
