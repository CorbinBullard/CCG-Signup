import { useState } from "react";
import PageLayout from "../../components/layouts/PageLayout";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import SavedFormList from "../../features/savedForms/SavedFormList";
import { useSavedForms } from "../../features/savedForms/hooks/useSavedForms";

export default function SavedFormsPage() {
  const [queryParams, setQueryParams] = useState({});
  const { data: forms } = useSavedForms(queryParams);
  const navigate = useNavigate();

  const handleSearch = (value: string) => {
    setQueryParams({ ...queryParams, name: value });
  };

  return (
    <PageLayout
      title="Saved Forms"
      Component={<Input.Search onSearch={handleSearch} enterButton />}
      actions={[
        <Button
          type="primary"
          onClick={() => navigate("/forms/create")}
          key={"new-form-btn"}
        >
          New Form
        </Button>,
      ]}
    >
      <SavedFormList forms={forms} />
    </PageLayout>
  );
}
