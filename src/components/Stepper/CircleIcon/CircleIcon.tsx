import css from "./CircleIcon.module.css";

type Props = {
  children: JSX.Element | any;
};

function CircleIcon({ children }: Props) {
  return (
    <>
      <circle cx="12" cy="12" r="12" />
      <text className={css.text} x="12" y="16" textAnchor="middle">
        {children}
      </text>
    </>
  );
}

export default CircleIcon;
