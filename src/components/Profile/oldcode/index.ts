import { supabase } from "@/supabase";
import { ProfilePayload } from "@/supabase/account/index.types";

export const getProfileInfo = async (
  userId: string,
): Promise<ProfilePayload[]> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId);

  if (error) throw error;
  if (!data) return [];

  return data.map((profile) => ({
    ...profile,
  })) as ProfilePayload[];
};

export const fillProfileInfo = async (
  profileData: Partial<ProfilePayload> & { id: string },
): Promise<ProfilePayload> => {
  // First get the existing profile
  const { data: existingProfile, error: fetchError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", profileData.id)
    .single();

  if (fetchError) throw fetchError;

  // Merge existing data with updates
  const updatedProfile = {
    ...(existingProfile || {}),
    ...profileData,
    updated_at: new Date().toISOString(),
  };

  const { error: upsertError } = await supabase
    .from("profiles")
    .upsert(updatedProfile)
    .eq("id", profileData.id);

  if (upsertError) throw upsertError;

  // Return the updated profile data instead of relying on upsert response
  return updatedProfile as ProfilePayload;
};
