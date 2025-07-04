import FormForm from "../forms/FormForm";
import EventForm from "./components/EventForm";
import AttachCFToEventForm from "../ecf/AttachCFToEventForm";

export const createEventFormSteps = (fileRef) => [
  {
    form: <EventForm ref={fileRef} />,
    fields: ["title", "date", "time", "cost", "funds", "image", "description"],
    stepperLabel: "Event Details",
  },
  {
    form: <FormForm mode="create" />,
    fields: ["form"],
    stepperLabel: "Build Form",
  },
  {
    form: <AttachCFToEventForm />,
    fields: ["consentForms"],
    stepperLabel: "Consent Forms",
  },
];
