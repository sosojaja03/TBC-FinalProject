import { Search } from "lucide-react";
import SignIn from "./Sign-In";
import Language from "./Language";
import { ModeToggle } from "./mode-toggle";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const NavBar: React.FC = () => {
  useTranslation();

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
                <Link to="/">
                  <Trans>nav-Translation.Home</Trans>
                </Link>
              </li>
              <li>
                <Link to="/write">
                  <Trans>nav-Translation.Write</Trans>
                </Link>
              </li>
              <li>
                <Link to="/about">
                  <Trans>nav-Translation.About</Trans>
                </Link>
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
