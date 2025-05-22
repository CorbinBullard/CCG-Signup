import { List } from "antd";
import { Form } from "../form.types";
import OptionsButton from "../../../components/common/OptionsButton";
import getMenuItems from "../../signups/signupTable/getMenuItems";
import { useNavigate } from "react-router-dom";

export default function SavedFormList({ forms }: { forms: Form[] }) {
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
                handleDelete: () => {},
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
