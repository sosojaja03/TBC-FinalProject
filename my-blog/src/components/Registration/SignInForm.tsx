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
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/supabase"; // Make sure to import the supabase client

// Validation schema
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

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

export const SignInForm = () => {
  const navigate = useNavigate(); // Initialize the navigate function

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
      navigate("/dashboard"); // Redirect after successful login
    },
    onError: (error: any) => {
      console.error("Login failed:", error.message);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { email, password } = values;
    handleLogin({ email, password });
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
              <FormMessage />
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
              <FormMessage />
            </FormItem>
          )}
        />
        <FormDescription>This is your public display name.</FormDescription>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Logging in..." : "Submit"}
        </Button>
        {isError && <p className="text-red-500">{(error as Error).message}</p>}
      </form>

      {/* Register Button */}
      <Button className="mt-5 w-80" onClick={handleReg}>
        Register
      </Button>
    </Form>
  );
};
