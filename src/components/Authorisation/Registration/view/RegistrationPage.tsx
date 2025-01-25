"use client";
import Language from "@/components/NavBar/Language";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { RegistrationForm } from "../RegistrationForm";

export function RegistrationPage() {
  useTranslation();
  return (
    <div className="container relative mx-auto flex min-h-screen flex-col items-center justify-center p-8">
      <div className="absolute right-4 top-4">
        <Language />
      </div>
      <div className="flex flex-col items-center gap-y-6">
        <h1 className="text-2xl font-bold">
          {t("SignIn-SignUp-Translation.Register")}
        </h1>{" "}
        <p>{t("SignIn-SignUp-Translation.Welcome")} </p>
        <RegistrationForm />
      </div>
    </div>
  );
}

export default RegistrationPage;
