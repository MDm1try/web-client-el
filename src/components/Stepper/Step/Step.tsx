import { useContext, useMemo } from "react";

import StepContext from "../StepContext";
import StepperContext from "../StepperContext";

import { StepConnector } from "../StepConnector";

import css from "./Step.module.css";

export type StepProps = {
  children: JSX.Element;
  index?: number;
  last?: boolean;
  active?: boolean;
  completed?: boolean;
  disabled?: boolean;
};

function Step({
  children,
  active: activeProp,
  completed: completedProp,
  disabled: disabledProp,
  index = 0,
  last = false,
}: StepProps) {
  const { activeStep } = useContext(StepperContext);

  let [active = false, completed = false, disabled = false] = [
    activeProp,
    completedProp,
    disabledProp,
  ];

  if (activeStep === index) {
    active = activeProp !== undefined ? activeProp : true;
  } else if (activeStep > index) {
    completed = completedProp !== undefined ? completedProp : true;
  } else if (activeStep < index) {
    disabled = disabledProp !== undefined ? disabledProp : true;
  }

  const contextValue = useMemo(
    () => ({
      index,
      last,
      active,
      completed,
      disabled,
    }),
    [index, last, active, completed, disabled],
  );

  return (
    <StepContext.Provider value={contextValue}>
      <div className={css.container}>{children}</div>
      {!last && <StepConnector />}
    </StepContext.Provider>
  );
}

export default Step;
