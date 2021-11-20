import classcat from "classcat";
import Image from "next/image";
import { SyntheticEvent } from "react";
import { Control, useWatch } from "react-hook-form";

import { ImagePostEnum, ImagePostForm } from "@/types";

import css from "./AddImages.module.css";

type Props = {
  name: ImagePostEnum;
  control: Control<any>;
  onRemove(event: SyntheticEvent): void;
};

function ImageContainer({ name, control, onRemove }: Props) {
  const file = useWatch<ImagePostForm>({
    control,
    name,
  });

  if (file && file[0]) {
    return (
      <div className={css.container}>
        <button
          type="button"
          className={classcat([`btn`, css.remove])}
          onClick={onRemove}
        >
          <i className="bi bi-x-lg" />
        </button>
        <Image
          src={URL.createObjectURL(file[0])}
          width="100%"
          height="100%"
          objectFit="contain"
          alt="loaded image"
          unoptimized
        />
      </div>
    );
  }

  return (
    <div className={css.container}>
      <i className="bi bi-plus-circle-fill bi-2x" />
    </div>
  );
}

export default ImageContainer;
