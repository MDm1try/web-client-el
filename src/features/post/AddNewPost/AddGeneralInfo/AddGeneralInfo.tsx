import { useFormContext } from "react-hook-form";
import Dropdown from "react-bootstrap/Dropdown";
import useTranslation from "next-translate/useTranslation";
import classcat from "classcat";

import { LAND_PURPOSE_OPTIONS, POST_TYPE_OPTIONS } from "@/constants";
import {
  CurrencyCodeEnum,
  CurrencyFontEnum,
  GeneralInfoPostForm,
} from "@/types";

import getParcelInfo from "@/lib/parcel/getParcelInfo";
import css from "./AddGeneralInfo.module.css";

type Props = {
  onNext(): void;
};

function AddGeneralInfo({ onNext }: Props) {
  const { t } = useTranslation(`post`);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<GeneralInfoPostForm>();

  const checkCadastralNumber = async (cadNum: string) => {
    const { message, isValid, data } = await getParcelInfo(cadNum);
    if (isValid) {
      setValue(`shape`, data?.shape ?? []);
      return true;
    }
    return message;
  };

  const handleSelectCurrency = (key: string | null) => {
    if (key) {
      setValue(`currency`, key as CurrencyCodeEnum);
    }
  };

  const handleRequest = () => {
    onNext();
  };

  const currency = watch(`currency`);
  return (
    <form className="mt-4" onSubmit={handleSubmit(handleRequest)}>
      <div className="mb-3 col-6 pe-3">
        <label htmlFor="title" className="form-label">
          Название
        </label>
        <input
          id="title"
          type="text"
          placeholder="Название"
          className={classcat([
            `form-control`,
            { "is-invalid": !!errors?.name?.message },
          ])}
          {...register(`name`, {
            required: `A name is required`,
          })}
        />
        <div className="invalid-feedback">{errors?.name?.message}</div>
      </div>
      <div className="mb-3 col-6 pe-3">
        <label htmlFor="type" className="form-label">
          Тип объявления
        </label>
        <select
          id="type"
          className={classcat([
            `form-select`,
            { "is-invalid": !!errors?.type?.message },
          ])}
          {...register(`type`, {
            valueAsNumber: true,
            validate: {
              notSelected: (value: any) =>
                value === `select-option` ? `A post type is required` : true,
            },
          })}
          defaultValue="select-option"
        >
          <option hidden value="select-option">
            {t(`select-option`)}
          </option>
          {POST_TYPE_OPTIONS.map((item) => (
            <option key={item.value} value={item.value}>
              {t(item.name)}
            </option>
          ))}
        </select>
        <div className="invalid-feedback">{errors?.type?.message}</div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="cost" className="form-label">
            Цена
          </label>
          <div className="input-group">
            <input
              id="cost"
              type="number"
              className={classcat([
                `form-control`,
                { "is-invalid": !!errors?.cost?.message },
              ])}
              {...register(`cost`, {
                required: `A cost number is required`,
                valueAsNumber: true,
              })}
            />
            <Dropdown onSelect={handleSelectCurrency}>
              <Dropdown.Toggle
                variant="btn btn-secondary"
                className={css.currencyBtn}
              >
                {CurrencyFontEnum[currency]}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {Object.values(CurrencyCodeEnum).map((code) => (
                  <Dropdown.Item
                    key={code}
                    eventKey={code}
                    active={currency === code}
                  >
                    {CurrencyFontEnum[code]}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="invalid-feedback">{errors?.cost?.message}</div>
        </div>
        <div className="col">
          <label htmlFor="area" className="form-label">
            Площадь участка
          </label>
          <div className="input-group">
            <input
              id="area"
              type="number"
              className={classcat([
                `form-control`,
                { "is-invalid": !!errors?.area?.message },
              ])}
              {...register(`area`, {
                required: `An area number is required`,
                valueAsNumber: true,
              })}
            />
            <span className="input-group-text">Га</span>
          </div>
          <div className="invalid-feedback">{errors?.area?.message}</div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="cadNum" className="form-label">
            Кадастровый номер
          </label>
          <input
            id="cadNum"
            type="text"
            placeholder="XXXXXXXXX:XX:XXX:XXXX"
            className={classcat([
              `form-control`,
              { "is-invalid": !!errors?.cadNum?.message },
            ])}
            {...register(`cadNum`, {
              required: `A cadastral number is required`,
              validate: checkCadastralNumber,
              pattern: {
                message: `Invalid cadastral number`,
                value: /^[0-9]{10}:[0-9]{2}:[0-9]{3}:[0-9]{4}$/i,
              },
            })}
          />
          <div className="invalid-feedback">{errors?.cadNum?.message}</div>
        </div>
        <div className="col">
          <label htmlFor="purpose" className="form-label">
            Назначение
          </label>
          <select
            id="purpose"
            className={classcat([
              `form-select`,
              { "is-invalid": !!errors?.purpose?.message },
            ])}
            {...register(`purpose`, {
              valueAsNumber: true,
              validate: {
                notSelected: (value: any) =>
                  value === `select-option` ? `A purpose is required` : true,
              },
            })}
            defaultValue="select-option"
          >
            <option hidden value="select-option">
              {t(`select-option`)}
            </option>
            {LAND_PURPOSE_OPTIONS.map((item) => (
              <option key={item.value} value={item.value}>
                {t(item.name)}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">{errors?.purpose?.message}</div>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="form-label">
          Описание
        </label>
        <textarea
          id="description"
          rows={3}
          placeholder="Описание"
          className={classcat([
            `form-control`,
            { "is-invalid": !!errors?.description?.message },
          ])}
          {...register(`description`, {
            required: `A description is required`,
            minLength: {
              message: `A description must be contain more than 80 symbols`,
              value: 80,
            },
          })}
        />
        <div className="invalid-feedback">{errors?.description?.message}</div>
      </div>
      <div className="d-flex justify-content-between">
        <button
          type="button"
          className="btn btn-primary"
          onClick={onNext}
          disabled
        >
          Предыдущая
        </button>
        <button type="submit" className="btn btn-primary">
          Следующая
        </button>
      </div>
    </form>
  );
}

export default AddGeneralInfo;
