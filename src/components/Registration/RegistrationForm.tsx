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
import { Trans, useTranslation } from "react-i18next";

// Supabase registration function
const register = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return data;
};

export const ProfileForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Validation schema
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
  const {
    mutate: handleRegister,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationKey: ["register"],
    mutationFn: register,
    onSuccess: (data) => {
      console.log("User created:", data);
      // navigate("/welcome"); // Redirect after successful registration
      navigate("/sign-in");
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched", // This will validate on blur
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { email, password } = values;
    handleRegister({ email, password });
  };

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
        <Button type="submit" disabled={isPending}>
          {isPending ? "Registering..." : "Submit"}
        </Button>
        {isError && (
          <p className="text-red-500">
            {t("SignIn-SignUp-Translation.login.error", {
              defaultValue: (error as Error).message,
            })}
          </p>
        )}{" "}
      </form>
      <Button className="mt-5 w-80" onClick={() => navigate("/sign-in")}>
        Sign In
      </Button>
    </Form>
  );
};
