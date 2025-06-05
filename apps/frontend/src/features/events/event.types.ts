import { ConsentForm } from "../consentForms/consentForm.type";
import { Form } from "../forms/form.types";
import { FundLocationEnum } from "./fund.type";

export type Event = {
  title: string;
  description?: string;
  date: Date;
  time: string;
  image: string;
  cost: number;
  form: Form;
  isActive: boolean;
  funds?: FundLocationEnum;
  signups: [];
  signupLimit: number;
  id?: number;
  eventConsentForms?: ConsentForm[];
};
