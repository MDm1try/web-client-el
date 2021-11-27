import { useForm } from "react-hook-form";
import classcat from "classcat";
import usePhoneUpdate from "@/hooks/user/usePhoneUpdate";
import usePhone from "@/hooks/user/usePhone";
import { useEffect, useMemo } from "react";
import { UK_CODE } from "@/constants";

type FormValues = {
  phone: string;
};

function MobileChangeForm() {
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors, isSubmitted },
  } = useForm<FormValues>();

  const currentPhone = watch(`phone`);

  const { data, error: loadingError, isLoading } = usePhone();
  const [{ isPending, error }, updatePhoneNumber] = usePhoneUpdate();

  useEffect(() => {
    if (data?.phone) {
      setValue(`phone`, data.phone.replace(`${UK_CODE}`, ``));
    }
  }, [data, setValue]);

  const handleRequest = ({ phone }: FormValues) => {
    updatePhoneNumber(`${UK_CODE}${phone}`);
  };

  const disabled = useMemo(() => {
    if (data?.phone && currentPhone) {
      return data?.phone.replace(`${UK_CODE}`, ``) === currentPhone;
    }
    return false;
  }, [data?.phone, currentPhone]);

  const isPhoneValid = useMemo(
    () => !errors?.phone?.message && !error?.message,
    [error?.message, errors?.phone?.message],
  );

  return (
    <form
      onSubmit={handleSubmit(handleRequest)}
      className="needs-validation col-12 col-lg-5"
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
              "is-invalid": !isPhoneValid,
              "is-valid": isSubmitted && isPhoneValid,
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
      {loadingError && (
        <div className="text-danger mb-3">{loadingError.message}</div>
      )}
      <button
        type="submit"
        className="btn btn-primary mt-3"
        disabled={isPending || isLoading || disabled}
      >
        Сохранить
        {isPending && (
          <div
            className="spinner-border spinner-border-sm ms-2"
            role="status"
          />
        )}
      </button>
    </form>
  );
}

export default MobileChangeForm;
