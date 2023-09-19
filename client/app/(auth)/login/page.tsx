"use client";

import React from "react";
import TRANSLATIONS from "@/CONSTS/translations";
import { useForm, SubmitHandler } from "react-hook-form";
import useTranslation from "@/hooks/useTranslation";

interface IFormValues {
  email: string;
  password: string;
}

const login = () => {
  const { language } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>();

  const submit: SubmitHandler<IFormValues> = (values) => {
    console.log(values);
  };

  return (
    <div>
      <h1 className="text-text-color py-10 text-center text-3xl font-bold">
        {TRANSLATIONS[language].text.welcomeText}
      </h1>

      {/* Login form */}
      <div className="flex items-center justify-center">
        <form
          onSubmit={handleSubmit(submit)}
          className="bg-background-primary p-4 w-full max-w-lg shadow-md"
        >
          <h2 className="text-text-color text-lg font-medium">
            {TRANSLATIONS[language].text.loginTitle}
          </h2>

          <div className="mt-4">
            {/* Email input */}
            <div className="flex flex-col mb-6 relative">
              <label className="text-text-color text-sm mb-1" htmlFor="email">
                {TRANSLATIONS[language].labels.email}:
              </label>
              <input
                type="text"
                placeholder={TRANSLATIONS[language].placeholders.email}
                className={`bg-background-primary border  focus:border-gray-700 outline-none h-10 px-2 text-sm text-text-color placeholder:font-extralight placeholder:text-text-color ${
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
                className={`bg-background-primary border  focus:border-gray-700 outline-none h-10 px-2 text-sm text-text-color placeholder:font-extralight placeholder:text-text-color ${
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
            <div className="flex justify-end">
              <button
                title={TRANSLATIONS[language].labels.login}
                className="w-full bg-accent text-white font-semibold text-base capitalize px-4 py-2 justify-self-end"
              >
                {TRANSLATIONS[language].labels.login}
              </button>
            </div>

            <p className="text-text-color text-[13px] text-center mt-4">
              {TRANSLATIONS[language].text.noAccount}{" "}
              <a className="text-accent hover:underline" href="/register">
                {TRANSLATIONS[language].labels.register}
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default login;
