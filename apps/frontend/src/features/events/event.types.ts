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
  funds?: FundLocationEnum;
  signups: [];
};
