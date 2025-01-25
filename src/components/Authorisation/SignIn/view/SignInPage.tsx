"use client";

import React from "react";
import { SignInForm } from "../SignInForm";
import Language from "@/components/NavBar/Language";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

const SignInPage: React.FC = () => {
  useTranslation();
  return (
    <div className="container relative mx-auto flex min-h-screen flex-col items-center justify-center p-8">
      <div className="absolute right-4 top-4">
        <Language />
      </div>
      <div className="flex flex-col items-center">
        <h1 className="mb-8 text-2xl font-bold">
          {t("SignIn-SignUp-Translation.SignIn")}
        </h1>
        <SignInForm />
      </div>
    </div>
  );
};

export default SignInPage;
