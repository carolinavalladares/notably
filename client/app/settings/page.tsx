"use client";

import TRANSLATIONS from "@/CONSTS/translations";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useTranslation from "@/hooks/useTranslation";
import AvatarSelect from "@/components/AvatarSelect";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Button from "@/components/Button";
import { editUser } from "@/services/notablyAPI";
import Loading from "@/components/Loading";

interface IFormValues {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}

export default function page() {
  const { user, getMe, userLoading } = useAuth();
  const router = useRouter();
  const { language } = useTranslation();
  const [image, setImage] = useState<string>("avatar_01");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormValues>();
  const [loading, setLoading] = useState(false);

  // redirect to home page in case the user is logged in
  useEffect(() => {
    if (userLoading) {
      return;
    }

    if (user == null) {
      return router.push("/login");
    }

    setImage(user.image);
    setValue("name", user.name);
    setValue("email", user.email);
  }, [userLoading]);

  const submit: SubmitHandler<IFormValues> = async (values) => {
    if (!user) {
      return;
    }

    const { email, name, password, confirmPassword } = values;

    if (password != "") {
      if (password !== confirmPassword) {
        console.log(TRANSLATIONS[language].validation.password);
        return toast.error(TRANSLATIONS[language].validation.password);
      }
    }

    setLoading(true);

    try {
      await editUser(
        user.id,
        password != ""
          ? { email, name, password, image }
          : { email, name, image }
      );

      await getMe();
      toast.success(TRANSLATIONS[language].validation.userEditSuccess);
    } catch (e) {
      toast.error(TRANSLATIONS[language].validation.userEditFail);
    }

    setLoading(false);

    return router.push("/me");
  };

  // display loading screen
  if (userLoading) {
    return <Loading />;
  }

  return (
    <div className="pt-6">
      {/* Edit profile form */}
      <div className="flex items-center justify-center">
        <form
          onSubmit={handleSubmit(submit)}
          className="bg-background-primary p-4 w-full max-w-lg shadow-md"
        >
          <h2 className="text-text-color text-lg font-medium">
            {TRANSLATIONS[language].text.editProfile}
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
                disabled
                type="text"
                placeholder={TRANSLATIONS[language].placeholders.unsername}
                className={`placeholder:text-sm bg-background-primary border  focus:border-gray-700 outline-none h-10 px-2 text-sm text-text-color placeholder:font-extralight placeholder:text-text-color opacity-70 ${
                  errors.name ? "border-rose-500" : "border-border-color"
                }`}
                {...register("name", { required: true })}
              />
            </div>
            {/* Email input */}
            <div className="flex flex-col mb-6 relative">
              <label className="text-text-color text-sm mb-1" htmlFor="email">
                {TRANSLATIONS[language].labels.email}:
              </label>
              <input
                disabled
                type="email"
                placeholder={TRANSLATIONS[language].placeholders.email}
                className={`placeholder:text-sm bg-background-primary border  focus:border-gray-700 outline-none h-10 px-2 text-sm text-text-color placeholder:font-extralight placeholder:text-text-color opacity-70 ${
                  errors.email ? "border-rose-500" : "border-border-color"
                }`}
                {...register("email", { required: true })}
              />
            </div>
            {/* Password input */}
            <div className="flex flex-col mb-6 relative">
              <label className="text-text-color text-sm mb-1" htmlFor="email">
                {TRANSLATIONS[language].labels.password}:
              </label>
              <input
                type="password"
                placeholder={TRANSLATIONS[language].placeholders.editPassword}
                className={`placeholder:text-sm bg-background-primary border  focus:border-gray-700 outline-none h-10 px-2 text-sm text-text-color placeholder:font-extralight placeholder:text-text-color ${
                  errors.password ? "border-rose-500" : "border-border-color"
                }`}
                {...register("password")}
              />
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
                {...register("confirmPassword")}
              />
            </div>
            <div className="flex justify-end">
              {/* submit btn */}
              <Button
                type="submit"
                label={TRANSLATIONS[language].labels.save}
                title={TRANSLATIONS[language].labels.save}
                loading={loading}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
