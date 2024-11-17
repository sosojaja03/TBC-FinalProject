import { Search } from "lucide-react";
import SignIn from "./Sign-In";
import Language from "./Language";
import { ModeToggle } from "./mode-toggle";
import { Trans, useTranslation } from "react-i18next";

export const NavBar: React.FC = () => {
  useTranslation();

  return (
    <div className="bg-background text-foreground">
      <nav className="border-b border-border p-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="text-2xl font-bold">
            <a href="MainPage">BitBlogs</a>
          </h1>
          <div className="flex items-center space-x-4">
            <ul className="flex gap-3">
              <li>
                <a href="">
                  <Trans>nav-Translation.Home</Trans>
                </a>
              </li>
              <li>
                <a href="">
                  <Trans>nav-Translation.Write</Trans>
                </a>
              </li>
              <li>
                <a href="">
                  <Trans>nav-Translation.About</Trans>
                </a>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-2">
            <Search className="h-[26px] w-[26px] text-gray-400" />
            <SignIn />
            <Language />
            <ModeToggle />
          </div>
        </div>
      </nav>
    </div>
  );
};
