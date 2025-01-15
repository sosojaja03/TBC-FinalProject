// import { Search } from "lucide-react";
// import SignIn from "./Sign-In";
// import Language from "./Language";
// import { ModeToggle } from "./mode-toggle";
// import { Trans, useTranslation } from "react-i18next";
// import { Link, useNavigate } from "react-router-dom";
// import { UseAuthContext } from "../context/hooks/AuthContextHook";
// import { Button } from "../ui/button";
// import { useMutation } from "@tanstack/react-query";
// import { logout } from "../Registration/SignInForm";
// import { Badge } from "../ui/badge";
// import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
// } from "@radix-ui/react-dropdown-menu";

// export const NavBar: React.FC = () => {
//   useTranslation();
//   const { user } = UseAuthContext();
//   console.log(user);
//   const { mutate: handleLogOut } = useMutation({
//     mutationKey: ["logout"],
//     mutationFn: logout,
//   });

//   const avatarUrl =
//     user?.avatar_url ||
//     `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`;

//   const navigate = useNavigate();
//   return (
//     <div className="bg-background text-foreground">
//       <nav className="border-b border-border p-4">
//         <div className="mx-auto flex max-w-7xl items-center justify-between">
//           <h1 className="text-2xl font-bold">
//             <Link to="/">BitBlogs</Link> {/* Use Link for internal routing */}
//           </h1>
//           <div className="flex items-center space-x-4">
//             <ul className="flex gap-3">
//               <li>
//                 <Link to="/">
//                   <Trans>nav-Translation.Home</Trans>
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/write">
//                   <Trans>nav-Translation.Write</Trans>
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/about">
//                   <Trans>nav-Translation.About</Trans>
//                 </Link>
//               </li>
//             </ul>
//           </div>
//           <div className="flex items-center gap-2">
//             <Search className="h-[26px] w-[26px] text-gray-400" />
//             <Language />
//             <ModeToggle />
//             {user ? (
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button
//                     variant="ghost"
//                     className="relative h-9 w-9 rounded-full"
//                   >
//                     <Avatar className="h-9 w-9">
//                       <AvatarImage
//                         src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
//                         alt="Avatar"
//                       />
//                       <AvatarFallback>
//                         {user.email?.charAt(0).toUpperCase()}
//                       </AvatarFallback>
//                     </Avatar>
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end">
//                   <DropdownMenuItem onClick={() => navigate("/profile")}>
//                     Profile
//                   </DropdownMenuItem>
//                   <DropdownMenuSeparator />
//                   <DropdownMenuItem
//                     onClick={() => handleLogOut()}
//                     className="text-red-600"
//                   >
//                     Logout
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             ) : (
//               <div className="flex items-center space-x-2">
//                 <Button variant="ghost" onClick={() => navigate("/login")}>
//                   z Sign In
//                 </Button>
//                 <Button onClick={() => navigate("/register")}>Register</Button>
//               </div>
//             )}
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// };
import { Search } from "lucide-react";
import Language from "./Language";
import { ModeToggle } from "./mode-toggle";
import { Trans, useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import { UseAuthContext } from "../context/hooks/AuthContextHook";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../Registration/SignInForm";
import SignIn from "./Sign-In";
import { Avatar, AvatarImage } from "../ui/avatar";

export const NavBar: React.FC = () => {
  useTranslation();
  const { user, handleSetUser } = UseAuthContext();
  // console.log(user);

  const { mutate: handleLogOut } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: () => {
      handleSetUser(null);
    },
  });

  return (
    <div className="bg-background text-foreground">
      <nav className="border-b border-border p-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="text-2xl font-bold">
            <Link to="/">BitBlogs</Link> {/* Use Link for internal routing */}
          </h1>
          <div className="flex items-center space-x-4">
            <ul className="flex gap-3">
              <li>
                <NavLink to="/">
                  <Trans>nav-Translation.Home</Trans>
                </NavLink>
              </li>
              <li>
                <NavLink to="/BlogList">
                  <Trans>nav-Translation.Write</Trans>
                </NavLink>
              </li>
              <li>
                <NavLink to="/about">
                  <Trans>nav-Translation.About</Trans>
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-2">
            <Search className="h-[26px] w-[26px] text-gray-400" />
            <Language />
            <ModeToggle />
            {user ? (
              <>
                <Button className="bg-blue-500" onClick={() => handleLogOut()}>
                  LogOut
                </Button>
                <NavLink to="ProfileView">
                  <Avatar className="bg-red-600">
                    <AvatarImage src={user.avatarUrl} alt="Profile" />
                  </Avatar>
                </NavLink>
              </>
            ) : (
              <SignIn />
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};
