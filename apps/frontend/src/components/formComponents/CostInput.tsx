import { InputNumber } from "antd";
import React from "react";

export default function CostInput(props) {
  return (
    <InputNumber
      {...props}
      min={0}
      formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
      precision={2}
    />
  );
}
