import React, { useEffect, useState } from "react";
import { useStepper } from "./useStepper";
import { Button, FormInstance, Steps } from "antd";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";

function getAllFieldPaths(obj, prefix = []) {
  let paths = [];
  for (let key in obj) {
    if (
      obj[key] !== null &&
      typeof obj[key] === "object" &&
      !Array.isArray(obj[key])
    ) {
      // Dive deeper
      paths = paths.concat(getAllFieldPaths(obj[key], [...prefix, key]));
    } else {
      // End node
      paths.push([...prefix, key]);
    }
  }
  return paths;
}

// Helper to check if a value is a nested object (not array, not null)
function isNestedField(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

// Helper to build the array of fields to validate for a step
function buildFieldsToValidate(form, currForm) {
  let fieldsToValidate = [];
  for (const field of currForm.fields) {
    console.log("Field: ", field);
    const value = form.getFieldValue(field);
    if (isNestedField(value)) {
      const nestedFields = getAllFieldPaths(value, [field]);
      fieldsToValidate.push(...nestedFields);
    } else {
      fieldsToValidate.push(field);
    }
  }
  return fieldsToValidate;
}

export default function useFormStepper(form: FormInstance, formSteps, submit) {
  const { current, next, prev, reset } = useStepper(formSteps.length);
  const [currForm, setCurrForm] = useState(formSteps[current]);

  useEffect(() => {
    setCurrForm(formSteps[current]);
  }, [current, formSteps]);

  const nextForm = async () => {
    try {
      const fieldsToValidate = buildFieldsToValidate(form, currForm);
      console.log("fields to validate: ", fieldsToValidate);
      await form.validateFields(fieldsToValidate);
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
      const fieldsToValidate = buildFieldsToValidate(form, currForm);
      await form.validateFields(fieldsToValidate);
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
            const fieldsToValidate = buildFieldsToValidate(form, currForm);
            await form.validateFields(fieldsToValidate);
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
