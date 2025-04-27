import { useCreateEvent } from "./useEvents";

export const useEventSubmission = (formRef, fileRef) => {
  const createEvent = useCreateEvent();

  const submit = async () => {
    const values = await formRef.validateFields();

    console.log("EVENT SUBMISSION", values);
    console.log("FILE REF: ", fileRef)

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("date", values.date.format("YYYY-MM-DD"));
    formData.append("time", values.time.format("HH:mm"));
    formData.append("cost", values.cost.toString());
    formData.append("funds", values.funds);
    formData.append("form", JSON.stringify(values.form));

    if (fileRef.current) {
      formData.append("image", fileRef.current);
    } else {
      console.error("No file selected");
    }

    createEvent.mutate(formData);
  };

  return { submit };
};
