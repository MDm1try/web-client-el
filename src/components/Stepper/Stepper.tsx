import {
  useMemo,
  Children,
  cloneElement,
  ReactNode,
  ReactElement,
} from "react";
import classcat from "classcat";
import { StepProps } from "./Step/Step";
import StepperContext from "./StepperContext";
import css from "./Stepper.module.css";

type Props = {
  className: string;
  activeStep: number;
  children: ReactNode[];
};

function Stepper({ children, activeStep, className }: Props) {
  const contextValue = useMemo(() => ({ activeStep }), [activeStep]);

  const childrenArray = Children.toArray(children).filter(Boolean);
  const steps = childrenArray.map((step, index) =>
    cloneElement<StepProps>(step as ReactElement<StepProps>, {
      index,
      last: index + 1 === childrenArray.length,
      ...(step as ReactElement<any>).props,
    }),
  );

  return (
    <StepperContext.Provider value={contextValue}>
      <div className={classcat([css.container, className])}>{steps}</div>
    </StepperContext.Provider>
  );
}

export default Stepper;
