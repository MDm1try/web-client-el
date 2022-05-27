import { useFormContext } from "react-hook-form";
import Dropdown from "react-bootstrap/Dropdown";
import useTranslation from "next-translate/useTranslation";
import classcat from "classcat";
import { useRouter } from "next/router";

import {
  LAND_PURPOSE_OPTIONS,
  PHONE_REGEX,
  POST_TYPE_OPTIONS,
} from "@/constants";
import {
  CostPerEnum,
  CurrencyCodeEnum,
  CurrencyFontEnum,
  GeneralInfoPostForm,
  PostTypeEnum,
} from "@/types";

import getParcelInfo from "@/lib/parcel/getParcelInfo";
import { useMemo, useState } from "react";
import css from "./AddGeneralInfo.module.css";

type Props = {
  onNext(): void;
};

function AddGeneralInfo({ onNext }: Props) {
  const router = useRouter();
  const { t } = useTranslation(`post`);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<GeneralInfoPostForm>();
  const [isCadNumUpdating, setIsCadNumUpdating] = useState(false);

  const checkCadastralNumber = async (cadNum: string) => {
    setIsCadNumUpdating(true);
    const { message, isValid, data } = await getParcelInfo(cadNum);
    setIsCadNumUpdating(false);
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

  const handleSelectCostPer = (key: string | null) => {
    if (key) {
      setValue(`costPer`, key as CostPerEnum);
    }
  };

  const handleRequest = () => {
    onNext();
  };

  const currency = watch(`currency`);
  const selectedCostPer = watch(`costPer`);
  const selectedType = watch(`type`);

  const isRent = useMemo(
    () => selectedType === PostTypeEnum.LAND_RENT,
    [selectedType],
  );

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
            required: `required`,
            minLength: {
              message: `must be contain more than 16 symbols`,
              value: 15,
            },
            maxLength: {
              message: `must be contain less than 70 symbols`,
              value: 70,
            },
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
                value === `select-option` || Number.isNaN(value)
                  ? `required`
                  : true,
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
            Цена*
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
                required: `required`,
                valueAsNumber: true,
                validate: (v) => v > 0 || `should be more than 0`,
              })}
            />
            <Dropdown onSelect={handleSelectCurrency}>
              <Dropdown.Toggle
                variant="btn btn-outline-secondary dropdown-toggle"
                className={isRent ? `rounded-0` : css.costToggleBtn}
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
            {isRent && (
              <Dropdown onSelect={handleSelectCostPer}>
                <Dropdown.Toggle
                  variant="btn btn-outline-secondary dropdown-toggle"
                  className={css.costToggleBtn}
                >
                  {t(selectedCostPer)}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {Object.values(CostPerEnum).map((costPer) => (
                    <Dropdown.Item
                      key={costPer}
                      eventKey={costPer}
                      active={costPer === selectedCostPer}
                    >
                      {t(costPer)}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            )}
            <div className="invalid-feedback">{errors?.cost?.message}</div>
          </div>
          <div className="invalid-feedback">{errors?.cost?.message}</div>
        </div>
        <div className="col">
          <label htmlFor="areaHectares" className="form-label">
            Площадь участка
          </label>
          <div className="input-group">
            <input
              id="areaHectares"
              type="number"
              className={classcat([
                `form-control`,
                { "is-invalid": !!errors?.areaHectares?.message },
              ])}
              {...register(`areaHectares`, {
                required: `required`,
                valueAsNumber: true,
                validate: (v) => Number(v) > 0 || `should be more than 0`,
              })}
            />
            <span className="input-group-text">Га</span>
            <div className="invalid-feedback">
              {errors?.areaHectares?.message}
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="cadNum" className="form-label">
            Кадастровый номер
          </label>
          <div className="input-group">
            <input
              id="cadNum"
              type="text"
              placeholder="XXXXXXXXX:XX:XXX:XXXX"
              className={classcat([
                `form-control`,
                { "is-invalid": !!errors?.cadNum?.message },
              ])}
              {...register(`cadNum`, {
                required: `required`,
                validate: checkCadastralNumber,
                pattern: {
                  message: `invalid cadastral number`,
                  value: /^[0-9]{10}:[0-9]{2}:[0-9]{3}:[0-9]{4}$/i,
                },
              })}
            />
            {isCadNumUpdating && (
              <div className="input-group-text">
                <div
                  className="spinner-border spinner-border-sm"
                  role="status"
                />
              </div>
            )}
            <div className="invalid-feedback">{errors?.cadNum?.message}</div>
          </div>
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
                  value === `select-option` || Number.isNaN(value)
                    ? `required`
                    : true,
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
      <div className="row mb-3">
        <div className="col">
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
                },
              ])}
              {...register(`phone`, {
                required: `required`,
                pattern: {
                  message: `Invalid phone number`,
                  value: PHONE_REGEX.WITHOUT_CODE,
                },
              })}
            />
            <div className="invalid-feedback">{errors?.phone?.message}</div>
          </div>
        </div>
        <div className="col">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={classcat([
              `form-control`,
              { "is-invalid": !!errors?.email?.message },
            ])}
            {...register(`email`, {
              required: `required`,
              pattern: {
                message: `Invalid email address`,
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.0]+\.[A-Z]{2,}$/i,
              },
            })}
          />
          <div className="invalid-feedback">{errors?.email?.message}</div>
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
            required: `required`,
            minLength: {
              message: `must be contain more than 80 symbols`,
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
          onClick={() => router.push(`/account`)}
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
