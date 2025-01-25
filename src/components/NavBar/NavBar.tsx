import { CircleUserRound, Menu, Plus, X } from "lucide-react";
import Language from "./Language";
import { ModeToggle } from "./mode-toggle";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../Context/index";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../Authorisation/SignIn/SignInForm";
import SignIn from "./Sign-In";
import { Avatar, AvatarImage } from "../ui/avatar";
import { t } from "i18next";
import { useState } from "react";

export const NavBar: React.FC = () => {
  useTranslation();
  const { user, handleSetUser } = useAuthContext();

  const { mutate: handleLogOut } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: () => {
      handleSetUser(null);
    },
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-background text-foreground">
      <nav className="amber-border border-b p-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Logo */}
          <h1 className="text-2xl font-bold">
            <Link to="/">BooksForAll</Link>
          </h1>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-2 md:flex">
            <NavLink to="/dashboard/ReviewList">
              <Button className="dark:bg-amber-400" variant="outline">
                {t("nav-Translation.CreateReview")}
                <Plus className="h-[2.2rem] w-[2.2rem]" />
              </Button>
            </NavLink>
            <Language />
            <ModeToggle />
            {user ? (
              <>
                <Button
                  className="bg-amber-500 dark:bg-amber-50"
                  onClick={() => handleLogOut()}
                >
                  {t("nav-Translation.LogOut")}
                </Button>
                <NavLink to="/dashboard/ProfileView">
                  <Avatar>
                    <AvatarImage src={user.avatarUrl} alt="Profile" />
                    <CircleUserRound className="h-10 w-10 text-amber-500" />
                  </Avatar>
                </NavLink>
              </>
            ) : (
              <SignIn />
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-background p-4 md:hidden">
            <div className="mb-4 flex justify-end">
              <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                <X />
              </Button>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <NavLink
                to="/dashboard/ReviewList"
                className="w-full"
                onClick={toggleMobileMenu}
              >
                <Button className="w-full dark:bg-amber-400" variant="outline">
                  {t("nav-Translation.CreateReview")}
                  <Plus className="ml-2 h-[2.2rem] w-[2.2rem]" />
                </Button>
              </NavLink>
              <div className="flex w-full justify-center">
                <Language />
              </div>
              <div className="flex w-full justify-center">
                <ModeToggle />
              </div>
              {user ? (
                <>
                  <Button
                    className="w-full bg-amber-500 dark:bg-amber-50"
                    onClick={() => {
                      handleLogOut();
                      toggleMobileMenu();
                    }}
                  >
                    {t("nav-Translation.LogOut")}
                  </Button>
                  <NavLink
                    to="/dashboard/ProfileView"
                    onClick={toggleMobileMenu}
                  >
                    <Avatar>
                      <AvatarImage src={user.avatarUrl} alt="Profile" />
                      <CircleUserRound className="h-10 w-10 text-amber-500" />
                    </Avatar>
                  </NavLink>
                </>
              ) : (
                <SignIn />
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};
