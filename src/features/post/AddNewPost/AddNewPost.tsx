import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

import { Stepper } from "@/components/Stepper";
import { StepLabel } from "@/components/Stepper/StepLabel";
import { Step } from "@/components/Stepper/Step";
import {
  CostPerEnum,
  CurrencyCodeEnum,
  FileUploadTask,
  ImagePostEnum,
  Media,
  PostForm,
  PostTypeEnum,
} from "@/types";
import useFileUpload from "@/hooks/useFileUpload";
import { createFileUploadTask } from "@/utils/upload";
import usePostCreate from "@/hooks/account/usePostCreate";
import { useRouter } from "next/router";
import { AddLandPlot } from "./AddLandPlot";
import { AddImages } from "./AddImages";
import { AddGeneralInfo } from "./AddGeneralInfo";

const STEPPER_MAP = {
  ADD_GENERAL_INFO: 0,
  ADD_IMAGES: 1,
  DESIGNATE_LAND_PLOT: 2,
};

const bucket = process.env.FIREBASE_STORAGE_BUCKET as string;

const createUploadKey = (file: File) => file.name;
const optionsMap = new Map([
  [
    `image`,
    {
      bucket,
      accept: `images/*`,
      createKey: createUploadKey,
      multiple: false,
    },
  ],
]);

function AddNewPost() {
  const router = useRouter();
  const [{ isPending: isMediaLoading, error: uploadingError }, upload] =
    useFileUpload();
  const [
    {
      isPending: isPostCreating,
      error: creatingPostError,
      data: isPostCreated,
    },
    create,
  ] = usePostCreate();

  const methods = useForm<PostForm>({
    defaultValues: {
      currency: CurrencyCodeEnum.UAH,
      shape: [],
      costPer: CostPerEnum.PER_YEAR,
    },
  });
  const [activeStep, setActiveStep] = useState(STEPPER_MAP.ADD_GENERAL_INFO);

  const steps = [
    { id: STEPPER_MAP.ADD_GENERAL_INFO, label: `Заполнить общую информацию` },
    { id: STEPPER_MAP.ADD_IMAGES, label: `Добавить изображения` },
    { id: STEPPER_MAP.DESIGNATE_LAND_PLOT, label: `Обозначить объект` },
  ];

  const handleBack = useCallback(() => {
    setActiveStep(activeStep - 1);
  }, [activeStep]);

  const handleNext = useCallback(() => {
    setActiveStep(activeStep + 1);
  }, [activeStep]);

  const getUploadTasks = useCallback((): FileUploadTask[] => {
    const values = methods.getValues();

    const files = Object.keys(ImagePostEnum)
      .map((key) => {
        const filelist = values[key as ImagePostEnum];
        return filelist?.length ? filelist[0] : null;
      })
      .filter((file) => file) as File[];

    return files.map((file) => createFileUploadTask(file, optionsMap));
  }, [methods]);

  const createPost = useCallback(
    (medias: Media[] = []) => {
      const values = methods.getValues();
      const post = {
        name: values.name,
        cadNum: values.cadNum,
        areaHectares: values.areaHectares,
        type: values.type,
        purpose: values.purpose,
        cost: values.cost,
        currency: values.currency,
        description: values.description,
        shape: values.shape,
        costPer: values.costPer,
        medias,
      };

      if (post.type !== PostTypeEnum.LAND_RENT) {
        delete post.costPer;
      }
      create(post);
    },
    [create, methods],
  );

  const handleSubmit = useCallback(() => {
    const tasks = getUploadTasks();
    if (tasks.length) {
      upload(tasks, createPost);
    } else {
      createPost();
    }
  }, [createPost, getUploadTasks, upload]);

  const content = useMemo(() => {
    switch (activeStep) {
      case STEPPER_MAP.ADD_GENERAL_INFO:
        return <AddGeneralInfo onNext={handleNext} />;
      case STEPPER_MAP.ADD_IMAGES:
        return <AddImages onBack={handleBack} onNext={handleNext} />;
      case STEPPER_MAP.DESIGNATE_LAND_PLOT:
        return (
          <AddLandPlot
            onBack={handleBack}
            onSubmit={handleSubmit}
            isCreating={isMediaLoading || isPostCreating}
          />
        );
      default:
        return null;
    }
  }, [
    isMediaLoading,
    isPostCreating,
    activeStep,
    handleBack,
    handleNext,
    handleSubmit,
  ]);

  useEffect(() => {
    if (!isPostCreating && !creatingPostError && isPostCreated) {
      router.push(`/`);
    }
  }, [isPostCreated, creatingPostError, isPostCreating, router]);

  return (
    <FormProvider {...methods}>
      <div className="mt-4 col-10 bg-white p-3 mb-3 rounded-3 m-auto">
        <Stepper activeStep={activeStep} className="py-3">
          {steps.map((step) => (
            <Step key={step.id}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {content}
        <div className="text-end text-error">
          {creatingPostError?.message}
          {uploadingError?.message}
        </div>
      </div>
    </FormProvider>
  );
}

export default AddNewPost;
