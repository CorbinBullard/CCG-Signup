import { Event } from "../../events/event.types";
import { SCF } from "../../scf/scf.type";
import { Response } from "./response.type";

export type Signup = {
  id: number;
  event: Event;
  responses: Response[];
  note: string;
  signupConsentForms: SCF[]
};
