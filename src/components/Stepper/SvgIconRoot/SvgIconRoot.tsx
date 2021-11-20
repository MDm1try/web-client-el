import classcat from "classcat";
import css from "./SvgIconRoot.module.css";

type Props = {
  children: JSX.Element | any;
  active: boolean;
};

function SvgIconRoot({ children, active }: Props) {
  return (
    <svg className={classcat([css.container, { [css.active]: active }])}>
      {children}
    </svg>
  );
}

export default SvgIconRoot;
