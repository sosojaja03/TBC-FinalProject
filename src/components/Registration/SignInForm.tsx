// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useMutation } from "@tanstack/react-query";
// import { supabase } from "@/supabase"; // Make sure to import the supabase client
// import { useTranslation } from "react-i18next";

// // Validation schema

// // Supabase login function
// const login = async ({
//   email,
//   password,
// }: {
//   email: string;
//   password: string;
// }) => {
//   const { data, error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });
//   if (error) throw new Error(error.message);
//   localStorage.setItem("userId", data.user.id);
//   return data;
// };

// export const logout = async () => {
//   try {
//     const { error } = await supabase.auth.signOut();
//     if (error) throw error;
//     console.log("Successfully logged out");
//     localStorage.removeItem("userId");
//   } catch (error) {
//     console.error("Error logging out:", error);
//   }
// };

// export const SignInForm = () => {
//   const navigate = useNavigate(); // Initialize the navigate function
//   const { t } = useTranslation(); // Initialize the translation function

//   const formSchema = z.object({
//     email: z
//       .string()
//       .min(1, { message: t("SignIn-SignUp-Translation.email.required") }) // Use . instead of :
//       .email({ message: t("SignIn-SignUp-Translation.email.invalid") }),
//     password: z
//       .string()
//       .min(1, { message: t("SignIn-SignUp-Translation.password.required") }) // Add required validation
//       .min(6, { message: t("SignIn-SignUp-Translation.password.minLength") }),
//   });

//   const handleReg = () => {
//     console.log("Navigating to registration form...");
//     navigate("/auth/registration"); // Navigate to the registration form/page
//   };

//   // 1. Define your form.
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//     // mode: "onTouched", // This will validate on blur
//   });

//   // useMutation for login
//   const {
//     mutate: handleLogin,
//     isPending,
//     isError,
//     error,
//   } = useMutation({
//     mutationKey: ["login"],
//     mutationFn: login,
//     onSuccess: (data) => {
//       console.log("User logged in:", data);
//       // navigate("/dashboard"); // Redirect after successful login
//       navigate("/dashboard/MainPage");
//     },
//   });

//   const onSubmit = (values: z.infer<typeof formSchema>) => {
//     const { email, password } = values;
//     handleLogin({ email, password });
//   };

//   console.log("SignInForm rendered");

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="w-80 space-y-8">
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input placeholder="Enter your email" {...field} />
//               </FormControl>
//               {form.formState.errors.email && (
//                 <FormMessage>
//                   {t(form.formState.errors.email.message || "")}
//                 </FormMessage>
//               )}
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Password</FormLabel>
//               <FormControl>
//                 <Input
//                   type="password"
//                   placeholder="Enter your password"
//                   {...field}
//                 />
//               </FormControl>
//               {form.formState.errors.password && (
//                 <FormMessage>
//                   {t(form.formState.errors.password.message || "")}
//                 </FormMessage>
//               )}
//             </FormItem>
//           )}
//         />
//         <FormDescription>This is your public display name.</FormDescription>
//         <Button type="submit" disabled={isPending}>
//           {isPending ? "Logging in..." : "Submit"}
//         </Button>
//         {isError && (
//           <p className="text-red-500">
//             {t("SignIn-SignUp-Translation.login.error", {
//               defaultValue: (error as Error).message,
//             })}
//           </p>
//         )}{" "}
//       </form>

//       {/* Register Button */}
//       <Button className="mt-5 w-80" onClick={handleReg}>
//         Register
//       </Button>
//     </Form>
//   );
// };
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
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
import { supabase } from "@/supabase";
import { useTranslation } from "react-i18next";

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
  localStorage.setItem("userId", data.user.id);
  return data;
};

export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    console.log("Successfully logged out");
    localStorage.removeItem("userId");
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

export const SignInForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

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

  const handleReg = () => {
    console.log("Navigating to registration form...");
    navigate("/auth/registration");
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

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
      navigate("/dashboard/MainPage");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { email, password } = values;
    handleLogin({ email, password });
  };

  // Function to translate error messages
  const getErrorMessage = (key: string | undefined) => {
    if (!key) return "";

    const errorMessages: Record<string, string> = {
      EMAIL_REQUIRED: t("SignIn-SignUp-Translation.email.required"),
      EMAIL_INVALID: t("SignIn-SignUp-Translation.email.invalid"),
      PASSWORD_REQUIRED: t("SignIn-SignUp-Translation.password.required"),
      PASSWORD_MIN_LENGTH: t("SignIn-SignUp-Translation.password.minLength"),
    };

    return errorMessages[key] || key;
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
                  {getErrorMessage(form.formState.errors.password.message)}
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
        )}
      </form>

      <Button className="mt-5 w-80" onClick={handleReg}>
        Register
      </Button>
    </Form>
  );
};
