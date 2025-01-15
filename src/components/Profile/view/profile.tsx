import { ProfilePayload } from "@/supabase/account/index.types";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
// import { fillProfileInfo } from "@/supabase/account";
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
    password: "",
  });

  useEffect(() => {
    if (user) {
      getProfileInfo(user.id).then((data) => {
        setProfilePayload(data[0]);
      });
    }
  }, [user]);

  const { mutate: handeFillProfileInfo } = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: fillProfileInfo,
  });

  const handleSubmit = () => {
    handeFillProfileInfo({ ...profilePayload, id: user?.id || "" });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-y-4">
      <label>UserName</label>
      <input
        className="border border-black bg-white dark:border-white dark:text-black"
        name="username"
        value={profilePayload.username}
        onChange={(e) =>
          setProfilePayload({ ...profilePayload, username: e.target.value })
        }
      />
      <label>FullName</label>
      <input
        className="border border-black bg-white dark:border-white dark:text-black"
        name="full_name"
        value={profilePayload.full_name}
        onChange={(e) =>
          setProfilePayload({ ...profilePayload, full_name: e.target.value })
        }
      />
      <label>Email</label>
      <input
        className="border border-black bg-white dark:border-white dark:text-black"
        name="username"
        value={profilePayload.email}
        onChange={(e) =>
          setProfilePayload({ ...profilePayload, email: e.target.value })
        }
      />
      {/* <label>Pasword</label>
      <input
        className="border border-black bg-white dark:border-white dark:text-black"
        type="password"
        name="password"
        value={profilePayload.password}
        onChange={(e) =>
          setProfilePayload({ ...profilePayload, password: e.target.value })
        }
      /> */}
      <label>Avatar Url</label>
      <input
        className="border border-black bg-white dark:border-white dark:text-black"
        name="avatar_url"
        value={profilePayload.avatar_url}
        onChange={(e) =>
          setProfilePayload({ ...profilePayload, avatar_url: e.target.value })
        }
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};
