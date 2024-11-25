// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { UseAuthContext } from "../context/hooks/AuthContextHook";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { supabase } from "@/supabase";
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
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Loader2 } from "lucide-react";
// import { Toaster } from "../ui/toaster";
// import { Toast } from "../ui/toast";

// const profileSchema = z.object({
//   firstName_ka: z
//     .string()
//     .min(2, { message: "სახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს" }),
//   lastName_ka: z
//     .string()
//     .min(2, { message: "გვარი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს" }),
//   firstName_en: z
//     .string()
//     .min(2, { message: "First name must be at least 2 characters" }),
//   lastName_en: z
//     .string()
//     .min(2, { message: "Last name must be at least 2 characters" }),
//   phoneNumber: z
//     .string()
//     .regex(/^\+?995\d{9}$/, { message: "Invalid Georgian phone number" }),
//   avatarUrl: z.string().url().optional(),
// });

// type ProfileFormValues = z.infer<typeof profileSchema>;

// // Function to fetch profile data
// const fetchProfile = async (userId: string) => {
//   const { data, error } = await supabase
//     .from("profiles")
//     .select("*")
//     .eq("user_id", userId)
//     .single();

//   if (error) throw error;
//   return data;
// };

// // Function to update profile
// const updateProfile = async (userId: string, data: ProfileFormValues) => {
//   const { error } = await supabase.from("profiles").upsert({
//     user_id: userId,
//     ...data,
//     updated_at: new Date().toISOString(),
//   });

//   if (error) throw error;
//   return data;
// };

// export const ProfilePage = () => {
//   const { user } = UseAuthContext();

//   const form = useForm<ProfileFormValues>({
//     resolver: zodResolver(profileSchema),
//     defaultValues: {
//       firstName_ka: "",
//       lastName_ka: "",
//       firstName_en: "",
//       lastName_en: "",
//       phoneNumber: "",
//       avatarUrl: "",
//     },
//   });

//   // Fetch profile data
//   const { data: profile, isLoading: isLoadingProfile } = useQuery({
//     queryKey: ["profile", user?.id],
//     queryFn: () => fetchProfile(user?.id!),
//     enabled: !!user?.id,
//     onSuccess: (data) => {
//       if (data) {
//         form.reset(data);
//       }
//     },
//   });

//   const { mutate: updateProfileMutation, isPending: isUpdating } = useMutation({
//     mutationFn: (data: ProfileFormValues) => updateProfile(user?.id!, data),
//     onSuccess: () => {
//       Toast({
//         title: "Success",
//         description: "Profile updated successfully",
//         duration: 3000,
//       });
//     },
//     onError: (error) => {
//       Toast({
//         title: "Error",
//         // description: "Failed to update profile. Please try again.",
//         variant: "destructive",
//         duration: 3000,
//       });
//     },
//   });

//   const onSubmit = (data: ProfileFormValues) => {
//     updateProfileMutation(data);
//   };

//   // Generate DiceBear avatar URL
//   const avatarUrl =
//     form.watch("avatarUrl") ||
//     `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`;

//   if (isLoadingProfile) {
//     return (
//       <div className="flex h-[50vh] items-center justify-center">
//         <Loader2 className="h-8 w-8 animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="mx-auto max-w-2xl p-6">
//         <div className="mb-8 text-center">
//           <Avatar className="mx-auto mb-4 h-24 w-24">
//             <AvatarImage src={avatarUrl} alt="Profile" />
//             <AvatarFallback>
//               {user?.email?.charAt(0).toUpperCase()}
//             </AvatarFallback>
//           </Avatar>
//           <h1 className="text-2xl font-bold">Profile Settings</h1>
//         </div>

//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <div className="grid gap-6 md:grid-cols-2">
//               {/* Georgian Name Fields */}
//               <FormField
//                 control={form.control}
//                 name="firstName_ka"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>სახელი (ქართულად)</FormLabel>
//                     <FormControl>
//                       <Input {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="lastName_ka"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>გვარი (ქართულად)</FormLabel>
//                     <FormControl>
//                       <Input {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* English Name Fields */}
//               <FormField
//                 control={form.control}
//                 name="firstName_en"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>First Name (English)</FormLabel>
//                     <FormControl>
//                       <Input {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="lastName_en"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Last Name (English)</FormLabel>
//                     <FormControl>
//                       <Input {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             {/* Phone Number */}
//             <FormField
//               control={form.control}
//               name="phoneNumber"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Phone Number</FormLabel>
//                   <FormControl>
//                     <Input {...field} placeholder="+995" />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Avatar URL */}
//             <FormField
//               control={form.control}
//               name="avatarUrl"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Custom Avatar URL (optional)</FormLabel>
//                   <FormControl>
//                     <Input {...field} placeholder="https://..." />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <Button type="submit" className="w-full" disabled={isUpdating}>
//               {isUpdating ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Updating...
//                 </>
//               ) : (
//                 "Update Profile"
//               )}
//             </Button>
//           </form>
//         </Form>
//       </div>
//       <Toaster />
//     </>
//   );
// };

// export default ProfilePage;
