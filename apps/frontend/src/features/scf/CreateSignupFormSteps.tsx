import { ECF } from "../ecf/efcType";
import SignupConsentFormForm from "./SignupConsentFormForm";

export const CreateSignupFormSteps = (ecfs: ECF[]) =>
  ecfs.map((ecf, index) => {
    console.log(ecf);
    return {
      form: <SignupConsentFormForm ecf={ecf} fieldName={["consents", index]} />,
      fields: [["consents", index, "agreed"]],
      stepperLabel: ecf.name,
    };
  });
