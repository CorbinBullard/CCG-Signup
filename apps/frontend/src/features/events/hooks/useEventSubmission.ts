import { useCreateEvent } from "./useEvents";

export const useEventSubmission = (formRef, fileRef) => {
  const createEvent = useCreateEvent();

  const submit = async () => {
    const values = await formRef.validateFields();

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("date", values.date.format("YYYY-MM-DD"));
    formData.append("time", values.time.format("HH:mm"));
    formData.append("cost", values.cost.toString());
    formData.append("funds", values.funds);
    formData.append("form", JSON.stringify(values.form));

    if (values.signupLimit) {
      formData.append("signupLimit", values.signupLimit.toString());
    }

    if (fileRef.current) {
      formData.append("image", fileRef.current);
    } else {
      console.error("No file selected");
    }

    if (values.consentForms) {
      formData.append("consentForms", JSON.stringify(values.consentForms));
    }

    createEvent.mutate(formData);
  };

  return { submit };
};
