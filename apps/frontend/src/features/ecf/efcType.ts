import { ConsentForm } from "../consentForms/consentForm.type";

export type ECF = ConsentForm & {
  required: boolean;
  consentForm: ConsentForm;
};
