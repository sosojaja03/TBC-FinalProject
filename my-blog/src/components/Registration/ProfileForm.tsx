"use client";

import React from "react";
import { SignInForm } from "./SignInForm"; // import { useParams } from "react-router-dom";
// import i18next from "i18next";

const SignInPage: React.FC = () => {
  // const { lang } = useParams(); // Get the lang from the URL

  // useEffect(() => {
  //   if (lang && lang !== i18next.language) {
  //     i18next.changeLanguage(lang); // Change the language in i18next
  //   }
  // }, [lang]);
  return (
    <div className="container mx-auto p-8">
      <h1 className="mb-4 text-2xl font-bold">Sign In</h1>
      <SignInForm />
    </div>
  );
};

export default SignInPage;
