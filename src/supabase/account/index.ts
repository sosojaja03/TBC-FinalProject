import { supabase } from "..";
import { ProfilePayload } from "./index.types";

export const fillProfileInfo = (payload: ProfilePayload) => {
  return supabase.from("profiles").upsert(payload).throwOnError();
};
