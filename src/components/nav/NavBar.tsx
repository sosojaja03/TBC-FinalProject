import { SquarePlus } from "lucide-react";
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
            <Link to="/">BooksForAll</Link>{" "}
            {/* Use Link for internal routing */}
          </h1>
          <div className="flex items-center space-x-4">
            <ul className="flex gap-3">
              <li>
                <NavLink to="/">
                  <Trans>nav-Translation.Home</Trans>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/BlogList">
                  <Trans>nav-Translation.Write</Trans>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/about">
                  <Trans>nav-Translation.About</Trans>
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-2">
            <NavLink to="/dashboard/BlogList">
              <SquarePlus className="mr-2 h-8 w-8 text-gray-700" />
            </NavLink>
            <Language />
            <ModeToggle />
            {user ? (
              <>
                <Button className="bg-blue-500" onClick={() => handleLogOut()}>
                  LogOut
                </Button>
                <NavLink to="/dashboard/ProfileView">
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
