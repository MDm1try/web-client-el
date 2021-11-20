import { useGoogleMap } from "@react-google-maps/api";
import { useEffect } from "react";
import { createPortal } from "react-dom";

import css from "./CustomDrawingManagerControls.module.css";

type Props = {
  position: google.maps.ControlPosition;
  children: JSX.Element;
};

function CustomDrawingManagerControls({ position, children }: Props) {
  const map = useGoogleMap();

  const controlDiv = document.createElement(`div`);

  useEffect(() => {
    if (map) {
      const controls = map.controls[position];
      const index = controls.getLength();
      controls.push(controlDiv);
      return () => {
        controls.removeAt(index);
      };
    }
  }, [controlDiv, map, position]);

  return createPortal(
    <div className={css.container}>{children}</div>,
    controlDiv,
  );

  return null;
}

export default CustomDrawingManagerControls;
