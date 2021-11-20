import { useForm } from "react-hook-form";
import classcat from "classcat";
import useNameUpdate from "@/hooks/user/useNameUpdate";
import { useEffect, useMemo } from "react";
import useName from "@/hooks/user/useName";

type FormValues = {
  firstName: string;
  lastName: string;
};

function NameChangeForm() {
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors, isSubmitted },
  } = useForm<FormValues>();

  const { data, error: loadingError, isLoading } = useName();
  const [{ isPending, error }, update] = useNameUpdate();

  const handleRequest = ({ firstName, lastName }: FormValues) => {
    update(firstName, lastName);
  };

  const currentFirstName = watch(`firstName`);
  const currentLastName = watch(`lastName`);

  useEffect(() => {
    if (data?.firstName) {
      setValue(`firstName`, data.firstName);
    }
    if (data?.lastName) {
      setValue(`lastName`, data.lastName);
    }
  }, [data, setValue]);

  const disabled = useMemo(() => {
    if (
      data?.firstName &&
      data?.lastName &&
      currentFirstName &&
      currentLastName
    ) {
      return (
        data?.firstName === currentFirstName &&
        data?.lastName === currentLastName
      );
    }
    return false;
  }, [data?.firstName, data?.lastName, currentFirstName, currentLastName]);

  return (
    <form
      onSubmit={handleSubmit(handleRequest)}
      className="needs-validation col-12 col-lg-5"
    >
      <label htmlFor="firstName" className="form-label">
        Имя
      </label>
      <div className="input-group mb-3">
        <input
          id="firstName"
          type="text"
          className={classcat([
            `form-control`,
            {
              "is-invalid": !!errors?.firstName?.message,
              "is-valid": isSubmitted && !errors?.firstName?.message,
            },
          ])}
          {...register(`firstName`, {
            required: `A first name is required`,
          })}
        />
        <div className="invalid-feedback">{errors?.firstName?.message}</div>
      </div>
      <label htmlFor="lastName" className="form-label">
        Фамилия
      </label>
      <div className="input-group mb-3">
        <input
          id="lastName"
          type="text"
          className={classcat([
            `form-control`,
            {
              "is-invalid": !!errors?.lastName?.message,
              "is-valid": isSubmitted && !errors?.lastName?.message,
            },
          ])}
          {...register(`lastName`, {
            required: `A last name is required`,
          })}
        />
        <div className="invalid-feedback">{errors?.lastName?.message}</div>
      </div>
      {error && <div className="text-danger mb-3">{error.message}</div>}
      {loadingError && (
        <div className="text-danger mb-3">{loadingError.message}</div>
      )}
      <button
        type="submit"
        className="btn btn-primary mt-3"
        disabled={isPending || isLoading || disabled}
      >
        Сохранить
      </button>
    </form>
  );
}

export default NameChangeForm;
