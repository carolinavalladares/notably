"use client";
import React, { useState } from "react";
import TRANSLATIONS from "@/CONSTS/translations";
import { useForm, SubmitHandler } from "react-hook-form";
import useTranslation from "@/hooks/useTranslation";
import AvatarSelect from "@/components/AvatarSelect";

interface IFormValues {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}

const page = () => {
  const { language } = useTranslation();
  const [image, setImage] = useState<string>("avatar_01");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>();

  const submit: SubmitHandler<IFormValues> = (values) => {
    const { email, name, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      return console.log(TRANSLATIONS[language].validation.password);
    }

    const registerData = {
      email,
      name,
      password,
      image,
    };
    console.log(registerData);
  };

  return (
    <div>
      <h1 className="text-text-color py-7 text-center text-3xl font-bold">
        {TRANSLATIONS[language].text.welcomeText}
      </h1>

      {/* Login form */}
      <div className="flex items-center justify-center">
        <form
          onSubmit={handleSubmit(submit)}
          className="bg-background-primary p-4 w-full max-w-lg shadow-md"
        >
          <h2 className="text-text-color text-lg font-medium">
            {TRANSLATIONS[language].text.registerTitle}
          </h2>

          <div className="flex items-center justify-center my-2">
            <AvatarSelect image={image} setImage={setImage} />
          </div>

          <div className="mt-4">
            {/* username input */}
            <div className="flex flex-col mb-6 relative">
              <label className="text-text-color text-sm mb-1" htmlFor="name">
                {TRANSLATIONS[language].labels.username}:
              </label>
              <input
                type="text"
                placeholder={TRANSLATIONS[language].placeholders.unsername}
                className={`placeholder:text-sm bg-background-primary border  focus:border-gray-700 outline-none h-10 px-2 text-sm text-text-color placeholder:font-extralight placeholder:text-text-color ${
                  errors.name ? "border-rose-500" : "border-border-color"
                }`}
                {...register("name", { required: true })}
              />

              {errors.name && (
                <p className="absolute text-rose-500 font-medium text-[11px] top-full">
                  {TRANSLATIONS[language].validation.required}
                </p>
              )}
            </div>
            {/* Email input */}
            <div className="flex flex-col mb-6 relative">
              <label className="text-text-color text-sm mb-1" htmlFor="email">
                {TRANSLATIONS[language].labels.email}:
              </label>
              <input
                type="email"
                placeholder={TRANSLATIONS[language].placeholders.email}
                className={`placeholder:text-sm bg-background-primary border  focus:border-gray-700 outline-none h-10 px-2 text-sm text-text-color placeholder:font-extralight placeholder:text-text-color ${
                  errors.email ? "border-rose-500" : "border-border-color"
                }`}
                {...register("email", { required: true })}
              />

              {errors.email && (
                <p className="absolute text-rose-500 font-medium text-[11px] top-full">
                  {TRANSLATIONS[language].validation.required}
                </p>
              )}
            </div>
            {/* Password input */}
            <div className="flex flex-col mb-6 relative">
              <label className="text-text-color text-sm mb-1" htmlFor="email">
                {TRANSLATIONS[language].labels.password}:
              </label>
              <input
                type="text"
                placeholder={TRANSLATIONS[language].placeholders.password}
                className={`placeholder:text-sm bg-background-primary border  focus:border-gray-700 outline-none h-10 px-2 text-sm text-text-color placeholder:font-extralight placeholder:text-text-color ${
                  errors.password ? "border-rose-500" : "border-border-color"
                }`}
                {...register("password", { required: true })}
              />

              {errors.password && (
                <p className="absolute text-rose-500 font-medium text-[11px] top-full">
                  {TRANSLATIONS[language].validation.required}
                </p>
              )}
            </div>
            {/* Confirm password input */}
            <div className="flex flex-col mb-6 relative">
              <label
                className="text-text-color text-sm mb-1"
                htmlFor="confirmPassword"
              >
                {TRANSLATIONS[language].labels.confirmPassword}:
              </label>
              <input
                type="text"
                placeholder={
                  TRANSLATIONS[language].placeholders.confirmPassword
                }
                className={`placeholder:text-sm bg-background-primary border  focus:border-gray-700 outline-none h-10 px-2 text-sm text-text-color placeholder:font-extralight placeholder:text-text-color ${
                  errors.confirmPassword
                    ? "border-rose-500"
                    : "border-border-color"
                }`}
                {...register("confirmPassword", { required: true })}
              />

              {errors.confirmPassword && (
                <p className="absolute text-rose-500 font-medium text-[11px] top-full">
                  {TRANSLATIONS[language].validation.required}
                </p>
              )}
            </div>
            <div className="flex justify-end">
              <button
                title={TRANSLATIONS[language].labels.register}
                className="w-full bg-accent text-white font-semibold text-base px-4 py-2 justify-self-end"
              >
                {TRANSLATIONS[language].labels.register}
              </button>
            </div>

            <p className="text-text-color text-[13px] text-center mt-4">
              {TRANSLATIONS[language].text.hasAccount}{" "}
              <a className="text-accent hover:underline" href="/login">
                {TRANSLATIONS[language].labels.login}
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
