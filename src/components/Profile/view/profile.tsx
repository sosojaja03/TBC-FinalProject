import { ProfilePayload } from "@/supabase/account/index.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fillProfileInfo, getProfileInfo } from "../oldcode";
import { useAuthContext } from "@/components/context";

export const ProfileView = () => {
  const { user } = useAuthContext();
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

  // Replace useEffect with useQuery for better data fetching
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
    <div className="flex flex-col items-center justify-center gap-y-4">
      <label htmlFor="username">UserName</label>
      <input
        id="username"
        className="border border-black bg-white p-2 dark:border-white dark:text-black"
        name="username"
        value={profilePayload.username}
        onChange={handleInputChange}
        disabled={isUpdating}
      />

      <label htmlFor="full_name">FullName</label>
      <input
        id="full_name"
        className="border border-black bg-white p-2 dark:border-white dark:text-black"
        name="full_name"
        value={profilePayload.full_name}
        onChange={handleInputChange}
        disabled={isUpdating}
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        className="border border-black bg-white p-2 dark:border-white dark:text-black"
        name="email"
        value={profilePayload.email}
        onChange={handleInputChange}
        disabled={isUpdating}
      />

      <label htmlFor="avatar_url">Avatar URL</label>
      <input
        id="avatar_url"
        className="border border-black bg-white p-2 dark:border-white dark:text-black"
        name="avatar_url"
        value={profilePayload.avatar_url}
        onChange={handleInputChange}
        disabled={isUpdating}
      />

      <button
        onClick={handleSubmit}
        disabled={isUpdating}
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-400"
      >
        {isUpdating ? "Updating..." : "Submit"}
      </button>
    </div>
  );
};
