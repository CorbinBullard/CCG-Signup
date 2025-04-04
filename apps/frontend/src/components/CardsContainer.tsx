import { Card, Flex } from "antd";
import React, { JSX } from "react";

function CardsContainer({
  CardComponent,
  data,
}: {
  CardComponent: React.ComponentType<any>;
  data: any[];
}) {
  console.log("CONTAINER: ", data);
  return (
    <Flex wrap="wrap" gap={16}>
      {data && data.map((props, i) => <CardComponent key={i} {...props} />)}
    </Flex>
  );
}

export default CardsContainer;
