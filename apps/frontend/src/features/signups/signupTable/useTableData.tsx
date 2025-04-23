import { JSX, useMemo, useState } from "react";
import {
  TableColumnsType,
  Alert,
  Descriptions,
  DescriptionsProps,
  TableColumnType,
} from "antd";
import { Event } from "../../events/event.types";
import { Field, FieldTypeEnum } from "../../fields/field.type";
import { Response } from "../types/response.type";
import dayjs from "dayjs";
import { TableData } from "./TableData";

export function useTableData(event: Event) {
  const { fields } = event.form;
  const { signups } = event;
  const { columns, expandedColumns, data, expandedData } = useMemo(
    () => new TableData(event),
    [event]
  );


  function renderError(message, value) {
    return (
      <Alert
        message={`${message}: Value: ${value}`}
        type="error"
        showIcon
        banner
      />
    );
  }

  const renderedData = useMemo(() => {
    
  })

  return { columns, data, expandedColumns };
}
