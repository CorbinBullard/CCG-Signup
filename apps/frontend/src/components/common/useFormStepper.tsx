import React, { useEffect, useState } from "react";
import { useStepper } from "./useStepper";
import { Button, FormInstance, Steps } from "antd";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";

export default function useFormStepper(form: FormInstance, formSteps, submit) {
  const { current, next, prev, reset } = useStepper(formSteps.length);
  const [currForm, setCurrForm] = useState(formSteps[current]);

  useEffect(() => {
    setCurrForm(formSteps[current]);
  }, [current, formSteps]);

  const nextForm = async () => {
    try {
      await form.validateFields(currForm.fields);
      next();
    } catch (error) {
      console.error(error);
    }
  };
  const previousForm = () => {
    prev();
  };

  const submitForm = async () => {
    try {
      await form.validateFields(currForm.fields);
      submit();
    } catch (error) {
      console.error(error);
    }
  };

  const PreviousFormButton = () => (
    <div style={{ display: current > 0 ? "block" : "none" }}>
      <Button
        icon={<CaretLeftOutlined />}
        onClick={previousForm}
        style={{ marginRight: 8 }}
      >
        Previous
      </Button>
    </div>
  );

  const NextFormButton = () => (
    <div style={{ display: current < formSteps.length - 1 ? "block" : "none" }}>
      <Button
        icon={<CaretRightOutlined />}
        onClick={async () => {
          try {
            await form.validateFields(currForm.fields);
            nextForm();
          } catch (error) {
            console.error(error);
          }
        }}
      >
        Next
      </Button>
    </div>
  );

  const SubmitFormButton = () => (
    <div
      style={{ display: current === formSteps.length - 1 ? "block" : "none" }}
    >
      <Button type="primary" onClick={submitForm}>
        Submit
      </Button>
    </div>
  );

  const Stepper = () => (
    <Steps
      current={current}
      items={formSteps.map((step) => {
        return {
          title: step.stepperLabel,
        };
      })}
    />
  );
  const StepperForm = () => (
    <>
      {formSteps.map((step, index) => (
        <div
          key={index}
          style={{
            display: current === index ? "block" : "none",
          }}
        >
          {step.form}
        </div>
      ))}
    </>
  );

  return {
    NextFormButton,
    PreviousFormButton,
    SubmitFormButton,
    Stepper,
    StepperForm,
    current,
    reset,
  };
}
