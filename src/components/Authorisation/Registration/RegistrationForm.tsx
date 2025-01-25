"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/supabase";
import { useTranslation } from "react-i18next";

const register = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Detailed error:", {
        message: error.message,
        status: error.status,
        name: error.name,
      });
      throw error;
    }

    return data;
  } catch (err) {
    console.error("Caught error:", err);
    throw err;
  }
};

export const RegistrationForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Move the schema inside the component to access t
  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: "EMAIL_REQUIRED" })
      .email({ message: "EMAIL_INVALID" }),
    password: z
      .string()
      .min(1, { message: "PASSWORD_REQUIRED" })
      .min(6, { message: "PASSWORD_MIN_LENGTH" }),
  });

  const {
    mutate: handleRegister,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationKey: ["register"],
    mutationFn: register,
    onSuccess: () => {
      navigate("/auth/sign-in");
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { email, password } = values;
    handleRegister({ email, password });
  };

  // Function to translate error messages
  const getErrorMessage = (key: string | undefined): string => {
    if (!key) return "";

    const errorMessages: Record<string, string> = {
      EMAIL_REQUIRED: t("SignIn-SignUp-Translation.email.required"),
      EMAIL_INVALID: t("SignIn-SignUp-Translation.email.invalid"),
      PASSWORD_REQUIRED: t("SignIn-SignUp-Translation.password.required"),
      PASSWORD_MIN_LENGTH: t("SignIn-SignUp-Translation.password.minLength"),
    };

    return errorMessages[key] || key;
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-80 rounded-xl border border-amber-200 bg-white/80 p-8 shadow-lg backdrop-blur-sm dark:border-none dark:bg-amber-950">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium text-amber-900 dark:text-amber-200">
                    {t("SignIn-SignUp-Translation.Email")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t(
                        "SignIn-SignUp-Translation.EnterYourEmail",
                      )}
                      className="w-full rounded-lg border border-amber-200 bg-amber-50 p-3 text-amber-900 shadow-sm transition-colors placeholder:text-amber-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-400 dark:border-amber-700 dark:bg-amber-900 dark:text-amber-100"
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.email && (
                    <FormMessage className="text-red-500">
                      {getErrorMessage(form.formState.errors.email.message)}
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
                  <FormLabel className="text-lg font-medium text-amber-900 dark:text-amber-200">
                    {t("SignIn-SignUp-Translation.Password")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={t(
                        "SignIn-SignUp-Translation.EnterYourPassword",
                      )}
                      className="w-full rounded-lg border border-amber-200 bg-amber-50 p-3 text-amber-900 shadow-sm transition-colors placeholder:text-amber-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-400 dark:border-amber-700 dark:bg-amber-900 dark:text-amber-100"
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.password && (
                    <FormMessage className="text-red-500">
                      {getErrorMessage(form.formState.errors.password.message)}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isPending}
              className="w-full rounded-lg bg-amber-500 px-6 py-3 text-lg font-semibold text-white shadow-md transition-colors hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-amber-300 dark:bg-amber-600 dark:hover:bg-amber-700"
            >
              {isPending
                ? "Registering..."
                : t("SignIn-SignUp-Translation.Register")}
            </Button>
            {isError && (
              <p className="text-red-500">
                {t("SignIn-SignUp-Translation.login.error", {
                  defaultValue: (error as Error).message,
                })}
              </p>
            )}
          </form>
          <p className="mt-4 text-center text-amber-900 dark:text-amber-200">
            {t("SignIn-SignUp-Translation.AlreadyHaveAccount")}
          </p>
          <Button
            className="mt-5 w-full rounded-lg bg-amber-500 px-6 py-3 text-lg font-semibold text-white shadow-md transition-colors hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:bg-amber-600 dark:hover:bg-amber-700"
            onClick={() => navigate("/auth/sign-in")}
          >
            {t("SignIn-SignUp-Translation.SignIn")}
          </Button>
        </Form>
      </div>
    </div>
  );
};
