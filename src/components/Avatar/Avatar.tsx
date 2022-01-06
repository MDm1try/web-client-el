import Image from "next/image";
import person from "@/assets/icons/person.svg";

import classcat from "classcat";
import css from "./Avatar.module.css";

type Props = {
  src?: string;
};

function Avatar({ src }: Props) {
  return (
    <span className={classcat([css.container, `border rounded-circle p-1`])}>
      <Image
        src={src || person}
        width="75px"
        height="75px"
        objectFit="contain"
        alt="Avatar"
      />
    </span>
  );
}

export default Avatar;
