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

// import React, { useState } from "react";
// import {
//   Command,
//   CommandDialog,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
//   CommandSeparator,
//   CommandShortcut,
// } from "@/components/ui/command";

// const SearchIcon: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   return (
//     <>
//       <button onClick={() => setIsOpen(!isOpen)}>Search</button>
//       {isOpen && (
//         <Command>
//           <CommandInput placeholder="Type a command or search..." />
//           <CommandList>
//             <CommandEmpty>No results found.</CommandEmpty>
//             <CommandGroup heading="Suggestions">
//               <CommandItem>Calendar</CommandItem>
//               <CommandItem>Search Emoji</CommandItem>
//               <CommandItem>Calculator</CommandItem>
//             </CommandGroup>
//             <CommandSeparator />
//             <CommandGroup heading="Settings">
//               <CommandItem>Profile</CommandItem>
//               <CommandItem>Billing</CommandItem>
//               <CommandItem>Settings</CommandItem>
//             </CommandGroup>
//           </CommandList>
//         </Command>
//       )}
//     </>
//   );
// };

// export default SearchIcon;
