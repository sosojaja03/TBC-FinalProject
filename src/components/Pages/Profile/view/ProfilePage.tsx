import { ProfilePayload } from "@/supabase/account/index.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  fillProfileInfo,
  getProfileInfo,
} from "@/components/Pages/Profile/index";
import { UseAuthContext } from "@/components/Context/hooks/AuthContextHook";
import { useTranslation } from "react-i18next";

const ProfileView = () => {
  const { user } = UseAuthContext();
  const { t } = useTranslation();
  const [profilePayload, setProfilePayload] = useState<ProfilePayload>({
    id: "",
    email: "",
    username: "",
    avatar_url: "",
    full_name: "",
    phone: "",
    website: "",
    updated_at: "",
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: () => getProfileInfo(user?.id || ""),
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (data?.[0]) {
      setProfilePayload(data[0]);
    }
  }, [data]);

  const { mutate: handleFillProfileInfo, isPending: isUpdating } = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: fillProfileInfo,
    onError: (error) => {
      console.error("Failed to update profile:", error);
    },
  });

  const handleSubmit = () => {
    if (!user?.id) return;
    handleFillProfileInfo({ ...profilePayload, id: user.id });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfilePayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading profile. Please try again.</div>;
  }

  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-[550px] rounded-xl border border-amber-200 bg-white/80 p-8 shadow-lg backdrop-blur-sm dark:border-none dark:bg-amber-950">
        <div className="flex flex-col items-center justify-center gap-y-6">
          <label
            htmlFor="username"
            className="text-lg font-medium text-amber-900 dark:text-amber-200"
          >
            {t("Profile-Translation.UserName")}
          </label>
          <input
            id="username"
            className="w-full max-w-md rounded-lg border border-amber-200 bg-amber-50 p-3 text-amber-900 shadow-sm transition-colors focus:border-amber-400 focus:ring-2 focus:ring-amber-400 dark:border-amber-700 dark:bg-amber-900 dark:text-amber-100"
            name="username"
            value={profilePayload.username}
            onChange={handleInputChange}
            disabled={isUpdating}
          />

          <label
            htmlFor="full_name"
            className="text-lg font-medium text-amber-900 dark:text-amber-200"
          >
            {t("Profile-Translation.FullName")}
          </label>
          <input
            id="full_name"
            className="w-full max-w-md rounded-lg border border-amber-200 bg-amber-50 p-3 text-amber-900 shadow-sm transition-colors focus:border-amber-400 focus:ring-2 focus:ring-amber-400 dark:border-amber-700 dark:bg-amber-900 dark:text-amber-100"
            name="full_name"
            value={profilePayload.full_name}
            onChange={handleInputChange}
            disabled={isUpdating}
          />

          <label
            htmlFor="email"
            className="text-lg font-medium text-amber-900 dark:text-amber-200"
          >
            {t("Profile-Translation.Email")}
          </label>
          <input
            id="email"
            className="w-full max-w-md rounded-lg border border-amber-200 bg-amber-50 p-3 text-amber-900 shadow-sm transition-colors focus:border-amber-400 focus:ring-2 focus:ring-amber-400 dark:border-amber-700 dark:bg-amber-900 dark:text-amber-100"
            name="email"
            value={profilePayload.email}
            onChange={handleInputChange}
            disabled={isUpdating}
          />

          <label
            htmlFor="phone"
            className="text-lg font-medium text-amber-900 dark:text-amber-200"
          >
            {t("Profile-Translation.Phone")}
          </label>
          <input
            id="phone"
            className="w-full max-w-md rounded-lg border border-amber-200 bg-amber-50 p-3 text-amber-900 shadow-sm transition-colors focus:border-amber-400 focus:ring-2 focus:ring-amber-400 dark:border-amber-700 dark:bg-amber-900 dark:text-amber-100"
            name="phone"
            value={profilePayload.phone}
            onChange={handleInputChange}
            disabled={isUpdating}
          />

          <button
            onClick={handleSubmit}
            disabled={isUpdating}
            className="mt-6 w-full max-w-md rounded-lg bg-amber-500 px-6 py-3 text-lg font-semibold text-white shadow-md transition-colors hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-amber-300 dark:bg-amber-600 dark:text-white dark:hover:bg-amber-700"
          >
            {isUpdating
              ? t("Profile-Translation.Saving")
              : t("Profile-Translation.Save")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
