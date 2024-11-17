import React, { useState } from "react";
import { Search } from "lucide-react";
const SearchIcon: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Search />;
    </div>
  );
};
export default SearchIcon;
