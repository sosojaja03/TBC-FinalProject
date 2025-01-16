"use client";

import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/auth/sign-in"); // Navigate to the Sign In page
    console.log("SignIn");
  };

  return (
    <div>
      <Button className="bg-blue-500" onClick={handleSignIn}>
        Sign In
      </Button>
    </div>
  );
};

export default SignIn;
