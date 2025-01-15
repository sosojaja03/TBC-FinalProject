// import { useState, useEffect } from "react";
// import {
//   Card,
//   CardHeader,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import AvatarComp from "./Avatar";
// import { UseAuthContext } from "../context/hooks/AuthContextHook";
// import { ProfilePayload } from "./ProfileTypes";
// import { useMutation } from "@tanstack/react-query";
// import { fillProfileInfo, getProfileInfo } from ".";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { useForm } from "react-hook-form";
// // import { z } from "zod";

// // const profileFormSchema = z.object({
// //   username: z.string().min(1, { message: "Username is required" }),
// //   email: z
// //     .string()
// //     .min(1, { message: "Email is required" })
// //     .email({ message: "Invalid email format" }),
// //   full_name_en: z
// //     .string()
// //     .min(1, { message: "Full Name (English) is required" }),
// //   full_name_ka: z
// //     .string()
// //     .min(1, { message: "Full Name (Georgian) is required" }),
// //   phone: z
// //     .string()
// //     .min(1, { message: "Phone number is required" })
// //     .regex(/^\+?\d{10,15}$/, { message: "Phone number is invalid" }), // Adjust phone regex as needed
// //   avatar_url: z.string().url({ message: "Invalid URL" }),
// // });

// const ProfileForm = () => {
//   const { user } = UseAuthContext();
//   const [formData, setFormData] = useState<ProfilePayload>({
//     username: "",
//     email: " test@example.com",
//     full_name_en: "John Doe",
//     full_name_ka: "ჯონ დოუ",
//     phone: "+1234567890",
//     avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=johndoe`,
//     customAvatarUrl: "",
//   });

//   useEffect(() => {
//     if (user) {
//       getProfileInfo(user?.id).then((res) => console.log(res));
//     }
//   }, [user]);

//   const { mutate: handleProfileChange } = useMutation({
//     mutationKey: ["profileChange"],
//     mutationFn: fillProfileInfo,
//     onError: (error) => {
//       console.error("Profile update failed", error);
//     },
//     onSuccess: (data: ProfilePayload[]) => {
//       console.log("Profile updated successfully", data);
//       setIsEditing(false);

//       setFormData((prev) => ({ ...prev, ...data[0] }));
//     },
//   });

//   const handleSubmite = () => {
//     if (user) {
//       handleProfileChange({ ...formData, id: user?.id });
//     } else {
//       console.error("User is not authenticated");
//     }
//     setIsEditing(false);
//   };

//   //////////ase jobia tu ase

//   const [isEditing, setIsEditing] = useState(false);
//   const [showAvatarPicker, setShowAvatarPicker] = useState(false);
//   const [, setSelectedAvatarSvg] = useState("");

//   const handleAvatarSelect = (avatarSvg: string) => {
//     setSelectedAvatarSvg(avatarSvg);
//     setFormData((prev) => ({
//       ...prev,
//       avatar_url: "data:image/svg+xml," + encodeURIComponent(avatarSvg),
//     }));
//     setShowAvatarPicker(false);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//       ...(name === "customAvatarUrl" ? { avatar_url: value } : {}),
//     }));
//   };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   console.log("Updated data:", formData);
//   //   setIsEditing(false);
//   // };

//   return (
//     <Card className="mx-auto w-full max-w-md">
//       <CardHeader className="text-center">
//         <div className="relative">
//           <Avatar className="mx-auto mb-4 h-24 w-24">
//             <AvatarImage src={formData.avatar_url} alt="Profile" />
//             <AvatarFallback>DP</AvatarFallback>
//           </Avatar>
//           {isEditing && (
//             <Button
//               type="button"
//               size="sm"
//               className="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/2"
//               onClick={() => setShowAvatarPicker(true)}
//             >
//               Change Avatar
//             </Button>
//           )}
//         </div>
//         <h2 className="text-2xl font-bold">Profile Information</h2>
//       </CardHeader>

//       {showAvatarPicker && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//           <div className="w-full max-w-2xl rounded-lg bg-white p-4">
//             <AvatarComp onAvatarSelect={handleAvatarSelect} />
//             <Button className="mt-4" onClick={() => setShowAvatarPicker(false)}>
//               Close
//             </Button>
//           </div>
//         </div>
//       )}

//       <form onSubmit={handleSubmite}>
//         <CardContent className="space-y-4">
//           {isEditing && (
//             <>
//               <div className="space-y-2">
//                 <Label>Custom Avatar URL</Label>
//                 <Input
//                   id="customAvatarUrl"
//                   name="customAvatarUrl"
//                   value={formData.customAvatarUrl}
//                   // onChange={(e) => {
//                   //   setFormData((prev) => ({
//                   //     ...prev,
//                   //     avatar_url: e.target.value,
//                   //   }));
//                   // }}
//                   onChange={handleChange}
//                   className="w-full"
//                   placeholder="Enter custom avatar URL"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label>Username</Label>
//                 <Input
//                   id="username"
//                   name="username"
//                   type=""
//                   value={formData.username}
//                   onChange={(e) => {
//                     setFormData((prev) => ({
//                       ...prev,
//                       username: e.target.value,
//                     }));
//                   }}
//                   disabled={!isEditing}
//                   className="w-full"
//                   placeholder="Enter email in English"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label>Email (English)</Label>
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) => {
//                     setFormData((prev) => ({
//                       ...prev,
//                       email: e.target.value,
//                     }));
//                   }}
//                   disabled={!isEditing}
//                   className="w-full"
//                   placeholder="Enter email in English"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label>Full Name (English)</Label>
//                 <Input
//                   id="full_name_en"
//                   name="full_name_en"
//                   value={formData.full_name_en}
//                   onChange={(e) => {
//                     setFormData((prev) => ({
//                       ...prev,
//                       full_name_en: e.target.value,
//                     }));
//                   }}
//                   disabled={!isEditing}
//                   className="w-full"
//                   placeholder="Enter full name in English"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label>სრული სახელი (ქართული)</Label>
//                 <Input
//                   id="full_name_ka"
//                   name="full_name_ka"
//                   value={formData.full_name_ka}
//                   onChange={(e) => {
//                     setFormData((prev) => ({
//                       ...prev,
//                       full_name_ka: e.target.value,
//                     }));
//                   }}
//                   disabled={!isEditing}
//                   className="w-full"
//                   placeholder="შეიყვანეთ სრული სახელი ქართულად"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label>Phone Number / ტელეფონის ნომერი</Label>
//                 <Input
//                   id="phone"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={(e) => {
//                     setFormData((prev) => ({
//                       ...prev,
//                       phone: e.target.value,
//                     }));
//                   }}
//                   disabled={!isEditing}
//                   className="w-full"
//                   placeholder="+995 5xx xx xx xx"
//                 />
//               </div>
//             </>
//           )}
//         </CardContent>

//         <CardFooter className="flex justify-end space-x-2">
//           {!isEditing ? (
//             <Button type="button" onClick={() => setIsEditing(true)}>
//               Edit Profile
//             </Button>
//           ) : (
//             <>
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => setIsEditing(false)}
//               >
//                 Cancel
//               </Button>
//               <Button type="submit">Save Changes</Button>
//             </>
//           )}
//         </CardFooter>
//       </form>
//     </Card>
//   );
// };

// export default ProfileForm;
// // "use client";

// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { useForm } from "react-hook-form";
// // import { z } from "zod";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Form,
// //   FormControl,
// //   FormDescription,
// //   FormField,
// //   FormItem,
// //   FormLabel,
// //   FormMessage,
// // } from "@/components/ui/form";
// // import { Input } from "@/components/ui/input";
// // import { useMutation } from "@tanstack/react-query";
// // import { supabase } from "@/supabase";
// // import { useTranslation } from "react-i18next";
// // import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// // import AvatarComp from "./Avatar";
// // import { ProfilePayload } from "./ProfileTypes";
// // import { fillProfileInfo, getProfileInfo } from ".";
// // import { useState, useEffect } from "react";
// // import { UseAuthContext } from "../context/hooks/AuthContextHook";
// // import { Card, CardHeader } from "../ui/card";

// // // Validation schema with Zod
// // const profileFormSchema = z.object({
// //   username: z.string().min(1, { message: "Username is required" }),
// //   email: z
// //     .string()
// //     .min(1, { message: "Email is required" })
// //     .email({ message: "Invalid email format" }),
// //   full_name_en: z
// //     .string()
// //     .min(1, { message: "Full Name (English) is required" }),
// //   full_name_ka: z
// //     .string()
// //     .min(1, { message: "Full Name (Georgian) is required" }),
// //   phone: z
// //     .string()
// //     .min(1, { message: "Phone number is required" })
// //     .regex(/^\+?\d{10,15}$/, { message: "Phone number is invalid" }), // Adjust phone regex as needed
// //   avatar_url: z.string().url({ message: "Invalid URL" }),
// // });

// // const ProfileForm = () => {
// //   const { user } = UseAuthContext();
// //   const { t } = useTranslation();
// //   const [formData, setFormData] = useState<ProfilePayload>({
// //     username: "",
// //     email: "test@example.com",
// //     full_name_en: "John Doe",
// //     full_name_ka: "ჯონ დოუ",
// //     phone: "+1234567890",
// //     avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=johndoe`,
// //     customAvatarUrl: "",
// //   });

// //   useEffect(() => {
// //     if (user) {
// //       getProfileInfo(user?.user?.id).then((res) => console.log(res));
// //     }
// //   }, [user]);

// //   const { mutate: handleProfileChange } = useMutation({
// //     mutationKey: ["profileChange"],
// //     mutationFn: fillProfileInfo,
// //     onError: (error) => {
// //       console.error("Profile update failed", error);
// //     },
// //     onSuccess: (data: any) => {
// //       console.log("Profile updated successfully", data);
// //       setIsEditing(false);
// //       setFormData((prev) => ({ ...prev, ...data[0] }));
// //     },
// //   });

// //   const [isEditing, setIsEditing] = useState(false);
// //   const [showAvatarPicker, setShowAvatarPicker] = useState(false);
// //   const [selectedAvatarSvg, setSelectedAvatarSvg] = useState("");

// //   const handleAvatarSelect = (avatarSvg: string) => {
// //     setSelectedAvatarSvg(avatarSvg);
// //     setFormData((prev) => ({
// //       ...prev,
// //       avatar_url: "data:image/svg+xml," + encodeURIComponent(avatarSvg),
// //     }));
// //     setShowAvatarPicker(false);
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: value,
// //       ...(name === "customAvatarUrl" ? { avatar_url: value } : {}),
// //     }));
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     console.log("Updated data:", formData);
// //     setIsEditing(false);
// //   };

// //   // Setup react-hook-form with validation
// //   const form = useForm<z.infer<typeof profileFormSchema>>({
// //     resolver: zodResolver(profileFormSchema),
// //     defaultValues: formData,
// //   });

// //   const onSubmit = (values) => {
// //     console.log("Form values:", values);
// //     if (user) {
// //       handleProfileChange({ ...values, id: user?.user?.id });
// //     }
// //   };

// //   return (
// //     <Card className="mx-auto w-full max-w-md">
// //       <CardHeader className="text-center">
// //         <div className="relative">
// //           <Avatar className="mx-auto mb-4 h-24 w-24">
// //             <AvatarImage src={formData.avatar_url} alt="Profile" />
// //             <AvatarFallback>DP</AvatarFallback>
// //           </Avatar>
// //           {isEditing && (
// //             <Button
// //               type="button"
// //               size="sm"
// //               className="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/2"
// //               onClick={() => setShowAvatarPicker(true)}
// //             >
// //               Change Avatar
// //             </Button>
// //           )}
// //         </div>
// //         <h2 className="text-2xl font-bold">Profile Information</h2>
// //       </CardHeader>

// //       {showAvatarPicker && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
// //           <div className="w-full max-w-2xl rounded-lg bg-white p-4">
// //             <AvatarComp onAvatarSelect={handleAvatarSelect} />
// //             <Button className="mt-4" onClick={() => setShowAvatarPicker(false)}>
// //               Close
// //             </Button>
// //           </div>
// //         </div>
// //       )}

// //       <Form {...form}>
// //         <form
// //           onSubmit={form.handleSubmit(onSubmit)}
// //           className="w-full space-y-4"
// //         >
// //           <FormField
// //             control={form.control}
// //             name="username"
// //             render={({ field }) => (
// //               <FormItem>
// //                 <FormLabel>{t("Username")}</FormLabel>
// //                 <FormControl>
// //                   <Input placeholder="Enter your username" {...field} />
// //                 </FormControl>
// //                 <FormMessage>
// //                   {form.formState.errors.username?.message}
// //                 </FormMessage>
// //               </FormItem>
// //             )}
// //           />
// //           <FormField
// //             control={form.control}
// //             name="email"
// //             render={({ field }) => (
// //               <FormItem>
// //                 <FormLabel>{t("Email")}</FormLabel>
// //                 <FormControl>
// //                   <Input placeholder="Enter your email" {...field} />
// //                 </FormControl>
// //                 <FormMessage>
// //                   {form.formState.errors.email?.message}
// //                 </FormMessage>
// //               </FormItem>
// //             )}
// //           />
// //           <FormField
// //             control={form.control}
// //             name="full_name_en"
// //             render={({ field }) => (
// //               <FormItem>
// //                 <FormLabel>{t("Full Name (English)")}</FormLabel>
// //                 <FormControl>
// //                   <Input
// //                     placeholder="Enter your full name (English)"
// //                     {...field}
// //                   />
// //                 </FormControl>
// //                 <FormMessage>
// //                   {form.formState.errors.full_name_en?.message}
// //                 </FormMessage>
// //               </FormItem>
// //             )}
// //           />
// //           <FormField
// //             control={form.control}
// //             name="full_name_ka"
// //             render={({ field }) => (
// //               <FormItem>
// //                 <FormLabel>{t("Full Name (Georgian)")}</FormLabel>
// //                 <FormControl>
// //                   <Input
// //                     placeholder="Enter your full name (Georgian)"
// //                     {...field}
// //                   />
// //                 </FormControl>
// //                 <FormMessage>
// //                   {form.formState.errors.full_name_ka?.message}
// //                 </FormMessage>
// //               </FormItem>
// //             )}
// //           />
// //           <FormField
// //             control={form.control}
// //             name="phone"
// //             render={({ field }) => (
// //               <FormItem>
// //                 <FormLabel>{t("Phone")}</FormLabel>
// //                 <FormControl>
// //                   <Input placeholder="Enter your phone number" {...field} />
// //                 </FormControl>
// //                 <FormMessage>
// //                   {form.formState.errors.phone?.message}
// //                 </FormMessage>
// //               </FormItem>
// //             )}
// //           />
// //           <FormField
// //             control={form.control}
// //             name="avatar_url"
// //             render={({ field }) => (
// //               <FormItem>
// //                 <FormLabel>{t("Avatar URL")}</FormLabel>
// //                 <FormControl>
// //                   <Input placeholder="Enter avatar URL" {...field} />
// //                 </FormControl>
// //                 <FormMessage>
// //                   {form.formState.errors.avatar_url?.message}
// //                 </FormMessage>
// //               </FormItem>
// //             )}
// //           />

// //           <Button type="submit" disabled={form.formState.isSubmitting}>
// //             {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
// //           </Button>
// //         </form>
// //       </Form>
// //     </Card>
// //   );
// // };

// // export default ProfileForm;
