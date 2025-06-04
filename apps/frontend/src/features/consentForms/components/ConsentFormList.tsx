import { List } from "antd";
import React from "react";
import getMenuItems from "../../../components/common/getMenuItems";
import OptionsButton from "../../../components/common/OptionsButton";
import { ConsentForm } from "../consentForm.type";

export default function ConsentFormList({
  consentForms,
  handleEdit,
  handleDelete,
}: {
  consentForms: ConsentForm[];
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
}) {
  return (
    <List
      bordered
      dataSource={consentForms}
      renderItem={(consentForm: ConsentForm) => (
        <List.Item
          actions={[
            <OptionsButton
              key="options"
              items={getMenuItems({
                name: "Consent Form",
                handleDelete: () => handleDelete(consentForm.id),
                handleEdit: () => handleEdit(consentForm.id),
              })}
            />,
          ]}
        >
          {consentForm.name}
        </List.Item>
      )}
    />
  );
}
