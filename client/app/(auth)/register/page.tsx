"use client";
import React, { useEffect, useState } from "react";
import TRANSLATIONS from "@/CONSTS/translations";
import { useForm, SubmitHandler } from "react-hook-form";
import useTranslation from "@/hooks/useTranslation";
import AvatarSelect from "@/components/AvatarSelect";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Button from "@/components/Button";
import Loading from "@/components/Loading";

interface IFormValues {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}

const page = () => {
  const { user, signUp, userLoading } = useAuth();
  const router = useRouter();
  const { language } = useTranslation();
  const [image, setImage] = useState<string>("avatar_01");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>();
  const [loading, setLoading] = useState(false);

  // redirect to home page in case the user is logged in
  useEffect(() => {
    if (userLoading) {
      return;
    }

    if (user) {
      return router.push("/");
    }
  }, [userLoading]);

  // display loading screen
  if (userLoading) {
    return <Loading />;
  }

  const submit: SubmitHandler<IFormValues> = async (values) => {
    const { email, name, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      console.log(TRANSLATIONS[language].validation.password);
      return toast.error(TRANSLATIONS[language].validation.password);
    }

    setLoading(true);

    const registerData = {
      email,
      name,
      password,
      image,
    };

    try {
      await signUp(registerData);

      toast.success(TRANSLATIONS[language].validation.registerSuccess);
    } catch (e: any) {
      // email must be unique error message
      if (e.response.data.message.includes("users.email")) {
        setLoading(false);
        return toast.error(TRANSLATIONS[language].validation.emailUnique);
      }

      // general error message
      toast.error(TRANSLATIONS[language].validation.registerFailed);
    }

    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-text-color py-7 text-center text-3xl font-bold">
        {TRANSLATIONS[language].text.welcomeText}
      </h1>

      {/* Register form */}
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
                type="password"
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
                type="password"
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
              {/* submit btn */}
              <Button
                type="submit"
                label={TRANSLATIONS[language].labels.register}
                title={TRANSLATIONS[language].labels.register}
                loading={loading}
              />
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
