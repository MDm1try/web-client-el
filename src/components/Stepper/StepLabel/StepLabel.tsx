import { ReactNode, useContext } from "react";

import StepContext from "../StepContext";
import { CheckCircle } from "../CheckCircle";
import { CircleIcon } from "../CircleIcon";
import { SvgIconRoot } from "../SvgIconRoot";

import css from "./StepLabel.module.css";

type StepLabelRootProps = {
  icon: ReactNode;
  label: ReactNode;
};

function StepLabelRoot({ icon, label }: StepLabelRootProps) {
  return (
    <span className={css.container}>
      <span className={css.icon}>{icon}</span>
      <span className={css.text}>{label}</span>
    </span>
  );
}

type StepLabelProps = {
  children: ReactNode;
};

function StepLabel({ children }: StepLabelProps) {
  const { active, completed, index } = useContext(StepContext);

  if (completed) {
    return (
      <StepLabelRoot
        icon={
          <SvgIconRoot active>
            <CheckCircle />
          </SvgIconRoot>
        }
        label={children}
      />
    );
  }

  return (
    <StepLabelRoot
      icon={
        <SvgIconRoot active={active}>
          <CircleIcon>{index + 1}</CircleIcon>
        </SvgIconRoot>
      }
      label={children}
    />
  );
}

export default StepLabel;
