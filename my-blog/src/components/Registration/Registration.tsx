"use client";
import { ProfileForm } from "./RegistrationForm";
// import { useParams } from "react-router-dom";
// import i18next from "i18next";
// import { useEffect } from "react";
export function RegistrationForm() {
  // const { lang } = useParams(); // Get the lang from the URL

  // useEffect(() => {
  //   if (lang && lang !== i18next.language) {
  //     i18next.changeLanguage(lang); // Change the language in i18next
  //   }
  // }, [lang]);
  return (
    <div className="container mx-auto mt-10">
      <h1 className="mb-4 text-2xl font-bold">Registration Form</h1>
      <p>
        Welcome to the registration page! Add your registration details here.
      </p>
      <ProfileForm />
    </div>
  );
}

export default RegistrationForm;
