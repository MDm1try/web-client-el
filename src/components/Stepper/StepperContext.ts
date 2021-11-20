import { createContext } from "react";

type Props = {
  activeStep: number;
};

const StepperContext = createContext<Props>({
  activeStep: 0,
});

export default StepperContext;
