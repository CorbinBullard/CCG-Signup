import { Flex } from "antd";
import React from "react";

function CardsContainer({
  CardComponent,
  data,
}: {
  CardComponent: React.ComponentType<any>;
  data: any[];
}) {
  return (
    <Flex wrap="wrap" gap={16}>
      {data && data.map((props, i) => <CardComponent key={i} {...props} />)}
    </Flex>
  );
}

export default CardsContainer;
