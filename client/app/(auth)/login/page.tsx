"use client";

import { useEffect, useState } from "react";
import TRANSLATIONS from "@/CONSTS/translations";
import { useForm, SubmitHandler } from "react-hook-form";
import useTranslation from "@/hooks/useTranslation";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Button from "@/components/Button";
import Loading from "@/components/Loading";

interface IFormValues {
  email: string;
  password: string;
}

const login = () => {
  const { user, signIn, userLoading } = useAuth();
  const router = useRouter();
  const { language } = useTranslation();
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
  }, [user]);

  // display loading screen
  if (userLoading) {
    return <Loading />;
  }

  const submit: SubmitHandler<IFormValues> = async (values) => {
    const { email, password } = values;
    setLoading(true);

    try {
      await signIn({ email, password });
    } catch (e) {
      console.log(e);
      toast.error(TRANSLATIONS[language].validation.loginFailed);
    }

    setLoading(false);
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
            {TRANSLATIONS[language].text.loginTitle}
          </h2>

          <div className="mt-4">
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
            <div className="flex justify-end">
              {/* submit btn */}
              <Button
                title={TRANSLATIONS[language].labels.login}
                label={TRANSLATIONS[language].labels.login}
                type="submit"
                loading={loading}
              />
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
