import { createContext } from "react";

type Props = {
  active: boolean;
  completed: boolean;
  last: boolean;
  disabled: boolean;
  index: number;
};

const StepContext = createContext<Props>({
  active: false,
  completed: false,
  disabled: false,
  last: false,
  index: 0,
});

export default StepContext;
