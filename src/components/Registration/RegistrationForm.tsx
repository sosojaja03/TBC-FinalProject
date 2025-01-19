// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useMutation } from "@tanstack/react-query";
// import { supabase } from "@/supabase";
// import { useTranslation } from "react-i18next";

// // Supabase registration function
// const register = async ({
//   email,
//   password,
// }: {
//   email: string;
//   password: string;
// }) => {
//   try {
//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         emailRedirectTo: `${window.location.origin}/auth/callback`,
//       },
//     });

//     if (error) {
//       console.error("Detailed error:", {
//         message: error.message,
//         status: error.status,
//         name: error.name,
//       });
//       throw error;
//     }

//     console.log("Registration response:", data);
//     return data;
//   } catch (err) {
//     console.error("Caught error:", err);
//     throw err;
//   }
// };

// export const ProfileForm = () => {
//   const navigate = useNavigate();
//   const { t } = useTranslation();

//   // Validation schema
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
//   const {
//     mutate: handleRegister,
//     isPending,
//     isError,
//     error,
//   } = useMutation({
//     mutationKey: ["register"],
//     mutationFn: register,
//     onSuccess: (data) => {
//       console.log("User created:", data);
//       // navigate("/welcome"); // Redirect after successful registration
//       navigate("/auth/sign-in");
//     },
//   });

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//     mode: "onTouched", // This will validate on blur
//   });

//   const onSubmit = (values: z.infer<typeof formSchema>) => {
//     const { email, password } = values;
//     handleRegister({ email, password });
//   };

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
//         <Button type="submit" disabled={isPending}>
//           {isPending ? "Registering..." : "Submit"}
//         </Button>
//         {isError && (
//           <p className="text-red-500">
//             {t("SignIn-SignUp-Translation.login.error", {
//               defaultValue: (error as Error).message,
//             })}
//           </p>
//         )}{" "}
//       </form>
//       <Button className="mt-5 w-80" onClick={() => navigate("/auth/sign-in")}>
//         Sign In
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

    console.log("Registration response:", data);
    return data;
  } catch (err) {
    console.error("Caught error:", err);
    throw err;
  }
};

export const ProfileForm = () => {
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
    onSuccess: (data) => {
      console.log("User created:", data);
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
        <Button type="submit" disabled={isPending}>
          {isPending ? "Registering..." : "Submit"}
        </Button>
        {isError && (
          <p className="text-red-500">
            {t("SignIn-SignUp-Translation.login.error", {
              defaultValue: (error as Error).message,
            })}
          </p>
        )}
      </form>
      <Button className="mt-5 w-80" onClick={() => navigate("/auth/sign-in")}>
        Sign In
      </Button>
    </Form>
  );
};
