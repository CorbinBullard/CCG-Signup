import React, { useState } from "react";
import PageLayout from "../../components/layouts/PageLayout";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import SavedFormList from "../../features/forms/savedForms/SavedFormList";
import Loader from "../../components/common/Loader";
import { useSavedForms } from "../../features/forms/hooks/useSavedForms";

export default function FormsPage() {
  const [queryParams, setQueryParams] = useState({ name: "" });
  const { data: forms, isLoading } = useSavedForms(queryParams);
  const navigate = useNavigate();

  const handleSearch = (value: string) => {
    setQueryParams({ ...queryParams, name: value });
  };

  if (isLoading) return <Loader />;

  return (
    <PageLayout
      title="Saved Forms"
      Component={<Input.Search onSearch={handleSearch} enterButton />}
      actions={[
        <Button type="primary" onClick={() => navigate("/forms/create")}>
          New Form
        </Button>,
      ]}
    >
      <SavedFormList forms={forms} />
    </PageLayout>
  );
}
