import React, { ChangeEvent } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  labelClass?: string;
  inputClass?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  register?: UseFormRegisterReturn;
  onChange?(e: ChangeEvent<HTMLInputElement>): void;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  required?: boolean;
  children?: JSX.Element;
};

function FileInput({
  labelClass,
  inputClass,
  inputRef,
  register,
  onChange,
  children,
  accept,
  multiple,
  disabled,
  required,
}: Props) {
  return (
    <>
      <label className={labelClass}>
        <input
          className={inputClass}
          type="file"
          ref={inputRef}
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          required={required}
          onChange={onChange}
          {...register}
        />
        {children}
      </label>
    </>
  );
}

export default FileInput;
