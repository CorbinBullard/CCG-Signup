import { List } from "antd";
import { Form } from "../forms/form.types";
import OptionsButton from "../../components/common/OptionsButton";
import getMenuItems from "../../components/common/getMenuItems";
import { useNavigate } from "react-router-dom";
import { useDeleteSavedForm } from "./hooks/useSavedForms";

export default function SavedFormList({ forms }: { forms: Form[] }) {
  const deleteSavedForm = useDeleteSavedForm();
  const navigate = useNavigate();
  const handleEdit = (id: number) => {
    navigate(`/forms/${id}`);
  };

  return (
    <List
      bordered
      dataSource={forms}
      renderItem={(form) => (
        <List.Item
          actions={[
            <OptionsButton
              items={getMenuItems({
                name: "Form",
                handleDelete: () => deleteSavedForm.mutate(form.id),
                handleEdit: () => handleEdit(form.id),
              })}
            />,
          ]}
        >
          {form.name}
        </List.Item>
      )}
    />
  );
}
