import { useForm } from "react-hook-form";
import classcat from "classcat";
import useNameUpdate from "@/hooks/user/useNameUpdate";

type FormValues = {
  firstName: string;
  lastName: string;
};

function NameChangeForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitted },
  } = useForm<FormValues>();

  const [{ isPending, error }, update] = useNameUpdate();

  const handleRequest = ({ firstName, lastName }: FormValues) => {
    update(firstName, lastName);
  };

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
      <button
        type="submit"
        className="btn btn-primary mt-3"
        disabled={isPending}
      >
        Сохранить
      </button>
    </form>
  );
}

export default NameChangeForm;
