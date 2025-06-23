import { useState } from "react";

export function useStepper(stepsCount: number) {
  const [current, setCurrent] = useState(0);

  const next = async (validate?: () => Promise<any>) => {
    if (validate) {
      await validate();
    }
    setCurrent((prev) => (prev < stepsCount - 1 ? prev + 1 : prev));
  };

  const prev = () => {
    setCurrent((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const reset = () => {
    setCurrent(0);
  };

  return { current, next, prev, reset };
}
