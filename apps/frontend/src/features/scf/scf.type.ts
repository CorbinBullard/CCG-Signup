import { ConsentForm } from "../consentForms/consentForm.type";

export type SCF = {
  consentForm: ConsentForm;
  agreed: boolean;
  agreedAt?: Date;
};
