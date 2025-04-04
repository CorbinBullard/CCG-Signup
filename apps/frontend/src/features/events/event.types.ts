import { Form } from "../forms/form.types";

export type Event = {
  title: string;
  description?: string;
  date: Date;
  time: string;
  image: string;
  cost: number;
  form: Form;
}