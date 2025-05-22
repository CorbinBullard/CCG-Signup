import { useUpdateEvent } from "./useEvents";

export const useUpdateEventSubmission = (eventId, formRef, fileRef) => {
  const updateEvent = useUpdateEvent();

  const submit = async () => {
    const values = await formRef.validateFields();
    console.log("FORM: ", values);

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("date", values.date.format("YYYY-MM-DD"));
    formData.append("time", values.time.format("HH:mm"));

    formData.append("cost", values.cost.toString());
    formData.append("funds", values.funds);

    if (values.signupLimit) {
      formData.append("signupLimit", values.signupLimit.toString());
    } 

    if (fileRef.current) {
      formData.append("image", fileRef.current);
    }
    updateEvent.mutate({ id: eventId, event: formData });
  };

  return { submit };
};
