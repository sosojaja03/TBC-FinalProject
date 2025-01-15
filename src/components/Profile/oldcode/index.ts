// import { supabase } from "@/supabase";
// import { ProfilePayload } from "./ProfileTypes";

// export const getProfileInfo = async (userId: string) => {
//   const { data, error } = await supabase
//     .from("profiles")
//     .select("*")
//     .eq("id", userId);

//   if (error) throw error;
//   return data;
// };

// export const fillProfileInfo = async (
//   profileData: ProfilePayload & { id: string },
// ) => {
//   const { data, error } = await supabase.from("profiles").upsert({
//     id: profileData.id,
//     username: profileData.username,
//     email: profileData.email,
//     full_name_en: profileData.full_name_en,
//     full_name_ka: profileData.full_name_ka,
//     phone: profileData.phone,
//     avatar_url: profileData.avatar_url,
//   });

//   if (error) throw error;
//   return data;
// };
import { supabase } from "@/supabase";
// import { ProfilePayload } from "./ProfileTypes";
import { ProfilePayload } from "@/supabase/account/index.types";

export const getProfileInfo = async (
  userId: string,
): Promise<ProfilePayload[]> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId);

  if (error) throw error;
  return data.map((profile) => ({
    ...profile,
  })) as ProfilePayload[];
};

export const fillProfileInfo = async (
  profileData: ProfilePayload & { id: string },
): Promise<ProfilePayload[]> => {
  const { data, error } = await supabase.from("profiles").upsert({
    id: profileData.id,
    username: profileData.username,
    full_name: profileData.full_name,
    email: profileData.email,
    phone: profileData.phone,
    avatar_url: profileData.avatar_url,
  });

  if (error) throw error;
  if (!data) throw new Error("No data returned from upsert");
  return data as ProfilePayload[];
};
