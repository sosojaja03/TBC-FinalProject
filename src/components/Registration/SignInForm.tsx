"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/supabase"; // Make sure to import the supabase client
import { useTranslation } from "react-i18next";

// Validation schema

// Supabase login function
const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return data;
};

export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    console.log("successfully logged out");
    // Handle successful logout (e.g., redirect to login page)
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

export const SignInForm = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const { t } = useTranslation(); // Initialize the translation function

  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: t("SignIn-SignUp-Translation.email.required") }) // Use . instead of :
      .email({ message: t("SignIn-SignUp-Translation.email.invalid") }),
    password: z
      .string()
      .min(1, { message: t("SignIn-SignUp-Translation.password.required") }) // Add required validation
      .min(6, { message: t("SignIn-SignUp-Translation.password.minLength") }),
  });

  const handleReg = () => {
    console.log("Navigating to registration form...");
    navigate("/registration"); // Navigate to the registration form/page
  };

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    // mode: "onTouched", // This will validate on blur
  });

  // useMutation for login
  const {
    mutate: handleLogin,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: (data) => {
      console.log("User logged in:", data);
      // navigate("/dashboard"); // Redirect after successful login
      navigate("/MainPage");
    },
    onError: (error: any) => {
      console.error("Login failed:", error.message);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { email, password } = values;
    handleLogin({ email, password });
  };

  console.log("SignInForm rendered");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-80 space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              {form.formState.errors.email && (
                <FormMessage>
                  {t(form.formState.errors.email.message || "")}
                </FormMessage>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              {form.formState.errors.password && (
                <FormMessage>
                  {t(form.formState.errors.password.message || "")}
                </FormMessage>
              )}
            </FormItem>
          )}
        />
        <FormDescription>This is your public display name.</FormDescription>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Logging in..." : "Submit"}
        </Button>
        {isError && (
          <p className="text-red-500">
            {t("SignIn-SignUp-Translation.login.error", {
              defaultValue: (error as Error).message,
            })}
          </p>
        )}{" "}
      </form>

      {/* Register Button */}
      <Button className="mt-5 w-80" onClick={handleReg}>
        Register
      </Button>
    </Form>
  );
};
