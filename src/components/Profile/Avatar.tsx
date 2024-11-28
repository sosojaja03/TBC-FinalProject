import { createAvatar } from "@dicebear/core";
import { avataaars } from "@dicebear/collection";
import { useEffect, useState } from "react";

const AvatarComp = ({
  onAvatarSelect,
}: {
  onAvatarSelect: (avatarSvg: string) => void;
}) => {
  // List of avatar configurations
  const avatarConfigs = [
    { seed: "John Doe", clothesColor: ["3c4f5c", "65c9ff"] },
    { seed: "Jane Smith", clothesColor: ["ecadff", "fc909f"] },
    { seed: "Alex Johnson", clothesColor: ["b1e2ff", "f4d150"] },
    { seed: "Emma Brown", clothesColor: ["f9c9b6", "ac6651"] },
  ];

  // State to track the selected avatar
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Generate SVGs for all avatars
  const avatars = avatarConfigs.map((config) =>
    createAvatar(avataaars, config).toString(),
  );

  useEffect(() => {
    onAvatarSelect(avatars[selectedIndex]);
  }, [selectedIndex, avatars, onAvatarSelect]);

  return (
    <div className="mx-auto max-w-xl p-6">
      <h2 className="mb-6 text-center text-2xl font-bold">
        Choose Your Avatar
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {avatars.map((svg, index) => (
          <div
            key={index}
            className={`relative cursor-pointer rounded-lg p-1 ${
              selectedIndex === index
                ? "ring-4 ring-blue-500"
                : "ring-2 ring-gray-300"
            }`}
            onClick={() => setSelectedIndex(index)}
          >
            <div
              className="aspect-square w-full"
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          </div>
        ))}
      </div>
      <h3 className="mt-6 text-center text-xl font-semibold">
        Selected Avatar
      </h3>
      <div
        className="mx-auto mt-4 h-32 w-32 rounded-lg border border-blue-500 p-4"
        dangerouslySetInnerHTML={{ __html: avatars[selectedIndex] }}
      />
    </div>
  );
};

export default AvatarComp;
