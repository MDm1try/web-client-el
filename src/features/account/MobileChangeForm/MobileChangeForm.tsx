import { useForm } from "react-hook-form";
import classcat from "classcat";
import useUserPhoneUpdate from "@/hooks/user/useUserPhoneUpdate";

type FormValues = {
  phone: string;
};

function MobileChangeForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitted },
  } = useForm<FormValues>();

  const [{ isPending, error }, updatePhoneNumber] = useUserPhoneUpdate();

  const handleRequest = ({ phone }: FormValues) => {
    updatePhoneNumber(phone);
    // registerUser(phone);
  };

  return (
    <form
      onSubmit={handleSubmit(handleRequest)}
      className="needs-validation col-12 col-lg-5"
      // className={classcat([`col-12 col-lg-5`, { "needs-validation": false }])}
    >
      <label htmlFor="phone" className="form-label">
        Мобильный телефон
      </label>
      <div className="input-group mb-3">
        <span className="input-group-text">+38</span>
        <input
          id="phone"
          type="tel"
          className={classcat([
            `form-control`,
            {
              "is-invalid": !!errors?.phone?.message,
              "is-valid": isSubmitted && !errors?.phone?.message,
            },
          ])}
          {...register(`phone`, {
            required: `A valid phone is required`,
            pattern: {
              message: `Invalid phone number`,
              value: /^\(?([0-9]{3})\)?([-]?)([0-9]{3})\2([0-9]{4})$/,
            },
          })}
        />
        <div className="invalid-feedback">{errors?.phone?.message}</div>
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

export default MobileChangeForm;
