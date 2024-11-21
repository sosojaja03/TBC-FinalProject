"use client";

import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/sign-in"); // Navigate to the Sign In page
  };

  return (
    <div>
      <Button className="bg-blue-600" onClick={handleSignIn}>
        Sign In
      </Button>
    </div>
  );
};

export default SignIn;
