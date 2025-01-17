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
    <div className="flex flex-col items-center justify-center gap-y-6 rounded-lg bg-card p-6 shadow-lg">
      <label
        htmlFor="username"
        className="text-lg font-medium text-gray-800 dark:text-gray-200"
      >
        UserName
      </label>
      <input
        id="username"
        className="w-full max-w-md rounded-lg border border-gray-400 bg-white p-3 text-gray-800 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
        name="username"
        value={profilePayload.username}
        onChange={handleInputChange}
        disabled={isUpdating}
      />

      <label
        htmlFor="full_name"
        className="text-lg font-medium text-gray-800 dark:text-gray-200"
      >
        FullName
      </label>
      <input
        id="full_name"
        className="w-full max-w-md rounded-lg border border-gray-400 bg-white p-3 text-gray-800 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
        name="full_name"
        value={profilePayload.full_name}
        onChange={handleInputChange}
        disabled={isUpdating}
      />

      <label
        htmlFor="email"
        className="text-lg font-medium text-gray-800 dark:text-gray-200"
      >
        Email
      </label>
      <input
        id="email"
        className="w-full max-w-md rounded-lg border border-gray-400 bg-white p-3 text-gray-800 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
        name="email"
        value={profilePayload.email}
        onChange={handleInputChange}
        disabled={isUpdating}
      />

      <label
        htmlFor="avatar_url"
        className="text-lg font-medium text-gray-800 dark:text-gray-200"
      >
        Avatar URL
      </label>
      <input
        id="avatar_url"
        className="w-full max-w-md rounded-lg border border-gray-400 bg-white p-3 text-gray-800 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
        name="avatar_url"
        value={profilePayload.avatar_url}
        onChange={handleInputChange}
        disabled={isUpdating}
      />

      <button
        onClick={handleSubmit}
        disabled={isUpdating}
        className="mt-6 w-full max-w-md rounded-lg bg-blue-500 px-6 py-3 text-lg font-semibold text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:bg-gray-400 dark:focus:ring-blue-800"
      >
        {isUpdating ? "Updating..." : "Submit"}
      </button>
    </div>
  );
};
