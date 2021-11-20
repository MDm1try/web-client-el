import { SyntheticEvent, useCallback } from "react";

import { FileInput } from "@/components/FileInput";
import { useFormContext } from "react-hook-form";

import { ImagePostForm, ImagePostEnum } from "@/types";
import css from "./AddImages.module.css";
import ImageContainer from "./ImageContainer";

type Props = {
  onNext(): void;
  onBack(): void;
};

function AddImages({ onNext, onBack }: Props) {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValidating },
  } = useFormContext<ImagePostForm>();

  const handleRequest = () => onNext();

  const handleRemove = useCallback(
    (name: string) => (event: SyntheticEvent) => {
      event.preventDefault();
      setValue(name as ImagePostEnum, undefined);
    },
    [setValue],
  );

  return (
    <form className="mt-4" onSubmit={handleSubmit(handleRequest)}>
      <div className={css.images}>
        {Object.keys(ImagePostEnum).map((name) => (
          <FileInput
            key={name}
            inputClass={css.fileInput}
            register={register(name as ImagePostEnum, {
              required: false,
              validate: {
                lessThan5MB: (files) => {
                  if (files && files[0]) {
                    return (
                      files[0].size < 5000000 ||
                      `This file is too large. Please, upload file less than 5 MB`
                    );
                  }
                  return true;
                },
              },
            })}
            accept="image/*"
          >
            <>
              <ImageContainer
                name={name as ImagePostEnum}
                control={control}
                onRemove={handleRemove(name)}
              />
              <div className={css.error}>
                {errors[name as ImagePostEnum]?.message}
              </div>
            </>
          </FileInput>
        ))}
      </div>
      <div className="d-flex justify-content-between mt-4">
        <button type="button" className="btn btn-primary" onClick={onBack}>
          Предыдущая
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isValidating}
        >
          Следующая
        </button>
      </div>
    </form>
  );
}

export default AddImages;
